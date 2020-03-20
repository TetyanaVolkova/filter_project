
import { Component } from "@angular/core";

@Component({
  selector: 'pharmacyDialog2',
  template: `<div class="pharm-popups" fxLayoutAlign="end"><h2 fxFlex="90" matDialogTitle>Pharmacy Capability</h2>
          <button  class="md-icon-button close_button" aria-label="cancel" mat-raised-button [matDialogClose]="true">
            <i class="fa fa-close"></i>
          </button></div>
						<mat-dialog-content>
              <div>
                <p>A limited listing of the capabilities of the selected pharmacy.</p>
              </div>
						</mat-dialog-content>`
})

export class pharmacyDialog2Component {}
export default ( pharmacyDialog2Component );

