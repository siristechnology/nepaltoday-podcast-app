import api from "./api"

export default class UserService{
    static facebookSignin(accessToken){
        return new Promise((resolve, reject) => {
            api.post('/user', {
                accessToken,
                provider: 'facebook'
            }).then(response=> {
                resolve(response)
            }).catch(err=> {
                reject(err)
            })
        })
    }

    static googleSignin(accessToken){
        return new Promise((resolve, reject) => {
            api.post('/user', {
                accessToken,
                provider: 'google'
            }).then(response=> {
                resolve(response)
            }).catch(err=> {
                reject(err)
            })
        })
    }

}