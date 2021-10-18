<template>
  <Landing v-if="landingController && WhereAreWe === 0" />
  <Questions v-if="questionsController && WhereAreWe < 3" />
  <Final v-if="finalController && WhereAreWe === 3" />
</template>
 
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Landing from "./components/Landing.vue";
import Questions from "./components/Questions.vue";
import Final from "./components/Final.vue";
import { mapGetters } from "vuex";
 
@Options({
  components: {
    Landing,
    Questions,
    Final,
  },
  computed: {
    ...mapGetters([
      "userAnswers",
      "landingController",
      "questionsController",
      "finalController",
    ]),
    //Computed property that will extract users answers from vuex getter. This information will help us to determin if user is still answering questions or not.
    WhereAreWe() {
      return this.userAnswers.answers.length;
    },
  },
})
export default class App extends Vue {}
</script>
 
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(322deg, #2193b0, #6dd5ed);
  background-size: 400% 400%;
  -webkit-animation: backgroundgradient 15s ease infinite;
  -moz-animation: backgroundgradient 15s ease infinite;
  animation: backgroundgradient 15s ease infinite;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
 
/* keyframes animation of background */
@-webkit-keyframes backgroundgradient {
  0% {
    background-position: 91% 0%;
  }
  50% {
    background-position: 10% 100%;
  }
  100% {
    background-position: 91% 0%;
  }
}
@-moz-keyframes backgroundgradient {
  0% {
    background-position: 91% 0%;
  }
  50% {
    background-position: 10% 100%;
  }
  100% {
    background-position: 91% 0%;
  }
}
@keyframes backgroundgradient {
  0% {
    background-position: 91% 0%;
  }
  50% {
    background-position: 10% 100%;
  }
  100% {
    background-position: 91% 0%;
  }
}
</style>