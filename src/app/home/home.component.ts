import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;

  constructor(private dishservice: DishService,    /* Constructor required for DI - not much else */
	private promotionservice: PromotionService) { } 

/* Ask dish.service to fetch the Featured Dish */ 
 ngOnInit() {
	  this.dish = this.dishservice.getFeaturedDish();
	  this.promotion = this.promotionservice.getFeaturedPromotion();
  }

}
