<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
          
        <ion-tab-button tab="Shake" href="/tabs/shake">
          <ion-icon :icon="dice" />
          <ion-label>Shake</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="Cocktails" href="/tabs/cocktails">
          <ion-icon :icon="listOutline" />
          <ion-label>Cocktails</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { dice, listOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      dice, 
      listOutline
    }
  }
}
</script>