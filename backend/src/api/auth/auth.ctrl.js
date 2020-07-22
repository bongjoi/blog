const Joi = require('@hapi/joi')
const User = require('../../models/user')

/**
 * @desc    회원가입
 * @route   POST /api/auth/register
 */
exports.register = async (ctx) => {
  // Request Body 검증
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required()
  })
  const result = schema.validate(ctx.request.body)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }

  const { username, password } = ctx.request.body
  try {
    // username이 이미 존재하는지 확인
    const exists = await User.findByUsername(username)
    if (exists) {
      ctx.status = 409 // Conflict
      return
    }

    const user = new User({
      username
    })
    await user.setPassword(password)
    await user.save()

    // 응답할 데이터에서 hashedPassword 필드 제거
    ctx.body = user.serialize()
  } catch (err) {
    ctx.throw(500, err)
  }
}

/**
 * @desc    로그인
 * @route   POST /api/auth/login
 */
exports.login = async (ctx) => {
  const { username, password } = ctx.request.body

  // username, password가 없으면 에러 처리
  if (!username || !password) {
    ctx.status = 401 // Unauthorized
    return
  }

  try {
    const user = await User.findByUsername(username)
    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      ctx.status = 401
      return
    }
    const valid = await user.checkPassword(password)
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401
      return
    }
    ctx.body = user.serialize()
  } catch (err) {
    ctx.throw(500, err)
  }
}

/**
 * @desc    로그인 상태 확인
 * @route   GET /api/auth/check
 */
exports.check = async (ctx) => {}

/**
 * @desc    로그아웃
 * @route   POST /api/auth/logout
 */
exports.logout = async (ctx) => {}
