import { Injectable } from "@angular/core";
import {DomSanitizer} from '@angular/platform-browser';


@Injectable()
export class UtilityService{

    constructor(private sanitizer: DomSanitizer){}

    public getKeys(obj: Object, value: string) {
        return Object.values(obj)[Object.keys(obj).indexOf(value)];
    }

    public sanitizeUrl(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    public sanitizeHtml(attr:string){
        return this.sanitizer.bypassSecurityTrustHtml(attr);
    }

    public showInfoInConsole(){
        alert("work")
    }
}