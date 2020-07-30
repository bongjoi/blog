import React from 'react'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import Responsive from '../common/Responsive'

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`

const PostHead = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid ${palette.gray[2]};
  h1 {
    margin: 0;
    font-size: 3rem;
    line-height: 1.5;
  }
`

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]};

  span + span:before {
    content: '\\B7';
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    color: ${palette.gray[5]};
  }
`

const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    margin-right: 0.5rem;
    color: ${palette.cyan[7]};
    text-decoration: none;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`

const PostViewer = () => {
  return (
    <PostViewerBlock>
      <PostHead>
        <h1>제목</h1>
        <SubInfo>
          <span>
            <b>tester</b>
          </span>
          <span>{new Date().toLocaleDateString()}</span>
        </SubInfo>
        <Tags>
          <div className="tag">#태그1</div>
          <div className="tag">#태그2</div>
          <div className="tag">#태그3</div>
        </Tags>
      </PostHead>
      <PostContent
        dangerouslySetInnerHTML={{ __html: '<p>HTML <b>내용</b>입니다.</p>' }}
      />
    </PostViewerBlock>
  )
}

export default PostViewer
