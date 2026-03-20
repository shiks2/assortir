// src/components/Banner.tsx
// Contextual banner component for Rang
// Variants: warning, danger, info, success
// Usage: query limits, tips, announcements, confirmations

import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ─── Types ────────────────────────────────────────────────────

type BannerVariant = 'warning' | 'danger' | 'info' | 'success' | 'neutral'

interface BannerProps {
  variant: BannerVariant
  title: string
  subtitle?: string
  primaryAction?: { label: string; to?: string; onClick?: () => void }
  secondaryAction?: { label: string; to?: string; onClick?: () => void }
  dismissible?: boolean
  onDismiss?: () => void
  showProgress?: boolean
  progressValue?: number  // 0-100
}

// ─── Animations ───────────────────────────────────────────────

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ─── Theme maps ───────────────────────────────────────────────

const variantStyles = {
  warning: {
    bg:           '#FAEEDA',
    border:       '#EF9F27',
    iconBg:       '#FAC775',
    iconStroke:   '#BA7517',
    title:        '#412402',
    subtitle:     '#633806',
    progressFill: '#BA7517',
    closeFill:    '#633806',
  },
  danger: {
    bg:           '#FCEBEB',
    border:       '#E24B4A',
    iconBg:       '#F7C1C1',
    iconStroke:   '#E24B4A',
    title:        '#501313',
    subtitle:     '#791F1F',
    progressFill: '#E24B4A',
    closeFill:    '#791F1F',
  },
  info: {
    bg:           'var(--color-background-secondary)',
    border:       'var(--color-border-tertiary)',
    iconBg:       'var(--color-background-tertiary)',
    iconStroke:   'var(--color-text-tertiary)',
    title:        'var(--color-text-primary)',
    subtitle:     'var(--color-text-secondary)',
    progressFill: 'var(--color-text-primary)',
    closeFill:    'var(--color-text-tertiary)',
  },
  success: {
    bg:           '#EAF3DE',
    border:       '#97C459',
    iconBg:       '#C0DD97',
    iconStroke:   '#3B6D11',
    title:        '#173404',
    subtitle:     '#27500A',
    progressFill: '#3B6D11',
    closeFill:    '#27500A',
  },
  neutral: {
    bg:           '#F4F4F4',
    border:       '#CFCFCF',
    iconBg:       '#E8E8E8',
    iconStroke:   '#525252',
    title:        '#1C1C1C',
    subtitle:     '#3A3A3A',
    progressFill: '#525252',
    closeFill:    '#525252',
  },
}

// ─── Styled components ────────────────────────────────────────

const Wrap = styled.div<{ $v: BannerVariant }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 0.5px solid ${({ $v }) => variantStyles[$v].border};
  background: ${({ $v }) => variantStyles[$v].bg};
  animation: ${slideDown} 0.2s ease both;
  width: 100%;
`

const Left = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 1;
  min-width: 0;
`

const IconBox = styled.div<{ $v: BannerVariant }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ $v }) => variantStyles[$v].iconBg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
`

const Content = styled.div`
  flex: 1;
  min-width: 0;
`

const Title = styled.p<{ $v: BannerVariant }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ $v }) => variantStyles[$v].title};
  line-height: 1.4;
`

const Subtitle = styled.p<{ $v: BannerVariant }>`
  font-size: 12px;
  color: ${({ $v }) => variantStyles[$v].subtitle};
  margin-top: 2px;
  line-height: 1.5;
`

const ProgressTrack = styled.div`
  height: 3px;
  background: rgba(0,0,0,0.08);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ $v: BannerVariant; $value: number }>`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background: ${({ $v }) => variantStyles[$v].progressFill};
  border-radius: 2px;
  transition: width 0.4s ease;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`

const ActionButton = styled.button<{ $v: BannerVariant; $primary?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s ease;
  border: 0.5px solid;

  ${({ $v, $primary }) => $primary ? `
    background: ${variantStyles[$v].title};
    color: ${variantStyles[$v].bg};
    border-color: ${variantStyles[$v].title};
  ` : `
    background: transparent;
    color: ${variantStyles[$v].subtitle};
    border-color: ${variantStyles[$v].border};
  `}

  &:hover { opacity: 0.8; }
`

const ActionLink = styled(Link)<{ $v: BannerVariant; $primary?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s ease;
  border: 0.5px solid;
  text-decoration: none;
  display: inline-flex;
  align-items: center;

  ${({ $v, $primary }) => $primary ? `
    background: ${variantStyles[$v].title};
    color: ${variantStyles[$v].bg};
    border-color: ${variantStyles[$v].title};
  ` : `
    background: transparent;
    color: ${variantStyles[$v].subtitle};
    border-color: ${variantStyles[$v].border};
  `}

  &:hover { opacity: 0.8; }
`

const CloseBtn = styled.button<{ $v: BannerVariant }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  opacity: 0.5;
  background: transparent;
  border: none;
  transition: opacity 0.15s ease;
  flex-shrink: 0;
  &:hover { opacity: 1; }
`

// ─── Icons ────────────────────────────────────────────────────

function WarningIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L14 13H2L8 2Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 6.5V9" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="11" r="0.75" fill={stroke}/>
    </svg>
  )
}

function DangerIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke={stroke} strokeWidth="1.5"/>
      <path d="M8 5v3.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="11" r="0.75" fill={stroke}/>
    </svg>
  )
}

function InfoIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke={stroke} strokeWidth="1.5"/>
      <path d="M8 7.5V11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="5.5" r="0.75" fill={stroke}/>
    </svg>
  )
}

function SuccessIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke={stroke} strokeWidth="1.5"/>
      <path d="M5 8l2 2 4-4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CloseIcon({ fill }: { fill: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 2l8 8M10 2l-8 8" stroke={fill} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

const icons = {
  warning: WarningIcon,
  danger:  DangerIcon,
  info:    InfoIcon,
  success: SuccessIcon,
  neutral: InfoIcon,
}

// ─── Banner component ─────────────────────────────────────────

export function Banner({
  variant,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  dismissible = true,
  onDismiss,
  showProgress = false,
  progressValue = 0,
}: BannerProps) {
  const s = variantStyles[variant]
  const Icon = icons[variant]

  return (
    <Wrap $v={variant}>
      <Left>
        <IconBox $v={variant}>
          <Icon stroke={s.iconStroke} />
        </IconBox>
        <Content>
          <Title $v={variant}>{title}</Title>
          {subtitle && <Subtitle $v={variant}>{subtitle}</Subtitle>}
          {showProgress && (
            <ProgressTrack>
              <ProgressFill $v={variant} $value={progressValue} />
            </ProgressTrack>
          )}
        </Content>
      </Left>

      <Right>
        {primaryAction && (
          primaryAction.to ? (
            <ActionLink to={primaryAction.to} $v={variant} $primary>
              {primaryAction.label}
            </ActionLink>
          ) : (
            <ActionButton onClick={primaryAction.onClick} $v={variant} $primary>
              {primaryAction.label}
            </ActionButton>
          )
        )}
        {secondaryAction && (
          secondaryAction.to ? (
            <ActionLink to={secondaryAction.to} $v={variant}>
              {secondaryAction.label}
            </ActionLink>
          ) : (
            <ActionButton onClick={secondaryAction.onClick} $v={variant}>
              {secondaryAction.label}
            </ActionButton>
          )
        )}
        {dismissible && onDismiss && (
          <CloseBtn $v={variant} onClick={onDismiss}>
            <CloseIcon fill={s.closeFill} />
          </CloseBtn>
        )}
      </Right>
    </Wrap>
  )
}


// ─── Smart banner — reads from AuthContext automatically ──────
// Drop this anywhere in the app and it handles itself

export function QueryLimitBanner() {
  const { queriesRemaining, isPro, usage } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (isPro || dismissed) return null

  const monthlyLimit = (usage?.query_count ?? 0) + queriesRemaining
  const used = usage?.query_count ?? 0
  const progressValue = monthlyLimit > 0 ? Math.round((used / monthlyLimit) * 100) : 0

  // Reset day — first of next month
  const now = new Date()
  const resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const resetDay = resetDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })

  if (queriesRemaining === 0) {
    return (
      <Banner
        variant="danger"
        title="No recommendations left this month"
        subtitle={`Resets on ${resetDay}. Upgrade to Pro for 50 per month.`}
        primaryAction={{ label: 'Upgrade to Pro', to: '/pricing' }}
        secondaryAction={{ label: `Wait until ${resetDay}`, onClick: () => setDismissed(true) }}
        dismissible={false}
      />
    )
  }

  if (queriesRemaining <= 3) {
    return (
      <Banner
        variant="warning"
        title={`${queriesRemaining} recommendation${queriesRemaining === 1 ? '' : 's'} left this month`}
        subtitle={`Resets on ${resetDay}. Upgrade for 50 per month.`}
        primaryAction={{ label: 'Upgrade', to: '/pricing' }}
        dismissible
        onDismiss={() => setDismissed(true)}
        showProgress
        progressValue={progressValue}
      />
    )
  }

  return null
}


// ─── Profile incomplete banner ────────────────────────────────

export function ProfileIncompleteBanner() {
  const { isProfileComplete } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (isProfileComplete || dismissed) return null

  return (
    <Banner
      variant="info"
      title="Complete your profile for better recommendations"
      subtitle="Add your skin undertone and fit preference to get accurate results."
      primaryAction={{ label: 'Complete profile', to: '/onboarding' }}
      dismissible
      onDismiss={() => setDismissed(true)}
    />
  )
}


// ─── Usage: drop into Home.tsx ────────────────────────────────
//
// import { QueryLimitBanner, ProfileIncompleteBanner } from '../components/Banner'
//
// In your Home page JSX, above the form:
//
// <Stack $gap="12px" style={{ marginBottom: 16 }}>
//   <ProfileIncompleteBanner />
//   <QueryLimitBanner />
// </Stack>
