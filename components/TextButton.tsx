import styled from 'styled-components'
import { IconPrefix, IconName } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { theme } from '../lib/theme'

interface StyleProps {
  size: string;
  color: string;
  bgColor: string;
  hoverBgColor: string;
}

const StyledButton = styled('button')<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.proximaNova};
  font-weight: bold;
  color: ${props => props.color};
  background: ${props => props.bgColor};
  border-radius: 3px;
  ${props => (props.bgColor !== 'none' || props.hoverBgColor !== 'none') && `
    padding: 1em 4em;
  `}
  span {
    font-size: ${props => props.size};
  }
  .before {
    margin-right: 0.75em;
  }
  .after {
    margin-left: 0.75em;
  }
  &:hover {
    background: ${props => props.hoverBgColor};
  }
`

interface OwnProps {
  text: string;
  onClick: () => void;
  size?: string;
  color?: string;
  bgColor?: string;
  hoverBgColor?: string;
  iconBefore?: [IconPrefix, IconName];
  iconAfter?: [IconPrefix, IconName];
}

const TextButton = ({
  text,
  onClick,
  size = theme.ms(-1),
  color = theme.red,
  bgColor = 'none',
  hoverBgColor = bgColor === 'none' ? 'none' : bgColor,
  iconBefore,
  iconAfter,
}: OwnProps) => {
  function handleClick() {
    onClick()
  }

  return (
    <StyledButton
      className="text-button"
      onClick={handleClick}
      size={size}
      color={color}
      bgColor={bgColor}
      hoverBgColor={hoverBgColor}
    >
      {iconBefore && (
        <div className="before">
          <FontAwesomeIcon icon={iconBefore} />
        </div>
      )}
      <span>{text}</span>
      {iconAfter && (
        <div className="after">
          <FontAwesomeIcon icon={iconAfter} />
        </div>
      )}
    </StyledButton>
  )
}

export default TextButton
