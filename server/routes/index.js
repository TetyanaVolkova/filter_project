const express = require( 'express' );
const models = require( '../models' );
const router = express.Router();

// Routes
router.get( '/api/crs_list', ( req, res ) => {
  models.Crs.findAll({
    include: [
      {
        model: models.Crs_relative_crs_funded
      },
      {
        model: models.Crs_relative_crs_unfunded
      },
      {
        model: models.Funded_network
      },
      {
        model: models.Ctu_pi
      },
      {
        model: models.Crs_pop,
        separate: true
      },
      {
        model: models.Unfunded_network
      },
      {
        model: models.Crs_ps
      },
      {
        model: models.Regulatory
      },
      {
        model: models.Crs_po
      },
      {
        model: models.Laboratories,
        include: [
          {
            model: models.Crs,
            as: 'related_lab',
            attributes: ['crs_id', 'crs_name', 'crs_type']
          }
        ]
      },
      {
        model: models.Pharmacies,
        include: [
          {
            model: models.Crs,
            as: 'related_phar',
            attributes: ['crs_id', 'crs_name', 'crs_type']
          }
        ]
      },
      {
        model: models.Crs_coordinator
      }
    ],
    order: ['crs_id']
  })
    .then( crsList => {
      // const blackListPi = ['Taha, Taha E.'];
      crsList.forEach( entry => {
        const lab = entry.dataValues;
        // split funded
        // if ( lab.pi !== null ) {
        //   const piPattern = lab.pi.ctu_pis;
        //   const regex = new RegExp( '^' + piPattern );
        //   if ( lab.pi.ctu_contact_pi.search( regex ) > -1 ) {
        //     delete lab.pi.ctu_pis;
        //   }
        //   for ( let index = 0; index < blackListPi.length; index++ ) {
        //     const bpi = blackListPi[index].split( ', ' );
        //     const patternString = `${bpi[0]}, ${bpi[1].split( ' ' )[0]}`;
        //     const pattern = new RegExp( '$' + patternString );
        //     lab.pi.ctu_pis = lab.pi.ctu_pis.replace( pattern, blackListPi );
        //     if ( blackListPi[index] !== lab.pi.ctu_contact_pi ) {
        //       const temp = lab.pi.ctu_contact_pi.split( ', ' );
        //       lab.pi.ctu_contact_pi = `${temp[0]}, ${temp[1].split( ' ' )[0]}`;
        //     }
        //   }
        // }
        if ( lab.related_funded !== null ) {
          const relatedCrsListId = lab.related_funded.crs_id;
          const relatedCrsList = lab.related_funded.crs_list.split( ';' );
          const relatedCrsName = lab.related_funded.crs_name_list.split( ';' );
          // delete lab.related_funded;
          const arraySize = relatedCrsList.length;
          if ( arraySize === 1 && relatedCrsList[0] === relatedCrsListId ) {
            lab.related_funded = null;
          } else {
            lab.related_funded = [];
            const result = [];
            for ( let index = 0; index < arraySize; index++ ) {
              if ( relatedCrsListId != relatedCrsList[index] ) {
                const temp = {};
                temp.crs_id = relatedCrsList[index];
                temp.crs_name = relatedCrsName[index];
                result.push( temp );
              }
              result.sort(( a, b ) => a.crs_name > b.crs_name );
              lab.related_funded = result;
            }
          }
        }
        // split unfunded
        if ( lab.related_unfunded !== null ) {
          const relatedCrsListId = lab.related_unfunded.crs_id;
          const relatedCrsList = lab.related_unfunded.crs_list.split( ';' );
          const relatedCrsName = lab.related_unfunded.crs_name_list.split( ';' );
          // delete lab.related_unfunded;
          const arraySize = relatedCrsList.length;
          if ( arraySize === 1 && relatedCrsList[0] === relatedCrsListId ) {
            lab.related_unfunded = null;
          } else {
            lab.related_unfunded = [];
            const result = [];
            for ( let index = 0; index < arraySize; index++ ) {
              if ( relatedCrsListId != relatedCrsList[index] ) {
                const temp = {};
                temp.crs_id = relatedCrsList[index];
                temp.crs_name = relatedCrsName[index];
                result.push( temp );
              }
              result.sort(( a, b ) => a.crs_name > b.crs_name );
              lab.related_unfunded = result;
            }
          }
        }
        lab.laboratories.forEach( l => {
          let value = l.dataValues;
          value.related_lab = value.related_lab.filter(
            m => m.crs_id !== lab.crs_id
          );
          delete value.related_lab.crs_lab;
          delete value.crs_lab;
        });
        lab.pharmacies.forEach( l => {
          let value = l.dataValues;
          value.related_phar = value.related_phar.filter(
            m => m.crs_id !== lab.crs_id
          );
          delete value.related_phar.crs_phar;
          delete value.crs_phar;
        });
      });
      res.json( crsList.map( m => m.dataValues ));
    })
    .catch( err => {
      console.error( err );
    });
});

// Find a crsCoordinator and return the associated upd_time
router.get( '/api/last_reviewed', ( req, res ) => {
  models.Crs_coordinator.findOne()
    .then( crsCoordinator => {
      let lastReviewed = crsCoordinator.upd_time;
      res.json( lastReviewed );
    })
    .catch( err => {
      console.error( err );
    });
});

// router.get( '/api/googlemap', ( req, res ) => {
//     let MAP_API_KEY = process.env.MAP_API_KEY;
//     console.log( MAP_API_KEY );
//     res.json( MAP_API_KEY );
// });

module.exports = router;
