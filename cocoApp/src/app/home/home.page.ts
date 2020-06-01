import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  slides = [
    {
      img: 'assets/kapak/kapakSlide1.png',
      titulo: 'Bienvenido a Kapak'
    },
    {
      img: 'assets/kapak/kapakSlide2.png',
      titulo: 'La mejor tienda online de Ecuador'
    },
    {
      img: "assets/kapak/kapakSlide3.jpg",
      titulo: 'Kapak shop'
    }
  ];

  constructor() {}
  ngOnInit() {
  }

}
