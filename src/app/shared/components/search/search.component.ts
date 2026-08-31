import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnDestroy {
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  searchText = '';
  private searchTimer?: ReturnType<typeof setTimeout>;
  private querySubscription: Subscription;

  constructor(private router: Router, route: ActivatedRoute) {
    this.querySubscription = route.queryParamMap.subscribe((params) => {
      this.searchText = params.get('search') ?? '';
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.searchTimer);
    this.querySubscription.unsubscribe();
  }

  onSearchChange(): void {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.searchProduct(), 180);
  }

  searchProduct(): void {
    clearTimeout(this.searchTimer);
    const search = this.searchText.trim();

    this.router.navigate(['/'], {
      queryParams: search ? { search } : {},
      replaceUrl: true,
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchProduct();
  }

  focus(): void {
    this.searchInput?.nativeElement.focus();
  }
}
