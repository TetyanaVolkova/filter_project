import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "blacklistPipe"
})

export default class blacklistPipe implements PipeTransform {
  transform ( input, def ) {
    if ( !input.match( /[9]{3}/g )) {
      return input;
    } else {
      let pattern = new RegExp( '.*-\\s', 'i' );
      return input.replace( pattern, '' );
    }
  }
}