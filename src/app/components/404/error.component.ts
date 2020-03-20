import { Component } from "@angular/core";

@Component({
    selector: 'errorComponent',
    template: `<div id="container404">
                  <section id="image-container">
                    <img src="images/404message.svg" alt="404 Error">
                  </section>
                </div>`
})
export class errorComponent {
};

export default ( errorComponent );