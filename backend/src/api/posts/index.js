const Router = require('koa-router')
const postsCtrl = require('./posts.ctrl')
const checkLoggedIn = require('../../lib/checkLoggedIn')

const posts = new Router()

posts.get('/', postsCtrl.list)
posts.post('/', checkLoggedIn, postsCtrl.write)
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read)
posts.delete('/:id', postsCtrl.checkObjectId, checkLoggedIn, postsCtrl.remove)
posts.patch('/:id', postsCtrl.checkObjectId, checkLoggedIn, postsCtrl.update)

module.exports = posts
