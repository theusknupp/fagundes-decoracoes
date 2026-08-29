import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-sobre',
  imports: [],
  templateUrl: './sobre.html',
  styleUrl: './sobre.scss'
})
export class Sobre implements AfterViewInit {
  @ViewChild('sobreText', { static: false }) sobreText!: ElementRef;
  @ViewChild('sobreImage', { static: false }) sobreImage!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      // Text Animation
      gsap.fromTo(
        this.sobreText.nativeElement,
        {

          x: -50
        },
        {

          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: this.sobreText.nativeElement,
            start: 'top 80%',
            once: true
          }
        }
      );

      // Image Animation
      gsap.fromTo(
        this.sobreImage.nativeElement,
        {

          x: 50
        },
        {

          x: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: this.sobreImage.nativeElement,
            start: 'top 80%',
            once: true
          },
          onComplete: () => ScrollTrigger.refresh()
        }
      );
    }, 200);
  }
}
