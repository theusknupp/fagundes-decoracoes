import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-galeria-animacao',
  standalone: true,
  templateUrl: './galeria-animacao.html',
  styleUrl: './galeria-animacao.scss'
})
export class GaleriaAnimacao implements AfterViewInit {
  @ViewChild('animacaoContainer', { static: false }) animacaoContainer!: ElementRef;
  @ViewChild('animacaoCanvas', { static: false }) animacaoCanvas!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D;
  private images: HTMLImageElement[] = [];
  private frameCount = 60;
  private currentFrame = { frame: 0 };

  ngAfterViewInit() {
    setTimeout(() => {
      this.initAnimation();
    }, 100);
  }

  @HostListener('window:resize')
  onResize() {
    const canvas = this.animacaoCanvas.nativeElement;
    // Only resize canvas if width changes (ignores mobile URL bar height changes)
    if (canvas.width !== window.innerWidth) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.render();
    }
  }

  private initAnimation() {
    const canvas = this.animacaoCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.context = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const currentFrameURL = (index: number) => {
      const paddedIndex = index.toString().padStart(3, '0');
      return `/galeria-animacao/frame_${paddedIndex}.jpg`;
    };

    let loadedCount = 0;

    for (let i = 0; i < this.frameCount; i++) {
      const img = new Image();
      img.src = currentFrameURL(i);
      img.onload = () => {
        if (i === 0) {
          this.render();
        }
      };
      this.images.push(img);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.animacaoContainer.nativeElement,
        start: "top top",
        end: "+=150%", // Total scroll distance (120% for video + 30% for delay)
        scrub: 0.5,
        pin: true,
        onUpdate: () => this.render(),
        onRefresh: () => this.render()
      }
    });

    // The animation of the frames
    tl.to(this.currentFrame, {
      frame: this.frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: 1
    });

    // Add empty space (delay) at the end of the timeline
    tl.to({}, { duration: 0.25 }); // 25% extra scrolling where nothing happens (just stays pinned on the last frame)
  }

  private render() {
    const frameIndex = Math.round(this.currentFrame.frame);
    if (!this.context || !this.images[frameIndex] || !this.images[frameIndex].complete) return;
    
    const canvas = this.animacaoCanvas.nativeElement;
    const img = this.images[frameIndex];
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }
    
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }
}
