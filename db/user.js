import {model, plugin, pre} from 'mongoose-decorators';
import bcrypt from 'mongoose-bcrypt';
import Email from 'mongoose-type-email';
import {omit} from 'lodash';

@model({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: Email,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
})
@plugin(bcrypt, {
	fields: ['password'],
	rounds: 10
})
export default class User {
	cleanObj() {
		return omit(this.toObject(), ['password', '__v']);
	}
}
