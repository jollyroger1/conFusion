import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'; /* Required to fix ERROR 'Property 'map' does not exist on type 'Observable<Response>'. */

@Injectable()
export class DishService {

/*   constructor() { } */ /* Update constructor to handle HTTP */
  constructor(	private http: Http,
				private processHTTPMsgService: ProcessHTTPMsgService) { }
getDishes(): Observable<Dish[]> { /* Promise has been refactored to Observable - this method returns data to the component */
    /* return Observable.of(DISHES).delay(2000); */ /* Refactor for HTTP Server-side processing*/
	return this.http.get(baseURL + 'dishes') /* HTTP returns an Observable and then handled by .map operator. */
		.map(res => { return this.processHTTPMsgService.extractData(res); })
		.catch(error => { return this.processHTTPMsgService.handleError(error);});
  }

  getDish(id: number): Observable<Dish> {
	/* return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000); */ /* Refactor for HTTP */
	return this.http.get(baseURL + 'dishes/' + id)
	.map(res => { return this.processHTTPMsgService.extractData(res); })
	.catch(error => { return this.processHTTPMsgService.handleError(error);});
  }

  getFeaturedDish(): Observable<Dish> {
    /* return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000); */ /* Refactor for HTTP */
	return this.http.get(baseURL + 'dishes?featured=true')
	.map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
	.catch(error => { return this.processHTTPMsgService.handleError(error);});
  }
  
  /* getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) })
	  .catch(error => { return error; });
  } */
  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) })
      /* .catch(error => { return error; } ); */  /* This code from course does NOT work - see solution below */
	  .catch(error => { return Observable.of(error); }); /* Solution */
  }
  
 }
 