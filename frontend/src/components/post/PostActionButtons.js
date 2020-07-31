import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import AskRemoveModal from './AskRemoveModal'
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

const PostActionButtons = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false)

  const onRemoveClick = () => {
    setModal(true)
  }
  const onCancel = () => {
    setModal(false)
  }
  const onConfirm = () => {
    setModal(false)
    onRemove()
  }

  return (
    <>
      <PostActionButtonsBlock>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonsBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  )
}

export default PostActionButtons
