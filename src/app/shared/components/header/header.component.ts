import { Component, HostListener } from '@angular/core';
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
  cartOpen = false;

  constructor(readonly cartService: CartService) {}

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
  }
}
