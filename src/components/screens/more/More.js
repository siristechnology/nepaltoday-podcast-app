import React, { Component } from 'react'
import { TouchableOpacity, ScrollView, Platform, Text, View } from 'react-native'
import styled from 'styled-components'
import { GoogleSignin } from '@react-native-community/google-signin'

import { getItemFromStorage, persistItemInStorage } from '~/utils/AsyncStorageManager'
import ThemeContextConsumer from '~/ThemeContextProvider'
import ScreenTitle from '~/components/common/ScreenTitle'
import Switch from '~/components/common/Switch'
import Icon from '~/components/common/Icon'
import CONSTANTS from '~/utils/CONSTANTS'
import appStyles from '~/styles'
import { clearUserInfo } from '~/services/asyncStorage.services'

const Wrapper = styled(ScrollView).attrs({
	alwaysBounceVertical: false,
})`
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.colors.secondaryColor};
`

const OptionsWrapper = styled(View)`
	width: 100%;
	margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
	padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`

const Row = styled(View)`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const TextWrapper = styled(View)`
	width: 75%;
	margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize * 1.5}px;
`

const OptiontTitle = styled(Text)`
	margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
	font-family: CircularStd-Bold;
	font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
	color: ${({ theme }) => theme.colors.textColor};
`

const OptionDescription = styled(Text)`
	font-family: CircularStd-Medium;
	font-size: ${({ theme }) => theme.metrics.mediumSize * 1.3}px;
	color: ${({ theme }) => theme.colors.subTextColor};
`

const DARK_THEME_STATE_REF = 'DARK_THEME_STATE_REF'

const STORAGE_KEYS = {
	DOWNLOAD_MOBILE_DATA: 'DOWNLOAD_MOBILE_DATA',
	OFFLINE_MODE: 'OFFLINE_MODE',
	AUTO_PLAY: 'AUTO_PLAY',
}

type Props = {
	LOCAL_STACK_ROUTES: Object,
	navigation: Object,
}

type State = {
	shouldDownloadMobileData: boolean,
	isOfflineModeOn: boolean,
	isAutoPlayOn: boolean,
}

const darkThemeSetting = {
	title: 'Dark Theme',
	description: 'Activate the Dark theme (the Light Theme will be activated otherwise).',
	stateReference: DARK_THEME_STATE_REF,
}

class Profile extends Component<Props, State> {
	state = {
		shouldDownloadMobileData: false,
		isOfflineModeOn: false,
		isAutoPlayOn: false,
	}

	async componentDidMount() {
		const [shouldDownloadMobileData, isOfflineModeOn, isAutoPlayOn] = await Promise.all([
			getItemFromStorage(STORAGE_KEYS.DOWNLOAD_MOBILE_DATA, false),
			getItemFromStorage(STORAGE_KEYS.OFFLINE_MODE, false),
			getItemFromStorage(STORAGE_KEYS.AUTO_PLAY, false),
		])

		this.setState({
			shouldDownloadMobileData: shouldDownloadMobileData === 'true',
			isOfflineModeOn: isOfflineModeOn === 'true',
			isAutoPlayOn: isAutoPlayOn === 'true',
		})
	}

	onToggleSwitch = async (stateReference: string, storageKey: string): void => {
		const currentOptionValue = this.state[stateReference]

		this.setState({
			[stateReference]: !currentOptionValue,
		})

		await persistItemInStorage(storageKey, !currentOptionValue)
	}

	onSignoutPress = async () => {
		await GoogleSignin.revokeAccess()
		await GoogleSignin.signOut()
		clearUserInfo()
		this.props.navigation.dangerouslyGetParent().navigate('LOGIN')
	}

	render() {
		const { navigation } = this.props

		return (
			<Wrapper>
				<ScreenTitle title="Profile & Settings" />
				<ThemeContextConsumer>
					{(context) => {
						const { onToggleDarkTheme, isDarkThemeActivated } = context

						return (
							<OptionsWrapper>
								<TouchableOpacity
									onPress={() => {
										const { LOCAL_STACK_ROUTES } = this.props
										navigation.navigate(LOCAL_STACK_ROUTES.PODCASTS_DOWNLOADED)
									}}
									hitSlop={{
										bottom: appStyles.metrics.smallSize,
										right: appStyles.metrics.smallSize,
										left: appStyles.metrics.smallSize,
										top: appStyles.metrics.smallSize,
									}}
								>
									<Row>
										<TextWrapper>
											<OptiontTitle>Downloads</OptiontTitle>
											<OptionDescription>Downloaded Podcasts</OptionDescription>
										</TextWrapper>
										<Icon
											color={appStyles.colors.subTextWhite}
											name={Platform.OS === 'android' ? 'arrow-right' : 'chevron-right'}
											size={Platform.OS === 'android' ? 32 : 34}
										/>
									</Row>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										const { LOCAL_STACK_ROUTES } = this.props
										navigation.navigate(LOCAL_STACK_ROUTES.RECENTLY_PLAYED)
									}}
									hitSlop={{
										bottom: appStyles.metrics.smallSize,
										right: appStyles.metrics.smallSize,
										left: appStyles.metrics.smallSize,
										top: appStyles.metrics.smallSize,
									}}
								>
									<Row>
										<TextWrapper>
											<OptiontTitle>Recently Played</OptiontTitle>
											<OptionDescription>Recently Played Podcasts</OptionDescription>
										</TextWrapper>
										<Icon
											color={appStyles.colors.subTextWhite}
											name={Platform.OS === 'android' ? 'arrow-right' : 'chevron-right'}
											size={Platform.OS === 'android' ? 32 : 34}
										/>
									</Row>
								</TouchableOpacity>

								<Row key={darkThemeSetting.title}>
									<TextWrapper>
										<OptiontTitle>{darkThemeSetting.title}</OptiontTitle>
										<OptionDescription>{darkThemeSetting.description}</OptionDescription>
									</TextWrapper>
									<Switch
										onToggle={() => {
											const onToggle =
												darkThemeSetting.stateReference === DARK_THEME_STATE_REF
													? onToggleDarkTheme
													: () => this.onToggleSwitch(darkThemeSetting.stateReference, darkThemeSetting.storageKey)

											onToggle()
										}}
										value={
											darkThemeSetting.stateReference !== DARK_THEME_STATE_REF
												? this.state[darkThemeSetting.stateReference]
												: isDarkThemeActivated
										}
									/>
								</Row>

								<TouchableOpacity
									onPress={() => {
										const { LOCAL_STACK_ROUTES } = this.props
										navigation.navigate(LOCAL_STACK_ROUTES.ABOUT)
									}}
									hitSlop={{
										bottom: appStyles.metrics.smallSize,
										right: appStyles.metrics.smallSize,
										left: appStyles.metrics.smallSize,
										top: appStyles.metrics.smallSize,
									}}
								>
									<Row>
										<TextWrapper>
											<OptiontTitle>About</OptiontTitle>
											<OptionDescription>Want to know more about the Creator of this App? Check it out!</OptionDescription>
										</TextWrapper>
										<Icon
											color={appStyles.colors.subTextWhite}
											name={Platform.OS === 'android' ? 'arrow-right' : 'chevron-right'}
											size={Platform.OS === 'android' ? 32 : 34}
										/>
									</Row>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={this.onSignoutPress}
									hitSlop={{
										bottom: appStyles.metrics.smallSize,
										right: appStyles.metrics.smallSize,
										left: appStyles.metrics.smallSize,
										top: appStyles.metrics.smallSize,
									}}
								>
									<Row>
										<TextWrapper>
											<OptiontTitle>Sign out</OptiontTitle>
											<OptionDescription>Log out from your current account</OptionDescription>
										</TextWrapper>
										<Icon color={appStyles.colors.subTextWhite} name="logout" size={Platform.OS === 'android' ? 32 : 34} />
									</Row>
								</TouchableOpacity>
							</OptionsWrapper>
						)
					}}
				</ThemeContextConsumer>
			</Wrapper>
		)
	}
}

export default Profile
