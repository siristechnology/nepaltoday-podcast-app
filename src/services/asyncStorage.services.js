import AsyncStorage from '@react-native-community/async-storage'

const USER_INFO = "USER_INFO"

const setUserInfo = (data) => {
    AsyncStorage.setItem(USER_INFO, JSON.stringify(data))
}

const getUserInfo = async () => {
    const userInfo = await AsyncStorage.getItem(USER_INFO)
    return JSON.parse(userInfo)
}

const clearUserInfo = () => {
    AsyncStorage.removeItem(USER_INFO)
}

export {
    setUserInfo,
    getUserInfo,
    clearUserInfo
}