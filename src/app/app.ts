'use strict';

// Import all Sass files
// import 'hammerjs';
import '../styles/main.scss';

// Import third-party library dependencies
import { AgmCoreModule } from '@agm/core';

import './polyfills.ts';

import { NgModule, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Import services
import ContinentFactory from './components/main/search/continentFactory.resource';
import CrsFactory from './components/main/search/crsFactory.resource';
import MapFactory from './components/main/map/mapFactory.service';
import ProfileFactory from './components/main/profile/profileFactory.resource';
import landingFactory from './components/landing/landing.resource';

// Import Components


import BarchartDirective from './components/main/visualization/barchartDirective.component';
import LoadingDirective from './components/main/loading/loadingDirective.component';
import DialogContent from  './shared/dialogs/dialogContent.component';
import LinkDirective from './shared/dialogs/linkDirective.component';
import linkComponent from './shared/dialogs/linkComponent.component';
import welcomeComponent from './components/landing/welcome/welcome.component';
import searchParentComponent from './components/main/search/searchParent.component';
import leftSidebarComponent from './components/main/leftSidebar/leftSidebar.component';
import rightSidebarComponent from './components/main/rightSidebar/rightSidebar.component';
import headerComponent from './components/main/header/header.component';
import profileIndexComponent from './components/main/profile/index/profileIndex.component';
import laboratoryComponent from './components/main/profile/laboratory/laboratory.component';
import pharmacyComponent from './components/main/profile/pharmacy/pharmacy.component';
import populationCharacteristicsComponent from './components/main/profile/populationCharacteristics/populationCharacteristics.component';
import visualizationComponent from './components/main/visualization/visualization.component';
import mapComponent from './components/main/map/map.component';
import profileLeftComponent  from './components/main/leftSidebar/profileLeft.component';
import footerComponent from './components/footer/footer.component';
import glossaryComponent from './components/landing/glossary/glossary.component';
import tutorialComponent from './components/landing/tutorial/tutorial.component';
import navheaderComponent from './components/landing/header/navheader.component';
import profile1Component from './shared/dialogs/profileDialog1.component';
import profileDialog2Component from './shared/dialogs/profileDialog2.component';
import labDialog1Component from './shared/dialogs/labDialog1.component';
import labDialog2Component from './shared/dialogs/labDialog2.component';
import phar1Component from './shared/dialogs/pharmacyDialog1.component';
import pharmacyDialog2Component from './shared/dialogs/pharmacyDialog2.component';
import aboutComponent from './components/landing/about/about.component';
import contactUsComponent from './components/landing/contactUs/contactUs.component';
import errorComponent from './components/404/error.component';


// Dialog templates

import removeNetworkDialog from "./shared/dialogs/removeNetwork.component";
import removeNIAIDResDialog from "./shared/dialogs/removeNIAIDResDialog.component";
import leavingdbComponent from './shared/dialogs/leavingDialog.component';
import impaactDialog from "./shared/dialogs/impaactDialog.component";
import excelDialog1 from "./shared/dialogs/excelDialog1.component";
import excelDialog2 from "./shared/dialogs/excelDialog2.component";
import excelDialog3 from "./shared/dialogs/excelDialog3.component";
import excelDialog4 from "./shared/dialogs/excelDialog4.component";
import excelDialog5 from "./shared/dialogs/excelDialog5.component";

// Import filters
import blacklist from './shared/filters/blacklist';

// Import Pipes

import locationFilter from './shared/filters/location.pipe';
import blacklistPipe from './shared/filters/blacklist.pipe';
import unfundedPipe from './shared/filters/unfunded.pipe';
import fundedPipe from './shared/filters/funded.pipe';
import filterPipe from './shared/filters/filterPipe.pipe';

// Import routes
import {routes} from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: process.env.MAP_API_KEY
    })
  ],
  providers: [
    HttpClientModule,
    ContinentFactory,
    CrsFactory,
    MapFactory,
    ProfileFactory,
    landingFactory
  ],
  declarations: [
    navheaderComponent,
    tutorialComponent,
    welcomeComponent,
    glossaryComponent,
    footerComponent,
    profileLeftComponent,
    LinkDirective,
    linkComponent,
    DialogContent,
    leavingdbComponent,
    removeNetworkDialog,
    removeNIAIDResDialog,
    impaactDialog,
    excelDialog1,
    excelDialog2,
    excelDialog3,
    excelDialog4,
    excelDialog5,
    profile1Component,
    profileDialog2Component,
    labDialog1Component,
    labDialog2Component,
    phar1Component,
    pharmacyDialog2Component,
    LoadingDirective,
    aboutComponent,
    contactUsComponent,
    pharmacyComponent,
    blacklistPipe,
    filterPipe,
    locationFilter,
    unfundedPipe,
    fundedPipe,
    laboratoryComponent,
    profileIndexComponent,
    populationCharacteristicsComponent,
    BarchartDirective,
    visualizationComponent,
    rightSidebarComponent,
    headerComponent,
    leftSidebarComponent,
    mapComponent,
    searchParentComponent,
    errorComponent
  ],
  entryComponents: [
    LinkDirective,
    linkComponent,
    DialogContent,
    leavingdbComponent,
    removeNetworkDialog,
    removeNIAIDResDialog,
    impaactDialog,
    excelDialog1,
    excelDialog2,
    excelDialog3,
    excelDialog4,
    excelDialog5,
    profile1Component,
    profileDialog2Component,
    labDialog1Component,
    labDialog2Component,
    phar1Component,
    pharmacyDialog2Component
  ],
  bootstrap: [searchParentComponent]
})

export class crsApp {
}
enableProdMode();
platformBrowserDynamic().bootstrapModule(crsApp);