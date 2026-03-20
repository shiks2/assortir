import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  CenteredContainer, PageWrapper, AuthCard, AuthHeader, AuthLogo,
  AuthFooter, FormGroup, FieldLabel, Input, Button, ButtonOutline,
  ErrorMessage, Stack, DividerText, Heading, Label,
} from '../components/index'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || !password) return setError('Please fill in all fields')

    setLoading(true)
    setError(null)

    const { error } = await signIn(email, password)
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      navigate('/home')
    }
  }

  return (
    <PageWrapper>
      <CenteredContainer>
        <AuthCard>
          <AuthHeader>
            <AuthLogo to="/" aria-label="Rang">
              <img src="/src/assets/rang_logo.png" alt="Rang" />
            </AuthLogo>
            <Heading>Welcome back</Heading>
            <Label style={{ marginTop: 6 }}>Your personal AI stylist</Label>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </FormGroup>

              <FormGroup>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </FormGroup>

              <Button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </Stack>
          </form>

          <DividerText style={{ marginTop: 20 }}>or</DividerText>

          <ButtonOutline as={Link} to="/signup" style={{ display: 'flex' }}>
            Create an account
          </ButtonOutline>

          <AuthFooter>
            <Link to="/signup">Don't have an account? Sign up</Link>
          </AuthFooter>
        </AuthCard>
      </CenteredContainer>
    </PageWrapper>
  )
}