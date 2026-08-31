import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updatePageMetadata());
  }

  private updatePageMetadata(): void {
    let route = this.activatedRoute.snapshot;
    while (route.firstChild) route = route.firstChild;

    const pageTitle = route.title ?? 'Bite & Blend';
    const description = route.data['description'] as string | undefined;
    const robots =
      (route.data['robots'] as string | undefined) ?? 'index, follow, max-image-preview:large';

    this.title.setTitle(pageTitle);
    if (description) this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    if (description) this.meta.updateTag({ property: 'og:description', content: description });

    if (!this.isBrowser) return;

    const canonicalUrl = `${window.location.origin}${this.router.url.split(/[?#]/)[0] || '/'}`;
    const socialImageUrl = new URL('/assets/img/hero-banner.png', window.location.origin).href;

    this.setCanonical(canonicalUrl);
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: socialImageUrl });
    this.addStructuredData(canonicalUrl);
  }

  private setCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  private addStructuredData(pageUrl: string): void {
    const scriptId = 'bite-and-blend-structured-data';
    this.document.getElementById(scriptId)?.remove();

    const siteUrl = window.location.origin;
    const graph = [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'Bite & Blend',
        alternateName: 'Bite and Blend',
        inLanguage: 'en-BD',
      },
      {
        '@type': 'Restaurant',
        '@id': `${siteUrl}/#restaurant`,
        name: 'Bite & Blend',
        url: `${siteUrl}/`,
        image: `${siteUrl}/assets/img/hero-banner.png`,
        logo: `${siteUrl}/assets/img/main-logo.jpg`,
        telephone: '+8801759696957',
        email: 'biteandblend.bd@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chunarughat',
          addressRegion: 'Habiganj',
          addressCountry: 'BD',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '10:00',
            closes: '22:00',
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: this.title.getTitle(),
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#restaurant` },
      },
    ];

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    this.document.head.appendChild(script);
  }
}
