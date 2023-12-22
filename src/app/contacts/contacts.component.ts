import { Component, HostListener, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { jsonFile } from '../jsonFile';
import { UtilityService } from '../utility.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.sass'],
    providers: [HttpService, UtilityService]
})
export class ContactsComponent implements OnInit {

    constructor(private httpService: HttpService, private util: UtilityService) { }

    getKeys = this.util.getKeys;
    jsonData: jsonFile;

    ngOnInit(): void {
        this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.contacts_sec);
    }

    @HostListener('submit')
    onSubmit() {
        jQuery("[inputForm]").each(function(index, item){
            console.log(jQuery(item).attr("validation")  == "invalid")
            if(jQuery(item).attr("validation")  == "invalid") {
                jQuery(item).addClass("req");
                jQuery(item).parent('.input_wrapper').children(".tooltip_wrapper")
                    .html('<span class="marker">*</span><span class="tips">'+jQuery(item).attr("name")+' should be '+jQuery(item).attr("data-required-msg")+'</span>');
            }
        });
        
    }

}
