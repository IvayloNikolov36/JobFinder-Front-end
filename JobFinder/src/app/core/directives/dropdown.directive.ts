import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[jfDropdown]',
  standalone: false
})
export class DropdownDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {  }

  @HostListener('click') handleClick() {

    const classValue: any = this.element.nativeElement.className;
    const divElement: any = this.element.nativeElement.querySelector('div');

    if (classValue.endsWith('show')) {
      this.renderer.removeClass(this.element.nativeElement, 'show');
      this.renderer.removeClass(divElement, 'show');
    } else {
      this.renderer.addClass(this.element.nativeElement, 'show');
      this.renderer.addClass(divElement, 'show');
    }
  }
}
