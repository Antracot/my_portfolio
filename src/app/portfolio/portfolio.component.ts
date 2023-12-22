import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { jsonFile } from '../jsonFile';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass'],
  providers: [HttpService, UtilityService]
})
export class PortfolioComponent implements OnInit {

    jsonData: jsonFile;

    work_path = "img_path";
    group = "group"
    itemName = "name"

    getKeys = this.util.getKeys;

    constructor(private httpService: HttpService, private util: UtilityService) { }

    ngOnInit(): void {
        this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.portfolio_sec);
    }

    

}
