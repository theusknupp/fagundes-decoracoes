import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-transicao',
  imports: [],
  templateUrl: './transicao.html',
  styleUrl: './transicao.scss'
})
export class Transicao implements AfterViewInit {
  @ViewChild('transicaoContainer', { static: false }) transicaoContainer!: ElementRef;
  @ViewChild('impactText', { static: false }) impactText!: ElementRef;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const container = this.transicaoContainer.nativeElement;
      const text = this.impactText.nativeElement;
      const svgParts = this.el.nativeElement.querySelectorAll('.svg-part');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onRefresh: () => ScrollTrigger.refresh()
        }
      });

      // Assemble SVG from chaotic state
      tl.fromTo(
        svgParts,
        {
          x: () => (Math.random() - 0.5) * 1000,
          y: () => (Math.random() - 0.5) * 1000,
          rotation: () => Math.random() * 360,
          scale: () => Math.random() * 2
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'power2.out'
        }
      );

      // Fade in impact text
      tl.fromTo(
        text,
        {
          scale: 0.5,
          y: 50
        },
        {
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.5)'
        },
        "-=0.2" // Overlap slightly with SVG assembly
      );
    }, 200);
  }
}
