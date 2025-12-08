// data/mapData.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface State {
  code: string;
  name: string;
  blurb: string;
  content: string;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  states: State[];
}

const MAP_CACHE_KEY = "mapData_cache_v2";

let cachedMapData: Region[] | null = null;

const createMapData = (): Region[] => [
  {
    id: "northeast",
    name: "Northeast",
    description:
      "The Northeast is known for its rich colonial history, dense urban centers, and distinct four-season climate. This region was the birthplace of the American Revolution and remains a hub of education, finance, and culture, and innovation.",
    states: [
      {
        code: "ME",
        name: "Maine",
        blurb: "Maine is famous for its rugged coastline, lobster industry, and vast forests. It is the northeasternmost state in the U.S.",
        content:
          "Maine sits at the far northeastern edge of the United States, where rocky headlands meet the cold Atlantic and lighthouses watch over working harbors. Its jagged coastline, dotted with islands and quiet coves, has shaped generations of fishermen, shipbuilders, and coastal towns that still carry a strong maritime character.\n\nInland, Maine is a land of deep forests, clear lakes, and small communities spread across wide distances. Logging and paper once dominated the interior economy, and the state remains closely tied to the stewardship of its natural resources. Outdoor life is central here, from hunting and snowmobiling to hiking in places like Baxter State Park and Acadia National Park.\n\nCulturally, Maine carries a mix of New England traditions and a stubborn independence. Many communities trace their roots back centuries, yet the state also draws artists, writers, and visitors who come seeking quiet, beauty, and a slower pace. The image of a weathered coastal town selling fresh lobster is more than a postcard; it is a living part of Maine's identity.\n\nLife in Maine is shaped by long winters, short intense summers, and a sense that nature is never far away. For many residents, being a Mainer means resilience, self-reliance, and pride in a state that feels both remote and deeply rooted in the American story.",
      },
      {
        code: "NH",
        name: "New Hampshire",
        blurb: "New Hampshire is known for its granite quarries, fall foliage, and the first-in-the-nation presidential primary.",
        content:
          "New Hampshire's landscape runs from small seacoast towns to rugged mountains, earning it the nickname the Granite State. Its rocky soil and stone ledges helped shape a character known for toughness and self-reliance, while its forests and lakes make it a destination for hiking, skiing, and outdoor recreation throughout the year.\n\nPolitically, New Hampshire holds an outsized place in national life thanks to its first-in-the-nation presidential primary. Candidates from across the country walk its main streets, hold town halls, and meet voters face-to-face in diners and living rooms. This tradition gives ordinary citizens a rare chance to question would-be presidents directly and keeps retail politics alive.\n\n\nEconomically, the state has shifted from old mill and manufacturing centers to a mix of technology, small business, and tourism. Former industrial cities along the Merrimack River now house new industries and growing communities, while small towns in the north rely heavily on seasonal visitors who come for foliage, snow sports, and lakeside cabins.\n\nNew Hampshire is also known for its strong streak of independence. The state motto, \"Live Free or Die,\" reflects a deep commitment to limited government and personal responsibility. For many residents, that motto is not just a slogan on a license plate but a statement about how they believe a free society should function.",
      },
      {
        code: "VT",
        name: "Vermont",
        blurb: "Vermont is celebrated for its maple syrup, covered bridges, and progressive politics. It was an independent republic before joining the Union.",
        content:
          "Vermont is a small, largely rural state of rolling hills, mountain valleys, and tight-knit towns. Its landscape is marked by family farms, sugarhouses, and classic New England villages with white-steepled churches and covered bridges. The changing seasons define life here, from maple sugaring in late winter to brilliant foliage in autumn.\n\nHistorically, Vermont has been both independent and unconventional. Before joining the Union in 1791, it spent several years as a self-declared republic with its own constitution. That independent spirit has carried forward in its politics and culture, where citizen town meetings, local control, and a strong sense of community responsibility are deeply valued.\n\nEconomically, Vermont blends agriculture, tourism, small manufacturing, and a growing focus on local food and artisan products. Dairy farms and maple producers remain important, while craft breweries, outdoor recreation, and small creative businesses add new energy. The state is known for environmental awareness and efforts to balance development with preservation of the countryside.\n\nVermonters often see themselves as stewards of both land and community. Whether through town meeting votes or informal neighborly help, they tend to approach public life with a mix of practicality and idealism. Life in Vermont moves at a deliberate pace, grounded in place and in a long memory of working the land.",
      },
      {
        code: "MA",
        name: "Massachusetts",
        blurb: "Massachusetts played a central role in the American Revolution and is home to world-class universities and a thriving tech sector.",
        content:
          "Massachusetts sits at the crossroads of American history and innovation. Boston and surrounding towns were central to the events leading up to the American Revolution, from the Boston Tea Party to the battles at Lexington and Concord. Cobblestone streets, historic meeting houses, and harbor views still remind residents and visitors that the fight for independence took concrete shape here.\n\nOver time, Massachusetts evolved from a center of shipping and manufacturing into a powerhouse of education, research, and technology. Universities such as Harvard and MIT draw students and scholars from around the world, fueling industries in biotech, software, finance, and engineering. This concentration of knowledge and capital makes the Boston area one of the most influential innovation hubs on Earth.\n\nBeyond its urban core, Massachusetts includes coastal communities on Cape Cod, industrial cities in the Merrimack Valley, and smaller towns in the central and western parts of the state. Each area has its own character, from fishing and tourism along the shore to farms and forests in the interior. Citizens often balance pride in local identity with a shared sense of belonging to a historically important state.\n\nLife in Massachusetts weaves together old and new: colonial buildings beside glass towers, long-established neighborhoods beside clusters of newcomers, and traditions rooted in the past alongside industries that push into the future. The state's story is one of reinvention carried out on a foundation of deep historical memory.",
      },
      {
        code: "RI",
        name: "Rhode Island",
        blurb: "Rhode Island is the smallest state by area but has a rich maritime history and was founded on principles of religious freedom.",
        content:
          "Rhode Island may be the smallest state in the Union, but it has played an outsized role in American history. Founded by Roger Williams as a refuge for religious dissenters, it became a place where freedom of conscience and separation of church and state were taken seriously long before those principles were written into the national Constitution.\n\nIts long, intricate shoreline earned Rhode Island the nickname the Ocean State. Coastal towns like Newport once bustled with shipping, privateering, and trade that connected New England to the wider Atlantic world. Elegant mansions built during the Gilded Age still overlook the water, reminders of an era when Newport served as a summer playground for some of the nation's wealthiest families.\n\nToday, Rhode Island's economy blends higher education, health care, tourism, and creative industries. Providence, the capital, has reinvented itself as a city of colleges, arts, and small businesses, while shipbuilding, fishing, and marine research remain important along the coast. The state's small size fosters a sense of close connection between communities.\n\nRhode Islanders often take pride in the way big ideas have come from a very small piece of land. The state's legacy of religious liberty, maritime enterprise, and cultural diversity reflects a long tradition of punching above its weight in the American story.",
      },
      {
        code: "CT",
        name: "Connecticut",
        blurb: "Connecticut is known for its insurance industry, colonial history, and charming coastal towns.",
        content:
          "Connecticut sits between New York and Boston, blending the feel of New England towns with the pull of major metropolitan areas. Its coastal cities along Long Island Sound, such as New Haven and Bridgeport, grew from colonial ports into modern centers of education, manufacturing, and commerce. Inland, smaller towns retain green town squares, historic churches, and stone walls that speak to centuries of settlement.\n\nHistorically, Connecticut served as a cradle of both industry and ideas. Early on it developed a strong manufacturing base in firearms, clocks, tools, and textiles, earning a reputation for precision craftsmanship. At the same time it was home to important institutions like Yale University, which influenced intellectual and political life far beyond the state's borders.\n\nIn the modern era, Connecticut's economy has shifted toward finance, insurance, aerospace, and high-tech industries, particularly along the corridor that connects it to New York City. Many residents commute to jobs in the larger region, yet the state also hosts major corporate headquarters and research centers of its own. This mix supports a population that is among the most densely settled and demographically varied in the country.\n\nConnecticut's identity is shaped by contrasts: quiet rural corners and busy commuter lines, historic wharves and corporate headquarters, long-rooted families and newer arrivals drawn by opportunity.",
      },
      {
        code: "NY",
        name: "New York",
        blurb: "New York is home to the nation's largest city and a global center of finance, culture, and immigration.",
        content:
          "New York is a state of striking variety, from the towering skyline of New York City to the farms, forests, and small towns that stretch toward the Canadian border. The city itself has long been a gateway to America, welcoming waves of immigrants through Ellis Island and its harbor. It stands today as a global center of finance, media, art, and fashion, shaping culture and commerce far beyond the United States.\n\nUpstate New York tells a different but equally important story. Cities like Buffalo, Rochester, Syracuse, and Albany grew along canals, rail lines, and rivers that once carried goods and people westward. These communities played major roles in industry, innovation, and movements such as abolition and women's suffrage. The Adirondack and Catskill mountains, along with the Finger Lakes and Great Lakes shores, offer landscapes of extraordinary natural beauty.\n\nEconomically, New York combines Wall Street and high-tech startups with agriculture, higher education, tourism, and advanced manufacturing. Vineyards, dairy farms, orchards, and small manufacturers support local economies far from Manhattan's financial district. World-class universities and research centers contribute to medicine, engineering, and science.\n\nNew Yorkers often share a sense of energy and resilience, whether they live in a Brooklyn neighborhood, a Hudson Valley village, or a remote northern town. The state's diversity of people and places can be challenging to govern, yet it also serves as a living example of how many different communities can coexist under a shared banner.",
      },
      {
        code: "NJ",
        name: "New Jersey",
        blurb: "New Jersey is densely populated and strategically located between New York and Philadelphia, with a diverse economy.",
        content:
          "New Jersey occupies a strategic stretch of land between New York City and Philadelphia, and its history and economy reflect that central position. Dense suburbs, industrial corridors, and port facilities connect the state to some of the busiest transportation networks in the nation. For generations, factories, warehouses, and shipyards helped move goods along the East Coast and across the world.\n\nBeyond its urban image, New Jersey includes farmland, pine forests, and long Atlantic beaches. The Jersey Shore has been a summer destination for families from across the region, with boardwalks, small resort towns, and quieter stretches of sand. Inland communities in the north and west retain a more rural feel, with rolling hills and older towns that once grew along canal and rail routes.\n\nNew Jersey's economy is highly diverse, including pharmaceuticals, finance, logistics, higher education, and technology. Many residents commute to jobs in New York or Philadelphia, yet the state also hosts major corporate headquarters and research centers of its own. This mix supports a population that is among the most densely settled and demographically varied in the country.\n\nCulturally, New Jersey combines big-city influence with strong local identity. People often define themselves by neighborhood or town as much as by state, but they share a certain pride in New Jersey's grit, productivity, and role as a crossroads of the Mid-Atlantic and New England regions.",
      },
      {
        code: "PA",
        name: "Pennsylvania",
        blurb: "Pennsylvania was the site of the Constitutional Convention and remains a key industrial and agricultural state.",
        content:
          "Pennsylvania stretches from the Atlantic coastal plain through Appalachian ridges to the shores of Lake Erie, linking multiple regions of the country. Philadelphia, on its eastern edge, served as the meeting place for the Continental Congress and the Constitutional Convention, making the state central to the birth of the nation. Independence Hall and other historic sites still stand as reminders of those decisive debates.\n\nTo the west, cities like Pittsburgh grew where rivers meet and coal and steel once powered the industrial age. For much of the twentieth century, Pennsylvania's mills and factories helped build the infrastructure of the United States, from bridges and skyscrapers to rail lines and ships. The gradual shift away from heavy industry has led to economic challenges but also to new investments in technology, medicine, and education.\n\nBetween its major cities, Pennsylvania is dotted with farms, small towns, and communities with deep ethnic and religious roots. The Amish and other Anabaptist groups maintain traditional ways of life in certain regions, while many towns reflect waves of immigration from Europe and, more recently, from around the world. Agriculture remains important, from dairy and crops to orchards and vineyards.\n\nPennsylvania's political and cultural diversity often makes it a bellwether state in national elections. Its blend of historic memory, industrial legacy, and rural tradition offers a snapshot of the broader American experience, where old and new realities meet in the same landscape.",
      },
      {
        code: "DE",
        name: "Delaware",
        blurb: "Delaware is the First State, known for its colonial heritage, business-friendly laws, and Atlantic coastline.",
        content:
          "Delaware holds a special place in American history as the first state to ratify the Constitution in 1787, earning it the nickname the First State. Small in size but significant in influence, Delaware sits along the Atlantic coast and the Delaware River, connecting the Mid-Atlantic region through waterways and commerce.\n\nHistorically, Delaware was shaped by Swedish, Dutch, and English colonial settlements. Wilmington grew into an industrial center, particularly in chemicals and manufacturing, while Dover, the capital, serves as the seat of state government. The state's location between Philadelphia and the Chesapeake Bay made it a crossroads for trade and migration.\n\nIn modern times, Delaware has become known for its business-friendly legal environment. More than half of all publicly traded companies in the United States are incorporated in Delaware due to its well-established corporate law system and Court of Chancery. This has made the state a quiet but powerful player in American commerce.\n\nBeyond business, Delaware offers beaches along Rehoboth and the Atlantic shore, historic sites in New Castle and Dover, and agricultural lands in the southern counties. The state blends urban centers, suburban growth, and rural traditions, all within a compact area that reflects both its colonial past and its role in the modern economy.",
      },
    ],
  },
  // ... all other regions (south, midwest, west) exactly as you had them
];

// Cached async loader
export const loadMapData = async (): Promise<Region[]> => {
  if (cachedMapData) return cachedMapData;

  try {
    const saved = await AsyncStorage.getItem(MAP_CACHE_KEY);
    if (saved) {
      cachedMapData = JSON.parse(saved);
      return cachedMapData;
    }
  } catch (e) {
    if (__DEV__) console.log("Map cache load error:", e);
  }

  cachedMapData = createMapData();
  try {
    await AsyncStorage.setItem(MAP_CACHE_KEY, JSON.stringify(cachedMapData));
  } catch (e) {
    if (__DEV__) console.log("Map cache save error:", e);
  }

  return cachedMapData;
};

// Legacy export for existing code
export let mapData: Region[] = [];

loadMapData().then(data => {
  mapData = data;
});

export default mapData;