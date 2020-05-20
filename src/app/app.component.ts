import { Component } from '@angular/core';

export const menuJSON= [
  {
    name: 'Dashboard',
    url: '/login',
    writeble: true,
    icon: 'icon-speedometer'
  },
  {
    name: 'Menu1',
    url: '/logout',
    writeble: true,
    icon: 'icon-puzzle'
  }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ams-ui';
  opened = true;
  navbarOpen = false;
  menus: Array<any> = menuJSON;

  toggleNavbar() {
    console.log('toggleNavbar')
    this.navbarOpen = !this.navbarOpen;
  }

  openForm() {
    console.log('openForm')
    document.getElementById("myForm").style.display = 'block'
  }
  
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
}
