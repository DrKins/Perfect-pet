export interface StateInterface {
  Landing: boolean;
  Questions: boolean;
  Final: boolean;
  userAnswers: IUserAnswer;
  questions: IQuestion[];
}
 
export interface IUserAnswer {
  petName: string;
  answers: string[];
}
 
export interface IQuestion {
  id: number;
  question: string;
  answers: string[];
}