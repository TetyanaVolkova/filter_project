
import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'excelDialog3',
    template: `<div
                class="exceldb nofavs"
                aria-label="Excel"
                role="alert"
                aria-live="assertive">
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
                        <p class="definition">No favorites have been added.{{lockRight}}</p>
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
  export default class excelDialog3 {
  
    constructor(
      public dialogRef: MatDialogRef<excelDialog3>) {}
  
    onClick(): void {
      this.dialogRef.close();
    }
  
  }