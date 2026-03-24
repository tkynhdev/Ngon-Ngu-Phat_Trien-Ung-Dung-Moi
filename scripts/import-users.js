const mongoose = require('mongoose');
const roleModel = require('../schemas/roles');
const userController = require('../controllers/users');
const { sendMail } = require('../utils/mailHandler');
const { generateRandomPassword } = require('../utils/passwordGenerator');

const USERS = [...Array(99).keys()].map(i => {
  const n = i + 1;
  const username = `user${n.toString().padStart(2, '0')}`;
  return { username, email: `${username}@haha.com` };
});

async function getRoleUserId() {
  let role = await roleModel.findOne({ name: 'user', isDeleted: false });
  if (!role) {
    role = await roleModel.create({ name: 'user', description: 'Normal user role' });
    console.log('Role user created:', role._id);
  }
  return role._id;
}

async function main() {
  const uri = 'mongodb://localhost:27017/NNPTUD-S3';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB', uri);

  const roleId = await getRoleUserId();

  for (const { username, email } of USERS) {
    try {
      const password = generateRandomPassword(16);
      const existingUser = await userController.FindUserByUsername(username);
      if (existingUser) {
        console.log(`Skip existing username=${username}`);
        continue;
      }
      const existingEmail = await userController.FindUserByEmail(email);
      if (existingEmail) {
        console.log(`Skip existing email=${email}`);
        continue;
      }

      const newUser = await userController.CreateAnUser(username, password, email, roleId);
      console.log(`Created user ${username} (${email})`);

      await sendMail({
        to: email,
        subject: 'Welcome to NNPTUD-S3: your account is created',
        text: `Hello ${username},\n\nYour account has been created.\nUsername: ${username}\nPassword: ${password}\n\nPlease log in and change your password.`,
        html: `<p>Hello <strong>${username}</strong>,</p><p>Your account has been created.</p><p><b>Username:</b> ${username}<br><b>Password:</b> ${password}</p><p>Please log in and change your password.</p>`
      });

      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error(`Failed user ${username}:`, error.message || error);
    }
  }

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
