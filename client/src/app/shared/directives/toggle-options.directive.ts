import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ToggleOptions]'
})
export class ToggleOptionsDirective {

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if(this.renderer.parentNode(this.elemRef.nativeElement).contains(event.target)){
      this.elemRef.nativeElement.classList.toggle('toggle');
    }
    else{
      if(!this.elemRef.nativeElement.classList.contains('toggle')){
        this.elemRef.nativeElement.classList.toggle('toggle');
      }
    };
  }
  constructor(private elemRef: ElementRef, private renderer: Renderer2) { }

}
