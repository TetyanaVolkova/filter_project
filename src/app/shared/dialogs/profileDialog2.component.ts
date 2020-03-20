
import { Component } from "@angular/core";

@Component({
  selector: 'profileDialog2',
  template: `<div class="profile-popups" fxLayoutAlign="end"><h2 fxFlex="90" matDialogTitle>Regulatory Information</h2>
						<button  class="md-icon-button close_button" aria-label="cancel" mat-raised-button [matDialogClose]="true">
							<i class="fa fa-close"></i>
						</button></div>
						<mat-dialog-content>
						<div>
							<div>
								<p><b>National Regulatory Authority(ies):</b></p>
								<p class="definition">This is a required level of review/approval for the site to initiate clinical research protocols. It is in addition to the Local Institution-level review or ethics committee.</p>
								<p id="ClinRegs">
									<a style="color: #0b00c8" href="https://clinregs.niaid.nih.gov/" target="blank">NIAID ClinRegs</a><br>
									<i>An online public database of country-specific clinical research regulatory information that enables users to explore and compare regulations across different countries. The website was created and is maintained by NIH’s National Institute of Allergy and Infectious Diseases (NIAID).</i>
								</p>
								<mat-divider></mat-divider>
								
								<p><b>Institutional Review Board (IRB):</b></p>
								<p class="definition">A committee that performs ethical review of proposed research to be conducted at an Institution and is registered with the Office of Human Research Protections (OHRP).</p>
								<mat-divider></mat-divider>
								
								<p><b>Other IRB:</b></p>
								<p class="definition">Multiple IRBs may be associated with a single institution.</p>
								<mat-divider></mat-divider>
					
								<p><b>Institutional Biosafety Committee:</b></p>
								<p class="definition">The committees responsible for the oversight of recombinant DNA research.</p>
								<mat-divider></mat-divider>
					
								<p><b>Clinical Trials Insurance (CTI):</b></p>
								<p class="definition">Insurance for injury or damage to study participants that is sometimes required by national guidelines of countries participating in clinical trials.</p>
								<mat-divider></mat-divider>
					
								<p><b>Languages:</b></p>
								<p class="definition">The predominant language(s) spoken at a site and that which may be used for informed consent documents at the site.</p>
							</div>
						</div>
						</mat-dialog-content>`
})

export class profileDialog2Component {}
export default ( profileDialog2Component );