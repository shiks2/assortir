// weatherService.ts
// Functional pipeline for location + weather
// Open-Meteo API — completely free, no API key needed
// Each function takes previous output as input
// ============================================================

// ─── Types ───────────────────────────────────────────────────

export type PermissionResult =
    | { granted: true }
    | { granted: false; reason: 'denied' | 'unavailable' | 'timeout' }

export type Coordinates = {
    lat: number
    lon: number
    accuracy: number
}

export type CoordinatesResult =
    | { success: true; coordinates: Coordinates }
    | { success: false; reason: string }

export type WeatherData = {
    // Current conditions
    temp: number            // celsius
    feels_like: number      // celsius
    humidity: number        // percent
    condition: string       // 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy'
    wind_speed: number      // km/h
    is_day: boolean

    // 3-day forecast
    forecast: ForecastDay[]

    // Meta
    fetched_at: string      // ISO timestamp
    source: 'open-meteo'
}

export type ForecastDay = {
    date: string            // 'YYYY-MM-DD'
    temp_max: number
    temp_min: number
    humidity_max: number
    rain_chance: number     // percent
    condition: string
}

export type WeatherResult =
    | { success: true; weather: WeatherData }
    | { success: false; reason: string }

export type WeatherContext = {
    summary: string                // injected into AI prompt
    fabric_advice: string          // specific fabric recommendation
    temp: number
    humidity: number
    condition: string
    forecast_summary: string       // next 3 days in one sentence
}

// ─── Step 1: Request location permission ─────────────────────

export function requestLocationPermission(): Promise<PermissionResult> {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({ granted: false, reason: 'unavailable' })
            return
        }

        // Check permission state if API available
        if (navigator.permissions) {
            navigator.permissions
                .query({ name: 'geolocation' })
                .then((result) => {
                    if (result.state === 'denied') {
                        resolve({ granted: false, reason: 'denied' })
                    } else {
                        // 'granted' or 'prompt' — both mean we can proceed
                        resolve({ granted: true })
                    }
                })
                .catch(() => {
                    // permissions API failed — try anyway
                    resolve({ granted: true })
                })
        } else {
            // No permissions API — try anyway
            resolve({ granted: true })
        }
    })
}

// ─── Step 2: Get current coordinates ─────────────────────────

export function getCurrentPosition(
    permissionResult: PermissionResult
): Promise<CoordinatesResult> {
    return new Promise((resolve) => {
        if (!permissionResult.granted) {
            resolve({
                success: false,
                reason: `Location permission ${permissionResult.reason}`,
            })
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    success: true,
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    },
                })
            },
            (error) => {
                const reason =
                    error.code === 1 ? 'Permission denied by user' :
                        error.code === 2 ? 'Position unavailable' :
                            'Location request timed out'
                resolve({ success: false, reason })
            },
            {
                timeout: 8000,
                maximumAge: 300000,  // cache position for 5 mins
                enableHighAccuracy: false,  // battery-friendly
            }
        )
    })
}

// ─── Step 3: Fetch weather from Open-Meteo ───────────────────
// Free API — no key needed, no rate limits for reasonable usage
// Docs: https://open-meteo.com/en/docs

export async function fetchWeatherData(
    coordsResult: CoordinatesResult
): Promise<WeatherResult> {
    if (!coordsResult.success) {
        return { success: false, reason: coordsResult.reason }
    }

    const { lat, lon } = coordsResult.coordinates

    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.set('latitude', lat.toString())
    url.searchParams.set('longitude', lon.toString())

    // Current weather fields
    url.searchParams.set('current', [
        'temperature_2m',
        'apparent_temperature',
        'relative_humidity_2m',
        'weather_code',
        'wind_speed_10m',
        'is_day',
    ].join(','))

    // 3-day forecast fields
    url.searchParams.set('daily', [
        'temperature_2m_max',
        'temperature_2m_min',
        'relative_humidity_2m_max',
        'precipitation_probability_max',
        'weather_code',
    ].join(','))

    url.searchParams.set('timezone', 'auto')       // auto-detect from coordinates
    url.searchParams.set('forecast_days', '3')     // today + 2 days

    try {
        const res = await fetch(url.toString())

        if (!res.ok) {
            return {
                success: false,
                reason: `Weather API returned ${res.status}`,
            }
        }

        const data = await res.json()

        // Parse current conditions
        const current = data.current
        const condition = interpretWeatherCode(current.weather_code, current.is_day === 1)

        // Parse 3-day forecast
        const forecast: ForecastDay[] = data.daily.time.map(
            (date: string, i: number) => ({
                date,
                temp_max: Math.round(data.daily.temperature_2m_max[i]),
                temp_min: Math.round(data.daily.temperature_2m_min[i]),
                humidity_max: Math.round(data.daily.relative_humidity_2m_max[i]),
                rain_chance: Math.round(data.daily.precipitation_probability_max[i]),
                condition: interpretWeatherCode(data.daily.weather_code[i], true),
            })
        )

        return {
            success: true,
            weather: {
                temp: Math.round(current.temperature_2m),
                feels_like: Math.round(current.apparent_temperature),
                humidity: Math.round(current.relative_humidity_2m),
                condition,
                wind_speed: Math.round(current.wind_speed_10m),
                is_day: current.is_day === 1,
                forecast,
                fetched_at: new Date().toISOString(),
                source: 'open-meteo',
            },
        }
    } catch (err) {
        return {
            success: false,
            reason: `Network error: ${err instanceof Error ? err.message : 'unknown'}`,
        }
    }
}

// ─── Step 4: Build weather context for AI prompt ─────────────

export function buildWeatherContext(
    weatherResult: WeatherResult
): WeatherContext | null {
    if (!weatherResult.success) return null

    const { weather } = weatherResult
    const { temp, feels_like, humidity, condition, forecast } = weather

    // Fabric advice based on actual conditions
    // This is what makes Rang genuinely useful — real-time fabric logic
    let fabric_advice = ''

    if (temp >= 38) {
        fabric_advice = 'Extreme heat: ultra-breathable only — linen, khadi, cotton voile. No polyester, no dark colors that absorb heat. Loose fits essential.'
    } else if (temp >= 33) {
        fabric_advice = 'Very hot: breathable fabrics — linen, cotton, khadi, chambray. Avoid synthetic, avoid fitted silhouettes that trap heat.'
    } else if (temp >= 27) {
        fabric_advice = 'Hot: light cotton and linen work well. Avoid heavy fabrics.'
    } else if (temp >= 20) {
        fabric_advice = 'Mild: most fabrics work. Light layers acceptable.'
    } else if (temp >= 12) {
        fabric_advice = 'Cool: medium weight fabrics — cotton, light denim, chambray. A light layer helps.'
    } else {
        fabric_advice = 'Cold: warm fabrics — wool, tweed, heavy cotton. Layering recommended.'
    }

    // Humidity adjustments
    // This is the Ahmedabad-style nuance you mentioned —
    // after rain, humidity spikes even if temp is moderate
    if (humidity > 80) {
        fabric_advice += ' Very high humidity: avoid silk, velvet, suede — they absorb moisture. Stick to cotton or linen.'
    } else if (humidity > 65) {
        fabric_advice += ' High humidity: avoid velvet and heavy knits.'
    }

    // Rain chance adjustment
    const todayRainChance = forecast[0]?.rain_chance ?? 0
    if (todayRainChance > 60) {
        fabric_advice += ` Rain likely today (${todayRainChance}%): avoid suede, raw silk, unlined linen.`
    }

    // Feels like adjustment — important for Mumbai/coastal cities
    // where humidity makes 32°C feel like 40°C
    const feelsHotter = feels_like - temp >= 4
    if (feelsHotter) {
        fabric_advice += ` Feels like ${feels_like}°C due to humidity — dress for the feel, not the number.`
    }

    // Build prompt summary
    const summary = `Today: ${temp}°C (feels ${feels_like}°C), ${humidity}% humidity, ${condition}.`

    // 3-day forecast summary
    const forecast_summary = forecast
        .map(d => `${d.date}: ${d.temp_max}°C/${d.temp_min}°C, ${d.rain_chance}% rain`)
        .join(' | ')

    return {
        summary,
        fabric_advice,
        temp,
        humidity,
        condition,
        forecast_summary,
    }
}

// ─── Master pipeline function ─────────────────────────────────
// Runs all 4 steps in sequence
// Returns null if any step fails — graceful degradation
// App works perfectly without weather — it's an enhancement

export async function getWeatherForStyling(): Promise<WeatherContext | null> {
    try {
        const permission = await requestLocationPermission()
        const coords = await getCurrentPosition(permission)
        const weatherResult = await fetchWeatherData(coords)
        const context = buildWeatherContext(weatherResult)

        if (context) {
            console.log(`Weather: ${context.summary}`)
            console.log(`Fabric advice: ${context.fabric_advice}`)
        }

        return context
    } catch (err) {
        // Never crash the app over weather
        console.warn('Weather fetch failed silently:', err)
        return null
    }
}

// ─── WMO Weather Code interpreter ────────────────────────────
// Open-Meteo uses WMO weather codes
// https://open-meteo.com/en/docs#weathervariables

function interpretWeatherCode(code: number, isDay: boolean): string {
    if (code === 0) return isDay ? 'clear sky' : 'clear night'
    if (code <= 2) return 'partly cloudy'
    if (code === 3) return 'overcast'
    if (code <= 49) return 'foggy'
    if (code <= 55) return 'drizzle'
    if (code <= 65) return 'rainy'
    if (code <= 77) return 'snowy'
    if (code <= 82) return 'rain showers'
    if (code <= 86) return 'snow showers'
    if (code <= 99) return 'thunderstorm'
    return 'unknown'
}

// ─── Format for display in UI ────────────────────────────────

export function formatWeatherForDisplay(context: WeatherContext): string {
    const emoji =
        context.condition.includes('rain') ? '🌧️' :
            context.condition.includes('thunder') ? '⛈️' :
                context.condition.includes('cloud') ? '☁️' :
                    context.condition.includes('fog') ? '🌫️' :
                        context.temp >= 35 ? '🔥' :
                            context.temp >= 25 ? '☀️' :
                                context.temp >= 15 ? '⛅' : '🧥'

    return `${emoji} ${context.temp}°C · ${context.humidity}% humidity`
}