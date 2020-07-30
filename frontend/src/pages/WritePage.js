import React from 'react'
import Editor from '../components/write/Editor'
import TagBox from '../components/write/TagBox'
import WriteActionButtons from '../components/write/WriteActionButtons'
import Responsive from '../components/common/Responsive'

function WritePage() {
  return (
    <Responsive>
      <Editor />
      <TagBox />
      <WriteActionButtons />
    </Responsive>
  )
}

export default WritePage
