const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Unfunded_network = db.define( 'unfundednetwork',
  {
    crs_id: { type: Sequelize.INTEGER, primaryKey: true },
    crs_name: Sequelize.STRING,
    ctu_id: Sequelize.INTEGER,
    ctu_name: Sequelize.STRING,
    leader_name: Sequelize.STRING,
    network: Sequelize.STRING
  },
  { underscored: true, tableName: 'unfunded_network', }
);

module.exports = Unfunded_network;
