const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Funded_network = db.define( 'fundednetwork',
  {
    crs_id: { type: Sequelize.INTEGER, primaryKey: true },
    crs_name: Sequelize.STRING,
    network: Sequelize.STRING
  },
  { underscored: true, tableName: 'funded_network', }
);

module.exports = Funded_network;
