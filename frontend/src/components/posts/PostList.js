import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Responsive from '../common/Responsive'
import Button from '../common/Button'
import SubInfo from '../common/SubInfo'
import Tags from '../common/Tags'
import palette from '../../lib/styles/palette'

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`

const WritePostButtonWrapper = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: flex-end;
`

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }
  h2 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 2rem;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post

  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo username={user.username} publishedDate={publishedDate} />
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  )
}

const PostList = ({ posts, loading, error, showWriteButton }) => {
  // 에러 발생 시
  if (error) {
    return <PostListBlock>에러 발생!</PostListBlock>
  }

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      {/* 로딩 중이 아니고, 포스트 배열이 존재할 때만 보여줌 */}
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  )
}

export default PostList
