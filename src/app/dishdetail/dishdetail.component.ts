import { Component, OnInit, Input} from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';  /* Formatting for dish elements */
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap'; 

/* const DISH = {
  name: 'Uthappizza',
  image: '/assets/images/uthappizza.png',
  category: 'mains',
  label: 'Hot',
  price: '4.99',
  description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
  comments: [
    {
      rating: 5,
      comment: "Imagine all the eatables, living in conFusion!",
      author: "John Lemon",
      date: "2012-10-16T17:57:28.556094Z"
    },
    {
      rating: 4,
      comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
      author: "Paul McVites",
      date: "2014-09-05T17:57:28.556094Z"
    },
    {
      rating: 3,
      comment: "Eat it, just eat it!",
      author: "Michael Jaikishan",
      date: "2015-02-13T17:57:28.556094Z"
    },
    {
      rating: 4,
      comment: "Ultimate, Reaching for the stars!",
      author: "Ringo Starry",
      date: "2013-12-02T17:57:28.556094Z"
    },
    {
      rating: 2,
      comment: "It's your birthday, we're gonna party!",
      author: "25 Cent",
      date: "2011-12-02T17:57:28.556094Z"
    }
  ]
}; */


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
	 /* this.dishservice.getDish(id).subscribe(dish => this.dish = dish); */
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
