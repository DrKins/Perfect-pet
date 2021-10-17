<template>
  <div class="final">
    <h2 class="animate__animated animate__fadeIn" v-if="shuffelData.length === 0">My pet is {{userAnswers.answers[0]}}, and although he likes to {{userAnswers.answers[1]}}, he really hates {{userAnswers.answers[2]}}.</h2>
    <h2 class="animate__animated animate__fadeIn" v-else>My pet is {{shuffelData[0]}}, and although he likes to {{shuffelData[1]}}, he really hates {{shuffelData[2]}}.</h2>
    <h2 class="animate__animated animate__fadeIn" v-if="userAnswers.petName !== ''">My pet name's is {{userAnswers.petName}} </h2>
    <div class="btn-container animate__animated animate__fadeInUp">
    <button class="btn-reset" v-on:click="clearData(),resetFunctionality()">Reset</button>
    <button v-if="shuffelData.length === 0" class="btn-randomize" v-on:click="shuffleFunctionality"><img src="../assets/shuffle.png" alt="shuffle" title="shuffle"></button>
    <button v-else class="btn-randomize" v-on:click="shuffleReset"><img src="../assets/back.png" alt="back" title="back"></button>
    </div>
    <img alt="Vue logo" src="../assets/kitty.png" class="KittyLogo" :class="{ enterKitty: EntranceKitty, stanceKitty: StanceKitty}">
    <div v-for="item,index in ['x1','x2']" :key="index">
          <div :class="item"><div class="cloud"></div></div>
    </div>  
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapGetters, mapMutations } from 'vuex';

@Options({
  data(){
    return{
      shuffelData: [] as string[] | unknown[],
      StanceKitty: false as boolean,
      EntranceKitty: true as boolean
    }
  },
  computed: {
    ...mapGetters(['questions','userAnswers']),
  },
  methods:{
    ...mapMutations(['clearData','LandingControllerMutation','FinalControllerMutation']),
    //As name tells it is function that resets quiz. Resets sessionStorage data and bring us back to start by mutating right Controllers.
    resetFunctionality(){
      this.FinalControllerMutation(false);
      this.LandingControllerMutation(true);
    },
    //shuffleFunctionality method pushes shuffeled answers into new array and presents them on screen
    shuffleFunctionality(){
      this.shuffelData.push(this.userAnswers.answers[0].split('').sort(function(){return 0.5-Math.random()}).join(''),this.userAnswers.answers[1].split('').sort(function(){return 0.5-Math.random()}).join(''),this.userAnswers.answers[2].split('').sort(function(){return 0.5-Math.random()}).join(''))
    },
    //Restoring normal values before shuffle.
    shuffleReset(){
      this.shuffelData = []
    },
    animationChange(){
      setTimeout(()=>{
      this.EntranceKitty = false;
      this.StanceKitty = true;  
      },2500)
    }
  },
  mounted(){
    this.animationChange()
  }
})
export default class Final extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* TABLE OF CONTENT */

.final{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-reset{
  margin-top: 2em;
  padding: 1em 4em;
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
.btn-reset:hover, .btn-randomize:hover{
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
.KittyLogo{
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
.enterKitty{
  -webkit-animation: animateKittyEntrance 2.5s linear infinite;
	-moz-animation: animateKittyEntrance 2.5s linear infinite;
	animation: animateKittyEntrance 2.5s linear infinite;
  filter: blur(1px);
}
.stanceKitty{
  -webkit-animation: animateKittyStance 6.5s linear infinite;
	-moz-animation: animateKittyStance 6.55s linear infinite;
	animation: animateKittyStance 6.5s linear infinite;
  animation-direction: alternate-reverse;   
}
.flyoutKitty{
    -webkit-animation: animateKitty 4s linear infinite;
    -moz-animation: animateKitty 4s linear infinite;
    animation: animateKitty 4s linear infinite;
    filter: blur(2px);
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
    top: 40em;
    left: 1em;
    -webkit-animation: animateCloud1 15s linear infinite;
    -moz-animation: animateCloud1 15s linear infinite;
    animation: animateCloud1 15s linear infinite;
    animation-direction: alternate-reverse;
  }
  
  .x2 {
    position: absolute;
    top: 5em;
    right: 10em;
    -webkit-animation: animateCloud2 15s linear infinite;
    -moz-animation: animateCloud2 15s linear infinite;
    animation: animateCloud2 15s linear infinite;
    animation-direction: alternate-reverse; 
  }

@-webkit-keyframes animateKitty{
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

@-webkit-keyframes animateKittyEntrance{
    0% {
        transform: translateY(1000px) translateX(-750px);
    }
    40% {
      transform: translateY(500px) translateX(-200px);
    }
    70%{
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
    70%{
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
    70%{
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
@media only screen 
and (min-device-width : 320px) 
and (max-device-width : 480px) {
h2 {
  font-size: 1em;
  margin:0 2em;
  
}.btn-randomize:hover{
  display: flex;
  justify-content: center;
  align-items: center;
  top: 1em;
  margin-left: 2em;
  color: black;
  background: white;
  font-size: 12pt;
  font-weight: 600;
  cursor:pointer;
  border: 3px solid rgb(200, 246, 228);
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
}
</style>

