import { Component, OnInit, Input} from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';  /* Formatting for dish elements */
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap'; 

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  /* @Input() */  /* No longer required - using routerLink instead */
  /* dish = DISH; */
    
  dish: Dish;  /* The array of 4 json dishes */
  dishIds: number[];
  prev: number;
  next: number;

  constructor(private dishservice: DishService, 
			  private route: ActivatedRoute,
			  private location: Location) { }

  /* Fetch the specific dish that was selected */
  ngOnInit() {
	 /* let id = + this.route.snapshot.params['id']; */ /* params is one type of observable i.e. :id */
	 this.dishservice.getDishIds() /* getDishIds is sending an observable and then we subscribe to it */
		.subscribe(dishIds => this.dishIds = dishIds);
	 this.route.params /* switchMap operator allows for use of params observable*/
		.switchMap((params: Params) => this.dishservice.getDish(+params['id']))
		.subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id)});
	 /* this.dishservice.getDish(id).then(dish => this.dish = dish);  *//* Refactor from Promise to Observable */
  }
  
  setPrevNext(dishId: number) {
	  let index = this.dishIds.indexOf(dishId);
	  this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length]; /* wrap to last array index if currently [0] */
	  this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length]; /* wrap to [0] if at last array index */
	  
  }

  goBack(): void {
	  this.location.back();
  }
  
}
