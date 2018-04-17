import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(	private el: ElementRef,
				private renderer: Renderer2) { }
	@HostListener('mouseenter') onmouseenter() {
		this.renderer.addClass(this.el.nativeElement, 'highlight'); /* add a Class to the grid item in grid list */
	}
	
	@HostListener('mouseleave') onmouseleave() {
		this.renderer.removeClass(this.el.nativeElement, 'highlight'); /* remove a Class to the grid item in grid list */
	}
}
