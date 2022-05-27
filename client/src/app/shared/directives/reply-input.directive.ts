import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appReplyInput]'
})
export class ReplyInputDirective {

  @Input() appReplyInput!: HTMLFormElement;
  @Input() postBtn!: HTMLButtonElement;
  @Input() commentContainer!: HTMLDivElement;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if(event.target === this.elRef.nativeElement || (event.target as HTMLElement).classList.contains('reply-btn') ){
      if(this.commentContainer.contains(event.target as HTMLElement)){
      this.appReplyInput.classList.contains('hide-form') ? this.appReplyInput.classList.remove('hide-form') : null;
      }
      else{
        this.appReplyInput.classList.contains('hide-form') ? null :  this.appReplyInput.classList.add('hide-form');
      }
    }
    else{
      if(!this.elRef.nativeElement.value || event.target === this.postBtn){
        this.appReplyInput.classList.contains('hide-form') ? null :  this.appReplyInput.classList.add('hide-form');
      }
    }
  }

  constructor(private elRef: ElementRef) { }

}
