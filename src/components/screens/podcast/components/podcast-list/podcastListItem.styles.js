import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components'
import FastImage from 'react-native-fast-image'

export const Container = styled(View).attrs({
	activeOpacity: 0.6,
})`
	margin-top: 5px;
	padding-left: 15px;
	padding-right: 5px;
	padding-top: 5px;
	padding-bottom: 5px;
`

export const TitleRow = styled(View)`
	width: 100%;
	flex-direction: row;
	align-items: stretch;
	justify-content: space-between;
`

export const LeftWrapper = styled(TouchableOpacity)`
	width: 70%;
	flex-direction: row;
	align-items: flex-start;
	margin-right: 5px;
`

export const TitleWrapper = styled(View)`
	align-items: flex-start;
	margin-left: 5px;
	margin-right: 15px;
`

export const Title = styled(Text)`
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
	align-items: center;
	justify-content: center;
	opacity: 0.8;
	margin-top: 4px;
	color: ${({ theme }) => theme.colors.textColor};
`

export const RightButtonWrapper = styled(TouchableOpacity)`
	opacity: 0.7;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
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
	font-size: 14px;
	margin-left: 4px;
	color: ${({ theme }) => theme.colors.textColor};
`

export const DurationText = styled(Text)`
	font-size: 14px;
	opacity: 0.8;
	margin-left: 4px;
	color: ${({ theme }) => theme.colors.subTextColor};
`