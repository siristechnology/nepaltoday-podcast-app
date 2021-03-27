import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import DefaultText from './DefaultText'
import appStyles from '~/styles'
import { googleLogin } from './loginHelper'
import crashlytics from '@react-native-firebase/crashlytics'
import UserService from '~/services/user.services'
import { setUserInfo } from '~/services/asyncStorage.services'

const GetStartedButton = styled(TouchableOpacity)`
	width: 100%;
	height: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.primaryColor};
`

const BottomContent = (props) => {
	const onGoogleLoginClick = async () => {
		googleLogin()
			.then((res) => {
				UserService.googleSignin(res.accessToken)
					.then((response) => {
						setUserInfo(response)
						props.onNavigateToMainStack()
					})
					.catch((err) => {
						crashlytics().recordError(err)
						alert('google login failed', JSON.stringify(err))
					})
			})
			.catch((err) => {
				crashlytics().recordError(err)
				alert('google login failed', JSON.stringify(err))
			})
	}

	return (
		<GetStartedButton onPress={onGoogleLoginClick}>
			<DefaultText color={appStyles.colors.white} text="Login using Google" />
		</GetStartedButton>
	)
}

export default BottomContent
