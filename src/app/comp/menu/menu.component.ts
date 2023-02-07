import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  pizza =[
    {id:1, name: "Margherita", price: 13.55 , vegetarian:"Yes", image:'/assets/banner.jpg',toppings:"Tomato sauce, mozzarella, basil " },
    {id:2, name: "Margherita", price: 13.55 , vegetarian:"Yes", image:'/assets/banner.jpg',toppings:"Tomato sauce, mozzarella, basil " },
    {id:3, name: "Margherita", price: 13.55 , vegetarian:"Yes", image:'/assets/banner.jpg',toppings:"Tomato sauce, mozzarella, basil " },
    {id:4, name: "Margherita", price: 13.55 , vegetarian:"Yes", image:'/assets/banner.jpg',toppings:"Tomato sauce, mozzarella, basil " },
    {id:5, name: "Margherita", price: 13.55 , vegetarian:"Yes", image:'/assets/banner.jpg',toppings:"Tomato sauce, mozzarella, basil " },
    {id:6, name: "Margherita", price: 13.55 , vegetarian:"Yes", image:'/assets/banner.jpg',toppings:"Tomato sauce, mozzarella, basil " },
  ]
}
