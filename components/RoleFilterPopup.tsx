import styled from 'styled-components'
import { useState, useRef } from 'react'
import TextButton from './TextButton'
import animations from '../lib/animations'
import { theme } from '../lib/theme'
import { roleColumns } from '../lib/roleColumns'
import useOutsideClickDetector from '../hooks/useOutsideClickDetector'

const Container = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  border-radius: 4px;
  background: white;
  color: ${props => props.theme.black};
  font-family: ${props => props.theme.proximaNova};
  font-size: ${props => props.theme.ms(-1)};
  box-shadow: 0 2px 20px black;
  z-index: 999;
  ${animations.fadeSlideDown(300)};
  p {
    margin-bottom: 1em;
    white-space: nowrap;
  }
  li {
    margin-bottom: 0.25em;
  }
  label {
    text-transform: capitalize;
    &.active {
      font-weight: bold;
      color: ${props => props.theme.blue()};
    }
  }
  input {
    margin-right: 0.5em;
  }
  footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 2em;
    .text-button {
      padding: 0.5em;
      margin-left: 0.5em;
    }
  }
`

interface OwnProps {
  setDisplayPopup: (newState: boolean) => void;
  reqRoles: roleColumns[];
  setReqRoles: (newRoles: roleColumns[]) => void;
}

const RoleFilterPopup = ({
  setDisplayPopup,
  reqRoles,
  setReqRoles,
}: OwnProps) => {
  const [tempReqRoles, setTempReqRoles] = useState(reqRoles)
  const popupRef = useRef(null)

  useOutsideClickDetector(popupRef, () => {
    setDisplayPopup(false)
  })

  function handleCheckbox(name: roleColumns | 'any') {
    if (name === 'any') {
      setTempReqRoles([])
    } else if (tempReqRoles.includes(name)) {
      // Uncheck if already checked.
      setTempReqRoles(prev => prev.filter(role => role !== name))
    } else if (tempReqRoles.length + 1 === Object.keys(roleColumns).length) {
      // If checking one more box will mean they're all checked, bypass
      // and check "any" instead.
      setTempReqRoles([])
    } else {
      setTempReqRoles(prev => [...prev, name])
    }
  }

  function handleApply() {
    setDisplayPopup(false)
    setReqRoles(tempReqRoles)
  }

  return (
    <Container ref={popupRef}>
      <p><strong>Agency roles must include:</strong></p>
      <ul>
        <li>
          <label htmlFor="any" className={tempReqRoles.length === 0 ? 'active' : ''}>
            <input
              type="checkbox"
              id="any"
              name="any"
              checked={tempReqRoles.length === 0}
              onChange={() => handleCheckbox('any')}
            />
            Any
          </label>
        </li>
        {Object.values(roleColumns).map(role => (
          <li key={role}>
            <label htmlFor={role} className={tempReqRoles.includes(role) ? 'active' : ''}>
              <input
                type="checkbox"
                id={role}
                name={role}
                checked={tempReqRoles.includes(role)}
                onChange={() => handleCheckbox(role)}
              />
              {role}
            </label>
          </li>
        ))}
      </ul>
      <footer>
        <TextButton
          text="Cancel"
          onClick={() => setDisplayPopup(false)}
          color={theme.middleGray}
          hoverBgColor={theme.offWhite}
        />
        <TextButton
          text="Apply"
          iconAfter={['fas', 'check']}
          onClick={handleApply}
          hoverBgColor={theme.offWhite}
        />
      </footer>
    </Container>
  )
}

export default RoleFilterPopup
