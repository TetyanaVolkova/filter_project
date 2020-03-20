const Sequelize = require( 'sequelize' );

const Op = Sequelize.Op;
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    operatorsAliases: Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log( 'Successfully connected to sitecatalogdb.' );
  })
  .catch( err => {
    console.error( 'Unable to connect to sitecatalogdb: ', err );
  });

module.exports = sequelize;
