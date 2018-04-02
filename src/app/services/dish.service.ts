import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish'; /* Dish is the Class containing the data types */
import { DISHES } from '../shared/dishes'; /* DISHES is the array of json meals and related criteria */

@Injectable()
export class DishService {

  constructor() { }
  
  getDishes(): Dish[] {
	  return DISHES;
  }

  getDish(id: number): Dish{
	  return DISHES.filter((dish) => (dish.id === id))[0];
  }
  
  getFeaturedDish(): Dish{
	  return DISHES.filter((dish) => (dish.featured))[0];
  }
  
}
