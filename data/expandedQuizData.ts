
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizTest {
  id: number;
  title: string;
  questions: QuizQuestion[];
}

// Create 20 quiz tests with 10 questions each (200 total questions)
export const quizTests: QuizTest[] = [
  {
    id: 1,
    title: "Foundations of Government",
    questions: [
      {
        id: "q1_1",
        question: "What are the three branches of the U.S. government?",
        options: ["Executive, Legislative, Judicial", "President, Congress, Supreme Court", "Federal, State, Local", "Senate, House, Cabinet"],
        correctIndex: 0,
        explanation: "The three branches are Executive (President), Legislative (Congress), and Judicial (Courts). This separation of powers prevents any one branch from becoming too powerful."
      },
      {
        id: "q1_2",
        question: "What is the supreme law of the land?",
        options: ["The Declaration of Independence", "The Bill of Rights", "The Constitution", "Federal statutes"],
        correctIndex: 2,
        explanation: "The Constitution is the supreme law of the land. All other laws must comply with it."
      },
      {
        id: "q1_3",
        question: "What does the judicial branch do?",
        options: ["Makes laws", "Enforces laws", "Reviews and interprets laws", "Proposes laws"],
        correctIndex: 2,
        explanation: "The judicial branch reviews and interprets laws. It decides if laws are constitutional and resolves disputes."
      },
      {
        id: "q1_4",
        question: "What stops one branch of government from becoming too powerful?",
        options: ["The President", "The people", "Checks and balances", "The states"],
        correctIndex: 2,
        explanation: "Checks and balances prevent any one branch from becoming too powerful. Each branch has ways to limit the power of the other branches."
      },
      {
        id: "q1_5",
        question: "Who makes federal laws?",
        options: ["The President", "The Supreme Court", "Congress (Senate and House of Representatives)", "The Cabinet"],
        correctIndex: 2,
        explanation: "Congress makes federal laws. Congress is made up of the Senate and the House of Representatives."
      },
      {
        id: "q1_6",
        question: "What is the rule of law?",
        options: ["The President makes all the rules", "Everyone must follow the law, including leaders", "Only citizens must follow the law", "Laws can be ignored if unpopular"],
        correctIndex: 1,
        explanation: "The rule of law means everyone must follow the law, including government leaders. No one is above the law."
      },
      {
        id: "q1_7",
        question: "What is the economic system in the United States?",
        options: ["Communist economy", "Socialist economy", "Capitalist or market economy", "Command economy"],
        correctIndex: 2,
        explanation: "The United States has a capitalist or market economy. This means economic decisions are largely made by individuals and businesses rather than by the government."
      },
      {
        id: "q1_8",
        question: "What is federalism?",
        options: ["All power belongs to the national government", "All power belongs to the states", "Power is divided between national and state governments", "Power belongs to the people only"],
        correctIndex: 2,
        explanation: "Federalism means power is divided between the national government and state governments. This allows for both unity and local control."
      },
      {
        id: "q1_9",
        question: "What is the purpose of the Constitution?",
        options: ["To declare independence", "To establish and limit government power", "To list all laws", "To describe the flag"],
        correctIndex: 1,
        explanation: "The Constitution establishes the structure of government and limits its powers to protect individual rights."
      },
      {
        id: "q1_10",
        question: "What is a republic?",
        options: ["Direct democracy where everyone votes on everything", "Government where citizens elect representatives", "Rule by a king", "Rule by military"],
        correctIndex: 1,
        explanation: "A republic is a form of government where citizens elect representatives to make decisions on their behalf."
      }
    ]
  },
  {
    id: 2,
    title: "The Constitution",
    questions: [
      {
        id: "q2_1",
        question: "How many amendments does the Constitution have?",
        options: ["10", "27", "50", "100"],
        correctIndex: 1,
        explanation: "The Constitution has 27 amendments. The first 10 are known as the Bill of Rights, ratified in 1791."
      },
      {
        id: "q2_2",
        question: "When was the Constitution written?",
        options: ["1776", "1787", "1791", "1800"],
        correctIndex: 1,
        explanation: "The Constitution was written in 1787 at the Constitutional Convention in Philadelphia."
      },
      {
        id: "q2_3",
        question: "What do we call the first ten amendments to the Constitution?",
        options: ["The Preamble", "The Bill of Rights", "The Articles", "The Federalist Papers"],
        correctIndex: 1,
        explanation: "The first ten amendments are called the Bill of Rights. They protect fundamental freedoms like speech, religion, and due process."
      },
      {
        id: "q2_4",
        question: "What is the Preamble to the Constitution?",
        options: ["The first amendment", "The introduction that states the purpose", "The signature page", "The Bill of Rights"],
        correctIndex: 1,
        explanation: "The Preamble is the introduction to the Constitution that begins 'We the People' and states its purposes."
      },
      {
        id: "q2_5",
        question: "How can the Constitution be amended?",
        options: ["By presidential order", "By Supreme Court decision", "By proposal and ratification process", "By popular vote only"],
        correctIndex: 2,
        explanation: "The Constitution can be amended through a proposal (by Congress or convention) and ratification (by states) process."
      },
      {
        id: "q2_6",
        question: "What does the Constitution do?",
        options: ["Declares independence", "Sets up and defines the government", "Lists all federal laws", "Describes state boundaries"],
        correctIndex: 1,
        explanation: "The Constitution sets up the government, defines its powers, and protects the rights of citizens."
      },
      {
        id: "q2_7",
        question: "Who is called the 'Father of the Constitution'?",
        options: ["George Washington", "Thomas Jefferson", "James Madison", "Benjamin Franklin"],
        correctIndex: 2,
        explanation: "James Madison is known as the 'Father of the Constitution' for his central role in drafting and promoting it."
      },
      {
        id: "q2_8",
        question: "How many states had to ratify the Constitution for it to take effect?",
        options: ["7", "9", "11", "13"],
        correctIndex: 1,
        explanation: "Nine states had to ratify the Constitution for it to take effect, as specified in Article VII."
      },
      {
        id: "q2_9",
        question: "What is the supremacy clause?",
        options: ["The President is supreme", "The Constitution is the supreme law", "States are supreme", "Congress is supreme"],
        correctIndex: 1,
        explanation: "The supremacy clause (Article VI) establishes that the Constitution is the supreme law of the land."
      },
      {
        id: "q2_10",
        question: "What does 'We the People' mean?",
        options: ["Only citizens can vote", "Government gets its power from the people", "People must obey the government", "Only property owners have rights"],
        correctIndex: 1,
        explanation: "'We the People' means that government derives its authority from the consent of the governed."
      }
    ]
  },
  {
    id: 3,
    title: "Bill of Rights",
    questions: [
      {
        id: "q3_1",
        question: "What is the First Amendment?",
        options: ["Right to bear arms", "Freedom of speech, religion, press, assembly, and petition", "Right to a fair trial", "Protection against unreasonable search"],
        correctIndex: 1,
        explanation: "The First Amendment protects five fundamental freedoms: speech, religion, press, assembly, and petition."
      },
      {
        id: "q3_2",
        question: "What does the Second Amendment protect?",
        options: ["Freedom of speech", "Right to bear arms", "Right to vote", "Freedom of religion"],
        correctIndex: 1,
        explanation: "The Second Amendment protects the right to keep and bear arms."
      },
      {
        id: "q3_3",
        question: "What does the Fourth Amendment protect against?",
        options: ["Self-incrimination", "Unreasonable searches and seizures", "Cruel punishment", "Double jeopardy"],
        correctIndex: 1,
        explanation: "The Fourth Amendment protects against unreasonable searches and seizures and requires warrants to be based on probable cause."
      },
      {
        id: "q3_4",
        question: "What does the Fifth Amendment protect?",
        options: ["Freedom of speech", "Right to bear arms", "Protection against self-incrimination and double jeopardy", "Right to vote"],
        correctIndex: 2,
        explanation: "The Fifth Amendment includes protections against self-incrimination, double jeopardy, and guarantees due process."
      },
      {
        id: "q3_5",
        question: "What does the Sixth Amendment guarantee?",
        options: ["Freedom of religion", "Right to a speedy and public trial", "Right to bear arms", "Freedom of speech"],
        correctIndex: 1,
        explanation: "The Sixth Amendment guarantees the right to a speedy and public trial by an impartial jury."
      },
      {
        id: "q3_6",
        question: "What does the Eighth Amendment prohibit?",
        options: ["Freedom of speech", "Unreasonable searches", "Cruel and unusual punishment", "Self-incrimination"],
        correctIndex: 2,
        explanation: "The Eighth Amendment prohibits excessive bail, excessive fines, and cruel and unusual punishment."
      },
      {
        id: "q3_7",
        question: "What does the Tenth Amendment say?",
        options: ["All power belongs to the federal government", "Powers not delegated to the U.S. are reserved to the states or people", "The President has all power", "Only states have power"],
        correctIndex: 1,
        explanation: "The Tenth Amendment reserves powers not delegated to the federal government to the states or the people."
      },
      {
        id: "q3_8",
        question: "What is freedom of religion?",
        options: ["You must choose a religion", "You can practice any religion, or not practice a religion", "The government chooses your religion", "Only certain religions are allowed"],
        correctIndex: 1,
        explanation: "Freedom of religion means you can practice any religion or choose not to practice a religion."
      },
      {
        id: "q3_9",
        question: "What is freedom of speech?",
        options: ["You can say anything without consequences", "You can express your opinions without government punishment", "Only popular speech is protected", "Speech can be banned if offensive"],
        correctIndex: 1,
        explanation: "Freedom of speech protects your right to express opinions without government punishment, with narrow exceptions."
      },
      {
        id: "q3_10",
        question: "What is freedom of the press?",
        options: ["Only government-approved news", "The press can publish without government censorship", "The press must get permission", "Only certain topics can be covered"],
        correctIndex: 1,
        explanation: "Freedom of the press means the media can publish information and opinions without government censorship."
      }
    ]
  },
  {
    id: 4,
    title: "Legislative Branch",
    questions: [
      {
        id: "q4_1",
        question: "How many U.S. Senators are there?",
        options: ["50", "100", "435", "538"],
        correctIndex: 1,
        explanation: "There are 100 U.S. Senators, two from each of the 50 states."
      },
      {
        id: "q4_2",
        question: "How many voting members are in the House of Representatives?",
        options: ["100", "435", "50", "538"],
        correctIndex: 1,
        explanation: "There are 435 voting members in the House of Representatives, based on state population."
      },
      {
        id: "q4_3",
        question: "How long is a U.S. Senator's term?",
        options: ["2 years", "4 years", "6 years", "8 years"],
        correctIndex: 2,
        explanation: "U.S. Senators serve six-year terms, with elections staggered so about one-third are up for election every two years."
      },
      {
        id: "q4_4",
        question: "How long is a U.S. Representative's term?",
        options: ["2 years", "4 years", "6 years", "8 years"],
        correctIndex: 0,
        explanation: "U.S. Representatives serve two-year terms, with all 435 seats up for election every two years."
      },
      {
        id: "q4_5",
        question: "Who is the President of the Senate?",
        options: ["The Senate Majority Leader", "The Speaker of the House", "The Vice President", "The Chief Justice"],
        correctIndex: 2,
        explanation: "The Vice President of the United States serves as President of the Senate and casts tie-breaking votes."
      },
      {
        id: "q4_6",
        question: "Who is the presiding officer of the House of Representatives?",
        options: ["The Vice President", "The Speaker of the House", "The President", "The Chief Justice"],
        correctIndex: 1,
        explanation: "The Speaker of the House is the presiding officer of the House of Representatives."
      },
      {
        id: "q4_7",
        question: "What does Congress do?",
        options: ["Enforces laws", "Makes federal laws", "Interprets laws", "Appoints judges"],
        correctIndex: 1,
        explanation: "Congress makes federal laws. It is the legislative branch of government."
      },
      {
        id: "q4_8",
        question: "What is the minimum age to be a U.S. Senator?",
        options: ["25", "30", "35", "40"],
        correctIndex: 1,
        explanation: "A U.S. Senator must be at least 30 years old."
      },
      {
        id: "q4_9",
        question: "What is the minimum age to be a U.S. Representative?",
        options: ["21", "25", "30", "35"],
        correctIndex: 1,
        explanation: "A U.S. Representative must be at least 25 years old."
      },
      {
        id: "q4_10",
        question: "How can Congress override a presidential veto?",
        options: ["Simple majority in both houses", "Two-thirds vote in both houses", "Three-fourths vote in both houses", "Unanimous vote"],
        correctIndex: 1,
        explanation: "Congress can override a presidential veto with a two-thirds vote in both the House and Senate."
      }
    ]
  },
  {
    id: 5,
    title: "Executive Branch",
    questions: [
      {
        id: "q5_1",
        question: "Who is the Commander in Chief of the military?",
        options: ["The Secretary of Defense", "The Chairman of the Joint Chiefs", "The President", "Congress"],
        correctIndex: 2,
        explanation: "The President is the Commander in Chief of the military, ensuring civilian control."
      },
      {
        id: "q5_2",
        question: "Who signs bills to become laws?",
        options: ["The Speaker of the House", "The Chief Justice", "The President", "The Senate Majority Leader"],
        correctIndex: 2,
        explanation: "The President signs bills to become laws. The President can also veto bills."
      },
      {
        id: "q5_3",
        question: "Who vetoes bills?",
        options: ["The President", "The Supreme Court", "The Senate", "The Speaker of the House"],
        correctIndex: 0,
        explanation: "The President can veto bills passed by Congress as a check on legislative power."
      },
      {
        id: "q5_4",
        question: "How many years does a President serve in one term?",
        options: ["2 years", "4 years", "6 years", "8 years"],
        correctIndex: 1,
        explanation: "A President serves a four-year term and can serve a maximum of two terms."
      },
      {
        id: "q5_5",
        question: "What is the minimum age to be President?",
        options: ["30", "35", "40", "45"],
        correctIndex: 1,
        explanation: "A person must be at least 35 years old to be President."
      },
      {
        id: "q5_6",
        question: "In what month do we vote for President?",
        options: ["January", "November", "September", "December"],
        correctIndex: 1,
        explanation: "We vote for President in November, on the first Tuesday after the first Monday."
      },
      {
        id: "q5_7",
        question: "Who becomes President if both the President and Vice President can no longer serve?",
        options: ["Secretary of State", "Speaker of the House", "Senate Majority Leader", "Chief Justice"],
        correctIndex: 1,
        explanation: "The Speaker of the House is next in the line of succession after the Vice President."
      },
      {
        id: "q5_8",
        question: "What does the President's Cabinet do?",
        options: ["Makes laws", "Advises the President", "Interprets laws", "Approves treaties"],
        correctIndex: 1,
        explanation: "The Cabinet advises the President on various matters and heads executive departments."
      },
      {
        id: "q5_9",
        question: "Who nominates federal judges?",
        options: ["Congress", "The President", "The Supreme Court", "The states"],
        correctIndex: 1,
        explanation: "The President nominates federal judges, who must be confirmed by the Senate."
      },
      {
        id: "q5_10",
        question: "What is the maximum number of terms a President can serve?",
        options: ["One", "Two", "Three", "Unlimited"],
        correctIndex: 1,
        explanation: "A President can serve a maximum of two terms, as established by the 22nd Amendment."
      }
    ]
  },
  {
    id: 6,
    title: "Judicial Branch",
    questions: [
      {
        id: "q6_1",
        question: "What is the highest court in the United States?",
        options: ["The Court of Appeals", "The District Court", "The Supreme Court", "The Federal Court"],
        correctIndex: 2,
        explanation: "The Supreme Court is the highest court in the United States and has final say on constitutional questions."
      },
      {
        id: "q6_2",
        question: "How many justices are on the Supreme Court?",
        options: ["7", "9", "11", "12"],
        correctIndex: 1,
        explanation: "There are nine justices on the Supreme Court: one Chief Justice and eight Associate Justices."
      },
      {
        id: "q6_3",
        question: "How long do Supreme Court justices serve?",
        options: ["4 years", "10 years", "20 years", "Life (until retirement or death)"],
        correctIndex: 3,
        explanation: "Supreme Court justices serve for life to ensure judicial independence."
      },
      {
        id: "q6_4",
        question: "Who confirms Supreme Court justices?",
        options: ["The House of Representatives", "The Senate", "The President", "The people"],
        correctIndex: 1,
        explanation: "The Senate confirms Supreme Court justices nominated by the President."
      },
      {
        id: "q6_5",
        question: "What is judicial review?",
        options: ["Reviewing lower court decisions", "The power to declare laws unconstitutional", "Reviewing executive orders", "Reviewing treaties"],
        correctIndex: 1,
        explanation: "Judicial review is the power of courts to declare laws or actions unconstitutional."
      },
      {
        id: "q6_6",
        question: "What case established judicial review?",
        options: ["Brown v. Board of Education", "Marbury v. Madison", "Roe v. Wade", "Miranda v. Arizona"],
        correctIndex: 1,
        explanation: "Marbury v. Madison (1803) established the principle of judicial review."
      },
      {
        id: "q6_7",
        question: "What does the judicial branch do?",
        options: ["Makes laws", "Enforces laws", "Reviews and interprets laws", "Proposes laws"],
        correctIndex: 2,
        explanation: "The judicial branch reviews and interprets laws to ensure they comply with the Constitution."
      },
      {
        id: "q6_8",
        question: "Who is the head of the Supreme Court?",
        options: ["The President", "The Chief Justice", "The Attorney General", "The Speaker"],
        correctIndex: 1,
        explanation: "The Chief Justice is the head of the Supreme Court and the federal judiciary."
      },
      {
        id: "q6_9",
        question: "What is the role of federal courts?",
        options: ["Make laws", "Enforce laws", "Decide cases involving federal law and the Constitution", "Advise the President"],
        correctIndex: 2,
        explanation: "Federal courts decide cases involving federal law, the Constitution, and disputes between states."
      },
      {
        id: "q6_10",
        question: "Can Congress change the number of Supreme Court justices?",
        options: ["No, it's fixed in the Constitution", "Yes, by passing a law", "Only with a constitutional amendment", "Only the President can"],
        correctIndex: 1,
        explanation: "Congress can change the number of Supreme Court justices by passing a law, though it has been nine since 1869."
      }
    ]
  },
  {
    id: 7,
    title: "Declaration of Independence",
    questions: [
      {
        id: "q7_1",
        question: "What did the Declaration of Independence do?",
        options: ["Created the Constitution", "Announced our independence from Great Britain", "Ended the Civil War", "Gave women the right to vote"],
        correctIndex: 1,
        explanation: "The Declaration of Independence announced our independence from Great Britain on July 4, 1776."
      },
      {
        id: "q7_2",
        question: "When was the Declaration of Independence adopted?",
        options: ["July 4, 1776", "July 4, 1787", "July 4, 1791", "July 4, 1865"],
        correctIndex: 0,
        explanation: "The Declaration of Independence was adopted on July 4, 1776, now celebrated as Independence Day."
      },
      {
        id: "q7_3",
        question: "Who wrote the Declaration of Independence?",
        options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
        correctIndex: 1,
        explanation: "Thomas Jefferson wrote the Declaration of Independence, with input from others."
      },
      {
        id: "q7_4",
        question: "What are two rights in the Declaration of Independence?",
        options: ["Life and liberty", "Freedom and justice", "Peace and prosperity", "Safety and security"],
        correctIndex: 0,
        explanation: "The Declaration lists life, liberty, and the pursuit of happiness as unalienable rights."
      },
      {
        id: "q7_5",
        question: "What does 'unalienable rights' mean?",
        options: ["Rights that can be taken away", "Rights that cannot be taken away", "Rights only for citizens", "Rights granted by government"],
        correctIndex: 1,
        explanation: "Unalienable rights are rights that cannot be taken away or given up."
      },
      {
        id: "q7_6",
        question: "From whom does the government get its power according to the Declaration?",
        options: ["The King", "The military", "The consent of the governed", "The wealthy"],
        correctIndex: 2,
        explanation: "The Declaration states that governments derive their just powers from the consent of the governed."
      },
      {
        id: "q7_7",
        question: "What was the main purpose of the Declaration of Independence?",
        options: ["To create a new government", "To explain why the colonies were breaking from Britain", "To establish laws", "To declare war"],
        correctIndex: 1,
        explanation: "The Declaration explained why the colonies were justified in breaking away from British rule."
      },
      {
        id: "q7_8",
        question: "What does 'all men are created equal' mean?",
        options: ["Everyone has the same abilities", "Everyone has the same wealth", "Everyone has equal rights and dignity", "Everyone must be treated identically"],
        correctIndex: 2,
        explanation: "It means all people have equal rights and inherent dignity, regardless of their circumstances."
      },
      {
        id: "q7_9",
        question: "Who was the first to sign the Declaration of Independence?",
        options: ["George Washington", "Thomas Jefferson", "John Hancock", "Benjamin Franklin"],
        correctIndex: 2,
        explanation: "John Hancock was the first and most famous signer, with his large signature."
      },
      {
        id: "q7_10",
        question: "How many colonies signed the Declaration of Independence?",
        options: ["10", "12", "13", "15"],
        correctIndex: 2,
        explanation: "All thirteen colonies signed the Declaration of Independence."
      }
    ]
  },
  {
    id: 8,
    title: "American History - Founding Era",
    questions: [
      {
        id: "q8_1",
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correctIndex: 2,
        explanation: "George Washington was the first President, serving from 1789 to 1797."
      },
      {
        id: "q8_2",
        question: "What war did the United States fight to gain independence?",
        options: ["Civil War", "War of 1812", "Revolutionary War", "French and Indian War"],
        correctIndex: 2,
        explanation: "The Revolutionary War (1775-1783) was fought to gain independence from Britain."
      },
      {
        id: "q8_3",
        question: "Who is known as the 'Father of Our Country'?",
        options: ["Thomas Jefferson", "George Washington", "Benjamin Franklin", "John Adams"],
        correctIndex: 1,
        explanation: "George Washington is known as the 'Father of Our Country' for his leadership."
      },
      {
        id: "q8_4",
        question: "What did Benjamin Franklin do?",
        options: ["First President", "Wrote the Constitution alone", "Founding Father, inventor, and diplomat", "Led the army"],
        correctIndex: 2,
        explanation: "Benjamin Franklin was a Founding Father, inventor, diplomat, and helped draft the Constitution."
      },
      {
        id: "q8_5",
        question: "What were the Federalist Papers?",
        options: ["Newspaper articles", "Essays supporting the Constitution", "Laws passed by Congress", "Court decisions"],
        correctIndex: 1,
        explanation: "The Federalist Papers were essays written to promote ratification of the Constitution."
      },
      {
        id: "q8_6",
        question: "Who were the main authors of the Federalist Papers?",
        options: ["Washington, Jefferson, Franklin", "Hamilton, Madison, Jay", "Adams, Jefferson, Madison", "Franklin, Washington, Adams"],
        correctIndex: 1,
        explanation: "Alexander Hamilton, James Madison, and John Jay wrote the Federalist Papers."
      },
      {
        id: "q8_7",
        question: "What was the first capital of the United States?",
        options: ["Washington, D.C.", "Philadelphia", "New York City", "Boston"],
        correctIndex: 2,
        explanation: "New York City was the first capital, followed by Philadelphia, then Washington, D.C."
      },
      {
        id: "q8_8",
        question: "What did the Louisiana Purchase do?",
        options: ["Ended slavery", "Doubled the size of the U.S.", "Started a war", "Created new states"],
        correctIndex: 1,
        explanation: "The Louisiana Purchase (1803) doubled the size of the United States."
      },
      {
        id: "q8_9",
        question: "Who was President during the Louisiana Purchase?",
        options: ["George Washington", "John Adams", "Thomas Jefferson", "James Madison"],
        correctIndex: 2,
        explanation: "Thomas Jefferson was President when the Louisiana Purchase was made in 1803."
      },
      {
        id: "q8_10",
        question: "What was the War of 1812 about?",
        options: ["Independence from Britain", "Conflict with Britain over trade and territory", "Civil war", "War with France"],
        correctIndex: 1,
        explanation: "The War of 1812 was fought with Britain over trade restrictions and territorial disputes."
      }
    ]
  },
  {
    id: 9,
    title: "American History - Civil War Era",
    questions: [
      {
        id: "q9_1",
        question: "What did Abraham Lincoln do?",
        options: ["Wrote the Declaration", "Preserved the Union and freed the slaves", "First President", "Wrote the Constitution"],
        correctIndex: 1,
        explanation: "Abraham Lincoln preserved the Union during the Civil War and issued the Emancipation Proclamation."
      },
      {
        id: "q9_2",
        question: "What did the Emancipation Proclamation do?",
        options: ["Ended the Civil War", "Freed slaves in Confederate states", "Gave women the right to vote", "Created new states"],
        correctIndex: 1,
        explanation: "The Emancipation Proclamation (1863) freed slaves in Confederate states during the Civil War."
      },
      {
        id: "q9_3",
        question: "What war ended slavery in the United States?",
        options: ["Revolutionary War", "War of 1812", "Civil War", "World War I"],
        correctIndex: 2,
        explanation: "The Civil War (1861-1865) led to the end of slavery with the 13th Amendment."
      },
      {
        id: "q9_4",
        question: "What amendment abolished slavery?",
        options: ["10th Amendment", "13th Amendment", "15th Amendment", "19th Amendment"],
        correctIndex: 1,
        explanation: "The 13th Amendment (1865) abolished slavery in the United States."
      },
      {
        id: "q9_5",
        question: "What amendment gave citizenship to all persons born in the U.S.?",
        options: ["13th Amendment", "14th Amendment", "15th Amendment", "19th Amendment"],
        correctIndex: 1,
        explanation: "The 14th Amendment (1868) granted citizenship to all persons born or naturalized in the U.S."
      },
      {
        id: "q9_6",
        question: "What amendment gave African American men the right to vote?",
        options: ["13th Amendment", "14th Amendment", "15th Amendment", "19th Amendment"],
        correctIndex: 2,
        explanation: "The 15th Amendment (1870) prohibited denying the right to vote based on race."
      },
      {
        id: "q9_7",
        question: "What was the main cause of the Civil War?",
        options: ["Taxes", "Slavery and states' rights", "Foreign invasion", "Religious differences"],
        correctIndex: 1,
        explanation: "The Civil War was primarily caused by disputes over slavery and states' rights."
      },
      {
        id: "q9_8",
        question: "Who was President during the Civil War?",
        options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Andrew Johnson"],
        correctIndex: 2,
        explanation: "Abraham Lincoln was President during the Civil War (1861-1865)."
      },
      {
        id: "q9_9",
        question: "What was Reconstruction?",
        options: ["Building new cities", "Rebuilding the South after the Civil War", "Creating new states", "Industrial development"],
        correctIndex: 1,
        explanation: "Reconstruction (1865-1877) was the period of rebuilding the South and integrating freed slaves."
      },
      {
        id: "q9_10",
        question: "What famous speech did Lincoln give at Gettysburg?",
        options: ["Inaugural Address", "Gettysburg Address", "Emancipation Proclamation", "State of the Union"],
        correctIndex: 1,
        explanation: "The Gettysburg Address (1863) is one of the most famous speeches in American history."
      }
    ]
  },
  {
    id: 10,
    title: "American History - 20th Century",
    questions: [
      {
        id: "q10_1",
        question: "What amendment gave women the right to vote?",
        options: ["15th Amendment", "18th Amendment", "19th Amendment", "21st Amendment"],
        correctIndex: 2,
        explanation: "The 19th Amendment (1920) granted women the right to vote."
      },
      {
        id: "q10_2",
        question: "Who was President during World War I?",
        options: ["Theodore Roosevelt", "Woodrow Wilson", "Warren Harding", "Calvin Coolidge"],
        correctIndex: 1,
        explanation: "Woodrow Wilson was President during World War I (1914-1918)."
      },
      {
        id: "q10_3",
        question: "Who was President during the Great Depression and World War II?",
        options: ["Herbert Hoover", "Harry Truman", "Franklin D. Roosevelt", "Dwight Eisenhower"],
        correctIndex: 2,
        explanation: "Franklin D. Roosevelt was President during the Great Depression and most of World War II."
      },
      {
        id: "q10_4",
        question: "What was the New Deal?",
        options: ["A peace treaty", "Programs to help during the Great Depression", "A trade agreement", "A military alliance"],
        correctIndex: 1,
        explanation: "The New Deal was a series of programs to provide relief and recovery during the Great Depression."
      },
      {
        id: "q10_5",
        question: "When did the United States enter World War II?",
        options: ["1939", "1941", "1943", "1945"],
        correctIndex: 1,
        explanation: "The United States entered World War II in 1941 after the attack on Pearl Harbor."
      },
      {
        id: "q10_6",
        question: "What was the Cold War?",
        options: ["A war in winter", "Tension between the U.S. and Soviet Union", "A civil war", "A trade war"],
        correctIndex: 1,
        explanation: "The Cold War (1947-1991) was a period of geopolitical tension between the U.S. and Soviet Union."
      },
      {
        id: "q10_7",
        question: "What movement fought for equal rights for African Americans in the 1950s and 1960s?",
        options: ["Labor Movement", "Civil Rights Movement", "Women's Movement", "Environmental Movement"],
        correctIndex: 1,
        explanation: "The Civil Rights Movement fought for equal rights and an end to segregation."
      },
      {
        id: "q10_8",
        question: "Who was Martin Luther King, Jr.?",
        options: ["A President", "A Civil Rights leader", "A Supreme Court Justice", "A military general"],
        correctIndex: 1,
        explanation: "Martin Luther King, Jr. was a leader of the Civil Rights Movement who advocated for nonviolent protest."
      },
      {
        id: "q10_9",
        question: "What did the Civil Rights Act of 1964 do?",
        options: ["Ended slavery", "Outlawed discrimination based on race, color, religion, sex, or national origin", "Gave women the right to vote", "Ended the war"],
        correctIndex: 1,
        explanation: "The Civil Rights Act of 1964 outlawed discrimination and ended segregation."
      },
      {
        id: "q10_10",
        question: "What did the Voting Rights Act of 1965 do?",
        options: ["Gave women the right to vote", "Prohibited racial discrimination in voting", "Lowered the voting age", "Created the Electoral College"],
        correctIndex: 1,
        explanation: "The Voting Rights Act of 1965 prohibited racial discrimination in voting."
      }
    ]
  },
  {
    id: 11,
    title: "Citizenship and Civic Duty",
    questions: [
      {
        id: "q11_1",
        question: "What is one responsibility that is only for United States citizens?",
        options: ["Pay taxes", "Obey the law", "Serve on a jury", "Respect others' rights"],
        correctIndex: 2,
        explanation: "Serving on a jury is a responsibility only for U.S. citizens."
      },
      {
        id: "q11_2",
        question: "What is one right only for United States citizens?",
        options: ["Freedom of speech", "Freedom of religion", "Vote in federal elections", "Own property"],
        correctIndex: 2,
        explanation: "Only U.S. citizens can vote in federal elections."
      },
      {
        id: "q11_3",
        question: "What are two ways that Americans can participate in their democracy?",
        options: ["Vote and join a civic group", "Pay taxes and obey laws", "Work and shop", "Watch TV and read"],
        correctIndex: 0,
        explanation: "Americans can participate by voting, joining civic groups, contacting officials, and more."
      },
      {
        id: "q11_4",
        question: "What is the minimum voting age in the United States?",
        options: ["16", "18", "21", "25"],
        correctIndex: 1,
        explanation: "The 26th Amendment (1971) lowered the voting age to 18."
      },
      {
        id: "q11_5",
        question: "What do we show loyalty to when we say the Pledge of Allegiance?",
        options: ["The President", "The Congress", "The United States", "The military"],
        correctIndex: 2,
        explanation: "The Pledge of Allegiance shows loyalty to the United States and its flag."
      },
      {
        id: "q11_6",
        question: "What is one promise you make when you become a United States citizen?",
        options: ["To never leave the U.S.", "To give up loyalty to other countries", "To join the military", "To learn a new language"],
        correctIndex: 1,
        explanation: "New citizens promise to give up loyalty to other countries and support the U.S. Constitution."
      },
      {
        id: "q11_7",
        question: "What are two rights of everyone living in the United States?",
        options: ["Vote and run for office", "Freedom of expression and freedom of speech", "Serve on a jury and vote", "Pay taxes and obey laws"],
        correctIndex: 1,
        explanation: "Everyone in the U.S. has freedom of expression, speech, assembly, and other basic rights."
      },
      {
        id: "q11_8",
        question: "What is one responsibility of all people living in the United States?",
        options: ["Vote", "Serve on a jury", "Obey the law", "Join the military"],
        correctIndex: 2,
        explanation: "Everyone living in the U.S. must obey the law, whether citizen or not."
      },
      {
        id: "q11_9",
        question: "Why do we pay taxes?",
        options: ["To punish people", "To fund government services", "To support other countries", "To pay politicians"],
        correctIndex: 1,
        explanation: "Taxes fund government services like schools, roads, defense, and social programs."
      },
      {
        id: "q11_10",
        question: "When must all men register for the Selective Service?",
        options: ["At age 16", "At age 18", "At age 21", "At age 25"],
        correctIndex: 1,
        explanation: "All men must register for the Selective Service at age 18."
      }
    ]
  },
  {
    id: 12,
    title: "American Symbols and Holidays",
    questions: [
      {
        id: "q12_1",
        question: "What is the capital of the United States?",
        options: ["New York City", "Washington, D.C.", "Philadelphia", "Boston"],
        correctIndex: 1,
        explanation: "Washington, D.C. is the capital of the United States."
      },
      {
        id: "q12_2",
        question: "Where is the Statue of Liberty?",
        options: ["Boston Harbor", "San Francisco Bay", "New York Harbor", "Chesapeake Bay"],
        correctIndex: 2,
        explanation: "The Statue of Liberty is in New York Harbor."
      },
      {
        id: "q12_3",
        question: "Why does the flag have 13 stripes?",
        options: ["For the 13 original colonies", "For the first 13 Presidents", "For the 13 amendments", "For 13 years of war"],
        correctIndex: 0,
        explanation: "The 13 stripes represent the 13 original colonies."
      },
      {
        id: "q12_4",
        question: "Why does the flag have 50 stars?",
        options: ["For the 50 years of independence", "For the 50 states", "For the 50 Founding Fathers", "For 50 amendments"],
        correctIndex: 1,
        explanation: "The 50 stars represent the 50 states."
      },
      {
        id: "q12_5",
        question: "What is the name of the national anthem?",
        options: ["America the Beautiful", "God Bless America", "The Star-Spangled Banner", "My Country, 'Tis of Thee"],
        correctIndex: 2,
        explanation: "The Star-Spangled Banner is the national anthem."
      },
      {
        id: "q12_6",
        question: "When do we celebrate Independence Day?",
        options: ["January 1", "July 4", "November 11", "December 25"],
        correctIndex: 1,
        explanation: "Independence Day is celebrated on July 4th."
      },
      {
        id: "q12_7",
        question: "What do we celebrate on Independence Day?",
        options: ["The Constitution", "The end of the Civil War", "Independence from Great Britain", "The first President"],
        correctIndex: 2,
        explanation: "Independence Day celebrates independence from Great Britain."
      },
      {
        id: "q12_8",
        question: "What is Memorial Day?",
        options: ["Celebrates living veterans", "Honors those who died in military service", "Celebrates independence", "Honors all Presidents"],
        correctIndex: 1,
        explanation: "Memorial Day honors those who died while serving in the U.S. military."
      },
      {
        id: "q12_9",
        question: "What is Veterans Day?",
        options: ["Honors those who died in service", "Honors all who have served in the military", "Celebrates independence", "Honors the President"],
        correctIndex: 1,
        explanation: "Veterans Day honors all who have served in the U.S. Armed Forces."
      },
      {
        id: "q12_10",
        question: "What does the Statue of Liberty symbolize?",
        options: ["Military power", "Freedom and democracy", "Wealth", "Education"],
        correctIndex: 1,
        explanation: "The Statue of Liberty symbolizes freedom and democracy."
      }
    ]
  },
  {
    id: 13,
    title: "Geography and States",
    questions: [
      {
        id: "q13_1",
        question: "How many states are in the United States?",
        options: ["48", "50", "52", "13"],
        correctIndex: 1,
        explanation: "There are 50 states in the United States."
      },
      {
        id: "q13_2",
        question: "Name one of the two longest rivers in the United States.",
        options: ["Hudson River", "Mississippi River", "Potomac River", "Charles River"],
        correctIndex: 1,
        explanation: "The Mississippi and Missouri Rivers are the two longest rivers in the U.S."
      },
      {
        id: "q13_3",
        question: "What ocean is on the West Coast of the United States?",
        options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
        correctIndex: 1,
        explanation: "The Pacific Ocean is on the West Coast."
      },
      {
        id: "q13_4",
        question: "What ocean is on the East Coast of the United States?",
        options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
        correctIndex: 0,
        explanation: "The Atlantic Ocean is on the East Coast."
      },
      {
        id: "q13_5",
        question: "Name one U.S. territory.",
        options: ["Canada", "Puerto Rico", "Mexico", "Cuba"],
        correctIndex: 1,
        explanation: "Puerto Rico, U.S. Virgin Islands, American Samoa, Guam, and Northern Mariana Islands are U.S. territories."
      },
      {
        id: "q13_6",
        question: "Name one state that borders Canada.",
        options: ["Texas", "Florida", "New York", "California"],
        correctIndex: 2,
        explanation: "States that border Canada include New York, Vermont, New Hampshire, Maine, Michigan, Minnesota, North Dakota, Montana, Idaho, Washington, and Alaska."
      },
      {
        id: "q13_7",
        question: "Name one state that borders Mexico.",
        options: ["Florida", "Texas", "Louisiana", "Nevada"],
        correctIndex: 1,
        explanation: "States that border Mexico include California, Arizona, New Mexico, and Texas."
      },
      {
        id: "q13_8",
        question: "What is the largest state by area?",
        options: ["Texas", "California", "Alaska", "Montana"],
        correctIndex: 2,
        explanation: "Alaska is the largest state by area."
      },
      {
        id: "q13_9",
        question: "What is the smallest state by area?",
        options: ["Delaware", "Connecticut", "Rhode Island", "New Jersey"],
        correctIndex: 2,
        explanation: "Rhode Island is the smallest state by area."
      },
      {
        id: "q13_10",
        question: "What is the most populous state?",
        options: ["Texas", "New York", "Florida", "California"],
        correctIndex: 3,
        explanation: "California has the largest population of any state."
      }
    ]
  },
  {
    id: 14,
    title: "Native Americans and Colonial History",
    questions: [
      {
        id: "q14_1",
        question: "Who lived in America before the Europeans arrived?",
        options: ["Vikings", "Native Americans", "Africans", "Asians"],
        correctIndex: 1,
        explanation: "Native Americans (American Indians) lived in America before Europeans arrived."
      },
      {
        id: "q14_2",
        question: "What group of people was taken to America and sold as slaves?",
        options: ["Europeans", "Asians", "Africans", "Native Americans"],
        correctIndex: 2,
        explanation: "Africans were taken to America and sold as slaves."
      },
      {
        id: "q14_3",
        question: "Why did the colonists fight the British?",
        options: ["For land", "Because of high taxes and no representation", "For religious freedom", "To expand territory"],
        correctIndex: 1,
        explanation: "Colonists fought because of high taxes without representation and other grievances."
      },
      {
        id: "q14_4",
        question: "Who wrote the Declaration of Independence?",
        options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
        correctIndex: 1,
        explanation: "Thomas Jefferson wrote the Declaration of Independence."
      },
      {
        id: "q14_5",
        question: "When was the Declaration of Independence adopted?",
        options: ["July 4, 1776", "July 4, 1787", "July 4, 1791", "July 4, 1865"],
        correctIndex: 0,
        explanation: "The Declaration of Independence was adopted on July 4, 1776."
      },
      {
        id: "q14_6",
        question: "What were the original 13 states called?",
        options: ["Territories", "Colonies", "Provinces", "Districts"],
        correctIndex: 1,
        explanation: "The original 13 states were called colonies."
      },
      {
        id: "q14_7",
        question: "Name one of the original 13 states.",
        options: ["California", "Texas", "Virginia", "Ohio"],
        correctIndex: 2,
        explanation: "The original 13 states include Virginia, Massachusetts, New York, and others."
      },
      {
        id: "q14_8",
        question: "What happened at the Constitutional Convention?",
        options: ["The Declaration was written", "The Constitution was written", "The war ended", "States were created"],
        correctIndex: 1,
        explanation: "The Constitution was written at the Constitutional Convention in 1787."
      },
      {
        id: "q14_9",
        question: "When was the Constitution written?",
        options: ["1776", "1787", "1791", "1800"],
        correctIndex: 1,
        explanation: "The Constitution was written in 1787."
      },
      {
        id: "q14_10",
        question: "What is one thing Benjamin Franklin is famous for?",
        options: ["First President", "Wrote the Constitution alone", "U.S. diplomat and inventor", "Led the army"],
        correctIndex: 2,
        explanation: "Benjamin Franklin was a U.S. diplomat, inventor, and Founding Father."
      }
    ]
  },
  {
    id: 15,
    title: "Federal System and State Powers",
    questions: [
      {
        id: "q15_1",
        question: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?",
        options: ["Provide schooling", "Provide police", "To print money", "Issue driver's licenses"],
        correctIndex: 2,
        explanation: "Federal powers include printing money, declaring war, creating an army, and making treaties."
      },
      {
        id: "q15_2",
        question: "Under our Constitution, some powers belong to the states. What is one power of the states?",
        options: ["Print money", "Declare war", "Provide schooling and education", "Make treaties"],
        correctIndex: 2,
        explanation: "State powers include providing schooling, police, driver's licenses, and local government."
      },
      {
        id: "q15_3",
        question: "Who is the Governor of your state now?",
        options: ["The President", "A Senator", "Varies by state", "The Vice President"],
        correctIndex: 2,
        explanation: "Each state has its own governor. The answer varies depending on where you live."
      },
      {
        id: "q15_4",
        question: "What is the capital of your state?",
        options: ["Washington, D.C.", "Varies by state", "New York", "Los Angeles"],
        correctIndex: 1,
        explanation: "Each state has its own capital city. The answer varies depending on where you live."
      },
      {
        id: "q15_5",
        question: "What are the two major political parties in the United States?",
        options: ["Republican and Libertarian", "Democratic and Republican", "Democratic and Green", "Republican and Constitution"],
        correctIndex: 1,
        explanation: "The two major political parties are the Democratic Party and the Republican Party."
      },
      {
        id: "q15_6",
        question: "What is the political party of the President now?",
        options: ["Republican", "Democratic", "Varies by current President", "Independent"],
        correctIndex: 2,
        explanation: "The answer varies depending on who is currently President."
      },
      {
        id: "q15_7",
        question: "What is federalism?",
        options: ["All power to the national government", "All power to the states", "Power divided between national and state governments", "Power to the people only"],
        correctIndex: 2,
        explanation: "Federalism is the division of power between the national and state governments."
      },
      {
        id: "q15_8",
        question: "What does the Tenth Amendment say?",
        options: ["All power to the federal government", "Powers not given to the federal government belong to the states or people", "The President has all power", "Only states have power"],
        correctIndex: 1,
        explanation: "The Tenth Amendment reserves powers not delegated to the federal government to the states or people."
      },
      {
        id: "q15_9",
        question: "Can states make their own laws?",
        options: ["No, only the federal government can", "Yes, as long as they don't conflict with the Constitution", "Only with federal permission", "Only in emergencies"],
        correctIndex: 1,
        explanation: "States can make their own laws as long as they don't conflict with the Constitution or federal law."
      },
      {
        id: "q15_10",
        question: "What is the supremacy clause?",
        options: ["States are supreme", "The President is supreme", "The Constitution and federal law are supreme", "Congress is supreme"],
        correctIndex: 2,
        explanation: "The supremacy clause (Article VI) makes the Constitution and federal law supreme over state law."
      }
    ]
  },
  {
    id: 16,
    title: "Rights and Freedoms",
    questions: [
      {
        id: "q16_1",
        question: "What is freedom of religion?",
        options: ["You must choose a religion", "You can practice any religion, or not practice a religion", "The government chooses your religion", "Only certain religions are allowed"],
        correctIndex: 1,
        explanation: "Freedom of religion means you can practice any religion or choose not to practice a religion."
      },
      {
        id: "q16_2",
        question: "What is one right or freedom from the First Amendment?",
        options: ["Right to bear arms", "Freedom of speech", "Right to vote", "Right to a fair trial"],
        correctIndex: 1,
        explanation: "The First Amendment protects freedom of speech, religion, press, assembly, and petition."
      },
      {
        id: "q16_3",
        question: "How many amendments does the Constitution have?",
        options: ["10", "27", "50", "100"],
        correctIndex: 1,
        explanation: "The Constitution has 27 amendments."
      },
      {
        id: "q16_4",
        question: "What do we call the first ten amendments to the Constitution?",
        options: ["The Preamble", "The Bill of Rights", "The Articles", "The Federalist Papers"],
        correctIndex: 1,
        explanation: "The first ten amendments are called the Bill of Rights."
      },
      {
        id: "q16_5",
        question: "What is one right or freedom from the First Amendment?",
        options: ["Right to bear arms", "Freedom of assembly", "Right to vote", "Right to a fair trial"],
        correctIndex: 1,
        explanation: "Freedom of assembly is one of the five freedoms protected by the First Amendment."
      },
      {
        id: "q16_6",
        question: "What is freedom of speech?",
        options: ["You can say anything without consequences", "You can express your opinions without government punishment", "Only popular speech is protected", "Speech can be banned if offensive"],
        correctIndex: 1,
        explanation: "Freedom of speech protects your right to express opinions without government punishment."
      },
      {
        id: "q16_7",
        question: "What is freedom of the press?",
        options: ["Only government-approved news", "The press can publish without government censorship", "The press must get permission", "Only certain topics can be covered"],
        correctIndex: 1,
        explanation: "Freedom of the press means the media can publish without government censorship."
      },
      {
        id: "q16_8",
        question: "What is the right to petition the government?",
        options: ["To sue the government", "To ask the government to change something", "To overthrow the government", "To ignore laws"],
        correctIndex: 1,
        explanation: "The right to petition means you can ask the government to change policies or address grievances."
      },
      {
        id: "q16_9",
        question: "What does the Second Amendment protect?",
        options: ["Freedom of speech", "Right to bear arms", "Right to vote", "Freedom of religion"],
        correctIndex: 1,
        explanation: "The Second Amendment protects the right to keep and bear arms."
      },
      {
        id: "q16_10",
        question: "What does the Fourth Amendment protect against?",
        options: ["Self-incrimination", "Unreasonable searches and seizures", "Cruel punishment", "Double jeopardy"],
        correctIndex: 1,
        explanation: "The Fourth Amendment protects against unreasonable searches and seizures."
      }
    ]
  },
  {
    id: 17,
    title: "Elections and Voting",
    questions: [
      {
        id: "q17_1",
        question: "What is the minimum voting age in the United States?",
        options: ["16", "18", "21", "25"],
        correctIndex: 1,
        explanation: "The 26th Amendment lowered the voting age to 18 in 1971."
      },
      {
        id: "q17_2",
        question: "In what month do we vote for President?",
        options: ["January", "November", "September", "December"],
        correctIndex: 1,
        explanation: "We vote for President in November, on the first Tuesday after the first Monday."
      },
      {
        id: "q17_3",
        question: "What is the Electoral College?",
        options: ["A university", "The system that elects the President", "A group of advisors", "A political party"],
        correctIndex: 1,
        explanation: "The Electoral College is the system that formally elects the President."
      },
      {
        id: "q17_4",
        question: "How many electoral votes does it take to win the presidency?",
        options: ["270", "300", "435", "538"],
        correctIndex: 0,
        explanation: "It takes 270 electoral votes to win the presidency (a majority of 538)."
      },
      {
        id: "q17_5",
        question: "Who can vote in federal elections?",
        options: ["All residents", "All adults", "Citizens 18 and older", "Property owners"],
        correctIndex: 2,
        explanation: "U.S. citizens who are 18 or older can vote in federal elections."
      },
      {
        id: "q17_6",
        question: "What are two ways that Americans can participate in their democracy?",
        options: ["Vote and join a civic group", "Pay taxes and obey laws", "Work and shop", "Watch TV and read"],
        correctIndex: 0,
        explanation: "Americans can participate by voting, joining civic groups, contacting officials, and more."
      },
      {
        id: "q17_7",
        question: "When is the last day you can send in federal income tax forms?",
        options: ["January 1", "April 15", "July 4", "December 31"],
        correctIndex: 1,
        explanation: "April 15 is the deadline for filing federal income tax forms."
      },
      {
        id: "q17_8",
        question: "What is one responsibility that is only for United States citizens?",
        options: ["Pay taxes", "Obey the law", "Vote in federal elections", "Respect others' rights"],
        correctIndex: 2,
        explanation: "Only U.S. citizens can vote in federal elections."
      },
      {
        id: "q17_9",
        question: "What is one right only for United States citizens?",
        options: ["Freedom of speech", "Freedom of religion", "Run for federal office", "Own property"],
        correctIndex: 2,
        explanation: "Only U.S. citizens can run for federal office and vote in federal elections."
      },
      {
        id: "q17_10",
        question: "What do we show loyalty to when we say the Pledge of Allegiance?",
        options: ["The President", "The Congress", "The United States", "The military"],
        correctIndex: 2,
        explanation: "The Pledge of Allegiance shows loyalty to the United States and its flag."
      }
    ]
  },
  {
    id: 18,
    title: "American Economy and Innovation",
    questions: [
      {
        id: "q18_1",
        question: "What is the economic system in the United States?",
        options: ["Communist economy", "Socialist economy", "Capitalist or market economy", "Command economy"],
        correctIndex: 2,
        explanation: "The United States has a capitalist or market economy."
      },
      {
        id: "q18_2",
        question: "What is one reason colonists came to America?",
        options: ["To escape war", "Freedom and economic opportunity", "Better weather", "To find gold"],
        correctIndex: 1,
        explanation: "Colonists came for freedom (religious, political, economic) and opportunity."
      },
      {
        id: "q18_3",
        question: "Who invented the light bulb?",
        options: ["Benjamin Franklin", "Thomas Edison", "Alexander Graham Bell", "Henry Ford"],
        correctIndex: 1,
        explanation: "Thomas Edison invented the practical electric light bulb."
      },
      {
        id: "q18_4",
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Benjamin Franklin", "Henry Ford"],
        correctIndex: 1,
        explanation: "Alexander Graham Bell invented the telephone in 1876."
      },
      {
        id: "q18_5",
        question: "What did Henry Ford do?",
        options: ["Invented the telephone", "Invented the light bulb", "Made cars affordable through mass production", "Invented the airplane"],
        correctIndex: 2,
        explanation: "Henry Ford revolutionized manufacturing with the assembly line, making cars affordable."
      },
      {
        id: "q18_6",
        question: "Who were the Wright brothers?",
        options: ["Inventors of the telephone", "First to fly a powered airplane", "Inventors of the light bulb", "Founders of a car company"],
        correctIndex: 1,
        explanation: "The Wright brothers achieved the first powered flight in 1903."
      },
      {
        id: "q18_7",
        question: "What is Silicon Valley known for?",
        options: ["Agriculture", "Technology and innovation", "Entertainment", "Finance"],
        correctIndex: 1,
        explanation: "Silicon Valley in California is the global center of technology and innovation."
      },
      {
        id: "q18_8",
        question: "What is Wall Street known for?",
        options: ["Technology", "Entertainment", "Finance and stock market", "Government"],
        correctIndex: 2,
        explanation: "Wall Street in New York City is the financial capital of the world."
      },
      {
        id: "q18_9",
        question: "What is Hollywood known for?",
        options: ["Technology", "Finance", "Film and entertainment industry", "Government"],
        correctIndex: 2,
        explanation: "Hollywood in Los Angeles is the center of the American film industry."
      },
      {
        id: "q18_10",
        question: "What is the U.S. dollar?",
        options: ["A local currency", "The world's primary reserve currency", "Only used in the U.S.", "Backed by gold"],
        correctIndex: 1,
        explanation: "The U.S. dollar is the world's primary reserve currency used in international trade."
      }
    ]
  },
  {
    id: 19,
    title: "American Culture and Values",
    questions: [
      {
        id: "q19_1",
        question: "What is the 'American Dream'?",
        options: ["To be famous", "The belief that anyone can succeed through hard work", "To be wealthy", "To live in a big city"],
        correctIndex: 1,
        explanation: "The American Dream is the belief that anyone can succeed through hard work and determination."
      },
      {
        id: "q19_2",
        question: "What does 'E Pluribus Unum' mean?",
        options: ["In God We Trust", "Out of Many, One", "Liberty and Justice", "We the People"],
        correctIndex: 1,
        explanation: "'E Pluribus Unum' means 'Out of Many, One,' reflecting unity from diversity."
      },
      {
        id: "q19_3",
        question: "What is the national motto of the United States?",
        options: ["E Pluribus Unum", "In God We Trust", "Liberty and Justice for All", "We the People"],
        correctIndex: 1,
        explanation: "'In God We Trust' is the official national motto, adopted in 1956."
      },
      {
        id: "q19_4",
        question: "What is the national bird of the United States?",
        options: ["Eagle", "Hawk", "Falcon", "Owl"],
        correctIndex: 0,
        explanation: "The bald eagle is the national bird, symbolizing strength and freedom."
      },
      {
        id: "q19_5",
        question: "What is the name of the national anthem?",
        options: ["America the Beautiful", "God Bless America", "The Star-Spangled Banner", "My Country, 'Tis of Thee"],
        correctIndex: 2,
        explanation: "The Star-Spangled Banner is the national anthem."
      },
      {
        id: "q19_6",
        question: "Who wrote the Star-Spangled Banner?",
        options: ["Thomas Jefferson", "Francis Scott Key", "Benjamin Franklin", "George Washington"],
        correctIndex: 1,
        explanation: "Francis Scott Key wrote the Star-Spangled Banner during the War of 1812."
      },
      {
        id: "q19_7",
        question: "What is one American value?",
        options: ["Conformity", "Individual freedom and liberty", "Obedience to authority", "Tradition over change"],
        correctIndex: 1,
        explanation: "American values include individual freedom, liberty, equality, and opportunity."
      },
      {
        id: "q19_8",
        question: "What is Thanksgiving?",
        options: ["Celebrates independence", "A day to give thanks and share a meal", "Honors veterans", "Celebrates the Constitution"],
        correctIndex: 1,
        explanation: "Thanksgiving is a day to give thanks, traditionally celebrated with family and a feast."
      },
      {
        id: "q19_9",
        question: "What sport is called 'America's pastime'?",
        options: ["Football", "Basketball", "Baseball", "Hockey"],
        correctIndex: 2,
        explanation: "Baseball is often called America's pastime."
      },
      {
        id: "q19_10",
        question: "What is jazz?",
        options: ["A type of dance", "A music genre that originated in America", "A sport", "A type of food"],
        correctIndex: 1,
        explanation: "Jazz is a music genre that originated in New Orleans in the early 20th century."
      }
    ]
  },
  {
    id: 20,
    title: "Comprehensive Review",
    questions: [
      {
        id: "q20_1",
        question: "What are the three branches of the U.S. government?",
        options: ["Executive, Legislative, Judicial", "President, Congress, Supreme Court", "Federal, State, Local", "Senate, House, Cabinet"],
        correctIndex: 0,
        explanation: "The three branches are Executive, Legislative, and Judicial."
      },
      {
        id: "q20_2",
        question: "What is the supreme law of the land?",
        options: ["The Declaration of Independence", "The Bill of Rights", "The Constitution", "Federal statutes"],
        correctIndex: 2,
        explanation: "The Constitution is the supreme law of the land."
      },
      {
        id: "q20_3",
        question: "How many U.S. Senators are there?",
        options: ["50", "100", "435", "538"],
        correctIndex: 1,
        explanation: "There are 100 U.S. Senators, two from each state."
      },
      {
        id: "q20_4",
        question: "Who is the Commander in Chief of the military?",
        options: ["The Secretary of Defense", "The Chairman of the Joint Chiefs", "The President", "Congress"],
        correctIndex: 2,
        explanation: "The President is the Commander in Chief of the military."
      },
      {
        id: "q20_5",
        question: "What is the highest court in the United States?",
        options: ["The Court of Appeals", "The District Court", "The Supreme Court", "The Federal Court"],
        correctIndex: 2,
        explanation: "The Supreme Court is the highest court in the United States."
      },
      {
        id: "q20_6",
        question: "What did the Declaration of Independence do?",
        options: ["Created the Constitution", "Announced our independence from Great Britain", "Ended the Civil War", "Gave women the right to vote"],
        correctIndex: 1,
        explanation: "The Declaration of Independence announced our independence from Great Britain."
      },
      {
        id: "q20_7",
        question: "What is the First Amendment?",
        options: ["Right to bear arms", "Freedom of speech, religion, press, assembly, and petition", "Right to a fair trial", "Protection against unreasonable search"],
        correctIndex: 1,
        explanation: "The First Amendment protects five fundamental freedoms."
      },
      {
        id: "q20_8",
        question: "What amendment abolished slavery?",
        options: ["10th Amendment", "13th Amendment", "15th Amendment", "19th Amendment"],
        correctIndex: 1,
        explanation: "The 13th Amendment abolished slavery in 1865."
      },
      {
        id: "q20_9",
        question: "What amendment gave women the right to vote?",
        options: ["15th Amendment", "18th Amendment", "19th Amendment", "21st Amendment"],
        correctIndex: 2,
        explanation: "The 19th Amendment granted women the right to vote in 1920."
      },
      {
        id: "q20_10",
        question: "What is the capital of the United States?",
        options: ["New York City", "Washington, D.C.", "Philadelphia", "Boston"],
        correctIndex: 1,
        explanation: "Washington, D.C. is the capital of the United States."
      }
    ]
  }
];

/**
 * Generates a randomized quiz from a specific test
 */
export function generateQuizFromTest(testId: number): QuizQuestion[] {
  const test = quizTests.find(t => t.id === testId);
  if (!test) {
    return [];
  }

  // Shuffle questions
  const shuffledQuestions = [...test.questions].sort(() => Math.random() - 0.5);
  
  // Randomize options for each question
  return shuffledQuestions.map(question => {
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
 * Get all quiz tests for display
 */
export function getAllQuizTests(): QuizTest[] {
  return quizTests;
}
