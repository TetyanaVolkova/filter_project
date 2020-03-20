import { Component } from "@angular/core";

@Component({
  selector: 'labDialog2',
  template: `<div class="lab-popups" fxLayoutAlign="end"><h2 fxFlex="90" matDialogTitle>Tests Performed</h2>
            <button  class="md-icon-button close_button" aria-label="cancel" mat-raised-button [matDialogClose]="true">
              <i class="fa fa-close"></i>
            </button></div>
						<mat-dialog-content>
              <div>
                <p>A limited listing of the capabilities of the selected laboratory.</p>
              </div>
						</mat-dialog-content>`
})

export class labDialog2Component {}
export default ( labDialog2Component );
