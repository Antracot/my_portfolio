import { Component, HostListener, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { jsonFile } from '../jsonFile';
import { UtilityService } from '../utility.service';

export const accomplishmentsItemsWidth: any [] = [
        [2, 2.25],
        [3, 3],
        [1.5, 1.75],
        [2.5, 2.4],
        [2, 2.75],
        [3.75, 3.4],
        [2.6, 2.2],
        [1.5, 1.8],
        [3, 2.25],
        [2.2, 1.4],
        [1.7, 2.7]
    ];

@Component({
    selector: 'app-accomplishments',
    templateUrl: './accomplishments.component.html',
    styleUrls: ['./accomplishments.component.sass'],
    providers: [HttpService, UtilityService]
})
export class AccomplishmentsComponent implements OnInit {

    constructor(private httpService: HttpService, private util: UtilityService) {}
    
    jsonData: jsonFile
    eventDate: string = "event_date"
    eventName: string = "event_name"
    eventTopic: string = "event_topic"
    eventRole: string = "event_role"
    eventLink: string = "event_link"

    getKeys = this.util.getKeys;
    showInfo =this.util.showInfoInConsole;

    ngOnInit(): void {
        this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.accomplishments_sec);
        this.setAccomplishmentWirth();
    }

    private setAccomplishmentWirth(){
        setTimeout(function () {
            jQuery(".accomp_item").each(function(index, item){
                let dateWidth = accomplishmentsItemsWidth[index][0] / 12 * 100
                let roleWidth = accomplishmentsItemsWidth[index][1] / 12 * 100
                let nameWidth = 100 - dateWidth - roleWidth
                
                jQuery(item).attr("data-index-item", index)
                jQuery(item).children(".event_date").animate({"width": dateWidth  +"%"}, 750);
                jQuery(item).children(".event_role").animate({"width": roleWidth  +"%"}, 750);
                jQuery(item).children(".event_name").animate({"width": nameWidth  +"%"}, 750);
            });
        }, 1000);

    }

    ngAfterContentInit() {}

}
