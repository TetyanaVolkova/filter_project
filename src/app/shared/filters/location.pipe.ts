import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "locationFilter"
})

export default class locationFilter implements PipeTransform {
  transform ( input, continent, country, state ) {
      if (state != null)
      {
        var result = [];
        for(var z in continent)
        {
          for(var i in country)
          {
              for(var j in state)
              {
                  var target = input[continent[z]][country[i]];
                  if (target != null)
                  {
                    result = this.arrayMerge(result, target[state[j]]);
                  }
              }
          }
        }
        return result.sort();
      }
    var result = [];
    if ( country !== undefined ) {
      for ( var i in continent ) {
        for ( var j in country ) {
          var target = input[continent[i]];
          if ( target !== undefined ) {
            result = this.arrayMerge( result, target[country[j]] );
          }
        }
      }
    } else if ( continent !== undefined ) {
      for ( var i in continent ) {
        result = this.mergeState( result, input[continent[i]] );
      }
    } else {
      for ( var i in input ) {
        result.push( i );
      }
    }
    return result.sort();
  }
  mergeState( obj1, obj2 ) {
    for ( var j in obj2 ) {
      if ( obj1.indexOf( j ) === -1 ) {
        obj1.push( j );
      }
    }
    return obj1;
  }

  arrayMerge( arr1, arr2 ) {
    for ( var i in arr2 ) {
      if ( arr1.indexOf( arr2[i] ) == -1 ) {
        arr1.push( arr2[i] );
      }
    }
    return arr1;
  }
}

