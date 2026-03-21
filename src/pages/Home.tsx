import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import { QueryLimitBanner, ProfileIncompleteBanner } from '../components/Banner'
import type { Intent, StyleResponse } from '../types'
import {
  PageWrapper, Navbar, Container, Tag, Heading, Label,
  Button, FormGroup, FieldLabel, Select, Input,
  ErrorMessage, Stack, IntentGrid, IntentButton,
  Divider, Row, Spinner,
} from '../components/index'
import styled from 'styled-components'
import {
  requestLocationPermission,
  getCurrentPosition,
  fetchWeatherData,
  type WeatherData,
} from '../service/weather_service'
import { formatWeatherTime, getCurrentMonthLabel } from '../utils/dateUtils'

// ─── Styled ───────────────────────────────────────────────────

const PageContent = styled.div`
  flex: 1;
  padding: 24px 0 40px;
`

const PageHeader = styled.div`
  margin-bottom: 24px;
`

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

const WeatherBadge = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textTertiary};
`

// ─── Constants ────────────────────────────────────────────────

const ITEM_TYPES = ['Pants', 'Jeans', 'Shorts', 'Skirt', 'Dress', 'Shirt', 'T-shirt', 'Kurta', 'Saree']
const COLORS = ['White', 'Black', 'Navy', 'Olive', 'Beige', 'Grey', 'Brown', 'Terracotta', 'Mustard', 'Rust', 'Blue', 'Green', 'Red', 'Pink', 'Other']
const MATERIALS = ['Linen', 'Cotton', 'Denim', 'Silk', 'Polyester', 'Khadi', 'Chanderi', 'Wool', 'Jersey', 'Chiffon', 'Other']
const FITS = ['Slim', 'Regular', 'Relaxed', 'Oversized']

const INTENTS: { value: Intent; label: string }[] = [
  { value: 'outfit_only', label: 'Outfit only' },
  { value: 'outfit_accessories', label: '+ Accessories' },
  { value: 'outfit_cosmetics', label: '+ Beauty' },
  { value: 'everything', label: 'Everything' },
]

// ─── Component ────────────────────────────────────────────────

export default function Home() {
  const { user, profile, isPro, queriesRemaining, refreshUserData } = useAuth()
  const navigate = useNavigate()

  const [itemType, setItemType] = useState('')
  const [itemColor, setItemColor] = useState('')
  const [itemMaterial, setItemMaterial] = useState('')
  const [itemFit, setItemFit] = useState('')
  const [itemNotes, setItemNotes] = useState('')
  const [intent, setIntent] = useState<Intent>('outfit_only')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)

  const monthLabel = getCurrentMonthLabel()

  const canSubmit = Boolean(itemType && itemColor && itemMaterial && itemFit)
  const outOfQueries = !isPro && queriesRemaining <= 0
  const submitButtonText = outOfQueries ? 'No queries left this month' : 'Get recommendations'

  // DEBUG: Log why the button might be disabled
  useEffect(() => {
    if (!canSubmit && (itemType || itemColor || itemMaterial || itemFit)) {
      console.log('Home: canSubmit is still false. Status:', {
        itemType: !!itemType,
        itemColor: !!itemColor,
        itemMaterial: !!itemMaterial,
        itemFit: !!itemFit
      })
    }
  }, [itemType, itemColor, itemMaterial, itemFit, canSubmit])

  useEffect(() => {
    let mounted = true

    async function syncWeather() {
      const permission = await requestLocationPermission()
      if (!permission.granted) return

      const coords = await getCurrentPosition(permission)
      const weatherResult = await fetchWeatherData(coords)
      if (mounted && weatherResult.success) {
        setWeather(weatherResult.weather)
      }
    }

    syncWeather()

    return () => {
      mounted = false
    }
  }, [])

  async function handleSubmit() {
    if (!canSubmit || !user) return
    if (outOfQueries) return setError('You have used all your free queries this month.')

    setLoading(true)
    setError(null)

    try {
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token
      if (!token) throw new Error('Not authenticated')

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/styling-recommendation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            intent,
            item: {
              item_type: itemType.toLowerCase(),
              item_color: itemColor.toLowerCase(),
              item_material: itemMaterial.toLowerCase(),
              item_fit: itemFit.toLowerCase(),
              item_notes: itemNotes || undefined,
            },
          }),
        }
      )

      const data: StyleResponse = await res.json()

      if (!res.ok || !data.success) {
        if (data.error === 'free_limit_reached') {
          setError('You have used all your free queries this month. Upgrade to Pro for unlimited.')
        } else {
          setError((data as any).error ?? 'Something went wrong')
        }
        return
      }

      await refreshUserData()
      navigate(`/result/${data.query_id}`, { state: { data } })
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <Navbar
        activePage="home"
        isPro={isPro}
        queriesRemaining={queriesRemaining === Infinity ? undefined : queriesRemaining}
        userName={profile?.full_name ?? ''}
        onAvatarClick={() => navigate('/settings')}
      />

      <Container>
        <PageContent>
          <PageHeader>
            <Tag $variant="home">Style</Tag>
            <Heading>What did you buy?</Heading>
            <Label style={{ marginTop: 6 }}>
              Tell us about the item and we'll complete the outfit
            </Label>
            <WeatherBadge>
              {weather ? formatWeatherTime(weather.fetched_at) : `Usage month: ${monthLabel}`}
            </WeatherBadge>
          </PageHeader>

          <Stack $gap="12px" style={{ marginBottom: 16 }}>
            <ProfileIncompleteBanner />
            <QueryLimitBanner />
          </Stack>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Stack $gap="12px">
            <FormGroup>
              <FieldLabel>Item type</FieldLabel>
              <Select value={itemType} onChange={e => setItemType(e.target.value)}>
                <option value="">Select item type</option>
                {ITEM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </FormGroup>

            <TwoCol>
              <FormGroup>
                <FieldLabel>Color</FieldLabel>
                <Select value={itemColor} onChange={e => setItemColor(e.target.value)}>
                  <option value="">Color</option>
                  {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                </Select>
              </FormGroup>

              <FormGroup>
                <FieldLabel>Material</FieldLabel>
                <Select value={itemMaterial} onChange={e => setItemMaterial(e.target.value)}>
                  <option value="">Material</option>
                  {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
                </Select>
              </FormGroup>
            </TwoCol>

            <FormGroup>
              <FieldLabel>Fit</FieldLabel>
              <Select value={itemFit} onChange={e => setItemFit(e.target.value)}>
                <option value="">Select fit</option>
                {FITS.map(f => <option key={f} value={f}>{f}</option>)}
              </Select>
            </FormGroup>

            <FormGroup>
              <FieldLabel>Notes (optional)</FieldLabel>
              <Input
                placeholder="e.g. casual lunch, beach outing, office..."
                value={itemNotes}
                onChange={e => setItemNotes(e.target.value)}
              />
            </FormGroup>

            <Divider />

            <FormGroup>
              <FieldLabel>What do you need?</FieldLabel>
              <IntentGrid>
                {INTENTS.map(i => (
                  <IntentButton
                    key={i.value}
                    $active={intent === i.value}
                    onClick={() => setIntent(i.value)}
                  >
                    {i.label}
                  </IntentButton>
                ))}
              </IntentGrid>
            </FormGroup>

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || loading || outOfQueries}
            >
              {loading
                ? <Row $gap="8px"><Spinner $size={16} $light /><span>Getting recommendations...</span></Row>
                : submitButtonText
              }
            </Button>
          </Stack>
        </PageContent>
      </Container>
    </PageWrapper>
  )
}