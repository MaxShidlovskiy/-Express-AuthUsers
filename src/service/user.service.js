const { createUserDB, getUserByEmailDB } = require(`../repository/user.repository`);
const bcrypt = require(`bcrypt`);

const salt = 3;

async function createUser(name, surname, email, pwd) {

    const foundUser = await getUserByEmailDB(email);
    if (foundUser.length) throw new Error(`такой пользователь уже есть`);

    const hashPwd = await bcrypt.hash(pwd, salt);
    const data = await createUserDB(name, surname, email, hashPwd);
    if (!data.length) throw new Error(`пользователь не сохранен`);
    return data;
}

async function authorizationUser(email, pwd) {

    const foundUser = await getUserByEmailDB(email);
    if (!foundUser.length) throw new Error(`user not exist`);

    const isMatched = await bcrypt.compare(pwd, foundUser[0].pwd);
    if (!isMatched) throw new Error(`password is wrong`);
    return foundUser;
}


module.exports = { createUser , authorizationUser}