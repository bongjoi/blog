import React, { useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import Responsive from '../common/Responsive'

const EditorBlock = styled(Responsive)`
  padding: 5rem 0;
`

const TitleInput = styled.input`
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  width: 100%;
  font-size: 3rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  outline: none;
`

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0;
  }
`

const Editor = ({ title, body, onChangeField }) => {
  const quillElement = useRef(null)
  const quillInstance = useRef(null)

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요...',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image']
        ]
      }
    })

    // quill에 text-change 이벤트 핸들러 등록
    const quill = quillInstance.current
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML })
      }
    })
  }, [onChangeField])

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value })
  }

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement}></div>
      </QuillWrapper>
    </EditorBlock>
  )
}

export default Editor
