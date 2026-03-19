import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import {
  PageWrapper, Navbar, Container, Tag, Heading, 
  Stack, Row, Spinner, ErrorMessage
} from '../components/index'
import { useAuth } from '../context/AuthContext'

import { SUPPORT_EMAIL, BRAND_NAME, FOUNDER_NAME, FOUNDER_LOCATION, COMPANY_NAME } from '../constants'

const MarkdownContent = styled.div`
  font-size: ${({ theme }) => theme.typography.base};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  h1, h2, h3 {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.medium};
    margin-top: ${({ theme }) => theme.spacing.xxl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    letter-spacing: -0.02em;
  }
  
  h1 { font-size: ${({ theme }) => theme.typography.xxl}; }
  h2 { font-size: ${({ theme }) => theme.typography.xl}; }
  h3 { font-size: ${({ theme }) => theme.typography.lg}; }
  
  p { margin-bottom: ${({ theme }) => theme.spacing.lg}; }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-left: 20px;
  }
  
  li { margin-bottom: ${({ theme }) => theme.spacing.sm}; }
  
  strong { 
    font-weight: ${({ theme }) => theme.typography.medium}; 
    color: ${({ theme }) => theme.colors.text}; 
  }
  
  hr {
    border: none;
    border-top: 0.5px solid ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => theme.spacing.xxxl} 0;
  }
`

const LegalNav = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
`

const LegalNavLink = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ $active, theme }) => $active ? theme.colors.accent : theme.colors.textTertiary};
  cursor: pointer;
  padding: 8px 0;
  position: relative;
  transition: color ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -9px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: ${({ $active }) => $active ? 1 : 0};
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`

export default function Legal() {
  const { doc } = useParams()
  const navigate = useNavigate()
  const { user, profile, isPro, queriesRemaining } = useAuth()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDoc() {
      if (!doc) return
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/legal/${doc}.md`)
        if (!res.ok) throw new Error('Document not found')
        const text = await res.text()
        const replaced = text
          .replace(/{{SUPPORT_EMAIL}}/g, SUPPORT_EMAIL)
          .replace(/{{BRAND_NAME}}/g, BRAND_NAME)
          .replace(/{{FOUNDER_NAME}}/g, FOUNDER_NAME)
          .replace(/{{FOUNDER_LOCATION}}/g, FOUNDER_LOCATION)
          .replace(/{{COMPANY_NAME}}/g, COMPANY_NAME)
        setContent(replaced)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDoc()
    window.scrollTo(0, 0)
  }, [doc])

  const docs = [
    { id: 'privacy', label: 'Privacy' },
    { id: 'terms', label: 'Terms' },
    { id: 'cookies', label: 'Cookies' },
  ]

  return (
    <PageWrapper>
      <Navbar
        activePage="legal"
        isPro={isPro}
        queriesRemaining={queriesRemaining}
        userName={profile?.full_name ?? user?.email ?? ''}
        onAvatarClick={() => navigate('/settings')}
      />

      <Container style={{ paddingTop: 40, paddingBottom: 80 }}>
        <Tag $variant="default">Legal</Tag>
        <Heading style={{ marginBottom: 24 }}>Documentation</Heading>
        
        <LegalNav>
          {docs.map(d => (
            <LegalNavLink
              key={d.id}
              $active={doc === d.id}
              onClick={() => navigate(`/legal/${d.id}`)}
            >
              {d.label}
            </LegalNavLink>
          ))}
        </LegalNav>

        <Stack $gap="24px">
          {loading ? (
            <Row $justify="center" style={{ padding: '40px 0' }}>
              <Spinner $size={32} />
            </Row>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <MarkdownContent>
              <ReactMarkdown>{content}</ReactMarkdown>
            </MarkdownContent>
          )}
        </Stack>
      </Container>
    </PageWrapper>
  )
}
