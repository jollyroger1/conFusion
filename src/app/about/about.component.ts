import { Component, OnInit, Inject } from '@angular/core';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';


import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
	'[@flyInOut]': 'true',
	'style': 'display: block;'
  },
  animations: [
	flyInOut(),
	expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  leadersErrMess: string;
  
  constructor(	private leaderservice: LeaderService,
				private restangular: Restangular,
				private processHTTPMsgService: ProcessHTTPMsgService,
				@Inject('BaseURL') private BaseURL)				{ }

  ngOnInit() {
	/* this.leaderservice.getLeaders().then(leaders => this.leaders = leaders); */ /* Refactor from Promise to Observable */
	  this.leaderservice.getLeaders().subscribe(leaders => this.leaders = leaders, /* getLeaders() Restangular call in LeaderService */
		errmess => this.leadersErrMess = <any>errmess);
  } 

}
