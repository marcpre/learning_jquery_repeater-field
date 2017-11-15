const knex = require('../connection/db')

async function createPost(titel, description) {
  console.log("DB")
  console.log(titel + " " + description)
  const post = {
    titel,
    description,
    createdAt: new Date(),
    deleted: false,
  }
  const create = await knex('posts').insert(post)
  return create
}

module.exports = {
  createPost,
}
