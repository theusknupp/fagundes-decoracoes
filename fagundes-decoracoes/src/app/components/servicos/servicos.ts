import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-servicos',
  imports: [],
  templateUrl: './servicos.html',
  styleUrl: './servicos.scss'
})
export class Servicos implements AfterViewInit {
  @ViewChildren('servicoCard') servicoCards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    setTimeout(() => {
      const cards = this.servicoCards.map(card => card.nativeElement);

      gsap.fromTo(
        cards,
        {

          y: 50
        },
        {

          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
            once: true
          },
          onComplete: () => ScrollTrigger.refresh()
        }
      );
    }, 200);
  }

  openWhatsApp(serviceName: string) {
    const phone = '553188737519';
    const text = `Olá, gostaria de saber mais sobre o ${serviceName}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
}
