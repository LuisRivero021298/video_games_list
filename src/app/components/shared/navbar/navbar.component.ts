import { Component, OnInit } from '@angular/core';
import M  from 'materialize-css';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  	var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  }

}
