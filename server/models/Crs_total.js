const Sequelize = require( 'sequelize' );
const db = require( '../db' );

const Crs_total = db.define( 'crs_total',
  {
    crs_id: { type: Sequelize.INTEGER, primaryKey: true },
    crs_name: Sequelize.STRING,
    ctu_id: Sequelize.INTEGER,
    ctu_name: { type: Sequelize.STRING, field: 'CTU Name' },
    crs_leader: { type: Sequelize.STRING, field: 'CRS Leader' },
    clinic_address: { type: Sequelize.STRING, field: 'Clinic Address' },
    crs_address2: { type: Sequelize.STRING, field: 'Clinic Address2' },
    crs_address3: { type: Sequelize.STRING, field: 'Clinic Address3' },
    crs_address4: { type: Sequelize.STRING, field: 'Clinic Address4' },
    crs_address4: { type: Sequelize.STRING, field: 'Clinic Address4' },
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip_code: Sequelize.INTEGER,
    country: Sequelize.STRING,
    program_officer: { type: Sequelize.STRING, field: 'Program Officer' },
    email: Sequelize.STRING,
    contact_pi: { type: Sequelize.STRING, field: 'Contact PI' },
    multipis: { type: Sequelize.STRING, field: 'Multi-PI\'s' },
    ctu_pi_email: Sequelize.STRING,
    ps_activity: { type: Sequelize.STRING, field: 'PS Activity' },
  },
  { underscored: true }
);

module.exports = Crs_total;
