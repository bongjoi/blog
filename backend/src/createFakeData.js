const Post = require('./models/post')

module.exports = function createFakeData() {
  const posts = [...Array(40).keys()].map((i) => ({
    title: `포스트 #${i}`,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu lectus, aliquet nec imperdiet nec, posuere vel dui. Nullam suscipit scelerisque tortor, a semper sapien consectetur sit amet. Suspendisse id ultricies lorem, et accumsan erat. Morbi ornare felis nulla, a aliquet ante laoreet in. Maecenas lobortis in risus facilisis feugiat. Proin sollicitudin nisl id metus rhoncus laoreet. Maecenas nulla libero, tristique quis tempus id, tempus et lectus. Suspendisse sit amet lacus est.',
    tags: ['가짜', '데이터']
  }))

  Post.insertMany(posts, (err, docs) => {
    console.log(docs)
  })
}
