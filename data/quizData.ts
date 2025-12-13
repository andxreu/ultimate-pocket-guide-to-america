
/**
 * Quiz Data
 * 
 * Civic education quiz questions covering American government, history, and civics.
 * 
 * Features:
 * - 30 quiz questions on various civics topics
 * - Question randomization
 * - Option shuffling to prevent memorization
 * - Explanations for each answer
 * 
 * Topics covered:
 * - Branches of Government
 * - Constitution and Amendments
 * - Rights and Freedoms
 * - Electoral Process
 * - American History
 * - Civic Responsibilities
 * 
 * @module data/quizData
 */

/**
 * Quiz Question interface
 */
export interface QuizQuestion {
  /** Unique identifier for the question */
  id: string;
  /** The question text */
  question: string;
  /** Array of answer options (typically 4 choices) */
  options: string[];
  /** Index of the correct answer in the options array */
  correctIndex: number;
  /** Optional explanation of the correct answer */
  explanation?: string;
}

/**
 * Quiz Question Pool
 * 
 * Complete collection of 30 civics quiz questions covering core topics
 * in American government, history, and citizenship.
 * 
 * Question categories:
 * - **Government Structure** (Questions 1-14) - Branches, Congress, Courts
 * - **Rights & Freedoms** (Questions 15-16, 19) - First Amendment, Bill of Rights
 * - **Founding Documents** (Questions 17-18, 24, 29-30) - Declaration, Constitution
 * - **Systems & Principles** (Questions 20-23) - Economy, rule of law, checks & balances
 * - **Civic Duties** (Questions 25-28) - Responsibilities, voting, citizenship
 * 
 * Each question includes:
 * - Unique ID for tracking
 * - Clear question text
 * - 4 multiple choice options
 * - Correct answer index
 * - Educational explanation
 * 
 * @constant
 */
export const quizQuestionPool: QuizQuestion[] = [
  {
    id: "q1",
    question: "What are the three branches of the U.S. government?",
    options: [
      "Executive, Legislative, Judicial",
      "President, Congress, Supreme Court",
      "Federal, State, Local",
      "Senate, House, Cabinet",
    ],
    correctIndex: 0,
    explanation:
      "The three branches are Executive (President), Legislative (Congress), and Judicial (Courts). This separation of powers prevents any one branch from becoming too powerful.",
  },
  {
    id: "q2",
    question: "How many amendments does the Constitution have?",
    options: ["10", "27", "50", "100"],
    correctIndex: 1,
    explanation:
      "The Constitution has 27 amendments. The first 10 are known as the Bill of Rights, ratified in 1791.",
  },
  {
    id: "q3",
    question: "What is the supreme law of the land?",
    options: [
      "The Declaration of Independence",
      "The Bill of Rights",
      "The Constitution",
      "Federal statutes",
    ],
    correctIndex: 2,
    explanation:
      "The Constitution is the supreme law of the land. All other laws must comply with it.",
  },
  {
    id: "q4",
    question: "What do we call the first ten amendments to the Constitution?",
    options: [
      "The Preamble",
      "The Bill of Rights",
      "The Articles",
      "The Federalist Papers",
    ],
    correctIndex: 1,
    explanation:
      "The first ten amendments are called the Bill of Rights. They protect fundamental freedoms like speech, religion, and due process.",
  },
  {
    id: "q5",
    question: "How many U.S. Senators are there?",
    options: ["50", "100", "435", "538"],
    correctIndex: 1,
    explanation:
      "There are 100 U.S. Senators, two from each of the 50 states. They serve six-year terms.",
  },
  {
    id: "q6",
    question: "How many voting members are in the House of Representatives?",
    options: ["100", "435", "50", "538"],
    correctIndex: 1,
    explanation:
      "There are 435 voting members in the House of Representatives. The number is based on state population and has been fixed at 435 since 1913.",
  },
  {
    id: "q7",
    question: "How long is a U.S. Senator's term?",
    options: ["2 years", "4 years", "6 years", "8 years"],
    correctIndex: 2,
    explanation:
      "U.S. Senators serve six-year terms. Elections are staggered so that about one-third of the Senate is up for election every two years.",
  },
  {
    id: "q8",
    question: "How long is a U.S. Representative's term?",
    options: ["2 years", "4 years", "6 years", "8 years"],
    correctIndex: 0,
    explanation:
      "U.S. Representatives serve two-year terms. All 435 seats are up for election every two years.",
  },
  {
    id: "q9",
    question: "Who is the Commander in Chief of the military?",
    options: [
      "The Secretary of Defense",
      "The Chairman of the Joint Chiefs",
      "The President",
      "Congress",
    ],
    correctIndex: 2,
    explanation:
      "The President is the Commander in Chief of the military. This civilian control of the military is a key principle of American democracy.",
  },
  {
    id: "q10",
    question: "Who signs bills to become laws?",
    options: [
      "The Speaker of the House",
      "The Chief Justice",
      "The President",
      "The Senate Majority Leader",
    ],
    correctIndex: 2,
    explanation:
      "The President signs bills to become laws. The President can also veto bills, but Congress can override a veto with a two-thirds vote in both chambers.",
  },
  {
    id: "q11",
    question: "Who vetoes bills?",
    options: [
      "The President",
      "The Supreme Court",
      "The Senate",
      "The Speaker of the House",
    ],
    correctIndex: 0,
    explanation:
      "The President can veto bills passed by Congress. This is one of the checks and balances in the U.S. government.",
  },
  {
    id: "q12",
    question: "What does the judicial branch do?",
    options: [
      "Makes laws",
      "Enforces laws",
      "Reviews and interprets laws",
      "Proposes laws",
    ],
    correctIndex: 2,
    explanation:
      "The judicial branch reviews and interprets laws. It decides if laws are constitutional and resolves disputes.",
  },
  {
    id: "q13",
    question: "What is the highest court in the United States?",
    options: [
      "The Court of Appeals",
      "The District Court",
      "The Supreme Court",
      "The Federal Court",
    ],
    correctIndex: 2,
    explanation:
      "The Supreme Court is the highest court in the United States. It has final say on constitutional questions.",
  },
  {
    id: "q14",
    question: "How many justices are on the Supreme Court?",
    options: ["7", "9", "11", "12"],
    correctIndex: 1,
    explanation:
      "There are nine justices on the Supreme Court: one Chief Justice and eight Associate Justices.",
  },
  {
    id: "q15",
    question: "What is freedom of religion?",
    options: [
      "You must choose a religion",
      "You can practice any religion, or not practice a religion",
      "The government chooses your religion",
      "Only certain religions are allowed",
    ],
    correctIndex: 1,
    explanation:
      "Freedom of religion means you can practice any religion or choose not to practice a religion. The government cannot establish an official religion or prevent free exercise of religion.",
  },
  {
    id: "q16",
    question: "What is the First Amendment?",
    options: [
      "Right to bear arms",
      "Freedom of speech, religion, press, assembly, and petition",
      "Right to a fair trial",
      "Protection against unreasonable search",
    ],
    correctIndex: 1,
    explanation:
      "The First Amendment protects five fundamental freedoms: speech, religion, press, assembly, and petition. These are considered essential to a free society.",
  },
  {
    id: "q17",
    question: "What did the Declaration of Independence do?",
    options: [
      "Created the Constitution",
      "Announced our independence from Great Britain",
      "Ended the Civil War",
      "Gave women the right to vote",
    ],
    correctIndex: 1,
    explanation:
      "The Declaration of Independence announced our independence from Great Britain on July 4, 1776. It explained why the colonies were breaking away.",
  },
  {
    id: "q18",
    question: "When was the Declaration of Independence adopted?",
    options: ["July 4, 1776", "July 4, 1787", "July 4, 1791", "July 4, 1865"],
    correctIndex: 0,
    explanation:
      "The Declaration of Independence was adopted on July 4, 1776. This date is celebrated as Independence Day.",
  },
  {
    id: "q19",
    question: "What is one right or freedom from the First Amendment?",
    options: [
      "Right to bear arms",
      "Freedom of speech",
      "Right to vote",
      "Right to a fair trial",
    ],
    correctIndex: 1,
    explanation:
      "Freedom of speech is one of the five freedoms protected by the First Amendment. Others include religion, press, assembly, and petition.",
  },
  {
    id: "q20",
    question: "What is the economic system in the United States?",
    options: [
      "Communist economy",
      "Socialist economy",
      "Capitalist or market economy",
      "Command economy",
    ],
    correctIndex: 2,
    explanation:
      "The United States has a capitalist or market economy. This means economic decisions are largely made by individuals and businesses rather than by the government.",
  },
  {
    id: "q21",
    question: "What is the rule of law?",
    options: [
      "The President makes all the rules",
      "Everyone must follow the law, including leaders",
      "Only citizens must follow the law",
      "Laws can be ignored if unpopular",
    ],
    correctIndex: 1,
    explanation:
      "The rule of law means everyone must follow the law, including government leaders. No one is above the law.",
  },
  {
    id: "q22",
    question: "What stops one branch of government from becoming too powerful?",
    options: [
      "The President",
      "The people",
      "Checks and balances",
      "The states",
    ],
    correctIndex: 2,
    explanation:
      "Checks and balances prevent any one branch from becoming too powerful. Each branch has ways to limit the power of the other branches.",
  },
  {
    id: "q23",
    question: "Who makes federal laws?",
    options: [
      "The President",
      "The Supreme Court",
      "Congress (Senate and House of Representatives)",
      "The Cabinet",
    ],
    correctIndex: 2,
    explanation:
      "Congress makes federal laws. Congress is made up of the Senate and the House of Representatives.",
  },
  {
    id: "q24",
    question: "What are two rights in the Declaration of Independence?",
    options: [
      "Life and liberty",
      "Freedom and justice",
      "Peace and prosperity",
      "Safety and security",
    ],
    correctIndex: 0,
    explanation:
      "The Declaration of Independence lists life, liberty, and the pursuit of happiness as unalienable rights. These are rights that cannot be taken away.",
  },
  {
    id: "q25",
    question: "What is one responsibility that is only for United States citizens?",
    options: [
      "Pay taxes",
      "Obey the law",
      "Serve on a jury",
      "Respect others' rights",
    ],
    correctIndex: 2,
    explanation:
      "Serving on a jury is a responsibility only for U.S. citizens. Jury duty is an important part of the justice system.",
  },
  {
    id: "q26",
    question: "How many years does a President serve in one term?",
    options: ["2 years", "4 years", "6 years", "8 years"],
    correctIndex: 1,
    explanation:
      "A President serves a four-year term. A President can serve a maximum of two terms.",
  },
  {
    id: "q27",
    question: "In what month do we vote for President?",
    options: ["January", "November", "September", "December"],
    correctIndex: 1,
    explanation:
      "We vote for President in November. Presidential elections are held on the first Tuesday after the first Monday in November.",
  },
  {
    id: "q28",
    question: "What is the capital of the United States?",
    options: ["New York City", "Washington, D.C.", "Philadelphia", "Boston"],
    correctIndex: 1,
    explanation:
      "Washington, D.C. is the capital of the United States. It is not part of any state.",
  },
  {
    id: "q29",
    question: "Who wrote the Declaration of Independence?",
    options: [
      "George Washington",
      "Thomas Jefferson",
      "Benjamin Franklin",
      "John Adams",
    ],
    correctIndex: 1,
    explanation:
      "Thomas Jefferson wrote the Declaration of Independence. He was the third President of the United States.",
  },
  {
    id: "q30",
    question: "When was the Constitution written?",
    options: ["1776", "1787", "1791", "1800"],
    correctIndex: 1,
    explanation:
      "The Constitution was written in 1787 at the Constitutional Convention in Philadelphia.",
  },
];

/**
 * Generates a randomized quiz with shuffled questions and options
 * 
 * This function creates a quiz by:
 * 1. Randomly selecting questions from the pool
 * 2. Shuffling the answer options for each question
 * 3. Updating the correct answer index after shuffling
 * 
 * @param numQuestions - Number of questions to include (default: 10, max: 30)
 * @returns Array of randomized quiz questions with shuffled options
 * 
 * @example
 * ```typescript
 * // Generate a 10-question quiz
 * const quiz = generateRandomQuiz(10);
 * 
 * // Generate a full 30-question quiz
 * const fullQuiz = generateRandomQuiz(30);
 * 
 * // Generate a 5-question quick quiz
 * const quickQuiz = generateRandomQuiz(5);
 * ```
 */
export function generateRandomQuiz(numQuestions: number = 10): QuizQuestion[] {
  // Shuffle the question pool
  const shuffled = [...quizQuestionPool].sort(() => Math.random() - 0.5);
  
  // Take the first numQuestions
  const selectedQuestions = shuffled.slice(0, Math.min(numQuestions, shuffled.length));
  
  // Randomize the options for each question
  return selectedQuestions.map(question => {
    const correctOption = question.options[question.correctIndex];
    const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
    const newCorrectIndex = shuffledOptions.indexOf(correctOption);
    
    return {
      ...question,
      options: shuffledOptions,
      correctIndex: newCorrectIndex,
    };
  });
}

/**
 * Default Quiz Data
 * 
 * Pre-generated 25-question quiz for backwards compatibility.
 * Uses randomized selection and shuffled options.
 * 
 * For custom quiz lengths, use `generateRandomQuiz(numQuestions)` instead.
 * 
 * @constant
 */
export const quizData = generateRandomQuiz(25);
