import { Component } from "@angular/core";

@Component({
  selector: 'labDialog1',
  template: `<div class="lab-popups" fxLayoutAlign="end"><h2 fxFlex="90" matDialogTitle>Laboratory Information</h2>
            <button  class="md-icon-button close_button" aria-label="cancel" mat-raised-button [matDialogClose]="true">
              <i class="fa fa-close"></i>
            </button></div>
						<mat-dialog-content>
              <div>
                <p><b>Laboratory Infrastructure</b></p>
                <p class="definition">This section includes general details pertaining to the laboratory(ies) at this site.</p>
              </div>
              <mat-divider></mat-divider>
              <div>
                <p><b>LDMS#</b></p>
                <p class="definition">The number assigned to each DAIDS-approved laboratory to facilitate electronic transfer of specimen information.</p>
              </div>
              <mat-divider></mat-divider>
              <div>
                <p><b>Laboratory Related Sites</b></p>
                <p class="definition">Laboratories that serve multiple DAIDS clinical research sites.</p>
              </div>
              <mat-divider></mat-divider>
              <div>
                <p><b>Laboratory Network Affiliation</b></p>
                <p class="definition">The Network for which the selected laboratory has performed protocol-specific tests.</p>
              </div>
              <mat-divider></mat-divider>
              <div>
                <p><b>Accreditation</b></p>
                <p class="definition">The organization providing the accreditation for the selected laboratory if applicable.</p>
              </div>
              <mat-divider></mat-divider>
              <div>
                <p><b>Quality Assurance</b></p>
                <p class="definition">Services that the selected laboratory receives in order to maintain quality assurance monitored by DAIDS and/or its contractors.</p>
              </div>
						</mat-dialog-content>`
})

export class labDialog1Component {}
export default ( labDialog1Component );
