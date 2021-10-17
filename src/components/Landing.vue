<template>
  <div class="landing">
    <img alt="Vue logo" src="../assets/kitty.png" class="KittyLogo" :class="{ flyoutKitty: FlyOut }">
    <!-- main reason why there is containerBox is actually to controll movement of all other elements simantaniousley as kitty flies out -->
   <div class="containerBox" :class="{flyoutContent:FlyOut}">
    <h1>Welcome to Perfect Pet quiz!</h1>
    <!-- Input type text limited to number of characters of NameConfig.ts varaible -->
    <input type="text" placeholder="Enter pet name" class="input-pet" :maxlength="Limit" v-model="PetName">
    <!-- clicking on button you are calling click method that calls vuex mutation of component controller after timeout -->
    <div class="btn-container">
    <button class="btn-start" v-on:click="click">Start</button>
    <button class="btn-randomize" v-on:click="randomize"><img src="../assets/shuffle.png" alt="randomize" title="randomize"></button>
    </div>
    <!-- x1,x2,x3,x4 are div classes that represents css clouds -->
    <div v-for="item,index in ['x1','x2','x3','x4','x5','x6']" :key="index">
      <div :class="item"><div class="cloud"></div></div>
    </div>
   </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapMutations } from 'vuex';
import {NameConfig} from '../NameConfig'

@Options({
  data(){
    return{
      //Image class binding controller - binds call that starts flyout animation.
      FlyOut: false,
      PetName: '' as string
    }
  },
  computed:{
    //Computed property that returns limitation of input chars.
    Limit(){
      return NameConfig.MAX_LENGTH
    }
  },
  methods:{
    ...mapMutations(['LandingControllerMutation','QuestionsControllerMutation','FinalControllerMutation','randomizeAnswers','savePetName']),
    //ClickMethod of button that will chain changes on component.
    click(){
      //Change FlyOut boolean value to trigger binding new class on projectLogo. Cat will fly out of screen.
      this.FlyOut = true;
      //Wait 4 seconds for animation to finish, then mutates Controllers in sessionStorage and calls mutation of pet name.
      setTimeout(()=>{
        this.LandingControllerMutation(false)
        this.QuestionsControllerMutation(true)
        this.savePetName(this.PetName)
      },2000)
    },
    //function calling mutations of controllers and random generating three answers.
    randomize(){
      this.FlyOut = true;
      setTimeout(()=>{
        this.randomizeAnswers(this.PetName)
        this.LandingControllerMutation(false)
        this.QuestionsControllerMutation(false)
        this.FinalControllerMutation(true)
      },2000)
    }
  }
})
export default class Landing extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* TABLE OF CONTENT */
/* - main classes - */
/* landing 
   containerBox
   KittyLogo
   btn-container
   btn-start
   btn-randomize
   cloud
   x1,x2
*/
/* animation classes */
/* 
flyoutKitty
flyoutContent
 */
/* keyframes */
/* 
animateKittyStance 
animateKitty
animateContent
*/
  h1 {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

/* MAIN CLASSES */

.KittyLogo{
  padding-bottom: 2em;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  position: relative;
  max-width: 110px;
  z-index: 1;
  -webkit-animation: animateKittyStance 5s linear infinite;
	-moz-animation: animateKittyStance 5s linear infinite;
	animation: animateKittyStance 5s linear infinite;
  animation-direction: alternate-reverse; 
}
.containerBox{
  position: relative;
}
.input-pet{
  margin-top: 2em;
  padding: 1em 1.5em;
  color: black;
  background: white;
  border-radius: 20px;
  font-size: 12pt;
  font-weight: 600;
  border: 3px solid rgb(200, 246, 228);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.input-pet:focus{
  margin-top: 2em;
  padding: 1em 3em;
  color: black;
  background: rgb(231, 245, 240);
  border-radius: 20px;
  font-size: 12pt;
  font-weight: 600;
  border: 3px solid rgb(142, 255, 212);
  position: relative;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
-webkit-transition: all 0.3s ease-out;
-moz-transition: all 0.3s ease-out;
-o-transition: all 0.3s ease-out;
transition: all 0.3s ease-out;
}
.btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-start{
  margin-top: 2em;
  padding: 1em 3em;
  color: black;
  background: white;
  border-radius: 20px;
  font-size: 12pt;
  font-weight: 600;
  cursor:pointer;
  border: 3px solid rgb(200, 246, 228);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.btn-start:hover,.btn-randomize:hover{
  border: 3px solid rgb(162, 221, 198);
  color: rgb(162, 221, 198);
  background: #fff;
  box-shadow: rgb(182, 226, 209) 0px 4px 12px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
.btn-randomize{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5em;
  height: 3.5em;
  top: 1em;
  margin-left: 2em;
  color: black;
  background: white;
  border-radius: 100%;
  font-size: 12pt;
  font-weight: 600;
  cursor:pointer;
  border: 3px solid rgb(200, 246, 228);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.btn-randomize img{
  max-width: 30px;
}
.cloud {
  background: #fff;
	background: -moz-linear-gradient(to bottom,  #fff 5%, #f1f1f1 100%);
	background: -webkit-gradient(linear, to right to bottom, to right bottom, color-stop(5%,#fff), color-stop(100%,#f1f1f1));
	background: -webkit-linear-gradient(to bottom,  #fff 5%,#f1f1f1 100%);
	background: -o-linear-gradient(to bottom,  #fff 5%,#f1f1f1 100%);
	background: -ms-linear-gradient(to bottom,  #fff 5%,#f1f1f1 100%);
	background: linear-gradient(to bottom,  #fff 5%,#f1f1f1 100%);
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

.cloud:after, .cloud:before {
  background: #fff;
	content: '';
	position: absolute;
	z-indeX: -1;
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
    top: -10em;
    -webkit-animation: animateCloud1 15s linear infinite;
    -moz-animation: animateCloud1 15s linear infinite;
    animation: animateCloud1 15s linear infinite;
    animation-direction: alternate-reverse;
  }
  
  .x2 {
    position: absolute;
    top: -15em;
    left: 15em;
    -webkit-animation: animateCloud2 15s linear infinite;
    -moz-animation: animateCloud2 15s linear infinite;
    animation: animateCloud2 15s linear infinite;
    animation-direction: alternate-reverse; 
  }

  .x3 {
    position: absolute;
    top: 5em;
    right: 25em;
    -webkit-animation: animateCloud2 15s linear infinite;
    -moz-animation: animateCloud2 15s linear infinite;
    animation: animateCloud2 15s linear infinite;
    animation-direction: alternate-reverse; 
  }

  .x4 {
    position: absolute;
    top: -18em;
    right: 25em;
    -webkit-animation: animateCloud2 15s linear infinite;
    -moz-animation: animateCloud2 15s linear infinite;
    animation: animateCloud2 15s linear infinite;
    animation-direction: alternate-reverse; 
  }
  .x5 {
    position: absolute;
    top: 10em;
    left: 25em;
    -webkit-animation: animateCloud3 15s linear infinite;
    -moz-animation: animateCloud3 15s linear infinite;
    animation: animateCloud3 15s linear infinite;
    animation-direction: alternate-reverse; 
  }
  .x6{
    position: absolute;
    bottom: 10em;
    right: -27em;
    -webkit-animation: animateCloud1 15s linear infinite;
    -moz-animation: animateCloud1 15s linear infinite;
    animation: animateCloud1 15s linear infinite;
    animation-direction: alternate-reverse; 
  }

/* ANIMATION CLASSES */

.flyoutKitty{
    -webkit-animation: animateKitty 5s linear infinite;
    -moz-animation: animateKitty 5s linear infinite;
    animation: animateKitty 5s linear infinite;
  }
.flyoutContent{
  filter: blur(4px);
  -webkit-animation: animateContent 5s linear infinite;
	-moz-animation: animateContent 5s linear infinite;
	animation: animateContent 5s linear infinite;  
}

/* KEYFRAMES */

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
@-webkit-keyframes animateCloud3 {
    0% {
        transform: translateX(50px) scale(0.65);
    }
    100% {
        transform: translateX(0px) scale(0.65);
    }
}

@-moz-keyframes animateCloud3 {
    0% {
        transform: translateX(50px) scale(0.65);
    }
    100% {
        transform: translateX(0px) scale(0.65);
    }
}

@keyframes animateCloud3 {
    0% {
        transform: translateX(50px) scale(0.65);
    }
    100% {
        transform: translateX(0px) scale(0.65);
    }
}
@-webkit-keyframes animateKitty{
    100% {
        transform: translateY(-1000px) translateX(750px);
    }
    50% {
      transform: translateY(-500px) translateX(200px);
    }
    35%{
      transform: translateY(-50px) translateX(20px);
    }    
    0% {
        transform: translateY(0px) translateX(0px);
    }
}

@-moz-keyframes animateKitty {
    100% {
        transform: translateY(-1000px) translateX(750px);
    }
    50% {
      transform: translateY(-500px) translateX(200px);
    }
    35%{
      transform: translateY(-50px) translateX(20px);
    }    
    0% {
        transform: translateY(0px) translateX(0px);
    }
}

@keyframes animateKitty {
    100% {
        transform: translateY(-1000px) translateX(750px);
    }
    50% {
      transform: translateY(-500px) translateX(200px);
    }
    35%{
      transform: translateY(-50px) translateX(20px);
    }
    0% {
        transform: translateY(0px) translateX(0px);
    }
}
@-webkit-keyframes animateKittyStance{
    0% {
        transform: translateY(-5px) translateX(5px);
    }
    30%{
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
    30%{
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
    30%{
        transform: translateY(0px) translateX(0px);
    }
    100% {
        transform: translateY(0px) translateX(0px);
    }
}

@-webkit-keyframes animateContent{
    100% {
        transform: translateY(2000px) translateX(-750px);
    }
    50% {
      transform: translateY(1000px) translateX(-250px);
    }
    0% {
        transform: translateY(0px) translateX(0px);
    }
}

@-moz-keyframes animateContent {
    100% {
        transform: translateY(2000px) translateX(-750px);
    }
    50% {
      transform: translateY(1000px) translateX(-250px);
    }
    0% {
        transform: translateY(0px) translateX(0px);
    }
}

@keyframes animateContent {
    100% {
        transform: translateY(2000px) translateX(-750px);
    }
    50% {
      transform: translateY(1000px) translateX(-250px);
    }
    0% {
        transform: translateY(0px) translateX(0px);
    }
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px) {
h2 {
  font-size: 1em;
} .btn-randomize:hover{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5em;
  height: 3.5em;
  top: 1em;
  margin-left: 2em;
  color: black;
  background: white;
  border-radius: 100%;
  font-size: 12pt;
  font-weight: 600;
  cursor:pointer;
  border: 3px solid rgb(200, 246, 228);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.btn-start:hover{
  margin-top: 2em;
  padding: 1em 3em;
  color: black;
  background: white;
  border-radius: 20px;
  font-size: 12pt;
  font-weight: 600;
  cursor:pointer;
  border: 3px solid rgb(200, 246, 228);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
}
</style>

