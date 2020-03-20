const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Crs_pop = db.define('crspopulations',
  {
    crs_pop_id: { type: Sequelize.INTEGER, primaryKey: true },
    crs_id: Sequelize.INTEGER,
    population_macro: Sequelize.STRING,
    population_micro: Sequelize.STRING
  },
  { underscored: true, tableName: 'crs_pop' }
);

Crs_pop.removeAttribute( 'id' );

module.exports = Crs_pop;
