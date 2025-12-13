
/**
 * Political Landscape Data
 * 
 * Understanding America's political parties and movements.
 * 
 * This module contains information about:
 * - Democratic Party (History, values, positions)
 * - Republican Party (History, values, positions)
 * - Libertarian Party (Overview, principles, positions)
 * - Green Party (Overview, values, positions)
 * - Constitution Party (Overview, principles, positions)
 * - Independent and Local Movements (Voters, local movements, third parties)
 * 
 * Total: 6 sections with 18 subsections
 * 
 * @module data/politicallandscapeData
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
 * Political Landscape Section Content
 * 
 * Comprehensive overview of American political parties and movements,
 * from major parties to third parties and independent voters.
 * 
 * Covers:
 * - **Democratic Party** - History, values, policy positions
 * - **Republican Party** - History, values, policy positions
 * - **Libertarian Party** - Overview, principles, positions
 * - **Green Party** - Overview, values, positions
 * - **Constitution Party** - Overview, principles, positions
 * - **Independent Movements** - Independent voters, local movements, third parties
 * 
 * @constant
 */
export const politicallandscapeData: MainSection = {
  id: "political-landscape",
    title: "Political Landscape",
    icon: "flag",
    description: "Understanding America's political parties and movements",
    sections: [
      {
        id: "democratic-party",
        title: "Democratic Party",
        description: "History, values, and positions of the Democratic Party",
        subsections: [
          {
            id: "dem-history",
            title: "History",
            content:
              "The Democratic Party traces its roots to the early nineteenth century, growing out of the movement that first rallied around Andrew Jackson. In its earliest years it stressed limited federal government and a strong belief in states' rights, especially in the agrarian South and frontier regions. Over time it became home to a wide coalition that included farmers, immigrants, and urban political machines.\n\nThe Civil War and Reconstruction reshaped the party but did not settle its internal divides. In the twentieth century Democratic leaders such as Woodrow Wilson and Franklin Roosevelt expanded the role of the federal government during war and economic crisis. The New Deal era associated the party with labor protections, social insurance, and new regulatory agencies.\n\nBeginning in the mid twentieth century the party underwent another major shift as it increasingly supported civil rights legislation and efforts to end legal segregation. This change altered its regional base of support, strengthening its ties to many urban areas and minority communities while weakening its hold on parts of the South.\n\nToday the Democratic Party remains a broad coalition that continues to evolve. Its history shows how party labels can change meaning over generations, and why understanding context is essential when comparing past and present positions.",
          },
          {
            id: "dem-values",
            title: "Core Values",
            content:
              "Modern Democrats often emphasize equality of opportunity and the belief that government can help correct unfair disadvantages. Many supporters see a strong social safety net as a way to protect vulnerable people from falling into severe poverty or being left behind by economic change. They tend to favor public investment in education, health care, and infrastructure as tools for expanding opportunity.\n\nAnother recurring theme is the idea that government can act as a referee in the marketplace. Democrats frequently support regulations aimed at protecting consumers, workers, and the environment from abuses that they believe free markets alone will not correct. They typically argue that carefully written rules can support long term prosperity while limiting harmful behavior.\n\nOn social issues, many Democrats place high importance on individual choice and civil rights protections for a wide range of groups. They often support policies that broaden participation in public life and seek to reduce discrimination in employment, housing, and public services.\n\nBecause the party is diverse, there is regular debate inside Democratic circles about how far and how fast to pursue different goals. That internal argument is part of how the party refines its message and priorities from one generation to the next.",
          },
          {
            id: "dem-positions",
            title: "Policy Positions",
            content:
              "In national politics, Democrats commonly support expanding or preserving broad access to health insurance, sometimes through government managed programs and sometimes through regulations on private insurers. Many favor progressive tax systems in which higher income earners pay a larger share, arguing that this helps fund public services without overburdening lower income households.\n\nOn economic and environmental questions, Democratic platforms often call for stronger oversight of financial institutions, workplace standards, and environmental protections. Supporters see these measures as necessary to prevent crises, protect public health, and encourage cleaner forms of energy. Critics worry about the cost and complexity of such rules, which is why these debates remain active.\n\nIn the area of voting and elections, Democrats usually promote measures that they believe make it easier to cast a ballot, such as early voting options and expanded mail in voting. They also tend to support federal involvement in enforcing civil rights laws.\n\nPositions still vary by region, candidate, and moment in history, but these themes appear frequently in recent Democratic campaigns and national platforms.",
          },
        ],
      },
      {
        id: "republican-party",
        title: "Republican Party",
        description: "History, values, and positions of the Republican Party",
        subsections: [
          {
            id: "rep-history",
            title: "History",
            content:
              "The Republican Party was founded in the 1850s in response to the expansion of slavery into new western territories. Drawing support from anti slavery Whigs, Free Soilers, and other reformers, it quickly became a major national force. Under Abraham Lincoln, Republicans led the Union during the Civil War and supported constitutional amendments that ended slavery and established equal legal protection.\n\nAfter the war, the party was closely associated with efforts to rebuild the South and secure rights for formerly enslaved people, although those efforts were uneven and ultimately undercut in later decades. In the late nineteenth and early twentieth centuries, Republicans often championed industrial growth, protective tariffs, and a strong national government that could support commerce and infrastructure.\n\nThe twentieth century saw new shifts. During the Cold War, Republican leaders placed heavy emphasis on confronting communism abroad and promoting free enterprise at home. Later movements inside the party stressed lower taxes, reduced federal regulation, and a renewed focus on constitutional limits.\n\nAcross these changes a common thread has been concern about concentrated government power and a belief in the importance of individual responsibility. The party's evolution shows how principles are interpreted differently as conditions change, while still drawing from older themes of union, free labor, and ordered liberty.",
          },
          {
            id: "rep-values",
            title: "Core Values",
            content:
              "Modern Republicans generally emphasize personal freedom, private property, and limited federal government. Many supporters believe that individuals, families, churches, and local communities are better suited than distant agencies to solve many problems. This outlook leads to a preference for policies that leave more decisions in the hands of citizens and state or local authorities.\n\nRepublicans often stress the importance of strong national defense and the need to deter threats through readiness and resolve. They also tend to highlight traditional social institutions such as marriage, family, and religious communities, arguing that these provide moral grounding and social stability that law alone cannot supply.\n\nEconomic freedom is another central value. The party usually favors lower taxes, fewer regulations, and a business climate that it believes will encourage investment, innovation, and job creation. Many Republicans argue that a vibrant private sector is the best engine for raising living standards over time.\n\nAlthough there are significant differences between more populist and more establishment wings of the party, these broad themes of liberty, responsibility, and skepticism toward centralized control are common in Republican speeches and platforms.",
          },
          {
            id: "rep-positions",
            title: "Policy Positions",
            content:
              "Republican policy agendas frequently call for reducing federal spending growth, cutting certain taxes, and simplifying the tax code. Supporters argue that this approach leaves more money in the hands of families and businesses, which they believe leads to stronger economic growth. Critics worry about the impact on social programs and federal revenues, and this tension shapes many budget debates.\n\nOn regulation, Republicans often seek to roll back rules they see as burdensome, especially in energy, agriculture, and small business. They tend to favor domestic production of oil, natural gas, and other resources, while also supporting private sector innovation in new technologies.\n\nThe party usually defends Second Amendment rights, supports measures that it believes secure elections, and advocates for law enforcement and border security as priorities for public safety and national sovereignty. Many Republicans favor school choice options such as charter schools and education savings programs, seeing competition as a way to improve outcomes.\n\nBecause the party includes a wide coalition, specific policy details can differ from one state or leader to another, but these positions are often seen in national platforms and campaigns.",
          },
        ],
      },
      {
        id: "libertarian-party",
        title: "Libertarian Party",
        description: "The principles and positions of the Libertarian Party",
        subsections: [
          {
            id: "lib-overview",
            title: "Overview",
            content:
              "The Libertarian Party emerged in the early 1970s amid concerns about both rising government power and restrictions on personal choice. It presents itself as a consistent advocate for individual liberty in economic and social life alike. Rather than fitting neatly onto the usual left right spectrum, it combines support for free markets with strong civil liberties and skepticism toward foreign intervention.\n\nLibertarians argue that many functions currently handled by government can be better managed by voluntary cooperation, private enterprise, or local associations. They tend to measure policies by a simple test: whether they increase or decrease the freedom of peaceful individuals.\n\nBecause of this perspective, Libertarians sometimes agree with Republicans on economic issues and with Democrats on civil liberties, while differing sharply from both on questions like surveillance, military involvement, and drug policy.\n\nThe party remains smaller than the two major parties but has influenced public debate by pushing discussions about privacy, government spending, and personal autonomy into the spotlight.",
          },
          {
            id: "lib-principles",
            title: "Core Principles",
            content:
              "Libertarian thought is anchored in the idea of self ownership, which holds that individuals have a natural right to control their own lives and property. From this flows the principle of voluntary exchange, where people are free to trade goods, services, and ideas so long as they respect the equal rights of others. Coercion is seen as justified only to prevent force or fraud.\n\nIn practice, these principles lead Libertarians to support minimal taxation, light regulation, and open competition in markets such as education, transportation, and currency. They usually oppose laws that criminalize personal behavior that does not directly violate the rights of others.\n\nCivil liberties are another central concern. Libertarians often oppose expansive surveillance programs, restrictions on speech, and government involvement in personal relationships. They argue that even well intended restrictions can set precedents that threaten freedom in the long run.\n\nBy applying the same standard of non aggression to both economic and social questions, Libertarians seek to offer a consistent framework for limited government and maximum personal choice.",
          },
          {
            id: "lib-positions",
            title: "Policy Positions",
            content:
              "Policy positions associated with the Libertarian Party commonly include cutting federal spending, simplifying or abolishing many taxes, and reducing the role of central banks in the economy. Libertarians often favor privatization or decentralization of services such as mail delivery, transportation infrastructure, and aspects of education.\n\nOn personal freedom, they typically support decriminalization or legalization of many currently banned substances, strong protections for freedom of speech and association, and a general presumption that adults should be free to make their own choices as long as they do not violate the rights of others. This can place them at odds with more socially conservative or socially progressive positions alike.\n\nIn foreign policy, Libertarians tend to favor a non interventionist approach. They support a strong national defense but oppose nation building ventures and prolonged overseas military commitments that are not directly tied to defending the country.\n\nWhile few Libertarian candidates win major offices, their proposals influence discussions about privacy, criminal justice reform, and the size and scope of federal authority.",
          },
        ],
      },
      {
        id: "green-party",
        title: "Green Party",
        description: "Environmental and social justice focus of the Green Party",
        subsections: [
          {
            id: "green-overview",
            title: "Overview",
            content:
              "The Green Party grew out of environmental, peace, and anti nuclear movements that gained visibility in the late twentieth century. It seeks to link ecological concerns with questions of economic fairness and grassroots democracy. Greens present themselves as an alternative to what they see as short term thinking by the major parties on issues like pollution, climate, and corporate influence.\n\nLocal Green organizations appeared first, and national structures developed later as activists coordinated across states. The party has run candidates for local, state, and national offices, using campaigns both to win votes and to raise awareness about its priorities.\n\nBecause the United States uses a winner take all electoral system in most races, Greens often face structural hurdles to winning large offices. Even so, their presence pushes environmental and social issues into public conversation.\n\nTheir experience shows how smaller parties can influence debate even when they hold relatively few seats in government.",
          },
          {
            id: "green-values",
            title: "Core Values",
            content:
              "Green Party values are often summarized in themes such as ecological wisdom, social justice, grassroots democracy, and nonviolence. Supporters believe that human societies must live within the limits of natural systems and that economic decisions should account for long term environmental costs. They tend to favor local decision making and participatory models of governance.\n\nSocial justice, in the Green view, includes reducing economic inequality and addressing discrimination. The party often calls for stronger worker protections, expanded social services, and policies aimed at supporting marginalized communities.\n\nNonviolence and peace are also central values. Greens usually oppose military interventions and weapons proliferation, arguing that diplomacy and development are better long range tools for resolving conflict.\n\nTaken together, these values express a vision where environmental health, human dignity, and local participation reinforce one another rather than compete.",
          },
          {
            id: "green-positions",
            title: "Policy Positions",
            content:
              "Green Party policy proposals frequently call for rapid transitions to renewable energy sources, strict limits on pollution, and major investments in public transportation and conservation. Supporters argue that these steps are necessary to protect future generations and create new forms of employment.\n\nOn economic issues, Greens often endorse ideas such as universal health care, higher minimum wages, and stronger public support for education and housing. They typically favor changes to campaign finance rules that would reduce the influence of large donors and corporations.\n\nIn foreign affairs, the party emphasizes diplomacy, international cooperation, and reductions in military spending. It often calls for redirecting resources from weapons to human needs and environmental protection.\n\nThese positions set the Green Party apart from both major parties and give voters a clear sense of its priorities, even when many proposals remain subjects of intense debate.",
          },
        ],
      },
      {
        id: "constitution-party",
        title: "Constitution Party",
        description: "Constitutional principles and conservative values",
        subsections: [
          {
            id: "const-overview",
            title: "Overview",
            content:
              "The Constitution Party is a smaller political party that calls for a strict reading of the United States Constitution and a significant narrowing of federal power. It appeals to voters who are dissatisfied with both major parties and who want a platform that closely links civil government with traditional moral principles.\n\nThe party grew out of concerns that Washington had far exceeded the authority originally granted to it and that many decisions should be returned to states, local communities, and families. Its leaders often speak of restoring what they view as the original intent of the founders.\n\nBecause of its size, the Constitution Party rarely wins major elections, but it offers a clear statement of one approach to constitutional interpretation and civic life.\n\nIts presence in the political landscape gives voice to voters who believe that the nation's problems stem primarily from drifting away from limited government and rooted moral standards.",
          },
          {
            id: "const-principles",
            title: "Core Principles",
            content:
              "Core principles of the Constitution Party include limited federal authority, respect for state sovereignty, and strong protections for what it regards as traditional family and moral values. The party reads the Constitution as granting only narrow, enumerated powers to the national government, with most responsibilities reserved to the states or the people.\n\nMany party members argue that moral order and civil freedom are linked, and they support policies that reflect their religious and ethical convictions. They often emphasize the importance of local control over education, community standards, and many social issues.\n\nEconomic views typically stress the dangers of debt and inflation and the need for sound money. Some advocates call for a return to currency backed by precious metals.\n\nThese principles reflect a desire for a simpler, more decentralized republic with strong cultural continuity and limited federal reach.",
          },
          {
            id: "const-positions",
            title: "Policy Positions",
            content:
              "Policy positions commonly associated with the Constitution Party include reducing or abolishing certain federal departments, ending federal involvement in education, and sharply limiting foreign aid and overseas military commitments. Supporters often call for strict enforcement of immigration laws and stronger border controls.\n\nThe party usually advocates balanced budgets, opposition to most forms of federal welfare programs, and support for private charity and local solutions in their place. It tends to favor strong protections for gun ownership and other rights explicitly listed in the Constitution.\n\nOn monetary policy, some members endorse auditing or restructuring the Federal Reserve and exploring alternatives such as commodity backed currency.\n\nWhile these positions appeal to a specific portion of the electorate, they also contribute to broader debates about sovereignty, fiscal restraint, and the meaning of constitutional government.",
          },
        ],
      },
      {
        id: "independent",
        title: "Independent and Local Movements",
        description: "Non-party affiliated voters and grassroots movements",
        subsections: [
          {
            id: "independents",
            title: "Independent Voters",
            content:
              "Independent voters are citizens who do not formally register with or consistently support a single political party. Some lean toward one side or the other, while others shift depending on issues and candidates. Many independents express frustration with partisan conflict, negative campaigning, or what they see as a lack of real choice.\n\nBecause they are not firmly anchored to one party, independents can play a decisive role in close elections. Campaigns often tailor messages to appeal to these voters, highlighting ideas that cross usual party lines.\n\nIndependents also serve as a reminder that parties exist to serve voters, not the other way around. Their willingness to move between options pushes parties to refine their platforms and reach beyond their most loyal supporters.\n\nIn a healthy political culture, independent voters contribute fresh perspectives and resist automatic alignment with any one team.",
          },
          {
            id: "local-movements",
            title: "Local Political Movements",
            content:
              "Local political movements arise when neighbors organize around specific concerns close to home. Residents may band together over school policies, zoning decisions, public safety, taxes, or environmental questions in their communities. These efforts show democracy at eye level, where people can speak face to face and see the direct impact of their involvement.\n\nSome local movements remain focused on a single issue, while others grow into broader reform efforts. Success at the local level can influence state or national debates when other communities notice practical results.\n\nLocal movements often cut across party lines, uniting people who might disagree on national questions but share a common interest in their town or region. This cooperation can build trust and remind citizens that they share responsibilities beyond partisan labels.\n\nBy paying attention to local issues, citizens reinforce the idea that self government begins closest to home.",
          },
          {
            id: "third-parties",
            title: "Role of Third Parties",
            content:
              "Third parties rarely win major national offices in the United States, but they can have significant influence on public debate. By championing issues that the big parties overlook or avoid, they introduce new ideas and force others to respond. Historically, concerns first raised by third parties have sometimes been adopted later by Republicans or Democrats.\n\nThird party campaigns can also provide an outlet for voters who feel that neither major party reflects their priorities. This can send a signal to political leaders about emerging concerns or dissatisfaction.\n\nAt the same time, third parties face structural challenges such as ballot access rules, debate participation limits, and winner take all elections. These hurdles make it difficult for them to translate support into seats.\n\nUnderstanding the role of third parties helps citizens see American politics as a broader ecosystem. Ideas can begin at the margins and eventually reshape the center when they prove persuasive and practical over time.",
        },
      ],
    },
  ],
};
