
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {ActivatedRoute, Params} from '@angular/router';
import { Router } from "@angular/router";
import CrsFactory from "../search/crsFactory.resource";

@Component({
  selector: 'profileLeftComponent',
  template: require ( './profileNav.html' )
})

export class profileLeftComponent implements OnInit {
  private currentState: string;
  private disclaimer: string;
  private labDis: number;
  private subscription;
  private crs;
  private source;
  private sub;
  private subs;
  constructor ( private router: Router,
                private route: ActivatedRoute,
                private CrsFactory: CrsFactory,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                private cd: ChangeDetectorRef ) {
    this.matIconRegistry.addSvgIcon(
      "ic_email",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/ic_email_24px.svg")
    );

  }
  ngOnInit() {
    this.subs = this.CrsFactory.myCrs.subscribe( (crs) => {
      this.crs = crs;
      this.cd.markForCheck();
    });
    this.sub = this.CrsFactory.source.subscribe( (source) => {
      this.source = source;
    });
    this.subscription = this.router.events.subscribe((url:any) => {
      this.currentState = this.router.url;
    });
  
    // function for lab and epi disclaimer on the left nav
    if ( this.router.url.includes('/profile') ) {
      this.disclaimer =
        'Any changes to information contained in this CRS profile must be requested through the Program Officer.';
      this.labDis = 1;
    } else if ( this.router.url.includes('/labs') ) {
      this.disclaimer =
        'Laboratory details on this page are reported by the grantee or CRS Leader and should not be considered as a comprehensive representation of each lab. Additional laboratory information may be provided upon request.';
      this.labDis = 2;
    } else if ( this.router.url.includes('/pharms') ) {
      this.disclaimer =
        'Pharmacy details on this page are reported by the grantee or CRS Leader and should not be considered as a comprehensive representation of each pharmacy. Additional pharmacy information may be provided upon request.';
      this.labDis = 3;
    } else if ( this.router.url.includes( 'epi' ) ) {
      this.disclaimer =
        'These characteristics are reported by the grantee or CRS Leader and represent the population accessible by this site for clinical research activity.';
      this.labDis = 4;
    } else {
      this.disclaimer = null;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subs.unsubscribe();
    this.sub.unsubscribe();
  }
  goToView( view ) {
    this.CrsFactory.myCrs.next(this.crs);
    if ( view === 'labs' ) {
      this.disclaimer = 'Laboratory details on this page are reported by the grantee or CRS Leader and should not be considered as a comprehensive representation of each lab. Additional laboratory information may be provided upon request.';
      this.labDis = 2;
      this.router.navigate( ['/labs', this.crs.crs_id] );
      var lab = document.getElementById( 'labCRScontent' );
      if ( lab ) {
        lab.focus();
      }
    } else if ( view === 'pharms' ) {
      this.disclaimer = 'Pharmacy details on this page are reported by the grantee or CRS Leader and should not be considered as a comprehensive representation of each pharmacy. Additional pharmacy information may be provided upon request.';
      this.labDis = 3;
      this.router.navigate( ['/pharms', this.crs.crs_id] );
      var lab = document.getElementById( 'pharmsCRScontent' );
      if ( lab ) {
        lab.focus();
      }
    } else if ( view === 'epi' ) {
      this.disclaimer = 'These characteristics are reported by the grantee or CRS Leader and represent the population accessible by this site for clinical research activity.';
      this.labDis = 4;
      this.router.navigate( ['/epi', this.crs.crs_id] );
      var lab = document.getElementById( 'epiCRScontent' );
      if ( lab ) {
        lab.focus();
      }
    } else if ( view === 'profile' ) {
      this.disclaimer =
        'Any changes to information contained in this CRS profile must be requested through the Program Officer.';
      this.labDis = 1;
      this.router.navigate( ['/profile', this.crs.crs_id] );
      var profile = document.getElementById( 'mainCRScontent' );
      if ( profile ) {
        profile.focus();
      }
    }
  };
}
export default ( profileLeftComponent );