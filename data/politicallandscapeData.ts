
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

export const politicallandscapeData: MainSection = {
  id: "political-landscape",
  title: "Political Landscape",
  icon: "flag",
  description: "Understanding America's political parties and movements",
  sections: [
    {
      id: "major-parties",
      title: "Major Political Parties",
      description: "The two dominant parties in American politics",
      subsections: [
        {
          id: "democratic-party",
          title: "Democratic Party",
          content:
            "The Democratic Party is one of the two major political parties in the United States. It generally supports a larger role for government in addressing social and economic issues, including health care, education, and environmental protection. Democrats tend to emphasize equality, social justice, and the need for government to provide a safety net for those in need.\n\nThe party traces its roots to Thomas Jefferson and Andrew Jackson, though its positions have evolved significantly over time. In the 20th century, the Democratic Party became associated with the New Deal, civil rights, and progressive social policies. Today, it draws support from a diverse coalition that includes urban voters, minorities, young people, and those with higher levels of education.\n\nDemocrats generally favor policies such as expanding access to health care, raising the minimum wage, protecting voting rights, addressing climate change, and supporting labor unions. They tend to support higher taxes on the wealthy to fund social programs and infrastructure. On social issues, Democrats typically support abortion rights, LGBTQ rights, and gun control measures.\n\nCritics of the Democratic Party argue that it relies too heavily on government solutions, that its policies can stifle economic growth, and that it sometimes prioritizes identity politics over individual merit. Supporters counter that the party is committed to fairness, opportunity, and protecting the vulnerable from the excesses of unregulated markets.",
        },
        {
          id: "republican-party",
          title: "Republican Party",
          content:
            "The Republican Party is one of the two major political parties in the United States. It generally supports limited government, free markets, individual liberty, and traditional values. Republicans tend to emphasize personal responsibility, economic freedom, and the importance of local and state control over federal mandates.\n\nThe party was founded in 1854 in opposition to the expansion of slavery, and Abraham Lincoln was its first president. Over time, the Republican Party became associated with business interests, national defense, and conservative social policies. Today, it draws support from rural voters, white working class voters, evangelical Christians, and those who prioritize economic freedom and national security.\n\nRepublicans generally favor policies such as lower taxes, reduced regulation, strong national defense, border security, and protection of gun rights. They tend to support free market solutions to economic problems and are skeptical of government intervention. On social issues, Republicans typically oppose abortion, support traditional marriage, and emphasize law and order.\n\nCritics of the Republican Party argue that it favors the wealthy, that its policies can increase inequality, and that it sometimes resists necessary government action on issues like climate change and health care. Supporters counter that the party is committed to freedom, prosperity, and the principles that made America strong.",
        },
      ],
    },
    {
      id: "third-parties",
      title: "Third Parties and Movements",
      description: "Alternative political parties and independent movements",
      subsections: [
        {
          id: "libertarian-party",
          title: "Libertarian Party",
          content:
            "The Libertarian Party is the third largest political party in the United States. It advocates for maximum individual liberty, minimal government intervention, and free markets. Libertarians believe that people should be free to make their own choices in both economic and personal matters, as long as they do not harm others.\n\nThe party was founded in 1971 and has grown steadily, though it remains far smaller than the two major parties. Libertarians support policies such as ending the war on drugs, reducing military spending, eliminating most regulations, and protecting civil liberties. They oppose government surveillance, corporate subsidies, and restrictions on free speech.\n\nLibertarians are often described as fiscally conservative and socially liberal. They support gun rights, free trade, and property rights, but they also support marriage equality, drug legalization, and criminal justice reform. This combination of positions does not fit neatly into the traditional left right spectrum, which can make the party appealing to voters who feel alienated by the major parties.\n\nCritics argue that libertarian policies would lead to inequality, environmental degradation, and a lack of social safety nets. Supporters counter that freedom and voluntary cooperation produce better outcomes than government coercion, and that individuals are better judges of their own interests than distant bureaucrats.",
        },
        {
          id: "green-party",
          title: "Green Party",
          content:
            "The Green Party is a political party that emphasizes environmental protection, social justice, grassroots democracy, and nonviolence. It advocates for policies to address climate change, reduce pollution, and promote sustainable development. The party also supports universal health care, living wages, and campaign finance reform.\n\nThe Green Party was founded in the United States in the 1980s, drawing inspiration from green parties in Europe. It has had limited electoral success, but it has influenced the national conversation on environmental issues and has won some local and state elections. The party's most prominent presidential candidate was Ralph Nader, who ran in 2000 and was blamed by some for costing Al Gore the election.\n\nGreens support policies such as transitioning to renewable energy, ending fossil fuel subsidies, protecting public lands, and promoting organic agriculture. They also advocate for social justice, including racial and economic equality, and they oppose military intervention and corporate influence in politics.\n\nCritics argue that the Green Party is too idealistic, that its policies would harm the economy, and that voting for Green candidates can split the progressive vote and help conservatives win. Supporters counter that the major parties are too beholden to corporate interests and that bold action is needed to address the climate crisis and social inequality.",
        },
        {
          id: "constitution-party",
          title: "Constitution Party",
          content:
            "The Constitution Party is a conservative political party that emphasizes strict adherence to the U.S. Constitution, limited government, and traditional Christian values. It advocates for policies that it believes reflect the original intent of the founders, including states' rights, opposition to abortion, and restrictions on immigration.\n\nThe party was founded in 1992 and has had limited electoral success, but it has a dedicated base of supporters who believe that the major parties have strayed from constitutional principles. The Constitution Party supports policies such as ending federal involvement in education, withdrawing from international organizations like the United Nations, and protecting gun rights.\n\nThe party is strongly pro life, opposes same sex marriage, and supports strict immigration enforcement. It also advocates for a non interventionist foreign policy, arguing that the United States should avoid entangling alliances and focus on defending its own borders.\n\nCritics argue that the Constitution Party's positions are too extreme, that its interpretation of the Constitution is selective, and that its social policies are out of step with modern values. Supporters counter that the party is committed to the principles that made America great and that it offers a clear alternative to the compromises of the major parties.",
        },
        {
          id: "independent-movements",
          title: "Independent and Local Movements",
          content:
            "Independent and local movements represent a diverse array of political efforts that operate outside the traditional party structure. These movements can be issue focused, such as campaigns for campaign finance reform, voting rights, or local environmental protection. They can also be candidate focused, supporting individuals who run without party affiliation.\n\nIndependent voters make up a significant and growing portion of the American electorate. Many feel that the major parties do not represent their views or that partisan politics has become too divisive. Independent movements often emphasize pragmatism, problem solving, and a willingness to work across party lines.\n\nLocal movements can have a significant impact on their communities, even if they do not achieve national prominence. They can push for changes in local government, advocate for specific policies, or mobilize voters around shared concerns. These movements often rely on grassroots organizing, social media, and direct engagement with citizens.\n\nCritics argue that independent and local movements lack the resources and organization to compete with the major parties, and that they can fragment the political landscape. Supporters counter that these movements bring fresh ideas, hold the major parties accountable, and give voice to those who feel left out of the political process.",
        },
      ],
    },
  ],
};
