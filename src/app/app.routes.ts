import {Routes} from "@angular/router";

import {welcomeComponent} from "./components/landing/welcome/welcome.component";
import {aboutComponent} from './components/landing/about/about.component';
import {tutorialComponent} from './components/landing/tutorial/tutorial.component';
import {glossaryComponent} from './components/landing/glossary/glossary.component';
import {contactUsComponent} from './components/landing/contactUs/contactUs.component';
import {mapComponent} from "./components/main/map/map.component";
import {visualizationComponent} from "./components/main/visualization/visualization.component";
import {profileIndexComponent} from "./components/main/profile/index/profileIndex.component";
import {laboratoryComponent} from "./components/main/profile/laboratory/laboratory.component";
import {pharmacyComponent} from "./components/main/profile/pharmacy/pharmacy.component";
import {populationCharacteristicsComponent} from "./components/main/profile/populationCharacteristics/populationCharacteristics.component";
import {errorComponent} from "./components/404/error.component";
import { from } from "rxjs/internal/observable/from";

export const routes: Routes = [
  {path: '', component: welcomeComponent},
  {path: 'about', component: aboutComponent},
  {path: 'tutorial', component: tutorialComponent},
  {path: 'glossary', component: glossaryComponent},
  {path: 'contactUs', component: contactUsComponent},
  {path: 'map', component: mapComponent},
  {path: 'viz', component: visualizationComponent},
  {path: 'profile/:crs_id', component: profileIndexComponent},
  {path: 'pharms/:crs_id', component: pharmacyComponent},
  {path: 'labs/:crs_id', component: laboratoryComponent},
  {path: 'epi/:crs_id', component: populationCharacteristicsComponent},
  { path: '**', component: errorComponent }
];
export default routes;
