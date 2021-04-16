# NepalToday Podcast

<br/>
<div>
<img src="android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png" alt="screenshot-1" height="80" style="margin-right:10px"/>
<a href='https://play.google.com/store/apps/details?id=com.siristechnology.nepaltodaypodcast&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target='_blank' rel="noopener noreferrer"><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' height="80"/></a>
</div>

## Latest screenshot

<div>
<img src="./assets/images/mockup-1.png" alt="screenshot-1" width="200" style="margin-right:20px"/>
<img src="./assets/images/mockup-2.png" alt="screenshot-2" width="200"/>
<img src="./assets/images/mockup-3.png" alt="screenshot-2" width="200"/>
</div>

## How to Run Android app locally

-   Install Android Studio
-   Install node (14.x), yarn (1.x)
-   Run Android emulator. (from Android Studio or Genymotion)
-   Run Metro bundler. `yarn start`
-   Run Android app. `yarn android`

## How to Run IOS app locally

-   Install XCode
-   Install node (14.x), yarn (1.x)
-   Run Metro bundler. `yarn start`
-   Install Pod depedencies. `pod install --repo-update`
-   Run Android app. `yarn ios`

## How to Run Detox test on Android Emulator

-   Install detox cli. `yarn global add detox-cli`
-   Build apk for testing. `yarn build-detox-android`
-   Run detox test on apk. `yarn test-detox-android`

## Tips

-   Run `yarn refresh` to reload android app quickly without rebuilding
-   Run `yarn reset` to reset package manager cache
-   Run `adb uninstall com.siristechnology.nepaltodaypodcast.beta` to uninstall app from the android simulator
-   Run `adb logcat` to view android emulator logs in terminal
