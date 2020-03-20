import { Component } from "@angular/core";

@Component({
  selector: 'phar1',
  template: `<div class="pharm-popups" fxLayoutAlign="end"><h2 fxFlex="90" matDialogTitle>Pharmacy Information</h2>
            <button  class="md-icon-button close_button" aria-label="cancel" mat-raised-button [matDialogClose]="true">
              <i class="fa fa-close"></i>
            </button></div>
						<mat-dialog-content>
              <div>
                <p><b>Pharmacy Infrastructure</b></p>
                <p class="definition">This section includes general details pertaining to the pharmacy(ies) at this site.</p>
              </div>
              <mat-divider></mat-divider>
              <div>
                <p><b>ID#</b></p>
                <p class="definition">The number assigned to each DAIDS-approved pharmacy to facilitate electronic transfer of information.</p>
              </div>
              <mat-divider></mat-divider>
              <div>
                <p><b>Pharmacy Related Sites</b></p>
                <p class="definition">Pharmacies that serve multiple DAIDS clinical research sites.</p>
              </div>
              <mat-divider></mat-divider>
              <div>
                <p><b>Pharmacy Network Affiliation</b></p>
                <p class="definition">The Network(s) for which the selected pharmacy has provided services.</p>
              </div>
						</mat-dialog-content>`
})

export class phar1Component {}
export default ( phar1Component );
