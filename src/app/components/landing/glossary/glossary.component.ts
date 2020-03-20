import { Component } from "@angular/core";

@Component({
  selector: 'glossaryComponent',
  template: require ('./glossary.html')
})

export class glossaryComponent {
  private anchors: any;
  private newHash: any;
  constructor  () {
    this.anchors = this.range( 'A', 'Z' );
  }
  
  range( start, stop ) {
    let result = [];
    for (
      let idx = start.charCodeAt( 0 ), end = stop.charCodeAt( 0 );
      idx <= end;
      ++idx
    ) {
      result.push( String.fromCharCode( idx ));
    }
    return result;
  }
}
export default ( glossaryComponent );
