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
    { name: 'Juice', image: 'assets/icons/cat-juice.png', link: '/menu/juice' },
    { name: 'Burger', image: 'assets/icons/cat-juice.png', link: '/menu/burger' },
    { name: 'Combo Meal', image: 'assets/icons/cat-juice.png', link: '/menu/combo-meal' },
    { name: 'Sandwich', image: 'assets/icons/cat-juice.png', link: '/menu/sandwich' },
    { name: 'Momo', image: 'assets/icons/cat-juice.png', link: '/menu/momo' },
    { name: 'Snacks', image: 'assets/icons/cat-juice.png', link: '/menu/snacks' },
  ];
}
