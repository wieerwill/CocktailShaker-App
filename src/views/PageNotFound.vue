<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Error 404</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <container>
        <h1>Error 404</h1>
        <p>We are sorry, this page does not exist</p>
        <br />
        <ion-button color="success" expand="block" href="/"
          >Back to home</ion-button
        >
      </container>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";

export default {
  name: "404",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
  },
};
</script>

<style scoped>
container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

container a {
  text-decoration: none;
}

container ion-button {
  margin: auto;
  width: 70%;
}
</style>