import { Component, OnInit } from '@angular/core';
import {jsonFile} from '../jsonFile';
import { HttpService} from '../http.service';
import { ViewChild } from '@angular/core';
import { UtilityService } from '../utility.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { ViewChildren } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { QueryList } from '@angular/core';
import { of } from 'rxjs';
import { HostListener } from '@angular/core';
import { HostBinding } from '@angular/core';

declare var $:JQueryStatic;

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    // templateUrl: '../../assets/img/exp.svg',
    styleUrls: ['./experience.component.sass'],
    providers: [HttpService]
  })

export class ExperienceComponent implements OnInit {

  jsonData: jsonFile;
  
  imgPath = "img-path";
  companyYear = "year";
  companyYears = "years";
  companyName = "company-name";
  companyInfo = "info";
  companyTechs = "techs";

  getKeys = this.util.getKeys;
  satinize = this.util.sanitizeHtml

  constructor(private httpService: HttpService, private sanitizer: DomSanitizer, private util: UtilityService) {}

  ngOnInit(): void {
    this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.exp_sec);
  }

ngAfterContentInit() {}

}
