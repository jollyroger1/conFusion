import { Component, OnInit, Inject } from '@angular/core'; /* Use Inject interface for injecting BaseURL which is provided in app-module */

import { Dish } from '../shared/dish'; /* Class of data types for a dish */
/* import { DISHES } from '../shared/dishes'; */  /* Array of json 4 dishes */ /* Use Service instead */
import {DishService } from '../services/dish.service'; /* Service that returns array of json dishes */


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  /* dishes: Dish[] = DISHES; */ /*TypeScript intelligent enough to interpret following line as this line. */
  /* dishes = DISHES; */
  dishes: Dish[];
  errMess: string;
  
  /* selectedDish: Dish = DISHES[0]; */
  /* selectedDish: Dish; */ /* no longer required as data fetched via HTTP server-side */ 

  constructor(	private dishService: DishService, /* Constructor required for DI - not much else */
				@Inject('BaseURL') private BaseURL ) { }  /* @Inject decorator use to inject a Value as opposed to injecting a service */

  /* LifeCycle Method */
  ngOnInit() {
	  /* Ask dish.service to fetch array of json (all) Dishes */
	  this.dishService.getDishes()
		/* .then(dishes => this.dishes = dishes ); */ /* Refactor from Promise to Observable */
		.subscribe(dishes => this.dishes = dishes,
			errmess => this.errMess = <any>errmess);
  }

  /* onSelect(dish: Dish){
	  this.selectedDish = dish;
  } */
  
}
