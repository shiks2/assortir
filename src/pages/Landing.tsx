// src/pages/Landing.tsx
// deno-lint-ignore-file
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { BRAND_NAME, FOUNDER_NAME, FOUNDER_LOCATION, COMPANY_NAME } from '../constants'
import { PricingContent } from '../components/PricingContent'
import rangDarkAnimate from '../assets/rang_dark_animate.mp4'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Container = styled.div`max-width:1080px;margin:0 auto;padding:0 24px;`
const Narrow = styled.div`max-width:640px;margin:0 auto;padding:0 24px;`

const Nav = styled.nav`
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 32px;height:56px;
  background:rgba(10,10,10,0.88);backdrop-filter:blur(12px);
  border-bottom:0.5px solid rgba(255,255,255,0.08);
`
const NavLogo = styled(Link)`display:inline-flex;align-items:center;text-decoration:none;img{display:block;height:28px;width:auto;}`
const NavLinks = styled.div`display:flex;align-items:center;gap:8px;`
const NavLink = styled(Link) <{ $primary?: boolean }>`
  font-size:13px;font-weight:500;padding:7px 16px;border-radius:8px;text-decoration:none;transition:all 0.15s ease;
  ${({ $primary }) => $primary ? `background:#1a1a1a;color:#fff;&:hover{background:#333333;}` : `color:rgba(255,255,255,0.7);&:hover{color:#fff;background:rgba(255,255,255,0.08);}`}
`

const Hero = styled.section`
  background:#0a0a0a;min-height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:120px 24px 80px;
  position:relative;overflow:hidden;
  &::before{content:'';position:absolute;top:-200px;left:50%;transform:translateX(-50%);
    width:600px;height:600px;
    background:radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%);pointer-events:none;}
`
const HeroBadge = styled.div`
  display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;
  color:#fff;background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.15);
  border-radius:20px;padding:5px 14px;margin-bottom:28px;animation:${fadeIn} 0.6s ease forwards;
`
const HeroHeadline = styled.h1`
  font-size:clamp(40px,7vw,72px);font-weight:500;color:#fff;letter-spacing:-0.03em;
  line-height:1.1;margin-bottom:20px;animation:${fadeUp} 0.7s ease 0.1s both;
  span{color:#1a1a1a;}
`
const HeroSub = styled.p`
  font-size:clamp(15px,2vw,18px);color:rgba(255,255,255,0.55);line-height:1.6;
  max-width:520px;margin:0 auto 36px;animation:${fadeUp} 0.7s ease 0.2s both;
`
const HeroCTA = styled.div`
  display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;
  animation:${fadeUp} 0.7s ease 0.3s both;
`
const HeroMockup = styled.div`
  max-width: 480px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  border: 0.5px solid rgba(255,255,255,0.1);
  animation: ${fadeUp} 0.8s ease 0.4s both;
  img,
  video { width: 100%; display: block; }
`
const HeroMediaRow = styled.div`
  margin-top: 60px;
  width: 100%;
  max-width: 980px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const CTAPrimary = styled(Link)`
  display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:500;
  padding:12px 24px;background:#1a1a1a;color:#fff;border-radius:10px;text-decoration:none;
  transition:all 0.15s ease;&:hover{background:#333333;transform:translateY(-1px);}
`
const HeroNote = styled.p`font-size:12px;color:rgba(255,255,255,0.3);margin-top:16px;animation:${fadeUp} 0.7s ease 0.4s both;`

const DemoStrip = styled.div`
  background:#111;border-top:0.5px solid rgba(255,255,255,0.06);
  border-bottom:0.5px solid rgba(255,255,255,0.06);padding:20px 0;
`
const DemoFlow = styled.div`display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:0 24px;`
const DemoStep = styled.div`display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(255,255,255,0.5);white-space:nowrap;`
const DemoArrow = styled.span`color:rgba(255,255,255,0.2);font-size:16px;`
const DemoHighlight = styled.span`color:#f5f4f2;font-weight:500;`

const Section = styled.section<{ $bg?: string }>`background:${({ $bg }) => $bg || '#fff'};padding:80px 0;`
const SectionTag = styled.div`display:inline-block;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;color:#1a1a1a;margin-bottom:12px;`
const SectionHeadline = styled.h2`font-size:clamp(26px,4vw,40px);font-weight:500;color:#1a1a1a;letter-spacing:-0.02em;line-height:1.2;margin-bottom:16px;`
const SectionSub = styled.p`font-size:16px;color:#6b6b6b;line-height:1.7;margin-bottom:48px;`

const ProblemGrid = styled.div`
  display:grid;grid-template-columns:1fr 1fr;gap:2px;border-radius:14px;
  overflow:hidden;border:0.5px solid #f0ede8;
  @media(max-width:640px){grid-template-columns:1fr;}
`
const ProblemCard = styled.div<{ $dark?: boolean }>`
  padding:28px;background:${({ $dark }) => $dark ? '#1a1a1a' : '#faf9f7'};
  color:${({ $dark }) => $dark ? '#fff' : '#1a1a1a'};
`
const ProblemLabel = styled.div<{ $dark?: boolean }>`
  font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;
  color:${({ $dark }) => $dark ? 'rgba(255,255,255,0.4)' : '#9b9b9b'};margin-bottom:12px;
`
const ProblemText = styled.p<{ $dark?: boolean }>`
  font-size:15px;line-height:1.7;
  color:${({ $dark }) => $dark ? 'rgba(255,255,255,0.7)' : '#6b6b6b'};
`

const StepsGrid = styled.div`
  display:grid;grid-template-columns:repeat(3,1fr);gap:2px;
  @media(max-width:768px){grid-template-columns:1fr;}
`
const StepCard = styled.div`padding:28px 24px;background:#faf9f7;border-radius:12px;`
const StepNumber = styled.div`
  width:32px;height:32px;border-radius:8px;background:#1a1a1a;color:#fff;
  font-size:13px;font-weight:500;display:flex;align-items:center;justify-content:center;margin-bottom:16px;
`
const StepTitle = styled.h3`font-size:15px;font-weight:500;color:#1a1a1a;margin-bottom:8px;`
const StepText = styled.p`font-size:13px;color:#6b6b6b;line-height:1.6;`

const FeatureCard = styled.div`
  padding:20px;border:0.5px solid #f0ede8;border-radius:12px;background:#fff;
  transition:border-color 0.15s ease;&:hover{border-color:#1a1a1a;}
`
const FeatureIcon = styled.div`
  width:32px;height:32px;display:flex;align-items:center;justify-content:center;
  background:#faf3ee;border-radius:8px;margin-bottom:12px;
  svg { width: 20px; height: 20px; }
`
const FeatureTitle = styled.h3`font-size:14px;font-weight:500;color:#1a1a1a;margin-bottom:6px;`
const FeatureText = styled.p`font-size:13px;color:#6b6b6b;line-height:1.6;`

const MicroCTA = styled.div`
  text-align: center;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`
const LinkCTA = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover { text-decoration: underline; }
`

const FeaturedRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`
const SecondaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); }
`
const CredibilityLine = styled.div`
  text-align: center;
  font-size: 12px;
  color: #9b9b9b;
  margin-top: 24px;
  font-weight: 500;
  letter-spacing: 0.02em;
`
const SkinToneRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 12px;
`
const ToneCircle = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 0.5px solid rgba(0,0,0,0.05);
`

const ProofSection = styled.section`background:#0a0a0a;padding:80px 0;`
const TestimonialsGrid = styled.div`
  display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px;
  @media(max-width:768px){grid-template-columns:1fr;}
`
const TestimonialCard = styled.div`
  padding:24px;border:0.5px solid rgba(255,255,255,0.08);
  border-radius:12px;background:rgba(255,255,255,0.03);
`
const TestimonialText = styled.p`font-size:14px;color:rgba(255,255,255,0.7);line-height:1.7;margin-bottom:16px;`
const TestimonialAuthor = styled.div`font-size:12px;color:rgba(255,255,255,0.3);`

const FinalCTA = styled.section`background:#fff;padding:100px 24px;text-align:center;`
const FinalHeadline = styled.h2`font-size:clamp(28px,5vw,48px);font-weight:500;color:#1a1a1a;letter-spacing:-0.02em;line-height:1.2;margin-bottom:16px;`
const FinalSub = styled.p`font-size:16px;color:#6b6b6b;line-height:1.6;max-width:440px;margin:0 auto 32px;`

const Footer = styled.footer`
  background:#0a0a0a;padding:28px 32px;
  display:flex;align-items:center;justify-content:space-between;
  border-top:0.5px solid rgba(255,255,255,0.06);
  @media(max-width:640px){flex-direction:column;gap:12px;text-align:center;}
`
const FooterLogo = styled.img`display:block;height:28px;width:auto;`
const FooterMeta = styled.div`display:flex;flex-direction:column;align-items:flex-end;gap:4px;@media(max-width:640px){align-items:center;}`
const FooterText = styled.p`font-size:12px;color:rgba(255,255,255,0.25);`
const FooterOuterLab = styled.p`
  font-size:11px;color:rgba(255,255,255,0.18);letter-spacing:0.04em;
`

const FooterLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 4px;
`
const FooterLink = styled(Link)`
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  &:hover { color: #fff; }
`

// ─── SVG Icons ────────────────────────────────────────────────

const IconColor = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
  </svg>
)
const IconWeather = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
const IconFabric = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h20M2 6h20M2 18h20" />
  </svg>
)
const IconBlock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" />
  </svg>
)
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
const IconBag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)
const IconBeauty = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const IconAccessory = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────

export default function Landing() {
  return (
    <div>
      <Nav>
        <NavLogo to="/" aria-label="Rang">
          <img src="/src/assets/rang_dark.png" alt="Rang" />
        </NavLogo>
        <NavLinks>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Sign in</NavLink>
          <NavLink to="/signup" $primary>Start free</NavLink>
        </NavLinks>
      </Nav>

      <Hero data-aos="fade-up">
        <HeroBadge>AI personal styling</HeroBadge>
        <HeroHeadline>
          You bought the pants.<br /><span>Now what?</span>
        </HeroHeadline>
        <HeroSub>
          Get 3 specific outfit recommendations,
          personalized to your skin tone and today's weather.
        </HeroSub>
        <HeroCTA>
          <CTAPrimary to="/signup">Style an outfit free</CTAPrimary>
        </HeroCTA>
        <HeroNote>No subscription required. Upgrade only if you love it.</HeroNote>
        
        <HeroMediaRow>
          <HeroMockup>
            <video autoPlay muted loop playsInline>
              <source src={rangDarkAnimate} type="video/mp4" />
            </video>
          </HeroMockup>
          <HeroMockup>
            <img src="/product_screenshot.png" alt="Rang" />
          </HeroMockup>
        </HeroMediaRow>
      </Hero>

      <DemoStrip data-aos="fade-up">
        <DemoFlow>
          <DemoStep><DemoHighlight>White linen pants</DemoHighlight></DemoStep>
          <DemoArrow>→</DemoArrow>
          <DemoStep>Colour · season · style</DemoStep>
          <DemoArrow>→</DemoArrow>
          <DemoStep><DemoHighlight>3 shoppable outfits</DemoHighlight></DemoStep>
          <DemoArrow>→</DemoArrow>
          <DemoStep>Myntra · Ajio · Amazon</DemoStep>
        </DemoFlow>
      </DemoStrip>

      <Section data-aos="fade-up">
        <Narrow>
          <SectionTag>The problem</SectionTag>
          <SectionHeadline>Shopping is simple. Styling is difficult.</SectionHeadline>
          <SectionSub>Most fashion advice is for someone else. Rang is built for you.</SectionSub>
        </Narrow>
        <Container>
          <ProblemGrid>
            <ProblemCard>
              <ProblemLabel>Before {BRAND_NAME}</ProblemLabel>
              <ProblemText>
                You buy white linen pants. You get home.
                You look at your wardrobe for 20 minutes.
                You wear the same safe navy shirt you always wear.
                The pants stay unworn for months.
              </ProblemText>
            </ProblemCard>
            <ProblemCard $dark>
              <ProblemLabel $dark>After {BRAND_NAME}</ProblemLabel>
              <ProblemText $dark>
                You type "white linen pants, relaxed fit."
                You get three specific recommendations:
                why they work for your skin tone,
                and where to find each one.
              </ProblemText>
            </ProblemCard>
            <ProblemCard>
              <ProblemLabel>Generic apps</ProblemLabel>
              <ProblemText>
                "Try a blue shirt." "Add several accessories."
                General advice for a model,
                not your skin tone, your climate,
                or your body type.
              </ProblemText>
            </ProblemCard>
            <ProblemCard $dark>
              <ProblemLabel $dark>{BRAND_NAME}</ProblemLabel>
              <ProblemText $dark>
                Uses a seasonal color system to suggest
                what flatters warm, olive, deep, and cool
                skin tones. Not the model's skin.
                Yours.
              </ProblemText>
            </ProblemCard>
          </ProblemGrid>

          <MicroCTA>
            <LinkCTA to="/signup">Start styling free</LinkCTA>
          </MicroCTA>
        </Container>
      </Section>

      <Section $bg="#faf9f7" data-aos="fade-up">
        <Narrow>
          <SectionTag>How it works</SectionTag>
          <SectionHeadline>Three steps. One outfit.</SectionHeadline>
        </Narrow>
        <Container>
          <StepsGrid>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepTitle>Describe your item</StepTitle>
              <StepText>
                Type "white linen pants, relaxed fit" or paste a
                product link from Myntra, Ajio, or Amazon.
              </StepText>
            </StepCard>
            <StepCard>
              <StepNumber>2</StepNumber>
              <StepTitle>We use your profile</StepTitle>
              <StepText>
                Your skin undertone, depth, preferred fit, and region
                are saved. We check today's weather at your location.
              </StepText>
            </StepCard>
            <StepCard>
              <StepNumber>3</StepNumber>
              <StepTitle>Receive three shoppable recommendations</StepTitle>
              <StepText>
                Each one comes with why it works for you,
                and a direct link to find it.
              </StepText>
            </StepCard>
          </StepsGrid>

          <MicroCTA>
            <LinkCTA to="/signup">Try 10 free recommendations</LinkCTA>
          </MicroCTA>
        </Container>
      </Section>

      <Section data-aos="fade-up">
        <Narrow>
          <SectionTag>Features</SectionTag>
          <SectionHeadline>A different approach to styling.</SectionHeadline>
          <SectionSub>While others give you mood boards, we give you a shopping list.</SectionSub>
        </Narrow>
        <Container>
          <FeaturedRow>
            <FeatureCard style={{ border: '2px solid #1a1a1a' }}>
              <FeatureIcon><IconColor /></FeatureIcon>
              <FeatureTitle>Seasonal color analysis</FeatureTitle>
              <FeatureText>Spring, summer, autumn, and winter. Recommendations based on your exact undertone and skin depth.</FeatureText>
              <SkinToneRow>
                <ToneCircle $color="#F9E4D4" />
                <ToneCircle $color="#EFC1A1" />
                <ToneCircle $color="#BD8E62" />
                <ToneCircle $color="#8D5524" />
                <ToneCircle $color="#4B311E" />
              </SkinToneRow>
            </FeatureCard>
            <FeatureCard style={{ border: '2px solid #1a1a1a' }}>
              <FeatureIcon><IconWeather /></FeatureIcon>
              <FeatureTitle>Weather-aware styling</FeatureTitle>
              <FeatureText>Real-time weather checks. If it is 39°C in Ahmedabad, we will not suggest velvet or heavy layers.</FeatureText>
            </FeatureCard>
            <FeatureCard style={{ border: '2px solid #1a1a1a' }}>
              <FeatureIcon><IconBlock /></FeatureIcon>
              <FeatureTitle>Fabric blacklist tool</FeatureTitle>
              <FeatureText>Dislike polyester? Allergic to wool? Tell us once, and we will never suggest those materials again.</FeatureText>
            </FeatureCard>
          </FeaturedRow>

          <SecondaryGrid>
            <FeatureCard>
              <FeatureIcon><IconFabric /></FeatureIcon>
              <FeatureTitle>Indian fabric intelligence</FeatureTitle>
              <FeatureText>Khadi with cotton. Chanderi with silk. We know the rules for Indian occasions.</FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><IconBag /></FeatureIcon>
              <FeatureTitle>Shoppable output</FeatureTitle>
              <FeatureText>Direct search links for Myntra, Ajio, or Amazon. Find it easily.</FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><IconBeauty /></FeatureIcon>
              <FeatureTitle>Cosmetics</FeatureTitle>
              <FeatureText>Foundation shades and lip colors that complement your outfit.</FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><IconAccessory /></FeatureIcon>
              <FeatureTitle>Accessories</FeatureTitle>
              <FeatureText>Shoes, belts, and watches that complete the look.</FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><IconCheck /></FeatureIcon>
              <FeatureTitle>Preferred materials</FeatureTitle>
              <FeatureText>Prioritize cotton, linen, or khadi for every result.</FeatureText>
            </FeatureCard>
          </SecondaryGrid>

          <CredibilityLine>
            Rules derived from Josef Albers color theory. Reviewed by an 
            IIT Delhi fashion graduate.
          </CredibilityLine>
        </Container>
      </Section>

      <ProofSection data-aos="fade-up">
        <Narrow>
          <SectionTag style={{ color: '#1a1a1a' }}>Early users</SectionTag>
          <SectionHeadline style={{ color: '#fff' }}>User feedback</SectionHeadline>
        </Narrow>
        <Container>
          <TestimonialsGrid>
            <TestimonialCard>
              <TestimonialText>Matches my skin tone. It does not suggest the same olive shirt for everyone.</TestimonialText>
              <TestimonialAuthor>Ananya, Mumbai</TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialText>Recommended a khadi olive shirt I would have missed. Wore it to a lunch and got several compliments.</TestimonialText>
              <TestimonialAuthor>Priya, Bengaluru</TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialText>Suggested breathable fabrics for 40°C heat. Other apps suggest what is trending.</TestimonialText>
              <TestimonialAuthor>Rohan, Ahmedabad</TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </Container>
      </ProofSection>

      <PricingContent />

      <FinalCTA data-aos="fade-up">
        <FinalHeadline>Stop looking<br />at your wardrobe.</FinalHeadline>
        <FinalSub>
          Join a growing community of privacy-conscious users.
          Built from 53 verified styling rules. Free to start.
        </FinalSub>
        <CTAPrimary to="/signup" style={{ margin: '0 auto', display: 'inline-flex' }}>
          Get style recommendations
        </CTAPrimary>
        <p style={{ fontSize: 13, color: '#6b6b6b', marginTop: 16 }}>
          Data stored in Germany (EU) · GDPR compliant · Never sold
        </p>
      </FinalCTA>

      <Footer>
        <FooterLogo src="/src/assets/rang_dark.png" alt="Rang" />
        <FooterMeta>
          <FooterLinks>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/pricing">Pricing</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/legal/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/legal/terms">Terms</FooterLink>
            <FooterLink to="/legal/cookies">Cookies</FooterLink>
          </FooterLinks>
          <FooterText>Built by {FOUNDER_NAME} · {FOUNDER_LOCATION} · © 2026</FooterText>
          <FooterOuterLab>A product of {COMPANY_NAME}</FooterOuterLab>
        </FooterMeta>
      </Footer>
    </div>
  )
}