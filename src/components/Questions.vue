<template>
  <div class="questions">
    <div class="questions-container">
      <h3 v-if="renderQuestion" class="animate__animated animate__fadeIn">
        {{ questions[userAnswers.answers.length].question }}
        <!-- {{ questions.userAnswers.answers.length.question }} -->
      </h3>
      <transition-group
        name="customAnimations"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOutDown"
      >
        <button
          class="animate__animated btn-answer"
          v-for="(x, index) in items"
          :key="index"
          v-on:click="aquireAnswer(x)"
          :disabled="items.length !== 4"
        >
          {{ x }}
        </button>
      </transition-group>
    </div>
    <img
      alt="Vue logo"
      src="../assets/kitty.png"
      class="KittyLogo"
      :class="{
        enterKitty: EntranceKitty,
        stanceKitty: StanceKitty,
        flyoutKitty: flyoutKitty,
      }"
    />
    <div v-for="(item, index) in ['x1', 'x2']" :key="index">
      <div :class="item"><div class="cloud"></div></div>
    </div>
  </div>
</template>
 
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapMutations } from "vuex";
 
export interface IQuestions {
  EntranceKitty: boolean;
  StanceKitty: boolean;
  flyoutKitty: boolean;
  items: string[];
  renderQuestion: boolean;
}
 
@Options({
  data(): IQuestions {
    return {
      //variables are used for nice render of elements.
      EntranceKitty: false,
      StanceKitty: false,
      flyoutKitty: false,
      items: [],
      renderQuestion: false,
    };
  },
  computed: {
    ...mapGetters(["questions", "userAnswers"]),
  },
  methods: {
    ...mapMutations([
      "mutateAnswer",
      "QuestionsControllerMutation",
      "FinalControllerMutation",
    ]),
    aquireAnswer(value: string) {
      this.flyoutKitty = true;
      this.StanceKitty = false;
      //Calling mutateAnswer mutation and pushing string value into answers string array in sessionStorage.
      this.mutateAnswer(value);
      //Simple if condition that will check if we answered all THREE questions.
      if (this.userAnswers.answers.length === 3) {
        //If true => mutation of component controllers will bring us to next stage of quiz.
        this.QuestionsControllerMutation(false);
        this.FinalControllerMutation(true);
      } else this.renderItem(500); // Calling renderItem method, renders buttons via v-for.
    },
    //Method assigned to properly render items, makin delay between items in order to make cool fadeIn animations by vue transitions
    renderItem(speed?: number) {
      //Question controller that shows question at top. It should show only after all other elements are on screen.
      this.renderQuestion = false;
      //Speed is optional att, if we don't have attr, it will set it to default 1000ms.
      if (!speed) speed = 500;
      //Checking if arry needs to be deleted.
      if (this.items.length !== 0) {
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            //Deleting last item of items.
            this.items.pop();
            //After last item is deleted,check if length is 0, if true, this function will call itself and continue.
            if (this.items.length === 0) {
              setTimeout(() => {
                this.animationChange();
                this.renderItem(500);
              }, speed);
            }
          }, i * speed);
        }
        //Else first iteration, first question.
      } else {
        this.questions[this.userAnswers.answers.length].answers.forEach(
          (element, index) => {
            setTimeout(() => {
              this.items.push(element);
              if (this.items.length === 4) {
                this.renderQuestion = true;
              }
            }, index * speed);
          }
        );
      }
    },
    //Method that changes kitty animation from entracne to standing still.
    animationChange() {
      this.EntranceKitty = true;
      this.flyoutKitty = false;
      this.StanceKitty = false;
      setTimeout(() => {
        this.StanceKitty = true;
      }, 3000);
    },
  },
  mounted() {
    this.animationChange();
    this.renderItem();
  },
})
export default class Questions extends Vue {}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* TABLE OF CONTENT */
 
.questions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
 
.questions-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation-delay: 1.5s;
}
.btn-answer {
  margin-top: 2em;
  padding: 1em 4em;
  color: black;
  background: white;
  border-radius: 20px;
  font-size: 12pt;
  font-weight: 600;
  cursor: pointer;
  border: 3px solid rgb(200, 246, 228);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.btn-answer:hover {
  border: 3px solid rgb(162, 221, 198);
  color: rgb(162, 221, 198);
  background: #fff;
  box-shadow: rgb(182, 226, 209) 0px 4px 12px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
 
.KittyLogo {
  right: 5em;
  top: 3em;
  padding-bottom: 2em;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  position: relative;
  max-width: 110px;
  z-index: 1;
}
.enterKitty {
  -webkit-animation: animateKittyEntrance 3s linear infinite;
  -moz-animation: animateKittyEntrance 3s linear infinite;
  animation: animateKittyEntrance 3s linear infinite;
}
.stanceKitty {
  -webkit-animation: animateKittyStance 6.5s linear infinite;
  -moz-animation: animateKittyStance 6.55s linear infinite;
  animation: animateKittyStance 6.5s linear infinite;
  animation-direction: alternate-reverse;
}
.flyoutKitty {
  -webkit-animation: animateKitty 4s linear infinite;
  -moz-animation: animateKitty 4s linear infinite;
  animation: animateKitty 4s linear infinite;
  filter: blur(2px);
}
.cloud {
  background: #fff;
  background: -moz-linear-gradient(to bottom, #fff 5%, #f1f1f1 100%);
  background: -webkit-gradient(
    linear,
    to right to bottom,
    to right bottom,
    color-stop(5%, #fff),
    color-stop(100%, #f1f1f1)
  );
  background: -webkit-linear-gradient(to bottom, #fff 5%, #f1f1f1 100%);
  background: -o-linear-gradient(to bottom, #fff 5%, #f1f1f1 100%);
  background: -ms-linear-gradient(to bottom, #fff 5%, #f1f1f1 100%);
  background: linear-gradient(to bottom, #fff 5%, #f1f1f1 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fff', endColorstr='#f1f1f1',GradientType=0 );
 
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
 
  -webkit-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
 
  height: 120px;
  position: relative;
  width: 350px;
}
 
.cloud:after,
.cloud:before {
  background: #fff;
  content: "";
  position: absolute;
  z-index: -1;
}
 
.cloud:after {
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
 
  height: 100px;
  left: 50px;
  top: -50px;
  width: 100px;
}
 
.cloud:before {
  -webkit-border-radius: 200px;
  -moz-border-radius: 200px;
  border-radius: 200px;
 
  width: 180px;
  height: 180px;
  right: 50px;
  top: -90px;
}
 
.x1 {
  position: absolute;
  top: 40em;
  right: 1em;
  -webkit-animation: animateCloud1 15s linear infinite;
  -moz-animation: animateCloud1 15s linear infinite;
  animation: animateCloud1 15s linear infinite;
  animation-direction: alternate-reverse;
}
 
.x2 {
  position: absolute;
  top: 35em;
  right: 15em;
  -webkit-animation: animateCloud2 15s linear infinite;
  -moz-animation: animateCloud2 15s linear infinite;
  animation: animateCloud2 15s linear infinite;
  animation-direction: alternate-reverse;
}
 
@-webkit-keyframes animateKitty {
  100% {
    transform: translateY(-2000px) translateX(750px);
  }
  0% {
    transform: translateY(0px) translateX(0px);
  }
}
 
@-moz-keyframes animateKitty {
  100% {
    transform: translateY(-2000px) translateX(750px);
  }
  0% {
    transform: translateY(0px) translateX(0px);
  }
}
 
@keyframes animateKitty {
  100% {
    transform: translateY(-2000px) translateX(750px);
  }
  0% {
    transform: translateY(0px) translateX(0px);
  }
}
 
@-webkit-keyframes animateKittyStance {
  0% {
    transform: translateY(-5px) translateX(5px);
  }
  30% {
    transform: translateY(0px) translateX(0px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}
 
@-moz-keyframes animateKittyStance {
  0% {
    transform: translateY(-5px) translateX(5px);
  }
  30% {
    transform: translateY(0px) translateX(0px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}
 
@keyframes animateKittyStance {
  0% {
    transform: translateY(-5px) translateX(5px);
  }
  30% {
    transform: translateY(0px) translateX(0px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}
 
@-webkit-keyframes animateKittyEntrance {
  0% {
    transform: translateY(1000px) translateX(-750px);
  }
  40% {
    transform: translateY(500px) translateX(-200px);
  }
  70% {
    transform: translateY(50px) translateX(-20px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}
 
@-moz-keyframes animateKittyEntrance {
  0% {
    transform: translateY(1000px) translateX(-750px);
  }
  40% {
    transform: translateY(500px) translateX(-200px);
  }
  70% {
    transform: translateY(50px) translateX(-20px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}
 
@keyframes animateKittyEntrance {
  0% {
    transform: translateY(1000px) translateX(-750px);
  }
  40% {
    transform: translateY(500px) translateX(-200px);
  }
  70% {
    transform: translateY(50px) translateX(-20px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}
@-webkit-keyframes animateCloud1 {
  0% {
    transform: translateX(-40px) scale(0.65);
  }
  100% {
    transform: translateX(0px) scale(0.65);
  }
}
 
@-moz-keyframes animateCloud1 {
  0% {
    transform: translateX(-40px) scale(0.65);
  }
  100% {
    transform: translateX(0px) scale(0.65);
  }
}
 
@keyframes animateCloud1 {
  0% {
    transform: translateX(-40px) scale(0.65);
  }
  100% {
    transform: translateX(0px) scale(0.65);
  }
}
 
@-webkit-keyframes animateCloud2 {
  0% {
    transform: translateX(50px) scale(0.3);
  }
  100% {
    transform: translateX(0px) scale(0.3);
  }
}
 
@-moz-keyframes animateCloud2 {
  0% {
    transform: translateX(50px) scale(0.3);
  }
  100% {
    transform: translateX(0px) scale(0.3);
  }
}
 
@keyframes animateCloud2 {
  0% {
    transform: translateX(50px) scale(0.3);
  }
  100% {
    transform: translateX(0px) scale(0.3);
  }
}
/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  h2 {
    font-size: 1em;
  }
  .btn-answer:hover {
    margin-top: 2em;
    padding: 1em 4em;
    color: black;
    background: white;
    border-radius: 20px;
    font-size: 12pt;
    font-weight: 600;
    cursor: pointer;
    border: 3px solid rgb(200, 246, 228);
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
}
/* Smartphones (landscape) ----------- */
@media (max-width: 767px) {

.x1 {
  position: absolute;
  top: 18em;
  right: 30em;
  -webkit-animation: animateCloud1 15s linear infinite;
  -moz-animation: animateCloud1 15s linear infinite;
  animation: animateCloud1 15s linear infinite;
  animation-direction: alternate-reverse;
}
 
.x2 {
  position: absolute;
  top: 10em;
  right: 25em;
  -webkit-animation: animateCloud2 15s linear infinite;
  -moz-animation: animateCloud2 15s linear infinite;
  animation: animateCloud2 15s linear infinite;
  animation-direction: alternate-reverse;
}
}
/* Tablets  ----------- */
@media (min-width: 768px) and (max-width: 1024px) {
.x1 {
  position: absolute;
  top: 30em;
  right: 0em;
  -webkit-animation: animateCloud1 15s linear infinite;
  -moz-animation: animateCloud1 15s linear infinite;
  animation: animateCloud1 15s linear infinite;
  animation-direction: alternate-reverse;
}
 
.x2 {
  position: absolute;
  top: 30em;
  right: 25em;
  -webkit-animation: animateCloud2 15s linear infinite;
  -moz-animation: animateCloud2 15s linear infinite;
  animation: animateCloud2 15s linear infinite;
  animation-direction: alternate-reverse;
}
}
</style>