// data/glossaryData.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const GLOSSARY_CACHE_KEY = "glossaryData_cache_v2";

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedIds?: string[];
}

// Full, corrected, and perfectly sorted glossary
const createGlossaryData = (): GlossaryTerm[] => [
  {
    id: "amendment",
    term: "Amendment",
    definition: "A formal change or addition to the Constitution. The amendment process requires approval by two-thirds of both houses of Congress and ratification by three-fourths of state legislatures.",
    relatedIds: ["constitution", "bill-of-rights"],
  },
  {
    id: "amendment-process-term",
    term: "Amendment Process",
    definition: "The formal procedure for altering the Constitution, requiring proposal by two-thirds of Congress and ratification by three-fourths of the states.",
    relatedIds: ["amendment", "constitution-term"],
  },
  {
    id: "article-term",
    term: "Article",
    definition: "A principal section of the United States Constitution. Each Article outlines specific powers, structures, and responsibilities of the federal government.",
    relatedIds: ["constitution-term", "separation-powers-term"],
  },
  {
    id: "appropriation-term",
    term: "Appropriation",
    definition: "Legislation passed by Congress that authorizes federal spending for specific purposes. No money may be drawn from the Treasury without an appropriation.",
    relatedIds: ["legislative", "federal-budget-term"],
  },
  {
    id: "bicameral-term",
    term: "Bicameral",
    definition: "A legislature with two chambers or houses. The U.S. Congress is bicameral, consisting of the Senate and the House of Representatives.",
    relatedIds: ["legislative"],
  },
  {
    id: "bill-of-rights-term",
    term: "Bill of Rights",
    definition: "The first ten amendments to the Constitution, ratified in 1791, which guarantee fundamental rights and freedoms such as freedom of speech, religion, and the press.",
    relatedIds: ["bill-of-rights", "freedom-speech", "freedom-religion"],
  },
  {
    id: "bureaucracy-term",
    term: "Bureaucracy",
    definition: "The system of federal agencies, departments, and officials who carry out and enforce laws passed by Congress.",
    relatedIds: ["executive", "rulemaking-term"],
  },
  {
    id: "cabinet-term",
    term: "Cabinet",
    definition: "A group of the President’s top advisors, consisting of the heads of executive departments who help implement federal laws and policies.",
    relatedIds: ["executive"],
  },
  {
    id: "cabinet-department-term",
    term: "Cabinet Department",
    definition: "One of the major administrative units of the federal government, headed by a Secretary who also serves as a member of the President’s Cabinet.",
    relatedIds: ["cabinet-term", "executive-branch-term"],
  },
  {
    id: "census-term",
    term: "Census",
    definition: "An official count of the population conducted every ten years, used to determine representation in the House of Representatives and allocate federal funds.",
    relatedIds: ["legislative"],
  },
  {
    id: "checks-balances-term",
    term: "Checks and Balances",
    definition: "A system that allows each branch of government to limit the powers of the other branches, preventing any one branch from becoming too powerful.",
    relatedIds: ["checks-balances", "separation-powers"],
  },
  {
    id: "civil-liberties-term",
    term: "Civil Liberties",
    definition: "Fundamental individual rights protected by law from government interference, including freedom of speech, religion, and the right to due process.",
    relatedIds: ["bill-of-rights", "freedom-speech", "freedom-religion"],
  },
  {
    id: "civil-rights-term",
    term: "Civil Rights",
    definition: "The rights of citizens to political and social freedom and equality, particularly protection from discrimination based on race, gender, religion, or other characteristics.",
    relatedIds: ["life-liberty"],
  },
  {
    id: "common-good-term",
    term: "Common Good",
    definition: "The benefit or interests of all members of a community, often used to justify government action that serves the collective welfare.",
    relatedIds: ["community-common-good", "common-good"],
  },
  {
    id: "common-law-term",
    term: "Common Law",
    definition: "Law developed through judicial decisions and precedent rather than statutes passed by legislatures.",
    relatedIds: ["precedent-term", "judicial"],
  },
  {
    id: "concurrent-powers-term",
    term: "Concurrent Powers",
    definition: "Powers shared by both the federal government and state governments, such as taxation and law enforcement.",
    relatedIds: ["federalism-term", "reserved-powers-term"],
  },
  {
    id: "consent-governed-term",
    term: "Consent of the Governed",
    definition: "The principle that a government’s legitimacy comes from the authority granted to it by the people.",
    relatedIds: ["social-contract-term", "republic-term"],
  },
  {
    id: "congressional-district-term",
    term: "Congressional District",
    definition: "A geographic area represented by a member of the House of Representatives. The boundaries of these districts are redrawn after each census.",
    relatedIds: ["census-term", "gerrymandering-term"],
  },
  {
    id: "constitutional-convention-term",
    term: "Constitutional Convention",
    definition: "A formal meeting called to create or revise a constitution. The most famous example is the 1787 convention that produced the U.S. Constitution.",
    relatedIds: ["constitution-term", "article-term"],
  },
  {
    id: "constitutional-crisis-term",
    term: "Constitutional Crisis",
    definition: "A situation where constitutional guidance is unclear or competing branches of government challenge one another’s authority.",
    relatedIds: ["checks-balances-term", "separation-powers-term"],
  },
  {
    id: "constitution-term",
    term: "Constitution",
    definition: "The supreme law of the United States, establishing the framework of the federal government and defining the relationship between the government and the people.",
    relatedIds: ["constitution", "rule-of-law"],
  },
  {
    id: "constituency-term",
    term: "Constituency",
    definition: "The body of voters in a specified area who elect a representative to a legislative body. Representatives are expected to serve the interests of their constituency.",
    relatedIds: ["legislative"],
  },
  {
    id: "delegated-powers-term",
    term: "Delegated Powers",
    definition: "Powers assigned to the federal government by the Constitution, including enumerated, implied, and inherent powers.",
    relatedIds: ["enumerated-powers-term", "constitution-term"],
  },
  {
    id: "democracy-term",
    term: "Democracy",
    definition: "A system of government in which power is vested in the people, who rule either directly or through freely elected representatives.",
    relatedIds: ["democracy", "republicanism"],
  },
  {
    id: "due-process-term",
    term: "Due Process",
    definition: "The constitutional guarantee that the government must respect all legal rights owed to a person. It ensures fair treatment through the judicial system.",
    relatedIds: ["bill-of-rights", "rule-of-law"],
  },
  {
    id: "electoral-college-term",
    term: "Electoral College",
    definition: "The body of electors established by the Constitution that formally elects the President and Vice President of the United States.",
    relatedIds: ["executive", "constitution"],
  },
  {
    id: "enumerated-powers-term",
    term: "Enumerated Powers",
    definition: "Powers explicitly granted to Congress by the Constitution, including taxation, declaring war, and regulating commerce.",
    relatedIds: ["constitution-term", "legislative"],
  },
  {
    id: "executive-branch-term",
    term: "Executive Branch",
    definition: "The branch of government responsible for enforcing laws, led by the President and supported by federal agencies and departments.",
    relatedIds: ["executive", "separation-powers-term"],
  },
  {
    id: "executive-order-term",
    term: "Executive Order",
    definition: "A directive issued by the President that manages operations of the federal government and has the force of law.",
    relatedIds: ["executive"],
  },
  {
    id: "executive-privilege-term",
    term: "Executive Privilege",
    definition: "The President’s right to withhold certain information from Congress or the courts when disclosure would harm national interests.",
    relatedIds: ["executive", "checks-balances-term"],
  },
  {
    id: "federal-agency-term",
    term: "Federal Agency",
    definition: "An organization within the federal government responsible for carrying out specific duties, programs, or regulations.",
    relatedIds: ["bureaucracy-term", "executive"],
  },
  {
    id: "federal-budget-term",
    term: "Federal Budget",
    definition: "The government’s annual plan outlining expected revenue and authorized spending for federal programs and operations.",
    relatedIds: ["appropriation-term", "legislative"],
  },
  {
    id: "federal-courts-term",
    term: "Federal Courts",
    definition: "The system of courts established by the Constitution and Congress, consisting of District Courts, Circuit Courts of Appeals, and the Supreme Court.",
    relatedIds: ["judicial", "judicial-review-term"],
  },
  {
    id: "federal-register-term",
    term: "Federal Register",
    definition: "The official daily publication in which the federal government issues proposed rules, regulations, and notices.",
    relatedIds: ["rulemaking-term", "bureaucracy-term"],
  },
  {
    id: "federalism-term",
    term: "Federalism",
    definition: "A system of government in which power is divided between a central authority and constituent political units (states), allowing both to govern within their respective spheres.",
    relatedIds: ["federalism", "separation-powers"],
  },
  {
    id: "filibuster-term",
    term: "Filibuster",
    definition: "A legislative tactic used in the Senate to delay or prevent a vote on a bill by extending debate indefinitely.",
    relatedIds: ["legislative"],
  },
  {
    id: "gerrymandering-term",
    term: "Gerrymandering",
    definition: "The practice of drawing electoral district boundaries to favor one political party or group over another.",
    relatedIds: ["legislative"],
  },
  {
    id: "grassroots-term",
    term: "Grassroots",
    definition: "Political activity or movements that originate from ordinary citizens at the local level rather than from political leaders or organizations.",
    relatedIds: ["civic-participation", "local-movements"],
  },
  {
    id: "habeas-corpus-term",
    term: "Habeas Corpus",
    definition: "A legal principle that protects against unlawful and indefinite imprisonment, requiring that a person be brought before a court to determine if their detention is lawful.",
    relatedIds: ["bill-of-rights", "rule-of-law"],
  },
  {
    id: "impeachment-term",
    term: "Impeachment",
    definition: "The process by which a legislative body brings charges against a government official for misconduct. The House of Representatives has the sole power to impeach, while the Senate conducts the trial.",
    relatedIds: ["legislative", "executive", "checks-balances"],
  },
  {
    id: "implied-powers-term",
    term: "Implied Powers",
    definition: "Powers not explicitly listed in the Constitution but considered necessary for carrying out enumerated powers, justified by the Necessary and Proper Clause.",
    relatedIds: ["enumerated-powers-term", "constitution-term"],
  },
  {
    id: "incumbent-term",
    term: "Incumbent",
    definition: "The current holder of a political office, often having advantages in reelection campaigns due to name recognition and access to resources.",
    relatedIds: ["voting"],
  },
  {
    id: "initiative-term",
    term: "Initiative",
    definition: "A process that allows citizens in some states to propose laws or constitutional amendments directly through petition and public vote.",
    relatedIds: ["referendum-term", "civic-participation"],
  },
  {
    id: "judicial-activism-term",
    term: "Judicial Activism",
    definition: "A judicial philosophy in which judges interpret the Constitution broadly, sometimes creating new legal standards from existing principles.",
    relatedIds: ["judicial", "judicial-restraint-term", "judicial-review-term"],
  },
  {
    id: "judicial-restraint-term",
    term: "Judicial Restraint",
    definition: "A judicial philosophy urging judges to interpret the Constitution narrowly and defer to elected branches unless a law clearly violates constitutional limits.",
    relatedIds: ["judicial", "judicial-activism-term"],
  },
  {
    id: "judicial-review-term",
    term: "Judicial Review",
    definition: "The power of courts to examine laws and government actions to determine whether they comply with the Constitution, established by the Supreme Court in Marbury v. Madison (1803).",
    relatedIds: ["judicial", "constitution"],
  },
  {
    id: "judiciary-act-term",
    term: "Judiciary Act of 1789",
    definition: "The law that established the structure of the federal court system, including district courts, circuit courts, and the Supreme Court.",
    relatedIds: ["federal-courts-term", "judicial"],
  },
  {
    id: "jurisdiction-term",
    term: "Jurisdiction",
    definition: "The official power to make legal decisions and judgments, or the geographic area over which such authority extends.",
    relatedIds: ["judicial", "federalism"],
  },
  {
    id: "legislative-branch-term",
    term: "Legislative Branch",
    definition: "The branch of government responsible for making laws, comprised of the House of Representatives and the Senate.",
    relatedIds: ["bicameral-term", "separation-powers-term"],
  },
  {
    id: "lobby-term",
    term: "Lobby",
    definition: "To seek to influence legislators on behalf of a particular cause or interest group, or the groups that engage in such activity.",
    relatedIds: ["legislative"],
  },
  {
    id: "majority-term",
    term: "Majority",
    definition: "More than half of a total, often used to describe the number of votes needed to pass legislation or the political party with the most seats in a legislative body.",
    relatedIds: ["legislative"],
  },
  {
    id: "minority-rights-term",
    term: "Minority Rights",
    definition: "Protections for groups that are not part of the majority, ensuring they have equal rights and are not subject to the tyranny of the majority.",
    relatedIds: ["republicanism", "civil-rights-term"],
  },
  {
    id: "naturalization-term",
    term: "Naturalization",
    definition: "The legal process by which a foreign citizen becomes a citizen of the United States.",
    relatedIds: ["immigration"],
  },
  {
    id: "necessary-proper-term",
    term: "Necessary and Proper Clause",
    definition: "A clause in Article I of the Constitution granting Congress authority to pass laws needed to execute its enumerated powers.",
    relatedIds: ["implied-powers-term", "enumerated-powers-term"],
  },
  {
    id: "oath-of-office-term",
    term: "Oath of Office",
    definition: "A sworn promise taken by public officials to support and defend the Constitution and faithfully perform the duties of their office.",
    relatedIds: ["constitution-term"],
  },
  {
    id: "partisan-term",
    term: "Partisan",
    definition: "Strong support for a particular political party or cause, often characterized by unwavering loyalty regardless of specific issues.",
    relatedIds: ["democratic-party", "republican-party"],
  },
  {
    id: "preamble-term",
    term: "Preamble",
    definition: "The introduction to the Constitution that begins with \"We the People\" and outlines the purposes and guiding principles of the document.",
    relatedIds: ["constitution"],
  },
  {
    id: "precedent-term",
    term: "Precedent",
    definition: "A legal decision or case that serves as an authoritative example for future similar cases, particularly important in the judicial system.",
    relatedIds: ["judicial"],
  },
  {
    id: "pocket-veto-term",
    term: "Pocket Veto",
    definition: "A method by which the President effectively vetoes a bill by taking no action when Congress is adjourned, preventing it from becoming law.",
    relatedIds: ["veto-term", "executive", "legislative"],
  },
  {
    id: "quorum-term",
    term: "Quorum",
    definition: "The minimum number of members required for a legislative body to conduct official business.",
    relatedIds: ["legislative"],
  },
  {
    id: "ratification-term",
    term: "Ratification",
    definition: "The formal approval process by which the Constitution or an amendment becomes law, requiring approval by a specified number of states.",
    relatedIds: ["constitution", "amendment"],
  },
  {
    id: "recall-election-term",
    term: "Recall Election",
    definition: "A process that allows citizens to remove an elected official from office before the end of their term through a direct vote.",
    relatedIds: ["initiative-term", "referendum-term"],
  },
  {
    id: "republic-term",
    term: "Republic",
    definition: "A form of government in which the country is considered a \"public matter\" and officials are elected to represent the citizens rather than rule by inherited right.",
    relatedIds: ["republicanism", "democracy"],
  },
  {
    id: "reserved-powers-term",
    term: "Reserved Powers",
    definition: "Powers not granted to the federal government and therefore retained by the states, under the Tenth Amendment.",
    relatedIds: ["federalism-term", "concurrent-powers-term"],
  },
  {
    id: "resolution-term",
    term: "Resolution",
    definition: "A formal expression of opinion or decision adopted by a legislative body.",
    relatedIds: ["legislative"],
  },
  {
    id: "rulemaking-term",
    term: "Rulemaking",
    definition: "The process by which federal agencies create regulations to implement and enforce laws passed by Congress.",
    relatedIds: ["bureaucracy-term", "federal-register-term"],
  },
  {
    id: "separation-church-state-term",
    term: "Separation of Church and State",
    definition: "A political principle derived from historical writings, particularly Thomas Jefferson’s letters, emphasizing that government should not establish or control religion.",
    relatedIds: ["freedom-religion", "constitution-term"],
  },
  {
    id: "separation-powers-term",
    term: "Separation of Powers",
    definition: "The division of government responsibilities into distinct branches (Legislative, Executive, and Judicial) to limit any one branch from exercising the core functions of another.",
    relatedIds: ["separation-powers", "legislative", "executive", "judicial"],
  },
  {
    id: "social-contract-term",
    term: "Social Contract",
    definition: "The philosophical idea that individuals consent to form a government that protects their natural rights, foundational to American political theory.",
    relatedIds: ["republic-term", "democracy-term"],
  },
  {
    id: "sovereignty-term",
    term: "Sovereignty",
    definition: "Supreme power or authority, particularly the authority of a state to govern itself or another state.",
    relatedIds: ["federalism", "national-interest"],
  },
  {
    id: "statute-term",
    term: "Statute",
    definition: "A written law passed by a legislative body and signed into law by the executive branch.",
    relatedIds: ["legislative-branch-term", "executive"],
  },
  {
    id: "suffrage-term",
    term: "Suffrage",
    definition: "The right to vote in political elections, historically expanded over time to include previously excluded groups.",
    relatedIds: ["voting"],
  },
  {
    id: "supremacy-clause-term",
    term: "Supremacy Clause",
    definition: "Article VI of the Constitution establishing that federal law takes precedence over state laws when there is a conflict.",
    relatedIds: ["constitution", "federalism"],
  },
  {
    id: "swing-state-term",
    term: "Swing State",
    definition: "A state where support for major political parties is closely divided, making it a critical battleground during presidential elections.",
    relatedIds: ["electoral-college-term", "voting"],
  },
  {
    id: "term-limits-term",
    term: "Term Limits",
    definition: "Legal restrictions on the number of terms an elected official may serve in a particular office.",
    relatedIds: ["executive", "legislative"],
  },
  {
    id: "unicameral-term",
    term: "Unicameral",
    definition: "A legislature with a single chamber or house, in contrast to the bicameral U.S. Congress.",
    relatedIds: ["legislative"],
  },
  {
    id: "veto-term",
    term: "Veto",
    definition: "The constitutional power of the President to refuse to approve a bill passed by Congress, which can be overridden by a two-thirds vote in both houses.",
    relatedIds: ["executive", "legislative", "checks-balances"],
  },
].sort((a, b) => a.term.localeCompare(b.term));

// Cached loader
let cachedGlossary: GlossaryTerm[] | null = null;

export const loadGlossaryData = async (): Promise<GlossaryTerm[]> => {
  if (cachedGlossary) return cachedGlossary;

  try {
    const saved = await AsyncStorage.getItem(GLOSSARY_CACHE_KEY);
    if (saved) {
      cachedGlossary = JSON.parse(saved);
      return cachedGlossary;
    }
  } catch (e) {
    if (__DEV__) console.log("Glossary cache load error:", e);
  }

  cachedGlossary = createGlossaryData();
  try {
    await AsyncStorage.setItem(GLOSSARY_CACHE_KEY, JSON.stringify(cachedGlossary));
  } catch (e) {
    if (__DEV__) console.log("Glossary cache save error:", e);
  }

  return cachedGlossary;
};

// Legacy export for existing code
export let glossaryData: GlossaryTerm[] = [];

loadGlossaryData().then(data => {
  glossaryData = data;
});