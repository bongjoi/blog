const Post = require('../../models/post')
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const sanitizeHtml = require('sanitize-html')

const { ObjectId } = mongoose.Types

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class']
  },
  allowedSchemes: ['data', 'http']
}

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: []
  })
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)} ...`
}

// Middleware
exports.getPostById = async (ctx, next) => {
  const { id } = ctx.params
  // id가 ObjectId 타입인지 검사
  if (!ObjectId.isValid(id)) {
    ctx.status = 400
    return
  }
  try {
    const post = await Post.findById(id).exec()
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404 // Not Found
      return
    }
    ctx.state.post = post
    return next()
  } catch (err) {
    ctx.throw(500, err)
  }
}

exports.checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403 // Forbidden: The server understood the request but refuses to authorize it.
    return
  }
  return next()
}

/**
 * @desc    포스트 작성
 * @route   POST /api/posts
 */
exports.write = async (ctx) => {
  const schema = Joi.object({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  })

  // 검증 후 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }

  const { title, body, tags } = ctx.request.body
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user
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
 * @route   GET /api/posts?username=&tag=&page=
 */
exports.list = async (ctx) => {
  // query는 문자열이기 때문에 숫자로 변환
  // 값이 주어지지 않았다면 1을 기본값으로 사용
  const page = parseInt(ctx.query.page || '1', 10)

  if (page < 1) {
    ctx.status = 400
    return
  }

  const { tag, username } = ctx.query
  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {})
  }

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 }) // 1이면 오름차순, -1이면 내림차순
      .limit(10) // 보여줄 포스트 개수 제한
      .skip((page - 1) * 10) // 페이지당 10개씩 넘기기
      .lean() // 데이터를 JSON 형태로 조회 가능
      .exec()

    // 커스텀 헤더 설정
    const postCount = await Post.estimatedDocumentCount(query).exec()
    ctx.set('Last-Page', Math.ceil(postCount / 10))

    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body)
    }))
  } catch (err) {
    ctx.throw(500, err)
  }
}

/**
 * @desc    특정 포스트 조회
 * @route   GET /api/posts/:id
 */
exports.read = (ctx) => {
  ctx.body = ctx.state.post
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
  const schema = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string())
  })

  const result = schema.validate(ctx.request.body)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }

  const nextData = { ...ctx.request.body }
  // body 값이 있으면 HTML 필터링
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body)
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
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
