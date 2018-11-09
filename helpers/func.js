const models = require('./../models/index')
async function userProf(req) {
    let isEmpty = (myObject) => {
    for(var key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return false;
        }
    }    
    return true;
    }
    let userName
    if((req.session.passport != undefined) && !isEmpty(req.session.passport)) {
        userName = await models.users.findByPk(req.session.passport.user.id)
        userName = userName.nickname
        userScore = await models.users.getScore(req.session.passport.user.id)
    }
    else {
        userName = false
        userScore = false
    }
    return {nickname: userName, score: userScore}
}
module.exports = userProf