import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fundedPipe"
})

export default class fundedPipe implements PipeTransform {
  transform ( input ) {
    let result = [];
    input.forEach( inp => {
        if ( inp.crs_type !== "unfunded") {
            result.push(inp);
        }
    })
    return result;
  }
}