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
}