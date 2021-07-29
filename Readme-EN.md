# CocktailShaker App
Project in the context of the event [Content Exploitation Models and their Implementation in Mobile Systems](https://www.tu-ilmenau.de/modultafeln/Informatik/Bachelor/2013/fach/13137/) under Dr. Jürgen Nützel

## Warning
The project is not commercial. It is just a report of a private event. All the information, resources or brand names found in the text or appearing in the photos are provided for information and demonstration purposes only. Any types of direct or indirect marketing are not assumed.
The authors of the project warn about the damage alcohol does and don't take any responsibility for a result of the use of any content posted.
All the cocktail recipes are for information only.
No food bloggers, bartenders or programmers were harmed in the making of this project.

## Download
Download the ready app from [releases](/releases) page

## Contribution
- the (CocktailDB)[https://www.thecocktaildb.com/] API; you can add your own API Key
- Cocktails: [International Bartenders Association (Teijo)](https://github.com/teijo/iba-cocktails)
- [Cocktailpictures](https://github.com/alfg/opendrinks) 
- [Glasses](https://github.com/mikeyhogarth/cocktails)
- Library for Apps [Ionic](https://github.com/ionic-team/ionic) 
- JS Framework [Vue](https://github.com/vuejs/vue) 
- cross-platform compability [Capacitor](https://github.com/ionic-team/capacitor) 
- Logo made with Ionic [Get started](https://ionicframework.com/start#basics) Tool

## Develop locally
1. download the installer](https://nodejs.org/) for Node LTS
2. install the ionic CLI globally: `npm install -g ionic`
3. clone this repository: `git clone https://github.com/wieerwill/cocktailshaker-app.git`
4. move to folder `cd cocktailshaker-app`
5. run `npm install` from the project root
6. run `ionic serve` in a terminal from the project root
7. follow the link in the console to view the app in the browser or smartphone

### Build & Deploy
1. To create a current build run `npm run build` or `ionic build`; all files in `/dist` will be created and/or updated
2. after each building process update your capacitor: `ionic cap copy`
3. after each big updates or changes in code sync your capacitor: `ionic cap sync`

- Web build
  - already done in `dist/`
- [Android build](https://ionicframework.com/docs/developing/android)
  1. [AndroidStudio](https://developer.android.com/studio/) required
  2. open app in android studio `ionic cap open android`
  3. update android permissions: `android/app/src/main/AndroidManifest.xml`
  4. to publish app to appstore add your [signature](https://developer.android.com/studio/publish/app-signing). For local development an example is at `android/signing/keystore.properties.example`
  5. May adjust your `storeFile` for the correct platform `storeFile=~/.android/debug.keystore`
- [iOS build](https://ionicframework.com/docs/developing/ios)
  1. `XCode` on a Mac required
  2. open app in Xcode `ionic cap open ios`
  3. update iOS permissions inside Xcode with tab "Info"
  4. create your apps signature with tab  `Signing & Capabilities`

# License
The project runs under the [MIT](./LICENSE) licence.