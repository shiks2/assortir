import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PageWrapper, Navbar } from '../components/index'
import { PricingContent } from '../components/PricingContent'

const PricingPage = styled.main`
  padding-top: 40px;
`

export default function Pricing() {
  const { user, profile, isPro, queriesRemaining } = useAuth()
  const navigate = useNavigate()
  const displayQueriesRemaining = !user || queriesRemaining === Infinity ? undefined : queriesRemaining

  return (
    <PageWrapper>
      <Navbar
        activePage="pricing"
        isPro={user ? isPro : undefined}
        queriesRemaining={displayQueriesRemaining}
        userName={user ? (profile?.full_name ?? '') : undefined}
        onAvatarClick={user ? () => navigate('/settings') : undefined}
      />
      <PricingPage>
        <PricingContent />
      </PricingPage>
    </PageWrapper>
  )
}
