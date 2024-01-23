import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSiteComponent } from './main-site/main-site.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '', component: MainSiteComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
