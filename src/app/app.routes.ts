import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OrderComponent } from './pages/order/order.component';
import { PolicyComponent } from './pages/policy/policy.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Bite & Blend | Fresh Food and Drinks in Chunarughat',
    data: {
      description: 'Order fresh burgers, juice, momo, snacks and combo meals from Bite & Blend in Chunarughat, Habiganj. Open daily from 10 AM to 10 PM.',
    },
  },
  {
    path: 'menu',
    component: MenuComponent,
    title: 'Food and Drinks Menu | Bite & Blend',
    data: {
      description: 'Explore fresh burgers, juice, momo, sandwiches, snacks and combo meals from Bite & Blend in Chunarughat.',
      robots: 'noindex, follow',
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Bite & Blend | Fresh Food in Chunarughat',
    data: {
      description: 'Learn about Bite & Blend and our commitment to serving freshly prepared food, delicious drinks and warm moments in Chunarughat.',
    },
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Bite & Blend | Chunarughat, Habiganj',
    data: {
      description: 'Contact Bite & Blend in Chunarughat, Habiganj for orders, questions or feedback. Call +880 1759-696957 or send us a message.',
    },
  },
  {
    path: 'order',
    component: OrderComponent,
    title: 'Complete Your Order | Bite & Blend',
    data: {
      description: 'Review your Bite & Blend cart and send your food order for confirmation.',
      robots: 'noindex, follow',
    },
  },
  {
    path: 'policies',
    component: PolicyComponent,
    title: 'Policies | Bite & Blend',
    data: {
      description: 'Read Bite & Blend policies covering privacy, orders, terms, returns and cancellations.',
    },
  },
  { path: '**', redirectTo: '' },
];
