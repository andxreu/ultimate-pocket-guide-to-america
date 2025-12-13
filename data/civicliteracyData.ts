
/**
 * Civic Literacy Data
 * 
 * Understanding American government, founding documents, and civic responsibility.
 * 
 * This comprehensive module covers:
 * - Branches of Government (Legislative, Executive, Judicial)
 * - Founding Documents (Declaration, Articles, Constitution, Bill of Rights, Federalist Papers)
 * - Citizenship (Civic responsibility, naturalization, rights & responsibilities)
 * - Media Literacy (Identifying bias, fact-checking, evaluating sources)
 * - National Symbols (Flag, eagle, seal, Liberty Bell, Statue of Liberty)
 * - National Hymns (National Anthem, America the Beautiful, God Bless America)
 * - The American Experiment (Self-government, identity, unity & diversity)
 * - To Be an American (Reflection on American identity)
 * 
 * Total: 8 sections with 25 subsections
 * 
 * @module data/civicliteracyData
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
  /** Optional full text content (for founding documents) */
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
 * Civic Literacy Section Content
 * 
 * Comprehensive civics education covering American government structure,
 * founding documents, citizenship, media literacy, and national identity.
 * 
 * Major sections:
 * - **Branches of Government** (3 subsections) - Legislative, Executive, Judicial branches
 * - **Founding Documents** (5 subsections) - Declaration, Articles, Constitution, Bill of Rights, Federalist Papers
 * - **Citizenship** (3 subsections) - Civic responsibility, naturalization, rights & responsibilities
 * - **Media Literacy** (3 subsections) - Identifying bias, fact-checking, evaluating sources
 * - **National Symbols** (5 subsections) - Flag, eagle, Great Seal, Liberty Bell, Statue of Liberty
 * - **National Hymns** (3 subsections) - National Anthem, America the Beautiful, God Bless America
 * - **The American Experiment** (3 subsections) - Self-government, American identity, unity & diversity
 * - **To Be an American** (1 subsection) - Reflection on what it means to be American
 * 
 * Special features:
 * - Full text of founding documents included
 * - Historical context for each document
 * - Image URLs for national symbols
 * 
 * @constant
 */
export const civicliteracyData: MainSection = {
  id: "civic-literacy",
    title: "Civic Literacy",
    icon: "school",
    description: "Understanding American government, founding documents, and civic responsibility",
    sections: [
      {
        id: "branches-government",
        title: "Branches of Government",
        description: "The three branches that make up the federal government",
        subsections: [
          {
            id: "legislative",
            title: "Legislative Branch",
            content:
              "The Legislative Branch is the portion of the federal government responsible for creating the laws that guide national life. Through the House of Representatives and the Senate, citizens from every state send leaders to Congress to speak for them, debate the issues of the day, and help shape the direction of the country. This branch reflects the belief that laws should rise from the people themselves through elected representatives who live among them and answer directly to them.\n\nThe House and Senate each bring a different rhythm and perspective to lawmaking. Members of the House represent smaller districts and face reelection every two years, which keeps them close to the daily concerns of their communities. Senators serve longer terms and represent entire states, which allows them to approach issues with a wider lens and a steadier pace. When a bill must pass through both chambers, it ensures that laws are tested by differing viewpoints and levels of scrutiny.\n\nBeyond crafting legislation, the Legislative Branch holds important tools for balancing power. Congress oversees federal agencies, manages national spending, confirms or rejects presidential appointments, and carries the authority to investigate matters that affect the integrity of the republic. It can even override a presidential veto with enough support, reinforcing that no part of government stands above the others.\n\nThe strength of the Legislative Branch depends on citizens who follow events, stay informed, and communicate with their representatives. When the public participates with clarity and intention, Congress becomes more responsive, more grounded, and better aligned with the real needs of the country. Representative government works only when the people it represents remain engaged.",
          },
          {
            id: "executive",
            title: "Executive Branch",
            content:
              "The Executive Branch is responsible for enforcing the laws passed by Congress and managing the day to day operation of the federal government. Led by the President, this branch includes the Vice President, the Cabinet, and numerous agencies that handle everything from national defense to public health and transportation. While Congress writes the law, the Executive ensures those laws are carried out faithfully and effectively.\n\nThe President serves as both head of state and commander in chief, representing the nation on the world stage while also overseeing the military. Presidents make decisions that require both strategic thinking and moral judgment, whether they are negotiating treaties, responding to crises, or guiding national policy. The Cabinet and federal agencies help translate broad laws into practical actions by drafting regulations, coordinating programs, and addressing emerging challenges.\n\nThe Executive Branch also plays a vital role in balancing power. The President can veto legislation, nominate judges and officials, and set administrative priorities that influence how laws are interpreted and applied. Yet these powers come with limits. Congress controls funding and oversight, and the courts can overturn actions that violate the Constitution. This tension keeps the Executive from overshadowing the other branches.\n\nA healthy Executive Branch depends on leaders who act with discipline and a nation that pays attention to how power is used. When the public remains aware, asks questions, and expects accountability, the Executive is guided not by personal ambition but by the responsibilities of service.",
          },
          {
            id: "judicial",
            title: "Judicial Branch",
            content:
              "The Judicial Branch interprets the laws of the United States and ensures that government actions remain within the boundaries of the Constitution. Federal courts handle disputes that involve constitutional questions, federal statutes, and conflicts between states. At the top sits the Supreme Court, which resolves the most significant legal disagreements and delivers decisions that shape the meaning of American law for generations.\n\nJudges do not write laws or enforce them. Instead they examine cases, weigh arguments from both sides, and determine how the law applies to real situations. This requires careful study of the Constitution, legal precedent, and the facts of each case. The goal is to reach decisions rooted in principle rather than political pressure, which is why federal judges are appointed for life. Their independence protects the rule of law from shifting moods or temporary majorities.\n\nThe Judicial Branch also serves as a guardian against government overreach. Courts can strike down actions by Congress or the Executive if those actions violate constitutional protections. This power, known as judicial review, ensures that no branch stands above the law. By keeping all parts of government accountable to the same set of rules, the judiciary strengthens public trust and ensures fairness.\n\nThe courts operate quietly compared to other branches, but their influence is deep and long lasting. When the judicial system functions with transparency, integrity, and patience, it helps secure the rights of every person and preserves the constitutional order that supports a free society.",
          },
        ],
      },
      {
id: "founding-documents",
        title: "Founding Documents",
        description: "The essential texts that established American government",
        subsections: [
          {
            id: "declaration",
            title: "The Declaration of Independence",
            content:
              "The Declaration of Independence is both a breakup letter with the British Crown and a statement of timeless principles. It explains why the colonies believed they were justified in separating, lists abuses by the king, and declares that legitimate governments exist to secure God given rights. Its words about equality and unalienable rights have challenged every generation to measure America’s progress against its founding ideals.",
            imageUrl:
              "https://media.defense.gov/2009/Jun/30/2000533726/-1/-1/0/040929-F-5102W-001.JPG",
            fullText: `
In Congress, July 4, 1776

The unanimous Declaration of the thirteen united States of America, When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.

We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness. Prudence, indeed, will dictate that Governments long established should not be changed for light and transient causes; and accordingly all experience hath shewn, that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed. But when a long train of abuses and usurpations, pursuing invariably the same Object evinces a design to reduce them under absolute Despotism, it is their right, it is their duty, to throw off such Government, and to provide new Guards for their future security.--Such has been the patient sufferance of these Colonies; and such is now the necessity which constrains them to alter their former Systems of Government. The history of the present King of Great Britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute Tyranny over these States. To prove this, let Facts be submitted to a candid world.

He has refused his Assent to Laws, the most wholesome and necessary for the public good.

He has forbidden his Governors to pass Laws of immediate and pressing importance, unless suspended in their operation till his Assent should be obtained; and when so suspended, he has utterly neglected to attend to them.

He has refused to pass other Laws for the accommodation of large districts of people, unless those people would relinquish the right of Representation in the Legislature, a right inestimable to them and formidable to tyrants only.

He has called together legislative bodies at places unusual, uncomfortable, and distant from the depository of their public Records, for the sole purpose of fatiguing them into compliance with his measures.

He has dissolved Representative Houses repeatedly, for opposing with manly firmness his invasions on the rights of the people.

He has refused for a long time, after such dissolutions, to cause others to be elected; whereby the Legislative powers, incapable of Annihilation, have returned to the People at large for their exercise; the State remaining in the mean time exposed to all the dangers of invasion from without, and convulsions within.

He has endeavoured to prevent the population of these States; for that purpose obstructing the Laws for Naturalization of Foreigners; refusing to pass others to encourage their migrations hither, and raising the conditions of new Appropriations of Lands.

He has obstructed the Administration of Justice, by refusing his Assent to Laws for establishing Judiciary powers.

He has made Judges dependent on his Will alone, for the tenure of their offices, and the amount and payment of their salaries.

He has erected a multitude of New Offices, and sent hither swarms of Officers to harrass our people, and eat out their substance.

He has kept among us, in times of peace, Standing Armies without the Consent of our legislatures.

He has affected to render the Military independent of and superior to the Civil power.

He has combined with others to subject us to a jurisdiction foreign to our constitution, and unacknowledged by our laws; giving his Assent to their Acts of pretended Legislation:

For Quartering large bodies of armed troops among us:

For protecting them, by a mock Trial, from punishment for any Murders which they should commit on the Inhabitants of these States:

For cutting off our Trade with all parts of the world:

For imposing Taxes on us without our Consent:

For depriving us in many cases, of the benefits of Trial by Jury:

For transporting us beyond Seas to be tried for pretended offences:

For abolishing the free System of English Laws in a neighbouring Province, establishing therein an Arbitrary government, and enlarging its Boundaries so as to render it at once an example and fit instrument for introducing the same absolute rule into these Colonies:

For taking away our Charters, abolishing our most valuable Laws, and altering fundamentally the Forms of our Governments:

For suspending our own Legislatures, and declaring themselves invested with power to legislate for us in all cases whatsoever.

He has abdicated Government here, by declaring us out of his Protection and waging War against us.

He has plundered our seas, ravaged our Coasts, burnt our towns, and destroyed the lives of our people.

He is at this time transporting large Armies of foreign Mercenaries to compleat the works of death, desolation and tyranny, already begun with circumstances of Cruelty & perfidy scarcely paralleled in the most barbarous ages, and totally unworthy the Head of a civilized nation.

He has constrained our fellow Citizens taken Captive on the high Seas to bear Arms against their Country, to become the executioners of their friends and Brethren, or to fall themselves by their Hands.

He has excited domestic insurrections amongst us, and has endeavoured to bring on the inhabitants of our frontiers, the merciless Indian Savages, whose known rule of warfare, is an undistinguished destruction of all ages, sexes and conditions.

In every stage of these Oppressions We have Petitioned for Redress in the most humble terms: Our repeated Petitions have been answered only by repeated injury. A Prince, whose character is thus marked by every act which may define a Tyrant, is unfit to be the ruler of a free people.

Nor have We been wanting in attentions to our Brittish brethren. We have warned them from time to time of attempts by their legislature to extend an unwarrantable jurisdiction over us. We have reminded them of the circumstances of our emigration and settlement here. We have appealed to their native justice and magnanimity, and we have conjured them by the ties of our common kindred to disavow these usurpations, which, would inevitably interrupt our connections and correspondence. They too have been deaf to the voice of justice and of consanguinity. We must, therefore, acquiesce in the necessity, which denounces our Separation, and hold them, as we hold the rest of mankind, Enemies in War, in Peace Friends.

We, therefore, the Representatives of the united States of America, in General Congress, Assembled, appealing to the Supreme Judge of the world for the rectitude of our intentions, do, in the Name, and by Authority of the good People of these Colonies, solemnly publish and declare, That these United Colonies are, and of Right ought to be Free and Independent States; that they are Absolved from all Allegiance to the British Crown, and that all political connection between them and the State of Great Britain, is and ought to be totally dissolved; and that as Free and Independent States, they have full Power to levy War, conclude Peace, contract Alliances, establish Commerce, and to do all other Acts and Things which Independent States may of right do. And for the support of this Declaration, with a firm reliance on the protection of divine Providence, we mutually pledge to each other our Lives, our Fortunes and our sacred Honor.

Georgia:

Button Gwinnett
Lyman Hall
George Walton

 

North Carolina:

William Hooper
Joseph Hewes
John Penn

 

South Carolina:

Edward Rutledge
Thomas Heyward, Jr.
Thomas Lynch, Jr.
Arthur Middleton

 

Massachusetts:

John Hancock
Maryland
Samuel Chase
William Paca
Thomas Stone
Charles Carroll of Carrollton

 

Virginia:

George Wythe
Richard Henry Lee
Thomas Jefferson
Benjamin Harrison
Thomas Nelson, Jr.
Francis Lightfoot Lee
Carter Braxton

 

Pennsylvania:

Robert Morris
Benjamin Rush
Benjamin Franklin
John Morton
George Clymer
James Smith
George Taylor
James Wilson
George Ross
Delaware
Caesar Rodney
George Read
Thomas McKean

 

New York:

William Floyd
Philip Livingston
Francis Lewis
Lewis Morris

 

New Jersey:

Richard Stockton
John Witherspoon
Francis Hopkinson
John Hart
Abraham Clark

 

New Hampshire:
Josiah Bartlett
William Whipple

 

Massachusetts:

Samuel Adams
John Adams
Robert Treat Paine
Elbridge Gerry

 

Rhode Island:

Stephen Hopkins
William Ellery

 

Connecticut:

Roger Sherman
Samuel Huntington
William Williams
Oliver Wolcott

 

New Hampshire:

Matthew Thornton
            `.trim(),
            context: `
The Declaration of Independence was drafted primarily by Thomas Jefferson and approved by the Second Continental Congress on July 4, 1776. It announced to the world that the thirteen colonies were breaking from British rule and forming a new nation.

The document is usually understood in three main parts: a statement of natural rights and the purpose of government, a list of grievances against King George III, and a final declaration that the colonies are free and independent states. Its claim that all men are created equal and endowed by their Creator with unalienable rights has been quoted, challenged, and reclaimed by many generations.

Even when America has failed to live up to these principles, the words of the Declaration have been used to call the country back to its own promises—by abolitionists, civil rights leaders, and others who insisted that the nation take its founding ideals seriously.
            `.trim(),
          },
          {
            id: "articles",
            title: "The Articles of Confederation",
            content:
              "The Articles of Confederation created the first national government of the United States, a loose partnership of states joined for common defense and diplomacy. Congress could make decisions, but it lacked strong tools to enforce them or raise money directly. This experiment showed the strengths of local control but also the dangers of a national government that was too weak to solve shared problems. The lessons learned under the Articles paved the way for the Constitution.",
            imageUrl: "https://catalog.archives.gov/id/301687",
            fullText: `
To all to whom these Presents shall come, we, the undersigned Delegates of the States affixed to our Names send greeting. Whereas the Delegates of the United States of America in Congress assembled did on the fifteenth day of November in the year of our Lord One Thousand Seven Hundred and Seventy seven, and in the Second Year of the Independence of America agree to certain articles of Confederation and perpetual Union between the States of Newhampshire, Massachusetts-bay, Rhodeisland and Providence Plantations, Connecticut, New York, New Jersey, Pennsylvania, Delaware, Maryland, Virginia, North Carolina, South Carolina, and Georgia in the Words following, viz. “Articles of Confederation and perpetual Union between the States of Newhampshire, Massachusetts-bay, Rhodeisland and Providence Plantations, Connecticut, New York, New Jersey, Pennsylvania, Delaware, Maryland, Virginia, North Carolina, South Carolina, and Georgia.

Article I. The Stile of this confederacy shall be, “The United States of America.”

Article II. Each state retains its sovereignty, freedom and independence, and every Power, Jurisdiction and right, which is not by this confederation expressly delegated to the United States, in Congress assembled.

Article III. The said states hereby severally enter into a firm league of friendship with each other, for their common defence, the security of their Liberties, and their mutual and general welfare, binding themselves to assist each other, against all force offered to, or attacks made upon them, or any of them, on account of religion, sovereignty, trade, or any other pretence whatever.

Article IV. The better to secure and perpetuate mutual friendship and intercourse among the people of the different states in this union, the free inhabitants of each of these states, paupers, vagabonds and fugitives from Justice excepted, shall be entitled to all privileges and immunities of free citizens in the several states; and the people of each state shall have free ingress and regress to and from any other state, and shall enjoy therein all the privileges of trade and commerce, subject to the same duties, impositions and restrictions as the inhabitants thereof respectively, provided that such restrictions shall not extend so far as to prevent the removal of property imported into any state, to any other State of which the Owner is an inhabitant; provided also that no imposition, duties or restriction shall be laid by any state, on the property of the united states, or either of them.

                       If any Person guilty of, or charged with, treason, felony, or other high misdemeanor in any state, shall flee from Justice, and be found in any of the united states, he shall upon demand of the Governor or executive power of the state from which he fled, be delivered up, and removed to the state having jurisdiction of his offence.

                       Full faith and credit shall be given in each of these states to the records, acts and judicial proceedings of the courts and magistrates of every other state.

Article V. For the more convenient management of the general interests of the united states, delegates shall be annually appointed in such manner as the legislature of each state shall direct, to meet in Congress on the first Monday in November, in every year, with a power reserved to each state to recall its delegates, or any of them, at any time within the year, and to send others in their stead, for the remainder of the Year.

                 No State shall be represented in Congress by less than two, nor by more than seven Members; and no person shall be capable of being delegate for more than three years, in any term of six years; nor shall any person, being a delegate, be capable of holding any office under the united states, for which he, or another for his benefit receives any salary, fees or emolument of any kind.

                 Each State shall maintain its own delegates in a meeting of the states, and while they act as members of the committee of the states.

                 In determining questions in the united states, in Congress assembled, each state shall have one vote.

                 Freedom of speech and debate in Congress shall not be impeached or questioned in any Court, or place out of Congress, and the members of congress shall be protected in their persons from arrests and imprisonments, during the time of their going to and from, and attendance on congress, except for treason, felony, or breach of the peace.

Article VI. No State, without the Consent of the united States, in congress assembled, shall send any embassy to, or receive any embassy from, or enter into any conferrence, agreement, alliance, or treaty, with any King prince or state; nor shall any person holding any office of profit or trust under the united states, or any of them, accept of any present, emolument, office, or title of any kind whatever, from any king, prince, or foreign state; nor shall the united states, in congress assembled, or any of them, grant any title of nobility.

No two or more states shall enter into any treaty, confederation, or alliance whatever between them, without the consent of the united states, in congress assembled, specifying accurately the purposes for which the same is to be entered into, and how long it shall continue.

No State shall lay any imposts or duties, which may interfere with any stipulations in treaties, entered into by the united States in congress assembled, with any king, prince, or State, in pursuance of any treaties already proposed by congress, to the courts of France and Spain.

No vessels of war shall be kept up in time of peace, by any state, except such number only, as shall be deemed necessary by the united states, in congress assembled, for the defence of such state, or its trade; nor shall any body of forces be kept up, by any state, in time of peace, except such number only as, in the judgment of the united states, in congress assembled, shall be deemed requisite to garrison the forts necessary for the defence of such state; but every state shall always keep up a well regulated and disciplined militia, sufficiently armed and accoutred, and shall provide and constantly have ready for use, in public stores, a due number of field pieces and tents, and a proper quantity of arms, ammunition, and camp equipage.

No State shall engage in any war without the consent of the united States in congress assembled, unless such State be actually invaded by enemies, or shall have received certain advice of a resolution being formed by some nation of Indians to invade such State, and the danger is so imminent as not to admit of a delay till the united states in congress assembled, can be consulted: nor shall any state grant commissions to any ships or vessels of war, nor letters of marque or reprisal, except it be after a declaration of war by the united states in congress assembled, and then only against the kingdom or State, and the subjects thereof, against which war has been so declared, and under such regulations as shall be established by the united states in congress assembled, unless such state be infested by pirates, in which case vessels of war may be fitted out for that occasion, and kept so long as the danger shall continue, or until the united states in congress assembled shall determine otherwise.

Article VII. When land forces are raised by any state, for the common defence, all officers of or under the rank of colonel, shall be appointed by the legislature of each state respectively by whom such forces shall be raised, or in such manner as such state shall direct, and all vacancies shall be filled up by the state which first made appointment.

Article VIII. All charges of war, and all other expenses that shall be incurred for the common defence or general welfare, and allowed by the united states in congress assembled, shall be defrayed out of a common treasury, which shall be supplied by the several states, in proportion to the value of all land within each state, granted to or surveyed for any Person, as such land and the buildings  and improvements thereon shall be estimated, according to such mode as the united states, in congress assembled, shall, from time to time, direct and appoint. The taxes for paying that proportion shall be laid and levied by the authority and direction of the legislatures of the several states within the time agreed upon by the united states in congress assembled.

Article IX. The united states, in congress assembled, shall have the sole and exclusive right and power of determining on peace and war, except in the cases mentioned in the sixth article - of sending and receiving ambassadors - entering into treaties and alliances, provided that no treaty of commerce shall be made, whereby the legislative power of the respective states shall be restrained from imposing such imposts and duties on foreigners, as their own people are subjected to, or from prohibiting the exportation or importation of any species of goods or commodities whatsoever -  of establishing rules for deciding, in all cases, what captures on land or water shall be legal, and in what manner prizes taken by land or naval forces in the service of the united States, shall be divided or appropriated - of granting letters of marque and reprisal in times of peace - appointing courts for the trial of piracies and felonies committed on the high seas; and establishing courts; for receiving and determining finally appeals in all cases of captures; provided that no member of congress shall be appointed a judge of any of the said courts.

The united states, in congress assembled, shall also be the last resort on appeal, in all disputes and differences now subsisting, or that hereafter may arise between two or more states concerning boundary, jurisdiction, or any other cause whatever; which authority shall always be exercised in the manner following. Whenever the legislative or executive authority, or lawful agent of any state in controversy with another, shall present a petition to congress, stating the matter in question, and praying for a hearing, notice thereof shall be given, by order of congress, to the legislative or executive authority of the other state in controversy, and a day assigned for the appearance of the parties by their lawful agents, who shall then be directed to appoint, by joint consent, commissioners or judges to constitute a court for hearing and determining the matter in question: but if they cannot agree, congress shall name three persons out of each of the united states, and from the list of such persons each party shall alternately strike out one, the petitioners beginning, until the number shall be reduced to thirteen; and from that number not less than seven, nor more than nine names, as congress shall direct, shall, in the presence of congress, be drawn out by lot, and the persons whose names shall be so drawn, or any five of them, shall be commissioners or judges, to hear and finally determine the controversy, so always as a major part of the judges, who shall hear the cause, shall agree in the determination: and if either party shall neglect to attend at the day appointed, without showing reasons which congress shall judge sufficient, or being present, shall refuse to strike, the congress shall proceed to nominate three persons out of each State, and the secretary of congress shall strike in behalf of such party absent or refusing; and the judgment and sentence of the court, to be appointed in the manner before prescribed, shall be final and conclusive; and if any of the parties shall refuse to submit to the authority of such court, or to appear or defend their claim or cause, the court shall nevertheless proceed to pronounce sentence, or judgment, which shall in like manner be final and decisive; the judgment or sentence and other proceedings being in either case transmitted to congress, and lodged among the acts of congress, for the security of the parties concerned: provided that every commissioner, before he sits in judgment, shall take an oath to be administered by one of the judges of the supreme or superior court of the State where the cause shall be tried, “well and truly to hear and determine the matter in question, according to the best of his judgment, without favour, affection, or hope of reward: “provided, also, that no State shall be deprived of territory for the benefit of the united states.

All controversies concerning the private right of soil claimed under different grants of two or more states, whose jurisdictions as they may respect such lands, and the states which passed such grants are adjusted, the said grants or either of them being at the same time claimed to have originated antecedent to such settlement of jurisdiction, shall, on the petition of either party to the congress of the united states, be finally determined, as near as may be, in the same manner as is before prescribed for deciding disputes respecting territorial jurisdiction between different states.

The united states, in congress assembled, shall also have the sole and exclusive right and power of regulating the alloy and value of coin struck by their own authority, or by that of the respective states - fixing the standard of weights and measures throughout the united states - regulating the trade and managing all affairs with the Indians, not members of any of the states; provided that the legislative right of any state, within its own limits, be not infringed or violated - establishing and regulating post-offices from one state to another, throughout all the united states, and exacting such postage on the papers passing through the same, as may be requisite to defray the expenses of the said office - appointing all officers of the land forces in the service of the united States, excepting regimental officers - appointing all the officers of the naval forces, and commissioning all officers whatever in the service of the united states; making rules for the government and regulation of the said land and naval forces, and directing their operations.

The united States, in congress assembled, shall have authority to appoint a committee, to sit in the recess of congress, to be denominated, “A Committee of the States,” and to consist of one delegate from each State; and to appoint such other committees and civil officers as may be necessary for managing the general affairs of the united states under their direction - to appoint one of their number to preside; provided that no person be allowed to serve in the office of president more than one year in any term of three years; to ascertain the necessary sums of money to be raised for the service of the united states, and to appropriate and apply the same for defraying the public expenses; to borrow money or emit bills on the credit of the united states, transmitting every half year to the respective states an account of the sums of money so borrowed or emitted, - to build and equip a navy - to agree upon the number of land forces, and to make requisitions from each state for its quota, in proportion to the number of white inhabitants in such state, which requisition shall be binding; and thereupon the legislature of each state shall appoint the regimental officers, raise the men, and clothe, arm, and equip them, in a soldier-like manner, at the expense of the united states; and the officers and men so clothed, armed, and equipped, shall march to the place appointed, and within the time agreed on by the united states, in congress assembled; but if the united states, in congress assembled, shall, on consideration of circumstances, judge proper that any state should not raise men, or should raise a smaller number than its quota, and that any other state should raise a greater number of men than the quota thereof, such extra number shall be raised, officered, clothed, armed, and equipped in the same manner as the quota of such state, unless the legislature of such state shall judge that such extra number cannot be safely spared out of the same, in which case they shall raise, officer, clothe, arm, and equip, as many of such extra number as they judge can be safely spared. And the officers and men so clothed, armed, and equipped, shall march to the place appointed, and within the time agreed on by the united states in congress assembled.

The united states, in congress assembled, shall never engage in a war, nor grant letters of marque and reprisal in time of peace, nor enter into any treaties or alliances, nor coin money, nor regulate the value thereof nor ascertain the sums and expenses necessary for the defence and welfare of the united states, or any of them, nor emit bills, nor borrow money on the credit of the united states, nor appropriate money, nor agree upon the number of vessels of war to be built or purchased, or the number of land or sea forces to be raised, nor appoint a commander in chief of the army or navy, unless nine states assent to the same, nor shall a question on any other point, except for adjourning from day to day, be determined, unless by the votes of a majority of the united states in congress assembled.

The congress of the united states shall have power to adjourn to any time within the year, and to any place within the united states, so that no period of adjournment be for a longer duration than the space of six Months, and shall publish the Journal of their proceedings monthly, except such parts thereof relating to treaties, alliances, or military operations, as in their judgment require secrecy; and the yeas and nays of the delegates of each State, on any question, shall be entered on the Journal, when it is desired by any delegate; and the delegates of a State, or any of them, at his or their request, shall be furnished with a transcript of the said Journal, except such parts as are above excepted, to lay before the legislatures of the several states.

Article X. The committee of the states, or any nine of them, shall be authorized to execute, in the recess of congress, such of the powers of congress as the united states, in congress assembled, by the consent of nine states, shall, from time to time, think expedient to vest them with; provided that no power be delegated to the said committee, for the exercise of which, by the articles of confederation, the voice of nine states, in the congress of the united states assembled, is requisite.

Article XI. Canada acceding to this confederation, and joining in the measures of the united states, shall be admitted into, and entitled to all the advantages of this union: but no other colony shall be admitted into the same, unless such admission be agreed to by nine states.

Article XII. All bills of credit emitted, monies borrowed, and debts contracted by or under the authority of congress, before the assembling of the united states, in pursuance of the present confederation, shall be deemed and considered as a charge against the united States, for payment and satisfaction whereof the said united states and the public faith are hereby solemnly pledged.

Article XIII. Every State shall abide by the determinations of the united states, in congress assembled, on all questions which by this confederation are submitted to them. And the Articles of this confederation shall be inviolably observed by every state, and the union shall be perpetual; nor shall any alteration at any time hereafter be made in any of them, unless such alteration be agreed to in a congress of the united states, and be afterwards con-firmed by the legislatures of every state.

And Whereas it hath pleased the Great Governor of the World to incline the hearts of the legislatures we respectively represent in congress, to approve of, and to authorize us to ratify the said articles of confederation and perpetual union, Know Ye, that we, the undersigned delegates, by virtue of the power and authority to us given for that purpose, do, by these presents, in the name and in behalf of our respective constituents, fully and entirely ratify and confirm each and every of the said articles of confederation and perpetual union, and all and singular the matters and things therein contained. And we do further solemnly plight and engage the faith of our respective constituents, that they shall abide by the determinations of the united states in congress assembled, on all questions, which by the said confederation are submitted to them. And that the articles thereof shall be inviolably observed by the states we respectively represent, and that the union shall be perpetual. In Witness whereof, we have hereunto set our hands, in Congress. Done at Philadelphia, in the State of Pennsylvania, the ninth Day of July, in the Year of our Lord one Thousand seven Hundred and Seventy eight, and in the third year of the Independence of America.
            `.trim(),
            context: `
Adopted during the Revolutionary War and fully ratified in 1781, the Articles of Confederation created a single national Congress but left most power with the individual states. Congress could conduct diplomacy, make war and peace, and manage western lands, yet it could not levy taxes directly, regulate interstate commerce, or enforce its decisions on individual citizens.

These weaknesses led to financial trouble, disputes among states, and events such as Shays’ Rebellion, which alarmed many leaders. Their experience under the Articles convinced them that a stronger but still limited national government was needed, leading directly to the Constitutional Convention of 1787 and the drafting of the U.S. Constitution.
            `.trim(),
          },
          {
            id: "constitution",
            title: "The Constitution",
            content:
  'The Constitution is the blueprint for the American system of government. It begins with the words "We the People," signaling that authority comes from citizens rather than from a monarch. The document lays out the powers of each branch, the relationship between the national government and the states, and the process for making changes through amendments. Its endurance over centuries comes from a combination of clear structure and flexibility for future generations.',
            imageUrl:
              "https://www.archives.gov/files/founding-docs/downloads/Constitution_Pg1of4_AC.jpg",
            fullText: `
We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.

Article. I.
Section. 1.
All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.

Section. 2.
The House of Representatives shall be composed of Members chosen every second Year by the People of the several States, and the Electors in each State shall have the Qualifications requisite for Electors of the most numerous Branch of the State Legislature.

No Person shall be a Representative who shall not have attained to the Age of twenty five Years, and been seven Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State in which he shall be chosen.

Representatives and direct Taxes shall be apportioned among the several States which may be included within this Union, according to their respective Numbers, which shall be determined by adding to the whole Number of free Persons, including those bound to Service for a Term of Years, and excluding Indians not taxed, three fifths of all other Persons. The actual Enumeration shall be made within three Years after the first Meeting of the Congress of the United States, and within every subsequent Term of ten Years, in such Manner as they shall by Law direct. The Number of Representatives shall not exceed one for every thirty Thousand, but each State shall have at Least one Representative; and until such enumeration shall be made, the State of New Hampshire shall be entitled to chuse three, Massachusetts eight, Rhode-Island and Providence Plantations one, Connecticut five, New-York six, New Jersey four, Pennsylvania eight, Delaware one, Maryland six, Virginia ten, North Carolina five, South Carolina five, and Georgia three.

When vacancies happen in the Representation from any State, the Executive Authority thereof shall issue Writs of Election to fill such Vacancies.

The House of Representatives shall chuse their Speaker and other Officers; and shall have the sole Power of Impeachment.

Section. 3.
The Senate of the United States shall be composed of two Senators from each State, chosen by the Legislature thereof, for six Years; and each Senator shall have one Vote.

Immediately after they shall be assembled in Consequence of the first Election, they shall be divided as equally as may be into three Classes. The Seats of the Senators of the first Class shall be vacated at the Expiration of the second Year, of the second Class at the Expiration of the fourth Year, and of the third Class at the Expiration of the sixth Year, so that one third may be chosen every second Year; and if Vacancies happen by Resignation, or otherwise, during the Recess of the Legislature of any State, the Executive thereof may make temporary Appointments until the next Meeting of the Legislature, which shall then fill such Vacancies.

No Person shall be a Senator who shall not have attained to the Age of thirty Years, and been nine Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State for which he shall be chosen.

The Vice President of the United States shall be President of the Senate, but shall have no Vote, unless they be equally divided.

The Senate shall chuse their other Officers, and also a President pro tempore, in the Absence of the Vice President, or when he shall exercise the Office of President of the United States.

The Senate shall have the sole Power to try all Impeachments. When sitting for that Purpose, they shall be on Oath or Affirmation. When the President of the United States is tried, the Chief Justice shall preside: And no Person shall be convicted without the Concurrence of two thirds of the Members present.

Judgment in Cases of Impeachment shall not extend further than to removal from Office, and disqualification to hold and enjoy any Office of honor, Trust or Profit under the United States: but the Party convicted shall nevertheless be liable and subject to Indictment, Trial, Judgment and Punishment, according to Law.

Section. 4.
The Times, Places and Manner of holding Elections for Senators and Representatives, shall be prescribed in each State by the Legislature thereof; but the Congress may at any time by Law make or alter such Regulations, except as to the Places of chusing Senators.

The Congress shall assemble at least once in every Year, and such Meeting shall be on the first Monday in December, unless they shall by Law appoint a different Day.

Section. 5.
Each House shall be the Judge of the Elections, Returns and Qualifications of its own Members, and a Majority of each shall constitute a Quorum to do Business; but a smaller Number may adjourn from day to day, and may be authorized to compel the Attendance of absent Members, in such Manner, and under such Penalties as each House may provide.

Each House may determine the Rules of its Proceedings, punish its Members for disorderly Behaviour, and, with the Concurrence of two thirds, expel a Member.

Each House shall keep a Journal of its Proceedings, and from time to time publish the same, excepting such Parts as may in their Judgment require Secrecy; and the Yeas and Nays of the Members of either House on any question shall, at the Desire of one fifth of those Present, be entered on the Journal.

Neither House, during the Session of Congress, shall, without the Consent of the other, adjourn for more than three days, nor to any other Place than that in which the two Houses shall be sitting.

Section. 6.
The Senators and Representatives shall receive a Compensation for their Services, to be ascertained by Law, and paid out of the Treasury of the United States. They shall in all Cases, except Treason, Felony and Breach of the Peace, be privileged from Arrest during their Attendance at the Session of their respective Houses, and in going to and returning from the same; and for any Speech or Debate in either House, they shall not be questioned in any other Place.

No Senator or Representative shall, during the Time for which he was elected, be appointed to any civil Office under the Authority of the United States, which shall have been created, or the Emoluments whereof shall have been encreased during such time; and no Person holding any Office under the United States, shall be a Member of either House during his Continuance in Office.

Section. 7.
All Bills for raising Revenue shall originate in the House of Representatives; but the Senate may propose or concur with Amendments as on other Bills.

Every Bill which shall have passed the House of Representatives and the Senate, shall, before it become a Law, be presented to the President of the United States; If he approve he shall sign it, but if not he shall return it, with his Objections to that House in which it shall have originated, who shall enter the Objections at large on their Journal, and proceed to reconsider it. If after such Reconsideration two thirds of that House shall agree to pass the Bill, it shall be sent, together with the Objections, to the other House, by which it shall likewise be reconsidered, and if approved by two thirds of that House, it shall become a Law. But in all such Cases the Votes of both Houses shall be determined by yeas and Nays, and the Names of the Persons voting for and against the Bill shall be entered on the Journal of each House respectively. If any Bill shall not be returned by the President within ten Days (Sundays excepted) after it shall have been presented to him, the Same shall be a Law, in like Manner as if he had signed it, unless the Congress by their Adjournment prevent its Return, in which Case it shall not be a Law.

Every Order, Resolution, or Vote to which the Concurrence of the Senate and House of Representatives may be necessary (except on a question of Adjournment) shall be presented to the President of the United States; and before the Same shall take Effect, shall be approved by him, or being disapproved by him, shall be repassed by two thirds of the Senate and House of Representatives, according to the Rules and Limitations prescribed in the Case of a Bill.

Section. 8.
The Congress shall have Power To lay and collect Taxes, Duties, Imposts and Excises, to pay the Debts and provide for the common Defence and general Welfare of the United States; but all Duties, Imposts and Excises shall be uniform throughout the United States;

To borrow Money on the credit of the United States;

To regulate Commerce with foreign Nations, and among the several States, and with the Indian Tribes;

To establish an uniform Rule of Naturalization, and uniform Laws on the subject of Bankruptcies throughout the United States;

To coin Money, regulate the Value thereof, and of foreign Coin, and fix the Standard of Weights and Measures;

To provide for the Punishment of counterfeiting the Securities and current Coin of the United States;

To establish Post Offices and post Roads;

To promote the Progress of Science and useful Arts, by securing for limited Times to Authors and Inventors the exclusive Right to their respective Writings and Discoveries;

To constitute Tribunals inferior to the supreme Court;

To define and punish Piracies and Felonies committed on the high Seas, and Offences against the Law of Nations;

To declare War, grant Letters of Marque and Reprisal, and make Rules concerning Captures on Land and Water;

To raise and support Armies, but no Appropriation of Money to that Use shall be for a longer Term than two Years;

To provide and maintain a Navy;

To make Rules for the Government and Regulation of the land and naval Forces;

To provide for calling forth the Militia to execute the Laws of the Union, suppress Insurrections and repel Invasions;

To provide for organizing, arming, and disciplining, the Militia, and for governing such Part of them as may be employed in the Service of the United States, reserving to the States respectively, the Appointment of the Officers, and the Authority of training the Militia according to the discipline prescribed by Congress;

To exercise exclusive Legislation in all Cases whatsoever, over such District (not exceeding ten Miles square) as may, by Cession of particular States, and the Acceptance of Congress, become the Seat of the Government of the United States, and to exercise like Authority over all Places purchased by the Consent of the Legislature of the State in which the Same shall be, for the Erection of Forts, Magazines, Arsenals, dock-Yards, and other needful Buildings;—And

To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers, and all other Powers vested by this Constitution in the Government of the United States, or in any Department or Officer thereof.

Section. 9.
The Migration or Importation of such Persons as any of the States now existing shall think proper to admit, shall not be prohibited by the Congress prior to the Year one thousand eight hundred and eight, but a Tax or duty may be imposed on such Importation, not exceeding ten dollars for each Person.

The Privilege of the Writ of Habeas Corpus shall not be suspended, unless when in Cases of Rebellion or Invasion the public Safety may require it.

No Bill of Attainder or ex post facto Law shall be passed.

No Capitation, or other direct, Tax shall be laid, unless in Proportion to the Census or enumeration herein before directed to be taken.

No Tax or Duty shall be laid on Articles exported from any State.

No Preference shall be given by any Regulation of Commerce or Revenue to the Ports of one State over those of another: nor shall Vessels bound to, or from, one State, be obliged to enter, clear, or pay Duties in another.

No Money shall be drawn from the Treasury, but in Consequence of Appropriations made by Law; and a regular Statement and Account of the Receipts and Expenditures of all public Money shall be published from time to time.

No Title of Nobility shall be granted by the United States: And no Person holding any Office of Profit or Trust under them, shall, without the Consent of the Congress, accept of any present, Emolument, Office, or Title, of any kind whatever, from any King, Prince, or foreign State.

Section. 10.
No State shall enter into any Treaty, Alliance, or Confederation; grant Letters of Marque and Reprisal; coin Money; emit Bills of Credit; make any Thing but gold and silver Coin a Tender in Payment of Debts; pass any Bill of Attainder, ex post facto Law, or Law impairing the Obligation of Contracts, or grant any Title of Nobility.

No State shall, without the Consent of the Congress, lay any Imposts or Duties on Imports or Exports, except what may be absolutely necessary for executing it's inspection Laws: and the net Produce of all Duties and Imposts, laid by any State on Imports or Exports, shall be for the Use of the Treasury of the United States; and all such Laws shall be subject to the Revision and Controul of the Congress.

No State shall, without the Consent of Congress, lay any Duty of Tonnage, keep Troops, or Ships of War in time of Peace, enter into any Agreement or Compact with another State, or with a foreign Power, or engage in War, unless actually invaded, or in such imminent Danger as will not admit of delay.

Article. II.
Section. 1.
The executive Power shall be vested in a President of the United States of America. He shall hold his Office during the Term of four Years, and, together with the Vice President, chosen for the same Term, be elected, as follows

Each State shall appoint, in such Manner as the Legislature thereof may direct, a Number of Electors, equal to the whole Number of Senators and Representatives to which the State may be entitled in the Congress: but no Senator or Representative, or Person holding an Office of Trust or Profit under the United States, shall be appointed an Elector.

The Electors shall meet in their respective States, and vote by Ballot for two Persons, of whom one at least shall not be an Inhabitant of the same State with themselves. And they shall make a List of all the Persons voted for, and of the Number of Votes for each; which List they shall sign and certify, and transmit sealed to the Seat of the Government of the United States, directed to the President of the Senate. The President of the Senate shall, in the Presence of the Senate and House of Representatives, open all the Certificates, and the Votes shall then be counted. The Person having the greatest Number of Votes shall be the President, if such Number be a Majority of the whole Number of Electors appointed; and if there be more than one who have such Majority, and have an equal Number of Votes, then the House of Representatives shall immediately chuse by Ballot one of them for President; and if no Person have a Majority, then from the five highest on the List the said House shall in like Manner chuse the President. But in chusing the President, the Votes shall be taken by States, the Representation from each State having one Vote; A quorum for this Purpose shall consist of a Member or Members from two thirds of the States, and a Majority of all the States shall be necessary to a Choice. In every Case, after the Choice of the President, the Person having the greatest Number of Votes of the Electors shall be the Vice President. But if there should remain two or more who have equal Votes, the Senate shall chuse from them by Ballot the Vice President.

The Congress may determine the Time of chusing the Electors, and the Day on which they shall give their Votes; which Day shall be the same throughout the United States.

No Person except a natural born Citizen, or a Citizen of the United States, at the time of the Adoption of this Constitution, shall be eligible to the Office of President; neither shall any Person be eligible to that Office who shall not have attained to the Age of thirty five Years, and been fourteen Years a Resident within the United States.

In Case of the Removal of the President from Office, or of his Death, Resignation, or Inability to discharge the Powers and Duties of the said Office, the Same shall devolve on the Vice President, and the Congress may by Law provide for the Case of Removal, Death, Resignation or Inability, both of the President and Vice President, declaring what Officer shall then act as President, and such Officer shall act accordingly, until the Disability be removed, or a President shall be elected.

The President shall, at stated Times, receive for his Services, a Compensation, which shall neither be encreased nor diminished during the Period for which he shall have been elected, and he shall not receive within that Period any other Emolument from the United States, or any of them.

Before he enter on the Execution of his Office, he shall take the following Oath or Affirmation:—"I do solemnly swear (or affirm) that I will faithfully execute the Office of President of the United States, and will to the best of my Ability, preserve, protect and defend the Constitution of the United States."

Section. 2.
The President shall be Commander in Chief of the Army and Navy of the United States, and of the Militia of the several States, when called into the actual Service of the United States; he may require the Opinion, in writing, of the principal Officer in each of the executive Departments, upon any Subject relating to the Duties of their respective Offices, and he shall have Power to grant Reprieves and Pardons for Offences against the United States, except in Cases of Impeachment.

He shall have Power, by and with the Advice and Consent of the Senate, to make Treaties, provided two thirds of the Senators present concur; and he shall nominate, and by and with the Advice and Consent of the Senate, shall appoint Ambassadors, other public Ministers and Consuls, Judges of the supreme Court, and all other Officers of the United States, whose Appointments are not herein otherwise provided for, and which shall be established by Law: but the Congress may by Law vest the Appointment of such inferior Officers, as they think proper, in the President alone, in the Courts of Law, or in the Heads of Departments.

The President shall have Power to fill up all Vacancies that may happen during the Recess of the Senate, by granting Commissions which shall expire at the End of their next Session.

Section. 3.
He shall from time to time give to the Congress Information of the State of the Union, and recommend to their Consideration such Measures as he shall judge necessary and expedient; he may, on extraordinary Occasions, convene both Houses, or either of them, and in Case of Disagreement between them, with Respect to the Time of Adjournment, he may adjourn them to such Time as he shall think proper; he shall receive Ambassadors and other public Ministers; he shall take Care that the Laws be faithfully executed, and shall Commission all the Officers of the United States.

Section. 4.
The President, Vice President and all civil Officers of the United States, shall be removed from Office on Impeachment for, and Conviction of, Treason, Bribery, or other high Crimes and Misdemeanors.

Article. III.
Section. 1.
The judicial Power of the United States, shall be vested in one supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish. The Judges, both of the supreme and inferior Courts, shall hold their Offices during good Behaviour, and shall, at stated Times, receive for their Services, a Compensation, which shall not be diminished during their Continuance in Office.

Section. 2.
The judicial Power shall extend to all Cases, in Law and Equity, arising under this Constitution, the Laws of the United States, and Treaties made, or which shall be made, under their Authority;—to all Cases affecting Ambassadors, other public Ministers and Consuls;—to all Cases of admiralty and maritime Jurisdiction;—to Controversies to which the United States shall be a Party;—to Controversies between two or more States;— between a State and Citizens of another State,—between Citizens of different States,—between Citizens of the same State claiming Lands under Grants of different States, and between a State, or the Citizens thereof, and foreign States, Citizens or Subjects.

In all Cases affecting Ambassadors, other public Ministers and Consuls, and those in which a State shall be Party, the supreme Court shall have original Jurisdiction. In all the other Cases before mentioned, the supreme Court shall have appellate Jurisdiction, both as to Law and Fact, with such Exceptions, and under such Regulations as the Congress shall make.

The Trial of all Crimes, except in Cases of Impeachment, shall be by Jury; and such Trial shall be held in the State where the said Crimes shall have been committed; but when not committed within any State, the Trial shall be at such Place or Places as the Congress may by Law have directed.

Section. 3.
Treason against the United States, shall consist only in levying War against them, or in adhering to their Enemies, giving them Aid and Comfort. No Person shall be convicted of Treason unless on the Testimony of two Witnesses to the same overt Act, or on Confession in open Court.

The Congress shall have Power to declare the Punishment of Treason, but no Attainder of Treason shall work Corruption of Blood, or Forfeiture except during the Life of the Person attainted.

Article. IV.
Section. 1.
Full Faith and Credit shall be given in each State to the public Acts, Records, and judicial Proceedings of every other State. And the Congress may by general Laws prescribe the Manner in which such Acts, Records and Proceedings shall be proved, and the Effect thereof.

Section. 2.
The Citizens of each State shall be entitled to all Privileges and Immunities of Citizens in the several States.

A Person charged in any State with Treason, Felony, or other Crime, who shall flee from Justice, and be found in another State, shall on Demand of the executive Authority of the State from which he fled, be delivered up, to be removed to the State having Jurisdiction of the Crime.

No Person held to Service or Labour in one State, under the Laws thereof, escaping into another, shall, in Consequence of any Law or Regulation therein, be discharged from such Service or Labour, but shall be delivered up on Claim of the Party to whom such Service or Labour may be due.

Section. 3.
New States may be admitted by the Congress into this Union; but no new State shall be formed or erected within the Jurisdiction of any other State; nor any State be formed by the Junction of two or more States, or Parts of States, without the Consent of the Legislatures of the States concerned as well as of the Congress.

The Congress shall have Power to dispose of and make all needful Rules and Regulations respecting the Territory or other Property belonging to the United States; and nothing in this Constitution shall be so construed as to Prejudice any Claims of the United States, or of any particular State.

Section. 4.
The United States shall guarantee to every State in this Union a Republican Form of Government, and shall protect each of them against Invasion; and on Application of the Legislature, or of the Executive (when the Legislature cannot be convened) against domestic Violence.

Article. V.
The Congress, whenever two thirds of both Houses shall deem it necessary, shall propose Amendments to this Constitution, or, on the Application of the Legislatures of two thirds of the several States, shall call a Convention for proposing Amendments, which, in either Case, shall be valid to all Intents and Purposes, as Part of this Constitution, when ratified by the Legislatures of three fourths of the several States, or by Conventions in three fourths thereof, as the one or the other Mode of Ratification may be proposed by the Congress; Provided that no Amendment which may be made prior to the Year One thousand eight hundred and eight shall in any Manner affect the first and fourth Clauses in the Ninth Section of the first Article; and that no State, without its Consent, shall be deprived of its equal Suffrage in the Senate.

Article. VI.
All Debts contracted and Engagements entered into, before the Adoption of this Constitution, shall be as valid against the United States under this Constitution, as under the Confederation.

This Constitution, and the Laws of the United States which shall be made in Pursuance thereof; and all Treaties made, or which shall be made, under the Authority of the United States, shall be the supreme Law of the Land; and the Judges in every State shall be bound thereby, any Thing in the Constitution or Laws of any State to the Contrary notwithstanding.

The Senators and Representatives before mentioned, and the Members of the several State Legislatures, and all executive and judicial Officers, both of the United States and of the several States, shall be bound by Oath or Affirmation, to support this Constitution; but no religious Test shall ever be required as a Qualification to any Office or public Trust under the United States.

Article. VII.
The Ratification of the Conventions of nine States, shall be sufficient for the Establishment of this Constitution between the States so ratifying the Same.

The Word, "the," being interlined between the seventh and eighth Lines of the first Page, The Word "Thirty" being partly written on an Erazure in the fifteenth Line of the first Page, The Words "is tried" being interlined between the thirty second and thirty third Lines of the first Page and the Word "the" being interlined between the forty third and forty fourth Lines of the second Page.

Attest William Jackson Secretary

done in Convention by the Unanimous Consent of the States present the Seventeenth Day of September in the Year of our Lord one thousand seven hundred and Eighty seven and of the Independance of the United States of America the Twelfth In witness whereof We have hereunto subscribed our Names,

G°. Washington
Presidt and deputy from Virginia

Delaware:

Geo: Read
Gunning Bedford jun
John Dickinson
Richard Bassett
Jaco: Broom

Maryland:

James McHenry
Dan of St Thos. Jenifer
Danl. Carroll

Virginia:

John Blair
James Madison Jr.

North Carolina:

Wm. Blount
Richd. Dobbs Spaight
Hu Williamson

South Carolina:

J. Rutledge
Charles Cotesworth Pinckney
Charles Pinckney
Pierce Butler

Georgia:

William Few
Abr Baldwin

New Hampshire:

John Langdon
Nicholas Gilman

Massachusetts:

Nathaniel Gorham
Rufus King

Connecticut:

Wm. Saml. Johnson
Roger Sherman

New York:

Alexander Hamilton

New Jersey:

Wil: Livingston
David Brearley
Wm. Paterson
Jona: Dayton

Pennsylvania:

B Franklin
Thomas Mifflin
Robt. Morris
Geo. Clymer
Thos. FitzSimons
Jared Ingersoll
James Wilson
Gouv Morris
            `.trim(),
            context: `
Written at the Constitutional Convention in Philadelphia in 1787, the Constitution was designed to correct the weaknesses of the Articles of Confederation while preserving liberty. It establishes three branches of government—Legislative, Executive, and Judicial—with checks and balances so that no single branch can dominate.

It also creates a federal system that divides power between the national government and the states. Over time, amendments have abolished slavery, expanded voting rights, and refined procedures, allowing the Constitution to adapt without losing its core design. Debates about how to interpret the text—strictly, broadly, or somewhere in between—remain at the heart of American political and legal life.
            `.trim(),
          },
          {
            id: "bill-of-rights",
            title: "The Bill of Rights",
            content:
              "The Bill of Rights gathers ten amendments that shield core freedoms from government abuse. These protections include freedom of speech and worship, the right to bear arms, safeguards for people accused of crimes, and a recognition that not all rights can be listed on paper. By writing these guarantees directly into the Constitution, the founders created a constant reminder that government exists to serve and protect the people, not the other way around.",
            fullText: `
Ratified by the states on December 15, 1791

Preamble
Congress of the United States begun and held at the City of New-York, on Wednesday the
fourth of March, one thousand seven hundred and eighty nine.

THE Conventions of a number of the States, having at the time of their adopting the
Constitution, expressed a desire, in order to prevent misconstruction or abuse of its powers,
that further declaratory and restrictive clauses should be added: And as extending the ground
of public confidence in the Government, will best ensure the beneficent ends of its institution.

RESOLVED by the Senate and House of Representatives of the United States of America, in
Congress assembled, two thirds of both Houses concurring, that the following Articles be
proposed to the Legislatures of the several States, as amendments to the Constitution of the
United States, all, or any of which Articles, when ratified by three fourths of the said
Legislatures, to be valid to all intents and purposes, as part of the said Constitution; viz.

ARTICLES in addition to, and Amendment of the Constitution of the United States of America,
proposed by Congress, and ratified by the Legislatures of the several States, pursuant to the
fifth Article of the original Constitution.

Amendment I
Congress shall make no law respecting an establishment of religion, or prohibiting the free
exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people
peaceably to assemble, and to petition the Government for a redress of grievances.

Amendment II
A well regulated Militia, being necessary to the security of a free State, the right of the people
to keep and bear Arms, shall not be infringed.

Amendment III
No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner,
nor in time of war, but in a manner to be prescribed by law.

Amendment IV
The right of the people to be secure in their persons, houses, papers, and effects, against
unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but
upon probable cause, supported by Oath or affirmation, and particularly describing the place to
be searched, and the persons or things to be seized.

Amendment V
No person shall be held to answer for a capital, or otherwise infamous crime, unless on a
presentment or indictment of a Grand Jury, except in cases arising in the land or naval forces, or
in the Militia, when in actual service in time of War or public danger; nor shall any person be
subject for the same offence to be twice put in jeopardy of life or limb; nor shall be compelled
in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property,
without due process of law; nor shall private property be taken for public use, without just
compensation.

Amendment VI
In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an
impartial jury of the State and district wherein the crime shall have been committed, which
district shall have been previously ascertained by law, and to be informed of the nature and
cause of the accusation; to be confronted with the witnesses against him; to have compulsory
process for obtaining witnesses in his favor, and to have the Assistance of Counsel for his
defence.

Amendment VII
In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of
trial by jury shall be preserved, and no fact tried by a jury, shall be otherwise re-examined in
any Court of the United States, than according to the rules of the common law.

Amendment VIII
Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual
punishments inflicted.

Amendment IX
The enumeration in the Constitution, of certain rights, shall not be construed to deny or
disparage others retained by the people.

Amendment X
The powers not delegated to the United States by the Constitution, nor prohibited by it to the
States, are reserved to the States respectively, or to the people.
            `.trim(),
            context: `
The Bill of Rights was added to the Constitution in 1791 after several states demanded explicit protections for individual liberties as a condition of ratifying the new framework. These first ten amendments protect freedoms of speech, religion, press, assembly, and petition; safeguard the right to keep and bear arms; and establish protections against unreasonable searches, cruel and unusual punishments, and self-incrimination, among others.

The Bill of Rights has shaped American law and daily life for more than two centuries. Through the Fourteenth Amendment, most of these protections now apply to state and local governments as well, making the Bill of Rights central to debates about liberty, security, and the proper limits of government power.
            `.trim(),
          },
          {
            id: "federalist-papers",
            title: "The Federalist Papers",
            content:
              "The Federalist Papers are a collection of essays written to explain and defend the proposed Constitution. Hamilton, Madison, and Jay addressed worried citizens directly, answering questions about factions, checks and balances, and the role of a strong central government. These essays are more than campaign pieces; they offer a window into how the framers thought about human nature, power, and the safeguards liberty requires.",
            fullText: `
Because the Federalist Papers span dozens of essays, it would be far too much content for this wee little app. Instead, click here to visit the Library of Congress website to read the full text:

https://guides.loc.gov/federalist-papers/full-text
            `.trim(),
            context: `
Published in New York newspapers between 1787 and 1788 under the shared pen name “Publius,” the Federalist Papers were written by Alexander Hamilton, James Madison, and John Jay to persuade skeptical citizens to ratify the Constitution.

Federalist No. 10 explains how a large republic can control the dangers of factions. Federalist No. 51 lays out the logic of checks and balances and separation of powers. Federalist No. 78 defends an independent judiciary with the power of judicial review. Taken together, these essays offer an unmatched look at how the Constitution’s supporters understood human nature, political conflict, and the safeguards needed to keep liberty secure.
            `.trim(),
          },
        ],
      },
    {
        id: "citizenship",
        title: "Citizenship",
        description: "The responsibilities and privileges of citizenship",
        subsections: [
          {
            id: "civic-responsibility",
            title: "Civic Responsibility",
            content:
              "Civic responsibility refers to the duties citizens share in preserving a healthy republic. These responsibilities include voting, staying informed, obeying the law, paying taxes, and serving on juries when called. While citizens enjoy many freedoms, those freedoms are strengthened when people participate in the systems that protect them.\n\nA strong civic culture requires more than occasional involvement. It calls for a willingness to discuss issues respectfully, support community institutions, and hold leaders accountable with clarity and fairness. When citizens engage honestly with one another and with their government, they create a public environment where solutions emerge from cooperation rather than division.\n\nCivic responsibility also includes supporting the common good. This can mean volunteering, helping neighbors, participating in local events, or contributing to organizations that serve the community. Small acts of service build trust and reinforce the idea that a republic is a shared endeavor rather than a collection of isolated individuals.\n\nWhen citizens embrace their civic duties with intention, they strengthen the foundation of self government. A republic thrives when people recognize that their rights and responsibilities are connected and that each generation plays a role in preserving freedom.",
          },
          {
            id: "naturalization",
            title: "Naturalization",
            content:
              "Naturalization is the process through which immigrants become full citizens of the United States. The journey involves meeting residency requirements, demonstrating knowledge of English, and passing a test on American history, government, and civic values. This process reflects the belief that citizenship carries both privileges and responsibilities that must be understood before joining the civic family.\n\nThose who pursue naturalization often bring rich cultural backgrounds, personal stories, and unique perspectives that deepen the American experience. By choosing citizenship, they affirm the ideals of liberty and opportunity that have shaped the nation since its founding. This voluntary commitment strengthens the country by uniting people from diverse origins under shared principles.\n\nThe naturalization ceremony, where new citizens take the Oath of Allegiance, is a meaningful moment. It symbolizes a choice to uphold the Constitution, support the laws of the nation, and participate fully in civic life. Many who take the oath describe it as a milestone that confirms their place in the story of America.\n\nNaturalization reminds the nation that citizenship is not merely a status but a dedication. It affirms that America continues to grow through the contributions of those who embrace its ideals with intention and hope.",
          },
          {
            id: "rights-responsibilities",
            title: "Rights and Responsibilities",
            content:
              "Citizenship in the United States includes both the rights protected by the Constitution and the responsibilities necessary to maintain a free society. Rights such as speech, religion, assembly, and due process give people the space to live authentically and to shape their own paths. These freedoms reflect the belief that each person possesses inherent dignity that government must respect.\n\nYet rights exist alongside duties. Citizens must follow the law, pay taxes, serve on juries, and contribute to the safety and stability of their communities. These responsibilities ensure that the nation remains orderly, fair, and capable of protecting liberty for everyone. When citizens fulfill these duties, they help preserve the very structure that guarantees their rights.\n\nUnderstanding the balance between rights and responsibilities is essential for civic maturity. People cannot claim the benefits of freedom while ignoring the effort required to sustain it. True citizenship recognizes that liberty is a shared inheritance that must be guarded with care.\n\nA republic flourishes when citizens value both their freedoms and their role in safeguarding those freedoms. Through responsible engagement, each person becomes a steward of the nation's principles.",
          },
        ],
      },
      {
        id: "media-literacy",
        title: "Media Literacy",
        description: "Understanding how to evaluate news and information",
        subsections: [
          {
            id: "identifying-bias",
            title: "Identifying Bias",
            content:
              "Identifying bias is an essential skill for navigating modern information. Every source has a perspective shaped by its values, priorities, and assumptions. Bias does not always mean dishonesty, but it does influence how facts are selected, framed, or emphasized. Recognizing these patterns helps citizens form clearer judgments.\n\nBias can appear in subtle ways such as the choice of headlines, the placement of certain facts, or the tone used to describe events. It can also emerge through omission, when important context is left out. By comparing multiple sources, readers can see where stories align and where they diverge. Differences often highlight the underlying assumptions behind each source.\n\nLearning to identify bias protects citizens from being swept up in emotional narratives or one sided interpretations. It encourages critical thinking and helps people distinguish between reporting, commentary, and opinion. This awareness allows readers to evaluate information based on substance rather than presentation.\n\nThe goal is not to avoid all biased material, which is impossible, but to engage with information thoughtfully. When citizens approach media with discernment, they build a stronger understanding of events and a greater resistance to manipulation.",
          },
          {
            id: "fact-checking",
            title: "Fact Checking",
            content:
              "Fact checking is the practice of verifying whether claims, statistics, and statements reflect reality. In an age when information spreads rapidly, fact checking provides a vital safeguard against misunderstandings and misinformation. By confirming the accuracy of a claim, citizens ensure that their opinions rest on solid ground.\n\nEffective fact checking compares statements against reliable sources, including official documents, reputable research, and direct evidence. It also examines the context in which a claim is made, since information can be technically true but presented in a misleading way. Clear, honest evaluation helps reveal what the full story actually shows.\n\nFact checking also encourages humility in public conversation. It reminds people that strong opinions require strong foundations and that correcting errors is a sign of integrity rather than weakness. When citizens value accuracy over winning an argument, the quality of national dialogue improves.\n\nBy practicing regular fact checking, individuals strengthen their own understanding and contribute to a more informed society. Truth becomes easier to find when people insist on clarity, evidence, and honesty.",
          },
          {
            id: "evaluating-sources",
            title: "Evaluating Sources",
            content:
              "Evaluating sources means determining whether information comes from a trustworthy and well supported origin. Not all sources are created equal, and the reliability of a claim often depends on the credibility of the person or organization behind it. Understanding who produced the information, why it was created, and how it was verified is essential for forming solid conclusions.\n\nStrong sources are transparent about their methods, provide evidence for their claims, and distinguish clearly between fact and opinion. They update corrections when errors arise and avoid sensationalism or exaggeration. Weak sources may rely on rumors, emotional appeals, or vague assertions without supporting details.\n\nKnowing how to evaluate sources empowers citizens to sift through the overwhelming amount of material available today. Instead of accepting everything as equally valid, people can focus on information that is accurate, balanced, and grounded in verifiable evidence.\n\nSource evaluation not only strengthens individual judgment but also supports healthier public conversation. A society that values truth over convenience is better equipped to navigate challenges with clarity and purpose.",
          },
        ],
      },
{
  id: "national-symbols",
  title: "National Symbols",
  description: "Important symbols that reflect American identity",
  subsections: [
    {
      id: "flag",
      title: "United States Flag",
      imageUrl: "1b18cc72-3bbe-43bf-afae-225d1e78ad1d.png",
      content:
        "The flag of the United States symbolizes the shared history, sacrifice, and ideals that have shaped the nation. Each star represents a state, and each stripe represents one of the original thirteen colonies that declared independence. The colors red, white, and blue carry their own meaning, representing valor, purity, and justice. Over time the flag has become a powerful emblem of unity in moments of both triumph and struggle.\n\nThe flag has flown in distant battles, across oceans, and above places where Americans have worked, served, and sacrificed. It has been raised in celebration and lowered in mourning. In every setting it reminds citizens of the long chain of generations who protected freedom and carried the nation forward.\n\nRespect for the flag is not simply about ceremony. It reflects gratitude for the liberties that define American life. The traditions surrounding the flag encourage people to remember the principles that bind the nation together, even when opinions differ sharply.\n\nWhen citizens honor the flag, they honor the shared story of a country built on ideals rather than ancestry. The flag calls the nation to live in a way that is worthy of the sacrifices that shaped it.",
    },
    {
      id: "eagle",
      title: "Bald Eagle",
      imageUrl: "806a55b5-d460-4b36-9895-d6b2a5d5e181.png",
      content:
        "The bald eagle has been the national bird of the United States since 1782 and represents strength, freedom, and resilience. Its broad wings, sharp vision, and commanding presence made it a natural symbol for a nation determined to rise above hardship and protect its independence. The eagle appears on official seals, military insignia, currency, and government emblems, reminding Americans of the endurance required to preserve liberty.\n\nThe bird's association with high places and open skies reflects the spirit of aspiration that runs through American culture. It suggests a people who value courage, possibility, and the will to soar beyond limitations. Many early Americans admired the eagle's fierce independence and believed it embodied the character of a new republic.\n\nThe bald eagle also represents renewal. Once endangered, it recovered through conservation efforts and now thrives across much of the country. Its comeback mirrors the nation's belief that what is damaged can be restored and what is threatened can be protected through collective effort.\n\nAs a national symbol, the eagle reminds citizens that freedom requires strength and vigilance. Its enduring presence calls each generation to safeguard the ideals that give the nation its character.",
    },
    {
      id: "great-seal",
      title: "Great Seal of the United States",
      imageUrl: "59caabeb-9945-4ef8-828e-e82c1be074f2.png",
      content:
        "The Great Seal of the United States is the official emblem used to authenticate important national documents and to represent the authority of the federal government. On the front of the seal, a bald eagle holds an olive branch in one talon and arrows in the other, symbolizing the nation's desire for peace and its readiness to defend itself when necessary. Across the eagle's chest is a shield with thirteen stripes, representing the original states joined together under a common purpose.\n\nAbove the eagle appears a cluster of thirteen stars, forming a new constellation. This reflects the belief that the United States was something new among the nations of the world, guided by providence and built on principles rather than royalty or bloodlines. In the eagle's beak is a banner bearing the motto \"E Pluribus Unum,\" meaning \"Out of many, one\"—a reminder that a diverse people can unite under shared ideals.\n\nThe reverse side of the Great Seal, used less often but rich in symbolism, shows an unfinished pyramid with an eye above it. The unfinished structure suggests that the work of building a just and stable republic is ongoing, while the eye reflects the founders' belief that a higher power watches over human efforts.\n\nTogether, the elements of the Great Seal call Americans to balance strength with restraint, power with principle, and national interest with a sense of responsibility before God and history.",
    },
    {
      id: "liberty-bell",
      title: "Liberty Bell",
      imageUrl: "2e3ae459-a1fd-4386-8e95-6206596542ac1.png",
      content:
        "The Liberty Bell is one of the most enduring symbols of American independence and the desire for freedom. Cast in the eighteenth century and located in Philadelphia, the bell is famous for its distinctive crack and the inscription proclaiming liberty throughout all the land. It has become a powerful reminder of the nation's commitment to justice, equality, and self determination.\n\nOriginally used to call lawmakers to session, the bell later became associated with abolitionists who saw its inscription as a declaration that all people deserve freedom. Over time it evolved into a national icon visited by millions who seek to connect with the legacy of the founding era.\n\nThe crack in the Liberty Bell adds to its symbolic power. Instead of being hidden or repaired, it stands visible as a reminder that freedom itself carries scars. The imperfections tell a story of struggle, endurance, and the ongoing effort to improve the nation.\n\nToday the Liberty Bell continues to inspire reflection on the work still required to fulfill the promise of liberty. It calls citizens to remember that freedom must be both celebrated and defended.",
    },
    {
      id: "statue-of-liberty",
      title: "Statue of Liberty",
      imageUrl: "693ab1a5-b598-478a-b111-3556ab568104.png",
      content:
        "The Statue of Liberty stands in New York Harbor as a powerful symbol of freedom, welcome, and hope. A gift from France dedicated in 1886, the statue depicts a robed figure holding a torch high in her right hand and a tablet in her left marked with the date of American independence. At her feet lie broken chains, representing the end of tyranny and the promise of a new beginning.\n\nFor millions of immigrants arriving by sea, the first sight of the statue signaled that they had reached a land where effort, faith, and responsibility could open the door to a different life. The torch is more than a piece of metal and flame. It represents light breaking into darkness—the idea that liberty can guide people through uncertainty and struggle.\n\nThe Statue of Liberty also calls attention to duty. It does not only celebrate what America has achieved; it challenges each generation to live in a way that matches the promise it symbolizes. The statue asks the nation to remember that freedom is not merely permission to do as one pleases, but the opportunity to build, protect, and serve.\n\nAs a national symbol, the Statue of Liberty joins history with hope. It reminds citizens that the story of America is still being written and that the flame of liberty must be carried forward with courage and gratitude.",
    },
  ],
},
{
  id: "national-hymns",
        title: "National Hymns",
        description: "The songs that express national values and identity",
        subsections: [
          {
            id: "anthem",
            title: "National Anthem",
            content:
              "The Star Spangled Banner is the national anthem of the United States and reflects the courage and perseverance that marked the nation's early history. Written during the War of 1812 by Francis Scott Key, the lyrics describe the sight of the American flag still flying over Fort McHenry after a long night of bombardment. The survival of the flag symbolized hope, endurance, and the belief that the young nation would stand.\n\nThe anthem captures not only a moment of military conflict but a deeper sense of gratitude for the freedoms protected by that struggle. The image of the flag lit by the dawn speaks to the idea that liberty endures through hardship. Each verse, though less commonly sung, continues this theme by celebrating courage, trust in God, and the desire for peace.\n\nSinging the anthem has become a shared tradition at public events, athletic competitions, and civic gatherings. The act of standing together, even among people with differing viewpoints, affirms the idea that a nation can remain united through respect for its principles.\n\nThe anthem invites reflection on the sacrifices made to preserve freedom. It reminds citizens that the story of the United States includes both conflict and resilience and that unity grows from remembering the values worth defending.",
          },
          {
            id: "america-beautiful",
            title: "America the Beautiful",
            content:
              "America the Beautiful is a hymn that celebrates the natural beauty, generosity, and aspirational spirit of the United States. Written by Katharine Lee Bates in the nineteenth century, the song reflects her awe at the landscapes she encountered during her travels, from spacious skies to majestic mountains. These images became powerful symbols of the nation's vastness and promise.\n\nThe hymn also highlights moral qualities such as brotherhood, grace, and the pursuit of righteousness. It calls for a nation that balances prosperity with kindness, strength with humility, and freedom with self control. The repeated prayer for God to shed His grace on the country reflects a desire for both protection and refinement.\n\nAmerica the Beautiful has earned a place in the American songbook alongside the national anthem because it captures a different but equally important dimension of national identity. While the anthem speaks to conflict and resolve, this hymn speaks to hope, renewal, and shared purpose.\n\nIts lyrics encourage reflection on the ideals that guide the nation forward. The hymn reminds citizens that the beauty of the land is matched by the beauty of the values they strive to uphold.",
          },
          {
            id: "god-bless-america",
            title: "God Bless America",
            content:
              "God Bless America is a patriotic song written by Irving Berlin that expresses gratitude for the nation and a prayer for its protection. First introduced during times of rising global tension, the song quickly became a source of comfort and unity. Its simple plea for God to watch over the country reflects a belief that the nation's strength rests not only in its institutions but also in its spiritual foundations.\n\nThe song has been performed at public gatherings, sporting events, and moments of national remembrance. Its message resonates across generations because it blends patriotism with humility. Rather than boasting, the lyrics ask for guidance and peace, acknowledging that the nation's future depends on wisdom as much as power.\n\nGod Bless America highlights the importance of gratitude, especially during difficult times. The act of singing it together creates a sense of shared purpose and mutual support. It reminds citizens that they belong to a larger story and that they bear responsibility for the country they inherit.\n\nThe enduring appeal of the song reflects the deep connection many Americans feel between faith and national life. It serves as a reminder that blessings are not guaranteed and that unity grows when people seek the good of the whole nation.",
          },
        ],
      },
      {
        id: "american-experiment",
        title: "The American Experiment",
        description: "The ideals and challenges of building a free society",
        subsections: [
          {
            id: "self-government",
            title: "Self Government",
            content:
              "Self government is the principle that people have the authority to shape their own political future. Rather than being ruled by kings or distant elites, Americans believe in a system where citizens elect leaders, influence laws, and participate directly in the life of the nation. This idea is the backbone of the republic and the foundation of American political culture.\n\nSelf government requires both freedom and responsibility. Citizens must have the liberty to speak, vote, organize, and advocate for their beliefs. They must also carry the responsibility of staying informed, respecting the rights of others, and working toward the common good. When these elements come together, the nation becomes stronger, more stable, and more just.\n\nThe principle of self government has inspired movements for greater rights and representation throughout American history. People have fought to expand access to the political process and to correct the gaps between national ideals and reality. Each step forward has strengthened the belief that citizens can refine their government and improve the nation.\n\nSelf government reminds Americans that freedom is not a gift handed down from leaders. It is a practice carried out by the people themselves. A republic lives or dies on the willingness of its citizens to uphold this responsibility.",
          },
          {
            id: "american-identity",
            title: "American Identity",
            content:
              "American identity is not based on ancestry, ethnicity, or lineage. It rests on shared ideals such as liberty, equality under the law, and the belief that individuals can shape their own destiny. These principles have drawn people from around the world, creating a nation defined by a commitment to freedom rather than by a single culture or background.\n\nThis identity has evolved through triumphs and challenges. Different waves of immigrants, regional cultures, and historic struggles have shaped the national character. From frontier resilience to industrial growth to the fight for civil rights, each era has added its own chapter to the American story. The nation continues to adapt while holding fast to its foundational principles.\n\nAmerican identity also reflects the value of civic participation. People contribute to the nation not only through work and family life but also by engaging in public affairs. Citizenship is active, not passive, and the national character grows stronger when people take responsibility for their communities and institutions.\n\nTo embrace American identity is to believe that the nation remains a work in progress. It is an invitation to build, refine, and continue the story of a country rooted in principles rather than bloodlines.",
          },
          {
            id: "unity-diversity",
            title: "Unity and Diversity",
            content:
              "Unity and diversity are twin pillars of the American experience. The nation includes people of many cultures, beliefs, and backgrounds, yet it seeks to unite them through shared principles rather than uniformity. The goal is not to erase differences but to create a society where varied perspectives can coexist and enrich national life.\n\nThis balance is not always easy. Differences can lead to misunderstanding or disagreement, especially during times of stress. Yet history shows that the nation is strongest when it chooses cooperation over conflict. Shared values such as fairness, opportunity, and respect for the rights of others create common ground that allows diversity to thrive without eroding unity.\n\nDiversity brings unique ideas, traditions, and strengths that enlarge the national imagination. Communities grow more resilient when they draw from multiple experiences and viewpoints. Unity provides the structure that helps these differences find purpose and harmony.\n\nThe American project is built on the idea that people can disagree sincerely while still recognizing one another as fellow citizens. This commitment to unity in the midst of diversity is one of the nation's greatest achievements and an ideal worth protecting.",
          },
        ],
      },
      {
        id: "to-be-american",
        title: "To Be an American",
        description: "A reflection on what it means to belong to this nation",
        subsections: [
          {
            id: "identity",
            title: "Identity",
            content:
              "To be an American is to belong to a nation formed not by ancestry but by shared conviction. It means believing in the dignity of the individual and the worth of freedom. It means trusting that people from different backgrounds can come together under principles that rise above personal history. American identity is a commitment to a way of life rooted in opportunity, responsibility, and respect for the rights of others.\n\nBeing American means carrying forward the legacy of those who came before. Soldiers who defended the nation, citizens who fought for greater justice, families who built communities, and leaders who shaped the republic all contribute to this inheritance. Their sacrifices remind us that freedom is costly and that each generation must protect what it has received.\n\nAmerican identity is also defined by optimism. Even in moments of division or uncertainty, Americans believe that tomorrow can be better than today. The nation renews itself when people work with courage, humility, and determination to strengthen their communities and institutions.\n\nIn the end, to be an American is to recognize that the nation is a living promise. It calls each person to uphold the principles that sustain freedom and to contribute to a shared future shaped by hope rather than despair.",
        },
      ],
    },
  ],
};
