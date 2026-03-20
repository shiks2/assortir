import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import type { Query, StyleResponse } from '../types'
import { useAuth } from '../context/AuthContext'
import {
  PageWrapper, Navbar, Container, Tag, Heading, Label,
  Card, SurfaceCard, Stack, Divider, Button,
  ButtonOutline, Spinner, ErrorMessage,
} from '../components'
import styled from 'styled-components'

// ─── Styled ───────────────────────────────────────────────────

const PageContent = styled.div`
  flex: 1;
  padding: 24px 0 48px;
`

const RecCard = styled(SurfaceCard)`
  margin-bottom: 8px;
  cursor: default;
`

const RecRank = styled.span`
  font-size: ${({ theme }) => theme.typography.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-weight: ${({ theme }) => theme.typography.medium};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

const RecTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.base};
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ theme }) => theme.colors.text};
  margin: 4px 0 2px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ColorDot = styled.span<{ $color?: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color ?? '#ccc'};
  flex-shrink: 0;
  display: inline-block;
`

const RecMeta = styled.p`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;
`

const RecWhy = styled.p`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: 8px;
`

const SkinNote = styled.p`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  margin-bottom: 8px;
`

const SearchButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.bg};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 5px 10px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.text};
  }
`

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.base};
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`

const AccessoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
  gap: 12px;

  &:last-child { border-bottom: none; }
`

const AccessoryLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
  min-width: 80px;
`

const AccessoryValue = styled.span`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`

const CosmeticBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

const CosmeticItem = styled(SurfaceCard)`
  padding: 10px 12px;
`

const CosmeticLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 3px;
`

const CosmeticValue = styled.p`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.medium};
`

const AvoidList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const AvoidItem = styled.li`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.errorBg};
  border-radius: ${({ theme }) => theme.radius.md};
  line-height: 1.5;
`

const FeedbackRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`

const FeedbackBtn = styled.button<{ $active?: boolean; $positive?: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: ${({ theme }) => theme.typography.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: 0.5px solid ${({ $active, $positive, theme }) =>
    $active ? ($positive ? theme.colors.success : theme.colors.error) : theme.colors.border};
  background: ${({ $active, $positive, theme }) =>
    $active ? ($positive ? theme.colors.successBg : theme.colors.errorBg) : 'transparent'};
  color: ${({ $active, $positive, theme }) =>
    $active ? ($positive ? theme.colors.success : theme.colors.error) : theme.colors.textSecondary};
`

// Color name to hex mapping
const COLOR_MAP: Record<string, string> = {
  white: '#ffffff', black: '#1a1a1a', navy: '#1B2A4A', olive: '#6B7A3E',
  beige: '#D4C5A9', grey: '#9b9b9b', gray: '#9b9b9b', brown: '#7C5C3A',
  terracotta: '#1a1a1a', mustard: '#C9A84C', rust: '#A0522D', blue: '#378ADD',
  green: '#639922', red: '#E24B4A', pink: '#D4537E', camel: '#C19A6B',
  coral: '#E8735A', cobalt: '#185FA5', emerald: '#1D9E75', burgundy: '#722F37',
  sage: '#87A87B', dusty: '#7B9EC4', warm: '#1a1a1a', deep: '#444',
}

function getColorHex(colorName: string): string {
  const lower = colorName.toLowerCase()
  for (const [key, val] of Object.entries(COLOR_MAP)) {
    if (lower.includes(key)) return val
  }
  return '#D3D1C7'
}

// ─── Component ────────────────────────────────────────────────

export default function Result() {
  const location = useLocation()
  const { queryId } = useParams()
  const navigate = useNavigate()
  const { profile, isPro, queriesRemaining } = useAuth()

  const [result, setResult] = useState<StyleResponse | null>(
    location.state?.data ?? null
  )
  const [loading, setLoading] = useState(!location.state?.data)
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<boolean | null>(null)

  // Fetch from DB if navigated directly (e.g. from history)
  useEffect(() => {
    if (!result && queryId) {
      fetchQuery()
    }
  }, [queryId])

  async function fetchQuery() {
    setLoading(true)
    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .eq('id', queryId)
      .single()

    if (error || !data) {
      setError('Could not load recommendation')
    } else {
      const query = data as Query
      setResult({
        success: true,
        query_id: query.id,
        intent: query.intent,
        queries_used: 0,
        queries_remaining: null,
        is_pro: false,
        latency_ms: 0,
        data: query.output_json,
      })
    }
    setLoading(false)
  }

  async function submitFeedback(helpful: boolean) {
    setFeedback(helpful)
    if (queryId) {
      await supabase
        .from('queries')
        .update({ was_helpful: helpful })
        .eq('id', queryId)
    }
  }

  if (loading) {
    return (
      <PageWrapper>
        <Navbar activePage="home" isPro={isPro} queriesRemaining={queriesRemaining === Infinity ? undefined : queriesRemaining} userName={profile?.full_name ?? ''} />
        <Container>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <Spinner $size={32} />
          </div>
        </Container>
      </PageWrapper>
    )
  }

  if (error || !result) {
    return (
      <PageWrapper>
        <Navbar activePage="home" isPro={isPro} queriesRemaining={queriesRemaining === Infinity ? undefined : queriesRemaining} userName={profile?.full_name ?? ''} />
        <Container>
          <PageContent>
            <ErrorMessage>{error ?? 'Something went wrong'}</ErrorMessage>
            <Button onClick={() => navigate('/home')}>Back to home</Button>
          </PageContent>
        </Container>
      </PageWrapper>
    )
  }

  const { data } = result
  if (!data) return null

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
          {/* Header */}
          <Tag $variant="result">{data.recommendations.length} looks</Tag>
          <Heading>Your outfit matches</Heading>
          <Label style={{ marginTop: 6, marginBottom: 20 }}>
            {data.profile_summary}
          </Label>

          {/* Item analysis */}
          <SurfaceCard style={{ marginBottom: 20 }}>
            <Label style={{ fontSize: '12px' }}>{data.item_analysis}</Label>
          </SurfaceCard>

          {/* Recommendations */}
          <SectionTitle>Outfit recommendations</SectionTitle>
          <Stack $gap="8px" style={{ marginBottom: 24 }}>
            {data.recommendations.map((rec) => (
              <RecCard key={rec.rank}>
                <RecRank>{rec.rank} of {data.recommendations.length}</RecRank>
                <RecTitle>
                  <ColorDot $color={getColorHex(rec.color)} />
                  {rec.color} {rec.type}
                </RecTitle>
                <RecMeta>{rec.material} · {rec.fit} · {rec.style_vibe}</RecMeta>
                <RecWhy>{rec.why_it_works}</RecWhy>
                <SkinNote>{rec.skin_tone_note}</SkinNote>
                <SearchButton
                  href={`https://www.myntra.com/${encodeURIComponent(rec.myntra_search_query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Search on Myntra →
                </SearchButton>
              </RecCard>
            ))}
          </Stack>

          {/* Accessories */}
          {data.accessories && (
            <>
              <Divider />
              <SectionTitle style={{ marginTop: 20 }}>Accessories</SectionTitle>
              <Card style={{ marginBottom: 24 }}>
                <AccessoryRow>
                  <AccessoryLabel>Shoes</AccessoryLabel>
                  <AccessoryValue>{data.accessories.shoes.type} — {data.accessories.shoes.color}</AccessoryValue>
                </AccessoryRow>
                <AccessoryRow>
                  <AccessoryLabel>Belt</AccessoryLabel>
                  <AccessoryValue>{data.accessories.belt.type} — {data.accessories.belt.color}</AccessoryValue>
                </AccessoryRow>
                <AccessoryRow>
                  <AccessoryLabel>Watch</AccessoryLabel>
                  <AccessoryValue>{data.accessories.watch.strap} · {data.accessories.watch.metal_tone}</AccessoryValue>
                </AccessoryRow>
                <AccessoryRow>
                  <AccessoryLabel style={{ color: '#A32D2D' }}>Avoid</AccessoryLabel>
                  <AccessoryValue>{data.accessories.avoid}</AccessoryValue>
                </AccessoryRow>
              </Card>
            </>
          )}

          {/* Cosmetics */}
          {data.cosmetics && (
            <>
              <Divider />
              <SectionTitle style={{ marginTop: 20 }}>Beauty picks</SectionTitle>
              <Label style={{ marginBottom: 12, fontSize: '12px' }}>
                {data.cosmetics.context}
              </Label>
              <CosmeticBlock style={{ marginBottom: 8 }}>
                <CosmeticItem>
                  <CosmeticLabel>Foundation</CosmeticLabel>
                  <CosmeticValue>{data.cosmetics.foundation.shade_profile}</CosmeticValue>
                </CosmeticItem>
                <CosmeticItem>
                  <CosmeticLabel>Lip</CosmeticLabel>
                  <CosmeticValue>{data.cosmetics.lip.color_family}</CosmeticValue>
                </CosmeticItem>
                <CosmeticItem>
                  <CosmeticLabel>Blush</CosmeticLabel>
                  <CosmeticValue>{data.cosmetics.blush.color_family}</CosmeticValue>
                </CosmeticItem>
                <CosmeticItem>
                  <CosmeticLabel>Eye</CosmeticLabel>
                  <CosmeticValue>{data.cosmetics.eye.color_family}</CosmeticValue>
                </CosmeticItem>
              </CosmeticBlock>
              {data.cosmetics.myntra_search_query && (
                <SearchButton
                  href={`https://www.myntra.com/${encodeURIComponent(data.cosmetics.myntra_search_query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginBottom: 24 }}
                >
                  Search foundation on Myntra →
                </SearchButton>
              )}
            </>
          )}

          {/* Avoid */}
          {data.avoid?.length > 0 && (
            <>
              <Divider />
              <SectionTitle style={{ marginTop: 20 }}>Avoid these combinations</SectionTitle>
              <AvoidList style={{ marginBottom: 24 }}>
                {data.avoid.map((a, i) => <AvoidItem key={i}>{a}</AvoidItem>)}
              </AvoidList>
            </>
          )}

          {/* Feedback */}
          <Divider />
          <Label style={{ marginBottom: 8 }}>Were these recommendations helpful?</Label>
          <FeedbackRow>
            <FeedbackBtn
              $active={feedback === true}
              $positive
              onClick={() => submitFeedback(true)}
            >
              {feedback === true ? 'Helpful ✓' : 'Yes, helpful'}
            </FeedbackBtn>
            <FeedbackBtn
              $active={feedback === false}
              onClick={() => submitFeedback(false)}
            >
              {feedback === false ? 'Not helpful ✓' : 'Not really'}
            </FeedbackBtn>
          </FeedbackRow>

          {/* Actions */}
          <Stack $gap="8px" style={{ marginTop: 20 }}>
            <Button onClick={() => navigate('/home')}>
              Style another item
            </Button>
            <ButtonOutline onClick={() => navigate('/history')}>
              View all history
            </ButtonOutline>
          </Stack>
        </PageContent>
      </Container>
    </PageWrapper>
  )
}