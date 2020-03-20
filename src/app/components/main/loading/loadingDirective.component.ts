import { Component } from "@angular/core";

@Component({
  selector: 'LoadingDirective',
  template: `<div id="loader-wrapper">
                <div id="loader"></div>
                <div class="load-text" style="text-align:center; font-family:Roboto;">Loading...</div>
                <div class="loader-section section-left"></div>
                <div class="loader-section section-right"></div>
              </div>
            `
})
export class LoadingDirective {
  constructor() {
  }
}
export default ( LoadingDirective );