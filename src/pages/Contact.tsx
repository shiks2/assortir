import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { BRAND_NAME, SUPPORT_EMAIL, FOUNDER_NAME, FOUNDER_LOCATION } from '../constants'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 56px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.bg};
  z-index: 10;
`

const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  img {
    display: block;
    height: 28px;
    width: auto;
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const NavLink = styled(Link)<{ $primary?: boolean }>`
  font-size: 13px;
  font-weight: 500;
  padding: 7px 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  ${({ $primary, theme }) => $primary ? `
    background: ${theme.colors.accent};
    color: #ffffff;
    &:hover { background: #333333; }
  ` : `
    color: ${theme.colors.textSecondary};
    &:hover { color: ${theme.colors.text}; background: ${theme.colors.bgSecondary}; }
  `}
`

const ContactPage = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: 72px 24px 80px;
`

const SectionTag = styled.div`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 12px;
`

const SectionTitle = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  animation: ${fadeUp} 0.6s ease both;
`

const Body = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 32px;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 48px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ContactCard = styled.a`
  display: block;
  padding: 20px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.bgSecondary};
  }
`

const ContactCardIcon = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.accent};
  svg { width: 20px; height: 20px; display: block; }
`

const ContactCardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

const ContactCardText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`

const ContactCardValue = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.accent};
  margin-top: 6px;
  word-break: break-all;
`

const FormSection = styled.div`
  border-top: 0.5px solid ${({ theme }) => theme.colors.border};
  padding-top: 40px;
`

const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`

const FormSub = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
`

const FormGroup = styled.div`
  margin-bottom: 14px;
`

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
`

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bg};
  transition: border-color ${({ theme }) => theme.transitions.fast};
  &:focus { outline: none; border-color: ${({ theme }) => theme.colors.text}; }
  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
`

const Select = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bg};
  cursor: pointer;
  &:focus { outline: none; border-color: ${({ theme }) => theme.colors.text}; }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bg};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  &:focus { outline: none; border-color: ${({ theme }) => theme.colors.text}; }
  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
`

const SubmitButton = styled.button`
  width: 100%;
  height: 44px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};
  margin-top: 4px;
  &:hover { background: ${({ theme }) => theme.colors.primaryHover}; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const SuccessBanner = styled.div`
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.successBg};
  border-radius: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: 20px;
  font-weight: 500;
`

const ErrorBanner = styled.div`
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.errorBg};
  border-radius: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 20px;
`

const Footer = styled.footer`
  background: #0a0a0a;
  padding: 28px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  border-top: 0.5px solid rgba(255,255,255,0.06);
`

const FooterLogo = styled.img`
  display: block;
  height: 28px;
  width: auto;
`

const FooterLinksWrap = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const FooterLink = styled(Link)`
  font-size: 12px;
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  &:hover { color: rgba(255,255,255,0.6); }
`

const FooterText = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.2);
`

// ─── SVG Icons ────────────────────────────────────────────────

const IconEnvelope = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const IconHandshake = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2 6-6"/><path d="m11 17-5-5L3 15l4.65 4.65a2 2 0 0 0 2.83 0L12.5 17.5"/><path d="m7 15 5 5 2.5-2.5"/><path d="m14 11 8-4-2-2-7 6-4-4-2 2 5 5 2-2z"/>
  </svg>
)

const IconDocument = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
  </svg>
)

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !subject || !message) {
      setError('Enter all details to proceed')
      return
    }

    setSending(true)
    setError(null)

    const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`[${BRAND_NAME}] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.open(mailtoLink)

    setTimeout(() => {
      setSuccess(true)
      setSending(false)
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }, 500)
  }

  return (
    <div>
      <Nav>
        <Logo to="/" aria-label="Rang">
          <img src="/src/assets/rang_logo.png" alt="Rang" />
        </Logo>
        <NavLinks>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Sign in</NavLink>
          <NavLink to="/signup" $primary>Start free</NavLink>
        </NavLinks>
      </Nav>

      <ContactPage>
        <SectionTag>Get in touch</SectionTag>
        <SectionTitle>Contact us</SectionTitle>
        <Body>
          We read every email regarding questions, feedback, or press inquiries.
        </Body>

        <ContactGrid>
          <ContactCard href={`mailto:${SUPPORT_EMAIL}`}>
            <ContactCardIcon><IconEnvelope /></ContactCardIcon>
            <ContactCardTitle>General enquiries</ContactCardTitle>
            <ContactCardText>Questions about the app, features, or anything else</ContactCardText>
            <ContactCardValue>{SUPPORT_EMAIL}</ContactCardValue>
          </ContactCard>

          <ContactCard href={`mailto:${SUPPORT_EMAIL}?subject=[Privacy] `}>
            <ContactCardIcon><IconLock /></ContactCardIcon>
            <ContactCardTitle>Privacy & data requests</ContactCardTitle>
            <ContactCardText>Data export, deletion, or privacy policy questions</ContactCardText>
            <ContactCardValue>{SUPPORT_EMAIL}</ContactCardValue>
          </ContactCard>

          <ContactCard href={`mailto:${SUPPORT_EMAIL}?subject=[Business] `}>
            <ContactCardIcon><IconHandshake /></ContactCardIcon>
            <ContactCardTitle>Business & partnerships</ContactCardTitle>
            <ContactCardText>Shopify integration, B2B enquiries, enterprise</ContactCardText>
            <ContactCardValue>{SUPPORT_EMAIL}</ContactCardValue>
          </ContactCard>

          <ContactCard href={`mailto:${SUPPORT_EMAIL}?subject=[Press] `}>
            <ContactCardIcon><IconDocument /></ContactCardIcon>
            <ContactCardTitle>Press & media</ContactCardTitle>
            <ContactCardText>Interview requests, press kit, media coverage</ContactCardText>
            <ContactCardValue>{SUPPORT_EMAIL}</ContactCardValue>
          </ContactCard>
        </ContactGrid>

        <FormSection>
          <FormTitle>Send a message</FormTitle>
          <FormSub>We typically respond within one to two business days.</FormSub>

          {success && (
            <SuccessBanner>
              Your email client has opened. If not, email us directly at {SUPPORT_EMAIL}
            </SuccessBanner>
          )}
          {error && <ErrorBanner>{error}</ErrorBanner>}

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Your name</Label>
              <Input
                placeholder={FOUNDER_NAME}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email address</Label>
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Subject</Label>
              <Select value={subject} onChange={e => setSubject(e.target.value)}>
                <option value="">Select a topic</option>
                <option value="General question">General question</option>
                <option value="Bug report">Bug report</option>
                <option value="Feature request">Feature request</option>
                <option value="Privacy / data request">Privacy / data request</option>
                <option value="Business / partnership">Business / partnership</option>
                <option value="Press / media">Press / media</option>
                <option value="Other">Other</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Message</Label>
              <Textarea
                placeholder="Tell us what's on your mind..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </FormGroup>
            <SubmitButton type="submit" disabled={sending}>
              {sending ? 'Opening email...' : 'Send message'}
            </SubmitButton>
          </form>

          <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 16, lineHeight: 1.5 }}>
            This form opens your email client. For direct contact:
            <strong style={{ color: 'var(--color-text-secondary)' }}> {SUPPORT_EMAIL}</strong>
          </p>
        </FormSection>
      </ContactPage>

      <Footer>
        <FooterLogo src="/src/assets/rang_dark.png" alt="Rang" />
        <FooterLinksWrap>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/legal/privacy">Privacy</FooterLink>
          <FooterLink to="/legal/terms">Terms</FooterLink>
          <FooterLink to="/legal/cookies">Cookies</FooterLink>
        </FooterLinksWrap>
        <FooterText>© 2026 {BRAND_NAME} · {FOUNDER_LOCATION}</FooterText>
      </Footer>
    </div>
  )
}
