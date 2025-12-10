
export interface SubSection {
  id: string;
  title: string;
  content: string;
  fullText?: string;
  context?: string;
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
            "The Declaration of Independence is both a breakup letter with the British Crown and a statement of timeless principles. It explains why the colonies believed they were justified in separating, lists abuses by the king, and declares that legitimate governments exist to secure God given rights. Its words about equality and unalienable rights have challenged every generation to measure America's progress against its founding ideals.",
          imageUrl:
            "https://media.defense.gov/2009/Jun/30/2000533726/-1/-1/0/040929-F-5102W-001.JPG",
          fullText: `In Congress, July 4, 1776

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

Matthew Thornton`,
          context: `The Declaration of Independence was drafted primarily by Thomas Jefferson and approved by the Second Continental Congress on July 4, 1776. It announced to the world that the thirteen colonies were breaking from British rule and forming a new nation.

The document is usually understood in three main parts: a statement of natural rights and the purpose of government, a list of grievances against King George III, and a final declaration that the colonies are free and independent states. Its claim that all men are created equal and endowed by their Creator with unalienable rights has been quoted, challenged, and reclaimed by many generations.

Even when America has failed to live up to these principles, the words of the Declaration have been used to call the country back to its own promises—by abolitionists, civil rights leaders, and others who insisted that the nation take its founding ideals seriously.`,
        },
        {
          id: "articles-confederation",
          title: "The Articles of Confederation",
          content:
            "The Articles of Confederation served as the first constitution of the United States from 1781 to 1789. They created a loose alliance of states with a weak central government that had limited power to tax, regulate commerce, or enforce laws. The experience under the Articles revealed the need for a stronger federal structure, leading to the Constitutional Convention of 1787.",
        },
        {
          id: "constitution",
          title: "The Constitution",
          content:
            "The Constitution is the supreme law of the United States. It establishes the structure of the federal government, divides power among three branches, and protects individual rights through amendments. Written in 1787 and ratified in 1788, it has been amended twenty seven times and remains the oldest written national constitution still in use.",
        },
        {
          id: "bill-of-rights",
          title: "The Bill of Rights",
          content:
            "The Bill of Rights consists of the first ten amendments to the Constitution, ratified in 1791. These amendments protect fundamental freedoms such as speech, religion, press, assembly, and the right to bear arms. They also guarantee due process, trial by jury, and protection against unreasonable searches and cruel punishment. The Bill of Rights limits government power and safeguards individual liberty.",
        },
        {
          id: "federalist-papers",
          title: "The Federalist Papers",
          content:
            "The Federalist Papers are a collection of 85 essays written by Alexander Hamilton, James Madison, and John Jay to promote ratification of the Constitution. Published between 1787 and 1788, they explain the reasoning behind the Constitution's design and defend the principles of federalism, separation of powers, and checks and balances. The Federalist Papers remain an essential guide to understanding the founders' intentions.",
        },
      ],
    },
    {
      id: "citizenship-duty",
      title: "Citizenship and Civic Duty",
      description: "The responsibilities and privileges of American citizenship",
      subsections: [
        {
          id: "voting",
          title: "Voting and Elections",
          content:
            "Voting is the most direct way citizens participate in self government. Through elections, people choose leaders, approve or reject policies, and hold officials accountable. The right to vote has expanded over time to include more Americans, but it remains a responsibility that requires attention, judgment, and a willingness to engage with the issues of the day.\n\nElections work best when voters are informed. This means following news from multiple sources, checking facts, and thinking critically about what candidates promise and what they have done. It also means understanding that no candidate or party will be perfect, and that voting is about choosing the best available option rather than waiting for an ideal choice.\n\nBeyond casting a ballot, citizens can volunteer for campaigns, attend town halls, contact elected officials, and encourage others to vote. These actions strengthen democracy by ensuring that leaders hear from a wide range of voices and that the public remains engaged between elections.\n\nWhen turnout is low or when people vote without thinking, democracy weakens. Leaders become less responsive, and the distance between government and the governed grows. Voting is not just a right; it is a civic duty that helps protect freedom and ensure that government remains accountable to the people it serves.",
        },
        {
          id: "jury-duty",
          title: "Jury Duty",
          content:
            "Jury duty is a civic responsibility that allows ordinary citizens to participate directly in the justice system. When called to serve, jurors hear evidence, deliberate with fellow citizens, and help decide the outcome of criminal and civil cases. This system reflects the belief that justice should not be left solely to judges or government officials, but should involve the community itself.\n\nServing on a jury can be inconvenient, but it is also an opportunity to see how the legal system works and to ensure that trials are fair. Jurors are expected to set aside personal biases, listen carefully to testimony, and apply the law as instructed by the judge. Their decisions can have profound consequences for the accused, for victims, and for the integrity of the legal process.\n\nThe jury system protects against government overreach by placing a check on prosecutorial power. A jury of peers can refuse to convict even when the law has technically been broken, if they believe that applying the law in that case would be unjust. This power, though rarely used, is a reminder that the people retain ultimate authority over the legal system.\n\nWhen citizens take jury duty seriously, they help uphold the rule of law and ensure that justice is administered fairly. When they treat it as a burden to be avoided, the system suffers and the quality of justice declines. Jury duty is one of the most direct ways that ordinary people can contribute to the common good.",
        },
        {
          id: "civic-engagement",
          title: "Civic Engagement",
          content:
            "Civic engagement includes all the ways that citizens participate in public life beyond voting. This can mean attending town meetings, joining community organizations, volunteering for causes, contacting elected officials, or simply staying informed about local and national issues. Engaged citizens help shape the direction of their communities and hold leaders accountable.\n\nOne of the most important forms of civic engagement is speaking up. When people see problems in their neighborhoods, schools, or government, they can raise concerns, propose solutions, and work with others to make change. This kind of participation does not require special expertise; it requires only a willingness to pay attention and to act.\n\nCivic engagement also means listening to others, especially those with different perspectives. Democracy depends on the ability of people to disagree without demonizing one another, to debate ideas without resorting to personal attacks, and to find common ground even when consensus seems impossible. This kind of respectful engagement is harder than simply shouting down opponents, but it is essential for a healthy republic.\n\nWhen citizens withdraw from public life, power concentrates in the hands of a few. When they engage with good will and persistence, they help ensure that government remains responsive and that the public interest is not forgotten. Civic engagement is not just a duty; it is a way of living that strengthens both individuals and communities.",
        },
      ],
    },
    {
      id: "media-literacy",
      title: "Media and Information Literacy",
      description: "Understanding how to evaluate information and sources",
      subsections: [
        {
          id: "critical-thinking",
          title: "Critical Thinking",
          content:
            "Critical thinking is the ability to analyze information, question assumptions, and reach conclusions based on evidence rather than emotion or bias. In an age of abundant information, this skill is more important than ever. Citizens who think critically are better equipped to separate fact from fiction, to recognize manipulation, and to make informed decisions.\n\nCritical thinking begins with asking questions. Who is making this claim? What evidence supports it? Are there other perspectives? What might be missing from this account? These questions help reveal the strengths and weaknesses of any argument and prevent people from accepting claims simply because they sound convincing or align with existing beliefs.\n\nIt also requires humility. No one has perfect knowledge, and everyone is susceptible to bias. Recognizing one's own limitations and being willing to change one's mind in light of new evidence are signs of intellectual maturity. Critical thinking is not about being cynical or dismissive; it is about being thoughtful and open to truth wherever it may be found.\n\nWhen citizens practice critical thinking, they become harder to deceive and more capable of self government. When they abandon it, they become vulnerable to propaganda, conspiracy theories, and leaders who exploit fear or ignorance. Critical thinking is a civic virtue that protects both individuals and the republic.",
        },
        {
          id: "evaluating-sources",
          title: "Evaluating Sources",
          content:
            "Evaluating sources means assessing the reliability, accuracy, and bias of the information you encounter. Not all sources are equally trustworthy, and even reputable sources can make mistakes or present information in ways that favor a particular viewpoint. Learning to evaluate sources is essential for making informed decisions and avoiding misinformation.\n\nStart by considering the source itself. Is it a well established news organization, a government agency, an academic institution, or an anonymous blog? Does the source have a track record of accuracy, or has it been caught spreading false information? Does it clearly distinguish between news reporting and opinion? These questions help determine how much weight to give a particular claim.\n\nNext, look at the evidence. Does the source cite credible experts, provide data, or link to original documents? Or does it rely on anonymous sources, vague assertions, or emotional appeals? Strong sources back up their claims with verifiable information and are transparent about their methods and limitations.\n\nFinally, check for bias. Every source has a perspective, but good sources acknowledge their biases and strive for fairness. They present multiple viewpoints, correct errors, and avoid sensationalism. When you encounter a claim that seems too good to be true or that confirms all your existing beliefs, it is worth seeking out additional sources to verify the information.\n\nEvaluating sources is not about finding perfect objectivity; it is about being aware of the strengths and limitations of the information you consume. When citizens take this responsibility seriously, they become more informed, more discerning, and better equipped to participate in democratic life.",
        },
      ],
    },
    {
      id: "american-symbols",
      title: "American Symbols and Their Meaning",
      description: "The symbols that represent American identity and values",
      subsections: [
        {
          id: "flag",
          title: "The American Flag",
          content:
            "The American flag is a symbol of the nation's unity, history, and ideals. Its thirteen stripes represent the original colonies, and its fifty stars represent the states that make up the union today. The flag has flown over moments of triumph and tragedy, and it continues to inspire pride, debate, and reflection about what America stands for.\n\nFor many, the flag represents freedom, sacrifice, and the promise of opportunity. It is displayed at government buildings, schools, and homes, and it is honored in ceremonies and at sporting events. Veterans and service members often speak of the flag as a reminder of the values they defended and the comrades they lost.\n\nOthers see the flag as a symbol that must be continually reexamined. They argue that the nation has not always lived up to its ideals, and that honoring the flag means working to make America more just and inclusive. Debates about how to treat the flag, whether to stand for the national anthem, and what the flag represents are part of the ongoing conversation about American identity.\n\nThe flag is a powerful symbol precisely because it means different things to different people. It can unite and divide, inspire and challenge. Understanding the flag's history and the debates surrounding it is part of understanding America itself.",
        },
        {
          id: "national-anthem",
          title: "The National Anthem",
          content:
            "The Star Spangled Banner became the national anthem in 1931, though its words were written by Francis Scott Key in 1814 during the War of 1812. The anthem celebrates the resilience of the American flag and the nation it represents, even in the face of attack. It is performed at public events, sporting competitions, and official ceremonies, serving as a moment of shared reflection and patriotism.\n\nThe anthem's lyrics describe the flag still flying after a night of bombardment, symbolizing the endurance of the nation and its ideals. For many, standing for the anthem is a way of honoring those who have served and sacrificed for the country. It is a ritual that connects individuals to a larger community and to the history of the nation.\n\nIn recent years, the anthem has also become a site of protest. Some athletes and activists have knelt or remained seated during the anthem to draw attention to issues of racial injustice and police violence. These actions have sparked intense debate about patriotism, respect, and the right to dissent. Supporters of the protests argue that challenging the nation to live up to its ideals is itself an act of patriotism.\n\nThe national anthem, like the flag, is a symbol that carries multiple meanings. It can inspire unity and pride, but it can also prompt difficult questions about the gap between American ideals and American realities. Engaging with these questions is part of the work of citizenship.",
        },
      ],
    },
    {
      id: "american-hymns",
      title: "American Hymns and Heritage",
      description: "Songs and traditions that express American values",
      subsections: [
        {
          id: "america-beautiful",
          title: "America the Beautiful",
          content:
            "America the Beautiful is a patriotic song that celebrates the natural beauty and ideals of the United States. Written by Katharine Lee Bates in 1893, the song's lyrics speak of spacious skies, amber waves of grain, and purple mountain majesties, while also calling for brotherhood and self control. It is often performed at public events and is considered by many to be an unofficial national anthem.\n\nThe song's emphasis on natural beauty and moral aspiration reflects a vision of America as a land blessed with resources and called to live up to high standards. It does not shy away from acknowledging the need for improvement, asking God to mend the nation's flaws and crown its good with brotherhood. This combination of pride and humility has made the song enduringly popular.\n\nAmerica the Beautiful is less martial than the national anthem, focusing on the land itself and the values that should guide the nation. It invites reflection on what makes America special and what responsibilities come with that blessing. For many, the song captures a sense of gratitude and hope that transcends political divisions.",
        },
        {
          id: "god-bless-america",
          title: "God Bless America",
          content:
            "God Bless America is a patriotic song written by Irving Berlin in 1918 and revised in 1938. It became widely popular during World War II and has been performed at countless public events, including presidential inaugurations and memorial services. The song is a prayer for the nation, asking for divine guidance and protection.\n\nThe lyrics express gratitude for the country and a desire for its continued prosperity and safety. The song's simple, heartfelt message has resonated with Americans across generations, and it is often sung at moments of national unity or crisis. It reflects a tradition of invoking faith and providence in public life, a tradition that has deep roots in American history.\n\nGod Bless America is sometimes controversial, as debates about the role of religion in public life continue. Some see it as an appropriate expression of shared values, while others worry about blurring the line between church and state. Despite these debates, the song remains a fixture of American culture and a reminder of the nation's complex relationship with faith.",
        },
      ],
    },
    {
      id: "american-experiment",
      title: "The American Experiment",
      description: "Understanding America as an ongoing project",
      subsections: [
        {
          id: "self-government",
          title: "Self Government",
          content:
            "The American experiment is the idea that ordinary people can govern themselves without kings, aristocrats, or permanent ruling classes. This was a radical claim in the 18th century, and it remains a challenging one today. Self government requires citizens who are informed, engaged, and willing to take responsibility for the direction of their country.\n\nSelf government does not mean that everyone agrees or that decisions are always wise. It means that the people, through their representatives and through direct participation, have the final say. This system depends on trust—trust that citizens will act in good faith, that leaders will respect the rules, and that institutions will remain strong enough to withstand pressure.\n\nThe experiment has faced many tests: civil war, economic depression, social upheaval, and threats from abroad. Each generation has had to decide whether to uphold the principles of self government or to abandon them in favor of expediency or authoritarianism. The fact that the experiment continues is a testament to the resilience of the American people and the strength of the constitutional framework.\n\nSelf government is not a finished achievement; it is an ongoing project that requires constant attention and renewal. When citizens take their responsibilities seriously, the experiment thrives. When they become complacent or cynical, it falters. The future of self government depends on the choices that each generation makes.",
        },
        {
          id: "to-be-american",
          title: "To Be an American",
          content:
            "To be an American is not simply a matter of birthplace or legal status. It is a commitment to a set of ideals: liberty, equality, self government, and the rule of law. These ideals are not always perfectly realized, but they provide a standard by which the nation can be judged and a vision toward which it can strive.\n\nBeing an American means accepting both the privileges and the responsibilities of citizenship. It means voting, serving on juries, paying taxes, and obeying the law. It also means speaking up when government oversteps its bounds, defending the rights of others, and working to make the country more just and inclusive.\n\nAmerica is a diverse nation, and Americans come from many backgrounds, hold many beliefs, and pursue many different visions of the good life. What unites them is not uniformity but a shared commitment to the principles that make self government possible. This requires tolerance, respect for differences, and a willingness to engage in good faith debate.\n\nTo be an American is to participate in an ongoing conversation about what the nation is and what it should become. It is to inherit a legacy of struggle and achievement, and to pass that legacy on to future generations. It is to recognize that the American experiment is never finished, and that each person has a role to play in its success or failure.",
        },
      ],
    },
  ],
};
