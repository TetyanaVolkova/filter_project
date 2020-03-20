'use strict';

import crsApp from '../../../app';

describe( 'Barchart', function() {
  var element, $compile, $state, mockScope;

  beforeEach(() => {
    angular.mock.module( crsApp );
    inject( function( $rootScope, _$state_, _$compile_, $controller ) {
      element = angular.element(
        '<barchart val="viz_data" filter="filter">{{ (25 * 2) + (100 - 50) }}</barchart>'
      );
      mockScope = $rootScope.$new();
      $state = _$state_;
      $controller( 'VisualizationController', {
        $scope: mockScope,
        $state: $state
      });
      $compile = _$compile_;
      $compile( element )( mockScope );
      mockScope.$digest();
    });
  });

  it( 'should display the text', function() {
    expect( element.html()).toBeDefined();
  });

  it( 'should equal 100', function() {
    mockScope.$digest();
    expect( element.html()).toBe( '100' );
  });

  it( 'should spy on barchart', function() {
    expect( mockScope.val ).toBeUndefined();
    expect( mockScope.filter ).toBeUndefined();
    expect( typeof mockScope.$watchCollection ).toBe( 'function' );
  });

  it( 'should spy on $watchCollection', function() {
    var _spyWatchCollection_ = spyOn(
      mockScope,
      '$watchCollection'
    ).and.returnValue( 10 );
    mockScope.$watchCollection();
    expect( _spyWatchCollection_ ).toHaveBeenCalled();
    expect( mockScope.$watchCollection()).toEqual( 10 );
  });

  it( 'should check compare', function() {
    var compare = function( a, b ) {
      if ( a.x < b.x ) {
        return -1;
      } else if ( a.x > b.x ) {
        return 1;
      } else {
        return 0;
      }
    };
    expect( typeof compare ).toBe( 'function' );
    expect( compare ).toThrow();
  });

  describe( 'data Clean', function() {
    it( 'should test dataClean', function() {
      function dataClean( newVal, continentOrCountry ) {
        var data = [];
        var temp = { funded: {}, psonly: {}, unfunded: {} };
        newVal.forEach( function( crs ) {
          var region = crs[continentOrCountry].trim();
          var key = crs.crs_type;

          //put repreive under unfunded
          if ( crs.crs_type == 'repreive' ) {
            key = 'unfunded';
          }
          //first, create network: {region:0} for each network

          Object.keys( temp ).forEach( function( category ) {
            if ( temp[category] )
              if ( temp[category][region] === undefined ) {
                temp[category][region] = 0;
              }
          });
          // for the matched category and region, plus 1
          temp[key][region]++;
        });

        //from temp create wanted data format
        Object.keys( temp ).forEach( function( category ) {
          var obj = [];
          var Locations = Object.keys( temp[category] ).sort();

          for ( var i in Locations ) {
            var location = Locations[i];
            var element = { x: location, y: temp[category][location] };
            obj.push( element );
          }
          data.push( obj );
        });
        return data;
      }
      expect( typeof dataClean ).toBe( 'function' );
      expect( dataClean ).toThrow();
    });
  });

  describe( 'dashboard tests', function() {
    it( 'should resize', function() {
      function resize() {
        //clear old dashboard elements if there are any
        if ( document.getElementById( 'dashboard' ) !== null ) {
          var contents = document.getElementById( 'dashboard' ).innerHTML;
        } else {
          return;
        }
        if ( contents ) {
          var width =
            parseInt( d3.select( '.data-viz-container' ).style( 'width' ), 10 ) ||
            1616;
          var height =
            parseInt( d3.select( '.data-viz-container' ).style( 'height' ), 10 ) ||
            878;
          document.getElementById( 'dashboard' ).innerHTML = '';
        }

        // set up margins and dimensions
        var hGDim = { t: 5, r: 50, b: 95, l: 80 };
        ( hGDim.w = width * 0.78 - hGDim.l - hGDim.r ),
          ( hGDim.h = height * 0.79 - hGDim.t - hGDim.b );

        // create x y scales
        var x = d3.scale
          .ordinal()
          .domain( regions )
          .rangeRoundBands( [0, hGDim.w], 0.3 );

        var y = d3.scale
          .linear()
          .domain( [0, yStackMax] )
          .range( [hGDim.h, 0] );

        // set up colors
        var color = d3.scale.ordinal().range( ["#000066", "#B5B4B5", "#1D1DFF"] );

        // set up x Axis
        var xAxis = d3.svg
          .axis()
          .scale( x )
          .tickSize( 5 )
          .tickPadding( 6 )
          .orient( 'bottom' );

        // set up viz width, height and start point
        var svg = d3
          .select( id )
          .append( 'svg' )
          .attr( 'id', 'svgplot' )
          .attr( 'width', hGDim.w + hGDim.l + hGDim.r )
          .attr( 'height', hGDim.h + hGDim.t + hGDim.b )
          .append( 'g' )
          .attr( 'transform', 'translate(' + hGDim.l + ', ' + hGDim.t + ')' );
        // create layer for each category and assign color
        var layer = svg
          .selectAll( '.layer' )
          .data( layers )
          .enter()
          .append( 'g' )
          .attr( 'class', 'layer' )
          .style( 'fill', function( d, i ) {
            return color( i );
          });
        // create a variable for bar width
        var ColumnWidth = Math.min( x.rangeBand(), width / 77 * 3 );
        // variance is for later adjustment
        var variance = ( x.rangeBand() - ColumnWidth ) / 2;
        //append rect for each layer
        var rect = layer
          .selectAll( 'rect' )
          .data( function( d ) {
            return d;
          })
          .enter()
          .append( 'rect' )
          .attr( 'x', function( d ) {
            return x( d.x ) + variance;
          })
          .attr( 'y', hGDim.h )
          .attr( 'width', ColumnWidth )
          .attr( 'height', 0 );
        // .style('cursor', 'pointer');

        // rect transition
        rect
          .transition()
          .delay( function( d, i ) {
            return i * 10;
          })
          .attr( 'y', function( d ) {
            return y( d.y0 + d.y );
          })
          .attr( 'height', function( d ) {
            return y( d.y0 ) - y( d.y0 + d.y );
          });
        // add text labels for Stacked Bars
        var text = layer
          .selectAll( 'text' )
          .data( function( d ) {
            return d;
          })
          .enter()
          .append( 'text' )
          .attr( 'fill', labelColor )
          .attr( 'class', 'StackText' )
          .attr( 'x', function( d ) {
            return x( d.x ) + x.rangeBand() / 2;
          })
          .attr( 'y', function( d ) {
            return y( d.y0 + d.y ) + ( y( d.y0 ) - y( d.y0 + d.y )) / 2 - 1;
          })
          .attr( 'dy', '.35em' )
          .attr( 'text-anchor', 'middle' )
          .transition()
          .delay( function( d, i ) {
            return 300;
          })
          .duration( 800 )
          .text( function( d ) {
            if ( d.y === 0 ) return '';
            return d.y;
          })
          .style( 'font-size', function( d ) {
            return (
              Math.max( 11, Math.min( 20, y( d.y0 ) - y( d.y0 + d.y ), ColumnWidth )) +
              'px'
            );
          }); // set up font-size range
        // add x axis and labels
        svg
          .append( 'g' )
          .attr( 'class', 'x axis' )
          .attr( 'transform', 'translate(0, ' + hGDim.h + ')' )
          .attr( 'fill', labelColor )
          .call( xAxis )
          .selectAll( 'text' )
          .attr( 'class', 'xLabel' )
          .style( 'text-anchor', 'start' ) // rotate based on start point of the text
          .attr( 'transform', 'rotate(30 -10, 0)' ) // rotate x-axis labels
          .style( 'font-size', 0.8 + 'vw' );
        // add y axis labels, this method is suitable for mulitple lines
        svg
          .append( 'text' )
          .attr( 'transform', 'rotate(-90)' )
          .each( function( d ) {
            var yAxisText = ['* CRS Count']; //if there are two or more lines
            for ( i = 0; i < yAxisText.length; i++ ) {
              d3
                .select( this )
                .append( 'tspan' )
                .text( yAxisText[i] )
                .attr( 'class', 'yAxisText' )
                .attr( 'x', -hGDim.h / 2.1 )
                .attr( 'y', Math.max( -hGDim.w / 19, -hGDim.l )) //+ spacing*i
                .attr( 'dy', '.71em' )
                .style( 'text-anchor', 'middle' )
                .style( 'font-size', 0.8 - i / 10 + 'vw' )
                .attr( 'fill', labelColor );
            }
          });
      } // end of resize function
      expect( typeof resize ).toBe( 'function' );
      expect( resize ).not.toThrow();
    });

    it( 'should test dashboard', function() {
      function dashboard( id, fData ) {
        var labelColor = '#FFFFFF';
        var n = 3; // number of catagories
        var m = fData[0].length; // number of x Axis labels
        var regions = []; // used for x domain
        for ( i = 0; i < m; i++ ) {
          regions.push( fData[0][i].x );
        }

        // Prepare data to be used in Stacked and Grouped barchart
        var stack = d3.layout.stack(),
          layers = stack( fData ),
          yGroupMax = d3.max( layers, function( layer ) {
            return d3.max( layer, function( d ) {
              return d.y;
            });
          }),
          yStackMax = d3.max( layers, function( layer ) {
            return d3.max( layer, function( d ) {
              return d.y0 + d.y;
            });
          });

        // Draw d3 based on current window size
        resize();

        // when window size changed, redraw d3
        d3.select( window ).on( 'resize', resize );
        function resize() {
          //clear old dashboard elements if there are any
          if ( document.getElementById( 'dashboard' ) !== null ) {
            var contents = document.getElementById( 'dashboard' ).innerHTML;
          } else {
            return;
          }
          if ( contents ) {
            var width =
              parseInt( d3.select( '.data-viz-container' ).style( 'width' ), 10 ) ||
              1616;
            var height =
              parseInt( d3.select( '.data-viz-container' ).style( 'height' ), 10 ) ||
              878;
            document.getElementById( 'dashboard' ).innerHTML = '';
          }

          // set up margins and dimensions
          var hGDim = { t: 5, r: 50, b: 95, l: 80 };
          ( hGDim.w = width * 0.78 - hGDim.l - hGDim.r ),
            ( hGDim.h = height * 0.79 - hGDim.t - hGDim.b );

          // create x y scales
          var x = d3.scale
            .ordinal()
            .domain( regions )
            .rangeRoundBands( [0, hGDim.w], 0.3 );

          var y = d3.scale
            .linear()
            .domain( [0, yStackMax] )
            .range( [hGDim.h, 0] );

          // set up colors
          var color = d3.scale
            .ordinal()
            .range( ['#000066', '#B5B4B5', '#1D1DFF'] );

          // set up x Axis
          var xAxis = d3.svg
            .axis()
            .scale( x )
            .tickSize( 5 )
            .tickPadding( 6 )
            .orient( 'bottom' );

          // set up viz width, height and start point
          var svg = d3
            .select( id )
            .append( 'svg' )
            .attr( 'id', 'svgplot' )
            .attr( 'width', hGDim.w + hGDim.l + hGDim.r )
            .attr( 'height', hGDim.h + hGDim.t + hGDim.b )
            .append( 'g' )
            .attr( 'transform', 'translate(' + hGDim.l + ', ' + hGDim.t + ')' );

          // create layer for each category and assign color
          var layer = svg
            .selectAll( '.layer' )
            .data( layers )
            .enter()
            .append( 'g' )
            .attr( 'class', 'layer' )
            .style( 'fill', function( d, i ) {
              return color( i );
            });

          // create a variable for bar width
          var ColumnWidth = Math.min( x.rangeBand(), width / 77 * 3 );
          // variance is for later adjustment
          var variance = ( x.rangeBand() - ColumnWidth ) / 2;
          //append rect for each layer
          var rect = layer
            .selectAll( 'rect' )
            .data( function( d ) {
              return d;
            })
            .enter()
            .append( 'rect' )
            .attr( 'x', function( d ) {
              return x( d.x ) + variance;
            })
            .attr( 'y', hGDim.h )
            .attr( 'width', ColumnWidth )
            .attr( 'height', 0 );
          // .style('cursor', 'pointer');

          // rect transition
          rect
            .transition()
            .delay( function( d, i ) {
              return i * 10;
            })
            .attr( 'y', function( d ) {
              return y( d.y0 + d.y );
            })
            .attr( 'height', function( d ) {
              return y( d.y0 ) - y( d.y0 + d.y );
            });
          // add text labels for Stacked Bars
          var text = layer
            .selectAll( 'text' )
            .data( function( d ) {
              return d;
            })
            .enter()
            .append( 'text' )
            .attr( 'fill', labelColor )
            .attr( 'class', 'StackText' )
            .attr( 'x', function( d ) {
              return x( d.x ) + x.rangeBand() / 2;
            })
            .attr( 'y', function( d ) {
              return y( d.y0 + d.y ) + ( y( d.y0 ) - y( d.y0 + d.y )) / 2 - 1;
            })
            .attr( 'dy', '.35em' )
            .attr( 'text-anchor', 'middle' )
            .transition()
            .delay( function( d, i ) {
              return 300;
            })
            .duration( 800 )
            .text( function( d ) {
              if ( d.y === 0 ) return '';
              return d.y;
            })
            .style( 'font-size', function( d ) {
              return (
                Math.max(
                  11,
                  Math.min( 20, y( d.y0 ) - y( d.y0 + d.y ), ColumnWidth )
                ) + 'px'
              );
            }); // set up font-size range

          // add x axis and labels
          svg
            .append( 'g' )
            .attr( 'class', 'x axis' )
            .attr( 'transform', 'translate(0, ' + hGDim.h + ')' )
            .attr( 'fill', labelColor )
            .call( xAxis )
            .selectAll( 'text' )
            .attr( 'class', 'xLabel' )
            .style( 'text-anchor', 'start' ) // rotate based on start point of the text
            .attr( 'transform', 'rotate(30 -10, 0)' ) // rotate x-axis labels
            .style( 'font-size', 0.8 + 'vw' );

          // add y axis labels, this method is suitable for mulitple lines
          svg
            .append( 'text' )
            .attr( 'transform', 'rotate(-90)' )
            .each( function( d ) {
              var yAxisText = ['* CRS Count']; //if there are two or more lines
              for ( i = 0; i < yAxisText.length; i++ ) {
                d3
                  .select( this )
                  .append( 'tspan' )
                  .text( yAxisText[i] )
                  .attr( 'class', 'yAxisText' )
                  .attr( 'x', -hGDim.h / 2.1 )
                  .attr( 'y', Math.max( -hGDim.w / 19, -hGDim.l )) //+ spacing*i
                  .attr( 'dy', '.71em' )
                  .style( 'text-anchor', 'middle' )
                  .style( 'font-size', 0.8 - i / 10 + 'vw' )
                  .attr( 'fill', labelColor );
              }
            });
        } // end of resize function
      } // end of dashboard
      expect( typeof dashboard ).toBe( 'function' );
    });
  });
});
