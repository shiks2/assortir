import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BRAND_NAME } from '../constants'
import { Button, ButtonOutline, Container, Heading, Label, Grid, Card } from './index'

// ─── Styled Components ──────────────────────────────────────────

const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: 48px;
`

const PricingGrid = styled(Grid)`
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const PlanCard = styled(Card)<{ $featured?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  border: ${({ $featured, theme }) => $featured ? `2px solid ${theme.colors.accent}` : `0.5px solid ${theme.colors.border}`};
  background: ${({ theme }) => theme.colors.bg};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`

const Badge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const PlanName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
`

const PlanPrice = styled.div`
  margin-bottom: 24px;
  .amount {
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
  .period {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  flex-grow: 1;
`

const FeatureItem = styled.li<{ $excluded?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin-bottom: 12px;
  color: ${({ $excluded, theme }) => $excluded ? theme.colors.textTertiary : theme.colors.textSecondary};
  text-decoration: ${({ $excluded }) => $excluded ? 'line-through' : 'none'};

  svg {
    flex-shrink: 0;
    color: ${({ $excluded, theme }) => $excluded ? theme.colors.border : theme.colors.accent};
  }
`

const RiskReversal = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textTertiary};
  text-align: center;
  margin-top: 12px;
`

const TrustRowWrapper = styled.div`
  margin-top: 64px;
  padding-top: 40px;
  border-top: 0.5px solid ${({ theme }) => theme.colors.border};
`

const TrustGrid = styled(Grid)`
  grid-template-columns: repeat(4, 1fr);
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const TrustItem = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  svg { color: ${({ theme }) => theme.colors.textSecondary}; }
  p {
    font-size: 11px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`

const FAQSection = styled.div`
  margin-top: 80px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
`

const FAQItem = styled.div`
  margin-bottom: 24px;
  h4 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.text};
  }
  p {
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

// ─── Hero SVGs ────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────

export function PricingContent() {
  return (
    <Container style={{ paddingBottom: 80 }}>
      <PricingHeader>
        <Heading>Simple, transparent pricing</Heading>
        <Label style={{ marginTop: 8 }}>
          Most people are hooked by their third recommendation.
        </Label>
      </PricingHeader>

      <PricingGrid>
        {/* Free Plan */}
        <PlanCard>
          <PlanName>Free</PlanName>
          <PlanPrice>
            <span className="amount">₹0</span>
            <span className="period"> / forever</span>
          </PlanPrice>
          <FeatureList>
            <FeatureItem><CheckIcon /> 3 outfits per week</FeatureItem>
            <FeatureItem><CheckIcon /> Basic color matching</FeatureItem>
            <FeatureItem><CheckIcon /> Weather integration</FeatureItem>
            <FeatureItem $excluded><XIcon /> Indian fabric intelligence</FeatureItem>
            <FeatureItem $excluded><XIcon /> No ads</FeatureItem>
            <FeatureItem $excluded><XIcon /> Priority styling AI</FeatureItem>
          </FeatureList>
          <ButtonOutline as={Link} to="/signup">Start free</ButtonOutline>
          <RiskReversal>No credit card required</RiskReversal>
        </PlanCard>

        {/* Pro Plan */}
        <PlanCard $featured>
          <Badge>Most Popular</Badge>
          <PlanName>Pro</PlanName>
          <PlanPrice>
            <span className="amount">₹299</span>
            <span className="period"> / month</span>
          </PlanPrice>
          <FeatureList>
            <FeatureItem><CheckIcon /> Unlimited daily outfits</FeatureItem>
            <FeatureItem><CheckIcon /> 4-Season color analysis</FeatureItem>
            <FeatureItem><CheckIcon /> Weather-aware styling</FeatureItem>
            <FeatureItem><CheckIcon /> Fabric blacklist tool</FeatureItem>
            <FeatureItem><CheckIcon /> No advertisements</FeatureItem>
            <FeatureItem $excluded><XIcon /> Family styling accounts</FeatureItem>
          </FeatureList>
          <Button as={Link} to="/signup">Go Pro</Button>
          <RiskReversal>7 days free trial</RiskReversal>
        </PlanCard>

        {/* Power Plan */}
        <PlanCard>
          <PlanName>Power</PlanName>
          <PlanPrice>
            <span className="amount">₹599</span>
            <span className="period"> / month</span>
          </PlanPrice>
          <FeatureList>
            <FeatureItem><CheckIcon /> Everything in Pro</FeatureItem>
            <FeatureItem><CheckIcon /> 5 Family sub-profiles</FeatureItem>
            <FeatureItem><CheckIcon /> Priority AI processing</FeatureItem>
            <FeatureItem><CheckIcon /> Concierge styling support</FeatureItem>
            <FeatureItem><CheckIcon /> Early access to filters</FeatureItem>
            <FeatureItem><CheckIcon /> Specialized shoppable links</FeatureItem>
          </FeatureList>
          <ButtonOutline as={Link} to="/contact">Contact Sales</ButtonOutline>
          <RiskReversal>Cancel anytime</RiskReversal>
        </PlanCard>
      </PricingGrid>

      {/* Trust Row */}
      <TrustRowWrapper>
        <TrustGrid>
          <TrustItem>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <p>Secure SSL</p>
          </TrustItem>
          <TrustItem>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <p>Data stored in EU</p>
          </TrustItem>
          <TrustItem>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8L8 16"/><path d="M8 8l8 16"/></svg>
            <p>Refund policy</p>
          </TrustItem>
          <TrustItem>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <p>Cancel anytime</p>
          </TrustItem>
        </TrustGrid>
      </TrustRowWrapper>

      {/* FAQ */}
      <FAQSection>
        <PricingHeader style={{ marginBottom: 32 }}>
          <Heading style={{ fontSize: '24px' }}>Common questions</Heading>
        </PricingHeader>
        
        <FAQItem>
          <h4>Does the free plan expire?</h4>
          <p>No. You can use the free plan forever. It includes 3 style recommendations per week which is perfect for trying the core engine.</p>
        </FAQItem>

        <FAQItem>
          <h4>What counts as a "recommendation"?</h4>
          <p>Each time you ask {BRAND_NAME} to style an outfit, it counts as one recommendation. The Pro plan gives you unlimited queries for those days you just can't decide.</p>
        </FAQItem>

        <FAQItem>
          <h4>Can I use it for my whole family?</h4>
          <p>The Power plan supports up to 5 individual sub-profiles. Each profile has its own skin tone, body type, and preferred fit settings.</p>
        </FAQItem>

        <FAQItem>
          <h4>Is my data safe?</h4>
          <p>Yes. Our infrastructure is run on Supabase in Germany (EU). We comply with strict GDPR standards and never sell your profile data or photos.</p>
        </FAQItem>

        <FAQItem>
          <h4>Do you offer refunds?</h4>
          <p>We handle refunds on a case-by-case basis. If you haven't used a significant portion of your monthly quota, we generally approve refund requests within 48 hours.</p>
        </FAQItem>

        <FAQItem>
          <h4>Can I integrate my Shopify store?</h4>
          <p>Currently, {BRAND_NAME} is a consumer styling app. For business partnerships or API access, please reach out via our contact page.</p>
        </FAQItem>
      </FAQSection>
    </Container>
  )
}
