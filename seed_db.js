const fs = require('fs');

const locations = [
  { name: "Miami",  region: "South Florida", lat: 25.7617, lng: -80.1918, zip: "33131" },
  { name: "Miami Beach", region: "South Florida", lat: 25.7906, lng: -80.1300, zip: "33139" },
  { name: "Wynwood", region: "Miami-Dade County", lat: 25.8042, lng: -80.1989, zip: "33127" },
  { name: "Brickell", region: "Miami-Dade County", lat: 25.7601, lng: -80.1920, zip: "33131" },
  { name: "Coral Gables", region: "Miami-Dade County", lat: 25.7215, lng: -80.2684, zip: "33134" },
  { name: "Coconut Grove", region: "Miami-Dade County", lat: 25.7123, lng: -80.2445, zip: "33133" },
  { name: "Aventura", region: "Miami-Dade County", lat: 25.9565, lng: -80.1392, zip: "33180" },
  { name: "Doral", region: "Miami-Dade County", lat: 25.8195, lng: -80.3553, zip: "33166" },
  { name: "Hialeah", region: "Miami-Dade County", lat: 25.8576, lng: -80.2781, zip: "33010" },
  { name: "Miami Lakes", region: "Miami-Dade County", lat: 25.9115, lng: -80.3087, zip: "33014" },
  { name: "Key Biscayne", region: "Miami-Dade County", lat: 25.6937, lng: -80.1628, zip: "33149" },
  { name: "Sunny Isles Beach", region: "Miami-Dade County", lat: 25.9329, lng: -80.1217, zip: "33160" },
  { name: "Bal Harbour", region: "Miami-Dade County", lat: 25.8926, lng: -80.1248, zip: "33154" },
  { name: "Surfside", region: "Miami-Dade County", lat: 25.8762, lng: -80.1223, zip: "33154" },
  { name: "Pinecrest", region: "Miami-Dade County", lat: 25.6668, lng: -80.3070, zip: "33156" },
  { name: "Palmetto Bay", region: "Miami-Dade County", lat: 25.6212, lng: -80.3201, zip: "33157" },
  { name: "South Miami", region: "Miami-Dade County", lat: 25.7076, lng: -80.2934, zip: "33143" },
  { name: "Kendall", region: "Miami-Dade County", lat: 25.6793, lng: -80.3173, zip: "33156" },
  { name: "Cutler Bay", region: "Miami-Dade County", lat: 25.5784, lng: -80.3423, zip: "33189" },
  { name: "Homestead", region: "Miami-Dade County", lat: 25.4687, lng: -80.4776, zip: "33030" },
  { name: "Florida City", region: "Miami-Dade County", lat: 25.4479, lng: -80.4792, zip: "33034" },
  { name: "North Miami Beach", region: "Miami-Dade County", lat: 25.9329, lng: -80.1626, zip: "33162" },
  { name: "North Miami", region: "Miami-Dade County", lat: 25.8901, lng: -80.1867, zip: "33161" },
  { name: "Opa-locka", region: "Miami-Dade County", lat: 25.9023, lng: -80.2503, zip: "33054" },
  { name: "Miami Springs", region: "Miami-Dade County", lat: 25.8223, lng: -80.2831, zip: "33166" },
  { name: "Fort Lauderdale", region: "Broward County", lat: 26.1224, lng: -80.1373, zip: "33301" },
  { name: "Hollywood", region: "Broward County", lat: 26.0112, lng: -80.1495, zip: "33020" },
  { name: "Pompano Beach", region: "Broward County", lat: 26.2379, lng: -80.1248, zip: "33060" },
  { name: "Coral Springs", region: "Broward County", lat: 26.2713, lng: -80.2706, zip: "33065" },
  { name: "Pembroke Pines", region: "Broward County", lat: 26.0078, lng: -80.2963, zip: "33025" },
  { name: "Miramar", region: "Broward County", lat: 25.9873, lng: -80.3323, zip: "33027" },
  { name: "Davie", region: "Broward County", lat: 26.0629, lng: -80.2331, zip: "33314" },
  { name: "Plantation", region: "Broward County", lat: 26.1276, lng: -80.2331, zip: "33317" },
  { name: "Sunrise", region: "Broward County", lat: 26.1670, lng: -80.2562, zip: "33351" },
  { name: "Weston", region: "Broward County", lat: 26.1004, lng: -80.3998, zip: "33326" },
  { name: "Deerfield Beach", region: "Broward County", lat: 26.3184, lng: -80.0998, zip: "33441" },
  { name: "Tamarac", region: "Broward County", lat: 26.2129, lng: -80.2500, zip: "33321" },
  { name: "Margate", region: "Broward County", lat: 26.2445, lng: -80.2064, zip: "33063" },
  { name: "Coconut Creek", region: "Broward County", lat: 26.2517, lng: -80.1789, zip: "33066" },
  { name: "Oakland Park", region: "Broward County", lat: 26.1723, lng: -80.1320, zip: "33334" },
  { name: "Wilton Manors", region: "Broward County", lat: 26.1584, lng: -80.1395, zip: "33305" },
  { name: "Dania Beach", region: "Broward County", lat: 26.0523, lng: -80.1439, zip: "33004" },
  { name: "Cooper City", region: "Broward County", lat: 26.0251, lng: -80.2598, zip: "33330" },
  { name: "Parkland", region: "Broward County", lat: 26.3101, lng: -80.2373, zip: "33067" },
  { name: "Lighthouse Point", region: "Broward County", lat: 26.2756, lng: -80.0873, zip: "33064" },
  { name: "Hallandale Beach", region: "Broward County", lat: 25.9812, lng: -80.1484, zip: "33009" },
  { name: "Lauderdale-by-the-Sea", region: "Broward County", lat: 26.1906, lng: -80.0970, zip: "33308" },
  { name: "Sea Ranch Lakes", region: "Broward County", lat: 26.2006, lng: -80.0984, zip: "33308" },
  { name: "Southwest Ranches", region: "Broward County", lat: 26.0270, lng: -80.3423, zip: "33330" },
  { name: "Las Olas", region: "Broward County", lat: 26.1192, lng: -80.1332, zip: "33301" },
  { name: "Boca Raton", region: "Palm Beach County", lat: 26.3683, lng: -80.1289, zip: "33432" },
  { name: "Delray Beach", region: "Palm Beach County", lat: 26.4615, lng: -80.0728, zip: "33444" },
  { name: "West Palm Beach", region: "Palm Beach County", lat: 26.7153, lng: -80.0534, zip: "33401" },
  { name: "Boynton Beach", region: "Palm Beach County", lat: 26.5253, lng: -80.0664, zip: "33435" },
  { name: "Wellington", region: "Palm Beach County", lat: 26.6618, lng: -80.2684, zip: "33414" },
  { name: "Jupiter", region: "Palm Beach County", lat: 26.9342, lng: -80.0942, zip: "33458" },
  { name: "Palm Beach Gardens", region: "Palm Beach County", lat: 26.8234, lng: -80.1387, zip: "33410" },
  { name: "Greenacres", region: "Palm Beach County", lat: 26.6276, lng: -80.1353, zip: "33463" },
  { name: "Royal Palm Beach", region: "Palm Beach County", lat: 26.7056, lng: -80.2256, zip: "33411" },
  { name: "Riviera Beach", region: "Palm Beach County", lat: 26.7753, lng: -80.0581, zip: "33404" },
  { name: "Lake Worth Beach", region: "Palm Beach County", lat: 26.6159, lng: -80.0569, zip: "33460" },
  { name: "Palm Beach", region: "Palm Beach County", lat: 26.7056, lng: -80.0364, zip: "33480" },
  { name: "Loxahatchee", region: "Palm Beach County", lat: 26.7628, lng: -80.3164, zip: "33470" },
  { name: "North Palm Beach", region: "Palm Beach County", lat: 26.8201, lng: -80.0545, zip: "33408" },
  { name: "Lantana", region: "Palm Beach County", lat: 26.5867, lng: -80.0519, zip: "33462" },
  { name: "Palm Springs", region: "Palm Beach County", lat: 26.6359, lng: -80.0964, zip: "33461" },
  { name: "Tequesta", region: "Palm Beach County", lat: 26.9606, lng: -80.0950, zip: "33469" },
  { name: "Ocean Ridge", region: "Palm Beach County", lat: 26.5226, lng: -80.0461, zip: "33435" },
  { name: "Atlantis", region: "Palm Beach County", lat: 26.5884, lng: -80.1017, zip: "33462" },
  { name: "Highland Beach", region: "Palm Beach County", lat: 26.4020, lng: -80.0650, zip: "33487" },
  { name: "South Palm Beach", region: "Palm Beach County", lat: 26.5867, lng: -80.0381, zip: "33480" },
  { name: "Gulf Stream", region: "Palm Beach County", lat: 26.4951, lng: -80.0556, zip: "33483" },
  { name: "Jupiter Island", region: "Martin County", lat: 27.0542, lng: -80.1062, zip: "33455" },
  { name: "Hobe Sound", region: "Martin County", lat: 27.0595, lng: -80.1364, zip: "33455" },
  { name: "Stuart", region: "Martin County", lat: 27.1975, lng: -80.2528, zip: "34994" }
];

const modifiers = ["Premium", "Cinematic", "High-End", "Professional", "Award-Winning", "Elite", "Luxury", "Dynamic"];

const coreServices = [
  { 
    name: "Video Production", 
    h1: "BEYOND REALITY.\\nULTIMATE PRODUCTION.", 
    desc: "{{CITY}}'s premier {{SERVICE_LOWER}}. We engineer explosive visual campaigns, cinematic brand promos, and relentless storytelling that commands absolute authority." 
  },
  { 
    name: "Commercial Video", 
    h1: "EXPLOSIVE ADS.\\nUNMATCHED CINEMA.", 
    desc: "Dominate the market with high-impact {{SERVICE_LOWER}} in {{CITY}}. We construct aggressive, ultra-premium commercial advertising that radically scales your business." 
  },
  { 
    name: "Video Agency", 
    h1: "VISIONARY MEDIA.\\nELITE EXECUTION.", 
    desc: "As {{CITY}}'s top-rated {{SERVICE_LOWER}}, we offer end-to-end creative direction. From concept to 8K final cut, trust the agency that redefines modern luxury." 
  },
  { 
    name: "Corporate Video", 
    h1: "ELEVATE YOUR\\nBRAND AUTHORITY.", 
    desc: "We deliver elite {{SERVICE_LOWER}} for enterprise organizations in {{REGION}}. Build unwavering trust, train global teams, and dominate your industry visually." 
  },
  { 
    name: "Music Video Production", 
    h1: "VISUALIZE YOUR\\nSONIC MASTERPIECE.", 
    desc: "Elevating {{CITY}} artists with mind-bending {{SERVICE_LOWER}}. Break through the noise with explosive visual storytelling and industry-leading choreography framing." 
  },
  { 
    name: "Real Estate Video", 
    h1: "LUXURY PROPERTY\\nCINEMATOGRAPHY.", 
    desc: "Capture the true value of {{REGION}}'s finest properties. We engineer ultra-premium luxury {{SERVICE_LOWER}} that accelerates high-ticket sales instantly." 
  },
  { 
    name: "Drone Videography", 
    h1: "AERIAL MASTERY.\\n8K HORIZONS.", 
    desc: "Unlock breathtaking perspectives with licensed {{SERVICE_LOWER}} in {{CITY}}. We fly heavy-lift cinema drones to capture dynamic, sweeping shots for scale and impact." 
  },
  { 
    name: "Video Post-Production", 
    h1: "MIND BENDING\\nPOST PRODUCTION.", 
    desc: "We don't just edit; we orchestrate high-end cinematic experiences. Trust {{CITY}}'s finest {{SERVICE_LOWER}} suite with aggressive 3D sound design and elite color grading." 
  },
  { 
    name: "VFX Editing", 
    h1: "NEXT GENERATION\\nVISUAL EFFECTS.", 
    desc: "Transform raw footage into unforgettable visual gold. From absolute motion tracking to intense 3D composites, we are the bleeding edge of {{SERVICE_LOWER}} in {{REGION}}." 
  },
  { 
    name: "Event Coverage", 
    h1: "IMMORTALIZE THE\\nEXPERIENCE.", 
    desc: "Relive every adrenaline-pumping moment. We provide raw, cinematic {{SERVICE_LOWER}} in {{CITY}}, capturing the true essence and scale of your massive events." 
  }
];

// Seed Matrix Array
const matrix = [];

// Clean slug creation function
function sluggify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// Perform 75 x 80 Cartesian Mapping
locations.forEach(loc => {
    modifiers.forEach(mod => {
        coreServices.forEach(core => {
            const srv = `${mod} ${core.name}`;
            const srvLower = srv.toLowerCase();
            
            // Contextually evaluate the strings natively
            const replacedDesc = core.desc
                  .replace(/\{\{CITY\}\}/g, loc.name)
                  .replace(/\{\{REGION\}\}/g, loc.region)
                  .replace(/\{\{SERVICE_LOWER\}\}/g, srvLower);
                  
            matrix.push({
                city: loc.name,
                state: "FL",
                region: loc.region,
                latitude: loc.lat,
                longitude: loc.lng,
                zipcode: loc.zip,
                service_caps: srv,
                service_lower: srvLower,
                niche_h1: core.h1,
                niche_desc: replacedDesc,
                slug_city: sluggify(loc.name),
                slug_service: sluggify(srv)
            });
        });
    });
});

fs.writeFileSync('locations.json', JSON.stringify(matrix, null, 2));

console.log(`[SEEDER] 75 Locations x 80 Services mapped with Core NLP targeting.`);
