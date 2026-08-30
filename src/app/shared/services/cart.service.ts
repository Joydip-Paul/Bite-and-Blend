import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'bite-and-blend-cart';
  readonly items = signal<CartItem[]>(this.loadCart());
  readonly itemCount = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  readonly subtotal = computed(() => this.items().reduce((total, item) => total + item.price * item.quantity, 0));

  add(product: Product): void {
    this.items.update((items) => {
      const existing = items.find((item) => item.id === product.id);
      const updated = existing
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...product, quantity: 1 }];
      this.saveCart(updated);
      return updated;
    });
  }

  increase(productId: number): void {
    this.updateQuantity(productId, 1);
  }

  decrease(productId: number): void {
    this.updateQuantity(productId, -1);
  }

  remove(productId: number): void {
    this.items.update((items) => {
      const updated = items.filter((item) => item.id !== productId);
      this.saveCart(updated);
      return updated;
    });
  }

  clear(): void {
    this.items.set([]);
    this.saveCart([]);
  }

  private updateQuantity(productId: number, change: number): void {
    this.items.update((items) => {
      const updated = items
        .map((item) => item.id === productId ? { ...item, quantity: item.quantity + change } : item)
        .filter((item) => item.quantity > 0);
      this.saveCart(updated);
      return updated;
    });
  }

  private loadCart(): CartItem[] {
    if (typeof localStorage === 'undefined') return [];

    try {
      const saved = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  private saveCart(items: CartItem[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  }
}
