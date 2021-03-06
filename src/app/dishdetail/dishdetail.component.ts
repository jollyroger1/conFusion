import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';  /* Formatting for dish elements */
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import 'rxjs/add/operator/switchMap'; 

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  dishdetailForm: FormGroup;
  comment: Comment;
  dish: Dish;  
  array_copy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errorMessage: string;
   
/* Assignment 3 */
  formErrors = {
	'author': '',
	'comment': ''
  };
  
  validationMessages = {  /* see angular.io for more on in-code Form Validation pattern */
	'author': {
		'required': 'Author is Required.',
		'minlength': 'Author name must be at least 2 characters long',
		'maxlength': 'Author name cannot be more than 25 characters long'
	},
	'comment': {
		'required': 'Comment is Required.',
		'minlength': 'Comment must be at least 2 characters'
	}
  };

 	constructor(private dishservice: DishService,
                private location: Location,
                private route: ActivatedRoute, 
				private fb: FormBuilder) {
				this.createForm();	
			    }	
			  
/* End Assignment 3 */

  /* Fetch the specific dish that was selected */
 ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
      .switchMap((params: Params) => {return this.dishservice.getDish(+params['id'])}) /* +params converts string value of 'id' to integer */
      .subscribe(dish => {
        this.dish = dish;
        this.array_copy = dish;
        this.setPrevNext(dish.id);
      }, errmsg => this.errorMessage = <any>errmsg);
  }
  
  setPrevNext(dishId: number) {
	  let index = this.dishIds.indexOf(dishId);
	  this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length]; /* wrap to last array index if currently [0] */
	  this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length]; /* wrap to [0] if at last array index */
  }

  goBack(): void {
	  this.location.back();
  }
  
  /* Assignment 3 continued */
  createForm(): void {
    this.dishdetailForm = this.fb.group({ /* Fields need not match sequence in feedback.ts but easier to read if done so */
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', [Validators.required, Validators.minLength(2)]],
	  rating: ['5'],
	  date: ['']
    });

	this.dishdetailForm.valueChanges
		.subscribe(data => this.onValueChanged(data));
		
	this.onValueChanged(); /*(re)set Form Validation Messages */
  }
  
  onValueChanged(data?: any) {
	  if (!this.dishdetailForm) { return; }
	  const form = this.dishdetailForm;
	  
	  for (const field in this.formErrors) {
		  this.formErrors[field] = '';
		  const control = form.get(field);
		  if (control && control.dirty && !control.valid) {
			  const messages = this.validationMessages[field];
			  for (const key in control.errors) {
				  this.formErrors[field] += messages[key] + ' ';
			  }
		  }
	  }
  }
  
  onSubmit() {
    this.comment = this.dishdetailForm.value;
	this.comment.date = (new Date()).toString();
	this.array_copy.comments.push(this.comment);
	this.dishdetailForm.reset({
		author: '',
		comment: '',
		rating: '5'
	});
  }
  /* End Assignment 3*/
}
