import { Component, OnInit } from '@angular/core';
import { NavBar } from '../service/navBar.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private navBarService: NavBar) { }

  ngOnInit() {
    this.navBarService.setHide();
  }

  ngOnDestroy(){
    this.navBarService.setUnhide();
  }
}
