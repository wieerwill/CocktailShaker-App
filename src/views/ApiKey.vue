<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>API Key</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">API Key</ion-title>
        </ion-toolbar>
      </ion-header>

      <form v-on:submit.prevent="doSaveKey(apiKey)">
        <ion-item>
          <ion-label position="fixed">ApiKey: </ion-label>
          <ion-input
            type="text"
            inputmode="text"
            minlength="1"
            maxlength="255"
            name="key"
            v-model="apiKey"
            required
          ></ion-input>
        </ion-item>

        <ion-toolbar>
          <ion-button
            slot="start"
            color="primary"
            @click="() => router.push('/tabs/Cocktails')"
          >
            <ion-icon :icon="arrowBackCircleOutline"></ion-icon>
            Back
          </ion-button>
          <ion-button slot="start" color="danger" @click="doRestoreKey()">
            <ion-icon :icon="reloadCircleOutline"></ion-icon>
            Restore
          </ion-button>
          <ion-button slot="end" color="success" type="submit">
            <ion-icon :icon="saveOutline"></ion-icon>
            Save
          </ion-button>
        </ion-toolbar>
      </form>

      <div class="checker">
        <ion-button expand="block" color="secondary" @click="doCheckKey()">
          <ion-icon :icon="helpCircleOutline"></ion-icon>
          Check Key
        </ion-button>
        <ion-item v-if="apiKey == '1'">
          <p>
            ApiKey is only test key! Get your own on Patreon
            <ion-button href="https://www.patreon.com/thedatadb"
              >CocktailDB</ion-button
            >
          </p>
        </ion-item>
      </div>
      <!--<ion-button expand="block" color="secondary" @click="fetchRandomCocktail()">
          <ion-icon :icon="helpCircleOutline"></ion-icon>
          fetch
        </ion-button>-->
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
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  actionSheetController,
  alertController,
} from "@ionic/vue";
import {
  trash,
  saveOutline,
  refreshOutline,
  arrowBackCircleOutline,
  helpCircleOutline,
  reloadCircleOutline,
} from "ionicons/icons";
export default {
  name: "ApiKey",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
  },
  setup() {
    const router = useRouter();
    const { apiKey, updateApiKey, restoreApiKey, testApiKey, fetchRandomCocktail } = useStorage();

    const doCheckKey = async () => {
      let data = await testApiKey();
      if (data && data != "error") {
        const alert = await alertController.create({
          header: "Success",
          subHeader: "DB connected successfull",
          message: "Your API Key is valid and can be used",
          buttons: ["OK"],
        });
        await alert.present();
      } else {
        const alert = await alertController.create({
          header: "Fail",
          subHeader: "Db connection failed",
          message:
            "Your API Key may be invalid or your internet connection is broken",
          buttons: ["OK"],
        });
        await alert.present();
      }
    };

    const doRestoreKey = async () => {
      const actionSheet = await actionSheetController.create({
        header: "Restore API Key",
        buttons: [
          {
            text: "Restore API Key will remove your current key and set it to the default test key!",
            role: "destructive",
            icon: trash,
            handler: () => {
              restoreApiKey();
              window.scrollTo({ top: 0, left: 0 });
            },
          },
          {
            text: "Cancel",
            icon: close,
            role: "cancel",
            handler: () => {
              // Nothing to do, action sheet is automatically closed
              window.scrollTo({ top: 0, left: 0 });
            },
          },
        ],
      });
      await actionSheet.present();
    };

    const doSaveKey = async (key) => {
      let data = await updateApiKey(key);
      if (data && data != false) {
        const alert = await alertController.create({
          header: "Success",
          message: "Your API Key has been saved",
          buttons: ["OK"],
        });
        await alert.present();
      } else {
        const alert = await alertController.create({
          header: "Fail",
          message: "Your API Key coudn't be saved :(",
          buttons: ["OK"],
        });
        await alert.present();
      }
    };

    return {
      apiKey,
      doSaveKey,
      doCheckKey,
      doRestoreKey,
      fetchRandomCocktail,
      trash,
      saveOutline,
      refreshOutline,
      router,
      arrowBackCircleOutline,
      helpCircleOutline,
      reloadCircleOutline,
    };
  },
};
</script>

<style scoped>
ion-item {
  width: 95%;
  margin-bottom: 10px;
}
.checker {
  margin-top: 50px;
}
</style>