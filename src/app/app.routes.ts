import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OrderComponent } from './pages/order/order.component';
import { PolicyComponent } from './pages/policy/policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'order', component: OrderComponent },
  { path: 'policies', component: PolicyComponent },
  { path: '**', redirectTo: '' },
];
