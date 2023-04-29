import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.scss']
})
export class NumberCardComponent implements OnInit {
  @Input() tab;
  @Input() card;

  constructor() { }

  ngOnInit(): void {
  }

}
