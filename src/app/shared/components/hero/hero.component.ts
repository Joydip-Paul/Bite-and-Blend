import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly slides = [
    { image: 'assets/img/hero-1.png', alt: 'Bite & Blend featured menu' },
    { image: 'assets/img/hero-2.png', alt: 'Fresh Bite & Blend food selection' },
    { image: 'assets/img/hero-3.png', alt: 'Delicious Bite & Blend special offer' },
  ];

  activeSlide = 0;
  private autoplayTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  selectSlide(index: number): void {
    this.activeSlide = index;
    this.restartAutoplay();
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.autoplayTimer || typeof window === 'undefined') return;
    this.autoplayTimer = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length;
    }, 4500);
  }

  private stopAutoplay(): void {
    clearInterval(this.autoplayTimer);
    this.autoplayTimer = undefined;
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

}
