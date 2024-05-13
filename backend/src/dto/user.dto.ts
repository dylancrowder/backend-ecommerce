export default class UserDTO {
  email: string;
  user_name: string;
  age: number;
  role?: string;

  constructor(email: string, user_name: string, age: number, role?: string) {
    this.email = email;
    this.user_name = user_name;
    this.age = age;
    this.role = role;
  }
}
