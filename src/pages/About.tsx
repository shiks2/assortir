import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { BRAND_NAME, FOUNDER_NAME, FOUNDER_LOCATION, SUPPORT_EMAIL } from '../constants'
import rangLogo from '../assets/rang_logo.png'
import rangDarkLogo from '../assets/rang_dark.png'

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

const Hero = styled.section`
  background: #0a0a0a;
  padding: 100px 24px 80px;
  text-align: center;
`

const HeroTag = styled.div`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 16px;
  animation: ${fadeUp} 0.6s ease both;
`

const HeroHeadline = styled.h1`
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 500;
  color: #ffffff;
  letter-spacing: -0.03em;
  line-height: 1.15;
  max-width: 640px;
  margin: 0 auto 20px;
  animation: ${fadeUp} 0.6s ease 0.1s both;
`

const HeroSub = styled.p`
  font-size: 16px;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto;
  animation: ${fadeUp} 0.6s ease 0.2s both;
`

const Page = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 72px 24px 80px;
`

const Section = styled.section`
  margin-bottom: 60px;
`

const SectionTag = styled.div`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 12px;
`

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  margin-bottom: 16px;
`

const Body = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 14px;
`

const Divider = styled.div`
  height: 0.5px;
  background: ${({ theme }) => theme.colors.border};
  margin: 48px 0;
`

const FounderCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.bgSecondary};

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #f5f4f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
  flex-shrink: 0;
`

const FounderInfo = styled.div``

const FounderName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

const FounderRole = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 10px;
`

const FounderBio = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`

const FounderLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
`

const FounderLink = styled.a`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textTertiary};
  text-decoration: none;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  padding: 4px 10px;
  border-radius: 20px;
  transition: all ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ValueCard = styled.div`
  padding: 20px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`

const ValueTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`

const ValueText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`

const CTASection = styled.div`
  text-align: center;
  padding: 48px 24px;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: 16px;
`

const CTATitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  margin-bottom: 10px;
`

const CTASub = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
`

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.accent};
  color: #ffffff;
  border-radius: 10px;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  &:hover { background: #333333; }
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

export default function About() {
  const initials = FOUNDER_NAME.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div>
      <Nav>
        <Logo to="/" aria-label="Rang">
          <img src={rangLogo} alt="Rang" />
        </Logo>
        <NavLinks>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Sign in</NavLink>
          <NavLink to="/signup" $primary>Start free</NavLink>
        </NavLinks>
      </Nav>

      <Hero>
        <HeroTag>Our story</HeroTag>
        <HeroHeadline>
          Built for those who keep wearing the same safe outfit
        </HeroHeadline>
        <HeroSub>
          {BRAND_NAME} began with a simple frustration: buying quality clothes
          but not knowing how to pair them.
        </HeroSub>
      </Hero>

      <Page>
        <Section>
          <SectionTag>Why we built this</SectionTag>
          <SectionTitle>Fashion advice for you</SectionTitle>
          <Body>
            Most styling apps suggest what look good on a model
            in a studio. They do not know your skin undertone.
            They do not know it is 38°C and humid in your city.
            They do not know you are attending a wedding next month
            where specific color rules apply.
          </Body>
          <Body>
            {BRAND_NAME} addresses these challenges. We provide more than mood boards
            or general advice. We offer specific, shoppable recommendations that consider
            your biology, your climate, and your cultural context.
          </Body>
          <Body>
            Every recommendation is run by a fashion rules engine built from
            color theory, textile science, and expert review.
            This system helps make specific, actionable output with search links so you
            can buy what you need.
          </Body>
        </Section>

        <Divider />

        <Section>
          <SectionTag>The team</SectionTag>
          <SectionTitle>Built in {FOUNDER_LOCATION}</SectionTitle>
          <FounderCard>
            <Avatar>{initials}</Avatar>
            <FounderInfo>
              <FounderName>{FOUNDER_NAME}</FounderName>
              <FounderRole>Founder & Engineer</FounderRole>
              <FounderBio>
                Software engineer with experience building
                real-time IoT platforms and mobile applications.
                MCA candidate at LJ University, Ahmedabad.
                Built {BRAND_NAME} because he bought clothes he did not know
                how to wear.
              </FounderBio>
              <FounderLinks>
                <FounderLink
                  href="https://linkedin.com/in/sachin-rathod"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </FounderLink>
                <FounderLink
                  href="https://github.com/shiks2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </FounderLink>
                <FounderLink
                  href="https://youtube.com/@SachinRathod"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube (DevDiary)
                </FounderLink>
                <FounderLink
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </FounderLink>
              </FounderLinks>
            </FounderInfo>
          </FounderCard>
        </Section>

        <Divider />

        <Section>
          <SectionTag>What we believe</SectionTag>
          <SectionTitle>The principles behind every recommendation</SectionTitle>
          <ValuesGrid>
            <ValueCard>
              <ValueTitle>Personalization over popularity</ValueTitle>

              <ValueText>
                What looks good on someone else does not always look good on you.
                Skin tone, depth, and undertone change everything.
                We never suggest what is trending; we suggest what works for you.
              </ValueText>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Specificity over vagueness</ValueTitle>
              <ValueText>
                General advice is often unhelpful. We provide specific recommendations,
                such as a terracotta cotton shirt with a direct search link.
                Every recommendation we make is specific enough to act on.
              </ValueText>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Indian context is not an afterthought</ValueTitle>
              <ValueText>
                Most fashion apps were designed for Western wardrobes.
                Khadi, Chanderi, Banarasi, and cultural color rules
                are built into our core.
              </ValueText>
            </ValueCard>
            <ValueCard>
              <ValueTitle>Privacy is not negotiable</ValueTitle>
              <ValueText>
                Your skin tone data is sensitive. We store it encrypted in Germany (EU),
                never sell it, and never share identifying details with AI providers.
                You can remove your data at any time.
              </ValueText>
            </ValueCard>
          </ValuesGrid>
        </Section>

        <Divider />

        <Section>
          <CTASection>
            <CTATitle>Try it for free</CTATitle>
            <CTASub>
              10 free recommendations. No card needed. Profiles take 90 seconds to set up.
            </CTASub>
            <CTAButton to="/signup">
              Start styling free
            </CTAButton>
          </CTASection>
        </Section>
      </Page>

      <Footer>
        <FooterLogo src={rangDarkLogo} alt="Rang" />
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
