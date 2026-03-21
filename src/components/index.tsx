import styled, { keyframes } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DropdownMenu } from './ui'

// ============================================================
// RANG — Shared Components
// src/components/index.tsx
// ============================================================

import { BRAND_NAME } from '../constants'

// ─── Layout ───────────────────────────────────────────────────

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg};
`

export const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`

export const CenteredContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding-top: 40px;
  padding-bottom: 40px;
`

// ─── Navbar ───────────────────────────────────────────────────

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 52px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.bg};
  z-index: 10;
`

const LogoText = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  img {
    display: block;
    height: 28px;
    width: auto;
  }
`

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const NavLinks = styled.div`
  display: flex;
  gap: 4px;
`

const NavLink = styled(Link)<{ $active?: boolean }>`
  font-size: 13px;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ $active, theme }) => $active ? theme.colors.text : theme.colors.textSecondary};
  font-weight: ${({ $active, theme }) => $active ? theme.typography.medium : theme.typography.regular};
  transition: background ${({ theme }) => theme.transitions.fast};
  &:hover { background: ${({ theme }) => theme.colors.bgSecondary}; }
`

const PlanBadge = styled.span<{ $pro?: boolean }>`
  font-size: 11px;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: ${({ theme }) => theme.typography.medium};
  background: ${({ $pro, theme }) => $pro ? theme.colors.proBg : theme.colors.freeBg};
  color: ${({ $pro, theme }) => $pro ? theme.colors.proText : theme.colors.freeText};
`

const Avatar = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f5f4f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 500;
  color: #1a1a1a;
  cursor: pointer;
  flex-shrink: 0;
  border: none;
`

interface NavbarProps {
  activePage?: string
  isPro?: boolean
  queriesRemaining?: number
  userName?: string
  onAvatarClick?: () => void
}

export function Navbar({ activePage, isPro, queriesRemaining, userName, onAvatarClick }: NavbarProps) {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'ME'

  const profileMenuItems = [
    {
      label: 'Settings',
      onClick: () => {
        if (onAvatarClick) {
          onAvatarClick()
        } else {
          navigate('/settings')
        }
      },
    },
    {
      label: 'History',
      onClick: () => navigate('/history'),
    },
    {
      label: 'Upgrade to Pro',
      onClick: () => navigate('/pricing'),
    },
    {
      label: 'Sign out',
      onClick: () => {
        void signOut()
      },
      danger: true,
      dividerBefore: true,
    },
  ]

  return (
    <NavBar>
      <LogoText to="/home" aria-label={BRAND_NAME}>
        <img src="/src/assets/rang_logo.png" alt={BRAND_NAME} />
      </LogoText>
      <NavRight>
        <NavLinks>
          <NavLink to="/home" $active={activePage === 'home'}>Style</NavLink>
          <NavLink to="/history" $active={activePage === 'history'}>History</NavLink>
          <NavLink to="/pricing" $active={activePage === 'pricing'}>Pricing</NavLink>
          <NavLink to="/settings" $active={activePage === 'settings'}>Settings</NavLink>
        </NavLinks>
        {isPro !== undefined && (
          <PlanBadge $pro={isPro}>
            {isPro ? 'Pro' : `Free · ${queriesRemaining} left`}
          </PlanBadge>
        )}
        <DropdownMenu items={profileMenuItems} placement="bottom-end">
          <Avatar type="button" aria-label="Open profile menu">{initials}</Avatar>
        </DropdownMenu>
      </NavRight>
    </NavBar>
  )
}

// ─── Typography ───────────────────────────────────────────────

export const Heading = styled.h1`
  font-size: ${({ theme }) => theme.typography.xxl};
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
  line-height: 1.2;
`

export const SubHeading = styled.h2`
  font-size: ${({ theme }) => theme.typography.xl};
  font-weight: ${({ theme }) => theme.typography.medium};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`

export const Label = styled.p`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`

export const FieldLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.xs};
  color: ${({ theme }) => theme.colors.textTertiary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
  font-weight: ${({ theme }) => theme.typography.medium};
`

// ─── Tag / Badge ──────────────────────────────────────────────

type TagVariant = 'auth' | 'home' | 'result' | 'history' | 'settings' | 'onboard' | 'default'

const tagColors: Record<TagVariant, { bg: string; color: string }> = {
  auth:     { bg: '#EAF3DE', color: '#27500A' },
  home:     { bg: '#E6F1FB', color: '#0C447C' },
  result:   { bg: '#f5f4f2', color: '#1a1a1a' },
  history:  { bg: '#EEEDFE', color: '#3C3489' },
  settings: { bg: '#F1EFE8', color: '#444441' },
  onboard:  { bg: '#FBEAF0', color: '#72243E' },
  default:  { bg: '#F1EFE8', color: '#444441' },
}

export const Tag = styled.span<{ $variant?: TagVariant }>`
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.xs};
  font-weight: ${({ theme }) => theme.typography.medium};
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $variant = 'default' }) => tagColors[$variant].bg};
  color: ${({ $variant = 'default' }) => tagColors[$variant].color};
  margin-bottom: 12px;
`

// ─── Input ────────────────────────────────────────────────────

export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.base};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bg};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }

  &:hover { border-color: ${({ theme }) => theme.colors.borderHover}; }

  &:focus {
    border-color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
  }
`

export const Select = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.base};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bg};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover { border-color: ${({ theme }) => theme.colors.borderHover}; }
  &:focus { border-color: ${({ theme }) => theme.colors.text}; }
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.base};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bg};
  resize: vertical;
  min-height: 80px;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
  &:focus { border-color: ${({ theme }) => theme.colors.text}; }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`

// ─── Chips ────────────────────────────────────────────────────

export const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 4px;
`

export const Chip = styled.button<{ $active?: boolean }>`
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.typography.sm};
  border: 0.5px solid ${({ $active, theme }) => $active ? theme.colors.text : theme.colors.border};
  background: ${({ $active, theme }) => $active ? theme.colors.text : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.textInverse : theme.colors.textSecondary};
  font-weight: ${({ $active, theme }) => $active ? theme.typography.medium : theme.typography.regular};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
    background: ${({ $active, theme }) => $active ? theme.colors.text : theme.colors.bgSecondary};
    color: ${({ $active, theme }) => $active ? theme.colors.textInverse : theme.colors.text};
  }
`

// ─── Buttons ──────────────────────────────────────────────────

const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.base};
  font-weight: ${({ theme }) => theme.typography.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) { transform: scale(0.99); }
`

export const Button = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  border: none;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`

export const ButtonOutline = styled(ButtonBase)`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 0.5px solid ${({ theme }) => theme.colors.border};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgSecondary};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`

export const ButtonGhost = styled(ButtonBase)`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgSecondary};
    color: ${({ theme }) => theme.colors.text};
  }
`

// ─── Cards ────────────────────────────────────────────────────

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px;
`

export const SurfaceCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 16px;
`

// ─── Divider ──────────────────────────────────────────────────

export const Divider = styled.div`
  height: 0.5px;
  background: ${({ theme }) => theme.colors.border};
  margin: 16px 0;
`

export const DividerText = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: ${({ theme }) => theme.typography.sm};

  &::before, &::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: ${({ theme }) => theme.colors.border};
  }
`

// ─── Spinner ──────────────────────────────────────────────────

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Spinner = styled.div<{ $size?: number; $light?: boolean }>`
  width: ${({ $size = 20 }) => $size}px;
  height: ${({ $size = 20 }) => $size}px;
  border: 2px solid ${({ $light }) => $light ? 'rgba(255,255,255,0.3)' : '#f0ede8'};
  border-top-color: ${({ $light }) => $light ? 'white' : '#1a1a1a'};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`

// ─── Error Message ────────────────────────────────────────────

export const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => theme.colors.errorBg};
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 12px;
`

export const SuccessMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) => theme.colors.successBg};
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 12px;
`

// ─── Stack / Row ──────────────────────────────────────────────

export const Stack = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap = '12px' }) => $gap};
`

export const Row = styled.div<{ $gap?: string; $align?: string; $justify?: string }>`
  display: flex;
  align-items: ${({ $align = 'center' }) => $align};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  gap: ${({ $gap = '8px' }) => $gap};
`

export const Grid = styled.div<{ $cols?: number; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols = 2 }) => $cols}, minmax(0, 1fr));
  gap: ${({ $gap = '8px' }) => $gap};
`

// ─── Auth Layout ──────────────────────────────────────────────

export const AuthCard = styled.div`
  width: 100%;
`

export const AuthHeader = styled.div`
  margin-bottom: 28px;
`

export const AuthLogo = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  text-decoration: none;

  img {
    display: block;
    height: 28px;
    width: auto;
  }
`

export const AuthFooter = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 20px;

  a {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.medium};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`

// ─── Stepper dots ─────────────────────────────────────────────

export const StepDots = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`

export const StepDot = styled.div<{ $active?: boolean }>`
  height: 5px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ $active, theme }) => $active ? theme.colors.text : theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.base};
  width: ${({ $active }) => $active ? '20px' : '6px'};
`

// ─── Intent selector ─────────────────────────────────────────

export const IntentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin-bottom: 16px;
`

export const IntentButton = styled.button<{ $active?: boolean }>`
  padding: 10px 8px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: ${({ theme }) => theme.typography.medium};
  text-align: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: 0.5px solid ${({ $active, theme }) => $active ? theme.colors.text : theme.colors.border};
  background: ${({ $active, theme }) => $active ? theme.colors.bgSecondary : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.text : theme.colors.textSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.text};
  }
`

// ─── Empty state ──────────────────────────────────────────────

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  gap: 8px;

  p:first-child {
    font-size: ${({ theme }) => theme.typography.base};
    font-weight: ${({ theme }) => theme.typography.medium};
    color: ${({ theme }) => theme.colors.text};
  }

  p:last-child {
    font-size: ${({ theme }) => theme.typography.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

// ─── Upgrade banner ───────────────────────────────────────────

export const UpgradeBanner = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`

export const UpgradeText = styled.div`
  p:first-child {
    font-size: ${({ theme }) => theme.typography.sm};
    font-weight: ${({ theme }) => theme.typography.medium};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 2px;
  }
  p:last-child {
    font-size: ${({ theme }) => theme.typography.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

export const UpgradeButton = styled.button`
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: ${({ theme }) => theme.typography.medium};
  padding: 7px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background ${({ theme }) => theme.transitions.fast};
  &:hover { background: ${({ theme }) => theme.colors.primaryHover}; }
`