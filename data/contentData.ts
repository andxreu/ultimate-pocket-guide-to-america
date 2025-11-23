export interface SubSection {
  id: string;
  title: string;

  // Short overview / summary text (what you already have)
  content: string;

  // Full original document text (optional, only for founding docs)
  fullText?: string;

  // Historical background and commentary (optional)
  context?: string;

  // Optional image representing this subsection (e.g., scan of the document)
  imageUrl?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  subsections: SubSection[];
}

export interface MainSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  sections: Section[];
}

export const contentData: MainSection[] = [
  {
    id: "foundations",
    title: "Foundations",
    icon: "book",
    description: "Core principles and ideologies that shape American democracy",
    sections: [
      {
        id: "principles-ideologies",
        title: "Principles and Ideologies",
        description: "The fundamental beliefs that guide American governance",
        subsections: [
          {
            id: "democracy",
            title: "Democracy",
            content:
              "Democracy is a system of government where power ultimately rests with the people. In the United States this happens through elections, public debate, and the ability of citizens to organize and be heard. When people vote, contact their representatives, or speak out on issues, they are exercising democratic power in everyday life. A healthy democracy relies on informed citizens, peaceful transfers of power, and a shared respect for the rules of the game even when we disagree.",
          },
          {
            id: "republicanism",
            title: "Republicanism",
            content:
              "Republicanism emphasizes representative government, where citizens choose leaders who are expected to serve the public good. Instead of everyone voting on every law, people select representatives who have the time and responsibility to study issues in depth. This system blends the will of the people with stability and long term thinking. At its best, republicanism protects minority rights, prevents hasty decisions, and encourages leaders to act as stewards rather than rulers.",
          },
          {
            id: "federalism",
            title: "Federalism",
            content:
              "Federalism divides power between the national government and the states. Some responsibilities, such as national defense and foreign policy, belong to the federal level, while others, like education or local policing, are largely handled by states and communities. This arrangement allows different regions to reflect their own character and priorities while still belonging to a single united nation. Federalism also creates multiple layers of protection for individual rights, since power is never concentrated in just one place.",
          },
        ],
      },
      {
        id: "human-rights",
        title: "Human Rights and Freedoms",
        description: "The inalienable rights guaranteed to all Americans",
        subsections: [
          {
            id: "life-liberty",
            title: "Life, Liberty, and the Pursuit of Happiness",
            content:
              "The promise of life, liberty, and the pursuit of happiness stands at the center of the American story. These rights affirm that every person has a basic claim to safety, personal freedom, and the chance to build a meaningful life. They do not guarantee a particular outcome but they do protect the space in which people can work, worship, create, and dream. When Americans argue about laws and policies, they are often asking whether those choices honor or weaken this original promise.",
          },
          {
            id: "freedom-speech",
            title: "Freedom of Speech",
            content:
              "Freedom of speech protects the right to share ideas, beliefs, and criticism without fear of government punishment. This includes unpopular or controversial opinions, political arguments, and peaceful protest. The Supreme Court has held that this freedom is strongest in matters of public concern, especially when citizens are evaluating their leaders. While there are narrow limits, such as direct incitement to violence, the overall direction of American law has been to give speech wide protection so that truth can emerge from open debate.",
          },
          {
            id: "freedom-religion",
            title: "Freedom of Religion",
            content:
              "Freedom of religion means the government may neither force a particular faith on people nor interfere with sincere religious practice. Americans are free to attend worship services, observe holy days, wear religious symbols, or choose to embrace no religion at all. This protection is paired with a ban on establishing an official national church. The result is a landscape where many traditions live side by side, and where people are encouraged to follow their conscience while respecting the equal rights of their neighbors.",
          },
        ],
      },
      {
        id: "government-systems",
        title: "Government and Systems",
        description: "How American government is structured and operates",
        subsections: [
          {
            id: "separation-powers",
            title: "Separation of Powers",
            content:
              "Separation of powers means that lawmaking, law enforcement, and legal interpretation are divided among three distinct branches. Congress writes the laws, the President carries them out, and the federal courts explain what they mean in particular cases. Each branch has its own tools, duties, and limits. By preventing any single institution from holding all authority, the founders hoped to guard against tyranny and encourage the branches to cooperate, argue, and correct one another.",
          },
          {
            id: "checks-balances",
            title: "Checks and Balances",
            content:
              "Checks and balances are the practical ways that the three branches of government keep each other from overreaching. The President can veto bills, but Congress can override that veto. Courts can strike down unconstitutional laws, but judges must be nominated by the President and confirmed by the Senate. These overlapping powers can be frustrating in times of sharp disagreement, yet they are designed to slow down drastic change and force conversation before decisions become final.",
          },
          {
            id: "rule-of-law",
            title: "Rule of Law",
            content:
              "The rule of law is the idea that laws, not individuals, ultimately govern the country. Presidents, members of Congress, judges, and ordinary citizens are all subject to the same basic rules. When the rule of law is strong, people can plan their lives with confidence that contracts, court orders, and rights will be honored. When it is weak, power can slip into the hands of those willing to ignore the rules. Protecting the rule of law is one of the most important responsibilities of any free society.",
          },
        ],
      },
    ],
  },

{
    id: "civic-literacy",
    title: "Civic Literacy",
    icon: "school",
    description:
      "Understanding American government, founding documents, and civic responsibility",
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
              "The Legislative Branch is the lawmaking engine of the federal government. Through the Senate and the House of Representatives, citizens from every state send voices to Congress to debate national problems and craft solutions. Members hold hearings, draft bills, negotiate compromises, and must answer to voters on a regular schedule. Beyond writing laws, Congress controls federal spending, declares war, and has the power to investigate and check the other branches when necessary. The decisions made in Congress shape everyday life in direct ways, including how much people pay in taxes, what support is available for veterans and families, how schools and highways are funded, and what rules businesses must follow. When citizens watch the news about a new law or a budget battle, they are seeing the Legislative Branch at work.",
          },
          {
            id: "executive",
            title: "Executive Branch",
            content:
              "The Executive Branch is responsible for carrying out and enforcing the laws that Congress passes. The President leads the branch, but millions of civilian and military employees help implement policies on everything from transportation to national security. Agencies write regulations, oversee programs, and deliver services that affect daily life. The President also sets priorities through speeches, executive actions, and budget proposals, and appoints leaders to run major departments and agencies. Their choices influence how strictly laws are enforced, what information the public receives, and how the country responds to crises at home and abroad. From airport security rules and disaster relief to student loan policies and environmental protections, the actions of the Executive Branch reach into the daily experiences of most Americans. Because this branch is large and powerful, the Constitution requires the President to take an oath to preserve, protect, and defend the Constitution itself.",
          },
          {
            id: "judicial",
            title: "Judicial Branch",
            content:
              "The Judicial Branch interprets the meaning of laws and decides how the Constitution applies in real disputes. At the top sits the Supreme Court, supported by lower federal courts spread across the country. Judges do not make policy in the same way legislators do, but their rulings can shape how rights are understood and how far government power reaches. Life tenure for federal judges is intended to shield them from political pressure so they can decide cases fairly and according to law. Court decisions influence questions such as what police may do during an arrest, how elections are run, what counts as protected speech, and how far religious freedom extends in public life. Many of these rulings set long lasting precedents that apply to every person and community in the nation, meaning that a case brought by a single individual can quietly change the rules for millions of Americans.",
          },
        ],
      },

      //
      // 🔹 FOUNDING DOCUMENTS SECTION – UPDATED
      //
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
              "The Constitution is the blueprint for the American system of government. It begins with the words “We the People,” signaling that authority comes from citizens rather than from a monarch. The document lays out the powers of each branch, the relationship between the national government and the states, and the process for making changes through amendments. Its endurance over centuries comes from a combination of clear structure and flexibility for future generations.",
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

      //
      // 🔹 Rest of your Civic Literacy sections unchanged
      //
      {
        id: "citizenship",
        title: "Citizenship and Civic Duty",
        description: "The rights and responsibilities of American citizens",
        subsections: [
          {
            id: "voting",
            title: "Voting Rights and Responsibilities",
            content:
              "Voting is one of the clearest ways citizens shape their government. Ballots decide who will write laws, enforce them, and appoint judges who interpret them. With that power comes responsibility: to learn about candidates and issues, to understand how different offices affect daily life, and to respect the results even when our preferred side loses. Strong voter participation sends a message that people are paying attention and that leaders are accountable.",
          },
          {
            id: "jury-duty",
            title: "Jury Duty",
            content:
              "Jury duty asks ordinary citizens to help decide questions of guilt, innocence, and legal responsibility. This shared service keeps the justice system from being controlled by a small circle of officials. Jurors bring common sense, community values, and diverse experiences into the courtroom. While serving can be inconvenient, it is one of the most direct opportunities citizens have to protect fair trials and ensure that the law is applied impartially.",
          },
          {
            id: "civic-participation",
            title: "Civic Participation",
            content:
              "Civic participation goes far beyond Election Day. It includes volunteering, attending local meetings, speaking with representatives, joining community groups, and working with neighbors to solve local problems. When citizens stay engaged between elections, they help keep public institutions responsive and grounded in real needs. A culture of civic participation turns democracy from a distant system into a shared project.",
          },
        ],
      },
      {
        id: "media-literacy",
        title: "Media and Information Literacy",
        description: "Understanding and evaluating information sources",
        subsections: [
          {
            id: "critical-thinking",
            title: "Critical Thinking",
            content:
              "Critical thinking is the habit of slowing down, asking questions, and testing claims before accepting them as true. It means looking for evidence, considering alternative explanations, and recognizing when emotions are being used to cloud judgment. In a world filled with headlines, posts, and notifications, critical thinking gives citizens a filter so they are less likely to be misled and more likely to reach thoughtful conclusions.",
          },
          {
            id: "news-sources",
            title: "Evaluating News Sources",
            content:
              "Evaluating news sources involves paying attention to where information comes from, how it is presented, and whether it can be confirmed by other outlets. Credible sources identify their writers, explain their methods, and correct mistakes when they occur. Learning to spot clickbait, misleading images, or one sided stories helps citizens stay grounded in reality instead of rumor. Good information is the fuel of a healthy democracy.",
          },
          {
            id: "digital-citizenship",
            title: "Digital Citizenship",
            content:
              "Digital citizenship describes how we behave and communicate in online spaces. It includes protecting personal privacy, treating others with respect, and taking responsibility for what we choose to share. Algorithms can shape what we see, but individuals still decide what they amplify. Practicing wise digital citizenship means using technology in ways that build trust, spread accurate information, and strengthen rather than weaken community life.",
          },
        ],
      },
{
        id: "symbols",
        title: "American Symbols and Their Meaning",
        description: "The symbols that represent American values and history",
        subsections: [
          {
            id: "flag",
            title: "The American Flag",
            content:
              "The American flag, often called the Stars and Stripes, has changed as the nation has grown but has always stood for unity and shared purpose. Each added star marks the admission of a new state, while the thirteen stripes recall the original colonies that declared independence. People display the flag at homes, schools, and public events to honor service, sacrifice, and the hope that the country can keep moving closer to its ideals.",
            imageUrl:
              "https://i0.wp.com/thehumanconservative.com/wp-content/uploads/2025/10/image.png?w=1024&ssl=1",
          },
          {
            id: "eagle",
            title: "The Bald Eagle",
            content:
              "The bald eagle was chosen as the national bird for its strength, long life, and striking appearance. It appears on the Great Seal of the United States clutching arrows and an olive branch, representing readiness for defense and the desire for peace. Seeing the eagle on government buildings, documents, and currency is a reminder that the nation aims to stand firm, free, and self governing.",
            imageUrl:
              "https://i0.wp.com/thehumanconservative.com/wp-content/uploads/2025/10/image-1.png?w=1024&ssl=1",
          },
          {
            id: "liberty-bell",
            title: "The Liberty Bell",
            content:
              "The Liberty Bell, with its famous crack, has become a symbol of freedom that rings far beyond its original use. Once a working bell in Philadelphia, it later came to represent the struggle for independence and, later still, movements to expand liberty to all Americans. Its inscription about proclaiming liberty throughout the land has made it an enduring image for those who seek to live up to the promises of the founding.",
            imageUrl:
              "https://i0.wp.com/thehumanconservative.com/wp-content/uploads/2025/10/image-3.png?resize=300%2C300&ssl=1",
          },
          {
            id: "statue-of-liberty",
            title: "The Statue of Liberty",
            content:
              "The Statue of Liberty stands in New York Harbor as a welcome to those arriving by sea and as a reminder of the nation’s ideals. A gift from France, it represents liberty enlightening the world, with a torch held high and a broken chain at her feet. For many immigrants, the first glimpse of the statue became a symbol of hope, new beginnings, and the promise of freedom under law.",
            imageUrl:
              "https://i0.wp.com/thehumanconservative.com/wp-content/uploads/2025/10/image-4.png?resize=300%2C300&ssl=1",
          },
          {
            id: "great-seal",
            title: "The Great Seal of the United States",
            content:
              "The Great Seal of the United States appears on official documents, passports, and currency as a formal emblem of national authority. Its imagery includes the bald eagle holding arrows and an olive branch, a shield representing the states joined together, and the motto E Pluribus Unum, meaning out of many, one. The seal captures the idea of a republic that seeks both strength and peace while uniting many states into a single nation.",
            imageUrl:
              "https://i0.wp.com/thehumanconservative.com/wp-content/uploads/2025/10/image-2.png?resize=300%2C300&ssl=1",
          },
        ],
      },
{
  id: "hymns",
  title: "American Hymns and Heritage",
  description: "Songs and traditions that celebrate American identity",
  subsections: [
    {
      id: "national-anthem",
      title: "The Star-Spangled Banner",
      content:
        "The Star Spangled Banner grew out of a moment when the outcome of a battle and the future of a young nation were uncertain. Watching the American flag still flying over Fort McHenry after a night of bombardment, Francis Scott Key wrote words that captured relief, gratitude, and defiance. Today the anthem is sung at public events as a way to remember the cost of defending the country and to honor those who continue that work.",
      fullText: `
O say can you see, by the dawn’s early light,
What so proudly we hailed at the twilight’s last gleaming,
Whose broad stripes and bright stars through the perilous fight,
O’er the ramparts we watched, were so gallantly streaming?
And the rockets’ red glare, the bombs bursting in air,
Gave proof through the night that our flag was still there;
O say does that star-spangled banner yet wave
O’er the land of the free and the home of the brave?

On the shore dimly seen through the mists of the deep,
Where the foe’s haughty host in dread silence reposes,
What is that which the breeze, o’er the towering steep,
As it fitfully blows, half conceals, half discloses?
Now it catches the gleam of the morning’s first beam,
In full glory reflected now shines in the stream:
’Tis the star-spangled banner, O long may it wave
O’er the land of the free and the home of the brave.

And where is that band who so vauntingly swore
That the havoc of war and the battle’s confusion,
A home and a country should leave us no more?
Their blood has washed out their foul footsteps’ pollution.
No refuge could save the hireling and slave
From the terror of flight or the gloom of the grave:
And the star-spangled banner in triumph doth wave
O’er the land of the free and the home of the brave.

O thus be it ever, when freemen shall stand
Between their loved homes and the war’s desolation.
Blest with vict’ry and peace, may the Heav’n rescued land
Praise the Power that hath made and preserved us a nation!
Then conquer we must, when our cause it is just,
And this be our motto: “In God is our trust.”
And the star-spangled banner in triumph shall wave
O’er the land of the free and the home of the brave.
      `.trim(),
    },
    {
      id: "america-beautiful",
      title: "America the Beautiful",
      content:
        "America the Beautiful is a hymn of gratitude for the land and for the people who have worked to preserve and improve it. Its verses move from amber waves of grain to calls for self control, mercy, and nobility in public life. The song connects natural beauty with moral responsibility, suggesting that a truly beautiful nation is one that pairs great landscapes with great character.",
    },
    {
      id: "god-bless-america",
      title: "God Bless America",
      content:
        "God Bless America is both a prayer and a patriotic song. Written in the early twentieth century, it asks for divine guidance and protection over the land and its people. The simple words and memorable melody have made it a fixture at gatherings where citizens pause to reflect on the nation’s blessings and challenges. Singing it together can be a way of expressing gratitude and hope for the future.",
    },
  ],
},

      {
        id: "american-experiment",
        title: "The American Experiment",
        description: "Understanding America as an ongoing democratic project",
        subsections: [
          {
            id: "self-governance",
            title: "Self-Governance",
            content:
              "Self governance means that people are not ruled by distant kings or unchecked elites but by leaders they choose and can replace. The American experiment began with the daring claim that ordinary citizens, guided by wisdom and virtue, could manage their own public affairs. Every school board meeting, town election, or community decision is a small test of this idea. When people participate and take responsibility, the experiment continues.",
          },
          {
            id: "progress",
            title: "Progress and Reform",
            content:
              "Progress and reform describe the efforts each generation makes to bring laws and institutions closer to the country’s founding ideals. Movements to end slavery, secure voting rights, improve working conditions, or expand opportunity have all argued that the nation must live up to its promises. Not every proposed reform is wise, but the basic belief that wrongs can be corrected is part of what keeps the American story moving forward.",
          },
          {
            id: "challenges",
            title: "Challenges and Resilience",
            content:
              "From wars and economic downturns to political unrest and cultural division, the United States has faced repeated tests. At many points in history, it was not obvious that the nation would hold together. Yet Americans have repeatedly rebuilt, adjusted, and carried on, often emerging with stronger safeguards for liberty. Understanding past challenges can give perspective and courage when present problems feel overwhelming.",
          },
        ],
      },
      {
        id: "to-be-american",
        title: "To Be an American",
        description: "What it means to be part of the American story",
        subsections: [
          {
            id: "shared-values",
            title: "Shared Values",
            content:
              "To be an American is less about birthplace and more about shared commitments. These include belief in human dignity, the rule of law, equality before the law, and the value of honest work. People may disagree sharply about policies, yet still be bound together by a sense that freedom, responsibility, and fairness matter. These shared values give strangers a common language and link newcomers with generations who came before.",
          },
          {
            id: "diversity",
            title: "Diversity and Unity",
            content:
              "America’s diversity includes many cultures, languages, and traditions woven into one national fabric. This variety can be a source of creativity and strength when people bring their gifts to the table and respect one another’s rights. Unity does not mean perfect agreement or sameness. It means choosing to work through differences as fellow citizens rather than as permanent enemies.",
          },
          {
            id: "responsibility",
            title: "Rights and Responsibilities",
            content:
              "Every right carries a matching responsibility. Freedom of speech involves listening as well as speaking. The right to vote assumes the duty to be informed. Protection under the law implies a responsibility to obey it and to help improve it when it falls short. When citizens claim their rights while taking their responsibilities seriously, they help the republic remain both free and stable.",
          },
        ],
      },
    ],
  },

  // ===== POLITICAL LANDSCAPE =====
  {
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
              "The Democratic Party traces its roots to the early nineteenth century and has changed shape many times. It has included rural populists, urban machines, Southern conservatives, and modern progressives. Over time the party moved from defending states’ rights and limited federal power to championing civil rights legislation and a larger national role in social programs. Understanding this history helps explain why party labels do not always mean the same thing in every era.",
          },
          {
            id: "dem-values",
            title: "Core Values",
            content:
              "Today the Democratic Party generally emphasizes equality of opportunity, social safety nets, and a belief that government can help address poverty, discrimination, and environmental harm. Supporters often stress the importance of public education, workers’ rights, and consumer protections. While there is wide debate within the party about how far government should go, many Democrats see collective action through law as an essential tool for promoting fairness.",
          },
          {
            id: "dem-positions",
            title: "Policy Positions",
            content:
              "Modern Democratic policy positions commonly include expanding access to health care, addressing climate change, raising or maintaining certain taxes to fund public services, and supporting regulations on business in areas like environmental protection and financial markets. The party tends to support protections for voting access and a more active federal role in civil rights enforcement. Positions vary by region and candidate, but these themes appear frequently in national platforms.",
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
              "The Republican Party was born in the 1850s out of opposition to the expansion of slavery into new territories. Under Abraham Lincoln it led the Union during the Civil War and supported constitutional amendments ending slavery and protecting equal rights. Over the decades the party evolved, championing business growth, anti communist policies during the Cold War, and various waves of tax and regulatory reform. Its history reflects ongoing debates about liberty, order, and the proper scope of government.",
          },
          {
            id: "rep-values",
            title: "Core Values",
            content:
              "Modern Republicans generally stress individual freedom, private enterprise, and skepticism of large centralized government. Many emphasize personal responsibility, strong national defense, and respect for traditional social institutions such as family and faith communities. The party often frames its approach as protecting space for individuals, families, and local organizations to solve problems without heavy federal control.",
          },
          {
            id: "rep-positions",
            title: "Policy Positions",
            content:
              "Common Republican policy positions include lowering or simplifying taxes, reducing federal regulations on businesses, supporting strong military spending, and defending Second Amendment rights. Many Republicans advocate for school choice options and seek to limit the size and cost of federal social programs. As with any large party, there is internal debate, but these themes frequently appear in national platforms and campaigns.",
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
              "The Libertarian Party emerged in the early 1970s as a response to concerns about both big government and restrictions on personal freedom. It occupies a distinct space in American politics by combining strong support for free markets with an equally strong defense of civil liberties. Libertarians often argue that individuals, not the state, should decide how to live their lives as long as they do not harm others.",
          },
          {
            id: "lib-principles",
            title: "Core Principles",
            content:
              "Libertarian principles center on self ownership, voluntary exchange, and non aggression. In practice this means advocating for minimal government involvement in the economy and in private personal choices. Libertarians tend to oppose military interventions abroad, warrantless surveillance at home, and laws that regulate peaceful behavior between consenting adults. The guiding question is often whether a given law increases or decreases individual liberty.",
          },
          {
            id: "lib-positions",
            title: "Policy Positions",
            content:
              "Policy positions associated with the Libertarian Party include significant reductions in federal spending and taxation, legalization or decriminalization of many currently banned substances, and sharp limits on government surveillance and regulation. Libertarians usually support broad free trade, open competition in currency and banking, and a foreign policy focused on defense rather than nation building.",
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
              "The Green Party developed from environmental and peace movements that gained strength in the late twentieth century. It seeks to link ecological concerns with questions of economic fairness and grassroots democracy. Greens present themselves as an alternative to the two major parties, arguing that long term environmental health and local control should guide national priorities.",
          },
          {
            id: "green-values",
            title: "Core Values",
            content:
              "Core Green Party values include ecological wisdom, social justice, nonviolence, and decentralization of political power. Supporters often believe that communities should have greater say in decisions that affect their land, water, and local economies. The party also stresses respect for diversity and the need for political systems that give ordinary citizens more direct influence.",
          },
          {
            id: "green-positions",
            title: "Policy Positions",
            content:
              "Policy proposals from Green candidates usually call for rapid transitions to renewable energy, strict limits on pollution, and changes to campaign finance rules to reduce the influence of large donors. Many Greens support universal health care, guaranteed basic income experiments, and expansions of public transportation. They tend to favor non military approaches to foreign conflicts and greater international cooperation on environmental issues.",
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
              "The Constitution Party is a smaller party that calls for a return to what it views as the plain meaning of the Constitution and the limited federal powers it describes. It often appeals to voters who are skeptical of both major parties and who want a platform that places strong emphasis on traditional moral principles and state sovereignty.",
          },
          {
            id: "const-principles",
            title: "Core Principles",
            content:
              "Core principles of the Constitution Party include strict limits on federal authority, strong protection for life and family as they define it, and a belief that many functions now handled by Washington should be returned to state and local governments. The party often argues that centralization has weakened both liberty and community responsibility.",
          },
          {
            id: "const-positions",
            title: "Policy Positions",
            content:
              "Policy positions commonly associated with the Constitution Party include ending federal involvement in education, scaling back or abolishing certain federal agencies, and returning to forms of money backed by precious metals. The party usually supports strong protections for gun ownership and seeks to restrict federal spending and borrowing.",
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
              "Independent voters do not formally align with any political party, though they may lean toward one side or the other in practice. Many are frustrated with partisan conflict or feel that neither major party fully represents their views. Because they can shift from election to election, independents often play a decisive role in close races and can push candidates to broaden their message.",
          },
          {
            id: "local-movements",
            title: "Local Political Movements",
            content:
              "Local political movements grow out of specific concerns in towns, cities, or regions. Residents may organize around property taxes, zoning decisions, school policies, or environmental issues. These efforts show democracy at work on a human scale, where neighbors can meet face to face. Successful local movements sometimes influence state or national debates by demonstrating what is possible in practice.",
          },
          {
            id: "third-parties",
            title: "Role of Third Parties",
            content:
              "Third parties rarely win major national offices, but they can have outsized influence. By raising issues that the big parties avoid, they can shift the terms of debate and force new ideas onto the agenda. Sometimes major parties adopt planks from third party platforms to appeal to their voters. Understanding this dynamic helps explain why even small parties are part of the broader American political ecosystem.",
          },
        ],
      },
    ],
  },

  // ===== PRINCIPLES IN PRACTICE =====
  {
    id: "principles-practice",
    title: "Principles in Practice",
    icon: "balance-scale",
    description: "How American values are applied in society and governance",
    sections: [
      {
        id: "freedom-responsibility",
        title: "Freedom and Responsibility",
        description: "Balancing individual liberty with social responsibility",
        subsections: [
          {
            id: "individual-freedom",
            title: "Individual Freedom",
            content:
              "Individual freedom allows people to choose their work, beliefs, associations, and direction in life without unnecessary interference from government. This liberty has fueled entrepreneurship, religious diversity, and artistic creativity. At the same time, freedom is not a license to ignore the impact of our actions on others. Recognizing the difference between personal preference and harmful behavior is part of the ongoing civic conversation.",
          },
          {
            id: "social-responsibility",
            title: "Social Responsibility",
            content:
              "Social responsibility means remembering that we live among neighbors, not in isolation. It shows up when people obey just laws, serve on juries, help those in need, and take part in community life. A society where everyone only pursues private interest becomes brittle. By balancing personal goals with concern for the common good, citizens keep freedom from sliding into selfishness.",
          },
          {
            id: "balancing-act",
            title: "The Balancing Act",
            content:
              "American history is full of debates about how to balance liberty and responsibility. Questions about public health rules, economic regulations, or social programs often turn on where to draw the line between individual choice and shared obligations. There is no permanent final answer, but the ongoing argument itself is a sign that people care about protecting both personal rights and community well being.",
          },
        ],
      },
      {
        id: "faith-morality",
        title: "Faith and Morality in Public Life",
        description: "The role of religion and ethics in American society",
        subsections: [
          {
            id: "religious-freedom",
            title: "Religious Freedom",
            content:
              "Religious freedom protects the right to worship according to conscience and to live out one’s faith in daily life, within the limits of others’ rights. It has allowed many traditions to take root in the United States and to contribute schools, hospitals, charities, and cultural life. Maintaining this freedom requires both legal protection and a spirit of mutual respect among people who disagree on ultimate questions.",
          },
          {
            id: "faith-public-square",
            title: "Faith in the Public Square",
            content:
              "Faith in the public square refers to the ways religious beliefs influence civic action. Many historic movements, from abolition to various relief efforts, drew energy from churches and religious organizations. Citizens are free to bring their deepest convictions into political debate, just as others are free to disagree. The challenge is to argue strongly while still recognizing the dignity of those who see the world differently.",
          },
          {
            id: "secular-governance",
            title: "Secular Governance",
            content:
              "Secular governance does not mean a society without faith but a government that does not officially favor one faith over another. This arrangement protects religious communities from state control and protects citizens from being coerced into belief. It allows moral and spiritual voices to speak freely without giving any single institution the power to speak for everyone.",
          },
        ],
      },
      {
        id: "tradition-progress",
        title: "Tradition and Progress",
        description: "Honoring the past while embracing the future",
        subsections: [
          {
            id: "preserving-tradition",
            title: "Preserving Tradition",
            content:
              "Preserving tradition means remembering where we came from and keeping practices that continue to serve the common good. Traditions such as civic holidays, local customs, and family rituals can provide stability in times of change. They connect younger generations with the wisdom and sacrifices of those who came before, reminding us that we are part of a longer story.",
          },
          {
            id: "embracing-change",
            title: "Embracing Change",
            content:
              "Embracing change recognizes that new circumstances require fresh thinking. Technology, population shifts, and new discoveries constantly reshape the world. Some traditions need to be reinterpreted or even replaced so that core principles like justice and liberty can be better honored. The key question is not whether change happens, but whether it moves the country closer to or farther from its foundational commitments.",
          },
          {
            id: "dynamic-tension",
            title: "Dynamic Tension",
            content:
              "The dynamic tension between tradition and progress is one of the engines of American life. Citizens argue over which customs to keep, which reforms to pursue, and how fast change should happen. When this tension is handled with patience and goodwill, it can produce solutions that respect the best of the past while opening doors for the future.",
          },
        ],
      },
      {
        id: "equality-merit",
        title: "Equality and Merit",
        description: "Balancing equal opportunity with individual achievement",
        subsections: [
          {
            id: "equal-opportunity",
            title: "Equal Opportunity",
            content:
              "Equal opportunity means that people should have a fair chance to develop their abilities and pursue their goals regardless of their background. Schools, laws, and workplaces all play a part in either widening or narrowing opportunity. When barriers based on race, class, or other factors are reduced, more people can contribute their talents to the nation’s life.",
          },
          {
            id: "meritocracy",
            title: "Meritocracy",
            content:
              "Meritocracy is the idea that rewards should be based on effort, skill, and contribution rather than on inherited status. It pushes society to notice and honor excellence wherever it appears. At the same time, true meritocracy requires that people start from reasonably similar starting lines, or at least that obvious unfair obstacles are removed. Otherwise the word can become a cover for old inequalities.",
          },
          {
            id: "equity-debates",
            title: "Equity Debates",
            content:
              "Debates about equity ask how far society should go in correcting past injustices and current disadvantages. Some argue for policies that treat everyone the same under the law, while others support targeted measures to lift up groups that have faced long term obstacles. These conversations are complex and often emotional, but they revolve around the shared desire for a fair chance at a good life.",
          },
        ],
      },
      {
        id: "role-government",
        title: "The Role of Government",
        description: "Debates about government's proper size and function",
        subsections: [
          {
            id: "limited-government",
            title: "Limited Government",
            content:
              "Limited government is a principle that says the state should perform only those tasks that individuals and voluntary groups cannot reasonably handle on their own. Supporters fear that when government grows too large, it can smother initiative, waste resources, and threaten liberty. Constitutional checks, balanced budgets, and sunset clauses on laws are some of the tools used to keep power within bounds.",
          },
          {
            id: "active-government",
            title: "Active Government",
            content:
              "Active government proponents believe that in a complex modern society, public institutions must take a hands on role in addressing major challenges. They point to history where coordinated efforts were needed to build infrastructure, respond to crises, or correct abuses. For them the question is not whether government should act, but how to ensure that its actions are effective, accountable, and focused on the common good.",
          },
          {
            id: "practical-governance",
            title: "Practical Governance",
            content:
              "Most citizens land somewhere between the poles of limited and active government. Practical governance looks for solutions that combine public action with private initiative. It asks what level of government is best suited to tackle a given problem, and how to measure results honestly. This pragmatic spirit helps translate broad principles into real world policies.",
          },
        ],
      },
      {
        id: "community-common-good",
        title: "Community and the Common Good",
        description: "Balancing individual interests with collective welfare",
        subsections: [
          {
            id: "individualism",
            title: "American Individualism",
            content:
              "American individualism celebrates personal drive, ingenuity, and the belief that one person can make a difference. It has encouraged inventors, small business owners, and reformers to step forward without waiting for permission. At the same time, unchecked individualism can overlook the ways people depend on one another for safety, learning, and emotional support.",
          },
          {
            id: "community-bonds",
            title: "Community Bonds",
            content:
              "Community bonds form through families, friendships, congregations, clubs, and local organizations. These smaller circles provide help during hard times, mentor young people, and create traditions that give meaning to daily life. Strong communities make it easier for citizens to trust one another and to tackle challenges together.",
          },
          {
            id: "common-good",
            title: "The Common Good",
            content:
              "The common good refers to conditions that benefit everyone, such as public safety, clean air, reliable infrastructure, and trustworthy institutions. Pursuing the common good does not erase individual goals, but it asks people to consider how their choices affect the wider community. A society that loses sight of the common good risks becoming divided and unstable.",
          },
        ],
      },
      {
        id: "national-global",
        title: "National Identity and Global Responsibility",
        description: "America's role in the world",
        subsections: [
          {
            id: "national-interest",
            title: "National Interest",
            content:
              "National interest includes the security, prosperity, and well being of a country’s citizens. Leaders must decide which alliances, trade agreements, and policies best advance that interest. Disagreements arise over how much to prioritize economic growth, human rights concerns, or cultural influence abroad. Healthy debate on national interest helps prevent any single priority from crowding out all others.",
          },
          {
            id: "global-leadership",
            title: "Global Leadership",
            content:
              "Global leadership describes the influence a nation has beyond its borders. The United States has often played a leading role in international organizations, humanitarian aid, and security alliances. Supporters of a strong leadership role argue that it helps keep the world more stable and protects American interests. Critics worry about overextension and unintended consequences. Balancing responsibility and restraint is an ongoing challenge.",
          },
          {
            id: "international-cooperation",
            title: "International Cooperation",
            content:
              "International cooperation is necessary when problems cross borders, such as pandemics, terrorism, and environmental issues. Working with other nations can multiply resources and knowledge, but it can also require compromise. Citizens and leaders must weigh how agreements affect sovereignty, local industries, and long term security. Thoughtful cooperation aims to protect national independence while recognizing shared global challenges.",
          },
        ],
      },
    ],
  },

  // ===== LAND AND LIFE =====
  {
    id: "land-life",
    title: "Land and Life",
    icon: "globe",
    description: "America's geography, people, and heritage",
    sections: [
      {
        id: "geography",
        title: "Geography and Scale",
        description: "The vast and diverse American landscape",
        subsections: [
          {
            id: "continental-expanse",
            title: "Continental Expanse",
            content:
              "The United States stretches from ocean to ocean and beyond, covering mountains, plains, deserts, forests, and coastlines. This scale has shaped transportation, settlement patterns, and regional identities. A person driving from Maine to California will pass through dramatically different climates and cultures, yet still remain within one nation. The size of the country offers both opportunity and responsibility in caring for the land.",
          },
          {
            id: "regions",
            title: "Regional Diversity",
            content:
              "Regional diversity reflects how geography, history, and culture blend in different parts of the country. New England’s rocky shores and older towns tell a different story than the wide open spaces of the Great Plains or the sunbelt cities of the Southwest. Each region contributes its own foods, music, industries, and political traditions. Appreciating these differences can deepen, rather than dilute, a sense of national unity.",
          },
          {
            id: "natural-features",
            title: "Natural Features",
            content:
              "American natural features such as the Rocky Mountains, the Mississippi River, the Great Lakes, and the Grand Canyon are more than tourist destinations. They have guided trade routes, inspired art and literature, and provided resources for communities. National parks and protected areas help preserve these landmarks so that future generations can hike the same trails, stand at the same overlooks, and feel the same sense of wonder.",
          },
        ],
      },
      {
        id: "natural-wealth",
        title: "Natural Wealth",
        description: "America's abundant natural resources",
        subsections: [
          {
            id: "resources",
            title: "Natural Resources",
            content:
              "Natural resources such as fertile soil, timber, minerals, and energy sources have powered American growth from the earliest days. Farming, mining, and industry have created jobs and wealth, but they have also raised questions about conservation and fairness. Managing these resources wisely requires balancing present needs with care for the land and for communities that depend on it.",
          },
          {
            id: "agriculture",
            title: "Agricultural Abundance",
            content:
              "Agricultural abundance allows the United States to feed its own people and export food around the world. From family farms to large operations, producers grow grains, fruits, vegetables, and livestock in varied climates. Advances in technology have increased yields, yet farmers still face risks from weather, markets, and changing public expectations. Their work remains a cornerstone of national strength.",
          },
          {
            id: "conservation",
            title: "Conservation and Stewardship",
            content:
              "Conservation and stewardship involve protecting forests, waters, wildlife, and open spaces for the long term. Early leaders set aside national parks and forests when they saw how quickly natural areas could be lost. Today, citizens, landowners, and governments continue that work through restoration projects, responsible recreation, and policies that encourage sustainable use.",
          },
        ],
      },
      {
        id: "american-people",
        title: "The American People",
        description: "The diverse population that makes up America",
        subsections: [
          {
            id: "immigration",
            title: "A Nation of Immigrants",
            content:
              "For centuries people from many nations have come to America seeking safety, opportunity, or a new start. Waves of immigration have brought different languages, skills, and customs, reshaping cities and countryside alike. The stories of these journeys, whether voluntary or forced, form a major part of the country’s identity and raise ongoing questions about welcome, assimilation, and national identity.",
          },
          {
            id: "cultural-diversity",
            title: "Cultural Diversity",
            content:
              "Cultural diversity appears in the foods people cook, the music they play, the holidays they celebrate, and the stories they tell. Neighborhoods, festivals, and art scenes across the country showcase influences from many traditions. When approached with curiosity and respect, this variety broadens people’s horizons and strengthens the creative life of the nation.",
          },
          {
            id: "shared-identity",
            title: "Shared American Identity",
            content:
              "Shared American identity arises when people of many backgrounds see themselves as part of one civic family. Common symbols, holidays, and institutions help create this sense of belonging, but so do everyday experiences like standing in the same line to vote or cheering for the same team. The goal is not to erase differences, but to recognize that they exist within a single constitutional framework.",
          },
        ],
      },
      {
        id: "defense-stewardship",
        title: "Defense and Stewardship",
        description: "Protecting and preserving America",
        subsections: [
          {
            id: "national-defense",
            title: "National Defense",
            content:
              "National defense involves protecting the country from external threats and supporting allies when appropriate. The armed forces, along with diplomatic and intelligence efforts, work to prevent attacks and respond when danger arises. Military service carries great risks and responsibilities, and a grateful nation honors those who stand guard on its behalf.",
          },
          {
            id: "environmental-stewardship",
            title: "Environmental Stewardship",
            content:
              "Environmental stewardship recognizes that clean air, water, and soil are essentials, not luxuries. Citizens, businesses, and governments all play roles in reducing pollution, conserving energy, and protecting habitats. Choices about land use, transportation, and technology can either degrade or improve the environment that future generations will inherit.",
          },
          {
            id: "civic-stewardship",
            title: "Civic Stewardship",
            content:
              "Civic stewardship means caring for the health of the republic itself. Voting, learning about issues, serving in local leadership, and defending constitutional norms are all forms of stewardship. Just as people maintain buildings and bridges so they do not crumble, citizens must tend to institutions and traditions that keep self government possible.",
          },
        ],
      },
      {
        id: "chronicle",
        title: "Chronicle of the Republic",
        description: "Key moments in American history",
        subsections: [
          {
            id: "founding-era",
            title: "The Founding Era",
            content:
              "The founding era stretches from colonial settlement through the Revolution and the framing of the Constitution. During this period ideas about representation, taxation, and natural rights collided with the realities of empire. Figures such as Washington, Adams, Jefferson, and many lesser known contributors debated how to design a government that could be both strong and free. Their decisions continue to shape American life today.",
          },
          {
            id: "expansion-conflict",
            title: "Expansion and Conflict",
            content:
              "Nineteenth century America expanded westward across the continent, bringing opportunity for many and hardship for others, including Native nations and enslaved people. Conflicts over territory, economics, and human bondage eventually erupted into the Civil War, the bloodiest conflict in the nation’s history. Reconstruction that followed sought to redefine citizenship and rights, leaving a legacy that is still being worked out.",
          },
          {
            id: "modern-america",
            title: "Modern America",
            content:
              "Modern America was shaped by industrialization, world wars, the Great Depression, the civil rights movement, and technological revolutions. The country moved from a largely rural society to an urban, globally connected one. New opportunities opened, new inequalities emerged, and the pace of change accelerated. Understanding these developments helps citizens see how recent the familiar features of everyday life actually are.",
          },
        ],
      },
      {
        id: "stewards-shapers",
        title: "Stewards and Shapers",
        description: "Notable Americans who shaped the nation",
        subsections: [
          {
            id: "founders",
            title: "The Founders",
            content:
              "The founders include well known figures such as George Washington, Thomas Jefferson, Benjamin Franklin, and James Madison, along with many lesser known contributors. They led armies, negotiated treaties, wrote documents, and argued fiercely with one another about the best path forward. Their achievements are significant, yet their flaws and disagreements also remind us that the nation was built by real human beings, not legends.",
          },
          {
            id: "reformers",
            title: "Reformers and Leaders",
            content:
              "Reformers and leaders like Abraham Lincoln, Frederick Douglass, Susan B. Anthony, Martin Luther King Jr., and many others pushed the country to confront its failures and extend its promises. Some worked inside government, others spoke from pulpits or marched in the streets. Their stories show how moral vision and persistence can bend public opinion and change the law.",
          },
          {
            id: "innovators",
            title: "Innovators and Builders",
            content:
              "Innovators and builders include inventors, entrepreneurs, scientists, artists, and educators who transformed everyday life. From advances in electricity and medicine to achievements in music and literature, their work reshaped how people communicate, travel, and understand the world. Celebrating their contributions highlights the creative energy that has always been part of the American character.",
          },
        ],
      },
      {
        id: "unity-continuance",
        title: "Unity and Continuance",
        description: "Maintaining national unity and democratic continuity",
        subsections: [
          {
            id: "e-pluribus-unum",
            title: "E Pluribus Unum",
            content:
              '"Out of many, one" is more than a motto on coins; it is a demanding goal. The phrase captures the hope that people from many states, regions, and backgrounds can form a single civic community. Unity does not erase local loyalties or personal identities, but it calls citizens to see themselves as part of a larger whole with shared responsibilities.',
          },
          {
            id: "peaceful-transition",
            title: "Peaceful Transition of Power",
            content:
              "The peaceful transition of power after elections is one of the clearest signs of a stable democracy. When leaders step down after losing and new leaders take office without violence, it sends a message that authority comes from the law and from the people, not from force. Protecting this tradition requires trust in the process, clear rules, and a shared commitment to settle disputes through institutions rather than through intimidation.",
          },
          {
            id: "future-generations",
            title: "Responsibility to Future Generations",
            content:
              "Responsibility to future generations asks citizens to think beyond election cycles and personal lifetimes. Decisions about debt, environmental care, education, and civic culture will shape the world that children and grandchildren inherit. Acting as good ancestors means building systems that are durable, fair, and worthy of the trust of those who come after us.",
          },
        ],
      },
    ],
  },
];

export function getSectionById(sectionId: string): MainSection | undefined {
  return contentData.find((section) => section.id === sectionId);
}

export function getSubSectionById(
  mainSectionId: string,
  sectionId: string,
  subsectionId: string
): SubSection | undefined {
  const mainSection = getSectionById(mainSectionId);
  if (!mainSection) return undefined;

  const section = mainSection.sections.find((s) => s.id === sectionId);
  if (!section) return undefined;

  return section.subsections.find((ss) => ss.id === subsectionId);
}
