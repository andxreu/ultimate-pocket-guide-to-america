
export interface State {
  code: string;
  name: string;
  blurb: string;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  states: State[];
}

export const mapData: Region[] = [
  {
    id: "northeast",
    name: "Northeast",
    description:
      "The Northeast is known for its rich colonial history, dense urban centers, and distinct four-season climate. This region was the birthplace of the American Revolution and remains a hub of education, finance, and culture.",
    states: [
      {
        code: "ME",
        name: "Maine",
        blurb:
          "Maine is famous for its rugged coastline, lobster industry, and vast forests. It is the northeasternmost state in the U.S.",
      },
      {
        code: "NH",
        name: "New Hampshire",
        blurb:
          "New Hampshire is known for its granite quarries, fall foliage, and the first-in-the-nation presidential primary.",
      },
      {
        code: "VT",
        name: "Vermont",
        blurb:
          "Vermont is celebrated for its maple syrup, covered bridges, and progressive politics. It was an independent republic before joining the Union.",
      },
      {
        code: "MA",
        name: "Massachusetts",
        blurb:
          "Massachusetts played a central role in the American Revolution and is home to world-class universities and a thriving tech sector.",
      },
      {
        code: "RI",
        name: "Rhode Island",
        blurb:
          "Rhode Island is the smallest state by area but has a rich maritime history and was founded on principles of religious freedom.",
      },
      {
        code: "CT",
        name: "Connecticut",
        blurb:
          "Connecticut is known for its insurance industry, colonial history, and charming coastal towns.",
      },
      {
        code: "NY",
        name: "New York",
        blurb:
          "New York is home to the nation's largest city and a global center of finance, culture, and immigration.",
      },
      {
        code: "NJ",
        name: "New Jersey",
        blurb:
          "New Jersey is densely populated and strategically located between New York and Philadelphia, with a diverse economy.",
      },
      {
        code: "PA",
        name: "Pennsylvania",
        blurb:
          "Pennsylvania was the site of the Constitutional Convention and remains a key industrial and agricultural state.",
      },
    ],
  },
  {
    id: "south",
    name: "South",
    description:
      "The South is characterized by warm weather, rich agricultural traditions, and a complex history shaped by the Civil War and civil rights movements. Today it is a diverse and rapidly growing region.",
    states: [
      {
        code: "MD",
        name: "Maryland",
        blurb:
          "Maryland borders the Chesapeake Bay and is home to the nation's capital region, with a strong maritime and federal presence.",
      },
      {
        code: "VA",
        name: "Virginia",
        blurb:
          "Virginia is the birthplace of many founding fathers and played a central role in early American history.",
      },
      {
        code: "WV",
        name: "West Virginia",
        blurb:
          "West Virginia broke from Virginia during the Civil War and is known for its Appalachian mountains and coal mining heritage.",
      },
      {
        code: "NC",
        name: "North Carolina",
        blurb:
          "North Carolina is known for its Research Triangle, beautiful coastline, and tobacco and textile industries.",
      },
      {
        code: "SC",
        name: "South Carolina",
        blurb:
          "South Carolina was the first state to secede from the Union and is known for its historic port city of Charleston.",
      },
      {
        code: "GA",
        name: "Georgia",
        blurb:
          "Georgia is the largest state east of the Mississippi and a major center of commerce, transportation, and culture.",
      },
      {
        code: "FL",
        name: "Florida",
        blurb:
          "Florida is known for its beaches, theme parks, and diverse population. It is a major destination for tourism and retirement.",
      },
      {
        code: "AL",
        name: "Alabama",
        blurb:
          "Alabama played a pivotal role in the civil rights movement and is known for its aerospace industry and college football.",
      },
      {
        code: "MS",
        name: "Mississippi",
        blurb:
          "Mississippi is deeply rooted in the history of the South and is known for its blues music and literary tradition.",
      },
      {
        code: "LA",
        name: "Louisiana",
        blurb:
          "Louisiana is famous for its unique Creole and Cajun cultures, jazz music, and the vibrant city of New Orleans.",
      },
      {
        code: "TN",
        name: "Tennessee",
        blurb:
          "Tennessee is the birthplace of country music and home to the Great Smoky Mountains, the most visited national park.",
      },
      {
        code: "KY",
        name: "Kentucky",
        blurb:
          "Kentucky is known for bourbon whiskey, horse racing, and its role as a border state during the Civil War.",
      },
      {
        code: "AR",
        name: "Arkansas",
        blurb:
          "Arkansas is known for its natural beauty, including Hot Springs National Park, and its agricultural economy.",
      },
    ],
  },
  {
    id: "midwest",
    name: "Midwest",
    description:
      "The Midwest is often called America's heartland, known for its agriculture, manufacturing, and friendly communities. It includes the Great Lakes region and vast prairies.",
    states: [
      {
        code: "OH",
        name: "Ohio",
        blurb:
          "Ohio is a major industrial and agricultural state and has produced more U.S. presidents than any other state except Virginia.",
      },
      {
        code: "IN",
        name: "Indiana",
        blurb:
          "Indiana is known for its auto racing heritage, including the Indianapolis 500, and its strong manufacturing sector.",
      },
      {
        code: "IL",
        name: "Illinois",
        blurb:
          "Illinois is home to Chicago, the third-largest city in the U.S., and is a major hub for transportation and commerce.",
      },
      {
        code: "MI",
        name: "Michigan",
        blurb:
          "Michigan is surrounded by the Great Lakes and is the center of the American automotive industry.",
      },
      {
        code: "WI",
        name: "Wisconsin",
        blurb:
          "Wisconsin is known as America's Dairyland and is famous for its cheese, beer, and beautiful lakeshores.",
      },
      {
        code: "MN",
        name: "Minnesota",
        blurb:
          "Minnesota is the Land of 10,000 Lakes and is known for its Scandinavian heritage and progressive politics.",
      },
      {
        code: "IA",
        name: "Iowa",
        blurb:
          "Iowa is a leading agricultural state and hosts the first presidential caucuses every four years.",
      },
      {
        code: "MO",
        name: "Missouri",
        blurb:
          "Missouri is the Gateway to the West and is known for its role in westward expansion and its barbecue tradition.",
      },
      {
        code: "ND",
        name: "North Dakota",
        blurb:
          "North Dakota is known for its oil production, agriculture, and the Theodore Roosevelt National Park.",
      },
      {
        code: "SD",
        name: "South Dakota",
        blurb:
          "South Dakota is home to Mount Rushmore, the Badlands, and a rich Native American heritage.",
      },
      {
        code: "NE",
        name: "Nebraska",
        blurb:
          "Nebraska is a major agricultural state known for its corn production and the strategic location of Omaha.",
      },
      {
        code: "KS",
        name: "Kansas",
        blurb:
          "Kansas is the geographic center of the contiguous United States and is known for its wheat fields and aviation industry.",
      },
    ],
  },
  {
    id: "west",
    name: "West",
    description:
      "The West is a vast and diverse region that includes deserts, mountains, forests, and coastlines. It is known for innovation, natural beauty, and a spirit of independence.",
    states: [
      {
        code: "MT",
        name: "Montana",
        blurb:
          "Montana is known for its stunning mountain ranges, wide open spaces, and Glacier National Park.",
      },
      {
        code: "WY",
        name: "Wyoming",
        blurb:
          "Wyoming is the least populous state and is home to Yellowstone, the first national park in the world.",
      },
      {
        code: "CO",
        name: "Colorado",
        blurb:
          "Colorado is famous for its Rocky Mountain scenery, outdoor recreation, and thriving tech industry.",
      },
      {
        code: "NM",
        name: "New Mexico",
        blurb:
          "New Mexico has a rich Native American and Hispanic heritage and is known for its art, culture, and desert landscapes.",
      },
      {
        code: "ID",
        name: "Idaho",
        blurb:
          "Idaho is known for its potatoes, rugged wilderness, and outdoor recreation opportunities.",
      },
      {
        code: "UT",
        name: "Utah",
        blurb:
          "Utah is home to five national parks, known as the Mighty Five, and has a unique cultural and religious heritage.",
      },
      {
        code: "AZ",
        name: "Arizona",
        blurb:
          "Arizona is known for the Grand Canyon, desert landscapes, and a rapidly growing population.",
      },
      {
        code: "NV",
        name: "Nevada",
        blurb:
          "Nevada is home to Las Vegas and vast desert landscapes. It is known for gaming, entertainment, and mining.",
      },
      {
        code: "WA",
        name: "Washington",
        blurb:
          "Washington is known for its tech industry, coffee culture, and stunning natural beauty from mountains to coastlines.",
      },
      {
        code: "OR",
        name: "Oregon",
        blurb:
          "Oregon is known for its progressive politics, craft beer scene, and diverse landscapes from coast to high desert.",
      },
      {
        code: "CA",
        name: "California",
        blurb:
          "California is the most populous state and a global center of technology, entertainment, and agriculture.",
      },
      {
        code: "AK",
        name: "Alaska",
        blurb:
          "Alaska is the largest state by area and is known for its wilderness, wildlife, and indigenous cultures.",
      },
      {
        code: "HI",
        name: "Hawaii",
        blurb:
          "Hawaii is a tropical paradise and the only state made up entirely of islands. It has a unique Polynesian culture.",
      },
    ],
  },
];
