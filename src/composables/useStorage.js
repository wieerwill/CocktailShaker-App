import {
    ref,
    onMounted,
} from 'vue';
import {
    Plugins,
    CameraResultType,
    CameraSource,
    FilesystemDirectory,
    Capacitor
} from "@capacitor/core";
import {
    isPlatform
} from '@ionic/vue';
import axios from 'axios';

import cocktailJSON from "../data/cocktails.json";

let cocktails = ref([]);
const cocktailStorage = "cocktails";

let apiKey = "1";
const apiKeyStorage = "cocktailDBapiKey";

export function useStorage() {
    const {
        Camera,
        Filesystem,
        Storage
    } = Plugins;

    const cacheCocktails = () => {
        Storage.set({
            key: cocktailStorage,
            value: JSON.stringify(cocktails.value)
        });
    }

    const loadSaved = async () => {
        const cocktailList = await Storage.get({
            key: cocktailStorage
        });
        const cocktailsInStorage = cocktailList.value ? JSON.parse(cocktailList.value) : [];
        // If running on the web...
        if (!isPlatform('hybrid')) {
            for (const cocktail of cocktailsInStorage) {
                if (cocktail.image) {
                    const file = await Filesystem.readFile({
                        path: cocktail.image.filepath,
                        directory: FilesystemDirectory.Data
                    });
                    // Web platform only: Load the photo as base64 data
                    cocktail.image.webviewPath = `data:image/jpeg;base64,${file.data}`;
                }
            }
        }
        cocktails.value = cocktailsInStorage;
    }
    onMounted(loadSaved);

    const restoreCocktails = () => {
        //console.log("restoring cocktails")
        cocktailJSON.sort(function(a, b) {
            return a.name.localeCompare(b.name)
        })
        cocktails.value = cocktailJSON;
    }

    const getRandomCocktail = () => {
        fetchRandomCocktail();
        return cocktails.value[Math.random() * cocktails.value.length]
    }

    const getCocktail = (id) => {
        //console.log(id)
        let cocktail = cocktails.value[id]
        return cocktail
    }

    const favouriseCocktail = (cocktail) => {
        let cocktailNr = cocktails.value.indexOf(cocktail)
        cocktails.value[cocktailNr].favourite = !cocktails.value[cocktailNr].favourite;
        cacheCocktails()
    }

    const addCocktail = (cocktail) => {
        let newCocktail = {
            "name": cocktail.name,
            "ingredients": cocktail.ingredients,
            "directions": cocktail.directions,
            "glass": cocktail.glass,
            "author": cocktail.author ? cocktail.author : "You"
        }
        let tempCocktailList = [newCocktail, ...cocktails.value]
        tempCocktailList.sort(function(a, b) {
            return a.name.localeCompare(b.name)
        })
        cocktails.value = tempCocktailList
        cacheCocktails()
    }

    const editCocktail = (cocktail) => {
        let cocktailNr = cocktails.value.indexOf(cocktail)
        cocktails.value[cocktailNr] = cocktail;
        cacheCocktails()
    }

    const removeCocktail = async (cocktail) => {
        if (cocktail.image) {
            // delete photo file from filesystem
            const filename = cocktail.image.filepath.substr(cocktail.image.filepath.lastIndexOf('/') + 1);
            await Filesystem.deleteFile({
                path: filename,
                directory: FilesystemDirectory.Data
            });
        }
        cocktails.value.splice(cocktails.value.indexOf(cocktail), 1)
        cacheCocktails()
    }


    const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    const savePicture = async (photo, fileName) => {
        let base64Data;
        if (isPlatform('hybrid')) {
            // "hybrid" will detect mobile - iOS or Android
            const file = await Filesystem.readFile({
                path: photo.path
            });
            base64Data = file.data;
        } else {
            // Fetch the photo, read as a blob, then convert to base64 format
            const response = await fetch(photo.webPath);
            const blob = await response.blob();
            base64Data = await convertBlobToBase64(blob);
        }
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        });

        if (isPlatform('hybrid')) {
            // rewritr the 'file://' path to HTTP
            return {
                filepath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        } else {
            // Use webPath to display image
            return {
                filepath: fileName,
                webviewPath: photo.webPath
            };
        }
    };

    const takePhoto = async (cocktail) => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });

        const fileName = "cocktailShaker-" + new Date().getTime() + '.jpeg';
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        //console.log(savedFileImage);

        let cocktailNr = cocktails.value.indexOf(cocktail)
        cocktails.value[cocktailNr].image = savedFileImage;
        cacheCocktails()
    };

    const cacheApiKey = () => {
        Storage.set({
            key: apiKeyStorage,
            value: apiKey
        })
    }

    const loadApiKey = async () => {
        let myApiKey = await Storage.get({
            key: apiKeyStorage
        });
        apiKey = apiKey || myApiKey;
    }
    onMounted(loadApiKey);

    const restoreApiKey = () => {
        apiKey = "1";
        cacheApiKey();
        //console.log(apiKey)
    }

    const updateApiKey = async (key) => {
        //console.log("received key", key.toString())
        apiKey = key.toString();
        try {
            cacheApiKey();
            return apiKey
        } catch {
            return false
        }
    }

    const testApiKey = async () => {
        return axios({
                method: 'post',
                url: `https://www.thecocktaildb.com/api/json/v1/${apiKey}/random.php`,
                responseType: 'json'
            })
            .then(function(response) {
                return response.data;
            })
            .catch(function() {
                return "error"
            });
    }

    const fetchRandomCocktail = async () => {
        return axios({
                method: 'post',
                url: `https://www.thecocktaildb.com/api/json/v1/${apiKey}/random.php`,
                responseType: 'json'
            })
            .then(response => {
                let fetchedCocktail = {
                    "name": response.data.drinks[0].strDrink,
                    "ingredients": [],
                    "directions": response.data.drinks[0].strInstructions,
                    "glass": response.data.drinks[0].strGlass.replace("glass", "").replace("Glass", "").trim(),
                    "author": response.data.drinks[0].strIBA ? "International Bartenders Association" : "CocktailDB"
                }
                for (var i = 1; i <= 15; i++) {
                    if (response.data.drinks[0]["strIngredient" + i] != null) {
                        let amount = null,
                            unit = null;
                        if (response.data.drinks[0]["strMeasure" + i] != null) {
                            amount = response.data.drinks[0]["strMeasure" + i].substr(0, response.data.drinks[0]["strMeasure" + i].indexOf(" "))
                            unit = response.data.drinks[0]["strMeasure" + i].substr(response.data.drinks[0]["strMeasure" + i].indexOf(" ") + 1);
                        }

                        fetchedCocktail.ingredients.push({
                            "unit": unit,
                            "amount": amount,
                            "ingredient": response.data.drinks[0]["strIngredient" + i]
                        })
                    }
                }
                try {
                    addCocktail(fetchedCocktail);
                    return true;
                } catch {
                    return "mapping failed"
                }
            })
            .catch(function() {
                return "error"
            });
    }


    return {
        cocktails,
        restoreCocktails,
        getRandomCocktail,
        getCocktail,
        favouriseCocktail,
        addCocktail,
        editCocktail,
        removeCocktail,
        takePhoto,
        apiKey,
        restoreApiKey,
        updateApiKey,
        testApiKey,
        fetchRandomCocktail
    }
}