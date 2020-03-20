const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Crs_ps = db.define( 'psprotocols',
  {
    crs_ps_id: { type: Sequelize.INTEGER, primaryKey: true },
    oty_id: Sequelize.INTEGER,
    crs_id: Sequelize.INTEGER,
    srn_restriction_type: Sequelize.STRING,
    srn_description_text: Sequelize.STRING,
    oty_type: Sequelize.STRING,
    oty_site_category_type: Sequelize.STRING
  },
  { underscored: true, tableName: 'crs_ps', }
);

module.exports = Crs_ps;
