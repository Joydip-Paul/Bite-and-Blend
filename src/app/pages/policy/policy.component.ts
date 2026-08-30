import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

type PolicyKey = 'privacy' | 'terms' | 'returns';

interface PolicySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface PolicyPage {
  label: string;
  eyebrow: string;
  title: string;
  introduction: string;
  sections: PolicySection[];
}

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss',
})
export class PolicyComponent implements OnDestroy {
  readonly policyOrder: PolicyKey[] = ['privacy', 'terms', 'returns'];
  readonly policies: Record<PolicyKey, PolicyPage> = {
    privacy: {
      label: 'Privacy Policy',
      eyebrow: 'Your information matters',
      title: 'Privacy Policy',
      introduction: 'This policy explains what information Bite & Blend collects when you contact us or place an order, and how we handle it responsibly.',
      sections: [
        { heading: 'Information we collect', paragraphs: ['We collect only the details needed to respond to you and fulfil your order.'], bullets: ['Your name and phone number', 'Delivery address and order details', 'Messages you send through our contact form'] },
        { heading: 'How we use information', paragraphs: ['Your information is used to confirm orders, arrange delivery, answer questions and improve our service. We do not sell your personal information.'] },
        { heading: 'Storage and security', paragraphs: ['We take reasonable steps to keep customer information secure and retain it only for as long as it is needed for service, record-keeping or legal purposes.'] },
        { heading: 'Your choices', paragraphs: ['You may ask us to correct or remove personal information we hold about you by contacting our team.'] },
      ],
    },
    terms: {
      label: 'Terms & Conditions',
      eyebrow: 'Ordering with confidence',
      title: 'Terms & Conditions',
      introduction: 'These terms describe the basic rules that apply when browsing our website and placing an order with Bite & Blend.',
      sections: [
        { heading: 'Orders and confirmation', paragraphs: ['Submitting an order request does not complete the sale. Our team may contact you to confirm availability, price, address and delivery timing.'] },
        { heading: 'Prices and payment', paragraphs: ['Prices are shown in Bangladeshi Taka and may change when ingredients, portions or offers change. The final total will be confirmed before fulfilment.'] },
        { heading: 'Product availability', paragraphs: ['Fresh preparation means some products may occasionally be unavailable. We may offer a suitable replacement, which you can accept or decline.'] },
        { heading: 'Website use', paragraphs: ['You agree not to misuse this website, interfere with its operation or submit false or harmful information.'] },
      ],
    },
    returns: {
      label: 'Return & Cancellation',
      eyebrow: 'Fresh food, fair solutions',
      title: 'Return & Cancellation Policy',
      introduction: 'Food is prepared specifically for each order. This policy explains when an order can be cancelled and how we resolve product concerns.',
      sections: [
        { heading: 'Order cancellation', paragraphs: ['Please contact us as soon as possible if you need to cancel. An order can normally be cancelled before preparation begins.'] },
        { heading: 'Returns', paragraphs: ['For food safety reasons, delivered food cannot normally be returned. Please do not send a product back without speaking with our team.'] },
        { heading: 'Incorrect or damaged items', paragraphs: ['If an item is incorrect, missing or arrives in an unacceptable condition, contact us promptly with your order details and a photo where possible.'], bullets: ['Notify us as soon as the order arrives', 'Keep the affected item until our team responds', 'Approved resolutions may include replacement or refund'] },
        { heading: 'Refund timing', paragraphs: ['When a refund is approved, timing depends on the payment method and provider. Our team will explain the expected process.'] },
      ],
    },
  };

  activePolicy: PolicyKey = 'privacy';
  readonly lastUpdated = '30 August 2026';
  private readonly querySubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.querySubscription = route.queryParamMap.subscribe((params) => {
      const tab = params.get('tab');
      this.activePolicy = this.isPolicyKey(tab) ? tab : 'privacy';
    });
  }

  get page(): PolicyPage {
    return this.policies[this.activePolicy];
  }

  selectPolicy(policy: PolicyKey): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: policy },
      replaceUrl: true,
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  private isPolicyKey(value: string | null): value is PolicyKey {
    return value !== null && this.policyOrder.includes(value as PolicyKey);
  }
}
