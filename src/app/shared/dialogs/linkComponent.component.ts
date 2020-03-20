import { Component, Input } from "@angular/core";
import { MatDialog } from '@angular/material';
import leavingdbComponent from './leavingDialog.component';

@Component({
  selector: 'linkComponent',
  template: '<button tabindex="0" class="directiveid md-whiteframe-7dp" (click)="openDialog()"><img [src]="imgurl" *ngIf="imgurl !== undefined" alt="alt"></button>'
})

export class linkComponent {

  @Input() private type;
  @Input() private directiveid;
  @Input() private geturl;
  @Input() private imgurl;
  @Input() private text;
  @Input() private whiteframe;
  @Input() private alt;
  public dialogRef;
  
  constructor (public MatDialog: MatDialog) {
  }
  openDialog() {
    this.dialogRef = this.MatDialog.open(leavingdbComponent, {
      disableClose: false,
      data: {
        type: this.type,
        geturl: this.geturl || ''
      }
    });
      
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if ( result === true ) {
        this.dialogRef.close(leavingdbComponent);
      }
    });
  };
}

export default ( linkComponent );


