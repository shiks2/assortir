import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  CenteredContainer, PageWrapper, AuthCard, AuthHeader, AuthLogo,
  AuthFooter, FormGroup, FieldLabel, Input, Button,
  ErrorMessage, Stack, Heading, Label, Row,
} from '../components/index'

import { BRAND_NAME } from '../constants'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return setError('Please fill in all fields')
    if (password.length < 6) return setError('Password must be at least 6 characters')

    setLoading(true)
    setError(null)

    const { error } = await signUp(email, password)
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      navigate('/onboarding')
    }
  }

  return (
    <PageWrapper>
      <CenteredContainer>
        <AuthCard>
          <AuthHeader>
            <AuthLogo to="/">{BRAND_NAME.slice(0, 6)}<span>{BRAND_NAME.slice(6)}</span></AuthLogo>
            <Heading>Create account</Heading>
            <Label style={{ marginTop: 6 }}>
              Set up your profile and get styled in minutes
            </Label>
          </AuthHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleSubmit}>
            <Stack $gap="12px">
              <FormGroup>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </FormGroup>

              <FormGroup>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </FormGroup>


              <FormGroup style={{ marginTop: 8 }}>
                <Row $gap="10px" $align="flex-start">
                  <input
                    type="checkbox"
                    id="consent"
                    style={{ marginTop: 3, cursor: 'pointer' }}
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                  />
                  <FieldLabel htmlFor="consent" style={{ textTransform: 'none', letterSpacing: 'normal', fontSize: '12px', lineHeight: '1.5', cursor: 'pointer' }}>
                    I agree to the <Link to="/legal/terms" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>Terms</Link> and <Link to="/legal/privacy" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>Privacy Policy</Link>, including processing of my skin tone data for personalized styling.
                  </FieldLabel>
                </Row>
              </FormGroup>

              <Button type="submit" disabled={loading || !agreed}>
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </Stack>
          </form>

          <AuthFooter>
            <Link to="/login">Already have an account? Sign in</Link>
          </AuthFooter>
        </AuthCard>
      </CenteredContainer>
    </PageWrapper>
  )
}