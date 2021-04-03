import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'

export const Container = styled(View).attrs({
	activeOpacity: 0.6,
})`
	margin-top: 10px;
	margin-bottom: 10px;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 5px;
	padding-bottom: 5px;
	flex-direction: row;
	align-items: stretch;
	justify-content: space-between;
`

export const LeftWrapper = styled(TouchableOpacity)`
	flex-grow: 1;
	flex-direction: row;
	align-items: center;
	margin-right: 5px;
`

export const TitleWrapper = styled(View)`
	flex: 1;
	align-items: flex-start;
	margin-left: 5px;
`

export const Title = styled(Text).attrs({
	numberOfLines: 2,
})`
	font-size: 18px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.textColor};
`

export const Description = styled(Text).attrs({
	numberOfLines: 2,
})`
	font-size: 15px;
	color: ${({ theme }) => theme.colors.subTextColor};
`

export const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
	source: { uri },
}))`
	width: 80;
	height: 80;
	border-radius: 5px;
	margin-right: 10px;
`

export const RelativeTimeWrapper = styled(View)`
	flex-direction: row;
	opacity: 0.8;
	font-size: 12px;
	color: ${({ theme }) => theme.colors.subTextColor};
`

export const RightButtonWrapper = styled(TouchableOpacity)`
	opacity: 0.9;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const SourceTimeText = styled(Text)`
	font-size: 14px;
	margin-left: 2px;
	color: ${({ theme }) => theme.colors.subTextColor};
`

export const DurationText = styled(Text)`
	font-size: 14px;
	opacity: 0.8;
	margin-left: 4px;
	color: ${({ theme }) => theme.colors.subTextColor};
`