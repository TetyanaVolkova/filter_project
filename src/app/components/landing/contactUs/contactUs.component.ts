import { Component } from "@angular/core";

@Component({
    selector: 'contactUs',
    template: ` <div class="landing_view" fxLayout="row" fxFlex="75"> 
                    <div id="panel_dis">
                        <div layout="row" layout-wrap id="panel_dis_text">
                            <h1 class="panel-name">CONTACT US</h1>
                            <p>
                                This site provides information about the Division of AIDS (DAIDS) and its programs and activities. 
                                DAIDS is a division of the National Institute of Allergy and Infectious Diseases (NIAID), 
                                which is part of the National Institutes of Health (NIH). If you need medical advice, please consult your healthcare provider. 
                                <strong>We do not provide medical advice or doctor referrals.</strong><br><br>
                                The resources on this site should not be used as a substitute for professional medical care, and we urge you to work with your 
                                medical care providers for answers to your personal health questions.
                            </p>
                            <h2 flex="66">General Contact Info</h2>
                            <p flex="66">
                                Email: <a href="mailto:tgreenfield@niaid.nih.gov" alt ="contactemail" aria-label="email" title ="email">tgreenfield@niaid.nih.gov</a> (link sends e-mail) (allow 7 to 10 working days for a reply)<br>
                                Toll-Free: 866-284-4107<br>
                                Local: 301-496-5717<br>
                                TDD: 800-877-8339 (for hearing impaired)<br>
                                Fax: 301-402-3573
                            </p>
                        </div>
                    </div>
                </div>`
})
export class contactUsComponent {
};

export default ( contactUsComponent );