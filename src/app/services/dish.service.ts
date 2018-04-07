import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish'; /* Dish is the Class containing the data types */
import { DISHES } from '../shared/dishes'; /* DISHES is the array of json meals and related criteria */

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    /* return Promise.resolve(DISHES); */
	return new Promise(resolve => {
		/* Simulate server latency with 2 second delay */
		setTimeout(() => resolve(DISHES), 2000);
	});
  }

  getDish(id: number): Promise<Dish> {
    return new Promise(resolve => {
		/* Simulate server latency with 2 second delay */
		setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
	});
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
		/* Simulate server latency with 2 second delay */
		setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
	});
  }
 }
 