const { Model } = require('objection');

class Login extends Model {

  static get tableName() {
    return 'users';
  }

  static get userIdColumn() {
    return 'userId';
  }

  static get userNameColumn() {
    return 'userName';
  }

  static get emailColumn() {
    return 'email';
  }

  static get DOBColumn() {
    return 'DOB';
  }

  static get userPasswordColumn() {
    return 'userPassword';
  }

  static get profile_pictureColumn(){
    return 'profile_picture'
  }
}

module.exports = Login;