
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

export const principlespracticeData: MainSection = {
  id: "principles-practice",
  title: "Principles in Practice",
  icon: "balance",
  description: "How American principles operate in real world systems and civic life",
  sections: [
    {
      id: "core-tensions",
      title: "Core Tensions",
      description: "The fundamental tensions that shape American political life",
      subsections: [
        {
          id: "freedom-responsibility",
          title: "Freedom and Responsibility",
          content:
            "Freedom and responsibility are two sides of the same coin in American life. Freedom means the ability to make choices, to pursue one's own goals, and to live according to one's own values. Responsibility means accepting the consequences of those choices and recognizing that freedom depends on self restraint and respect for others.\n\nThe American system trusts individuals to make their own decisions, but it also expects them to act with integrity and to consider the impact of their actions on others. This balance is not always easy to maintain. Too much emphasis on freedom can lead to selfishness and disorder. Too much emphasis on responsibility can lead to conformity and the loss of individual initiative.\n\nIn practice, this tension plays out in debates about everything from business regulation to personal behavior. Should people be free to start businesses without government interference, or should there be rules to protect workers and consumers? Should individuals be free to make their own health care decisions, or should society ensure that everyone has access to care? These questions do not have simple answers, but they reflect the ongoing effort to balance freedom and responsibility.\n\nThe best outcomes often come when people exercise their freedom with a sense of responsibility, and when society protects freedom while also holding people accountable for harm they cause. This requires judgment, humility, and a willingness to engage in good faith debate about where the lines should be drawn.",
        },
        {
          id: "faith-morality",
          title: "Faith and Morality in Public Life",
          content:
            "Faith and morality have always played a significant role in American public life. Many of the nation's founders were influenced by religious beliefs, and many social movements, from abolition to civil rights, have been led by people of faith. At the same time, the Constitution prohibits the establishment of an official religion and protects the free exercise of all faiths.\n\nThis creates a tension between allowing religious voices to participate in public debate and ensuring that government does not favor one religion over another. People of faith often argue that their beliefs should inform their political positions and that excluding religious perspectives from public life is unfair and impractical. Others worry that allowing religion to influence policy can lead to discrimination and the imposition of one group's values on everyone else.\n\nIn practice, Americans have found ways to navigate this tension. Religious organizations run schools, hospitals, and charities that serve people of all backgrounds. Religious leaders speak out on issues of justice and morality, and their voices are part of the broader conversation. At the same time, laws are expected to have secular justifications and to respect the rights of those who do not share the majority's beliefs.\n\nThe challenge is to honor the role of faith in shaping values and motivating action, while also protecting the rights of those who hold different beliefs or no religious beliefs at all. This requires mutual respect, a commitment to pluralism, and a recognition that people of good will can disagree about the proper role of religion in public life.",
        },
        {
          id: "tradition-progress",
          title: "Tradition and Progress",
          content:
            "Tradition and progress represent two different approaches to change. Tradition emphasizes the wisdom of the past, the importance of continuity, and the value of institutions that have stood the test of time. Progress emphasizes the need for reform, the possibility of improvement, and the importance of adapting to new circumstances.\n\nAmerica has always been shaped by both impulses. The founders drew on centuries of political thought and experience, but they also created something new. The Constitution itself balances tradition and progress by establishing enduring principles while allowing for amendments and reinterpretation.\n\nIn practice, this tension plays out in debates about everything from education to criminal justice. Should schools teach traditional subjects and values, or should they embrace new methods and perspectives? Should the legal system rely on precedent and established practices, or should it adapt to changing social norms? These questions do not have simple answers, but they reflect the ongoing effort to honor the past while remaining open to the future.\n\nThe best outcomes often come when tradition and progress are seen not as opposites but as complements. Tradition provides stability and a sense of identity, while progress allows for growth and correction of past mistakes. A healthy society respects its heritage while also being willing to change when change is needed.",
        },
        {
          id: "equality-merit",
          title: "Equality and Merit",
          content:
            "Equality and merit are both central to the American ideal, but they can sometimes pull in different directions. Equality means that all people have the same basic rights and should be treated fairly under the law. Merit means that people should be rewarded based on their abilities, effort, and achievements.\n\nThe tension arises when people start from unequal positions. If some have access to better schools, more resources, or stronger networks, then a system based purely on merit may perpetuate existing inequalities. On the other hand, if outcomes are equalized without regard to effort or ability, then the incentive to work hard and excel may be weakened.\n\nIn practice, Americans have tried to balance these values by ensuring equal opportunity while allowing for unequal outcomes. This means removing barriers based on race, gender, or background, while also recognizing that people will achieve different levels of success based on their choices and talents. It means providing a safety net for those who fall behind, while also rewarding those who excel.\n\nThe challenge is to create a society where everyone has a fair chance to succeed, but where success is still earned rather than guaranteed. This requires both removing unjust obstacles and maintaining standards of excellence. It requires both compassion for those who struggle and respect for those who achieve.",
        },
      ],
    },
    {
      id: "role-government",
      title: "The Role of Government",
      description: "Debates about what government should and should not do",
      subsections: [
        {
          id: "limited-vs-active",
          title: "Limited vs. Active Government",
          content:
            "One of the most enduring debates in American politics is about the proper size and scope of government. Should government be limited to protecting rights and providing basic services, or should it play an active role in addressing social and economic problems?\n\nThose who favor limited government argue that individuals and communities are better at solving problems than distant bureaucrats. They believe that government intervention often creates unintended consequences, stifles innovation, and reduces personal freedom. They point to the success of free markets and voluntary associations as evidence that people can thrive without heavy handed regulation.\n\nThose who favor active government argue that markets alone cannot address issues like poverty, pollution, or discrimination. They believe that government has a responsibility to protect the vulnerable, to provide public goods, and to ensure that everyone has access to basic necessities like health care and education. They point to programs like Social Security and Medicare as evidence that government can improve people's lives.\n\nIn practice, most Americans fall somewhere in the middle. They want government to be effective but not intrusive, to provide a safety net but not to stifle initiative. The challenge is to find the right balance, and that balance may shift depending on circumstances and values.",
        },
        {
          id: "federalism-practice",
          title: "Federalism in Practice",
          content:
            "Federalism divides power between the national government and the states, but the line between federal and state authority has always been contested. Some issues, like national defense and interstate commerce, clearly belong to the federal government. Others, like education and policing, are primarily state and local responsibilities. But many issues fall into a gray area.\n\nIn practice, federalism allows for experimentation and diversity. States can try different approaches to problems, and successful policies can be adopted by others. This is sometimes called the laboratory of democracy. It also allows regions to reflect their own values and priorities, so that a policy that works in one state may not be imposed on another.\n\nHowever, federalism can also lead to inequality and conflict. If some states provide better services or stronger protections than others, then people's rights and opportunities may depend on where they live. And when states and the federal government disagree, the result can be legal battles and confusion.\n\nThe challenge is to preserve the benefits of federalism—diversity, experimentation, and local control—while also ensuring that basic rights and standards are protected nationwide. This requires ongoing negotiation and a willingness to respect both state autonomy and national unity.",
        },
      ],
    },
    {
      id: "community-common-good",
      title: "Community and the Common Good",
      description: "Balancing individual rights with collective responsibilities",
      subsections: [
        {
          id: "individualism-community",
          title: "Individualism and Community",
          content:
            "American culture celebrates individualism, but individuals do not exist in isolation. People are born into families, grow up in communities, and depend on others for support, education, and opportunity. The challenge is to honor individual freedom while also recognizing the importance of community and the common good.\n\nIndividualism emphasizes personal responsibility, self reliance, and the right to pursue one's own goals. It has inspired countless stories of people who overcame obstacles and achieved success through hard work and determination. But individualism can also lead to isolation, competition, and a lack of concern for others.\n\nCommunity emphasizes connection, cooperation, and shared responsibility. It recognizes that people are stronger together and that some problems can only be solved through collective action. But an overemphasis on community can lead to conformity, the suppression of individual initiative, and the tyranny of the majority.\n\nThe best outcomes often come when individuals see themselves as part of a larger whole, and when communities respect the rights and dignity of each person. This requires a balance between personal freedom and social responsibility, between pursuing one's own interests and contributing to the common good.",
        },
        {
          id: "civic-virtue",
          title: "Civic Virtue",
          content:
            "Civic virtue is the quality of being a good citizen. It includes honesty, integrity, respect for the law, and a willingness to put the common good ahead of narrow self interest. Civic virtue is not just about following rules; it is about actively contributing to the health and vitality of the community.\n\nIn a democracy, civic virtue is essential. When citizens are informed, engaged, and willing to serve, democracy thrives. When they are apathetic, cynical, or focused only on their own interests, democracy weakens. Civic virtue means voting, serving on juries, paying taxes, and obeying the law. It also means speaking up when government oversteps its bounds and defending the rights of others.\n\nCivic virtue also includes qualities like tolerance, humility, and a willingness to listen to others. It means engaging in good faith debate, respecting those who disagree, and being willing to change one's mind in light of new evidence. It means recognizing that no one has a monopoly on truth and that democracy depends on the ability of people to work together despite their differences.\n\nCivic virtue cannot be mandated by law; it must be cultivated through education, example, and practice. When citizens take their responsibilities seriously and act with integrity, they strengthen the bonds that hold society together and ensure that self government remains possible.",
        },
      ],
    },
    {
      id: "national-identity",
      title: "National Identity and Global Responsibility",
      description: "America's role in the world and its relationship to other nations",
      subsections: [
        {
          id: "american-exceptionalism",
          title: "American Exceptionalism",
          content:
            "American exceptionalism is the idea that the United States is unique among nations, with a special role to play in the world. This belief has deep roots in American history, from the Puritan vision of a city on a hill to the 20th century idea of America as the leader of the free world.\n\nSupporters of American exceptionalism argue that the United States has a unique commitment to liberty, democracy, and human rights, and that it has a responsibility to promote these values abroad. They point to America's role in defeating fascism and communism, and to its leadership in international institutions and humanitarian efforts.\n\nCritics argue that American exceptionalism can lead to arrogance, imperialism, and a disregard for the rights and perspectives of other nations. They point to America's history of slavery, segregation, and military interventions as evidence that the United States is not always a force for good. They argue that America should focus on addressing its own problems before trying to reshape the world.\n\nThe debate over American exceptionalism is ultimately a debate about America's role in the world. Should the United States lead, or should it step back? Should it promote its values abroad, or should it respect the sovereignty of other nations? These questions do not have simple answers, but they reflect the ongoing effort to define what it means to be an American in a globalized world.",
        },
        {
          id: "isolationism-interventionism",
          title: "Isolationism vs. Interventionism",
          content:
            "Isolationism and interventionism represent two different approaches to foreign policy. Isolationism emphasizes avoiding entangling alliances, focusing on domestic concerns, and staying out of foreign conflicts. Interventionism emphasizes engaging with the world, promoting American values, and using military and economic power to shape global events.\n\nIsolationists argue that America should focus on its own problems and avoid the costs and risks of foreign entanglements. They point to the failures of interventions in Vietnam, Iraq, and Afghanistan as evidence that trying to reshape other countries often backfires. They believe that America is safer and more prosperous when it minds its own business.\n\nInterventionists argue that America cannot afford to ignore the world. They believe that threats abroad can quickly become threats at home, and that American leadership is necessary to maintain global stability. They point to the success of interventions in World War II and the Cold War as evidence that America can be a force for good.\n\nIn practice, American foreign policy has oscillated between these two poles. The challenge is to find a balance that protects American interests and values without overextending the nation's resources or imposing its will on others. This requires careful judgment, a clear understanding of national interests, and a willingness to learn from past mistakes.",
        },
      ],
    },
  ],
};
