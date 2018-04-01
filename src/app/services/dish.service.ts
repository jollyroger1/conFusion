import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish'; /* Dish is the Class containing the data types */
import { DISHES } from '../shared/dishes'; /* DISHES is the array of json meals and related criteria */

@Injectable()
export class DishService {

  constructor() { }
  
  getDishes(): Dish[] {
	  return DISHES;
  }

}
