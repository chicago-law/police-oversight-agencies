import styled from 'styled-components'
import SectionHeading from './SectionHeading'

const RoleList = styled('ul')`
  margin-top: 2em;
  li {
    position: relative;
    margin-bottom: 1em;
    margin-left: 1.5em;
    &:before {
      content: '';
      position: absolute;
      left: -1em;
      top: 0.75em;
      background: ${props => props.theme.blue(0.6)};
      width: 0.5em;
      height: 0.5em;
      transform: translateX(-100%) rotate(45deg);
    }
    p {
      strong {
        font-size: ${props => props.theme.ms(2)};
      }
    }
  }
`

const FuncDefinitions = () => (
  <>
    <SectionHeading heading="Function Definitions">
      Based on the available information, each civilian oversight entity identified is classified as providing one or more of the following oversight functions:
    </SectionHeading>
    <RoleList>
      <li>
        <p><strong>Adjudicative: </strong>An entity that adjudicates specific disciplinary matters by making findings and recommendations at the conclusion of a disciplinary hearing or other proceeding.</p>
      </li>
      <li>
        <p><strong>Advisory: </strong>An entity that makes recommendations to the police department regarding high level policy and operational strategies.</p>
      </li>
      <li>
        <p><strong>Appeals: </strong>An entity that reviews outcomes of disciplinary investigations upon the request of either the complainant or the accused officer.</p>
      </li>
      <li>
        <p><strong>Audit: </strong>An entity that audits investigations of police incidents conducted by the police department. For purposes herein, an auditing entity reviews only a sample of investigations, rather than reviewing all investigations or all investigations of a certain type.</p>
      </li>
      <li>
        <p><strong>Investigative: </strong>An entity that investigates police incidents independently from the police department and that employs at least one professional investigator.</p>
      </li>
      <li>
        <p><strong>Review: </strong>An entity that reviews or monitors investigations of police incidents being conducted by the police department.</p>
      </li>
      <li>
        <p><strong>Supervisory: </strong>An entity that makes high level policy and strategic decisions regarding police department operations.</p>
      </li>
    </RoleList>
  </>
)

export default FuncDefinitions
