const { getRolesByUser } = require("../database/user")


const authRole =  (role, id) => {
    // const roles = await getRolesByUser(id)
    const roles = [{role: 'admin'}]
    return (req, res, next) => {
        let flag = false; // solution of "Cannot set headers after they are sent to the client"
        roles.forEach(el => {
            if(role === el.role) { 
                flag = true; 
                next()
            }
        });
        if ( !flag ) {
            res.status(403)
            return res.json({
                success: false,
                message: 'You are not allowed'
            })
        }
    }
}

module.exports = {
    authRole,
}