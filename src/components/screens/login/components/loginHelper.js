import { GoogleSignin } from '@react-native-community/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { WEB_CLIENT_ID } from 'react-native-dotenv';
GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID
});

const facebookLogin = () => new Promise((resolve, reject)=>{
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(result=>{
        if(!result.isCancelled){
            AccessToken.getCurrentAccessToken().then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err)
            })
        }else{
            reject({message: 'process cancelled'})
        }
    }).catch(err=>{
        reject(err)
    })
})

const googleLogin = async() => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn();
        const tokens = await GoogleSignin.getTokens() 
        return tokens
    } catch (error) {
          alert("Google login failed", error.code)
          throw error
        // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //   // user cancelled the login flow
        // } else if (error.code === statusCodes.IN_PROGRESS) {
        //   // operation (e.g. sign in) is in progress already
        // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //   // play services not available or outdated
        // } else {
        //   // some other error happened
        // }
    }
}

export {
    facebookLogin,
    googleLogin
}