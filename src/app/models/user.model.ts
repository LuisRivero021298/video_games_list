export class UserModel {
	username: string;
	email: string;
	password: string;
	photo: string;
	birthdate: string;

	constructor({username = null, email = null, password = null, photo = null, birthdate = null}){
		this.username = username;
		this.email = email;
		this.password = password;
		this.photo = photo;
		this.birthdate = birthdate;
	}
}