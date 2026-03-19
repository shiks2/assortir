import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import type { Query } from '../types'
import { useAuth } from '../context/AuthContext'
import {
  PageWrapper, Navbar, Container, Tag, Heading, Label,
  Spinner, ErrorMessage, EmptyState, Row,
} from '../components/index'
import styled from 'styled-components'

// ─── Styled ───────────────────────────────────────────────────

const PageContent = styled.div`
  flex: 1;
  padding: 24px 0 48px;
`

const PageHeader = styled.div`
  margin-bottom: 20px;
`

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
`

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.bg};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.colors.bgSecondary}; }
`

const ItemIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bgSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ItemTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.base};
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ItemMeta = styled.p`
  font-size: ${({ theme }) => theme.typography.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-top: 2px;
`

const ItemBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.xs};
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  flex-shrink: 0;
`

const HelpfulDot = styled.span<{ $helpful?: boolean | null }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $helpful }) =>
    $helpful === true ? '#639922' :
      $helpful === false ? '#E24B4A' :
        'transparent'};
`

// ─── Helpers ──────────────────────────────────────────────────

// ─── Icons ────────────────────────────────────────────────────

const IconShirt = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.62 1.96V10a6 6 0 0 0 12 0c0-1.12-.22-2.18-.62-3.14" />
    <path d="M12 2v20" />
    <path d="M16 22a2 2 0 0 0 2-2V5" />
    <path d="M8 22a2 2 0 0 1-2-2V5" />
  </svg>
)

const IconPants = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2v20" />
    <path d="M15 2v20" />
    <path d="M9 4H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4M15 4h4c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-4" />
    <path d="M9 12H3" />
    <path d="M21 12h-6" />
  </svg>
)

const IconDress = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 8 6h8z" />
    <path d="M9 7h6l4 15H5z" />
  </svg>
)

function getItemIcon(type: string) {
  const t = type.toLowerCase()
  if (t.includes('shirt') || t.includes('kurta')) return <IconShirt />
  if (t.includes('pants') || t.includes('jeans') || t.includes('shorts')) return <IconPants />
  if (t.includes('dress') || t.includes('skirt') || t.includes('saree')) return <IconDress />
  return <IconShirt />
}

const INTENT_LABELS: Record<string, string> = {
  outfit_only: 'Outfit',
  outfit_accessories: 'Outfit + Accessories',
  outfit_cosmetics: 'Outfit + Beauty',
  everything: 'Everything',
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / 86400000)

  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

// ─── Component ────────────────────────────────────────────────

export default function History() {
  const { user, profile, isPro, queriesRemaining } = useAuth()
  const navigate = useNavigate()

  const [queries, setQueries] = useState<Query[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) fetchHistory()
  }, [user])

  async function fetchHistory() {
    setLoading(true)
    const { data, error } = await supabase
      .from('queries')
      .select(
        'id, item_type, item_color, item_material, item_fit, intent, was_helpful, created_at'
      )
      // ← no output_json — fetch that only when user clicks a specific item
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(20)  // 20 is enough for a history list
    /* const { data, error } = await supabase
      .from('queries')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(50) */

    if (error) {
      setError('Could not load history')
    } else {
      setQueries(data as Query[])
    }
    setLoading(false)
  }

  return (
    <PageWrapper>
      <Navbar
        activePage="history"
        isPro={isPro}
        queriesRemaining={queriesRemaining === Infinity ? undefined : queriesRemaining}
        userName={profile?.full_name ?? ''}
        onAvatarClick={() => navigate('/settings')}
      />

      <Container>
        <PageContent>
          <PageHeader>
            <Tag $variant="history">Past looks</Tag>
            <Heading>Your history</Heading>
            <Label style={{ marginTop: 6 }}>All your past outfit recommendations</Label>
          </PageHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          {loading ? (
            <Row $justify="center" style={{ padding: '48px 0' }}>
              <Spinner $size={28} />
            </Row>
          ) : queries.length === 0 ? (
            <EmptyState>
              <p>No recommendations yet</p>
              <p>Style your first item to see history here</p>
            </EmptyState>
          ) : (
            <HistoryList>
              {queries.map(query => (
                <HistoryItem
                  key={query.id}
                  onClick={() => navigate(`/result/${query.id}`)}
                >
                  <ItemIcon>{getItemIcon(query.item_type)}</ItemIcon>
                  <ItemInfo>
                    <ItemTitle>
                      {query.item_color} {query.item_material} {query.item_type}
                    </ItemTitle>
                    <ItemMeta>
                      {formatDate(query.created_at)} · {INTENT_LABELS[query.intent] ?? query.intent}
                    </ItemMeta>
                  </ItemInfo>
                  <HelpfulDot $helpful={query.was_helpful} />
                  <ItemBadge>3 looks</ItemBadge>
                </HistoryItem>
              ))}
            </HistoryList>
          )}
        </PageContent>
      </Container>
    </PageWrapper>
  )
}