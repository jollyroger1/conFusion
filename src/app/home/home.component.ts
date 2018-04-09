import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishservice: DishService,    /* Constructor required for DI - not much else */
	private promotionservice: PromotionService,
	private leaderservice: LeaderService) { } 

/* Use services to fetch data */ 
 ngOnInit() {
	 /*  this.dishservice.getFeaturedDish().then(dish => this.dish = dish); */ /* Refactor from Promise to Observable */
	  this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish);
	  /* this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion = promotion); */ /* Refactor from Promise to Observable */
	  this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion); 
	  /* this.leaderservice.getFeaturedLeader().then(leader => this.leader = leader); */ /* Refactor from Promise to Observable */
	  this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader);
  }

}
