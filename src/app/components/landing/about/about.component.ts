import { Component } from "@angular/core";

@Component({
  selector: 'about',
  template: `<div class="landing_view" fxLayout="row" fxFlex="75">  
    <div id="panel_about">
        <div fxLayout="row wrap" id="panel_about_text">
            <div id="logo_row" fxLayout="column">
                <h1 class="panel-name">ABOUT</h1>
                <p>The National Institute of Allergy and Infectious Diseases (NIAID) Division of AIDS (DAIDS) oversees a portfolio of Clinical Trials Units (CTU). Clinical Research Sites (CRSs) affiliated with a CTU and Protocol-Specific (PS) sites implement the research plans of one or more of the following NIAID-funded HIV/AIDS clinical trials networks:</p>
                <div id="network_logos" fxLayout="row">
                    <div id="about_modal" fxLayout="row">
                        <linkComponent directiveid="actg" geturl="https://actgnetwork.org/" imgurl="images/landing/networks/actg_logo.svg" type='leaving' whiteframe=true alt="Go to the AIDS Clinical Trials Group"></linkComponent>
                        <linkComponent directiveid="hptn" id="htpn_logo" geturl="http://www.hptn.org/" imgurl="images/landing/networks/hptn_logo.svg" type='leaving' whiteframe=true alt="Go to the HIV Prevention Trials Network"></linkComponent>
                        <linkComponent directiveid="hvtn" geturl="http://www.hvtn.org/" imgurl="images/landing/networks/hvtn_logo.svg" type='leaving' whiteframe=true alt="Go to the HIV Vaccine Trials Network"></linkComponent>
                        <linkComponent directiveid="impaact" geturl="http://impaactnetwork.org/" imgurl="images/landing/networks/impaact_logo.svg" type='leaving' whiteframe=true alt="Go to the International Maternal Pediatric Adolescent AIDS Clinical Trials"></linkComponent>
                        <linkComponent directiveid="mtn" geturl="http://www.mtnstopshiv.org/" imgurl="images/landing/networks/mtn_logo.svg" type='leaving' whiteframe=true alt="Go to the  Microbicide Trials Network"></linkComponent>
                    </div>
                </div>
                <p>The CRS featured in this tool are limited to those sites affiliated with one or more of the above NIAID HIV/AIDS clinical trials networks.</p>
            </div>
            <span id="about_divider" fxLayout="column"><hr fxFlex/></span>
            <div id="hanc_row" fxLayout="column" fxLayoutAlign="center center">
                <p layout-gt-sm="column" fxLayout="row">The Office of HIV/AIDS Network Coordination (HANC) works with the NIAID networks to enhance collaboration and coordination.</p>
                <linkComponent directiveid="hanc" layout-gt-sm="column" lxLayout="row" geturl="https://www.hanc.info/" type="leaving" imgurl="images/landing/hanc_logo.svg" whiteframe="true" alt="Go to the HIV/AIDS Network Coordination/"></linkComponent>
            </div>
            <p id="contract_id" lxLayout="row"><i>This project has been funded in whole or in part with federal funds from the Division of AIDS (DAIDS), National Institute of Allergy and Infectious Diseases, National Institutes of Health, Department of Health and Human Services, under contract No. HHSN272201200009C, entitled "NIAID HIV and Other Infectious Diseases Clinical Research Support Services (CRSS)".</i></p>
        </div>
    </div>
</div>
            `
})
export class aboutComponent {
  constructor() {
  }
}
export default ( aboutComponent );