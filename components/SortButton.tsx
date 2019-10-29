import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface OwnProps {
  active: boolean;
  dir: 'asc' | 'desc';
}

const Container = styled('button')<OwnProps>`
  display: inline-flex;
  flex-direction: column;
  color: ${props => (props.active ? props.theme.red : props.theme.darkBlue)};
  svg {
    position: relative;
    margin-left: 0.75em;
    font-size: ${props => props.theme.ms(-3)};
    &:nth-child(2) {
      top: -8px;
    }
  }
`

const SortButton = ({
  active,
  dir,
}: OwnProps) => (
  <Container active={active} dir={dir}>
    <FontAwesomeIcon icon={['fas', 'caret-up']} />
    <FontAwesomeIcon icon={['fas', 'caret-down']} />
  </Container>
)

export default SortButton
