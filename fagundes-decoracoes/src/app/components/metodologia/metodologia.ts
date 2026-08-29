import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BeamsBackground } from '../beams-background/beams-background';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-metodologia',
  imports: [BeamsBackground],
  templateUrl: './metodologia.html',
  styleUrl: './metodologia.scss'
})
export class Metodologia implements AfterViewInit {
  @ViewChild('timelineContainer', { static: false }) timelineContainer!: ElementRef;
  @ViewChild('timelineProgress', { static: false }) timelineProgress!: ElementRef;
  @ViewChildren('stepCard') stepCards!: QueryList<ElementRef>;
  @ViewChildren('stepDot') stepDots!: QueryList<ElementRef>;

  ngAfterViewInit() {
    setTimeout(() => {
      const container = this.timelineContainer.nativeElement;
      const progressLine = this.timelineProgress.nativeElement;
      const cards = this.stepCards.map(c => c.nativeElement);
      const dots = this.stepDots.map(d => d.nativeElement);

      // 1. Animate the glowing line down the track
      gsap.fromTo(
        progressLine,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true
          }
        }
      );

      // 2. Animate cards entering and dots popping
      cards.forEach((card, index) => {
        const dot = dots[index];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            once: true
          }
        });

        // Pop the dot
        tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
        // Fade in the card from right
        tl.fromTo(card, { x: 50 }, { x: 0, duration: 0.6, ease: 'power3.out' }, "-=0.2");
      });

      ScrollTrigger.refresh();
    }, 300); // slightly longer timeout to ensure layout is completely painted
  }
}
