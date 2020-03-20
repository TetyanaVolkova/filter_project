const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Pharmacies = db.define(
  'pharmacies',
  {
    phar_id: { type: Sequelize.INTEGER, primaryKey: true },
    phar_name: Sequelize.STRING,
    PoR_name: Sequelize.STRING,
    location: Sequelize.STRING,
    synonym: Sequelize.STRING,
    networks: Sequelize.STRING,
    contact: Sequelize.STRING,
    site_restriction_type: Sequelize.STRING,
    pharmacy_capability: Sequelize.STRING,
    long_name: Sequelize.STRING
  },
  { underscored: true }
);

module.exports = Pharmacies;
