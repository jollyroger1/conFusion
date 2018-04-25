import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

/* import 'rxjs/add/operator/toPromise'; */
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';


@Injectable()
export class LeaderService {

  constructor(	private restangular: Restangular,
				private processHTTPMsgService: ProcessHTTPMsgService) { }

/*   getLeaders(): Leader[] { */ /* Refactor for Promises*/
	/* getLeaders(): Promise<Leader[]> { */ /* Refactor to Observable */
	getLeaders(): Observable<Leader[]> {
	  /* return new Promise(resolve => { */
		  /* Simulate server latency with 2 second delay */
		  /* setTimeout(() => resolve(LEADERS), 2000);
	  }); */
	  /* return Observable.of(LEADERS).delay(2000); */ /* Refactor for Restangular */
	  return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
	  /* return new Promise(resolve => { */
		  /* Simulate server latency with 2 second delay */
		  /* setTimeout(() => resolve(LEADERS.filter((lead) => (lead.id === id))[0]), 2000);
		}); */
/* 		return Observable.of(LEADERS.filter((lead) => (lead.id === id))[0]).delay(2000); */
		return this.restangular.one('leaders ',id).get();
  }
  
  getFeaturedLeader(): Observable<Leader> {
	  /* return new Promise(resolve => { */
		  /* Simulate server latency with 2 second delay */
		  /* setTimeout(() => resolve(LEADERS.filter((leader) => (leader.featured))[0]), 2000);
  }); */
		/* return Observable.of(LEADERS.filter((leader) => (leader.featured))[0]).delay(2000); */  /* Refactor for Restangular */
		return this.restangular.all('leaders').getList({featured: true}).map(res => res[0]);
  } 
}




