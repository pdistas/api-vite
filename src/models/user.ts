export class User {
  name: string;
  birth: Date;
  email: string;
  password: string;

  constructor(name: string, birth: Date, email: string, password: string) {
    this.name = name;
    this.birth = birth;
    this.email = email;
    this.password = password;
  }

  getAge(): number {
    const now = new Date();
    const age = now.getFullYear() - this.birth.getFullYear();

    if (
      now.getMonth() < this.birth.getMonth() &&
      now.getDay() < this.birth.getDay()
    ) return age - 1;

    return age;
  }
}
