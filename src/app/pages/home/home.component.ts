import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeroComponent } from "../../shared/components/hero/hero.component";
import { CategoryComponent } from '../../shared/components/category/category.component';
import { Product, PRODUCTS } from '../../shared/data/products';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CategoryComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly products = PRODUCTS;
  filteredProducts: readonly Product[] = PRODUCTS;
  searchTerm = '';
  selectedCategory = '';
  selectedCategoryLabel = '';
  private routeSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private cart: CartService) {}

  addToCart(product: Product): void {
    this.cart.add(product);
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search')?.trim() ?? '';
      const categoryParam = params.get('category')?.trim() ?? '';
      this.selectedCategory = this.toSlug(categoryParam);
      const search = this.searchTerm.toLowerCase();
      const category = this.selectedCategory;

      if (categoryParam && categoryParam !== category) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { category },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }

      this.selectedCategoryLabel = this.products.find(
        (product) => this.toSlug(product.category) === category,
      )?.category ?? '';

      this.filteredProducts = this.products.filter((product) => {
        const searchableText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
        return (!search || searchableText.includes(search)) &&
          (!category || this.toSlug(product.category) === category);
      });

      if (search || category) {
        if (typeof document !== 'undefined') {
          queueMicrotask(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }));
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  private toSlug(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, '-');
  }

}
