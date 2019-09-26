/** @jsx jsx */
import { jsx, Container } from 'theme-ui'

export default function Header() {
  return (
    <header>
      <Container
        sx={{
          py: 5
        }}
      >
        <span
          sx={{
            fontSize: 7,
            fontWeight: 'bold',
            lineHeight: 1
          }}
        >
          Pics of Billy 📸 🐶
        </span>
      </Container>
    </header>
  )
}
