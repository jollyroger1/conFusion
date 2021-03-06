import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish'; /* Class of data types for a dish */
/* import { DISHES } from '../shared/dishes'; */  /* Array of json 4 dishes */ /* Use Service instead */
import {DishService } from '../services/dish.service'; /* Service that returns array of json dishes */

/* const DISHES: Dish[] = [
                         {
                           name:'Uthappizza',
                           image: '/assets/images/uthappizza.png',
                           category: 'mains',
                           label:'Hot',
                           price:'4.99',
                           description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
						   },
                        {
                           name:'Zucchipakoda',
                           image: '/assets/images/zucchipakoda.png',
                           category: 'appetizer',
                           label:'',
                           price:'1.99',
                           description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce'
						   },
                        {
                           name:'Vadonut',
                           image: '/assets/images/vadonut.png',
                           category: 'appetizer',
                           label:'New',
                           price:'1.99',
                           description:'A quintessential ConFusion experience, is it a vada or is it a donut?'
						   },
                        {
                           name:'ElaiCheese Cake',
                           image: '/assets/images/elaicheesecake.png',
                           category: 'dessert',
                           label:'',
                           price:'2.99',
                           description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms'
						   }
                        ]; */


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  /* dishes: Dish[] = DISHES; */ /*TypeScript intelligent enough to interpret following line as this line. */
  /* dishes = DISHES; */
  dishes: Dish[];
  
  /* selectedDish: Dish = DISHES[0]; */
  selectedDish: Dish;

  constructor(private DishService: DishService) { }  /* Constructor required for DI - not much else */

  /* LifeCycle Method */
  ngOnInit() {
	  /* Ask dish.service to fetch array of json (all) Dishes */
	  this.DishService.getDishes()
		/* .then(dishes => this.dishes = dishes ); */ /* Refactor from Promise to Observable */
		.subscribe(dishes => this.dishes = dishes );
  }

  onSelect(dish: Dish){
	  this.selectedDish = dish;
  }
  
}
