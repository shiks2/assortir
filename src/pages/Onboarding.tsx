import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import {
  PageWrapper, CenteredContainer, Heading, Label, Tag,
  Button, ButtonOutline, Chip, ChipGroup, FormGroup,
  FieldLabel, Input, Select, ErrorMessage, Stack,
  StepDots, StepDot, Row, Spinner,
} from '../components'
import styled from 'styled-components'
import { Popover } from '../components/ui'

import { FOUNDER_NAME } from '../constants'

// ─── Styled ───────────────────────────────────────────────────

const StepHeader = styled.div`
  margin-bottom: 24px;
`

const StepFooter = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 24px;
`

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const HelpButton = styled.button`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
`

// ─── Step data ────────────────────────────────────────────────

const UNDERTONES = ['Warm', 'Cool', 'Neutral', 'Olive']
const DEPTHS = ['Light', 'Medium', 'Deep']
const JEWELRY = ['Gold', 'Silver', 'Both']
const FITS = ['Slim', 'Regular', 'Relaxed', 'Oversized']
const VIBES = ['Smart casual', 'Streetwear', 'Formal', 'Minimalist', 'Maximalist', 'Bohemian']
const OCCASIONS = ['Casual', 'Workwear', 'Festive', 'Formal', 'Streetwear']
const MATERIALS_LIST = ['Polyester', 'Wool', 'Leather', 'Nylon', 'Silk', 'Velvet']
const PREFERRED_MATERIALS = ['Cotton', 'Linen', 'Bamboo', 'Khadi', 'Chanderi']
const REGIONS = ['India', 'US', 'Europe', 'Middle East', 'Southeast Asia', 'Other']
const GENDERS = ['Male', 'Female', 'Non binary']
const STEP_KEYS = ['identity', 'skin', 'style', 'materials'] as const

function toggleSelection(list: string[], setList: (v: string[]) => void, val: string) {
  setList(list.includes(val) ? list.filter(v => v !== val) : [...list, val])
}

// ─── Component ────────────────────────────────────────────────

export default function Onboarding() {
  const { user, refreshUserData, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Step 1 — Identity
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('')
  const [region, setRegion] = useState('')

  // Step 2 — Skin
  const [undertone, setUndertone] = useState('')
  const [depth, setDepth] = useState('')
  const [jewelry, setJewelry] = useState('')

  // Step 3 — Style
  const [fit, setFit] = useState('')
  const [vibe, setVibe] = useState('')
  const [occasion, setOccasion] = useState('')

  // Step 4 — Materials
  const [blacklisted, setBlacklisted] = useState<string[]>([])
  const [preferred, setPreferred] = useState<string[]>([])

  // ─── Validation ───────────────────────────────────────────────

  function canProceed() {
    if (step === 0) return fullName.trim() && gender && region
    if (step === 1) return undertone && depth
    if (step === 2) return fit && vibe && occasion
    return true
  }

  // ─── Submit ───────────────────────────────────────────────────

  async function handleFinish() {
    if (!user) return
    setLoading(true)
    setError(null)

    try {
      // Determine season from undertone + depth
      const season = (() => {
        const u = undertone.toLowerCase()
        const d = depth.toLowerCase()
        if (u === 'warm' && d === 'light') return 'spring'
        if ((u === 'warm' || u === 'olive') && (d === 'medium' || d === 'deep')) return 'autumn'
        if (u === 'cool' && d === 'light') return 'summer'
        if (u === 'cool' && d === 'deep') return 'winter'
        return null
      })()

      // Run all updates in parallel
      /* const [p1, p2, p3, p4, p5] = await Promise.all([ */
      const [p1, p2, p3, p4] = await Promise.all([
        supabase.from('profiles').update({
          full_name: fullName.trim(),
          gender: gender.toLowerCase().replace(' ', '_'),
          region,
          is_profile_complete: true,
        }).eq('id', user.id),

        supabase.from('skin_profiles').update({
          undertone: undertone.toLowerCase(),
          value_depth: depth.toLowerCase(),
          chroma: 'soft',
          season,
        }).eq('user_id', user.id),

        supabase.from('style_profiles').update({
          preferred_fit: fit.toLowerCase(),
          preferred_style_vibe: vibe.toLowerCase().replace(' ', '_'),
          primary_occasion: occasion.toLowerCase(),
        }).eq('user_id', user.id),

        supabase.from('material_preferences').update({
          blacklisted_materials: blacklisted.map(m => m.toLowerCase()),
          preferred_materials: preferred.map(m => m.toLowerCase()),
        }).eq('user_id', user.id),

        // Jewelry stored in skin profile
        supabase.from('skin_profiles').update({
          undertone: undertone.toLowerCase(),
          value_depth: depth.toLowerCase(),
          chroma: 'soft',
          season,
        }).eq('user_id', user.id),
      ])

      const anyError = [p1, p2, p3, p4].find(r => r.error)
      if (anyError?.error) throw anyError.error

      await refreshUserData()
      navigate('/home')
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSkip() {
    if (!user) return
    setLoading(true)
    try {
      // Just mark as complete and move on
      await updateProfile({ is_profile_complete: true })
      await refreshUserData()
      navigate('/home')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Please check your connection.'
      setError(`Could not skip onboarding. ${message}`)
    } finally {
      setLoading(false)
    }
  }

  // ─── Steps ────────────────────────────────────────────────────

  const steps = [
    // Step 0 — Identity
    <Stack $gap="12px" key="0">
      <StepHeader>
        <Tag $variant="onboard">About you</Tag>
        <Heading>Let's get started</Heading>
        <Label style={{ marginTop: 6 }}>Basic info to personalize your experience</Label>
      </StepHeader>

      <FormGroup>
        <FieldLabel>Your name</FieldLabel>
        <Input
          placeholder={FOUNDER_NAME}
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <FieldLabel>Gender</FieldLabel>
        <ChipGroup>
          {GENDERS.map(g => (
            <Chip key={g} $active={gender === g} onClick={() => setGender(g)}>{g}</Chip>
          ))}
        </ChipGroup>
      </FormGroup>

      <FormGroup>
        <FieldLabel>Your region</FieldLabel>
        <Select value={region} onChange={e => setRegion(e.target.value)}>
          <option value="">Select region</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </Select>
      </FormGroup>
    </Stack>,

    // Step 1 — Skin
    <Stack $gap="12px" key="1">
      <StepHeader>
        <Tag $variant="onboard">Skin profile</Tag>
        <Heading>Your skin tone</Heading>
        <Label style={{ marginTop: 6 }}>
          Helps us recommend colors that flatter you
        </Label>
      </StepHeader>

      <FormGroup>
        <LabelRow>
          <FieldLabel style={{ marginBottom: 0 }}>Undertone</FieldLabel>
          <Popover
            title="How to find your undertone"
            content="Look at the veins on your inner wrist. Blue or purple usually means cool, green usually means warm, and a mix suggests neutral."
            placement="right"
          >
            <HelpButton type="button" aria-label="Undertone help">?</HelpButton>
          </Popover>
        </LabelRow>
        <Label style={{ marginBottom: 8, fontSize: '12px' }}>
          Check your wrist veins — green = warm, blue/purple = cool
        </Label>
        <ChipGroup>
          {UNDERTONES.map(u => (
            <Chip key={u} $active={undertone === u} onClick={() => setUndertone(u)}>{u}</Chip>
          ))}
        </ChipGroup>
      </FormGroup>

      <FormGroup>
        <FieldLabel>Skin depth</FieldLabel>
        <ChipGroup>
          {DEPTHS.map(d => (
            <Chip key={d} $active={depth === d} onClick={() => setDepth(d)}>{d}</Chip>
          ))}
        </ChipGroup>
      </FormGroup>

      <FormGroup>
        <FieldLabel>Jewelry preference</FieldLabel>
        <ChipGroup>
          {JEWELRY.map(j => (
            <Chip key={j} $active={jewelry === j} onClick={() => setJewelry(j)}>{j}</Chip>
          ))}
        </ChipGroup>
      </FormGroup>
    </Stack>,

    // Step 2 — Style
    <Stack $gap="12px" key="2">
      <StepHeader>
        <Tag $variant="onboard">Style profile</Tag>
        <Heading>Your style</Heading>
        <Label style={{ marginTop: 6 }}>How you like to dress day to day</Label>
      </StepHeader>

      <FormGroup>
        <FieldLabel>Preferred fit</FieldLabel>
        <ChipGroup>
          {FITS.map(f => (
            <Chip key={f} $active={fit === f} onClick={() => setFit(f)}>{f}</Chip>
          ))}
        </ChipGroup>
      </FormGroup>

      <FormGroup>
        <FieldLabel>Style vibe</FieldLabel>
        <ChipGroup>
          {VIBES.map(v => (
            <Chip key={v} $active={vibe === v} onClick={() => setVibe(v)}>{v}</Chip>
          ))}
        </ChipGroup>
      </FormGroup>

      <FormGroup>
        <FieldLabel>Primary occasion</FieldLabel>
        <ChipGroup>
          {OCCASIONS.map(o => (
            <Chip key={o} $active={occasion === o} onClick={() => setOccasion(o)}>{o}</Chip>
          ))}
        </ChipGroup>
      </FormGroup>
    </Stack>,

    // Step 3 — Materials
    <Stack $gap="12px" key="3">
      <StepHeader>
        <Tag $variant="onboard">Materials</Tag>
        <Heading>Fabric preferences</Heading>
        <Label style={{ marginTop: 6 }}>
          We'll never recommend materials you want to avoid
        </Label>
      </StepHeader>

      <FormGroup>
        <FieldLabel>Avoid these materials</FieldLabel>
        <ChipGroup>
          {MATERIALS_LIST.map(m => (
            <Chip
              key={m}
              $active={blacklisted.includes(m)}
                    onClick={() => toggleSelection(blacklisted, setBlacklisted, m)}
            >
              {m}
            </Chip>
          ))}
        </ChipGroup>
      </FormGroup>

      <FormGroup>
        <FieldLabel>Prefer these materials</FieldLabel>
        <ChipGroup>
          {PREFERRED_MATERIALS.map(m => (
            <Chip
              key={m}
              $active={preferred.includes(m)}
                    onClick={() => toggleSelection(preferred, setPreferred, m)}
            >
              {m}
            </Chip>
          ))}
        </ChipGroup>
      </FormGroup>

      <Label style={{ fontSize: '12px' }}>
        You can skip this — it's optional. You can always update it in Settings.
      </Label>
    </Stack>,
  ]

  // ─── Render ───────────────────────────────────────────────────

  return (
    <PageWrapper>
      <CenteredContainer>
        <StepDots>
          {STEP_KEYS.map((stepKey, i) => (
            <StepDot key={stepKey} $active={i === step} />
          ))}
        </StepDots>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {steps[step]}

        <StepFooter>
          {step > 0 && (
            <ButtonOutline onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>
              Back
            </ButtonOutline>
          )}

          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              style={{ flex: 1 }}
            >
              Continue
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={loading} style={{ flex: 1 }}>
              {loading ? <Row $gap="8px"><Spinner $size={16} $light /><span>Setting up...</span></Row> : 'Start styling'}
            </Button>
          )}
        </StepFooter>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <ButtonOutline 
            onClick={handleSkip} 
            disabled={loading}
            style={{ border: 'none', fontSize: '13px', opacity: 0.6 }}
          >
            {loading ? 'Processing...' : 'Skip for now'}
          </ButtonOutline>
        </div>
      </CenteredContainer>
    </PageWrapper>
  )
}