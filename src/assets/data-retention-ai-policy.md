# Data Retention & AI Data Usage Policy

**Assortir**
Last updated: March 19, 2026

---

## Part 1: Data Retention Policy

### 1.1 Overview

This policy explains how long we keep your data and why. All data is stored in Frankfurt, Germany (EU) on Supabase infrastructure.

### 1.2 Retention Schedule

| Data Category | Retention Period | Reason |
|---|---|---|
| Account credentials (email, password hash) | Until deletion + 30 days | Service provision |
| Style profile (skin tone, fit, preferences) | Until deletion + 30 days | Service provision |
| Query history (items + recommendations) | 12 months | Service improvement, history feature |
| Usage counters (monthly query count) | 3 months | Billing verification |
| Payment records | 7 years | Legal requirement (India Companies Act, EU VAT) |
| Session tokens (JWT) | 1 hour | Security |
| Location/GPS data | Not retained — real-time only | Privacy by design |
| Anonymized analytics | Up to 36 months | Product improvement |
| Support communications | 2 years | Legal protection |
| Deleted account residual data | 30 days post-deletion | Backup purge cycle |

### 1.3 Automatic Deletion

We have automated processes that delete:
- Expired session tokens immediately on expiry
- Query history older than 12 months on a monthly schedule
- Usage counters older than 3 months on a monthly schedule

### 1.4 Account Deletion

When you delete your account:
1. Your profile, style data, and query history are marked for deletion immediately
2. Data is permanently deleted within 30 days
3. Payment records are retained for 7 years as required by law
4. Anonymized analytical data derived from your usage may be retained (it cannot be linked back to you)

### 1.5 Data Breach

In the event of a data breach affecting your personal data, we will:
- Notify affected users within 72 hours of discovery
- Notify the relevant Data Protection Authority if required
- Provide details of what was affected and steps we are taking

---

## Part 2: AI Data Usage Policy

### 2.1 What AI System We Use

Assortir uses Claude (by Anthropic PBC) via their API to generate outfit recommendations. Each recommendation request sends data to Anthropic's servers in the United States.

### 2.2 What We Send to Claude

Every time you request a recommendation, we send:

**Sent to Claude:**
- Item details: type, color, material, fit, any notes you added
- Anonymized profile: undertone, skin depth, chroma, season, preferred fit, style vibe, region
- Material constraints: your blacklisted and preferred fabrics
- Weather context: temperature, humidity, condition (no GPS coordinates)
- Cosmetics preferences: if you requested cosmetics recommendations

**Never sent to Claude:**
- Your name
- Your email address
- Your user ID or any identifier
- Your phone number
- Your payment information
- Your query history

### 2.3 Anthropic's Use of API Data

When you use Assortir, data sent to Claude is processed by Anthropic under their API terms. Anthropic states they do not use API data to train their models by default. You can review Anthropic's privacy policy at anthropic.com/privacy.

### 2.4 Our Own AI Improvement Program

**What we do:**
We analyze anonymized, aggregated patterns from user interactions to improve our fashion rule database and recommendation quality.

**Examples of what this looks like:**
- "Users with warm undertones in humid climates tend to rate linen recommendations higher than polyester"
- "Relaxed fit + slim top combinations receive higher helpfulness ratings for users who prefer smart casual"

**What anonymization means to us:**
Before any data is used for analysis, we:
1. Remove all identifying fields (name, email, user ID, phone)
2. Aggregate data across at least 100 users before drawing any conclusion
3. Ensure no individual's choices can be identified from the analysis

**What we never do:**
- Sell your data to fashion brands or advertisers
- Share individual user data with any third party for marketing
- Use your data to build profiles for purposes other than styling
- Allow any third party to identify you from our analytics

### 2.5 Opt-Out

You can opt out of contributing to our AI improvement program at any time.

**How to opt out:**
1. Go to Settings → Privacy
2. Toggle off "Contribute to AI improvement"

Or email: contact@assortir.app with subject "AI Training Opt-Out"

**Effect of opting out:**
- Your data will not be included in any future analysis
- Historical aggregated data cannot be retroactively removed (it is already anonymized and cannot be linked to you)
- Opting out has no effect on your recommendations or access to any feature

### 2.6 Data Minimization Principle

We follow the principle of data minimization — we collect and use only what is necessary to provide the service. We have deliberately chosen not to:
- Request photo uploads (despite being a visual product)
- Collect browsing history or app usage patterns beyond what is needed
- Track which specific products you view or purchase after leaving our app
- Collect demographic data beyond what directly affects styling (age, income, etc.)

### 2.7 Future AI Features

If we introduce new AI features that require different data usage, we will:
- Update this policy at least 14 days before launch
- Notify you by email
- Require separate consent where required by law

---

## Part 3: Your Controls

### 3.1 What You Can Control in Settings

| Control | Where to Find It | Effect |
|---|---|---|
| Edit style profile | Settings → Style | Updates what we use for recommendations |
| Edit material preferences | Settings → Materials | Updates fabric blacklist/preferences |
| AI improvement opt-out | Settings → Privacy | Removes you from analytics program |
| Location permission | Browser settings | Disables weather-aware recommendations |
| Delete query history | Settings → History | Deletes your past recommendations |
| Delete account | Settings → Account | Permanently deletes all your data |

### 3.2 Data Export

You can request a complete export of your personal data at any time. Email contact@assortir.app with subject "Data Export Request." We will provide your data in JSON format within 30 days.

---

## Contact

For any questions about data retention or AI data usage:

**Email:** contact@assortir.app
**Subject line:** "Data Policy Question"
**Response time:** Within 30 days

**Grievance Officer (India — DPDP Act 2023):**
Sachin Rathod
contact@assortir.app
Gandhinagar, Gujarat, India
