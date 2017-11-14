const knex = require('../connection/db')

async function createPost(titel, description) {
  const post = {
    titel,
    description,
    createdAt: new Date(),
    deleted: false,
  }
  const create = await knex('posts').insert(post).returning('id')
  return create
}

module.exports = {
  createPost,
}
