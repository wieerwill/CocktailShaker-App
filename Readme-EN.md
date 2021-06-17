# CocktailShaker App
Project in the context of the event [Content Exploitation Models and their Implementation in Mobile Systems](https://www.tu-ilmenau.de/modultafeln/Informatik/Bachelor/2013/fach/13137/) under Dr. Jürgen Nützel

## Warning
The project is not commercial. It is just a report of a private event. All the information, resources or brand names found in the text or appearing in the photos are provided for information and demonstration purposes only. Any types of direct or indirect marketing are not assumed.
The authors of the project warn about the damage alcohol does and don't take any responsibility for a result of the use of any content posted.
All the cocktail recipes are for information only.
No food bloggers, bartenders or programmers were harmed in the making of this project.

## Contribution
- the (CocktailDB)[https://www.thecocktaildb.com/] API; you can add your own API Key
- Cocktails: [International Bartenders Association (Teijo)](https://github.com/teijo/iba-cocktails)
- [Cocktailpictures](https://github.com/alfg/opendrinks) 
- [Glasses](https://github.com/mikeyhogarth/cocktails)
- Library for Apps [Ionic](https://github.com/ionic-team/ionic) 
- JS Framework [Vue](https://github.com/vuejs/vue) 
- cross-platform compability [Capacitor](https://github.com/ionic-team/capacitor) 

## Develop locally
1. download the installer](https://nodejs.org/) for Node LTS
2. install the ionic CLI globally: `npm install -g ionic`
3. clone this repository: `git clone https://github.com/wieerwill/cocktailshaker-app.git`
4. move to folder `cd cocktailshaker-app`
5. run `npm install` from the project root
6. run `ionic serve` in a terminal from the project root
7. follow the link in the console to view the app in the browser or smartphone

### Deploy
To deploy everything to a production-ready app, run this command:
```sh
ionic build
```
This will build and update all files in the `dist/` folder

### Build general
1. update the Capacitor config after each standard build process: `ionic cap copy`
2. sync Capacitor builds after each new Plugin or huge code change: `ionic cap sync`

- Android build
  1. you need [Android SDK](https://developer.android.com/studio/).
      - the easiest way on a Mac is `homebrew`: `brew install android-sdk`
      - on Linux you can use the package manager: `sudo apt-get install android-sdk` or via
      - [Flatpak](https://flathub.org/apps/details/com.google.AndroidStudio) or
      - [Snap](https://uappexplorer.com/snap/ubuntu/android-studio)
  2. open the app in your AndroidStudio `ionic cap open android`
  3. to publish the app you need to [sign](https://developer.android.com/studio/publish/app-signing) it. For local testing, a sample file is available at
      ```sh
      cp android/signing/keystore.properties.example
      ```
  4. you may need to adjust the value of `storeFile` for your platform
      ```sh
      storeFile=~/.android/debug.keystore
      ```
- iOS build open in XCode `ionic cap open ios`

# License
The project runs under the [MIT](./LICENSE) licence.