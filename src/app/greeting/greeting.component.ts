import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HttpService} from '../http.service';
import { jsonFile } from '../jsonFile';
import {DomSanitizer} from '@angular/platform-browser';
import { UtilityService } from '../utility.service';


@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.sass'],
  providers: [HttpService, UtilityService]
})
export class GreetingComponent implements OnInit {

  textGreeting: Object;
  jsonData: jsonFile;
  // sanitize = this.util.sanitizeUrl

    constructor(private httpService: HttpService, private sanitizer: DomSanitizer, private util: UtilityService) {}    

    ngOnInit(): void {
      this.httpService.getTextData().subscribe((data:String) => this.textGreeting = data);
      this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.welcome_sec);
    }

}
