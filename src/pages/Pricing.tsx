import styled from 'styled-components'
import { PageWrapper, Navbar } from '../components/index'
import { PricingContent } from '../components/PricingContent'

const PricingPage = styled.main`
  padding-top: 40px;
`

export default function Pricing() {
  return (
    <PageWrapper>
      <Navbar activePage="pricing" />
      <PricingPage>
        <PricingContent />
      </PricingPage>
    </PageWrapper>
  )
}
