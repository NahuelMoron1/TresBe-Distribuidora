import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-discounts',
    templateUrl: './discounts.component.html',
    styleUrls: ['./discounts.component.css'],
    standalone: false
})
export class DiscountsComponent implements OnInit{
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
