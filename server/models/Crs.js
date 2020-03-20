const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Crs = db.define( 'crs',
  {
    crs_id: {type: Sequelize.INTEGER, primaryKey: true},
    crs_name: Sequelize.STRING,
    ctu_id: Sequelize.INTEGER,
    ctu_name: Sequelize.STRING,
    crs_leader: Sequelize.STRING,
    street_address: Sequelize.STRING,
    street_address2: Sequelize.STRING,
    street_address3: Sequelize.STRING,
    street_address4: Sequelize.STRING,
    internal_office_name: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip_code: Sequelize.INTEGER,
    country: Sequelize.STRING,
    latitude: Sequelize.INTEGER,
    longitude: Sequelize.INTEGER,
    nichd: Sequelize.INTEGER,
    crs_type: Sequelize.STRING
  },
  { underscored: true }
);

module.exports = Crs;
