import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-products',
    templateUrl: './add-products.component.html',
    styleUrls: ['./add-products.component.css'],
    standalone: false
})
export class AddProductsComponent implements OnInit{
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
