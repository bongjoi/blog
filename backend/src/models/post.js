const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedData: {
    type: Date,
    default: Date.now // 현재 날짜를 기본값으로 지정
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String
  }
})

module.exports = mongoose.model('Post', PostSchema)
