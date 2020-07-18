export class UserModel {
  id: string;
  username: string;
  email: string;
  password: string;
  photo: string;
  birthdate: string;

  constructor({
    id = null,
    username = null,
    email = null,
    password = null,
    photo = null,
    birthdate = null,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.photo = photo;
    this.birthdate = birthdate;
  }
}

