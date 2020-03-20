const Crs_coordinator = require( './Crs_coordinator' );
const Crs_lab = require( './Crs_lab' );
const Crs_phar = require( './Crs_phar' );
const Crs_po = require( './Crs_po' );
const Crs_pop = require( './Crs_pop' );
const Crs_ps = require( './Crs_ps' );
const Crs_relative_crs_funded = require( './Crs_relative_crs_funded' );
const Crs_relative_crs_unfunded = require( './Crs_relative_crs_unfunded' );
const Crs_total = require( './Crs_total' );
const Crs = require( './Crs' );
const Ctu_pi = require( './Ctu_pi' );
const Funded_network = require( './Funded_network' );
const Laboratories = require( './Laboratories' );
const Pharmacies = require( './Pharmacies' );
const Population_categories = require( './Population_categories' );
const Regulatory = require( './Regulatory' );
const Unfunded_network = require( './Unfunded_network' );

/*-----------------------
SEQUELIZE ASSOCIATIONS
-----------------------*/
Crs.hasOne( Crs_relative_crs_funded, {
  foreignKey: 'crs_id'
});
Crs_relative_crs_funded.belongsTo( Crs, {
  foreignKey: 'crs_id'
});

Crs.hasOne( Crs_relative_crs_unfunded, {
  foreignKey: 'crs_id'
});
Crs_relative_crs_unfunded.belongsTo( Crs, {
  foreignKey: 'crs_id'
});

Crs.hasOne( Funded_network, {
  foreignKey: 'crs_id'
});
Funded_network.belongsTo( Crs, {
  foreignKey: 'crs_id'
});

Crs.belongsTo( Ctu_pi, {
  foreignKey: 'ctu_id',
});
Ctu_pi.hasMany( Crs, {
  foreignKey: 'ctu_id',
  targetKey: 'ctu_org_id'
});

Crs.hasMany( Crs_pop, {
  foreignKey: 'crs_id',
  targetKey: 'crs_id'
});
Crs_pop.belongsTo( Crs, {
  foreignKey: 'crs_id'
});

Crs.hasOne( Unfunded_network, {
  foreignKey: 'crs_id'
});
Unfunded_network.belongsTo( Crs, {
  foreignKey: 'crs_id'
});

Crs.hasMany( Crs_ps, {
  foreignKey: 'crs_id',
  targetKey: 'crs_id'
});

Crs_ps.belongsTo( Crs, {
  foreignKey: 'crs_id'
});

Crs.hasOne( Regulatory, {
  foreignKey: 'crs_id'
});
Regulatory.belongsTo( Crs, {
  foreignKey: 'crs_id'
});

Crs.hasOne( Crs_po, {
  foreignKey: 'crs_id'
});
Crs_po.belongsTo( Crs, {
  foreignKey: 'crs_id'
});

Crs.belongsToMany( Laboratories,
  {
    through: Crs_lab,
    foreignKey: 'crs_id'
  }
);

Laboratories.belongsToMany( Crs,
  {
    through: Crs_lab,
    foreignKey: 'lab_id',
    as: 'related_lab',
  }
);

Crs.belongsToMany( Pharmacies,
  {
    through: Crs_phar,
    foreignKey: 'crs_id'
  }
);
Pharmacies.belongsToMany( Crs,
  {
    through: Crs_phar,
    foreignKey: 'phar_id',
    as: 'related_phar',
  }
);

Crs.hasOne( Crs_coordinator, {
  foreignKey: 'crs_id'
});
Crs_coordinator.belongsTo( Crs, {
  foreignKey: 'crs_id'
});

// Laboratories.hasMany(Crs_lab, {
//     foreignKey: 'lab_id',
//     sourceKey: 'lab_id'
// });
//
// Crs.hasMany(Crs_lab, {
//   foreignKey: 'crs_id',
//   sourceKey: 'crs_id'
// });



// Missing piArray from Eloquent?

module.exports = {
  Crs_coordinator: Crs_coordinator,
  Crs_lab: Crs_lab,
  Crs_phar: Crs_phar,
  Crs_po: Crs_po,
  Crs_pop: Crs_pop,
  Crs_ps: Crs_ps,
  Crs_relative_crs_funded: Crs_relative_crs_funded,
  Crs_relative_crs_unfunded: Crs_relative_crs_unfunded,
  Crs_total: Crs_total,
  Crs: Crs,
  Ctu_pi: Ctu_pi,
  Funded_network: Funded_network,
  Laboratories: Laboratories,
  Pharmacies: Pharmacies,
  Population_categories: Population_categories,
  Regulatory: Regulatory,
  Unfunded_network: Unfunded_network
};
