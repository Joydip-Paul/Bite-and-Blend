import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild(SearchComponent) private searchComponent?: SearchComponent;

  cartOpen = false;
  mobileSearchOpen = false;

  constructor(readonly cartService: CartService) {}

  toggleMobileSearch(): void {
    this.mobileSearchOpen = !this.mobileSearchOpen;
    if (this.mobileSearchOpen) {
      setTimeout(() => this.searchComponent?.focus());
    }
  }

  openCart(): void {
    this.cartOpen = true;
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  }

  closeCart(): void {
    this.cartOpen = false;
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.cartOpen) this.closeCart();
    if (this.mobileSearchOpen) this.mobileSearchOpen = false;
  }
}
