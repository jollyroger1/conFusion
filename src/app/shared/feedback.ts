/* Reactive Forms: Structure of the Class that represents the Data Model corresponding to the Form Model */
export class Feedback {
	firstname: string;
	lastname: string;
	telnum: number;
	email: string;
	agree: boolean;
	contacttype: string;
	message: string;
};

export const ContactType = ['None','Tel','Email'];