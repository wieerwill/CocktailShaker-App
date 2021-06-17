<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{
          chosenCocktail ? chosenCocktail.name : "Shake"
        }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title id="top" size="large">
            {{ chosenCocktail ? chosenCocktail.name : "Shake" }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- View Shake button -->
      <div class="container" v-if="!chosenCocktail">
        <h1 class="ion-text-center">
          Shake your phone <br />
          to get a Cocktail
        </h1>
        <ion-button color="success" expand="block" @click="doShake()"
          >Start shaking</ion-button
        >
        <ion-img
          class="image-icon"
          :src="`${publicPath}img/glasses/Martini.svg`"
          alt="CocktailShaker"
        ></ion-img>
      </div>

      <!-- Show cocktail -->
      <div class="container" v-else>
        <div class="images">
          <ion-img
            class="image-icon"
            v-if="!chosenCocktail.image"
            :src="`${publicPath}img/glasses/${chosenCocktail.glass}.svg`"
            :alt="'Glass: ' + chosenCocktail.glass"
          ></ion-img>
          <ion-img
            class="bigimage"
            v-else
            :src="chosenCocktail.image.webviewPath"
            :alt="chosenCocktail.glass"
          ></ion-img>
        </div>
        <ion-list-header>
          <ion-label>Ingredients</ion-label>
        </ion-list-header>
        <ion-list>
          <ion-item
            v-for="ingredient in chosenCocktail.ingredients"
            :key="ingredient"
          >
            <div v-if="ingredient.amount">
              {{ ingredient.amount }} {{ ingredient.unit }}
              {{ ingredient.ingredient }}
              <span class="small">&nbsp;&nbsp; {{ ingredient.label }}</span>
            </div>
            <div v-else>Spezial: {{ ingredient.special }}</div>
          </ion-item>
        </ion-list>
        <hr />
        <ion-list-header>
          <ion-label>Directions</ion-label>
        </ion-list-header>
        <ion-item id="shorter">{{ chosenCocktail.directions }}</ion-item>
        <hr />
        <div v-if="chosenCocktail.garnish">
          <ion-list-header>
            <ion-label>Garnish</ion-label>
          </ion-list-header>
          <ion-item id="shorter">{{ chosenCocktail.garnish }}</ion-item>
        </div>

        <div class="buttonContainer">
          <!--Take Photo -->
          <ion-button color="secondary" @click="takePhoto(chosenCocktail)">
            <ion-icon :icon="camera"></ion-icon>
          </ion-button>
          <!--Next Cocktail-->
          <ion-button color="success" @click="doShake()"
            >Shake again</ion-button
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { useStorage } from "@/composables/useStorage";
import {
  getPlatforms,
  IonPage,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonList,
  IonListHeader,
  IonLabel,
  IonButton,
  IonImg,
} from "@ionic/vue";
import { camera } from "ionicons/icons";
export default {
  name: "Shake",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonContent,
    IonPage,
    IonItem,
    IonList,
    IonListHeader,
    IonLabel,
    IonButton,
    IonImg,
  },
  data: function () {
    const { cocktails } = useStorage();
    return {
      cocktails: cocktails,
      chosenCocktail: null,
      publicPath: process.env.BASE_URL,
      platform: getPlatforms(),
    };
  },
  methods: {
    doShake: function () {
      const {fetchRandomCocktail} = useStorage();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      if(Math.random() > 0.8){
       fetchRandomCocktail();
      }
      this.chosenCocktail =
        this.cocktails[Math.floor(Math.random() * this.cocktails.length)];
      //console.log(this.chosenCocktail.name);
    },
  },
  setup() {
    const { takePhoto } = useStorage();

    return {
      camera,
      takePhoto,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 10px;
  padding: 5px;
  padding-bottom: 35px;
  margin-bottom: 35px;
}
ion-badge {
  margin: 0 3px 0 3px;
}
ion-list,
#shorter {
  width: 90%;
}
.images {
  display: block;
  text-align: center;
  margin: auto;
}
ion-img.image-icon {
  filter: invert(68%) sepia(39%) saturate(476%) hue-rotate(86deg)
    brightness(118%) contrast(119%);
  height: 60px;
  margin: auto;
  border: none;
}
ion-img.bigimage {
  max-width: 70%;
  height: auto;
  border: 1px solid white;
  padding: 3px;
  margin: auto;
}
.small {
  font-size: smaller;
  color: rgb(173, 173, 173);
}
.buttonContainer {
  width: 100%;
  text-align: center;
  display: inline-block;
}
ion-button {
  margin: 10px;
}
</style>