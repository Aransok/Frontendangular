import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  /**
   *
   */
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      } else {
        this.searchTerm = '';
      }
    });
  }
  ngOnInit(): void {}
  search(term: string): void {
    if (term.trim() !== '') {
      this.router.navigateByUrl('/search/' + term);
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
