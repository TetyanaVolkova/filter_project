
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'excelDialog2',
    template: `<div class="exceldb export_excel" aria-label="Excel">
                    <form>
                        <mat-toolbar>
                            <div class="md-toolbar-tools">
                            <h2>Export Data to Excel</h2>
                            </div>
                        </mat-toolbar>
                        <mat-dialog-content>
                            <div>
                            <p class="definition">Would you like to download the Favorite Results data? The file size is <span style="display: inline-table">{{fSize}}.</span></p>
                            </div>
                            <div layout="row" flLayoutAlign="end center" flFlex>
                            <button class="md-raised" (click)="onClick()">
                                Cancel
                                </button>
                            <button class="md-raised" [mat-dialog-close]='true'>
                                OK
                            </button>
                            </div>
                        </mat-dialog-content>
                    </form>
                </div>`
  })
  export default class excelDialog2 implements OnInit {
    private fSize;
    constructor(
      public dialogRef: MatDialogRef<excelDialog2>,
      @Inject( MAT_DIALOG_DATA ) public passedData: any) {
      }
    ngOnInit() {
    this.fSize = this.passedData.fileSize;
    }
    onClick(): void {
      this.dialogRef.close();
    }
  }