<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{
          chosenCocktail ? chosenCocktail.name : "View"
        }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title id="top" size="large">
            {{ chosenCocktail ? chosenCocktail.name : "View" }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- View wait -->
      <div class="container" v-if="!chosenCocktail">
        <h1 class="ion-text-center">Please wait</h1>
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

        <ion-button
          color="success"
          expand="block"
          @click="() => router.push(`/tabs/Shake`)"
          >get a new Cocktail</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { useStorage } from "@/composables/useStorage";
import { useRouter } from "vue-router";
import {
  IonPage,
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
export default {
  name: "Shake",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonList,
    IonListHeader,
    IonLabel,
    IonButton,
    IonImg,
  },
  data() {
    const { cocktails } = useStorage();
    return {
      cocktails: cocktails,
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    chosenCocktail() {
      return this.cocktails[parseInt(this.$route.params.id, 10)];
    },
  },
  setup() {
    const router = useRouter();
    return {
      router
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
ion-button {
  margin: 50px;
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
</style>