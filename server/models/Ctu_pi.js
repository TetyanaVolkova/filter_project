const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Pi = db.define( 'pi',
  {
    ctu_org_id: {type: Sequelize.INTEGER, primaryKey: true},
    ctu_contact_pi: Sequelize.STRING,
    ctu_pis: Sequelize.STRING,
    ctu_contact_pi_email: Sequelize.STRING,
    update_time: Sequelize.DATE
  },
  { underscored: true, tableName: 'ctu_pi', }
);

module.exports = Pi;
