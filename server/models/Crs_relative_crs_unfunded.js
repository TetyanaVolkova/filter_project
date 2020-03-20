const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Crs_relative_crs_unfunded = db.define( 'related_unfunded',
  {
    crs_id: { type: Sequelize.INTEGER, primaryKey: true },
    crs_list: Sequelize.STRING,
    crs_name_list: Sequelize.STRING
  },
  { underscored: true, tableName: 'crs_relative_crs_unfunded', }
);

module.exports = Crs_relative_crs_unfunded;
