import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, HostListener, NgZone } from '@angular/core';

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

@Component({
  selector: 'app-beams-background',
  imports: [],
  templateUrl: './beams-background.html',
  styleUrl: './beams-background.scss',
})
export class BeamsBackground implements AfterViewInit, OnDestroy {
  @ViewChild('canvasElement', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  @Input() intensity: 'subtle' | 'medium' | 'strong' = 'strong';
  
  private beams: Beam[] = [];
  private animationFrameId: number = 0;
  private readonly MINIMUM_BEAMS = 20;

  private opacityMap = {
      subtle: 0.7,
      medium: 0.85,
      strong: 1,
  };

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.updateCanvasSize();
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCanvasSize();
  }

  private createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: Math.random() > 0.5 ? 6 : 41, // Brand Red (6) or Brand Yellow (41)
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
  }

  private updateCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const width = parent.offsetWidth || window.innerWidth;
    const height = parent.offsetHeight || window.innerHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
    ctx.scale(dpr, dpr);

    const totalBeams = this.MINIMUM_BEAMS * 1.5;
    this.beams = Array.from({ length: totalBeams }, () =>
        this.createBeam(width, height)
    );
  }

  private resetBeam(beam: Beam, index: number, totalBeams: number) {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    const width = parent?.offsetWidth || window.innerWidth;
    const height = parent?.offsetHeight || window.innerHeight;

    const column = index % 3;
    const spacing = width / 3;

    beam.y = height + 100;
    beam.x =
        column * spacing +
        spacing / 2 +
        (Math.random() - 0.5) * spacing * 0.5;
    beam.width = 100 + Math.random() * 100;
    beam.speed = 0.5 + Math.random() * 0.4;
    beam.hue = Math.random() > 0.5 ? 6 : 41;
    beam.opacity = 0.2 + Math.random() * 0.1;
    return beam;
  }

  private drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
    ctx.save();
    ctx.translate(beam.x, beam.y);
    ctx.rotate((beam.angle * Math.PI) / 180);

    const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        this.opacityMap[this.intensity];

    const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

    // Using 90% saturation and 60% lightness to match the brand vibrancy
    gradient.addColorStop(0, `hsla(${beam.hue}, 90%, 60%, 0)`);
    gradient.addColorStop(0.1, `hsla(${beam.hue}, 90%, 60%, ${pulsingOpacity * 0.5})`);
    gradient.addColorStop(0.4, `hsla(${beam.hue}, 90%, 60%, ${pulsingOpacity})`);
    gradient.addColorStop(0.6, `hsla(${beam.hue}, 90%, 60%, ${pulsingOpacity})`);
    gradient.addColorStop(0.9, `hsla(${beam.hue}, 90%, 60%, ${pulsingOpacity * 0.5})`);
    gradient.addColorStop(1, `hsla(${beam.hue}, 90%, 60%, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
    ctx.restore();
  }

  private startAnimation() {
    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const parent = canvas.parentElement;
        const width = parent?.offsetWidth || window.innerWidth;
        const height = parent?.offsetHeight || window.innerHeight;

        ctx.clearRect(0, 0, width, height);

        const totalBeams = this.beams.length;
        this.beams.forEach((beam, index) => {
            beam.y -= beam.speed;
            beam.pulse += beam.pulseSpeed;

            if (beam.y + beam.length < -100) {
                this.resetBeam(beam, index, totalBeams);
            }

            this.drawBeam(ctx, beam);
        });

        this.animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    });
  }
}
