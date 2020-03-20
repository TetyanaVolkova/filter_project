
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import ProfileFactory from "../profileFactory.resource";

import CrsFactory from "../../search/crsFactory.resource";

@Component({
  selector: 'populationCharacteristicsComponent',
  template: require ('./populationCharacteristics.html')
})

export class populationCharacteristicsComponent implements OnInit, OnDestroy {
  private crs;
  private subs;

  private Gender;
  private Age;
  private Race;
  private Ethnicity;
  private Risk_Factor;
  private Disease_Condition;
  private Condition_Cont;
  private Disease_Cont_Condition;
  private reported;
  private element;
  private exists;
  private crsGender;
  private crsAge;
  private crsRace;
  private crsEthnicity;
  private crsRisk_Factor;
  private crsDisease_Condition;
  private checkItem;

  constructor ( private CrsFactory: CrsFactory,
                private ProfileFactory: ProfileFactory,
                private cd: ChangeDetectorRef ) {
                  this.ProfileFactory = ProfileFactory;
                  this.Gender = ['Female', 'Male', 'Transgender'];
                  this.Age = [
                    'Infant',
                    'Children',
                    'Adolescents (13-17)',
                    'Young Adult (18-24)',
                    'Adult'
                  ];
                  this.Race = [
                    'Black or African American',
                    'White',
                    'Asian',
                    'American Indian or Alaska Native',
                    'Native Hawaiian or Other Pacific Islander',
                    'Other'
                  ].sort();
                  this.Ethnicity = ['Hispanic or Latino', 'Not Hispanic or Latino'];
                  this.Risk_Factor = [
                    'MTCT',
                    'MSM',
                    'Bisexual',
                    'Heterosexual',
                    'Sex Work',
                    'Transactional Sex',
                    'People Who Inject Drugs',
                    'Sero-Discordant Couple',
                    'Breastfeeding/Lactating',
                    'Substance Abuse'
                  ];
                  this.Disease_Condition = [
                    'Pregnant',
                    'Post Menopausal',
                    'HIV Exposed',
                    'HIV Uninfected',
                    'Clade A',
                    'Clade B',
                    'Clade C',
                    'Clade D',
                    'Clade E',
                    'HIV Infected',
                    'Acute HIV Infection',
                    'Chronic HIV Infection',
                    'Treatment Naive',
                    'Infectious Comorbidities',
                    'Non-Infectious Comorbidities',
                    'Malignancies'
                  ];
                  this.Condition_Cont = [
                    'TB',
                    'MDR TB',
                    'XDR TB',
                    'TB Coinfection With HIV',
                    'Hepatitis B',
                    'Hepatitis B Coinfection With HIV',
                    'Hepatitis C',
                    'Hepatitis C Coinfection With HIV'
                  ];
                  this.Disease_Cont_Condition = [
                    'HIV Uninfected',
                    'HIV Exposed Infants',
                    'HIV Infected',
                    'Clade A',
                    'Clade B',
                    'Clade C',
                    'Clade D',
                    'Clade E',
                    'Acute HIV Infection',
                    'Chronic HIV Infection',
                    'Treatment Naive',
                    'HIV Related Malignancies',
                    'HIV/TB Co-infection',
                    'TB',
                    'MDR TB',
                    'XDR TB',
                    'HIV/HBV Co-infection',
                    'HBV',
                    'HIV/HCV Co-infection',
                    'HCV',
                    'Infectious Comorbidities',
                    'Non-Infectious Comorbidities',
                    'Pregnant',
                    'Post Menopausal'
                  ];
                  this.reported = [true, true, true];
                  this.element = [true, false, true, false, true, false];
  }
  ngOnInit() {
    this.subs = this.CrsFactory.myCrs.subscribe( (crs) => {
      this.crs = crs;
      this.cd.markForCheck();
      this.getPopulation( this.crs );
    });
    
    
    // function used to check, if item in the list, it will be checked.
    this.checkItem = function( item, list ) {
      var checked = false;
      if ( list !== undefined && list !== null ) {
        for ( var i = 0; i < Object.keys( list ).length; i++ ) {
          if (
            item.replace( /\s/g, '' ).toLowerCase() ==
            list[i].replace( /\s/g, '' ).toLowerCase()
          ) {
            checked = true;
          }
        }
      }
      return checked;
    };
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  closeOnTab( event ) {
    if( event.key === "Enter" || event.key === " ") {
      // $mdMenu.hide();
      let moveToLink = Array.from(document.getElementsByClassName('crs-title'));
      (moveToLink[0] as HTMLElement).focus();
    }
    let menu_item =  Array.from(document.getElementsByClassName('mat-menu-item'));
    if(menu_item.length === 1 && event.key === "Tab") {
      event.preventDefault();
    }
    if( event.key === "Tab" && event.target === menu_item[menu_item.length - 1] && menu_item.length !== 1) {
      (menu_item[menu_item.length - 2] as HTMLElement).focus();
    }
    if(event.shiftKey &&  event.key === "Tab" && event.target === menu_item[0]) {
      (menu_item[1] as HTMLElement).focus();
    }
  }

  // Keyboard accessibility code to trap focus 
  // inside the menu window, and return focus back, when dropdown window is closed
  returnFocus( event, i, j) {
    this.ProfileFactory.moveFocusBack();
    if ( j === 0 || j === 1 ) {
      if ( this.reported[i] != this.element[j] ) {
        this.reported[i] = !this.reported[i];
      } else return;
    } else if ( j === 2 || j === 3 ) {
      if ( this.reported[i] != this.element[j] ) {
        this.reported[i] = !this.reported[i];
      } else return;
    } else if ( j === 4 || j === 5 ) {
      if ( this.reported[i] != this.element[j] ) {
        this.reported[i] = !this.reported[i];
      } else return;
    }
  }

  // function to create Population data: Gender, Age, Race Ethnicity, Risk Factor, Disease Condition, Disease Condition_Cont
  getPopulation( crs ) {
    var population = crs.crspopulations;

    if ( population !== undefined && population !== null ) {
      this.crsGender = [];

      for ( var i = 0; i < Object.keys( population ).length; i++ ) {
        if (
          crs.crspopulations[i].population_macro === 'Gender' &&
          this.crsGender.indexOf( crs.crspopulations[i].population_micro ) ===
            -1
        ) {
          this.crsGender.push( crs.crspopulations[i].population_micro );
        }
      }

      this.crsAge = [];

      for ( var i = 0; i < Object.keys( population ).length; i++ ) {
        if (
          crs.crspopulations[i].population_macro === 'Age' &&
          this.crsAge.indexOf( crs.crspopulations[i].population_micro ) === -1
        ) {
          this.crsAge.push( crs.crspopulations[i].population_micro );
        }
      }
      this.crsRace = [];
      this.crsEthnicity = [];

      for ( var i = 0; i < Object.keys( population ).length; i++ ) {
        if (
          crs.crspopulations[i].population_macro === 'Ethnicity' &&
          this.crsEthnicity.indexOf(
            crs.crspopulations[i].population_micro
          ) === -1
        ) {
          this.crsEthnicity.push( crs.crspopulations[i].population_micro );
        }
      }
      for ( var i = 0; i < Object.keys( population ).length; i++ ) {
        if (
          crs.crspopulations[i].population_macro === 'Race' &&
          this.crsRace.indexOf( crs.crspopulations[i].population_micro ) === -1
        ) {
          this.crsRace.push( crs.crspopulations[i].population_micro );
        }
      }

      this.crsRisk_Factor = [];

      for ( var i = 0; i < Object.keys( population ).length; i++ ) {
        if (
          crs.crspopulations[i].population_macro === 'Risk Factor' &&
          this.crsRisk_Factor.indexOf(
            crs.crspopulations[i].population_micro
          ) === -1
        ) {
          this.crsRisk_Factor.push( crs.crspopulations[i].population_micro );
        }
      }

      this.crsDisease_Condition = [];

      for ( var i = 0; i < Object.keys( population ).length; i++ ) {
        if (
          crs.crspopulations[i].population_macro === 'Disease/Condition' &&
          this.crsDisease_Condition.indexOf(
            crs.crspopulations[i].population_micro
          ) === -1
        ) {
          this.crsDisease_Condition.push(
            crs.crspopulations[i].population_micro
          );
        }
      }
    }
  }
}
export default ( populationCharacteristicsComponent );
