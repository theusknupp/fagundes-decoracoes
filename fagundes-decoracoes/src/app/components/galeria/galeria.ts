import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-galeria',
  imports: [],
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss'
})
export class Galeria implements AfterViewInit {
  @ViewChildren('galeriaItem') galeriaItems!: QueryList<ElementRef>;

  ngAfterViewInit() {
    setTimeout(() => {
      const items = this.galeriaItems.map(item => item.nativeElement);

      gsap.fromTo(
        items,
        {

          scale: 0.9
        },
        {

          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.galeria-grid',
            start: 'top 85%',
            once: true
          },
          onComplete: () => ScrollTrigger.refresh()
        }
      );
    }, 200);
  }
}
