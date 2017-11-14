exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (t) => {
    t.increments('id').unsigned().primary()
    t.string('titel').notNull()
    t.text('description').nullable()
    t.boolean('deleted').nullable()
    t.dateTime('createdAt').notNull()
    t.dateTime('updatedAt').nullable()
    t.dateTime('deletedAt').nullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
}
