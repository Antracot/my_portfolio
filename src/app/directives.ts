import { Component, Directive, ElementRef, HostBinding, HostListener, Renderer2, ViewChild } from "@angular/core";
import { PAGE_HIGHLIGHT_COLOR } from "./constans";
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent } from "rxjs/internal/observable/fromEvent";
import { skipUntil } from "rxjs/internal/operators/skipUntil";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import {NgbCarousel, NgbCarouselConfig, NgbSlide, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { accomplishmentsItemsWidth } from "./accomplishments/accomplishments.component";
import { $$ } from "protractor";



// HEADER SECTION
@Directive({
        selector: '[ngcarousel]'
    })

export class HeaderDirective {
    
    constructor(private el: ElementRef, private renderer: Renderer2, config: NgbCarouselConfig) { }

    ngbSlide: NgbSlide;
    ngbCarousel: NgbCarousel;
    ngbSlideEvent: NgbSlideEvent;

    // @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;
    
    @HostListener('click', ['$event']) 
    onClick() {
        // this.onSlide();
        // this.el.nativeElement.parentElement
        // let slideArr = jQuery(".carousel-item").toArray().length;
        // let currentSlide: number;
        // jQuery(".carousel-item").each(function(index, item){
        //     if($(item).hasClass("active")){
        //         $(item).removeClass("active");
        //         $(item).addClass("carousel-item-left");
        //         currentSlide = index;
        //     }
        // });
        // $(".carousel-item").eq(currentSlide + 1).addClass("active");
        // $(".carousel-item").eq(currentSlide + 1).addClass("carousel-item-next");
        // $(".carousel-item").eq(currentSlide + 1).addClass("carousel-item-left");
    } 

    onSlide(slideEvent: NgbSlideEvent) {
        console.log(slideEvent.source);
        console.log(NgbSlideEventSource.ARROW_LEFT);
        console.log(slideEvent.paused);
        console.log(NgbSlideEventSource.INDICATOR);
        console.log(NgbSlideEventSource.ARROW_RIGHT);
      }
 
}



// MENU
@Directive({
    selector: '[menuItem]'
})

export class MenuDirective {
    constructor(private el: ElementRef, private renderer2: Renderer2) { }
    
    @HostListener('click') 
    onClick() {
        this.moveToSection(this.getSectionName())
    }

    private getSectionName(): string{
        return "#" + this.el.nativeElement.textContent;
    }

    private moveToSection(sectionId :string){
        $('html, body').animate({
            scrollTop: $(sectionId).offset().top}, 2000
        );
    }
}



// GO TOP
@Directive({
    selector: '[goTop]'
})

export class GoTopDirective {
    @HostListener('click') 
    onClick() {
        $('html, body').animate({
            scrollTop: $("#header").offset().top}, 2000
        );
    }
}



// EXPERIENCE SECTION
@Directive({
    selector: '[expItem]'
  })

export class ExperienceDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) { }
    companyImageLocator: string = ".expCompanyItem";
    textLocator: string = "text";
    lineLocator: string = "line";
    circle: string = "circle"
    activeClassName: string  = "active";
    dataYearAttrName: string = "data-year";
    infoWrapper: string = ".exp-info-wrapper";
    presentItem: string = "present"


    @HostListener('mouseenter') onMouseEnter() {
        let attrYear = this.getYearAttr();

        this.highLightElem(PAGE_HIGHLIGHT_COLOR);
        this.addActiveClass(this.companyImageLocator, this.dataYearAttrName, attrYear, this.activeClassName);
        this.addActiveClass(this.textLocator, this.dataYearAttrName, attrYear, this.activeClassName);
        this.addActiveClass(this.lineLocator, this.dataYearAttrName, attrYear, this.activeClassName);
        
        setTimeout(()=>{ 
            this.showExpInfo(this.companyImageLocator, this.dataYearAttrName, attrYear);
            jQuery(".exp-info-wrapper").fadeIn(250);
        }, 250);

        if(attrYear == this.presentItem){
            this.highlightAll(this.companyImageLocator);
            this.highlightAll(this.lineLocator);
            this.highlightAll(this.textLocator);
            this.highlightAll(this.circle)
        }
    }
    
    @HostListener('mouseleave') 
    onMouseLeave() {
        this.highLightElem('');
        this.removeActiveClass(this.companyImageLocator, this.activeClassName);
        this.removeActiveClass(this.textLocator, this.activeClassName);
        this.removeActiveClass(this.lineLocator, this.activeClassName);
        this.removeActiveClass(this.circle, this.activeClassName);

        jQuery(".exp-info-wrapper").fadeOut(500);
    }
  
    private highLightElem(color : string){
      this.renderer.setStyle(this.el.nativeElement,'fill',color);
    }

    private getYearAttr(): string{
        return this.el.nativeElement.getAttribute(this.dataYearAttrName);
    }

    private addActiveClass(elem: string, attr: string, year: string, className: string){
        jQuery(elem).each(function(index, item){
            let elemImgYear = jQuery(item).attr(attr);
            if(year == elemImgYear){
                jQuery(item).addClass(className);
            }
        });
    }

    private removeActiveClass(elem: string, className: string){
        jQuery(elem).each(function(index, item){
            jQuery(item).removeClass(className);
        });
    }



    private showExpInfo(elem: string, attr: string, year: string){
        jQuery(elem).each(function(index, item){
            let elemImgYear = jQuery(item).attr(attr);
            if(year == elemImgYear){
                // console.log(jQuery(item).attr("data-comp-name"));
                jQuery(".exp-info-wrapper").html(
                    `<h4>` + jQuery(item).attr("data-comp-name") + `</h4>` +     
                    `<p class="sub_text">` + jQuery(item).attr("data-years") + `</p>` + 
                    `<p>` + jQuery(item).attr("data-info") + `</p>` +
                    `<p class="sub_tex highlight">` + jQuery(item).attr("data-techs") + `</p>` 
                );
            }
        });
    }

    private highlightAll(elem: string){
        jQuery(elem).each(function(index, item){
            jQuery(item).addClass("active");
        });
    }
  
}



// PORTFOLIO SECTION: FILTER
@Directive({
    selector: '[filterBtn]'
})

export class PortfolioFilterDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {}
    allGroup: string = "all";
    filterBtn: string = ".filter_btn";
    workItem: string = ".work_item" 
    activeClass: string = "active";
    filterGroupAttr: string  = "data-group";
    elemStateAttr: string = "data-state-elem";

    @HostListener('click', ['$event']) 
    onClick(){
        this.cleanUpClassInElem(this.filterBtn, this.activeClass);
        jQuery(this.el.nativeElement).addClass(this.activeClass);

        let btnGroup = jQuery(this.el.nativeElement).attr("data-group");

        if(btnGroup == this.allGroup){
            jQuery(this.workItem).each(function(index, item){
                jQuery(item).attr("elemStateAttr", "show");
            });
            this.showAllWorks();
        } else{
            this.setAttributes(this.filterGroupAttr, this.elemStateAttr, btnGroup);
            this.toggleWorkItems();
        }
    }

    private setAttributes(attrGroup: string, attrState: string, exclude: string){
        jQuery(this.workItem).each(function(index, item){
            if(exclude != $(item).attr(attrGroup)){
                jQuery(item).attr(attrState, "hide");
                jQuery(item).css("z-index", "1");
            } else{
                jQuery(item).attr(attrState, "show");
                jQuery(item).css("z-index", "2");
            }
        });
    }
    
    private toggleWorkItems(){
        jQuery(this.workItem).each(function(index, item){
            if(jQuery(item).attr("data-state-elem") == "hide"){
                jQuery(item).animate({marginLeft: "-32%"}, 500);
                setTimeout(() => {
                    jQuery(item).animate({marginLeft: "-33.3%"}, 500);
                }, 500);
            } else{
                jQuery(item).animate({marginLeft: "0"}, 500);
            }
            
        });
    }

    private cleanUpClassInElem(elem: string, className: string){
        jQuery(elem).each(function(index, item){
            jQuery(item).removeClass(className)
        });
    }

    private showAllWorks(){
        jQuery(this.workItem).each(function(index, item){
            jQuery(item).animate({marginLeft: "0%"}, 500);
        });
    }


}



// PORTFOLIO SECTION: WORKS
@Directive({
    selector: '[workItem]'
})

export class PortfolioWorkDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {}
    transformProperty: string = "transform";
    filterProperty: string = "backdrop-filter";
    
    imgChild: string = "img";
    whiter: string = ".whiter"
    textelem: string = "h4";
    lineElem: string = "span";
    delay: number = 200;


    @HostListener('mouseenter') 
    onMouseEnter() {
        setTimeout(() => {
            this.setElemHeight(this.textelem, "0", this.delay);
            this.setStylePropertyForChild(this.filterProperty, 'none', this.whiter);
        }, this.delay);

        this.setElemWidth(this.lineElem, "0", this.delay);
        this.setStylePropertyForChild(this.transformProperty, 'scale(1.15) translate(-43.5%, 0%)', this.imgChild);
    }

    @HostListener('mouseleave') 
    onMouseLeave() {
        setTimeout(() => {
            this.setElemHeight(this.textelem, "100%", this.delay);
            this.setStylePropertyForChild(this.filterProperty, 'blur(4px) saturate(50%) contrast(35%) brightness(90%)', this.whiter);
        }, this.delay);

        this.setElemWidth(this.lineElem, "70%", this.delay);
        this.setStylePropertyForChild(this.transformProperty, 'scale(1) translate(-50%, 0%)', this.imgChild);
    }

    private setElemWidth(childElem: string, valueWidth: string, delay: number){
        let titleWrapper = jQuery(this.el.nativeElement).children(".whiter").children(".title_wrap");
        titleWrapper.children(childElem).animate({width: valueWidth}, delay);
    }
    
    private setElemHeight(childElem: string, valueHeight: string, delay: number){
        let titleWrapper = jQuery(this.el.nativeElement).children(".whiter").children(".title_wrap");
        titleWrapper.children(childElem).animate({height: valueHeight}, delay);
    }

    private setStylePropertyForChild(propertyName: string, property: string, child: string){
        jQuery(this.el.nativeElement).children(child).css(propertyName, property);  
    } 
}



// ACCOMPLISHMENTS SECTION: WORKS
@Directive({
    selector: '[accomplItem]'
})

export class AccomplishmentDirective{
    constructor(private el: ElementRef, private renderer: Renderer2) {}
    parentClass: string = ".accomp_item";
    dateElem: string = ".event_date";
    nameElem: string = ".event_name"
    roleElem: string = ".event_role";
    attrItemIndex: string = "data-index-item";
    hoverDateElem: number;
    hoverRoleElem: number;

    @HostListener('mouseover') 
    onMouseHover() {
        setTimeout(() => {
            
            let currentItemIndex = jQuery(this.el.nativeElement).parent(this.parentClass).attr(this.attrItemIndex);
            this.hoverDateElem = (accomplishmentsItemsWidth[currentItemIndex][0] / 12 * 100);
            this.hoverRoleElem = (accomplishmentsItemsWidth[currentItemIndex][1] / 12 * 100);
            let dateChangeTo = this.hoverDateElem * 0.27
            let roleChangeTo = this.hoverRoleElem * 0.13;
    
            this.setAnimateStylePropertyForChild(
                this.convertToStringPercents(this.hoverDateElem - dateChangeTo), 
                this.parentClass, 
                this.dateElem
            );
            
            this.setAnimateStylePropertyForChild(
                this.convertToStringPercents(this.hoverRoleElem - roleChangeTo), 
                this.parentClass, 
                this.roleElem
            );
    
            jQuery(this.el.nativeElement).removeAttr("accomplItem");
        }, 2000);
    }

    @HostListener('mouseout') 
    // onMouseOut() {
    //     this.setAnimateStylePropertyForChild(
    //         this.convertToStringPercents(this.hoverDateElem), 
    //         this.parentClass, 
    //         this.dateElem
    //     );

    //     this.setAnimateStylePropertyForChild(
    //         this.convertToStringPercents(this.hoverRoleElem), 
    //         this.parentClass, 
    //         this.roleElem
    //     );
    // }

    private setAnimateStylePropertyForChild(property: string, parent: string, child: string){
        jQuery(this.el.nativeElement).parent(parent).children(child).animate({"width": property}, 500);
    } 

    private convertToStringPercents(width: number): string{
        return width.toString().concat("%");
    }

}



// CONTACTS: Form callback
@Directive({
    selector: '[inputForm]'
})

export class CallbackFormDirective{
    constructor(private el: ElementRef, private renderer: Renderer2) {}
    isValid: string = "valid";
    inValid: string = "invalid";

    @HostListener('input', [ '$event.target.value' ])
    input(){
        this.textValidation();
        this.getAllInputsForValidated().every(this.isValidated) ? this.activateSubmitButton() : this.removeActivateSubmitButton();
    }

    public activateSubmitButton(){
        jQuery(".submit").addClass("active");
    }

    public removeActivateSubmitButton(){
        if(jQuery(".submit").hasClass("active")){
            jQuery(".submit").removeClass("active");
        }
    }

    public textValidation(){
        switch(this.el.nativeElement.getAttribute("name-type")){
            case "text": {
                this.setValidationAttrForElem(this.el.nativeElement.value.length > 2);
                break;
            } 
            case "email": { 
                this.setValidationAttrForElem(this.el.nativeElement.value.includes("@"));
                break;
            }
            case "textarea": {
                this.setValidationAttrForElem(this.el.nativeElement.value.length > 10)
                break;
            } 
            default: {
               break; 
            } 
        }
    }

    public setValidationAttrForElem(validation: boolean){
        if(validation){
            jQuery(this.el.nativeElement).attr("validation", this.isValid);
            jQuery(this.el.nativeElement).removeClass('req');
            jQuery(this.el.nativeElement).parent('.input_wrapper').children(".tooltip_wrapper").html("")
        } else{
            jQuery(this.el.nativeElement).attr("validation", this.inValid);
        }
    }
    

    public getAllInputsForValidated(): any{
        let inputArr = [];
        jQuery("[inputForm]").each(function(index, item){
            inputArr.push(jQuery(item).attr("validation"))
        });
        return inputArr;
    }

    public isValidated(item: any){
        return item == "valid";
    }

}
