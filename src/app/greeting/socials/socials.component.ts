import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/http.service';
import { jsonFile } from 'src/app/jsonFile';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.sass']
})
export class SocialsComponent implements OnInit {

    constructor(private httpService: HttpService, private sanitizer: DomSanitizer, private util: UtilityService) { }
  
    jsonData: jsonFile;
    sanitize = this.util.sanitizeUrl


    ngOnInit(): void {
        this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.welcome_sec);

    }

}
