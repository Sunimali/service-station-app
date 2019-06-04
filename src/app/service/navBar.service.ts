import { ElementRef } from '@angular/core';

export class NavBar{
  navBar: ElementRef;

  setNavBar(nav:ElementRef){
    this.navBar = nav;
  }

  setHide(){
    this.navBar.nativeElement.hidden=true;
  }

  setUnhide(){
    this.navBar.nativeElement.hidden=false;
  }
}
