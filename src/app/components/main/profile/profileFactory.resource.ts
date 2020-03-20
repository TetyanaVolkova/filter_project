import { Input, Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Injectable()

export default class ProfileFactory {
  @Input() private mapStyles;
  public moveFocusBack;
  public getCrs;

  constructor  (private router: Router,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer ) {

    this.getCrs = function(selectedSite, source) {
      let that = this;
      var result = {};
      if ( selectedSite != null ) {
        result = selectedSite;
        selectedSite = null;
      } else {
        source.forEach( function( crs ) {
          if ( crs.crs_id == decodeURIComponent( that.router.params.crs_id )) {
            result = crs;
          }
        });
      }
      if ( Object.getOwnPropertyNames( result ).length === 0 ) {
        this.router.navigate( ['notFound'] );
      }
      return result;
    }

    this.moveFocusBack = function() {
      let CTU_menu_button = Array.from(document.getElementsByClassName('CTU_menu_button'));
      let button = CTU_menu_button[0];
      if ( button ) {
        (button as HTMLElement).focus();
      }
    }
  }
}