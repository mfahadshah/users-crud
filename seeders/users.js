const bcrypt = require('bcryptjs');
const User = require('../models/User');

const CreateDummyUsers = async (numOfUsers) => {
  const users=[]
  const salt = await bcrypt.genSalt(10);
  let password= await bcrypt.hash('123', salt)
  for (let i = 0; i <= numOfUsers; i++){
    users.push(
      {
        name: "Fahad Shah",
        email: `fahad+${i}@gmail.com`,
        password,
        phoneNo: "923211234567",
        role: "basic",
      })
  }
  users.at(0).role="admin" //update first user to admin
  return users
}
const seedUsersDB = async (numOfUsers) => {
  try {
    let seedUsers = await CreateDummyUsers(numOfUsers || 100)
    await User.deleteMany({});
    await User.insertMany(seedUsers);
  } catch (err) {
    console.log('error while seeding users');
  }
};

module.exports = { seedUsersDB };
