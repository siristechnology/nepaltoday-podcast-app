import React from 'react';
import { 
    TouchableOpacity, Platform, View, Text    
} from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';
import Icon from '~/components/common/Icon';
import CONSTANTS from '~/utils/CONSTANTS';
import { getRelativeTime } from '~/utils/time';

const Container = styled(TouchableOpacity).attrs({
	activeOpacity: 0.6,
})`
	margin-top: 5px;
	padding-left: 15px;
	padding-right: 15px;
	padding-top: 10px;
	padding-bottom: 10px;
	border-color: #e0e0e0;
	border-bottom-width: 0.2px;
`

const TitleRow = styled(View)`
    flex-direction: row;
    /* align-items: center; */
    margin-right: 80px;
`;

const Title = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    opacity: 0.8;
    color: ${({ theme }) => theme.colors.textColor};
`;

const Description = styled(Text).attrs({
    numberOfLines: 2
})`
    font-size: 15px;
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textColor};
`

const PodcastImage = styled(FastImage).attrs(({ uri }) => ({
    source: {uri},
}))`
    width: 80;
    height: 80;
    border-radius: 5px;
    margin-right: 10px;
`;

const DurationView = styled(TouchableOpacity).attrs({
    activeOpacity: 0.6
})`
    width: 90px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 5px;
    border-radius: 15px;
    padding: 2px;
    border-color: #757575;
    border-width: 1px;
`;

const DurationText = styled(Text)`
    font-size: 13px;
    opacity: 0.7;
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.textColor};
`;

const BottomRow = styled(View)`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;    
`

const AuthorInfo = styled(View)`
    flex-direction: row;
    align-items: center;
    margin-right: 30px;
`

const AuthorImage = styled(FastImage).attrs(({ uri }) => ({
    source: {uri},
}))`
    width: 25;
    height: 25;
    border-radius: 15px;
    margin-right: 10px;
    margin-left: 10px;
`;

const AuthorText = styled(Text)`
    font-size: 15px;
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textColor};
`

const SourceTimeText = styled(Text)`
    margin-left: 5px;
    font-size: 13px;
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
    podcastDetail: Object,
    isLastIndex: boolean,
    onPress: Function
}

const PodcastListItem = ({
    podcastDetail,
    isLastIndex,
    onPress,
    navigation
}: Props): Object => {
    return(
    <Container
        isLastIndex={isLastIndex}
        onPress={onPress}
    >
        <TitleRow>
            <PodcastImage
                uri={podcastDetail.imageURL}
            />
            <View>
                <Title>
                    {podcastDetail.title}
                </Title>
                <Description>
                    {podcastDetail.description.slice(0,100)+'..'}
                </Description>
                <DurationView
                    onPress={()=>navigation.navigate(CONSTANTS.ROUTES.PLAYER, {
                        [CONSTANTS.PARAMS.PLAYER]: {
                          [CONSTANTS.KEYS.PLAYLIST]: [podcastDetail],
                        }
                    })}
                >
                    <Icon
                        name="play-circle-outline"
                        size={20}
                    />
                    <DurationText>
                        {podcastDetail.duration}
                    </DurationText>
                </DurationView>
            </View>
        </TitleRow>
        <BottomRow>
            <AuthorInfo>
                <AuthorImage
                    uri={podcastDetail.author.profileImageURL}
                />
                <AuthorText>
                    {podcastDetail.author.name}
                </AuthorText>
            </AuthorInfo>
            <Icon
                name="clock-outline"
                size={17}
            />
            <SourceTimeText>
                {getRelativeTime(podcastDetail.createdDate)}
            </SourceTimeText>
        </BottomRow>
    </Container>
)}


export default PodcastListItem;