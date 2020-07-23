import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  imageSrc = 'terms/terms.jpg'
  constructor() { }

  ngOnInit(): void {
  }

}
