import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('categoryList') private categoryList?: ElementRef<HTMLElement>;

  readonly categories = [
    { name: 'Juice', image: 'assets/icons/juice.svg', slug: 'Juice', count: 2 },
    { name: 'Burger', image: 'assets/icons/burger.svg', slug: 'Burger', count: 2 },
    { name: 'Combo Meal', image: 'assets/icons/combo-meal.svg', slug: 'Combo Meal', count: 2 },
    { name: 'Sandwich', image: 'assets/icons/sandwich.svg', slug: 'Sandwich', count: 2 },
    { name: 'Momo', image: 'assets/icons/momo.svg', slug: 'Momo', count: 2 },
    { name: 'Snacks', image: 'assets/icons/snacks.svg', slug: 'Snacks', count: 2 },
  ];

  showNavigation = false;
  canScrollLeft = false;
  canScrollRight = false;

  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    // Measure after Angular's initial change-detection pass has completed.
    queueMicrotask(() => this.updateNavigation());

    if (typeof ResizeObserver !== 'undefined' && this.categoryList) {
      this.resizeObserver = new ResizeObserver(() => this.updateNavigation());
      this.resizeObserver.observe(this.categoryList.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateNavigation();
  }

  scroll(direction: 'left' | 'right'): void {
    const list = this.categoryList?.nativeElement;
    if (!list) return;

    const card = list.querySelector<HTMLElement>('.category-card');
    const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0;
    const distance = (card?.offsetWidth ?? list.clientWidth * 0.75) + gap;

    list.scrollBy({
      left: direction === 'right' ? distance : -distance,
      behavior: 'smooth',
    });
  }

  updateNavigation(): void {
    const list = this.categoryList?.nativeElement;
    if (!list) return;

    const maximumScroll = list.scrollWidth - list.clientWidth;
    this.showNavigation = maximumScroll > 1;
    this.canScrollLeft = list.scrollLeft > 1;
    this.canScrollRight = list.scrollLeft < maximumScroll - 1;
  }
}
