import { Component, Inject, ChangeDetectorRef, OnInit, OnDestroy } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import moment from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import landingFactory from "../landing/landing.resource";
import CrsFactory from "../main/search/crsFactory.resource";

@Component({
  selector: 'footerComponent',
  template: ` <div class="md-toolbar" id="landing-footer" fxLayout="column" fxLayoutAlign="space-between center">
                <p fxFlex>Content created by DAIDS Office of Clinical Site Oversight (OCSO)</p>
                <ul class="big-footer" layout="row wrap" fxLayoutAlign="center center" fxFlex layout-gt-md>
                  <li>
                    <a href="https://www.hhs.gov/" target="_blank">HHS.gov</a>
                  </li>
                  <li>
                    <a href="https://www.nih.gov/" target="_blank">NIH.gov</a>
                  </li>
                  <li>
                    <a href="https://www.niaid.nih.gov/" target="_blank">NIAID.NIH.gov</a>
                  </li>
                  <li>
                    <a href="https://www.usa.gov/" target="_blank">USA.gov</a>
                  </li>
                  <li>
                    <a href="https://www.niaid.nih.gov/global/freedom-information-act" target="_blank">FOIA</a>
                  </li>
                  <li>
                    <a href="https://www.niaid.nih.gov/global/website-policies-and-notices" target="_blank">Web Policies and Notices</a>
                  </li>
                </ul>
                <div>Content last reviewed on <span *ngIf="updateTime.length != null">{{updateTime}}</span></div>
              </div>`
})
 
export class footerComponent implements OnInit, OnDestroy {
  private subscription;
  private updateTime;
  constructor( @Inject(HttpClient) private http: HttpClient,
                private landingFactory: landingFactory,
                private CrsFactory: CrsFactory,
                private cd: ChangeDetectorRef ) {
  }
  ngOnInit() {
    let that = this;
    this.landingFactory.getTime()
    .subscribe( function( res ) {
        that.updateTime = moment( res ).format( 'MMMM DD, YYYY' );
        that.landingFactory.updateTime.next( that.updateTime );
    });
    this.subscription = this.landingFactory.updateTime.subscribe( (updateTime) => {
      this.updateTime = updateTime;
      this.cd.markForCheck();
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
export default ( footerComponent);
