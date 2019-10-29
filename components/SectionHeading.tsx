import styled from 'styled-components'
import { theme } from '../lib/theme'

const Container = styled('div')`
  margin-bottom: 2em;
  h3 {
    border-bottom: 1px solid ${theme.darkGray};
    padding-bottom: 0.5em;
    margin: 0 0 0.5em 0;
  }
  p {
    font-style: italic;
  }
`

interface OwnProps {
  heading: string;
}

const SectionHeading: React.FC<OwnProps> = ({
  heading,
  children,
}) => (
  <Container>
    <h3>{heading}</h3>
    {children && (
      <p>{children}</p>
    )}
  </Container>
)

export default SectionHeading
