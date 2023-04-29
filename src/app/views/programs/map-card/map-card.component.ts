import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnInit {
  @Input() tab;
  @Input() card;

  constructor() { }

  ngOnInit(): void {
  }

}
