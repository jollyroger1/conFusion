import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish'; /* Dish is the Class containing the data types */
import { DISHES } from '../shared/dishes'; /* DISHES is the array of json meals and related criteria */

@Injectable()
export class DishService {

  constructor() { }
  
  /* getDishes(): Dish[] { */ /* Return a Promise instead */
	/* getDishes(): Promise<Dish[]> {
	  /* return DISHES; */
	  /* return Promise.resolve(DISHES);
  }

  getDish(id: number): Promise<Dish[]>{
	  return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }
  
  getFeaturedDish(): Dish{
	  return Promise.resolve(DISHES.filter((dish) => (dish.featured))[0]);
  }  */
  
  
  
  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }

  getDish(id: number): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}

 