import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, OnDestroy } from "@angular/core";
import CountUp from "countup.js";
import CrsFactory from "../search/crsFactory.resource";

@Component({
  selector: "visualizationComponent",
  template: require("./visualization.html")
  
})
export class visualizationComponent implements OnInit, OnChanges, OnDestroy {

  private crss;
  private filter;
  private selected;
  private BottomSelected;
  private viz_data;
  private statistic;
  private oldLength = 0;
  private oldStatistic;
  private sub;
  private subs;

  constructor( private CrsFactory: CrsFactory,
    private cd: ChangeDetectorRef) {
    this.BottomSelected = 0;
    this.selected = 0;
    this.oldStatistic = {};
  }

  ngOnChanges() {
      
    if (this.oldLength !== this.crss.length) {
      this.calculateStatistics( this.crss );
      this.viz_data = this.crss;
      this.oldLength = this.crss.length
    }
    if (this.oldStatistic !== this.statistic) {
      this.calculateStatistics( this.crss );
      this.AnimateStats();
      this.oldStatistic = this.statistic;
    }
  }
  
  ngOnInit() {
    this.subs = this.CrsFactory.filter.subscribe( (filter) => {
      this.filter = filter;
    })

    this.sub = this.CrsFactory.myCrss.subscribe( (crss) => {
      this.crss = crss;
      this.cd.markForCheck();
      this.viz_data = crss;
      this.calculateStatistics( this.crss );
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subs.unsubscribe();
  }
  handleSummaryResults(id) {
    this.viz_data = this.crss;
    this.selected = id;
    this.viz_data = this.calCulateGraphData(id);

    // // handle where to underline in tabs
    // let index = id + 1;
    // if (this.BottomSelected != index) {
    //   this.BottomSelected = index;
    // }  else if (this.BottomSelected == index) {
    //   //this.viz_data = this.crss; // Go to initial state
    //   this.BottomSelected = 0;
    // }
  }

  calculateStatistics(crssData: any[]) {
    // For situations when pick one catagory then change filters,
    // This will keep you stay in the catagory but change vizualization based on filter criteria.
    let data = {
      statistic: {
        total: 0,
        fully_funded: 0,
        not_funded: 0,
        unfunded: 0
      }
    };
    for (let index in crssData) {
      if (
        crssData[index].crs_type !== null &&
        crssData[index].crs_type !== ""
      ) {
        data.statistic.total++;

        if (crssData[index].crs_type == "unfunded") {
          data.statistic.not_funded++;
        }

        if (
          crssData[index].crs_type == "psonly" ||
          crssData[index].crs_type == "repreive"
        ) {
          data.statistic.unfunded++;
        }

        if (crssData[index].crs_type == "funded") {
          data.statistic.fully_funded++;
        }
      }
    }

    this.statistic = data.statistic;
    this.oldLength = crssData.length;
  }

  calCulateGraphData(id) {
    this.viz_data = this.crss;
      // filter data for each of three buttons
      if (id == "1") {
        // total sites
        return this.crss;
      }
  
      if (id == "2") {
        // full affiliation
        return this.crss.filter(function(crs) {
          return crs.crs_type == "funded";
        });
      }
  
      if (id == "3") {
        // protocol specific
        return this.crss.filter(function(crs) {
          return crs.crs_type == "psonly" || crs.crs_type == "repreive";
        });
      }
  
      if (id == "4") {
        // niaid reserve
        return this.crss.filter(function(crs) {
          return crs.crs_type == "unfunded";
        });
      }
  }

  AnimateStats() {
    let options = {
      useEasing: false,
      useGrouping: true
    };
    let numAnim1 = new CountUp(
      "statistic_total",
      this.oldStatistic.total,
      this.statistic.total,
      0.5,
      1,
      options
    );
    let numAnim2 = new CountUp(
      "statistic_fully_funded",
      this.oldStatistic.fully_funded,
      this.statistic.fully_funded,
      0.5,
      1,
      options
    );
    let numAnim3 = new CountUp(
      "statistic_unfunded",
      this.oldStatistic.unfunded,
      this.statistic.unfunded,
      0.5,
      1,
      options
    );
    let numAnim4 = new CountUp(
      "statistic_not_funded",
      this.oldStatistic.not_funded,
      this.statistic.not_funded,
      0.5,
      1,
      options
    );

    numAnim1.start();
    numAnim2.start();
    numAnim3.start();
    numAnim4.start();
    this.oldStatistic = this.statistic;
  }
}

export default visualizationComponent;

