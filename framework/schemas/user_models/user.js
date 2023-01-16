import Statuscode from "../../enums/statuscodes.js";
import Endpoint from "../../enums/endpoints.js";
import { expect } from "chai";

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

  static async getUser(userId) {
    const response = await fetch(Endpoint.URL + Endpoint.USERS + userId);
    expect(response.status).equals(Statuscode.OK);
    return new User(await response.json());
  }
}