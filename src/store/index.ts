import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import { StateInterface } from "./interface";
 
const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.sessionStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});
 
export default createStore<StateInterface>({
  state: {
    //Controllers imported component. They act as traffic light for vue-render in order to know what and when to show.
    Landing: true,
    Questions: false,
    Final: false,
    //simple object which values of properties will be dinamically changed through application.
    userAnswers: {
      petName: "",
      answers: [],
    },
    //array of objects containing questions. This state is static, will not be changed.
    questions: [
      {
        id: 1,
        question: "Your perfect pet is:",
        answers: ["Small", "Big", "Medium", "Wow"],
      },
      {
        id: 2,
        question: "Your perfect pet likes to:",
        answers: ["Eat a lot", "Run a lot", "Drink water", "Joke about you"],
      },
      {
        id: 3,
        question: "Your perfect pet hates:",
        answers: ["Hot weather", "Cold weather", "You", "Your bestfriend"],
      },
    ],
  },
  getters: {
    landingController(state) {
      return state.Landing;
    },
    questionsController(state) {
      return state.Questions;
    },
    finalController(state) {
      return state.Final;
    },
    //question getter will return state questions to user.
    //Questions is array of objects, each object is one question.
    questions(state) {
      return state.questions;
    },
    //userAnswers is getter that will return state userAnswers. userAnswers is only object with two properites.
    //One of them is pet name, second is array of user answers.
    userAnswers(state) {
      return state.userAnswers;
    },
  },
  mutations: {
    // If payload of Controllers is true, apropriate component will render, elsewise component won't render.
 
    //Controller mutations that tells us what component should render.
    LandingControllerMutation(state, payload: boolean) {
      state.Landing = payload;
    },
    //Controller mutations that tells us what component should render.
    QuestionsControllerMutation(state, payload: boolean) {
      state.Questions = payload;
    },
    //Controller mutations that tells us what component should render.
    FinalControllerMutation(state, payload: boolean) {
      state.Final = payload;
    },
    //mutation of user answer. It will be stored onto userAnswers object array answers.
    mutateAnswer(state, payload: string) {
      state.userAnswers.answers.push(payload);
    },
    //mutation that will clear data after pressing reset button. Basically it just sets value of userAnswers object as it was at the beggining.
    clearData(state) {
      state.userAnswers = {
        petName: "",
        answers: [],
      };
    },
    //This mutation will provide us with three random answers.
    randomizeAnswers(state, payload: string) {
      //myarray is map of state.questions. There will be three new arrays.
      const myarray = state.questions.map((x) => x.answers);
      //We initalize new empty array, I would like to say 'temporary array', so we can store our randomly generated answers.
      const newArr = [];
      //randomElements by math function
      const randomElement1 =
        myarray[0][Math.floor(Math.random() * myarray[0].length)];
      const randomElement2 =
        myarray[1][Math.floor(Math.random() * myarray[1].length)];
      const randomElement3 =
        myarray[2][Math.floor(Math.random() * myarray[2].length)];
      //pushing Elements to empty array
      newArr.push(randomElement1, randomElement2, randomElement3);
      //Updating state array with copy of our temporaray array.
      state.userAnswers = {
        petName: payload,
        answers: [...newArr],
      };
    },
    //This mutation will mutate pet name if user enters it.
    savePetName(state, payload: string) {
      state.userAnswers.petName = payload;
    },
  },
  plugins: [vuexLocalStorage.plugin],
});