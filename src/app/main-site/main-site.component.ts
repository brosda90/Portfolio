import { Component } from '@angular/core';
import { NavibarComponent } from '../navibar/navibar.component';
import { HeaderComponent } from '../header/header.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ArrowLeftComponent } from '../animations/arrow-left/arrow-left.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { ArrowRightComponent } from '../animations/arrow-right/arrow-right.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { Project1Component } from '../projects/project-1/project-1.component';
import { Project2Component } from '../projects/project-2/project-2.component';
import { Project3Component } from '../projects/project-3/project-3.component';

import { CommonModule } from '@angular/common';
import { ContactMeComponent } from '../contact-me/contact-me.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../footers/footer/footer.component';
import { ArrowHomeComponent } from '../animations/arrow-home/arrow-home.component';
import { ArrowLeftOutsideComponent } from '../animations/arrow-left-outside/arrow-left-outside.component';
import { Project4Component } from '../projects/project-4/project-4.component';

@Component({
  selector: 'app-main-site',
  standalone: true,
  imports: [
    CommonModule,
    NavibarComponent,
    HeaderComponent,
    AboutMeComponent,
    ArrowLeftComponent,
    MySkillsComponent,
    ArrowRightComponent,
    ArrowLeftOutsideComponent,
    PortfolioComponent,
    Project1Component,
    Project2Component,
    Project3Component,
    Project4Component,
    ArrowHomeComponent,
    ContactMeComponent,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
  ],
  templateUrl: './main-site.component.html',
  styleUrl: './main-site.component.scss',
})
export class MainSiteComponent {}
