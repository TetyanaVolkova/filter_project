
import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'removeNIAIDResDialog',
    template:   `<div class="exceldb" aria-label="Network Alert Dialog">
                    <form>
                        <mat-toolbar>
                            <div class="md-toolbar-tools">
                                <button
                                tabindex="-1"
                                class="md-icon-button alert"
                                aria-label="cancel"
                                (click)="onClick()">
                                    <i class="fa fa-exclamation-triangle" alt="Alert"></i>
                                </button>
                                <h2>ALERT</h2>
                            </div>

                        </mat-toolbar>
                        <mat-dialog-content>
                            <div>
                            <p class="definition">Remove NIAID Reserve filters in order to filter by Network sites.</p>
                            </div>
                            <div layout="row" fxLayoutAlign="end center" fxFlex>
                            <button class="md-raised" (click)="onClick()">
                                OK
                            </button>
                            </div>
                        </mat-dialog-content>
                    </form>
                </div>`
  })
  export default class removeNIAIDResDialog {
  
    constructor(
      public dialogRef: MatDialogRef<removeNIAIDResDialog>) {}
  
    onClick(): void {
      this.dialogRef.close();
    }
  
  }