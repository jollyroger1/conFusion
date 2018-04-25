import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

/* import 'rxjs/add/operator/toPromise'; */
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class PromotionService {

  constructor(	private restangular: Restangular,
				private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  /* getPromotions(): Promotion[] { */ /* Refactor for Promises */
 /*  getPromotions(): Observable<Promotion[]> { */ /* Refactor to Observable */
  getPromotions(): Observable<Promotion[]> {
	  /* return new Promise(resolve => { */
		  /* Simulate server latency with 2 second delay */
		  /* setTimeout(() => resolve(PROMOTIONS), 2000);
		}); */
		/* return Observable.of(PROMOTIONS).delay(2000); */  /* Refactor for Restangular */
		return this.restangular.all('promotions').getList();
	}

  getPromotion(id: number): Observable<Promotion> {
	  /* return new Promise(resolve => { */
		  /* Simulate server latency with 2 second delay */
		  /* setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
		}); */
		/* return Observable.of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).delay(2000); */ /* Refactor for Restangular */
		return this.restangular.one('promotions',id).get();
	}	
  
  getFeaturedPromotion(): Observable<Promotion> {
	  /* return new Promise(resolve => { */
		  /* Simulate server latency with 2 second delay */
		  /* setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.featured))[0]), 2000);
	}); */
		/* return Observable.of(PROMOTIONS.filter((promotion) => (promotion.featured))[0]).delay(2000); */ /* Refactor for Restangular */
		return this.restangular.all('promotions').getList({featured: true}).map(res => res[0]);
	}
  }