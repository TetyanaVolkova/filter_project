import { Component, Inject, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'tutorialComponent',
    template: `<div class="landing_view" fxLayout="row" fxFlex="75">
                <div fxLayout="column" fxFlex id="panel_tut">
                  <div id="panel_about_text">
                    <h1 class="panel-name">TUTORIAL</h1>
                    <h2>Informational video tutorial of the CRS Explorer</h2>
                  </div>
                  <div id="video_wrapper">
                    <video id="tutorial_video" title ="DIADS Explorer tutorial" controls>
                      <source src="videos/tutorial.mp4" type="video/mp4">
                        <track kind="captions" src="videos/TUTORIAL.vtt">
                          <track src="videos/TUTORIAL.vtt" kind="descriptions" srclang="en" label="English">		
                      Your browser does not support the video tag.
                    </video>
                    <div id="pdfHolder">				
                      <a id="pdfLink" target = '_blank' href="/UserGuide.pdf#zoom=100">
                        CRS Explorer Application User Guide 
                      </a>
                      <mat-icon id="pdficon" svgIcon="pdfIcon" alt=""></mat-icon> ({{pdfSize}})
                    </div>
                  </div>
                </div>
              </div>`,
  
})
export class tutorialComponent implements OnInit {
  private pdfSize;
  constructor ( @Inject(HttpClient) private http: HttpClient,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                private cd: ChangeDetectorRef ) {
    this.matIconRegistry.addSvgIcon(
      "pdfIcon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/icon-pdf.svg")
    );
    let that = this;
    let promise = this.http.get('UserGuide.pdf', { responseType: 'blob' });
    promise.subscribe (
      response => {
      that.pdfSize = response.size;
      if (( that.pdfSize >> 30 ) & 0x3ff ) {
        that.pdfSize = Math.round( that.pdfSize >>> 30 ) + ' GB';
      }
      else if (( that.pdfSize >> 20 ) & 0x3ff ) {
        that.pdfSize = Math.round( that.pdfSize >>> 20 ) + 2 + ' MB';
      }
      else if (( that.pdfSize >> 10 ) & 0x3ff ) {
        that.pdfSize = Math.round( this.pdfSize >>> 10 ) + ' KB';
      }
      else if (( that.pdfSize >> 1 ) & 0x3ff ) {
        that.pdfSize = ( that.pdfSize >>> 1 ) + 'Bytes';
      }
      this.cd.markForCheck();
    });
  }
  ngOnInit() {
  }
}
export default ( tutorialComponent );