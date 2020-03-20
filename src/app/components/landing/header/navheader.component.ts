import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
  selector: 'navheaderComponent',
  template: `
  <div *ngIf="currentState !== '/map'" id="iconcol" class="md-toolbar" fxLayout="row" fxLayoutAlign="space-between start">
    <div class="landing md-toolbar-tools" fxLayout="row" fxLayoutAlign="start center">
      <!-- NIH logo and CRS Explorer name-->
      <div class="splash-title">
        <a routerLink='/' alt="Home Page">
            <img id="splash-title" src="images/nihbanner3.svg" class="sc-title" alt="NIH, National Institute of Allergy and Infectious Diseases, CRS Explorer">
        </a>
      </div>
    </div> 
    <div id="navigation" fxLayout="row">
      <div fxLayout="row">
        <button matTooltip="Explore" mat-icon-button id="explorebtn" routerLink='/map' aria-label="Explore the CRS Explorer">
          <mat-icon svgIcon="EXPLORE_w" alt="Explore the CRS Explorer"></mat-icon>
        </button>
      </div>

      <div id="Labout" fxLayout="row">
        <button matTooltip="About" mat-icon-button routerLink='/about' *ngIf="currentState != '/about'" aria-label="About the CRS Explorer">
          <mat-icon svgIcon="ABOUT_w" alt="About the CRS Explorer"></mat-icon>
        </button>

        <button matTooltip="About" mat-icon-button class="active_landing" *ngIf="currentState === '/about'" aria-label="About the CRS Explorer">
          <mat-icon svgIcon="ABOUT_sel" alt="About the CRS Explorer"></mat-icon>
        </button>
      </div>
      <div id="Ltut" fxLayout="row">
        <button matTooltip="Tutorial" mat-icon-button routerLink='/tutorial' *ngIf="currentState != '/tutorial'" aria-label="Tutorial">
          <mat-icon svgIcon="TUTORIAL_w" alt="Tutorial"></mat-icon>
        </button>
        <button matTooltip="Tutorial" mat-icon-button class="active_landing" *ngIf="currentState === '/tutorial'" aria-label="Tutorial">
          <mat-icon svgIcon="TUTORIAL_sel" alt="Tutorial"></mat-icon>
        </button>
      </div>

      <div id="Lgls" fxLayout="row">
        <button matTooltip="Glossary" mat-icon-button routerLink='/glossary' *ngIf="currentState != '/glossary'" aria-label="Glossary">
          <mat-icon svgIcon="GLOSSARY_w" alt="Glossary"></mat-icon>
        </button>

        <button matTooltip="Glossary" mat-icon-button class="active_landing" *ngIf="currentState === '/glossary'" aria-label="Glossary">
          <mat-icon svgIcon="GLOSSARY_sel" alt="Glossary"></mat-icon>
        </button>
      </div>

      <div id="LcontactUs" fxLayout="row">
        <button matTooltip="Contact Us" mat-icon-button routerLink='/contactUs' *ngIf="currentState != '/contactUs'" aria-label="Contact Us">
          <mat-icon svgIcon="CONTACTUS_w" alt="Contact Us"></mat-icon>
        </button>
        <button matTooltip="Contact Us" mat-icon-button class="active_landing" *ngIf="currentState === '/contactUs'" aria-label="Contact Us">
          <mat-icon svgIcon="CONTACTUS_sel" alt="Contact Us"></mat-icon>
        </button>
      </div>
    </div>
  </div>
  <div class="horizontal_line"></div>
  `
})
  export class navheaderComponent implements OnInit {
    private currentState: string;
    private subscription;
    constructor(private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                private router: Router
    ){
      this.matIconRegistry.addSvgIcon(
        "EXPLORE_w",
        this.domSanitizer.bypassSecurityTrustResourceUrl("images/landing/alt/EXPLORE_w.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "ABOUT_w",
        this.domSanitizer.bypassSecurityTrustResourceUrl("images/landing/alt/ABOUT_w.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "ABOUT_sel",
        this.domSanitizer.bypassSecurityTrustResourceUrl("images/landing/alt/ABOUT_sel.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "TUTORIAL_w",
        this.domSanitizer.bypassSecurityTrustResourceUrl("images/landing/alt/TUTORIAL_w.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "TUTORIAL_sel",
        this.domSanitizer.bypassSecurityTrustResourceUrl("images/landing/alt/TUTORIAL_sel.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "GLOSSARY_w",
        this.domSanitizer.bypassSecurityTrustResourceUrl("images/landing/alt/GLOSSARY_w.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "GLOSSARY_sel",
        this.domSanitizer.bypassSecurityTrustResourceUrl("images/landing/alt/GLOSSARY_sel.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "CONTACTUS_w",
        this.domSanitizer.bypassSecurityTrustResourceUrl("images/landing/alt/CONTACTUS_w.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "CONTACTUS_sel",
        this.domSanitizer.bypassSecurityTrustResourceUrl("images/landing/alt/CONTACTUS_sel.svg")
      );
    }
    ngOnInit() {
      this.subscription = this.router.events
      .subscribe((url:any) => 
        { 
          if ( !this.router.url.includes("/glossary")) {
            this.currentState = this.router.url
          } else {
            this.currentState = "/glossary";
          }
        }
      );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  }
export default ( navheaderComponent );
