const Sequelize = require( 'sequelize' );
const db = require( '../db' );

// Join table for CRSs and Pharmacies
const Crs_phar = db.define( 'crs_phar',
  {
    crs_phar_id: { type: Sequelize.INTEGER, primaryKey: true },
    crs_id: Sequelize.INTEGER,
    phar_id: Sequelize.INTEGER
  },
  { underscored: true }
);

module.exports = Crs_phar;
