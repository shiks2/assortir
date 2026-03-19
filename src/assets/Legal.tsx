// ============================================================
// 1. src/pages/Legal.tsx
// Renders Privacy Policy, Terms of Service, Data Policy
// Route: /privacy, /terms, /data-policy
// ============================================================

import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

const Page = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 80px 24px 60px;
`

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 52px;
  border-bottom: 0.5px solid var(--color-border-tertiary);
  position: sticky;
  top: 0;
  background: var(--color-background-primary);
  z-index: 10;
`

const Logo = styled(Link)`
  font-size: 17px;
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: -0.03em;
  text-decoration: none;
  span { color: #C4733A; }
`

const BackLink = styled(Link)`
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
  &:hover { color: var(--color-text-primary); }
`

const DocTitle = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
`

const DocMeta = styled.p`
  font-size: 13px;
  color: var(--color-text-tertiary);
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 0.5px solid var(--color-border-tertiary);
`

const DocBody = styled.div`
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.8;

  h2 {
    font-size: 18px;
    font-weight: 500;
    color: var(--color-text-primary);
    margin: 36px 0 12px;
    padding-top: 24px;
    border-top: 0.5px solid var(--color-border-tertiary);
  }

  h3 {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text-primary);
    margin: 24px 0 8px;
  }

  p { margin-bottom: 14px; }

  ul, ol {
    padding-left: 20px;
    margin-bottom: 14px;
    li { margin-bottom: 6px; }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 13px;
  }

  th {
    text-align: left;
    padding: 8px 12px;
    background: var(--color-background-secondary);
    color: var(--color-text-primary);
    font-weight: 500;
    border: 0.5px solid var(--color-border-tertiary);
  }

  td {
    padding: 8px 12px;
    border: 0.5px solid var(--color-border-tertiary);
    color: var(--color-text-secondary);
    vertical-align: top;
  }

  strong {
    color: var(--color-text-primary);
    font-weight: 500;
  }

  a {
    color: #C4733A;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  blockquote {
    border-left: 3px solid #C4733A;
    padding-left: 16px;
    margin: 16px 0;
    color: var(--color-text-secondary);
    font-style: italic;
  }
`

const LegalNav = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`

const LegalNavLink = styled(Link)<{ $active?: boolean }>`
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 20px;
  text-decoration: none;
  border: 0.5px solid var(--color-border-tertiary);
  transition: all 0.15s ease;
  background: ${({ $active }) => $active ? '#1a1a1a' : 'transparent'};
  color: ${({ $active }) => $active ? '#ffffff' : 'var(--color-text-secondary)'};
  &:hover {
    border-color: var(--color-text-primary);
    color: var(--color-text-primary);
  }
`

// ─── Document content ─────────────────────────────────────────
// In production, load these from .md files or a CMS
// For now, inline the key sections

const docs = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'March 19, 2026',
    content: `
      <h2>1. Who We Are</h2>
      <p>Assortir is an AI-powered personal styling application built and operated by Sachin Rathod, based in Gandhinagar, Gujarat, India.</p>
      <p><strong>Data Storage Location:</strong> Your data is stored on servers located in Frankfurt, Germany (EU), operated by Supabase Inc. Your data is subject to EU data protection standards regardless of where you are located.</p>

      <h2>2. What Data We Collect</h2>
      <h3>Account Data</h3>
      <ul>
        <li>Email address and password (stored as a cryptographic hash)</li>
        <li>Phone number (optional)</li>
      </ul>
      <h3>Style Profile Data</h3>
      <ul>
        <li>Skin tone, undertone, depth, and color season</li>
        <li>Preferred fit, style vibe, and occasion preferences</li>
        <li>Region and gender</li>
        <li>Blacklisted and preferred materials</li>
        <li>Cosmetic preferences (optional)</li>
      </ul>
      <h3>Usage Data</h3>
      <ul>
        <li>Clothing items you enter and recommendations generated</li>
        <li>Your feedback on recommendations</li>
        <li>Query counts per month</li>
      </ul>
      <h3>Location Data (Optional)</h3>
      <p>Approximate GPS coordinates are used only to fetch weather data for weather-aware recommendations. We do not store your location — only the weather data fetched from it.</p>
      <h3>What We Do NOT Collect</h3>
      <ul>
        <li>Photos or images of you</li>
        <li>Payment card details (handled by our payment processor)</li>
        <li>Social media data or contact lists</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p><strong>To provide the service:</strong> Generate personalized recommendations using your profile, apply your material rules, and track usage against your plan limits.</p>
      <p><strong>To improve the service:</strong> Analyze anonymized, aggregated patterns in recommendation helpfulness.</p>
      <p><strong>AI model improvement (opt-out available):</strong> We may use anonymized, aggregated data to improve our styling engine. We never use your name, email, or any identifying information for this purpose. See Section 8 to opt out.</p>

      <h2>4. Legal Basis for Processing (GDPR)</h2>
      <table>
        <tr><th>Processing Activity</th><th>Legal Basis</th></tr>
        <tr><td>Account and recommendations</td><td>Contract (Art. 6(1)(b))</td></tr>
        <tr><td>Location/weather data</td><td>Consent (Art. 6(1)(a))</td></tr>
        <tr><td>Analytics and AI improvement</td><td>Legitimate interests (Art. 6(1)(f))</td></tr>
        <tr><td>Skin tone data</td><td>Explicit consent (Art. 9(2)(a))</td></tr>
      </table>

      <h2>5. Who We Share Your Data With</h2>
      <table>
        <tr><th>Provider</th><th>Purpose</th><th>Location</th></tr>
        <tr><td>Supabase Inc.</td><td>Database and authentication</td><td>Germany (EU)</td></tr>
        <tr><td>Anthropic PBC</td><td>AI recommendations</td><td>United States</td></tr>
        <tr><td>Lemon Squeezy</td><td>Payment processing</td><td>United States</td></tr>
        <tr><td>Open-Meteo</td><td>Weather data</td><td>Switzerland</td></tr>
      </table>
      <p><strong>What we send to Anthropic:</strong> Item details + anonymized style profile (no name, email, or user ID). We do not sell your data.</p>

      <h2>6. Data Retention</h2>
      <table>
        <tr><th>Data Type</th><th>Retention Period</th></tr>
        <tr><td>Account and profile data</td><td>Until deletion + 30 days</td></tr>
        <tr><td>Query history</td><td>12 months</td></tr>
        <tr><td>Payment records</td><td>7 years (legal requirement)</td></tr>
        <tr><td>Location data</td><td>Never stored</td></tr>
      </table>

      <h2>7. Your Rights</h2>
      <p>You have the right to access, correct, delete, and export your data. EU users have additional rights under GDPR. Indian users have rights under the DPDP Act 2023.</p>
      <p>To exercise any right, email <strong>contact@assortir.app</strong> — we respond within 30 days.</p>

      <h2>8. AI Training Opt-Out</h2>
      <p>Go to <strong>Settings → Privacy → "Contribute to AI improvement"</strong> and toggle it off. Or email contact@assortir.app. Opting out has no effect on your recommendations or service access.</p>

      <h2>9. Contact</h2>
      <p>Privacy questions: <strong>contact@assortir.app</strong><br />
      Grievance Officer (India): Sachin Rathod, contact@assortir.app<br />
      EU supervisory authority: BfDI (Germany)</p>
    `
  },
  terms: {
    title: 'Terms of Service',
    updated: 'March 19, 2026',
    content: `
      <h2>1. Agreement</h2>
      <p>By creating an account or using Assortir, you agree to these Terms of Service. These Terms constitute a legally binding agreement between you and Sachin Rathod, operating Assortir from Gandhinagar, Gujarat, India.</p>

      <h2>2. The Service</h2>
      <p>Assortir is an AI-powered personal styling application. Recommendations are generated by AI and are provided for informational purposes only. We do not guarantee that any recommendation will be flattering, available to purchase, or appropriate for every occasion.</p>

      <h2>3. Accounts</h2>
      <p>You must be at least 13 years old to use Assortir. You are responsible for keeping your password secure and all activity under your account. You may not create multiple accounts to circumvent free tier limits.</p>

      <h2>4. Acceptable Use</h2>
      <p><strong>You may not:</strong></p>
      <ul>
        <li>Scrape or extract our fashion rules or AI outputs at scale</li>
        <li>Use automated tools to make queries</li>
        <li>Resell or commercially exploit the Service without written permission</li>
        <li>Attempt to access another user's account or data</li>
        <li>Use the Service in any way that violates applicable law</li>
      </ul>

      <h2>5. Subscriptions and Payments</h2>
      <p>The free plan provides 10 recommendations per month at no cost, resetting on the first of each month permanently. Paid plans are billed monthly via Lemon Squeezy. You may cancel at any time — your plan remains active until the end of the billing period.</p>
      <p><strong>7-day refund policy:</strong> If you upgrade and are not satisfied within 7 days of your first payment, contact us for a full refund. No questions asked.</p>

      <h2>6. AI-Generated Content</h2>
      <p>Recommendations are generated by AI and are suggestions only. Assortir is not a substitute for professional styling, dermatological, or medical advice. If you have skin conditions or allergies, consult a professional.</p>

      <h2>7. Third-Party Links</h2>
      <p>Recommendations include links to third-party platforms (Myntra, Ajio, Amazon, Flipkart). We are not responsible for their content, availability, or pricing. Some links may be affiliate links — this does not affect recommendations or prices you pay.</p>

      <h2>8. Intellectual Property</h2>
      <p>The Assortir name, software, and fashion rules database are our intellectual property. You retain ownership of content you provide and grant us a license to use it to provide the Service.</p>

      <h2>9. Disclaimers</h2>
      <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES INCLUDING ACCURACY OF AI RECOMMENDATIONS AND UNINTERRUPTED SERVICE.</p>

      <h2>10. Limitation of Liability</h2>
      <p>Our total liability for any claim shall not exceed the amount you paid us in the 3 months preceding the claim, or ₹500 (whichever is greater).</p>

      <h2>11. Governing Law</h2>
      <p>These Terms are governed by the laws of India. Disputes are subject to the jurisdiction of courts in Gandhinagar, Gujarat, India. For EU users, nothing limits your rights under EU consumer protection law.</p>

      <h2>12. Contact</h2>
      <p><strong>contact@assortir.app</strong> — Response within 5 business days.</p>
    `
  },
  'data-policy': {
    title: 'Data & AI Policy',
    updated: 'March 19, 2026',
    content: `
      <h2>1. Data Retention</h2>
      <table>
        <tr><th>Data Category</th><th>Retention Period</th><th>Reason</th></tr>
        <tr><td>Account and profile data</td><td>Until deletion + 30 days</td><td>Service provision</td></tr>
        <tr><td>Query history</td><td>12 months</td><td>History feature + improvement</td></tr>
        <tr><td>Usage counters</td><td>3 months</td><td>Billing verification</td></tr>
        <tr><td>Payment records</td><td>7 years</td><td>Legal requirement</td></tr>
        <tr><td>Location/GPS data</td><td>Never stored</td><td>Privacy by design</td></tr>
        <tr><td>Anonymized analytics</td><td>Up to 36 months</td><td>Product improvement</td></tr>
      </table>

      <h2>2. What We Send to Claude (Anthropic)</h2>
      <p><strong>Every recommendation request sends:</strong></p>
      <ul>
        <li>Item details (color, fabric, fit, type)</li>
        <li>Anonymized style profile (undertone, fit preference, region)</li>
        <li>Your blacklisted and preferred materials</li>
        <li>Weather context (temperature, humidity — no GPS)</li>
      </ul>
      <p><strong>We never send to Anthropic:</strong> your name, email, user ID, phone number, or payment information.</p>

      <h2>3. Our AI Improvement Program</h2>
      <p>We analyze anonymized, aggregated patterns to improve our fashion rule database.</p>
      <p><strong>What anonymization means:</strong></p>
      <ul>
        <li>All identifying fields are removed before any analysis</li>
        <li>Data is aggregated across at least 100 users before drawing conclusions</li>
        <li>No individual's choices can be identified from the analysis</li>
      </ul>
      <p><strong>We never:</strong> sell your data, share individual data with advertisers, or allow third parties to identify you from our analytics.</p>

      <h2>4. Opt-Out</h2>
      <p>Go to <strong>Settings → Privacy → "Contribute to AI improvement"</strong> and toggle off. Or email contact@assortir.app with subject "AI Training Opt-Out." Opting out has no effect on your recommendations or service access.</p>

      <h2>5. Data Minimization</h2>
      <p>We deliberately do not collect: photos of you, browsing history, purchase tracking after you leave our app, or demographic data beyond what affects styling recommendations.</p>

      <h2>6. Your Controls</h2>
      <table>
        <tr><th>Control</th><th>Where</th></tr>
        <tr><td>Edit style profile</td><td>Settings → Style</td></tr>
        <tr><td>Edit material blacklist</td><td>Settings → Materials</td></tr>
        <tr><td>AI improvement opt-out</td><td>Settings → Privacy</td></tr>
        <tr><td>Delete query history</td><td>Settings → History</td></tr>
        <tr><td>Export your data</td><td>Email contact@assortir.app</td></tr>
        <tr><td>Delete account</td><td>Settings → Account</td></tr>
      </table>

      <h2>7. Account Deletion</h2>
      <p>When you delete your account, all personal data is permanently deleted within 30 days. Payment records are retained for 7 years as required by law. Already-anonymized analytical data cannot be retroactively removed as it cannot be linked to you.</p>

      <h2>8. Contact</h2>
      <p><strong>contact@assortir.app</strong><br/>
      Response time: Within 30 days<br/>
      Grievance Officer (India): Sachin Rathod, Gandhinagar, Gujarat</p>
    `
  }
}

export default function Legal() {
  const { doc = 'privacy' } = useParams<{ doc: string }>()
  const current = docs[doc as keyof typeof docs] || docs.privacy

  return (
    <div>
      <Nav>
        <Logo to="/">Ass<span>ortir</span></Logo>
        <BackLink to="/">← Back to home</BackLink>
      </Nav>

      <Page>
        <LegalNav>
          <LegalNavLink to="/legal/privacy" $active={doc === 'privacy'}>
            Privacy Policy
          </LegalNavLink>
          <LegalNavLink to="/legal/terms" $active={doc === 'terms'}>
            Terms of Service
          </LegalNavLink>
          <LegalNavLink to="/legal/data-policy" $active={doc === 'data-policy'}>
            Data & AI Policy
          </LegalNavLink>
        </LegalNav>

        <DocTitle>{current.title}</DocTitle>
        <DocMeta>Last updated: {current.updated} · Effective immediately</DocMeta>

        <DocBody
          dangerouslySetInnerHTML={{ __html: current.content }}
        />
      </Page>
    </div>
  )
}


// ============================================================
// 2. Add to App.tsx routes
// ============================================================

// import Legal from './pages/Legal'
//
// <Route path="/legal/:doc" element={<Legal />} />
// <Route path="/legal" element={<Navigate to="/legal/privacy" replace />} />


// ============================================================
// 3. Update Signup.tsx — add acceptance checkbox
// ============================================================
//
// Add this state:
// const [accepted, setAccepted] = useState(false)
//
// Add this validation in handleSubmit:
// if (!accepted) return setError('Please accept the Terms of Service and Privacy Policy to continue')
//
// Add this JSX before the submit button:

/*
const ConsentBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  border: 0.5px solid var(--color-border-tertiary);
  margin-bottom: 12px;
`

const ConsentText = styled.p`
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.5;

  a {
    color: var(--color-text-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`

// JSX to add in the form before the submit button:
<ConsentBox>
  <input
    type="checkbox"
    id="accept"
    checked={accepted}
    onChange={e => setAccepted(e.target.checked)}
    style={{ marginTop: 2, flexShrink: 0, cursor: 'pointer' }}
  />
  <ConsentText>
    <label htmlFor="accept" style={{ cursor: 'pointer' }}>
      I have read and agree to the{' '}
      <a href="/legal/terms" target="_blank">Terms of Service</a>
      {', '}
      <a href="/legal/privacy" target="_blank">Privacy Policy</a>
      {', and '}
      <a href="/legal/data-policy" target="_blank">Data & AI Policy</a>.
      {' '}I understand that anonymized data may be used to improve
      recommendations, and I can opt out in Settings at any time.
    </label>
  </ConsentText>
</ConsentBox>
*/


// ============================================================
// 4. Add legal links to Landing.tsx footer
// ============================================================

// Replace the Footer section in Landing.tsx with:
/*
<Footer>
  <FooterLogo>Ass<span>ortir</span></FooterLogo>
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
    <FooterLink to="/legal/privacy">Privacy Policy</FooterLink>
    <FooterLink to="/legal/terms">Terms of Service</FooterLink>
    <FooterLink to="/legal/data-policy">Data & AI Policy</FooterLink>
  </div>
  <FooterText>© 2026 Assortir · Built by Sachin Rathod</FooterText>
</Footer>

// Add styled component:
const FooterLink = styled(Link)`
  font-size: 12px;
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  &:hover { color: rgba(255,255,255,0.6); }
`
*/
