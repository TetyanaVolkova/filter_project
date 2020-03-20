
import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'impaactDialog',
    template: `<style>
                    md-dialog-content p{
                    padding-left: 2.5%;
                    }
                </style>
                
                <div aria-label="Regulatory FAQ" id="impaact_db">
                    <form>
                        <mat-toolbar>
                            <div class="md-toolbar-tools" *ngIf="FDialog">
                                <h2>DISCLAIMER</h2>
                                <span flex></span>
                            </div>
                            <div class="md-toolbar-tools popups" *ngIf="!FDialog">
                                <h2>You are about to leave the CRS Explorer</h2>
                                <span flex></span>
                                <button
                                class="md-icon-button"
                                aria-label="cancel"
                                (click)="confirm()">
                                <i class="fa fa-close"></i>
                                </button>
                            </div>
                        </mat-toolbar>
                        <mat-dialog-content style="max-width:800px;max-height:810px; ">
                            <div *ngIf="FDialog">
                                <p>Current IMPAACT search results are limited to NIAID funded sites. For a complete listing of all IMPAACT sites click
                                <a href="" (click)="FDialog = !FDialog">here</a>.</p>
                
                                <mat-checkbox aria-label="Disabled checkbox" ng-model="checked" style="float:left">
                                    Do not show this message again.
                                </mat-checkbox>
                                <button  class="md-raised" (click)="confirm()" style="float:right">
                                    Confirm
                                </button>
                            </div>
                            <div *ngIf="!FDialog">
                                <p>This external link provides additional information that is consistent with the intended purpose of this site. NIAID cannot attest to the accuracy of a non-federal site.</p>
                                <p>Linking to a non-federal site does not constitute an endorsement by NIAID or any of its employees of the sponsors or the information and products presented on the site. You will be subject to the destination site&rsquo;s privacy policy when you follow the link. </p>
                                <div layout="row" layout-align="end center" flex>
                                <button class="md-raised" (click)="FDialog = !FDialog">
                                    Cancel
                                    </button>
                                <button class="md-raised" (click)="link()">
                                    Go
                                </button>
                                </div>
                            </div>
                        </mat-dialog-content>
                    </form>
                </div>`
  })
  export default class impaactDialog {
    private FDialog = true;
  
    constructor(
      public dialogRef: MatDialogRef<impaactDialog>) {}
  
    confirm(): void {
      this.dialogRef.close();
    }
    link(): void {
        window.open("https://impaactnetwork.org/studies/sites.asp", "_blank");
    }
  
  }