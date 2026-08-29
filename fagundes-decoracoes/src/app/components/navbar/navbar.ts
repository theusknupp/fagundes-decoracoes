import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, AfterViewInit {
  isScrolled = false;
  isMenuOpen = false;
  isHeroVisible = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  ngOnInit() {
    this.onWindowScroll();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            this.isHeroVisible = entry.isIntersecting;
          },
          {
            root: null,
            threshold: 0.1,
            rootMargin: '-50px 0px 0px 0px'
          }
        );
        observer.observe(heroSection);
      }
    }, 200);
  }
}
