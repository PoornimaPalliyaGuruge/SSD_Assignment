class Users {
  constructor(id, email, contact, password, status, totalcredit, userType) {
    this.id = id;
    this.email = email;
    this.contact = contact;
    this.password = password;
    this.status = status;
    this.totalcredit = totalcredit;
    this.userType = userType;
  }
}

module.exports = Users;
