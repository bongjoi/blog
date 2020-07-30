import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

const SubInfoBlock = styled.div`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  color: ${palette.gray[6]};

  span + span:before {
    content: '\\B7';
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    color: ${palette.gray[4]};
  }
`

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  )
}

export default SubInfo
