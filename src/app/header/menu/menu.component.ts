import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { jsonFile } from 'src/app/jsonFile';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private httpService: HttpService, private util: UtilityService) { }

  getKeys = this.util.getKeys;
  jsonData: jsonFile;
  menuItemName: string = "name";
  menuLink: string = "linkTo"; 

  ngOnInit(): void {
    this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.header_sec);
}


}
