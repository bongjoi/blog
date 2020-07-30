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

const PostViewer = ({ post, error, loading }) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>
  }

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return null
  }

  const { title, body, user, publishedDate, tags } = post

  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo>
          <span>
            <b>{user.username}</b>
          </span>
          <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </SubInfo>
        <Tags>
          {tags.map((tag) => (
            <div className="tag" key={tag}>
              #{tag}
            </div>
          ))}
        </Tags>
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
    </PostViewerBlock>
  )
}

export default PostViewer
