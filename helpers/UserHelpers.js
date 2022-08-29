const {getRolesByUser} = require('../database/user')

const _userWithoutPassword = (user) => {
    return new Promise((resolve, reject) => {
        const {password, ...newUser} = user;
        resolve(newUser)
    })
};

const _prepareUser = async (user) => {
    const roles = await getRolesByUser(user.id)
    const newUser = await _userWithoutPassword(user)
    let modifiedUser = {...newUser, roles : roles};
    console.table(modifiedUser)
    return modifiedUser;
}


module.exports = {
    _userWithoutPassword, 
    _prepareUser
}