import React from 'react'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'

const PostActionButtonsBlock = styled.div`
  margin-top: -1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
`

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  color: ${palette.gray[6]};
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`

const PostActionButtons = ({ onEdit }) => {
  return (
    <PostActionButtonsBlock>
      <ActionButton onClick={onEdit}>수정</ActionButton>
      <ActionButton>삭제</ActionButton>
    </PostActionButtonsBlock>
  )
}

export default PostActionButtons
