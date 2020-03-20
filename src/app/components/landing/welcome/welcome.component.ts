import { Component } from "@angular/core";

@Component({
    selector: 'welcomeComponent',
    template: ` <div id="splash_content" class="content slide-animation" fxFlex fxLayout="row" [ngStyle]="{'background-color': contentBack}">
                    <div fxLayout="column" fxFlex> 
                        <div fxLayout="row">
                            <div class="landing-title-container">
                                <h1 class="landing-title">CRS Explorer</h1>
                                <h2 class="landing-subtitle">HIV/AIDS Network Clinical Research Sites</h2>
                            </div>
                        </div>
                    </div>
                </div>`
})
export class welcomeComponent {
};

export default ( welcomeComponent );
