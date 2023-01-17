export default class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.address = data.address
    this.phone = data.phone;
    this.website = data.website;
    this.company = data.company;
  }
}