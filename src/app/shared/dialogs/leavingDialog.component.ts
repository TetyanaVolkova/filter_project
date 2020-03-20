import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'leavingdb',
  template: `<div class="dialog_header" fxLayoutAlign="end"><h2 fxFlex="90" matDialogTitle>You are about to leave the CRS Explorer</h2>
      <button  class="md-icon-button close_button" aria-label="cancel" mat-raised-button [matDialogClose]="true">
        <i class="fa fa-close"></i>
      </button></div>
      <mat-dialog-content>
        <div>
          <p>This external link provides additional information that is consistent with the intended purpose of this site. NIAID cannot attest to the accuracy of a non-federal site.</p>
          <p>
            Linking to a non-federal site does not constitute an endorsement by NIAID or any of its employees of the sponsors or the information and products presented on the site. You will be subject to the destination site&rsquo;s privacy policy when you follow the link. </p>
        </div>
        <mat-dialog-actions id="leaving_dialog_buttons">
          <div flLayout="row" fxLayoutAlign="end center" fxFlex>
            <button mat-raised-button [matDialogClose]="true">
              Cancel
            </button>
            <button (click)="link()" mat-raised-button [matDialogClose]="true">
              Go
            </button>
          </div>
        </mat-dialog-actions>
      </mat-dialog-content>`
})

export class leavingdbComponent {
  private type;
  public geturl;
  constructor ( public dialogRef: MatDialogRef<leavingdbComponent>,
                @Inject( MAT_DIALOG_DATA ) public passedData: any) {
    this.type = this.passedData.type;
    this.geturl = this.passedData.geturl;
  }
  link() {
    window.open( this.geturl, "_blank" );
  }
}
export default ( leavingdbComponent );