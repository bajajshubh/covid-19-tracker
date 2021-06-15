import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input('totalConfirmed')
  totalConfirmed
  @Input('totalRecovered')
  totalRecovered
  @Input('totalDeaths')
  totalDeaths
  @Input('totalActive')
  totalActive
  constructor() { }

  ngOnInit(): void {
  }

}
