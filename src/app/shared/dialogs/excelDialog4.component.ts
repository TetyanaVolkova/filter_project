
import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'excelDialog4',
    template: `<div class="exceldb" aria-label="Excel">
                <form>
                    <mat-toolbar>
                        <div class="md-toolbar-tools">
                            <button
                            class="alert md-icon-button"
                            aria-label="cancel"
                            (click)="onClick()">
                                <i class="fa fa-exclamation-triangle" alt="Alert"></i>
                            </button>
                            <h2>ALERT</h2>
                        </div>
                    </mat-toolbar>
                    <mat-dialog-content>
                        <div>
                        <p class="definition">Please click either Search Results or Favorite Results before exporting data.</p>
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
  export default class excelDialog4 {
  
    constructor(
      public dialogRef: MatDialogRef<excelDialog4>) {}
  
    onClick(): void {
      this.dialogRef.close();
    }
  
  }