export interface IUser {
  id: string;
  email: string;
  exp: number;
  iat: number;
}

export interface IGroup {
  id: string;
  name: string;
  desc: string;
  adminId: string;

  quizzes: IQuiz[];
}

export interface IQuiz {
  id: string;
  title: string;
  desc: string;
  duration: number;
  maxMarks: number;
  userInputs: string[];
  footerHeading1: string;
  footerHeading2: string;
  footerText1: string;
  footerText2: string;
  footerLink: string;
  author: string;
  groupId: string;
  published: boolean;

  questions: IQuestion[];
  images?: IImage[];
  participants?: QuizzesParticipant[];
  createdAt: Date;
}

export interface IQuestion {
  id: string;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;

  quizId: string;
}

export interface IImage {
  id: string;
  key: string;
  url: string;
  quizId: string;
}

export interface QuizzesParticipant {
  id: string;
  answers: string[];
  userId: string;
  quizId: string;
  groupId: string;
  createdAt: Date;

  user: IUser;
  quiz: IQuiz;
}
