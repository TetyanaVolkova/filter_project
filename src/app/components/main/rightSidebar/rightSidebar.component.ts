import { Component, Input, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import CrsFactory from "../search/crsFactory.resource";

@Component({
  selector: 'rightSidebarComponent',
  template: require ('./rightSidebar.html')
})
export class rightSidebarComponent implements OnInit {
  objectKeys = Object.keys;
  @Input() private selectedSite;
  private favoriteCrs;
  private index;
  private siteIndex;
  private favoriteIndex;
  private subscription;
  private sub;
  private subsc;
  private subs;
  private subscr;
  private crs_name;
  private crss;
  private crs;
  private lockRight = true;
  private showFavorite;
  constructor  (private router: Router,
                private CrsFactory: CrsFactory,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                private cd: ChangeDetectorRef) {
    this.index = 0;
    this.matIconRegistry.addSvgIcon(
      "TRASH",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/TRASH.svg")
    );

  }
  ngOnInit() {
    this.subscription = this.CrsFactory.myCrss.subscribe( (crss) => {
      this.crss = crss;
      this.cd.markForCheck();
    });

    this.sub = this.CrsFactory.lockRight.subscribe( (lockRight) => {
      this.lockRight = lockRight;
    });

    this.subsc = this.CrsFactory.favoriteCrs.subscribe( (favoriteCrs) => {
      this.favoriteCrs = favoriteCrs;
    });

    this.subscr = this.CrsFactory.showFavorite.subscribe( (showFavorite) => {
      this.showFavorite = showFavorite;
    });

    this.subs = this.CrsFactory.myCrs.subscribe( (crs) => {
      this.crs = crs;
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subs.unsubscribe();
  }

  altFavorite( crs ) {
    let site_name = 'site' + crs.crs_name;
    let link = document.getElementById(site_name);
    link.focus();
      this.CrsFactory.alterFavorite(crs);
  };

  selectSite( crs ) {
    this.selectedSite = crs;
  }

  changefocus( crs ) {
    this.CrsFactory.myCrs.next(crs);
    this.crs = crs;
    if ( this.lockRight === true && this.crs !== undefined ) {
      let that = this;
      this.crss.forEach( function( item, i ) {
        if ( item.crs_id === that.crs.crs_id ) {
          that.index = i;
        }
      });
      if ( this.showFavorite === false ) {
        this.siteIndex = this.index;
      } else {
        this.favoriteIndex = this.index;
      }
      let target;
      if ( this.showFavorite === false ) {
        target = document.getElementById( 'site' + this.crs.crs_name );
      } else {
        target = document.getElementById( 'fav' + this.crs.crs_name );
      }
      if ( target !== null ) target.scrollIntoView( true );
    }
    let profile = document.getElementById( 'moveFocus' );
    if ( profile ) {
      profile.focus();
    }
    this.router.navigate(['/profile', crs.crs_id]);
  };

  clearSelectedSite() {
    this.selectedSite = null;
  };

  resetFavorite() {
    this.CrsFactory.favoriteCrs.next([]);
  };
}
export default ( rightSidebarComponent );
