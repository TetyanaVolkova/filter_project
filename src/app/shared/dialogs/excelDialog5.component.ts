
import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'excelDialog5',
    template: `<div class="exceldb filterdb" aria-label="Filter">
                <form>
                    <mat-toolbar>
                        <div class="md-toolbar-tools">
                            <button
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
                        <p class="definition">The search results data is empty.</p>
                        </div>
                        <div layout="row" layout-align="end center" flex>
                        <button class="md-raised" (click)="onClick()">
                            OK
                        </button>
                        </div>

                    </mat-dialog-content>
                </form>
            </div>`
  })
  export default class excelDialog5 {
  
    constructor(
      public dialogRef: MatDialogRef<excelDialog5>) {}
  
    onClick(): void {
      this.dialogRef.close();
    }
  
  }