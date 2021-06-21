# CocktailShaker App
[English Readme](Readme-EN.md)

Ein Projekt für die Veranstaltung [Content Verwertungsmodelle und ihre Umsetzung in mobilen Systemen](https://www.tu-ilmenau.de/modultafeln/Informatik/Bachelor/2013/fach/13137/) unter Dr. Jürgen Nützel.

Für den Rahmen der App war vorgegeben:
- eine Native oder Hybride App für mobile Endgeräte
- mindestens ein Sensor des Endgeräts muss verwendet werden (Kamera, Geolocation,...)
- die App muss sich mit einem Server verbinden (keine offline App)

## Warnung
Das Projekt ist nicht kommerziell. Es ist lediglich ein Projekt während einer universitären Veranstaltung. 
Alle Informationen, Ressourcen oder Markennamen, die im Text vorkommen oder auf den Fotos zu sehen sind, werden nur zu Informations- und Demonstrationszwecken bereitgestellt. Jegliche Art von direktem oder indirektem Marketing wird nicht angenommen.
Die Autoren des Projekts warnen vor den Schäden, die Alkohol anrichtet, und übernehmen keine Verantwortung für ein Ergebnis der Verwendung der eingestellten Inhalte.
Alle Cocktailrezepte dienen nur zur Information.
Bei der Erstellung dieses Projekts wurden keine Food-Blogger, Barkeeper oder Programmierer geschädigt.

## Download
- [Android Release APK](android/app/release/app-release.apk)
- [Android Debug APK](android/app/build/outputs/apk/debug/app-debug.apk)


## Quellen und Bibliotheken
- die [CocktailDB](https://www.thecocktaildb.com/) API; der eigene API Schlüssel kann in der App gespeichert werden
- Cocktails der [International Bartenders Association (Teijo)](https://github.com/teijo/iba-cocktails), bereitgestellt durch [Teijo](https://github.com/teijo/)
- [Gläser Icons von mikeyhogarth](https://github.com/mikeyhogarth/cocktails)
- Bibliothek für Apps [Ionic](https://github.com/ionic-team/ionic) 
- JS Framework [Vue](https://github.com/vuejs/vue) 
- Kompabilität für mobile Systeme [Capacitor](https://github.com/ionic-team/capacitor) 
- das Logo wurde mit dem Ionic [Get started](https://ionicframework.com/start#basics) Tool erzeugt

## Lokal weiterentwickeln
1. Installiere [NodeJS](https://nodejs.org/) in der aktuellen LTS Version (>=14.15)
2. Installiere die Ionic CLI ionic global: `npm install -g ionic`
3. Klone das Repository `git clone https://github.com/wieerwill/cocktailshaker-app.git`
4. In den neuen Ordner wechseln `cd cocktailshaker-app`
5. Pakete mit `npm install` installieren
6. den Entwicklungsserver mit `ionic serve` starten
7. Folge dem Link in der Konsole um die App im Browser oder Smartphone zu betrachten


### Build & Deploy
1. Um alles für eine produktionsfertige App bereitzustellen führe `npm run build` oder `ionic build` aus. Das erstellt und updatet alle Dateien im `dist/` Ordner (für Webseiten Deploy)
2. nach jedem Build Prozess müssen die Capacitor Ordner aktualisiert werden: `ionic cap copy`
3. nach Updates oder großen Änderungen des Codes (neues Plugin) muss Capacitor synchronisiert werden: `ionic cap sync`

- Web build
  - ist bereits fertig im `dist/` Ordner verfügbar
- [Android build](https://ionicframework.com/docs/developing/android)
  1. Du benötigst [AndroidStudio](https://developer.android.com/studio/)
  2. die App im Android Studio öffnen `ionic cap open android`
  3. Android benötigt eine Übersicht nötiger Berechtigungen in `android/app/src/main/AndroidManifest.xml`
  4. Um die App im AppStore zu veröffentlichen benötigst musst du diese [signieren](https://developer.android.com/studio/publish/app-signing). Für lokale Tests ist eine Beispieldatei unter `android/signing/keystore.properties.example`
  5. Möglicherweise musst du den Wert von `storeFile` für deine Platform anpassen
      ```sh
      storeFile=~/.android/debug.keystore
      ```
- [iOS build](https://ionicframework.com/docs/developing/ios)
  1. es wird `XCode` auf einem Mac benötigt
  2. die App in XCode öffnen `ionic cap open ios`
  3. in XCode müssen die Berechtigungen und Berechtigungstexte angepasst werden, zu finden im Tab "Info"
  4. die App muss signiert werden über `Signing & Capabilities`

## Lizenz
Das Projekt läuft unter der [MIT](./LICENSE) Lizenz.
