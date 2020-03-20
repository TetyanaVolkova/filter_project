const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Crs_po = db.define('ocsostaff',
  {
    crs_id: {type: Sequelize.INTEGER, primaryKey: true},
    ctu_id: Sequelize.INTEGER,
    po_name: Sequelize.STRING,
    email: Sequelize.STRING
  },
  { underscored: true, tableName: 'crs_po', }
);

module.exports = Crs_po;
