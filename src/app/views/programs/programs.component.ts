import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  tabs = [
    { id: 1, name: 'Tab 1', description: 'some data' },
    { id: 1, name: 'Tab 2', description: 'some data' },
    { id: 1, name: 'Tab 3', description: 'some data' },
    { id: 1, name: 'Tab 4', description: 'some data' },
  ];
  cards = [
    { id: 1, type: 'number', config: '' },
    { id: 2, type: 'table', config: '' },
    { id: 3, type: 'map', config: '' }
  ]
  tabIndex;

  constructor() { }

  ngOnInit(): void {
  }


  onTabChanged($event) {

  }

}
