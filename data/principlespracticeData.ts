/**
 * Principles in Practice Data
 * 
 * How American principles operate in real world systems and civic life.
 * 
 * This module explores the practical application of constitutional principles:
 * - Rule of Law - Laws apply to everyone equally
 * - Checks and Balances - Preventing concentration of power
 * - Federalism - Division of power between national and state governments
 * - Civil Liberties - Individual rights and freedoms
 * 
 * Total: 4 sections with 8 subsections
 * 
 * @module data/principlespracticeData
 */

/**
 * Subsection - Individual content item
 */
export interface SubSection {
  /** Unique identifier for the subsection */
  id: string;
  /** Display title */
  title: string;
  /** Main content text */
  content: string;
  /** Optional full text content (for documents) */
  fullText?: string;
  /** Optional context/background information */
  context?: string;
  /** Optional image URL */
  imageUrl?: string;
}

/**
 * Section - Group of related subsections
 */
export interface Section {
  /** Unique identifier for the section */
  id: string;
  /** Display title */
  title: string;
  /** Section description */
  description: string;
  /** Array of subsections within this section */
  subsections: SubSection[];
}

/**
 * Main Section - Top-level content category
 */
export interface MainSection {
  /** Unique identifier for the main section */
  id: string;
  /** Display title */
  title: string;
  /** Icon name for visual representation */
  icon: string;
  /** Section description */
  description: string;
  /** Array of sections within this main section */
  sections: Section[];
}

/**
 * Principles in Practice Section Content
 * 
 * Examines how foundational American principles function in practice,
 * from the rule of law to civil liberties and federalism.
 * 
 * Covers:
 * - **Rule of Law** - Equal application of laws, courts and justice
 * - **Checks and Balances** - System structure, gridlock and compromise
 * - **Federalism** - State vs federal power, cooperation and tension
 * - **Civil Liberties** - Individual rights and civic responsibility
 * 
 * @constant
 */
export const principlespracticeData: MainSection = {
  id: "principles-practice",
    title: "Principles in Practice",
    icon: "balance",
    description: "How American principles operate in real world systems and civic life",
    sections: [
      {
        id: "rule-of-law",
        title: "Rule of Law",
        description: "The idea that laws apply to everyone",
        subsections: [
          {
            id: "rol-meaning",
            title: "What It Means",
            content:
              "The rule of law means that rules, not personal whims, govern a nation. Presidents, judges, police officers, and ordinary citizens are all supposed to live under the same basic standards. No one is meant to be too important for the law and no one is meant to be too small for its protection.\n\nIn practice this idea shapes everything from how traffic tickets are handled to how elections are run. Laws are written down, procedures are spelled out, and decisions can be reviewed or appealed. This does not guarantee perfection, but it creates a framework where unfair treatment can be challenged instead of simply endured.\n\nThe rule of law also sets limits on what government may do. Officials must tie their actions to an actual law or constitutional power. When they cannot, courts and citizens have grounds to push back. This keeps authority from slowly turning into arbitrary power.\n\nA nation that honors the rule of law does more than punish wrongdoing. It builds habits of fairness, accountability, and predictability that allow people to plan, invest, and raise families with confidence that the rules will not suddenly change at someone's convenience.",
          },
          {
            id: "rol-courts",
            title: "Courts and Justice",
            content:
              "Courts are one of the main tools for enforcing the rule of law. They provide a place where people can bring disputes, present evidence, and have a neutral judge or jury decide what the law requires. This process is slower than rule by decree, but it helps protect individuals from anger, favoritism, or fear.\n\nCriminal courts determine whether someone has broken the law and what punishment is appropriate. Civil courts settle conflicts over contracts, property, family matters, and other disagreements between private parties. In both settings, procedures such as notice, the right to be heard, and the right to appeal are designed to keep the process honest.\n\nCourts also review the actions of government. When a law or policy appears to cross constitutional lines, judges can strike it down or narrow its reach. This power is not meant to make courts the rulers of the country, but to ensure that every branch stays within the limits the people have set.\n\nA healthy justice system requires more than good paper rules. It needs judges who are independent, jurors who take their duty seriously, and citizens who are willing to serve as witnesses, follow the law, and accept outcomes even when they disagree. When these pieces work together, courts become a safeguard for liberty rather than just a place of punishment.",
          },
        ],
      },
      {
        id: "checks-balances",
        title: "Checks and Balances",
        description:
          "The system of checks and balances prevents any one branch of government from becoming too powerful",
        subsections: [
          {
            id: "cb-structure",
            title: "Structure of the System",
            content:
              "Checks and balances grow out of the Constitution's decision to separate power among three branches: legislative, executive, and judicial. Each branch is given its own tools and responsibilities, but also specific ways to influence or limit the others. Congress writes the laws and controls taxing and spending. The President carries out the laws and leads the executive agencies. The courts interpret the laws and decide whether they agree with the Constitution.\n\nThese powers overlap on purpose. A President can veto a bill passed by Congress, but Congress can override that veto with a large enough majority. The Senate must confirm many of the President's appointments and treaties, so the executive cannot operate entirely on its own. Courts can strike down actions by either Congress or the President if they violate constitutional limits.\n\nThis constant interaction forms a web of restraint. It slows down sudden swings of power and forces leaders to negotiate, persuade, and build coalitions rather than ruling by decree. While the system can be frustrating when people want fast change, it is designed to protect liberty by making it hard for any person or faction to capture the entire government.\n\nThe structure of checks and balances also encourages each branch to guard its own authority. When one branch pushes too far, the others have both the power and the incentive to push back. This tug of war is not a flaw in the American system; it is one of the ways the Constitution keeps freedom safer over time.",
          },
          {
            id: "cb-gridlock",
            title: "Why Gridlock Happens",
            content:
              "What many people call gridlock is often the visible side effect of checks and balances doing their work. When different branches or parties strongly disagree, the system makes it difficult for one side to impose its will. Bills may stall, appointments may be delayed, and big proposals may be watered down or blocked entirely. This can feel inefficient, especially in moments of crisis, but it is meant to slow decisions that have not earned broad support.\n\nThe United States is a large, diverse country, and citizens do not agree on every issue. Checks and balances force leaders to build enough agreement to move forward. When that agreement does not exist, the default is often inaction. While this can be frustrating, it prevents sudden swings in policy that could destabilize people's lives, businesses, and communities.\n\nOf course, there are times when gridlock reflects more than honest disagreement. Partisan gamesmanship, personal ambition, and media pressure can all encourage politicians to block the other side simply to claim a victory. That kind of stalemate can erode public trust and make citizens feel that government cannot solve real problems.\n\nEven then, the answer is not to abandon checks and balances but to use them wisely. Citizens can reward leaders who compromise in good faith and punish those who treat every issue as a battlefield. The goal is not endless standoff but careful decision making that respects both majority rule and the rights of those who disagree.",
          },
        ],
      },
      {
        id: "federalism",
        title: "Federalism",
        description:
          "How authority is divided between the national government and the states",
        subsections: [
          {
            id: "fed-overview",
            title: "Overview",
            content:
              "Federalism reflects the belief that government power should be shared rather than concentrated. The Constitution gives certain authority to the national government, such as defense, currency, and interstate matters. Other powers remain with the states, which govern local issues like schools, police, and many areas of civil life. This division allows the system to balance unity with local control.\n\nThe states act as laboratories of democracy. They can test different approaches to education, transportation, public safety, and economic policy. When a policy works well in one place, other states may adopt it. When it fails, the consequences are contained rather than felt across the entire nation.\n\nFederalism also protects freedom by preventing any single authority from controlling every aspect of life. Citizens can influence government at multiple levels, participate in local decisions, and hold leaders accountable through elections and public engagement.\n\nAt its best, federalism encourages cooperation and experimentation. It allows communities to reflect their own character while still remaining part of a unified nation.",
          },
          {
            id: "fed-tensions",
            title: "Tensions and Cooperation",
            content:
              "Cooperation between states and the federal government is essential, but disagreements are inevitable. Issues related to commerce, environment, transportation, and public health often require coordination across state lines. When responsibilities overlap, debates arise about which level of government should take the lead.\n\nThese tensions are part of the constitutional design. The boundaries between state and federal authority were left flexible in some areas so that the nation could adapt to new circumstances. Throughout American history, courts have played a major role in clarifying these boundaries as cases arise.\n\nDuring crises such as wars, natural disasters, or economic downturns, cooperation often becomes more urgent. States may request federal assistance, and national leaders may rely on state agencies to carry out major programs. This partnership can strengthen resilience when it works well.\n\nHealthy federalism does not eliminate conflict. Instead, it uses structured disagreement as a tool for balance, innovation, and shared responsibility.",
          },
        ],
      },
      {
        id: "civil-liberty",
        title: "Civil Liberties",
        description:
          "The rights and freedoms that protect individuals from government overreach",
        subsections: [
          {
            id: "cl-rights",
            title: "What Rights Protect",
            content:
              "Civil liberties are the guarantees that limit government power and protect individual freedom. They include freedom of speech, freedom of religion, due process of law, and the right to assemble. These principles ensure that citizens can think, worship, speak, and gather without fear of government punishment.\n\nMany of these rights are rooted in the Bill of Rights, but they have been interpreted and expanded over time. Courts have refined the meaning of free expression, privacy, and fair procedure in response to new challenges. The result is a framework designed to protect personal freedom while allowing society to address real concerns.\n\nCivil liberties also require public vigilance. Rights can erode gradually if people grow indifferent to them or if officials prioritize convenience over principle. Citizens who understand their rights are better equipped to defend them.\n\nIn daily life, civil liberties create space for dissent, belief, creativity, and private life. They help ensure that America remains a place where ideas can compete without coercion.",
          },
          {
            id: "cl-responsibility",
            title: "Rights and Responsibility",
            content:
              "Civil liberties give citizens broad freedom, but rights work best when paired with responsibility. The freedom of speech protects your right to express your beliefs, but it also implies a duty to use that freedom thoughtfully. The free exercise of religion allows people to worship according to conscience, but it also asks citizens to respect the same freedom for others.\n\nRights place limits on what government can do, but they do not remove the need for communities to maintain order and respect. Exercising liberty requires self control, honesty, and willingness to live peaceably with those who hold different viewpoints.\n\nIn moments of crisis or tension, debates often arise about how to balance freedom with public safety. These debates have occurred throughout American history. When handled with care, they allow society to protect the vulnerable while preserving essential liberties.\n\nCivil liberties are strongest when citizens remember that freedom is not only something to defend from outside threats but also something to practice with courage and integrity every day.",
        },
      ],
    },
  ],
};