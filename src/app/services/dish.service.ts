import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish'; /* Dish is the Class containing the data types */
import { DISHES } from '../shared/dishes'; /* DISHES is the array of json meals and related criteria */

import { Observable } from 'rxjs/Observable';

/* import 'rxjs/add/operator/toPromise'; */
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> { /* Promise has been refactored to Observable */
    return Observable.of(DISHES).delay(2000);
  }

  getDish(id: number): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
  }

  getFeaturedDish(): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
  }
 }
 