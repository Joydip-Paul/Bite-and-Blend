import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  private readonly businessNumber = '88001876406663';

  send(message: string): void {
    if (typeof window === 'undefined') return;

    const url = `https://wa.me/${this.businessNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
