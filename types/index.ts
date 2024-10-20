export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
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
  participants?: IQuizParticipant[];
  createdAt: Date;
}

export interface IQuestion {
  id: string;
  title: string;
  answer: string;
  options: IOption[];
  quizId: string;
}

export interface IOption {
  id: string;
  key: string;
  value: string;
  questionId: string;
}

export interface IImage {
  id?: string;
  key: string;
  publicId?: string;
  file?: File;
  url: string;
  quizId?: string;
}

export interface IQuizParticipant {
  id: string;
  answers: IParticipantQuizAnswer[];
  userId: string;
  quizId: string;
  groupId: string;
  createdAt: Date;

  user: IUser;
  quiz: IQuiz;
  group: IGroup;
}

export interface IParticipantQuizAnswer {
  id?: string;
  answer: string;
  questionId: string;
  quizId?: string;
}
