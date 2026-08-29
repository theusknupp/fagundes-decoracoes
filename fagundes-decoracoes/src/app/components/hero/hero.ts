import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements AfterViewInit {
  @ViewChild('heroContent', { static: false }) heroContent!: ElementRef;
  @ViewChild('heroVideo', { static: false }) heroVideo!: ElementRef<HTMLVideoElement>;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const content = this.heroContent.nativeElement;

      if (this.heroVideo && this.heroVideo.nativeElement) {
        this.heroVideo.nativeElement.muted = true;
        this.heroVideo.nativeElement.defaultMuted = true;
        this.heroVideo.nativeElement.play().catch(e => console.log("Autoplay blocked: ", e));
      }

      gsap.from(content, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, 200);
  }
}
