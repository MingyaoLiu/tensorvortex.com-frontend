import { Directive, HostListener, HostBinding, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
@Directive({
    selector: '[app-drop-down]'
})
export class DropdownDirective {

    private isOpen = false;

    @Output() valueChange = new EventEmitter();


    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostBinding('class.show') get opened() {
        return this.isOpen;
    }


    @HostListener('click', ['$event']) open(targetEvent) {
        this.isOpen = !this.isOpen;
        if (this.isOpen === true) {
            this.el.nativeElement.querySelector('.dropdown-menu').classList.add('show');
        } else {
            this.el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
        }

        if (targetEvent.target.tagName == 'A') {
            this.el.nativeElement.children[0].innerText = targetEvent.target.text;

            this.valueChange.emit(targetEvent.target.text);
        }

    }

    // @HostListener('document:click', ['$event.target']) close(targetElement) {
    //     console.log("close", targetElement);
    //     const inside: boolean = this.el.nativeElement.contains(targetElement);
    //     if (!inside) {
    //         this.isOpen = false;
    //         this.el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    //     }
    // }

}
