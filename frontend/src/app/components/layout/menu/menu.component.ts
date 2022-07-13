import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  mobileMenu = false;

  appSections = [

    {icon:'bi bi-bookmark', title:'reservas'},
    {icon:'bi bi-truck', title:'salidas'},
    {icon:'bi bi-credit-card', title:'pagos'},
    {icon:'bi bi-archive', title:'inventario'},

  ];

  ngOnInit(): void {
  }


}
