import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  @Input()
  visible = false;
  @Input()
  notFoundMessage = 'Not found!';
  @Input()
  resetLinkText = 'Reset';
  @Input()
  resetLinkRoute = '/';
  constructor() {}
  ngOnInit(): void {}
}
