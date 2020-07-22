const Router = require('koa-router')
const postsCtrl = require('./posts.ctrl')
const checkLoggedIn = require('../../lib/checkLoggedIn')

const posts = new Router()

posts.get('/', postsCtrl.list)
posts.post('/', checkLoggedIn, postsCtrl.write)
posts.get('/:id', postsCtrl.getPostById, postsCtrl.read)
posts.delete(
  '/:id',
  checkLoggedIn,
  postsCtrl.getPostById,
  postsCtrl.checkOwnPost,
  postsCtrl.remove
)
posts.patch(
  '/:id',
  checkLoggedIn,
  postsCtrl.getPostById,
  postsCtrl.checkOwnPost,
  postsCtrl.update
)

module.exports = posts
