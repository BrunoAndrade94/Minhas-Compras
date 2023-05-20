<template>
  <v-app theme="">
    <v-app-bar class="elevation-1">
      <v-app-bar-title style="text-align: center"
        >Familia Duental</v-app-bar-title
      >
    </v-app-bar>

    <v-main>
      <Page_Title
        main_title="Nossas compras"
        sub_title="Sub compras"
      ></Page_Title>

      <v-container>
        <h1>Nova Compra</h1>
        <v-col cols="12" md="4" lg="3"> </v-col>
      </v-container>
    </v-main>

    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Bruno</strong>
    </div>
  </v-app>
</template>

<script>
import Page_Title from "./components/templates/Page_Title.vue";

export default {
  name: "App",
  components: { Page_Title },
};
</script>
