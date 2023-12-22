import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { GreetingComponent } from './greeting/greeting.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillsComponent } from './skills/skills.component';

import { SafeUrlPipe } from '../app/safe-url.pipe';
import { ExperienceComponent } from './experience/experience.component';
import { ExpMapComponent } from './experience/exp-map/exp-map.component';
import { UtilityService } from './utility.service';
import { AccomplishmentDirective, CallbackFormDirective, ExperienceDirective, GoTopDirective, HeaderDirective, MenuDirective, PortfolioFilterDirective, PortfolioWorkDirective } from './directives';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AccomplishmentsComponent } from './accomplishments/accomplishments.component';
import { MenuComponent } from './header/menu/menu.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SocialsComponent } from './greeting/socials/socials.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GreetingComponent,
    SkillsComponent,
    SafeUrlPipe,
    ExperienceComponent,
    ExpMapComponent,
    PortfolioComponent,
    AccomplishmentsComponent,
    MenuComponent,
    MenuDirective,
    HeaderDirective,
    ExperienceDirective,
    PortfolioWorkDirective,
    PortfolioFilterDirective,
    ContactsComponent,
    GoTopDirective,
    AccomplishmentDirective,
    SocialsComponent,
    CallbackFormDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
