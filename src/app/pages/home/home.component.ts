import { Component } from '@angular/core';
import { HeroComponent } from "../../shared/components/hero/hero.component";
import { CategoryComponent } from '../../shared/components/category/category.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
