import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "unfundedPipe"
})

export default class unfundedPipe implements PipeTransform {
  transform ( input ) {
    let result = [];
    input.forEach( inp => {
        if ( inp.crs_type === "unfunded") {
            result.push(inp);
        }
    })
    return result;
  }
}