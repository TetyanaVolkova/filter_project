import { Component, Input } from "@angular/core";
import { MatDialog } from '@angular/material';
import DialogContent from './dialogContent.component';

@Component({
  selector: 'linkDirective',
  template: '<button tabindex="0" class="directiveid" (click)="openDialog()"><img [src]="imgurl" *ngIf="imgurl !== undefined" alt="alt"></button>'
})

export class LinkDirective {

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
    this.dialogRef = this.MatDialog.open(DialogContent, {
      disableClose: false,
      data: {
        type: this.type,
        geturl: this.geturl || ''
      }
    });
      
    this.dialogRef.afterClosed().subscribe(result => {
      if ( result === true ) {
        this.dialogRef.close(DialogContent);
      }
    });
  };
}

export default ( LinkDirective );


