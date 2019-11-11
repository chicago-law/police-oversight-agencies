import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled('div')`
  display: flex;
  margin-bottom: 2em;
  .icon-container {
    flex: 0 0 5rem; /* Line up the input w/ City name column */
    text-align: right;
    padding-right: 1rem;
    @media (max-width: ${props => props.theme.bP.mS}) {
      flex: 0 0 auto;
    }
  }
  svg {
    color: ${props => props.theme.darkBlue};
    font-size: ${props => props.theme.ms(2)};
  }
  .input-container {
    flex-grow: 1;
  }
  input {
    font-size: ${props => props.theme.ms(1)};
    width: 100%;
    &.populated {
      border-color: white;
    }
  }
`

interface OwnProps {
  query: string;
  setQuery: (value: string) => void;
  setSelectedState: (name: string) => void;
}

const CitySearch = ({
  query,
  setQuery,
  setSelectedState,
}: OwnProps) => {
  function handleChange(value: string) {
    setQuery(value)
    setSelectedState('')
  }

  return (
    <Container>
      <div className="icon-container">
        <FontAwesomeIcon icon={['fas', 'search']} />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search..."
          className={query.length ? 'populated' : ''}
          value={query}
          onChange={e => handleChange(e.target.value)}
        />
      </div>
    </Container>
  )
}

export default CitySearch
