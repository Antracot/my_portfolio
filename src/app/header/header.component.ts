import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel, NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {jsonFile} from '../jsonFile';
import { HttpService} from '../http.service';
import { UtilityService } from '../utility.service';

// @ts-ignore
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
    providers: [HttpService, UtilityService]
})
export class HeaderComponent implements OnInit {

    jsonData: jsonFile;
    sliderItems = document.getElementsByClassName('slide-img-wrapper');
    @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;
    

    constructor(config: NgbCarouselConfig, private httpService: HttpService, private util: UtilityService) {
        config.interval = 5000;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = true;
        config.showNavigationArrows = true;
        config.showNavigationIndicators = true;
    }

    getKeys = this.util.getKeys;
    path: string = "path"
    title: string = "title";
    ngbSlideEvent: NgbSlideEvent;
    ngbSlideEventSource: NgbSlideEventSource; 

    // @ViewChild(".carousel-item") private parentRef: ElementRef<HTMLElement>;
    
    // @HostListener('click') 
    // onClick() {
    //     console.log(this.parentRef);
    // } 

    onSlide(slideEvent: NgbSlideEvent) {
        console.log(slideEvent.source);
        console.log(NgbSlideEventSource.ARROW_LEFT);
        console.log(slideEvent.paused);
        console.log(NgbSlideEventSource.INDICATOR);
        console.log(NgbSlideEventSource.ARROW_RIGHT);
      }


    ngOnInit(): void {
        this.httpService.getJsonData().subscribe((data:jsonFile) => this.jsonData = data.header_sec);
    }

    
}


