import { Component, HostListener, OnInit } from '@angular/core';
import { HttpService} from '../../http.service';
import {jsonFile} from '../../jsonFile';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import {ExperienceDirective} from '../../directives';

@Component({
  selector: 'app-exp-map',
  templateUrl: '../../../assets/img/exp.svg',
  styleUrls: ['./exp-map.component.sass'],
  providers: [HttpService],
})
export class ExpMapComponent implements OnInit {

    jsonData: jsonFile;
    companies: any[];
    totalAngularPackages: any;
    SearchResults: Array<Object>[];
    total: string;
    @ViewChildren("circle") alerts: QueryList<"circle">;

    constructor(private httpService: HttpService, private http: HttpClient) {}

    ngOnInit(): void {
        this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.exp_sec);

        // let uuu = this.http.get('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
        //     this.totalAngularPackages = data;
        //     console.log(data)
        // })
        // this.getCompaniesFromJson().forEach(element => {
        //     console.log(element)
        // });
    }

    

    

    getDataAttr(){
        jQuery("circle").each(function(index, item){
            console.log(jQuery(item).attr("data-year"));
        });
    }

    @HostListener('mouseover')
    mouseover(event: MouseEvent): void {
        // jQuery(this).css("fill", "red");
    }



}
