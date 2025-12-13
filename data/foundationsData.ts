/**
 * Foundations Data
 * 
 * Core principles and ideologies that shape American democracy.
 * 
 * This module contains content about:
 * - Principles and Ideologies (Democracy, Republicanism, Federalism)
 * - Human Rights and Freedoms (Life, Liberty, Pursuit of Happiness, Speech, Religion)
 * - Government and Systems (Separation of Powers, Checks and Balances, Rule of Law)
 * 
 * Content is structured as a MainSection with nested sections and subsections,
 * following the content hierarchy defined in contentData.ts
 * 
 * @module data/foundationsData
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

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

// ============================================================================
// FOUNDATIONS CONTENT DATA
// ============================================================================

/**
 * Foundations Section Content
 * 
 * Contains foundational American principles, rights, and governmental systems.
 * 
 * Sections:
 * 1. **Principles and Ideologies** - Democracy, Republicanism, Federalism
 * 2. **Human Rights and Freedoms** - Life, Liberty, Speech, Religion
 * 3. **Government and Systems** - Separation of Powers, Checks and Balances, Rule of Law
 * 
 * @constant
 */
export const foundationsData: MainSection = {
  id: "foundations",
  title: "Foundations",
  icon: "book",
  description: "Core principles and ideologies that shape American democracy",
  sections: [
    // ========================================================================
    // SECTION 1: Principles and Ideologies
    // ========================================================================
    {
      id: "principles-ideologies",
      title: "Principles and Ideologies",
      description: "The fundamental beliefs that guide American governance",
      subsections: [
        {
          id: "democracy",
          title: "Democracy",
          content:
            "Democracy is a system of government where power ultimately rests with the people. Citizens are not just subjects of law but the source of authority that creates and shapes those laws. At its core, democracy is a statement of trust that ordinary people, when informed and engaged, can guide the direction of their own country.\n\nIn the United States this trust shows up through elections, public debate, and the ability of citizens to organize and be heard. People vote for leaders, support causes, attend meetings, contact their representatives, and speak out in the public square. Each of these actions is a way of sharing in the work of self government rather than waiting for someone else to decide everything.\n\nA healthy democracy depends on more than ballots. It relies on honesty in elections, a free press, access to reliable information, and a shared agreement that the rules apply even when our preferred side loses. When citizens accept peaceful transfers of power and commit to persuasion rather than force, they protect the system that protects their voice.\n\nDemocracy is never finished. It can grow stronger when more people participate with good will, and it can weaken when citizens become careless, cynical, or divided into permanent camps. Understanding democracy as both a privilege and a responsibility helps each person see that their choices either strengthen or erode the foundation of self rule.",
        },
        {
          id: "republicanism",
          title: "Republicanism",
          content:
            "Republicanism emphasizes representative government, where citizens choose leaders who are expected to serve the public good. Instead of everyone voting on every law, people select representatives who have the time and responsibility to study complex issues in detail. This approach recognizes that modern societies need both popular consent and steady, thoughtful leadership.\n\nIn a republic, elections are not simply popularity contests. They are opportunities for citizens to judge the character, judgment, and record of those who wish to serve. Once in office, representatives are expected to listen to their constituents, deliberate with colleagues, and make decisions that look beyond short term emotion or narrow interest.\n\nAt its best, republicanism protects minority rights and helps prevent hasty swings in policy. Because representatives serve for fixed terms and can be replaced, they must weigh both current opinion and long range consequences. The hope is that this structure encourages leaders to act as stewards rather than rulers, remembering that they hold power only in trust.\n\nWhen citizens follow how their representatives vote, ask questions, and hold them accountable at the next election, republican government functions as intended. When people tune out, or when representatives stop seeing themselves as servants of the public, the republican ideal is weakened and the distance between the people and their government grows.",
        },
        {
          id: "federalism",
          title: "Federalism",
          content:
            "Federalism divides power between the national government and the states. Some responsibilities, such as national defense and foreign policy, belong mainly to the federal level, while others, like education, policing, and many everyday services, are largely handled by state and local governments. This arrangement reflects the belief that not every problem should be solved from a distant capital.\n\nBy spreading authority across different levels, federalism allows regions to reflect their own character, needs, and priorities. Laws in a large rural state may look different from those in a small coastal state, even though both share the same national Constitution. Citizens can often see the impact of their participation more clearly in local and state decisions, where the distance between voter and official is much smaller.\n\nFederalism also creates multiple layers of protection for individual rights. If one level of government oversteps its bounds, another level can sometimes push back or provide an alternative path. Courts often serve as referees when state and federal powers appear to clash, interpreting the Constitution to decide which level has legitimate authority.\n\nThis system is not always neat or simple. Disagreements over where state power ends and federal power begins have appeared throughout American history, from debates over civil rights to questions about health care and environmental regulation. Yet the ongoing negotiation between these levels of government is part of what keeps power from concentrating in just one place.",
        },
      ],
    },
    
    // ========================================================================
    // SECTION 2: Human Rights and Freedoms
    // ========================================================================
    {
      id: "human-rights",
      title: "Human Rights and Freedoms",
      description: "The inalienable rights guaranteed to all Americans",
      subsections: [
        {
          id: "life-liberty",
          title: "Life, Liberty, and the Pursuit of Happiness",
          content:
            "The promise of life, liberty, and the pursuit of happiness stands at the center of the American story. These words from the Declaration of Independence affirm that every person has God given rights that do not come from kings, parties, or majorities. They do not guarantee a particular outcome, but they protect the space in which people can build a meaningful life.\n\nThe right to life means more than physical survival. It implies a basic claim to safety under the law, protection from arbitrary violence, and systems of justice that respect the dignity of every person. Liberty includes freedoms of movement, conscience, expression, and association, so long as one does not trample the equal rights of others.\n\nThe pursuit of happiness is not simply about comfort or entertainment. It points to the ability to seek vocation, family life, worship, creativity, and service in ways that honor conscience and responsibility. People will choose different paths, but the ideal is that each person has room to follow the calling they believe is right.\n\nWhen Americans argue about laws and policies, they are often asking whether those choices honor or weaken this original promise. Questions about safety, opportunity, and justice all trace back to how well the nation protects life, safeguards liberty, and leaves room for people to seek their own vision of a good life.",
        },
        {
          id: "freedom-speech",
          title: "Freedom of Speech",
          content:
            "Freedom of speech protects the right to share ideas, beliefs, and criticism without fear of government punishment. This includes popular opinions, unpopular views, political arguments, satire, and peaceful protest. The protection is not given because every statement is wise, but because open discussion is the best way to separate truth from error.\n\nIn the United States, courts have treated speech about public affairs as especially important. Citizens must be able to question leaders, challenge policies, and discuss the direction of the country without worrying that they will be silenced by those in power. This protection extends to speech that is uncomfortable, offensive, or deeply controversial, as long as it does not cross narrow legal lines such as direct incitement to violence.\n\nFreedom of speech also carries responsibilities. It invites people to speak with honesty, to check facts, and to avoid using words as tools of intimidation. It encourages listeners to answer bad arguments with better ones rather than to demand that opposing voices be shut down.\n\nThe overall pattern of American law has been to give speech wide protection so that truth can emerge from open debate. When citizens defend this principle for others, even for those they strongly disagree with, they help preserve it for themselves and for future generations.",
        },
        {
          id: "freedom-religion",
          title: "Freedom of Religion",
          content:
            "Freedom of religion means the government may neither force a particular faith on people nor interfere lightly with sincere religious practice. Americans are free to attend worship services, observe holy days, wear religious symbols, share their beliefs, or choose to embrace no religion at all. This freedom applies in private life and, within reasonable limits, in public life as well.\n\nThe Constitution pairs this protection with a ban on establishing an official national church. That arrangement guards against state control of religion and protects citizens from being compelled to support beliefs they do not share. It creates a public square where many traditions can speak, contribute, and serve.\n\nIn daily life, freedom of religion has inspired schools, hospitals, charities, disaster relief, and countless acts of quiet service. People of faith and people who do not identify with any faith often work side by side on shared concerns such as poverty, education, and community care.\n\nConflicts sometimes arise when religious convictions and other laws or rights appear to pull in different directions. Courts and legislatures must then decide how to honor conscience while preserving equal treatment under the law. Handling these tensions with patience and respect is part of the ongoing work of a diverse nation committed to genuine religious liberty.",
        },
      ],
    },
    
    // ========================================================================
    // SECTION 3: Government and Systems
    // ========================================================================
    {
      id: "government-systems",
      title: "Government and Systems",
      description: "How American government is structured and operates",
      subsections: [
        {
          id: "separation-powers",
          title: "Separation of Powers",
          content:
            "Separation of powers means that lawmaking, law enforcement, and legal interpretation are divided among three distinct branches. Congress writes the laws, the President carries them out, and the federal courts explain what those laws mean in particular cases. Each branch has its own tools, duties, and limits written into the Constitution.\n\nThe founders believed that concentrating all power in one set of hands, even well intentioned hands, was dangerous. By assigning different tasks to different branches, they hoped to prevent any single person or institution from controlling every part of government. The idea was that ambition would counter ambition, and that each branch would defend its role.\n\nIn practice this separation creates both friction and stability. There are moments when branches disagree sharply about policy, appointments, or the meaning of the law, and the system can seem slow or messy. Yet that very slowness often prevents sudden swings driven by anger or fear, giving citizens time to react and to make their voices heard.\n\nUnderstanding which branch is responsible for which function helps citizens know where to direct their concerns. It also reminds everyone that no leader, however powerful, stands above the structure that the Constitution sets in place.",
        },
        {
          id: "checks-balances",
          title: "Checks and Balances",
          content:
            "Checks and balances are the practical ways that the three branches of government limit one another. The President can veto bills passed by Congress, but Congress can override that veto with a strong enough vote. Courts can strike down laws or actions that violate the Constitution, but judges are nominated by the President and confirmed by the Senate.\n\nThese overlapping powers can be frustrating in times of sharp disagreement. A policy that seems urgently needed to some may be slowed, revised, or blocked entirely by another branch. Yet this design is intentional. It forces different institutions to negotiate, justify their actions, and consider the perspectives of others before major changes become permanent.\n\nChecks and balances also protect individuals from sudden abuses of authority. If one branch overreaches, another can push back, investigate, or refuse to cooperate. Even when institutions fall short of their highest duties, the presence of separate powers gives citizens more than one avenue to seek redress.\n\nWhen people understand and value this system, they are less likely to place blind hope in a single office or party. Instead, they can appreciate that liberty is guarded not by perfection in any one leader, but by a network of limits that no leader is supposed to cross.",
        },
        {
          id: "rule-of-law",
          title: "Rule of Law",
          content:
            "The rule of law is the idea that laws, not individual whims, ultimately govern the country. Presidents, members of Congress, judges, and ordinary citizens are all subject to the same basic rules. No one is supposed to be above the law or beneath its protection.\n\nWhen the rule of law is strong, people can plan their lives with confidence that contracts will be honored, courts will hear disputes, and rights will be taken seriously. Businesses can invest, families can build, and communities can resolve conflicts without resorting to private force. Even when outcomes are imperfect, the existence of stable rules provides a framework for correction and appeal.\n\nWhen the rule of law is weak, power can slip into the hands of those willing to ignore or twist the rules for personal gain. Corruption, selective enforcement, and disrespect for court decisions can quickly undermine trust. Citizens begin to feel that outcomes depend more on connections or intimidation than on fairness.\n\nProtecting the rule of law is one of the most important responsibilities of any free society. It requires honest lawmaking, transparent enforcement, independent courts, and a public that insists leaders play by the same rules as everyone else. In this sense, the rule of law is not only a legal principle but a shared civic commitment.",
        },
      ],
    },
  ],
};