import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Feedback} from "../shared/feedback";
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Http, Response } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';


@Injectable()
export class FeedbackService {

  constructor(	private restangular: Restangular,
				private processHTTPMsgService: ProcessHTTPMsgService) { }
		
			submitFeedback(feedBack): Observable<Feedback>{
				return this.restangular.all('feedback').post(feedBack);
			}
}
