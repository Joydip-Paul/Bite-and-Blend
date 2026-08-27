import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  categories = [
    { name: 'Juice', image: 'assets/img/categories/juice.jpg', link: '/menu/juice' },
    { name: 'Burger', image: 'assets/img/categories/burger.jpg', link: '/menu/burger' },
    { name: 'Combo Meal', image: 'assets/img/categories/combo-meal.jpg', link: '/menu/combo-meal' },
    { name: 'Sandwich', image: 'assets/img/categories/sandwich.jpg', link: '/menu/sandwich' },
    { name: 'Momo', image: 'assets/img/categories/momo.jpg', link: '/menu/momo' },
    { name: 'Snacks', image: 'assets/img/categories/snacks.jpg', link: '/menu/snacks' },
  ];
}
