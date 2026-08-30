import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeroComponent } from "../../shared/components/hero/hero.component";
import { CategoryComponent } from '../../shared/components/category/category.component';
import { Product, PRODUCTS } from '../../shared/data/products';

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
  private routeSubscription?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search')?.trim() ?? '';
      this.selectedCategory = params.get('category')?.trim() ?? '';
      const search = this.searchTerm.toLowerCase();
      const category = this.selectedCategory.toLowerCase();

      this.filteredProducts = this.products.filter((product) => {
        const searchableText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
        return (!search || searchableText.includes(search)) &&
          (!category || product.category.toLowerCase() === category);
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

}
