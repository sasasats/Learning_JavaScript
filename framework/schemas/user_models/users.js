import Statuscode from "../../enums/statuscodes.js";
import Endpoint from "../../enums/endpoints.js";
import AssertUils from "../../utils/assert.uils.js";
import User from "./user.js";

export default class Users {
  constructor(users) {
    this.users = users;
  }

  getUser(id) {
    for(let user of this.users) {
      if(user.id == id){
        return user;
      }
    }
  }

  static async getUsers() {
    const response = await fetch(Endpoint.URL + Endpoint.USERS);
    AssertUils.isStatuscodeCorrect(response, Statuscode.OK)
    let users = [];
    for (let user of await response.json()) {
      users.push(new User(user))
    }
    return new Users(users);
  }
}