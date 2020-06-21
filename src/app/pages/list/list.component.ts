import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {
    screenSize = {
        screenWidth: 0,
        screenHeight: 0
    }

  constructor() { }

    ngOnInit(): void {
        this.screenSize.screenWidth = screen.height;
        this.screenSize.screenWidth = screen.width;
  }

}
