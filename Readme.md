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

## Quellen und Bibliotheken
- die (CocktailDB)[https://www.thecocktaildb.com/] API; der eigene API Schlüssel kann in der App gespeichert werden
- Cocktails der [International Bartenders Association (Teijo)](https://github.com/teijo/iba-cocktails)
- [Gläser](https://github.com/mikeyhogarth/cocktails)
- Bibliothek für Apps [Ionic](https://github.com/ionic-team/ionic) 
- JS Framework [Vue](https://github.com/vuejs/vue) 
- Kompabilität für mobile Systeme [Capacitor](https://github.com/ionic-team/capacitor) 

## Lokal weiterentwickeln
1. Installiere [NodeJS](https://nodejs.org/) in der aktuellen LTS Version (>=14.15)
2. Installiere die Ionic CLI ionic global: `npm install -g ionic`
3. Klone das Repository `git clone https://github.com/wieerwill/cocktailshaker-app.git`
4. In den neuen Ordner wechseln `cd cocktailshaker-app`
5. Pakete mit `npm install` installieren
6. den Entwicklungsserver mit `ionic serve` starten
7. Folge dem Link in der Konsole um die App im Browser oder Smartphone zu betrachten

## Deploy
Um alles für eine Produktionsfertige App bereitzustellen führe diesen Befehl aus:
```sh
npm run build
```
Das wird alle Dateien im `dist/` Ordner erstellen und updaten

### Build general
1. bei jedem Build Prozess müssen die Capacitor Ordner aktualisiert werden: `ionic cap copy`
2. nach Updates oder großen Änderungen des Codes (neues Plugin) muss Capacitor synchronisiert werden: `ionic cap sync`

- Android build
  1. Du benötigst die [Android SDK](https://developer.android.com/studio/).
      - der einfachste Weg auf einem Mac ist `homebrew`: `brew install android-sdk`
      - auf Linux kann man den Paketmanager nutzen: `sudo apt-get install android-sdk` or via
      - [Flatpak](https://flathub.org/apps/details/com.google.AndroidStudio) or
      - [Snap](https://uappexplorer.com/snap/ubuntu/android-studio)
  2. die App im Android Studio öffnen `ionic cap open android`
  3. Um die App zu veröffentlichen benötigst musst du diese [signieren](https://developer.android.com/studio/publish/app-signing). Für lokale Tests ist eine Beispieldatei unter
      ```sh
      cp android/signing/keystore.properties.example
      ```
  4. Möglicherweise musst du den Wert von `storeFile` für deine Platform anpassen
      ```sh
      storeFile=~/.android/debug.keystore
      ```
- iOS build in XCode öffnen `ionic cap open ios`

## Lizenz
Das Projekt läuft unter der [MIT](./LICENSE) Lizenz.
