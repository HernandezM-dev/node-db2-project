const knex = require('knex');

const knexfile = require('../knexfile.js');

const environment = process.env.DATABASE_URL || 'development';

const config = knexfile[environment];

module.exports = knex(config)