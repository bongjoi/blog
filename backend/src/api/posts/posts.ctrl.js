const Post = require('../../models/post')

/**
 * @desc    포스트 작성
 * @route   POST /api/posts
 */
exports.write = async (ctx) => {
  const { title, body, tags } = ctx.request.body
  const post = new Post({
    title,
    body,
    tags
  })
  try {
    await post.save()
    ctx.body = post
  } catch (err) {
    ctx.throw(500, err)
  }
}

/**
 * @desc    포스트 목록 조회
 * @route   GET /api/posts
 */
exports.list = async (ctx) => {
  try {
    const posts = await Post.find().exec()
    ctx.body = posts
  } catch (err) {
    ctx.throw(500, err)
  }
}

/**
 * @desc    특정 포스트 조회
 * @route   GET /api/posts/:id
 */
exports.read = async (ctx) => {
  const { id } = ctx.params
  try {
    const post = await Post.findById(id).exec()
    if (!post) {
      ctx.status = 404
      return
    }
    ctx.body = post
  } catch (err) {
    ctx.throw(500, err)
  }
}

/**
 * @desc    특정 포스트 제거
 * @route   DELETE /api/posts/:id
 */
exports.remove = async (ctx) => {
  const { id } = ctx.params
  try {
    await Post.findByIdAndRemove(id).exec()
    ctx.status = 204
  } catch (err) {
    ctx.throw(500, err)
  }
}

/**
 * @desc    포스트 수정(특정 필드 변경)
 * @route   PATCH /api/posts/:id
 */
exports.update = async (ctx) => {
  const { id } = ctx.params
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true // 이 값을 설정하면 업데이트된 데이터를 반환
      // false일 때는 업데이트되기 전의 데이터를 반환
    }).exec()
    if (!post) {
      ctx.status = 404
      return
    }
    ctx.body = post
  } catch (err) {
    ctx.throw(500, err)
  }
}
