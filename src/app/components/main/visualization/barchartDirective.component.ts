import {
  Component,
  Input,
  OnInit,
  OnChanges
} from "@angular/core";
import d3 from "d3";

@Component({
  selector: "barchart",
  template: "<div></div>"
})
export class BarchartDirective implements OnInit, OnChanges {
  @Input() val;
  @Input() filter;
  @Input() data;
  private oldLength;
  constructor() {}
  ngOnInit() {
    // this.drawDashboard.resize();
  }
  ngOnChanges() {
    if ( this.val ) {
        let that = this;
        var continent = this.filter.location.Continent;
        // change the data between continent and country, if North America, US will show states network detail.
        if ( continent == "N. America" ) {
          var usaStateData = this.dataClean(
            this.val.filter( crs => crs.country === "United States" ),
            "state"
          );

          var notUsaData = this.dataClean(
            this.val.filter( crs => crs.country !== "United States" ),
            "country"
          );
          var data = usaStateData;
          // Add Hatti to America States
          for ( var i = 0; i < Object.keys( usaStateData ).length; i++ ) {
            for ( var j = 0; j < Object.keys( notUsaData[i] ).length; j++ ) {
              data[i].push( notUsaData[i][j] );
            }
            data[i] = data[i].sort( this.compare ); // sort Hatti with all States
          }
        } else if ( continent === undefined || continent.length === 0 ) {
          var data = this.dataClean( this.val, "continent" );
        } else {
          var data = this.dataClean( this.val, "country" );
        }

        //deal with animation issues
        var container = d3.select( ".content" );
        setTimeout(() => that.drawDashboard( "#dashboard", data ), 150 );
    }
  }
  //compare function to sort
  compare( a, b ) {
    if ( a.x < b.x ) return -1;
    if ( a.x > b.x ) return 1;
    return 0;
  }

  // clean the newVal data
  dataClean( newVal, continentOrCountry ) {
    // var cleanData = [];
    var temp = {
      funded: {},
      psonly: {},
      unfunded: {}
    };

    newVal.forEach( crs => {
      const region =
        crs[continentOrCountry] !== null
          ? crs[continentOrCountry].trim()
          : "NA";

      //put repreive under unfunded
      const key = crs.crs_type === "repreive" ? "psonly" : crs.crs_type;

      //first, create network: {region:0} for each network
      Object.keys( temp ).forEach( function( category ) {
        if ( temp[category] )
          if ( temp[category][region] == undefined ) {
            temp[category][region] = 0;
          }
      });
      // for the matched category and region, plus 1
      temp[key][region]++;
    });

    //from temp create wanted data format
    const cleanData = Object.keys( temp ).map( category => {
      const Locations = Object.keys( temp[category] ).sort();
      return Locations.map( loc => {
        const location =
          loc === "District of Columbia" ? "Washington D.C." : loc;
        return { x: location, y: temp[category][loc] };
      });
    });
    return cleanData;
  }

  drawDashboard( id, fData ) {
    var labelColor = "#000000";
    var n = 3; // number of catagories
    var regions = fData[0].map( item => item.x ); // used for x domain

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
    d3.select( window ).on( "resize", resize );
    // once left and right nav are popped up, redraw d3
    d3.selectAll( ".d3Resize" ).on( "click", function() {
      setTimeout( resize, 500 );
    });

    function resize() {
      //clear old dashboard elements if there are any
      if ( document.getElementById( "dashboard" ) != null ) {
        var contents = document.getElementById( "dashboard" ).innerHTML;
      } else {
        return;
      }
      if ( contents ) {
        var width =
          parseInt( d3.select( ".data-viz-container" ).style( "width" ), 10 ) || 1312;
        var height =
          parseInt( d3.select( ".data-viz-container" ).style( "height" ), 10 ) || 878;
        document.getElementById( "dashboard" ).innerHTML = "";
      }

      const widthPercentage = width * 0.85;
      const heightPercentage = height * 0.9;
      const widthRatio = Math.max( Math.min( 1, widthPercentage / 400 ), 0.1 );
      const heightRatio = Math.max( Math.min( 1, heightPercentage / 400 ), 0.1 );
      // set up margins and dimensions
      var hGDim = {
        t: 40 * heightRatio,
        r: 50 * widthRatio,
        b: 70 * heightRatio,
        l: 80 * widthRatio,
        w: 0,
        h: 0
      };
      hGDim.w = widthPercentage - hGDim.l - hGDim.r;
      // Shrink chart height at a rate that slightly exceeds browser height to avoid overlap with .category-container
      hGDim.h = Math.max( heightPercentage - hGDim.t * 2 - hGDim.b * 2, 0 );

      // create x y scales
      var x = d3.scale
        .ordinal()
        .domain( regions )
        .rangeRoundBands( [0, hGDim.w], 0.3 );

      var y = d3.scale
        .linear()
        .domain( [0, yStackMax] )
        .range( [hGDim.h, 0] )
        .nice();

      // set up colors
      var color = d3.scale.ordinal().range( ["#000066", "#B5B4B5", "#1D1DFF"] );

      // set up x Axis
      var xAxis = d3.svg
        .axis()
        .scale( x )
        .tickSize( 0.5 )
        .tickPadding( 8 )
        .orient( "bottom" );

      // set up y Axis
      var yAxis = d3.svg
        .axis()
        .scale( y )
        .tickSize( 0.5 )
        .tickPadding( 8 )
        .orient( "left" )
        // Only show integers
        .tickFormat( d3.format( "d" ))
        // If yStackMax is greater than 10, use default D3 logic for determining # of ticks
        // Otherwise, use yStackMax as number of ticks
        .ticks( yStackMax > 10 ? null : yStackMax );

      // set up viz width, height and start point
      var svg = d3
        .select( id )
        .append( "svg" )
        .attr( "id", "svgplot" )
        .attr( "width", hGDim.w + hGDim.l + hGDim.r )
        .attr( "height", hGDim.h + hGDim.t + hGDim.b )
        .append( "g" )
        .attr( "transform", "translate(" + hGDim.l + ", " + hGDim.t + ")" );

      // create layer for each category and assign color
      var layer = svg
        .selectAll( ".layer" )
        .data( layers )
        .enter()
        .append( "g" )
        .attr( "class", "layer" )
        .style( "fill", function( d, i ) {
          return color( i );
        });

      // create a variable for bar width
      var ColumnWidth = Math.min( x.rangeBand(), ( width / 77 ) * 3 );

      // variance is for later adjustment
      var variance = ( x.rangeBand() - ColumnWidth ) / 2;

      //append rect for each layer
      var rect = layer
        .selectAll( "rect" )
        .data( d => d )
        .enter()
        .append( "rect" )
        .attr( "x", d => x( d.x ) + variance )
        .attr( "y", hGDim.h )
        .attr( "width", ColumnWidth )
        .attr( "height", 0 )
        .on( "mouseover", () => {
          tooltip.style( "display", null );
        })
        .on( "mouseout", () => {
          tooltip.style( "display", "none" );
        })
        .on( "mousemove", function( d ) {
          var xPosition = d3.mouse( this )[0] - 15;
          var yPosition = d3.mouse( this )[1] - 25;
          tooltip.attr(
            "transform",
            "translate(" + xPosition + "," + yPosition + ")"
          );
          tooltip.select( "text" ).text( d.y );
        });

      // rect transition
      rect
        .transition()
        .delay(( d, i ) => i * 10 )
        .attr( "y", d => y( d.y0 + d.y ))
        .attr( "height", d => y( d.y0 ) - y( d.y0 + d.y ));

      // add x axis and labels
      svg
        .append( "g" )
        .attr( "class", "x axis" )
        .attr( "transform", "translate(0, " + hGDim.h + ")" )
        .attr( "fill", labelColor )
        .call( xAxis )
        .selectAll( "text" )
        .attr( "class", "xLabel" )
        .style( "text-anchor", "start" ) // rotate based on start point of the text
        .attr( "transform", "rotate(30 -10, 0)" ) // rotate x-axis labels
        .style( "font-size", "calc(0.4vw + 0.6vh)" );

      // add y axis labels, this method is suitable for multiple lines
      svg
        .append( "text" )
        .attr( "transform", "rotate(-90)" )
        .each( function( d ) {
          var yAxisText = ["* CRS Count"]; //if there are two or more lines
          for ( let i = 0; i < yAxisText.length; i++ ) {
            d3.select( this )
              .append( "tspan" )
              .text( yAxisText[i] )
              .attr( "class", "yAxisText" )
              .attr( "x", -hGDim.h / 2.1 )
              .attr( "y", -60 ) //+ spacing*i
              .attr( "dy", ".71em" )
              .style( "text-anchor", "middle" )
              .style( "font-size", 1.5 + "vh" )
              .attr( "fill", labelColor );
          }
        });

      // add y axis
      svg
        .append( "g" )
        .attr( "class", "y axis" )
        .attr( "transform", "translate(" + [0, 0] + ")" )
        .attr( "fill", labelColor )
        .call( yAxis )
        .selectAll( "text" )
        .attr( "class", "yLabel" )
        .style( "text-anchor", "end" ) // rotate based on start point of the text
        .style( "font-size", 1.5 + "vh" );

      // Prep the tooltip bits, initial display is hidden
      var tooltip = svg
        .append( "g" )
        .attr( "class", "tooltip" )
        .style( "display", "none" )
        .style( "pointer-events", "none" );

      tooltip
        .append( "rect" )
        .attr( "rx", 5 )
        .attr( "ry", 5 )
        .attr( "class", "graph_tooltip" )
        .attr( "width", 30 )
        .attr( "height", 20 )
        .attr( "fill", "white" );

      tooltip
        .append( "text" )
        .attr( "x", 15 )
        .attr( "dy", "1.2em" )
        .style( "text-anchor", "middle" )
        .attr( "font-size", "12px" )
        .attr( "font-weight", "bold" )
        .attr( "fill", "#326496" );
    }
    // end of resize function
  }
  // end of dashboard
  // end of link function
}

export default BarchartDirective;
