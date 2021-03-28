import { GoogleSignin } from '@react-native-community/google-signin'
import crashlytics from '@react-native-firebase/crashlytics'
import { WEB_CLIENT_ID } from 'react-native-dotenv'

GoogleSignin.configure({
	webClientId: WEB_CLIENT_ID,
})

const googleLogin = async () => {
	try {
		await GoogleSignin.hasPlayServices()
		await GoogleSignin.signIn()
		const tokens = await GoogleSignin.getTokens()
		return tokens
	} catch (error) {
		crashlytics().recordError(error)
		alert('Google login failed')
		throw error
	}
}

export { googleLogin }
