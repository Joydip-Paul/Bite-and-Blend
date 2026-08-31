import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { WhatsAppService } from '../../shared/services/whatsapp.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  submitted = false;
  orderComplete = false;
  readonly orderForm;

  constructor(
    readonly cartService: CartService,
    formBuilder: FormBuilder,
    private whatsapp: WhatsAppService,
  ) {
    this.orderForm = formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?88)?01[3-9]\d{8}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  submitOrder(): void {
    this.submitted = true;
    if (this.orderForm.invalid || !this.cartService.items().length) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const orderData = {
      customer: this.orderForm.getRawValue(),
      items: this.cartService.items(),
      subtotal: this.cartService.subtotal(),
      placedAt: new Date().toISOString(),
    };

    const itemLines = orderData.items
      .map((item) => `• ${item.quantity} × ${item.name} — Tk ${item.price * item.quantity}`)
      .join('\n');
    const message = [
      '*New Bite & Blend Order*',
      '',
      `*Name:* ${orderData.customer.name}`,
      `*Phone:* ${orderData.customer.phone}`,
      `*Address:* ${orderData.customer.address}`,
      '',
      '*Order items:*',
      itemLines,
      '',
      `*Subtotal: Tk ${orderData.subtotal}*`,
      '_Delivery charge will be confirmed separately._',
    ].join('\n');

    console.log('Bite & Blend order:', orderData);
    this.whatsapp.send(message);
    this.cartService.clear();
    this.orderForm.reset();
    this.orderComplete = true;
  }
}
