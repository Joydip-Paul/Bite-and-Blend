import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('categoryList') private categoryList?: ElementRef<HTMLElement>;

  readonly categories = [
    { name: 'Juice', image: 'assets/icons/juice.svg', slug: 'juice', count: 2 },
    { name: 'Burger', image: 'assets/icons/burger.svg', slug: 'burger', count: 2 },
    { name: 'Combo Meal', image: 'assets/icons/combo-meal.svg', slug: 'combo-meal', count: 2 },
    { name: 'Sandwich', image: 'assets/icons/sandwich.svg', slug: 'sandwich', count: 2 },
    { name: 'Momo', image: 'assets/icons/momo.svg', slug: 'momo', count: 2 },
    { name: 'Snacks', image: 'assets/icons/snacks.svg', slug: 'snacks', count: 2 },
  ];

  showNavigation = false;
  canScrollLeft = false;
  canScrollRight = false;
  selectedCategory = '';

  private resizeObserver?: ResizeObserver;
  private routeSubscription?: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParamMap.subscribe((params) => {
      this.selectedCategory = this.toSlug(params.get('category') ?? '');
    });
  }

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
    this.routeSubscription?.unsubscribe();
  }

  toggleCategory(category: string): void {
    const categoryQuery = this.selectedCategory === category ? {} : { category };
    this.router.navigate(['/'], { queryParams: categoryQuery });
  }

  private toSlug(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, '-');
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
