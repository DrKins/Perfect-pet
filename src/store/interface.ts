export interface StateInterface {
  Landing: boolean,
  Questions: boolean,
  Final: boolean,
  userAnswers:{
    petName: string,
    answers: string[]
  },
  questions:{
    id: number,
    question: string,
    answers: string[]
  }[]
}