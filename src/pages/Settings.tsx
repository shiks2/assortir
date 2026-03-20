import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import {
  PageWrapper, Navbar, Container, Tag, Heading, Label,
  Button, ButtonOutline, Row, Stack, Divider,
  ErrorMessage, SuccessMessage, Chip, ChipGroup,
  FormGroup, FieldLabel, Select,
} from '../components/index'
import styled from 'styled-components'

// ─── Styled ───────────────────────────────────────────────────

const PageContent = styled.div`
  flex: 1;
  padding: 24px 0 48px;
`

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f5f4f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  flex-shrink: 0;
`

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ProfileName = styled.p`
  font-size: ${({ theme }) => theme.typography.base};
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ theme }) => theme.colors.text};
`

const ProfileEmail = styled.p`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const PlanBadge = styled.span<{ $pro?: boolean }>`
  font-size: 11px;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: ${({ theme }) => theme.typography.medium};
  background: ${({ $pro, theme }) => $pro ? theme.colors.proBg : theme.colors.freeBg};
  color: ${({ $pro, theme }) => $pro ? theme.colors.proText : theme.colors.freeText};
  flex-shrink: 0;
`

const SettingsSection = styled.div`
  margin-bottom: 24px;
`

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 12px;
`

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
  gap: 12px;

  &:last-child { border-bottom: none; }
`

const SettingsLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.base};
  color: ${({ theme }) => theme.colors.text};
`

const SettingsValue = styled.span`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: right;
`

const UsageBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.bgTertiary};
  border-radius: ${({ theme }) => theme.radius.full};
  overflow: hidden;
  margin-top: 4px;
`

const UsageFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $pct }) => $pct >= 100 ? '#E24B4A' : $pct >= 66 ? '#EF9F27' : '#639922'};
  border-radius: ${({ theme }) => theme.radius.full};
  transition: width 0.3s ease;
`

const MATERIALS_LIST = ['Polyester', 'Wool', 'Leather', 'Nylon', 'Silk', 'Velvet']
const PREFERRED_MATERIALS = ['Cotton', 'Linen', 'Bamboo', 'Khadi', 'Chanderi']
const FITS = ['Slim', 'Regular', 'Relaxed', 'Oversized']
const REGIONS = ['India', 'US', 'Europe', 'Middle East', 'Southeast Asia', 'Other']

// ─── Component ────────────────────────────────────────────────

export default function Settings() {
  const {
    user, profile, skinProfile, styleProfile,
    materialPreferences, subscription, usage,
    isPro, queriesRemaining, signOut, refreshUserData,
  } = useAuth()
  const navigate = useNavigate()

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Editable state
  const [region, setRegion] = useState(profile?.region ?? '')
  const [fit, setFit] = useState(styleProfile?.preferred_fit ?? '')
  const [blacklisted, setBlacklisted] = useState<string[]>(
    materialPreferences?.blacklisted_materials?.map(m =>
      m.charAt(0).toUpperCase() + m.slice(1)
    ) ?? []
  )
  const [preferred, setPreferred] = useState<string[]>(
    materialPreferences?.preferred_materials?.map(m =>
      m.charAt(0).toUpperCase() + m.slice(1)
    ) ?? []
  )

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'ME'

  const monthlyLimit = (subscription as any)?.plans?.monthly_query_limit ?? 3
  const queriesUsed = usage?.query_count ?? 0
  const usagePct = isPro ? 0 : Math.min(100, (queriesUsed / monthlyLimit) * 100)

  function toggle(list: string[], setList: (v: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter(v => v !== val) : [...list, val])
  }

  async function handleSave() {
    if (!user) return
    setSaving(true)
    setError(null)
    setSuccess(null)

    const [p1, p2, p3] = await Promise.all([
      supabase.from('profiles').update({ region }).eq('id', user.id),
      supabase.from('style_profiles').update({
        preferred_fit: fit.toLowerCase(),
      }).eq('user_id', user.id),
      supabase.from('material_preferences').update({
        blacklisted_materials: blacklisted.map(m => m.toLowerCase()),
        preferred_materials: preferred.map(m => m.toLowerCase()),
      }).eq('user_id', user.id),
    ])

    const anyError = [p1, p2, p3].find(r => r.error)
    if (anyError?.error) {
      setError('Failed to save. Please try again.')
    } else {
      await refreshUserData()
      setSuccess('Settings saved successfully')
    }
    setSaving(false)
  }

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <PageWrapper>
      <Navbar
        activePage="settings"
        isPro={isPro}
        queriesRemaining={queriesRemaining === Infinity ? undefined : queriesRemaining}
        userName={profile?.full_name ?? ''}
      />

      <Container>
        <PageContent>
          <Tag $variant="settings">Account</Tag>
          <Heading>Settings</Heading>

          <div style={{ marginTop: 20 }} />

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          {/* Profile */}
          <ProfileRow>
            <Avatar>{initials}</Avatar>
            <ProfileInfo>
              <ProfileName>{profile?.full_name ?? 'Your name'}</ProfileName>
              <ProfileEmail>{user?.email}</ProfileEmail>
            </ProfileInfo>
            <PlanBadge $pro={isPro}>{isPro ? 'Pro' : 'Free'}</PlanBadge>
          </ProfileRow>

          <Divider />

          {/* Usage */}
          <SettingsSection>
            <SectionTitle>Usage</SectionTitle>
            {isPro ? (
              <SettingsRow>
                <SettingsLabel>Queries</SettingsLabel>
                <SettingsValue>Unlimited (Pro)</SettingsValue>
              </SettingsRow>
            ) : (
              <div>
                <Row $justify="space-between" style={{ marginBottom: 6 }}>
                  <Label style={{ fontSize: '13px' }}>
                    {queriesUsed} of {monthlyLimit} queries used this month
                  </Label>
                  <SettingsValue>{monthlyLimit - queriesUsed} left</SettingsValue>
                </Row>
                <UsageBar>
                  <UsageFill $pct={usagePct} />
                </UsageBar>
              </div>
            )}
          </SettingsSection>

          {/* Skin profile — read only */}
          <SettingsSection>
            <SectionTitle>Skin profile</SectionTitle>
            <SettingsRow>
              <SettingsLabel>Undertone</SettingsLabel>
              <SettingsValue style={{ textTransform: 'capitalize' }}>
                {skinProfile?.undertone ?? '—'}
              </SettingsValue>
            </SettingsRow>
            <SettingsRow>
              <SettingsLabel>Depth</SettingsLabel>
              <SettingsValue style={{ textTransform: 'capitalize' }}>
                {skinProfile?.value_depth ?? '—'}
              </SettingsValue>
            </SettingsRow>
            <SettingsRow>
              <SettingsLabel>Season</SettingsLabel>
              <SettingsValue style={{ textTransform: 'capitalize' }}>
                {skinProfile?.season ?? '—'}
              </SettingsValue>
            </SettingsRow>
          </SettingsSection>

          {/* Style prefs — editable */}
          <SettingsSection>
            <SectionTitle>Style preferences</SectionTitle>

            <FormGroup>
              <FieldLabel>Preferred fit</FieldLabel>
              <ChipGroup>
                {FITS.map(f => (
                  <Chip
                    key={f}
                    $active={fit.toLowerCase() === f.toLowerCase()}
                    onClick={() => setFit(f)}
                  >
                    {f}
                  </Chip>
                ))}
              </ChipGroup>
            </FormGroup>

            <FormGroup>
              <FieldLabel>Region</FieldLabel>
              <Select value={region} onChange={e => setRegion(e.target.value)}>
                <option value="">Select region</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </Select>
            </FormGroup>
          </SettingsSection>

          {/* Material prefs — editable */}
          <SettingsSection>
            <SectionTitle>Material preferences</SectionTitle>

            <FormGroup>
              <FieldLabel>Avoid these materials</FieldLabel>
              <ChipGroup>
                {MATERIALS_LIST.map(m => (
                  <Chip
                    key={m}
                    $active={blacklisted.includes(m)}
                    onClick={() => toggle(blacklisted, setBlacklisted, m)}
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
                    onClick={() => toggle(preferred, setPreferred, m)}
                  >
                    {m}
                  </Chip>
                ))}
              </ChipGroup>
            </FormGroup>
          </SettingsSection>

          <Stack $gap="8px">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save changes'}
            </Button>

            {!isPro && (
              <Button
                style={{ background: '#1a1a1a' }}
                onClick={() => alert('Lemon Squeezy payment — coming soon!')}
              >
                Upgrade to Pro — ₹199/month
              </Button>
            )}

            <Divider />

            <ButtonOutline
              onClick={handleSignOut}
              style={{ color: '#A32D2D', borderColor: '#FCEBEB' }}
            >
              Sign out
            </ButtonOutline>
          </Stack>
        </PageContent>
      </Container>
    </PageWrapper>
  )
}