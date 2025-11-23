
export interface SubSection {
  id: string;
  title: string;
  content: string;
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
    id: 'foundations',
    title: 'Foundations',
    icon: 'book',
    description: 'Core principles and ideologies that shape American democracy',
    sections: [
      {
        id: 'principles-ideologies',
        title: 'Principles and Ideologies',
        description: 'The fundamental beliefs that guide American governance',
        subsections: [
          {
            id: 'democracy',
            title: 'Democracy',
            content: 'Democracy is a system of government where power rests with the people. In America, citizens exercise this power through voting, electing representatives, and participating in civic life. The democratic process ensures that government remains accountable to those it serves.'
          },
          {
            id: 'republicanism',
            title: 'Republicanism',
            content: 'Republicanism emphasizes representative government, where elected officials make decisions on behalf of citizens. This system balances direct democracy with practical governance, ensuring that diverse voices are heard while maintaining efficient decision-making.'
          },
          {
            id: 'federalism',
            title: 'Federalism',
            content: 'Federalism divides power between national and state governments. This structure allows for local autonomy while maintaining national unity, enabling states to address regional needs while the federal government handles matters of national importance.'
          }
        ]
      },
      {
        id: 'human-rights',
        title: 'Human Rights and Freedoms',
        description: 'The inalienable rights guaranteed to all Americans',
        subsections: [
          {
            id: 'life-liberty',
            title: 'Life, Liberty, and the Pursuit of Happiness',
            content: 'These fundamental rights, enshrined in the Declaration of Independence, form the bedrock of American freedom. They guarantee every person the right to live freely, make their own choices, and seek fulfillment in their own way.'
          },
          {
            id: 'freedom-speech',
            title: 'Freedom of Speech',
            content: 'The First Amendment protects the right to express ideas, opinions, and beliefs without government interference. This freedom is essential to democracy, enabling open debate, criticism of government, and the free exchange of ideas.'
          },
          {
            id: 'freedom-religion',
            title: 'Freedom of Religion',
            content: 'Americans have the right to practice any religion or no religion at all. The government cannot establish an official religion or prevent individuals from exercising their faith, ensuring religious liberty for all.'
          }
        ]
      },
      {
        id: 'government-systems',
        title: 'Government and Systems',
        description: 'How American government is structured and operates',
        subsections: [
          {
            id: 'separation-powers',
            title: 'Separation of Powers',
            content: 'The Constitution divides government into three branches: Legislative, Executive, and Judicial. Each branch has distinct powers and responsibilities, preventing any single branch from becoming too powerful.'
          },
          {
            id: 'checks-balances',
            title: 'Checks and Balances',
            content: 'Each branch of government can limit the powers of the others, ensuring no branch becomes dominant. For example, Congress makes laws, the President can veto them, and the Supreme Court can declare them unconstitutional.'
          },
          {
            id: 'rule-of-law',
            title: 'Rule of Law',
            content: 'No one is above the law in America. Everyone, from ordinary citizens to the President, must follow the same legal standards. This principle ensures fairness, justice, and accountability in governance.'
          }
        ]
      }
    ]
  },
  {
    id: 'civic-literacy',
    title: 'Civic Literacy',
    icon: 'school',
    description: 'Understanding American government, founding documents, and civic responsibility',
    sections: [
      {
        id: 'branches-government',
        title: 'Branches of Government',
        description: 'The three branches that make up the federal government',
        subsections: [
          {
            id: 'legislative',
            title: 'Legislative Branch',
            content: 'Congress, consisting of the Senate and House of Representatives, makes federal laws. The Senate has 100 members (two per state), while the House has 435 members based on state population. Congress also controls federal spending and can override presidential vetoes.'
          },
          {
            id: 'executive',
            title: 'Executive Branch',
            content: 'Led by the President, the Executive Branch enforces laws, conducts foreign policy, and commands the military. The President appoints Cabinet members and federal judges, signs or vetoes legislation, and serves as head of state.'
          },
          {
            id: 'judicial',
            title: 'Judicial Branch',
            content: 'The Supreme Court and lower federal courts interpret laws and determine their constitutionality. The Supreme Court has nine justices appointed for life, ensuring judicial independence. Their decisions set legal precedents that shape American law.'
          }
        ]
      },
      {
        id: 'founding-documents',
        title: 'Founding Documents',
        description: 'The essential texts that established American government',
        subsections: [
          {
            id: 'declaration',
            title: 'The Declaration of Independence',
            content: 'Adopted on July 4, 1776, the Declaration announced America\'s separation from Britain. It proclaimed that all people have unalienable rights to life, liberty, and the pursuit of happiness, and that governments derive their power from the consent of the governed.'
          },
          {
            id: 'articles',
            title: 'The Articles of Confederation',
            content: 'America\'s first constitution (1781-1789) created a loose confederation of states with a weak central government. Its limitations led to the Constitutional Convention and the creation of our current Constitution.'
          },
          {
            id: 'constitution',
            title: 'The Constitution',
            content: 'Ratified in 1788, the Constitution established the framework of American government. It defines the powers of each branch, protects individual rights, and provides a process for amendments. It remains the supreme law of the land.'
          },
          {
            id: 'bill-of-rights',
            title: 'The Bill of Rights',
            content: 'The first ten amendments to the Constitution, ratified in 1791, guarantee fundamental rights including freedom of speech, religion, press, assembly, and the right to bear arms. These amendments protect citizens from government overreach.'
          },
          {
            id: 'federalist-papers',
            title: 'The Federalist Papers',
            content: 'A series of 85 essays written by Alexander Hamilton, James Madison, and John Jay to promote ratification of the Constitution. These papers explain the reasoning behind the Constitution\'s structure and remain essential to understanding American government.'
          }
        ]
      },
      {
        id: 'citizenship',
        title: 'Citizenship and Civic Duty',
        description: 'The rights and responsibilities of American citizens',
        subsections: [
          {
            id: 'voting',
            title: 'Voting Rights and Responsibilities',
            content: 'Voting is both a right and a civic duty. Citizens 18 and older can vote in federal, state, and local elections. Informed voting ensures government remains accountable and representative of the people\'s will.'
          },
          {
            id: 'jury-duty',
            title: 'Jury Duty',
            content: 'Citizens may be called to serve on juries, ensuring that legal proceedings are judged by peers. Jury service is a fundamental civic responsibility that upholds the right to a fair trial.'
          },
          {
            id: 'civic-participation',
            title: 'Civic Participation',
            content: 'Beyond voting, citizens can participate in democracy through community service, attending town halls, contacting representatives, and staying informed about public issues. Active citizenship strengthens democracy.'
          }
        ]
      },
      {
        id: 'media-literacy',
        title: 'Media and Information Literacy',
        description: 'Understanding and evaluating information sources',
        subsections: [
          {
            id: 'critical-thinking',
            title: 'Critical Thinking',
            content: 'Evaluating information requires questioning sources, checking facts, and considering multiple perspectives. Critical thinking helps citizens make informed decisions and resist misinformation.'
          },
          {
            id: 'news-sources',
            title: 'Evaluating News Sources',
            content: 'Reliable news sources cite evidence, present multiple viewpoints, and correct errors. Understanding media bias and recognizing credible journalism helps citizens stay informed about important issues.'
          },
          {
            id: 'digital-citizenship',
            title: 'Digital Citizenship',
            content: 'In the digital age, citizens must navigate online information responsibly. This includes verifying facts before sharing, respecting others online, and understanding how algorithms shape what we see.'
          }
        ]
      },
      {
        id: 'symbols',
        title: 'American Symbols and Their Meaning',
        description: 'The symbols that represent American values and history',
        subsections: [
          {
            id: 'flag',
            title: 'The American Flag',
            content: 'The Stars and Stripes represents American unity and values. The 50 stars represent the states, while the 13 stripes honor the original colonies. The flag symbolizes freedom, sacrifice, and national pride.'
          },
          {
            id: 'eagle',
            title: 'The Bald Eagle',
            content: 'America\'s national bird symbolizes strength, freedom, and independence. The bald eagle appears on the Great Seal and represents the nation\'s sovereignty and enduring spirit.'
          },
          {
            id: 'liberty-bell',
            title: 'The Liberty Bell',
            content: 'This iconic bell, with its famous crack, symbolizes American independence and freedom. It rang to announce the first public reading of the Declaration of Independence and remains a powerful symbol of liberty.'
          }
        ]
      },
      {
        id: 'hymns',
        title: 'American Hymns and Heritage',
        description: 'Songs and traditions that celebrate American identity',
        subsections: [
          {
            id: 'national-anthem',
            title: 'The Star-Spangled Banner',
            content: 'Written by Francis Scott Key during the War of 1812, the national anthem celebrates American resilience and freedom. It commemorates the defense of Fort McHenry and the flag that still flew after the battle.'
          },
          {
            id: 'america-beautiful',
            title: 'America the Beautiful',
            content: 'This beloved patriotic song celebrates America\'s natural beauty and ideals. Its lyrics honor the nation\'s landscapes, heroes, and commitment to liberty and justice.'
          },
          {
            id: 'god-bless-america',
            title: 'God Bless America',
            content: 'Written by Irving Berlin, this song expresses gratitude for America and hope for its future. It has become a cherished expression of patriotism and national unity.'
          }
        ]
      },
      {
        id: 'american-experiment',
        title: 'The American Experiment',
        description: 'Understanding America as an ongoing democratic project',
        subsections: [
          {
            id: 'self-governance',
            title: 'Self-Governance',
            content: 'America was founded on the revolutionary idea that people can govern themselves. This experiment in democracy continues as each generation works to perfect the union and expand liberty.'
          },
          {
            id: 'progress',
            title: 'Progress and Reform',
            content: 'American history shows continuous efforts to live up to founding ideals. From abolition to civil rights to ongoing reforms, the nation strives to extend freedom and equality to all.'
          },
          {
            id: 'challenges',
            title: 'Challenges and Resilience',
            content: 'America has faced wars, economic crises, and social divisions, yet the democratic system has endured. Each challenge tests and strengthens the nation\'s commitment to its principles.'
          }
        ]
      },
      {
        id: 'to-be-american',
        title: 'To Be an American',
        description: 'What it means to be part of the American story',
        subsections: [
          {
            id: 'shared-values',
            title: 'Shared Values',
            content: 'Being American means embracing values of freedom, equality, and opportunity. These ideals unite people from diverse backgrounds in a common national identity.'
          },
          {
            id: 'diversity',
            title: 'Diversity and Unity',
            content: 'America\'s strength lies in its diversity. People from all backgrounds contribute to the nation\'s culture, economy, and character while sharing commitment to democratic principles.'
          },
          {
            id: 'responsibility',
            title: 'Rights and Responsibilities',
            content: 'American citizenship involves both rights and duties. Citizens enjoy freedoms protected by law while bearing responsibility to participate in democracy and serve the common good.'
          }
        ]
      }
    ]
  },
  {
    id: 'political-landscape',
    title: 'Political Landscape',
    icon: 'flag',
    description: 'Understanding America\'s political parties and movements',
    sections: [
      {
        id: 'democratic-party',
        title: 'Democratic Party',
        description: 'History, values, and positions of the Democratic Party',
        subsections: [
          {
            id: 'dem-history',
            title: 'History',
            content: 'Founded in the 1820s, the Democratic Party is one of the world\'s oldest political parties. It has evolved significantly, from supporting states\' rights to championing civil rights and social programs.'
          },
          {
            id: 'dem-values',
            title: 'Core Values',
            content: 'Democrats generally support social equality, environmental protection, labor rights, and government programs to address social needs. They emphasize collective action to solve societal problems.'
          },
          {
            id: 'dem-positions',
            title: 'Policy Positions',
            content: 'Democratic policies typically include expanding healthcare access, addressing climate change, supporting public education, protecting voting rights, and promoting economic equality through progressive taxation.'
          }
        ]
      },
      {
        id: 'republican-party',
        title: 'Republican Party',
        description: 'History, values, and positions of the Republican Party',
        subsections: [
          {
            id: 'rep-history',
            title: 'History',
            content: 'Founded in 1854 to oppose slavery\'s expansion, the Republican Party elected Abraham Lincoln as its first president. The party has championed free markets, individual liberty, and limited government.'
          },
          {
            id: 'rep-values',
            title: 'Core Values',
            content: 'Republicans generally emphasize individual freedom, free enterprise, limited government, strong national defense, and traditional values. They favor market solutions over government intervention.'
          },
          {
            id: 'rep-positions',
            title: 'Policy Positions',
            content: 'Republican policies typically include lower taxes, reduced regulation, strong military, protecting Second Amendment rights, promoting school choice, and limiting federal government power.'
          }
        ]
      },
      {
        id: 'libertarian-party',
        title: 'Libertarian Party',
        description: 'The principles and positions of the Libertarian Party',
        subsections: [
          {
            id: 'lib-overview',
            title: 'Overview',
            content: 'Founded in 1971, the Libertarian Party is the third-largest political party in America. It advocates for maximum individual freedom and minimum government intervention in both personal and economic matters.'
          },
          {
            id: 'lib-principles',
            title: 'Core Principles',
            content: 'Libertarians believe in personal liberty, free markets, non-interventionist foreign policy, and civil liberties. They oppose government restrictions on individual choice and economic activity.'
          },
          {
            id: 'lib-positions',
            title: 'Policy Positions',
            content: 'Libertarian policies include ending the war on drugs, reducing military spending, eliminating most regulations, protecting privacy rights, and dramatically reducing government size and spending.'
          }
        ]
      },
      {
        id: 'green-party',
        title: 'Green Party',
        description: 'Environmental and social justice focus of the Green Party',
        subsections: [
          {
            id: 'green-overview',
            title: 'Overview',
            content: 'The Green Party emphasizes environmental protection, social justice, grassroots democracy, and nonviolence. It offers an alternative to the two major parties focused on ecological sustainability.'
          },
          {
            id: 'green-values',
            title: 'Core Values',
            content: 'Green Party values include ecological wisdom, social justice, grassroots democracy, nonviolence, decentralization, and respect for diversity. These principles guide all policy positions.'
          },
          {
            id: 'green-positions',
            title: 'Policy Positions',
            content: 'Green policies include aggressive climate action, renewable energy transition, universal healthcare, living wages, campaign finance reform, and ending corporate influence in politics.'
          }
        ]
      },
      {
        id: 'constitution-party',
        title: 'Constitution Party',
        description: 'Constitutional principles and conservative values',
        subsections: [
          {
            id: 'const-overview',
            title: 'Overview',
            content: 'The Constitution Party advocates for a strict interpretation of the Constitution, limited federal government, and traditional moral values. It represents conservative and religious perspectives.'
          },
          {
            id: 'const-principles',
            title: 'Core Principles',
            content: 'Constitution Party principles include strict constitutional limits on government, states\' rights, traditional family values, and opposition to federal overreach in areas reserved to states.'
          },
          {
            id: 'const-positions',
            title: 'Policy Positions',
            content: 'Constitution Party policies include ending federal involvement in education, protecting life from conception, defending Second Amendment rights, and returning to constitutional money backed by precious metals.'
          }
        ]
      },
      {
        id: 'independent',
        title: 'Independent and Local Movements',
        description: 'Non-party affiliated voters and grassroots movements',
        subsections: [
          {
            id: 'independents',
            title: 'Independent Voters',
            content: 'A growing number of Americans identify as independent, not affiliated with any party. These voters often decide elections and represent diverse viewpoints not captured by party platforms.'
          },
          {
            id: 'local-movements',
            title: 'Local Political Movements',
            content: 'Grassroots movements address local issues and can influence national politics. These movements demonstrate democracy in action as citizens organize around shared concerns.'
          },
          {
            id: 'third-parties',
            title: 'Role of Third Parties',
            content: 'While rarely winning major elections, third parties introduce new ideas, influence major party platforms, and provide alternatives for voters dissatisfied with the two-party system.'
          }
        ]
      }
    ]
  },
  {
    id: 'principles-practice',
    title: 'Principles in Practice',
    icon: 'balance-scale',
    description: 'How American values are applied in society and governance',
    sections: [
      {
        id: 'freedom-responsibility',
        title: 'Freedom and Responsibility',
        description: 'Balancing individual liberty with social responsibility',
        subsections: [
          {
            id: 'individual-freedom',
            title: 'Individual Freedom',
            content: 'Americans value personal liberty to make choices about their lives, beliefs, and pursuits. This freedom is protected by law but comes with responsibility to respect others\' rights.'
          },
          {
            id: 'social-responsibility',
            title: 'Social Responsibility',
            content: 'Freedom exists within a community context. Citizens have responsibilities to contribute to society, follow laws, and consider how their actions affect others.'
          },
          {
            id: 'balancing-act',
            title: 'The Balancing Act',
            content: 'American democracy constantly balances individual rights with collective needs. This tension drives debates about government\'s proper role and the limits of personal freedom.'
          }
        ]
      },
      {
        id: 'faith-morality',
        title: 'Faith and Morality in Public Life',
        description: 'The role of religion and ethics in American society',
        subsections: [
          {
            id: 'religious-freedom',
            title: 'Religious Freedom',
            content: 'The First Amendment protects religious practice while preventing government establishment of religion. This balance allows faith to flourish while ensuring religious liberty for all.'
          },
          {
            id: 'faith-public-square',
            title: 'Faith in the Public Square',
            content: 'Religious values influence many Americans\' political views and civic engagement. Faith communities have historically driven social reform and charitable work.'
          },
          {
            id: 'secular-governance',
            title: 'Secular Governance',
            content: 'While many Americans are religious, government remains secular to protect all citizens\' rights. Laws must serve public purposes beyond religious doctrine.'
          }
        ]
      },
      {
        id: 'tradition-progress',
        title: 'Tradition and Progress',
        description: 'Honoring the past while embracing the future',
        subsections: [
          {
            id: 'preserving-tradition',
            title: 'Preserving Tradition',
            content: 'American traditions connect us to our history and provide stability. Respecting established institutions and customs helps maintain social cohesion and national identity.'
          },
          {
            id: 'embracing-change',
            title: 'Embracing Change',
            content: 'Progress requires adapting to new circumstances and correcting past injustices. America\'s strength lies partly in its ability to evolve while maintaining core principles.'
          },
          {
            id: 'dynamic-tension',
            title: 'Dynamic Tension',
            content: 'The interplay between tradition and progress drives American development. Debates about change versus continuity reflect different visions of how to honor the past while building the future.'
          }
        ]
      },
      {
        id: 'equality-merit',
        title: 'Equality and Merit',
        description: 'Balancing equal opportunity with individual achievement',
        subsections: [
          {
            id: 'equal-opportunity',
            title: 'Equal Opportunity',
            content: 'America aspires to provide everyone equal chances to succeed regardless of background. This ideal requires removing barriers and ensuring fair access to education, employment, and advancement.'
          },
          {
            id: 'meritocracy',
            title: 'Meritocracy',
            content: 'Americans value rewarding hard work, talent, and achievement. A merit-based system encourages excellence and innovation while recognizing individual contributions.'
          },
          {
            id: 'equity-debates',
            title: 'Equity Debates',
            content: 'Americans debate how to achieve fairness: through equal treatment or through measures addressing historical disadvantages. These discussions reflect different understandings of justice and opportunity.'
          }
        ]
      },
      {
        id: 'role-government',
        title: 'The Role of Government',
        description: 'Debates about government\'s proper size and function',
        subsections: [
          {
            id: 'limited-government',
            title: 'Limited Government',
            content: 'Many Americans believe government should be limited to essential functions, allowing maximum personal and economic freedom. This view emphasizes individual responsibility and private solutions.'
          },
          {
            id: 'active-government',
            title: 'Active Government',
            content: 'Others believe government should actively address social problems, regulate markets, and provide services. This view emphasizes collective action to ensure opportunity and security for all.'
          },
          {
            id: 'practical-governance',
            title: 'Practical Governance',
            content: 'Most Americans support government action in some areas while favoring private solutions in others. The debate centers on where to draw these lines and how to balance competing values.'
          }
        ]
      },
      {
        id: 'community-common-good',
        title: 'Community and the Common Good',
        description: 'Balancing individual interests with collective welfare',
        subsections: [
          {
            id: 'individualism',
            title: 'American Individualism',
            content: 'American culture celebrates individual achievement, self-reliance, and personal freedom. This individualism drives innovation and entrepreneurship.'
          },
          {
            id: 'community-bonds',
            title: 'Community Bonds',
            content: 'Despite individualism, Americans form strong communities through families, neighborhoods, churches, and civic organizations. These bonds provide support and foster cooperation.'
          },
          {
            id: 'common-good',
            title: 'The Common Good',
            content: 'Democracy requires balancing individual interests with collective welfare. Citizens must consider how their choices affect others and contribute to shared prosperity and security.'
          }
        ]
      },
      {
        id: 'national-global',
        title: 'National Identity and Global Responsibility',
        description: 'America\'s role in the world',
        subsections: [
          {
            id: 'national-interest',
            title: 'National Interest',
            content: 'American foreign policy prioritizes national security, economic prosperity, and protecting citizens\' interests. This includes maintaining strong defense and beneficial trade relationships.'
          },
          {
            id: 'global-leadership',
            title: 'Global Leadership',
            content: 'As a major power, America influences world affairs through diplomacy, alliances, and international institutions. This leadership role brings both opportunities and responsibilities.'
          },
          {
            id: 'international-cooperation',
            title: 'International Cooperation',
            content: 'Global challenges like climate change, terrorism, and pandemics require international cooperation. Americans debate how to balance national sovereignty with global engagement.'
          }
        ]
      }
    ]
  },
  {
    id: 'land-life',
    title: 'Land and Life',
    icon: 'globe',
    description: 'America\'s geography, people, and heritage',
    sections: [
      {
        id: 'geography',
        title: 'Geography and Scale',
        description: 'The vast and diverse American landscape',
        subsections: [
          {
            id: 'continental-expanse',
            title: 'Continental Expanse',
            content: 'The United States spans a continent, from Atlantic to Pacific, encompassing diverse climates and terrains. This geographic diversity shapes regional cultures and economic activities.'
          },
          {
            id: 'regions',
            title: 'Regional Diversity',
            content: 'America includes distinct regions: the Northeast\'s historic cities, the South\'s agricultural heritage, the Midwest\'s industrial heartland, the West\'s frontier spirit, and unique characteristics of Alaska and Hawaii.'
          },
          {
            id: 'natural-features',
            title: 'Natural Features',
            content: 'From the Rocky Mountains to the Mississippi River, from the Great Lakes to the Grand Canyon, America\'s natural features inspire awe and shape national identity.'
          }
        ]
      },
      {
        id: 'natural-wealth',
        title: 'Natural Wealth',
        description: 'America\'s abundant natural resources',
        subsections: [
          {
            id: 'resources',
            title: 'Natural Resources',
            content: 'America possesses abundant natural resources including fertile farmland, forests, minerals, oil, and natural gas. These resources have fueled economic development and prosperity.'
          },
          {
            id: 'agriculture',
            title: 'Agricultural Abundance',
            content: 'American agriculture feeds the nation and much of the world. Diverse climates enable production of grains, fruits, vegetables, and livestock across different regions.'
          },
          {
            id: 'conservation',
            title: 'Conservation and Stewardship',
            content: 'National parks, forests, and protected areas preserve natural beauty and biodiversity. Americans balance resource use with conservation for future generations.'
          }
        ]
      },
      {
        id: 'american-people',
        title: 'The American People',
        description: 'The diverse population that makes up America',
        subsections: [
          {
            id: 'immigration',
            title: 'A Nation of Immigrants',
            content: 'America was built by immigrants from around the world. This heritage of immigration continues to shape American culture, economy, and identity.'
          },
          {
            id: 'cultural-diversity',
            title: 'Cultural Diversity',
            content: 'Americans come from countless ethnic, religious, and cultural backgrounds. This diversity enriches national life through varied traditions, cuisines, arts, and perspectives.'
          },
          {
            id: 'shared-identity',
            title: 'Shared American Identity',
            content: 'Despite diverse backgrounds, Americans share common values, language, and civic culture. This shared identity unites people in a common national project.'
          }
        ]
      },
      {
        id: 'defense-stewardship',
        title: 'Defense and Stewardship',
        description: 'Protecting and preserving America',
        subsections: [
          {
            id: 'national-defense',
            title: 'National Defense',
            content: 'The military protects American security and interests. Service members defend the nation and its values, often at great personal sacrifice.'
          },
          {
            id: 'environmental-stewardship',
            title: 'Environmental Stewardship',
            content: 'Americans increasingly recognize the importance of protecting the environment. Efforts to address pollution, climate change, and habitat loss reflect commitment to future generations.'
          },
          {
            id: 'civic-stewardship',
            title: 'Civic Stewardship',
            content: 'Citizens have a responsibility to preserve democratic institutions and values. Each generation must defend and strengthen the republic for those who follow.'
          }
        ]
      },
      {
        id: 'chronicle',
        title: 'Chronicle of the Republic',
        description: 'Key moments in American history',
        subsections: [
          {
            id: 'founding-era',
            title: 'The Founding Era',
            content: 'From colonial settlement through the Revolution and Constitution, the founding era established American independence and democratic government.'
          },
          {
            id: 'expansion-conflict',
            title: 'Expansion and Conflict',
            content: 'The 19th century saw westward expansion, the Civil War, and Reconstruction. These events tested and transformed the nation, ending slavery and redefining citizenship.'
          },
          {
            id: 'modern-america',
            title: 'Modern America',
            content: 'The 20th and 21st centuries brought industrialization, world wars, civil rights movements, technological revolution, and America\'s emergence as a global superpower.'
          }
        ]
      },
      {
        id: 'stewards-shapers',
        title: 'Stewards and Shapers',
        description: 'Notable Americans who shaped the nation',
        subsections: [
          {
            id: 'founders',
            title: 'The Founders',
            content: 'George Washington, Thomas Jefferson, Benjamin Franklin, James Madison, and others established American government and articulated its founding principles.'
          },
          {
            id: 'reformers',
            title: 'Reformers and Leaders',
            content: 'Abraham Lincoln, Frederick Douglass, Susan B. Anthony, Martin Luther King Jr., and countless others fought to expand freedom and equality.'
          },
          {
            id: 'innovators',
            title: 'Innovators and Builders',
            content: 'American inventors, entrepreneurs, artists, and thinkers have driven progress in technology, business, culture, and ideas, shaping modern life.'
          }
        ]
      },
      {
        id: 'unity-continuance',
        title: 'Unity and Continuance',
        description: 'Maintaining national unity and democratic continuity',
        subsections: [
          {
            id: 'e-pluribus-unum',
            title: 'E Pluribus Unum',
            content: '"Out of many, one" - America\'s motto reflects the challenge of forging unity from diversity. Despite differences, Americans share commitment to democratic values and national community.'
          },
          {
            id: 'peaceful-transition',
            title: 'Peaceful Transition of Power',
            content: 'America\'s tradition of peaceful power transitions demonstrates democratic stability. Elections allow change without violence, ensuring government remains accountable to the people.'
          },
          {
            id: 'future-generations',
            title: 'Responsibility to Future Generations',
            content: 'Each generation inherits the republic and must preserve it for the next. This continuity requires active citizenship, civic education, and commitment to democratic principles.'
          }
        ]
      }
    ]
  }
];

export function getSectionById(sectionId: string): MainSection | undefined {
  return contentData.find(section => section.id === sectionId);
}

export function getSubSectionById(mainSectionId: string, sectionId: string, subsectionId: string): SubSection | undefined {
  const mainSection = getSectionById(mainSectionId);
  if (!mainSection) return undefined;
  
  const section = mainSection.sections.find(s => s.id === sectionId);
  if (!section) return undefined;
  
  return section.subsections.find(ss => ss.id === subsectionId);
}
