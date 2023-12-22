import { Component, OnInit } from '@angular/core';
import {jsonFile} from '../jsonFile';
import { HttpService} from '../http.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.sass'],
  providers: [HttpService, UtilityService]
})

export class SkillsComponent implements OnInit {
    // [x: string]: any;

    jsonData: jsonFile;
    title = "title";
    icon = "icon";
    text = "text";
    techs = "techs";
    getKeys = this.util.getKeys;
    
    constructor(private httpService: HttpService, private util: UtilityService) {}

    ngOnInit(): void {
        this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.skills_sec);
    }

}
