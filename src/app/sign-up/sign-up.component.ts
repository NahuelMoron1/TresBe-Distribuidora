import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    standalone: false
})
export class SignUpComponent implements OnInit{
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
