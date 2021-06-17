<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ mode }} Cocktail</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ mode }} Cocktail</ion-title>
        </ion-toolbar>
      </ion-header>

      <form v-on:submit.prevent="doAddCocktail(cocktail)">
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input
            type="text"
            inputmode="text"
            minlength="3"
            maxlength="100"
            name="name"
            v-model.trim="cocktail.name"
            required
          ></ion-input>
        </ion-item>

        <ion-item-group>
          <ion-item-divider>
            <ion-label slot="start" position="fixed">Ingredients</ion-label>
            <ion-button slot="end" @click="addIngredientField()">
              + Add
            </ion-button>
          </ion-item-divider>
          <ion-item
            v-for="(ingredient, index) in cocktail.ingredients"
            :key="index"
            v-bind:item="ingredient"
            v-bind:index="index"
          >
            <ion-input
              :placeholder="ingredient.amount"
              type="number"
              name="{{ingredient}}-amount"
              v-model.number="cocktail.ingredients[index].amount"
              max="100"
              min="1"
              required
            ></ion-input>
            <ion-select
              :value="ingredient.unit"
              ok-text="Okay"
              cancel-text="Dismiss"
              name="{{ingredient}}-unit"
              :v-model="cocktail.ingredients[index].unit"
              required
            >
              <ion-select-option
                :value="unit"
                v-for="unit in units"
                :key="unit"
                >{{ unit }}</ion-select-option
              >
            </ion-select>
            <ion-select
              placeholder="add Ingredient"
              ok-text="Okay"
              cancel-text="Dismiss"
              name="{{ingredient}}-name"
              :v-model="cocktail.ingredients[index].ingredient"
              required
            >
              <ion-select-option
                :value="ingred"
                v-for="ingred in ingredients"
                :key="ingred"
                >{{ ingred.name }}</ion-select-option
              >
            </ion-select>

            <ion-icon
              :icon="trash"
              @click="removeIngredient(ingredient)"
            ></ion-icon>
          </ion-item>
        </ion-item-group>

        <ion-item>
          <ion-label position="floating">Directions</ion-label>
          <ion-textarea
            rows="6"
            type="text"
            inputmode="text"
            minlength="3"
            maxlength="250"
            name="directions"
            v-model="cocktail.directions"
            spellcheck="true"
            required
          ></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position="fixed">Glass</ion-label>
          <ion-select
            placeholder="Select glass"
            ok-text="Okay"
            cancel-text="Dismiss"
            name="glass"
            v-model="cocktail.glass"
            required
          >
            <ion-select-option
              :value="glass"
              v-for="glass in glasses"
              :key="glass"
              >{{ glass }}</ion-select-option
            >
          </ion-select>
        </ion-item>

        <ion-toolbar>
          <ion-button
            slot="start"
            color="danger"
            @click="() => router.push('/tabs/Cocktails')"
          >
            <ion-icon :icon="trash"></ion-icon>
            Cancel
          </ion-button>
          <ion-button
            slot="secondary"
            color="warning"
            @click="resetForm()"
          >
            <ion-icon :icon="refreshOutline"></ion-icon>
            Reset
          </ion-button>
          <ion-button slot="end" color="success" type="submit">
            <!--v-bind:disabled="errors.any()"-->
            <ion-icon :icon="createOutline"></ion-icon>
            Add
          </ion-button>
        </ion-toolbar>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { useStorage } from "@/composables/useStorage";
//import router from "@/router";
import glassJson from "../data/glasses.json";
import ingredientJson from "../data/ingredients.json";
import unitJson from "../data/units.json";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonItemGroup,
  IonItemDivider,
} from "@ionic/vue";
import { trash, createOutline,refreshOutline } from "ionicons/icons";
export default {
  name: "Cocktails",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonItem,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonItemGroup,
    IonItemDivider,
  },
  methods: {
    addIngredientField() {
      this.cocktail.ingredients.push({
        amount: 0,
        unit: "ml",
        ingredient: null,
      });
    },
    removeIngredient(item) {
      const index = this.cocktail.ingredients.indexOf(item);
      if (index > -1) {
        this.cocktail.ingredients.splice(index, 1);
      }
    },
    resetForm(){
      this.cocktail = {
        name: null,
        ingredients: [{ amount: 0, unit: "ml", ingredient: null }],
        directions: null,
        glass: null,
      }
    }
  },
  data() {
    return {
      mode: "New", //"Edit"
      cocktail: {
        name: null,
        ingredients: [{ amount: 0, unit: "ml", ingredient: null }],
        directions: null,
        glass: null,
      },
      ingredients: ingredientJson,
      glasses: glassJson,
      units: unitJson,
    };
  },
  setup() {
    const router = useRouter();
    const { addCocktail } = useStorage();

    const doAddCocktail = async (cocktail) => {
      //console.log("adding: ", cocktail.name);
      addCocktail(cocktail);
      router.push("/tabs/Cocktails")
    };

    return {
      doAddCocktail,
      trash,
      createOutline,
      refreshOutline,
      router,
    };
  },
};
</script>

<style scoped>
ion-item {
  width: 95%;
  margin-bottom: 10px;
}
</style>