import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavBar } from './service/navBar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'service-station-app';
  @ViewChild('navBar') navBar : ElementRef;

  constructor(private navBarService:NavBar){}

  ngOnInit(){
    this.navBarService.setNavBar(this.navBar);
  }

}
