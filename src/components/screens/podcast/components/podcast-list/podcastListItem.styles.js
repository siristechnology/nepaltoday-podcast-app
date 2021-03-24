import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'

export const Container = styled(View).attrs({
	activeOpacity: 0.6,
})`
	margin-top: 5px;
	padding-left: 15px;
	padding-right: 15px;
	padding-top: 10px;
	padding-bottom: 10px;
`

export const TitleRow = styled(View)`
	width: 100%;
	flex-direction: row;
	align-items: stretch;
	justify-content: space-around;
`

export const TitleWrapper = styled(TouchableOpacity)`
	width: 60%;
	align-items: flex-start;
	margin-left: 5px;
	margin-right: 15px;
`

export const Title = styled(Text)`
	font-size: 18px;
	font-weight: bold;
	opacity: 0.8;
	color: ${({ theme }) => theme.colors.textColor};
`

export const Description = styled(Text).attrs({
	numberOfLines: 2,
})`
	font-size: 15px;
	opacity: 0.7;
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

export const DurationText = styled(Text)`
	font-size: 13px;
	opacity: 0.8;
	color: ${({ theme }) => theme.colors.textColor};
`

export const RightButtonWrapper = styled(TouchableOpacity)`
	opacity: 0.9;
	flex-direction: column;
	justify-content: center;
`

export const BottomRow = styled(View)`
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
`

export const AuthorInfo = styled(View)`
	flex-direction: row;
	align-items: center;
	margin-right: 14px;
`

export const AuthorImage = styled(FastImage).attrs(({ uri }) => ({
	source: { uri },
}))`
	width: 25;
	height: 25;
	border-radius: 15px;
	margin-right: 4px;
	margin-left: 6px;
`

export const AuthorText = styled(Text)`
	font-size: 15px;
	opacity: 0.7;
	color: ${({ theme }) => theme.colors.subTextColor};
`

export const SourceTimeText = styled(Text)`
	margin-left: 5px;
	font-size: 13px;
	opacity: 0.7;
	color: ${({ theme }) => theme.colors.subTextColor};
`
