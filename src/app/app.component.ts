import { Component, HostListener, Inject, PLATFORM_ID ,OnInit  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { NavibarComponent } from './navibar/navibar.component';
import { HeaderComponent } from './header/header.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { ArrowLeftComponent } from './animations/arrow-left/arrow-left.component';
import { ArrowRightComponent } from './animations/arrow-right/arrow-right.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { Project1Component } from './projects/project-1/project-1.component';
import { Project2Component } from './projects/project-2/project-2.component';
import { Project3Component } from './projects/project-3/project-3.component';
import { Project4Component } from './projects/project-4/project-4.component';
import { FooterComponent } from './footers/footer/footer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MainSiteComponent } from './main-site/main-site.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterMobileComponent } from './footers/footer-mobile/footer-mobile.component';
import { ArrowHomeComponent } from './animations/arrow-home/arrow-home.component';
import { ArrowLeftOutsideComponent } from './animations/arrow-left-outside/arrow-left-outside.component';
import AOS from 'aos';
import { BaseProjectComponent } from './projects/base-project/base-project.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MainSiteComponent,
    RouterOutlet,
    NavibarComponent,
    HeaderComponent,
    AboutMeComponent,
    MySkillsComponent,
    ArrowLeftComponent,
    ArrowLeftOutsideComponent,
    ArrowRightComponent,
    PortfolioComponent,
    Project1Component,
    Project2Component,
    Project3Component,
    Project4Component,
    FooterMobileComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    LegalNoticeComponent,
    ContactMeComponent,
    FormsModule,
    ReactiveFormsModule,
    ArrowHomeComponent,
    BaseProjectComponent,
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
    title = 'Sebastian';
    isMobile: boolean = false;
  
   
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Prüfen, ob die Anwendung im Browser läuft
      this.checkScreenSize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      // Wiederholte Prüfung für Event-Handler
      this.checkScreenSize();
    }
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 769;
    }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }
}
