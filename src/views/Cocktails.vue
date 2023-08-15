<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cocktails</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"
            >Cocktails
            {{
              cocktails ? "#" + cocktails.length : "please restore"
            }}</ion-title
          >
        </ion-toolbar>
      </ion-header>

      <ion-button
        color="success"
        expand="full"
        @click="() => router.push('/tabs/New')"
      >
        <ion-icon :icon="addCircleOutline"></ion-icon>
        Add new cocktail
      </ion-button>

      <ion-list v-if="cocktails">
        <ion-item-sliding v-for="cocktail in cocktails" :key="cocktail.name">
          <ion-item-options side="start">
            <ion-item-option @click="doDeleteCocktail(cocktail)" color="danger">
              <ion-icon slot="icon-only" :icon="trash"></ion-icon>
            </ion-item-option>
            <ion-item-option
              @click="
                () => router.push(`/tabs/New/${cocktails.indexOf(cocktail)}`)
              "
              color="warning"
            >
              <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
            </ion-item-option>
          </ion-item-options>

          <ion-item>
            <ion-label>
              <h2>
                <span
                  @click="
                    () =>
                      router.push(`/tabs/Shake/${cocktails.indexOf(cocktail)}`)
                  "
                >
                  <ion-icon
                    class="golden"
                    v-if="cocktail.favourite"
                    :icon="star"
                  ></ion-icon>
                  {{ cocktail.name }}
                  <ion-icon
                    class="green"
                    v-if="cocktail.image"
                    :icon="camera"
                  ></ion-icon>
                </span>
              </h2>
              <p>by {{ cocktail.author }}</p>
            </ion-label>
          </ion-item>

          <ion-item-options side="end">
            <ion-item-option
              @click="showShareOptions(cocktail)"
              color="secondary"
            >
              <ion-icon slot="icon-only" :icon="shareSocialOutline"></ion-icon>
            </ion-item-option>
            <ion-item-option
              @click="doFavouriseCocktail(cocktail)"
              color="success"
            >
              <ion-icon slot="icon-only" :icon="star"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <ion-button
        color="primary"
        expand="full"
        @click="() => router.push('/tabs/Apikey')"
      >
        <ion-icon :icon="keyOutline"></ion-icon>
        Your API Key
      </ion-button>

      <ion-button color="danger" expand="full" @click="doRestoreCocktails()">
        <ion-icon :icon="removeCircleOutline"></ion-icon>
        Restore Cocktails
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { useStorage } from "@/composables/useStorage";
import { useRouter } from "vue-router";
import { SocialSharing } from "@ionic-native/social-sharing";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonIcon,
  IonButton,
  actionSheetController,
} from "@ionic/vue";
import {
  addCircleOutline,
  removeCircleOutline,
  star,
  trash,
  camera,
  chevronDownCircleOutline,
  shareSocialOutline,
  createOutline,
  logoFacebook,
  logoTwitter,
  logoWhatsapp,
  logoInstagram,
  mailOutline,
  callOutline,
  eyeOutline,
  keyOutline,
} from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Cocktails",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonList,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonIcon,
    IonButton,
  },
  setup() {
    const { cocktails, favouriseCocktail, removeCocktail, restoreCocktails } =
      useStorage();
    const router = useRouter();
    const socialSharing = SocialSharing;
    const publicPath = process.env.BASE_URL;

    const doDeleteCocktail = async (cocktail) => {
      const actionSheet = await actionSheetController.create({
        header: cocktail.name,
        buttons: [
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              removeCocktail(cocktail);
            },
          },
          {
            text: "Cancel",
            icon: close,
            role: "cancel",
            handler: () => {
              // Nothing to do, action sheet is automatically closed
            },
          },
        ],
      });
      await actionSheet.present();
    };

    const doFavouriseCocktail = async (cocktail) => {
      favouriseCocktail(cocktail);
    };

    const showShareOptions = async (cocktail) => {
      //console.log("share ", cocktail.name);
      var options = {
        message: `Check out this fresh cocktail ${cocktail.name} at CocktailShaker APP`, // not supported on some apps (Facebook, Instagram)
        subject: `i found a new cocktail you could be interested in: ${cocktail.name}`, // fi. for email
        files: [`${publicPath}img/glasses/${cocktail.glass}.svg`], // an array of filenames either locally or remotely
        url: "www.northscorp.de/cocktailshaker",
        chooserTitle: "Share " + cocktail.name, // Android only, you can override the default share sheet title
        //appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
        //iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
      };

      const actionSheet = await actionSheetController.create({
        header: "Share Cocktail: " + cocktail.name,
        buttons: [
          {
            text: "Email",
            icon: mailOutline,
            handler: () => {
              socialSharing.shareViaEmail(
                options.message + "\n" + options.url,
                options.subject
              );
            },
          },
          {
            text: "Facebook",
            icon: logoFacebook,
            handler: () => {
              socialSharing.shareViaFacebook(
                options.message,
                options.files[0],
                options.url
              );
            },
          },
          {
            text: "Instagram",
            icon: logoInstagram,
            handler: () => {
              socialSharing.shareViaInstagram(
                options.message,
                options.files[0]
              );
            },
          },
          {
            text: "SMS",
            icon: callOutline,
            handler: () => {
              socialSharing.shareViaSMS(options.message);
            },
          },
          {
            text: "Twitter",
            icon: logoTwitter,
            handler: () => {
              socialSharing.shareViaTwitter(
                options.message,
                options.files[0],
                options.url
              );
            },
          },
          {
            text: "Whatsapp",
            icon: logoWhatsapp,
            handler: () => {
              socialSharing.shareViaWhatsApp(
                options.message,
                options.files[0],
                options.url
              );
            },
          },
          {
            text: "Cancel",
            icon: close,
            role: "cancel",
            handler: () => {
              // Nothing to do, action sheet is automatically closed
            },
          },
        ],
      });
      await actionSheet.present();
    };

    const doRestoreCocktails = async () => {
      const actionSheet = await actionSheetController.create({
        header: "Cocktail",
        buttons: [
          {
            text: "Restore Cocktails will remove all changes made to the cocktaillist!",
            role: "destructive",
            icon: trash,
            handler: () => {
              restoreCocktails();
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

    return {
      cocktails,
      doDeleteCocktail,
      doFavouriseCocktail,
      showShareOptions,
      doRestoreCocktails,
      router,
      addCircleOutline,
      removeCircleOutline,
      star,
      trash,
      camera,
      chevronDownCircleOutline,
      shareSocialOutline,
      createOutline,
      eyeOutline,
      keyOutline,
    };
  },
});
</script>

<style scoped>
ion-list {
  padding-bottom: 35px;
  margin-bottom: 35px;
}
.golden {
  color: gold;
}
.green {
  color: limegreen;
}
</style>