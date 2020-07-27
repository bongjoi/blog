import React from 'react'
import Editor from '../components/write/Editor'
import Responsive from '../components/common/Responsive'
import TagBox from '../components/write/TagBox'

function WritePage() {
  return (
    <Responsive>
      <Editor />
      <TagBox />
    </Responsive>
  )
}

export default WritePage
