const { table } = require("../connection");

exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl=>{
      tbl.increments();
      tbl.string('make').notNullable().index();
      tbl.string('model').notNullable().index();
      tbl.integer('year').notNullable().index();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
