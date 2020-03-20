import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
    selector: 'dialogContent',
    template: `<profile1 *ngIf="type === 'profile1'"></profile1>
                <profileDialog2 *ngIf="type === 'profile2'"></profileDialog2>
                <labDialog1 *ngIf="type === 'lab1'"></labDialog1>
                <labDialog2 *ngIf="type === 'lab2'"></labDialog2>
                <phar1 *ngIf="type === 'phar1'"></phar1>
                <pharmacyDialog2 *ngIf="type === 'phar2'"></pharmacyDialog2>
    `
  })
  
  export class DialogContent {
        private type;
        public geturl;
    constructor( public dialogRef: MatDialogRef<DialogContent>,
        @Inject( MAT_DIALOG_DATA ) public passedData: any) {
        this.type = this.passedData.type;
        this.geturl = this.passedData.geturl;
    }
  }

  export default ( DialogContent );