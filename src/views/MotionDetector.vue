<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Motion Detector </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title id="top" size="large"> Motion Detector </ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- View Shake button -->
      <div class="container">
        <ion-button
          color="success"
          expand="block"
          v-if="platform.indexOf('mobile') > -1"
          @click="activateMotionSensor()"
          >Activate motion sensor</ion-button
        >

        <ion-list-header>
          <ion-label>Data</ion-label>
        </ion-list-header>
        <ion-list>
          <ion-item>
            <ion-label>Platform:</ion-label>
            {{ platform }}
          </ion-item>
          <ion-item> <ion-label>x:</ion-label></ion-item>
          <ion-item> <ion-label>y:</ion-label></ion-item>
          <ion-item> <ion-label>z:</ion-label></ion-item>
        </ion-list>

        <ion-item>
          {{state.acc}}
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { reactive } from "vue";
import {
  getPlatforms,
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
} from "@ionic/vue";

//import { Motion } from "@capacitor/motion";
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
  },
  data: function () {
    return {
      platform: getPlatforms(),
    };
  },
  setup() {
    const state = reactive({
      acc: null,
    });

    const requestDeviceMotion = () => {
      if (window.DeviceMotionEvent == null) {
        showError("DeviceMotion is not supported.");
      } else if (DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission().then(
          function (state) {
            if (state == "granted") {
              createMotionSubscription();
            } else {
              //console.log("Permission denied by user");
            }
          },
          function (err) {
            showError(err);
          }
        );
      } else {
        // no need for permission
        //console.log("no need for permission");
        createMotionSubscription();
      }
    };

    const createMotionSubscription = async () => {
      if (window.DeviceOrientationEvent) {
        //console.log("start listening");
        window.addEventListener(
          "deviceorientation",
          function (e) {
            state.acc = e;
            //console.log("Device motion event:", e.acceleration.x);
          },
          false
        );
        setTimeout(function () {
          //console.log("pause listening");
        }, 500);
      }
    };

    const showError = () => {
      //console.log("Motion error", error);
    };

    //createMotionSubscription();
    requestDeviceMotion();
    return { state, requestDeviceMotion, createMotionSubscription };
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
</style>