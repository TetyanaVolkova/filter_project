const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Population_categories = db.define( 'population_categories',
  {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    population_macro: Sequelize.STRING,
    macro_group: Sequelize.STRING,
    population_micro: Sequelize.STRING
  },
  { underscored: true }
);

module.exports = Population_categories;
