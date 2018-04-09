import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup; /* Form Model that will host the Reactive Form */
  feedback: Feedback;
  contactType = ContactType;
  
  formErrors = {
	'firstname': '',
	'lastname': '',
	'telnum': '',
	'email': ''
  };
  
  validationMessages = {  /* see angular.io for more on in-code Form Validation pattern */
	'firstname': {
		'required': 'First Name is Required.',
		'minlength': 'First name must be at least 2 characters long',
		'maxlength': 'Last name cannot be more than 25 characters long'
	},
	'lastname': {
		'required': 'Last Name is Required.',
		'minlength': 'Last name must be at least 2 characters long',
		'maxlength': 'Last name cannot be more than 25 characters long'
	},
	'telnum': {
		'required': 'Telephone Number is Required.',
		'pattern': 'Telephone Number must contain only numbers.'
	},
	'email': {
		'required': 'Email is Required.',
		'email': 'Email not in valid format'
	},
  };

  constructor(private fb: FormBuilder) { 
	this.createForm();
  }

  ngOnInit() {
  }
  
   createForm(): void {
    this.feedbackForm = this.fb.group({ /* Fields need not match sequence in feedback.ts but better easier to read if done so */
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

		
	this.feedbackForm.valueChanges
		.subscribe(data => this.onValueChanged(data));
		
	this.onValueChanged(); /*(re)set Form Validation Messages */
  }
  
  onValueChanged(data?: any) {
	  if (!this.feedbackForm) { return; }
	  const form = this.feedbackForm;
	  
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
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
		firstname: '',
		lastname: '',
		telnum: '',
		email: '',
		agree: false,
		contacttype: 'None',
		message: ''
	});
  }
  
}
