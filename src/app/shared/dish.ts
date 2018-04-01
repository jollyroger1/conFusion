import { Comment } from './comment'; /* Class for comment data types */

export class Dish {
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    description: string;
	comments: Comment[];
}
