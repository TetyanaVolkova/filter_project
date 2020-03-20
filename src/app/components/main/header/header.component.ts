import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import XLSX from 'xlsx';
import { MatDialog } from "@angular/material";
import { saveAs } from 'file-saver';

import CrsFactory from "../search/crsFactory.resource";
import excelDialog1 from "../../../shared/dialogs/excelDialog1.component";
import excelDialog2 from "../../../shared/dialogs/excelDialog2.component";
import excelDialog3 from "../../../shared/dialogs/excelDialog3.component";
import excelDialog4 from "../../../shared/dialogs/excelDialog4.component";
import excelDialog5 from "../../../shared/dialogs/excelDialog5.component";

@Component({
  selector: 'headerComponent',
  template: require ('./header.html')
})

export class headerComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;

  private currentState;
  private lockFav;
  private lockViz;
  private subscription;
  private sub;
  private subs;
  private subscr;
  private subLockLeft;
  private subscrip;
  private showFavorite = false;
  private fileSize;
  private clickedSite;
  private homeState;
  private vizState;
  private crss;
  private lockRight;
  private lockLeft;
  private favoriteCrs;
  
constructor ( private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private router: Router,
              private CrsFactory: CrsFactory,
              private dialog: MatDialog,
              private cd: ChangeDetectorRef) {

    this.matIconRegistry.addSvgIcon(
      "Export",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/Export.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Graph",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/Graph.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "world2",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/world2.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Star",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/star.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "magnify_glass",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/magnify_glass.svg")
    );
    this.CrsFactory = CrsFactory;
  }
  ngOnInit() {
    this.subLockLeft = this.CrsFactory.lockLeft.subscribe( (lockLeft) => {
      this.lockLeft = lockLeft;
    })
    this.CrsFactory.showFavorite.next(this.showFavorite);
    // this.CrsFactory.lockRight.next(this.lockRight);
    this.subscrip = this.CrsFactory.lockRight.subscribe( (lockRight) => {
      this.lockRight = lockRight;
    });
    this.subscr = this.CrsFactory.showFavorite.subscribe( (showFavorite) => {
      this.showFavorite = showFavorite;
      if ( this.showFavorite === true ) {
        this.lockViz = true;
      } else {
        this.lockViz = false;
      }
    });
    this.subs = this.CrsFactory.favoriteCrs.subscribe( (favoriteCrs ) => {
      this.favoriteCrs = favoriteCrs;
    });
    this.sub = this.CrsFactory.myCrss.subscribe( (crss) => {
      this.crss = crss;
      this.cd.markForCheck();
    })
    this.subscription = this.router.events.subscribe((url:any) => {
      this.currentState = this.router.url;
      this.homeState = this.currentState === '/map';
      this.vizState = this.currentState === '/viz';
      if ( this.vizState ) {
        this.lockFav = true;
      } else {
        this.lockFav = false;
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subs.unsubscribe();
    this.subscription.unsubscribe();
    this.subscr.unsubscribe();
    this.subscrip.unsubscribe();
  }
    // function for skip navigation
    goToContent() {
      (document.getElementsByClassName( "Clinical" )[0] as HTMLElement).focus();
      
  }
    /* Function Left Toggle */
    leftToggle() {
      this.lockLeft = !this.lockLeft;
      this.CrsFactory.lockLeft.next(this.lockLeft);
      var that = this;
    };
    /* Function Click Site */
    click_site() {
      if ( !this.showFavorite || !this.lockRight ) {
        this.lockRight = !this.lockRight;
        this.CrsFactory.lockRight.next(this.lockRight);
      }
      this.showFavorite = false;
      this.CrsFactory.showFavorite.next(this.showFavorite);
    };

    /* Function Click Favorite */
    click_favorite() {
      if ( this.lockRight ) {
        this.lockRight = !this.lockRight;
        this.CrsFactory.lockRight.next(this.lockRight);
      }
      this.showFavorite = !this.showFavorite;
      // this.clickedSite = null;
      this.CrsFactory.showFavorite.next(this.showFavorite);
    };

    /* Function to show confirm dialog */
    showConfirm() {
      if ( !this.showFavorite && !this.lockRight ) {
        const dialogRef = this.dialog.open(excelDialog4, {
          height: '0'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
      if ( !this.lockRight ) {
        if ( this.showFavorite ) {
          var tag = 'Favorite Results';
          var id = 2;
          if ( this.favoriteCrs.length === 0 ) {

            const dialogRef = this.dialog.open(excelDialog3, {
              height: '0'
            });
        
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
            });
            return;
          } else {
            const dialogRef = this.dialog.open(excelDialog2, {
              height: '0',
              data: {
                fileSize: this.getFileSize()
              }
            });
        
            dialogRef.afterClosed().subscribe(result => {
              this.exportData(result);
            });
          }
        }
      } else {
        var tag = 'Search Results';
        var id = 1;
        if ( this.crss.length === 0 ) {

          const dialogRef = this.dialog.open(excelDialog5, {
            height: '0'
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        } else {
          const dialogRef = this.dialog.open(excelDialog1, {
            height: '0',
            data: {
              fileSize: this.getFileSize()
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.exportData(result);
          });
        }
      }
    };

  exportData( result ) {
    function sortgroup(a, b) {
      // based on : CRS_Continent, CRS_Country, CRS_City, Program_Officer, CRS_Leader
      if (a.continent < b.continent) return -1;
      if (a.continent > b.continent) return 1;
      if (a.country < b.country) return -1;
      if (a.country > b.country) return 1;
      if (a.city < b.city) return -1;
      if (a.city > b.city) return 1;
      if (a.ocsostaff < b.ocsostaff) return -1;
      if (a.ocsostaff > b.ocsostaff) return 1;
      if (a.crs_leader < b.crs_leader) return -1;
      if (a.crs_leader > b.crs_leader) return 1;
      return 0;
    }
    if ( result == undefined ) {
      return;
    } else {
      if( result === true ) {
          var data = this.favoriteCrs;
          var fileName = 'Favorite CRS';
      } else if ( result === false ) {
          var data = this.crss;
          var fileName = 'Site Information';
      }
      var inputValue = data.slice().sort( sortgroup ).map( function( m ) {
      return {
          'CRS Continent': m.continent,
          'CRS Country': m.country,
          'CRS City': m.city,
          'CRS Name': m.crs_name,
          'CRS Site Number': m.crs_id.toString().substring( 0, 3 ) === '999' ? 'n/a' : m.crs_id,
          'CRS Leader': m.crs_leader != null && m.crs_leader != '' ? m.crs_leader : 'n/a',
          'CTU PIs': m.pi != null ? ( m.pi.ctu_pis.trim() !== '' ? m.pi.ctu_pis : m.pi.ctu_contact_pi ) : 'n/a',
          'CTU Name': m.ctu_name != null && m.ctu_name != '' ? m.ctu_name : 'n/a',
          'HIV/AIDS Network Affiliation(s)': m.fundednetwork != null ? m.fundednetwork.network : 'n/a',
          'Protocol Specific': m.psprotocols != null && Object.keys( m.psprotocols ).length != 0 ? m.psprotocols.map( function( m ) { return m.srn_description_text }).join( '; ' ) : 'n/a',
          'NIAID Reserve	Program': m.unfundednetwork != null && m.unfundednetwork != '' ? m.unfundednetwork.network : 'n/a',
          'Officer': m.ocsostaff != null ? m.ocsostaff.po_name : 'n/a',
          }
      })

      /* generate a worksheet */
      var ws = XLSX.utils.json_to_sheet( inputValue );
      ws['!autofilter'] = { ref: "A1:L1" };
      ws['!margins'] = { bottom: 0.75, footer: 0.3, header: 0.3, left: 0.7, right: 0.7, top: 0.75 };
      ws['!cols'] = [{ width: 17.33 }, { width: 15.33 }, { width: 32.83 }, { width: 44.83 }, { width: 20 }, { width: 34.5 }, { width: 47 }, { width: 47 }, { width: 33.5 }, { width: 44.83 }, { width: 47.5 }, { width: 18.67 }];
      /* add to workbook */
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet( wb, ws, "Sheet 1" );
      var wbout = XLSX.write( wb, {bookType:'xlsx', type:'array'});
      saveAs( new Blob( [ wbout],{type:"application/octet-stream"}), fileName + ".xlsx" );
    }
  };
  // Getting a file size for Excel export. By Tetyana
  // Convert size in bytes to KB, MB, GB.
  getFileSize() {
    if ( this.lockRight && !this.showFavorite ) {
      var size = this.crss.length;
      if ( size > 0 ) {
        this.fileSize = 3450;
        for ( var i = 1; i < size + 1; i++ ) {
          this.fileSize += 650;
        }
      }
    } else {
      var size = this.favoriteCrs.length;
      if ( size > 0 ) {
        this.fileSize = 3450;
        for ( var i = 1; i < size + 1; i++ ) {
          this.fileSize += 650;
        }
      }
    }
    if (( this.fileSize >> 30 ) & 0x3ff ) {
      this.fileSize = Math.round( this.fileSize >>> 30 ) + ' GB';
    }
    else if (( this.fileSize >> 20 ) & 0x3ff ) {
      this.fileSize = Math.round( this.fileSize >>> 20 ) + ' MB';
    }
    else if (( this.fileSize >> 10 ) & 0x3ff ) {
      this.fileSize = Math.round( this.fileSize >>> 10 ) + ' KB';
    }
    else if (( this.fileSize >> 1 ) & 0x3ff ) {
      this.fileSize = ( this.fileSize >>> 1 ) + 'Bytes';
    }
    return this.fileSize;
  };
  
}
export default ( headerComponent );
