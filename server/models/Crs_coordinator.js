const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Crs_coordinator = db.define(
  'coordinator',
  {
    crs_id: { type: Sequelize.INTEGER, primaryKey: true },
    crs_name: Sequelize.STRING,
    CRS_COORDINATOR_NAME: Sequelize.STRING,
    CRS_COORDINATOR_MI: Sequelize.STRING,
    upd_time: Sequelize.DATE
  },
  { underscored: true, tableName: 'crs_coordinator' }
);

module.exports = Crs_coordinator;
