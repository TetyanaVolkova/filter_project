import { Component } from "@angular/core";

@Component({
  selector: 'profile1',
  template: `<div class="profile-popups" fxLayoutAlign="end"><h2 fxFlex="90" matDialogTitle>Clinical Research Site (CRS) Information</h2>
      <button  class="md-icon-button close_button" aria-label="cancel" mat-raised-button [matDialogClose]="true">
        <i class="fa fa-close"></i>
      </button></div>
      <mat-dialog-content>
      <div>
        <p><b>CRSs Associated With CTU</b></p>
        <p class="definition">This is the list of all sites that are a part of the same CTU.  This includes Protocol Specific and NIAID Reserve sites, if applicable.</p>
      </div>
      </mat-dialog-content>`
})

export class profile1Component {}
export default ( profile1Component );

