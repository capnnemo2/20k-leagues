export default {
  users: [
    {
      id: 1,
      first_name: "Bob",
      email: "bob@email.com",
      password: "password",
      specialties: [
        "Boat Diver",
        "Deep Diver",
        "Digital Underwater Photography",
      ],
      instructorSpecialties: [],
      wishlist: [
        "Whale Shark",
        "Mola Mola",
        "Hammerhead Shark",
        "Great White Shark",
        "Tiger Shark",
      ],
      wishlistFulfilled: ["Whale Shark"],
    },
  ],
  certs: [
    {
      id: 1,
      user_id: 1,
      agency: "PADI",
      certLevel: "Open Water Diver",
      certNum: "123ab45",
      certDate: "May 2020",
    },
  ],
  dives: [
    {
      id: 1,
      user_id: 1,
      date: "May 4, 2020",
      country: "United States of America",
      region: "Hawaii",
      diveSite: "Mana Crack",
      maxDepth: 100,
      duration: 56,
      waterTemp: 72,
      diveShop: "Bubbles Below",
      guide: "Ben",
      buddy: "Chris",
      viz: 4,
      diveType: "boat",
      driftDive: true,
      night: false,
      description:
        "Lots of old dead coral, but found some sweet nudis and a whitetip.",
      animals: [],
      rating: 3,
    },
    {
      id: 2,
      user_id: 1,
      date: "May 4, 2020",
      country: "United States of America",
      region: "Hawaii",
      diveSite: "Mana Crack",
      maxDepth: 95,
      duration: 58,
      waterTemp: 73,
      diveShop: "Bubbles Below",
      guide: "Ben",
      buddy: "Chris",
      viz: 3,
      diveType: "boat",
      driftDive: true,
      night: false,
      description:
        "Strong current, fast drift. Mostly just floated and watched the world go by.",
      animals: ["Manta Ray", "Great White Shark"],
      rating: 3,
    },
    {
      id: 3,
      user_id: 1,
      date: "March 18, 2017",
      country: "Philippines",
      region: "Malapascua",
      diveSite: "North Point",
      maxDepth: 79,
      duration: 50,
      waterTemp: 77,
      diveShop: "Thresher Shark Divers",
      guide: "",
      buddy: "",
      viz: "",
      diveType: "boat",
      driftDive: false,
      night: false,
      description:
        "Saw some teeny tiny shrimp: flea-sized, solid red coloring, half a dozen. Juveniles? On the other end of the spectrum, saw some huge nudis.",
      animals: [],
      rating: 3,
    },
    {
      id: 4,
      user_id: 1,
      date: "March 19, 2017",
      country: "Philippines",
      region: "Malapascua",
      diveSite: "Monad Shoal",
      maxDepth: 95,
      duration: 59,
      waterTemp: 77,
      diveShop: "Thresher Shark Divers",
      guide: "",
      buddy: "",
      viz: "",
      diveType: "boat",
      driftDive: false,
      night: false,
      description:
        "No threshers. Mantis shrimp, eagle rays, pipefish, white tip, white/blue nudi, free swimming flatworm.",
      animals: [],
      rating: 4,
    },
    {
      id: 5,
      user_id: 1,
      date: "March 19, 2017",
      country: "Philippines",
      region: "Malapascua",
      diveSite: "Bantigue",
      maxDepth: 51,
      duration: 64,
      waterTemp: 79,
      diveShop: "Thresher Shark Divers",
      guide: "",
      buddy: "",
      viz: "",
      diveType: "boat",
      driftDive: false,
      night: false,
      description:
        "Blue-Ringed Octopus! Tiger pipefish, mantis shrimp, rhino nudis, lionfish, cleaner shrimp.",
      animals: ["Blue-Ringed Octopus"],
      rating: 4,
    },
    {
      id: 6,
      user_id: 1,
      date: "March 20, 2017",
      country: "Philippines",
      region: "Malapascua",
      diveSite: "Lighthouse",
      maxDepth: 37,
      duration: 54,
      waterTemp: 75,
      diveShop: "Thresher Shark Divers",
      guide: "",
      buddy: "",
      viz: "",
      diveType: "boat",
      driftDive: false,
      night: true,
      description: "Mandarin fish x2! Bobtail squid, seahorses x3, nudis.",
      animals: ["Mandarin Fish", "Seahorse"],
      rating: 4,
    },
    {
      id: 7,
      user_id: 1,
      date: "March 21, 2017",
      country: "Philippines",
      region: "Malapascua",
      diveSite: "Monad Shoal",
      maxDepth: 88,
      duration: 51,
      waterTemp: 77,
      diveShop: "Thresher Shark Divers",
      guide: "",
      buddy: "",
      viz: "",
      diveType: "boat",
      driftDive: false,
      night: false,
      description:
        "Thresher! Cuttlefish, nudis, white tip, frog fish, baby lionfish, tiny cuttlefish? maybe bobtail squid",
      animals: ["Thresher Shark", "Frog Fish"],
      rating: 5,
    },
  ],
  countries: [
    {
      country_name: "United States of America",
      regions: ["Hawaii", "Pacific Northwest", "Florida", "Channel Islands"],
    },
    {
      country_name: "Mexico",
      regions: ["Riviera Maya", "Baja", "Revillagigedo Islands"],
    },
    {
      country_name: "Australia",
      regions: [
        "Great Barrier Reef",
        "SS Yongala",
        "Western Australia",
        "Tasmania",
      ],
    },
    {
      country_name: "Nicaragua",
      regions: ["Corn Islands"],
    },
    {
      country_name: "Cayman Islands",
      regions: [
        "Little Cayman",
        "Cayman Brac",
        "Grand Cayman, West",
        "Grand Cayman, East",
        "Grand Cayman, North",
      ],
    },
    {
      country_name: "Thailand",
      regions: [
        "Similan Islands",
        "Chumphon Archipelago (Koh Tao, Koh Samui, Koh Phangan)",
        "Krabi (Koh Lanta)",
        "Phuket",
      ],
    },
    {
      country_name: "Indonesia",
      regions: [
        "Bali (Nusa Lembongan, Nusa Penida)",
        "Gili Islands",
        "Raja Ampat",
        "Komodo National Park",
        "Manado",
      ],
    },
    {
      country_name: "Philippines",
      regions: [
        "Malapascua",
        "Puerto Galera",
        "Coron",
        "Bohol",
        "El Nido",
        "Boracay",
        "Apo Reef",
      ],
    },
  ],
  animals: [
    {
      id: 1,
      animal: "Whale Shark",
    },
    {
      id: 2,
      animal: "Mola Mola",
    },
    {
      id: 3,
      animal: "Thresher Shark",
    },
    {
      id: 4,
      animal: "Hammerhead Shark",
    },
    {
      id: 5,
      animal: "Great White Shark",
    },

    {
      id: 6,
      animal: "Tiger Shark",
    },
    {
      id: 7,
      animal: "Manatee",
    },
    {
      id: 8,
      animal: "Manta Ray",
    },
    {
      id: 9,
      animal: "Seahorse",
    },
    {
      id: 10,
      animal: "Dragon Moray",
    },
    {
      id: 11,
      animal: "Ribbon Eel",
    },
    {
      id: 12,
      animal: "Mandarin Fish",
    },
    {
      id: 13,
      animal: "Frog Fish",
    },
    {
      id: 14,
      animal: "Mimic Octopus",
    },
    {
      id: 15,
      animal: "Pygmy Seahorse",
    },
    {
      id: 16,
      animal: "Leafy Seadragon",
    },
    {
      id: 17,
      animal: "Blue-Ringed Octopus",
    },
    {
      id: 18,
      animal: "Flamboyant Cuttlefish",
    },
    {
      id: 19,
      animal: "Harlequin Shrimp",
    },
    {
      id: 20,
      animal: "Orangutan Crab",
    },
    {
      id: 21,
      animal: "Ornate Ghost Pipefish",
    },
    {
      id: 22,
      animal: "Leaf Scorpionfish",
    },
  ],
  animalTracker: [
    {
      id: 1,
      animal: "Manta Ray",
      country: "United States of America",
      region: "Hawaii",
    },
    {
      id: 2,
      animal: "Whale Shark",
      country: "United States of America",
      region: "Hawaii",
    },
    {
      id: 3,
      animal: "Whale Shark",
      country: "Thailand",
      region: "Chumphon Archipelago (Koh Tao, Koh Samui, Koh Phangan)",
    },
    {
      id: 4,
      animal: "Whale Shark",
      country: "Australia",
      region: "SS Yongala",
    },
    {
      id: 5,
      animal: "Whale Shark",
      country: "Australia",
      region: "SS Yongala",
    },
    {
      id: 6,
      animal: "Manta Ray",
      country: "Australia",
      region: "SS Yongala",
    },
    {
      id: 7,
      animal: "Blue-Ringed Octopus",
      country: "Philippines",
      region: "Malapascua",
    },
    {
      id: 8,
      animal: "Mandarin Fish",
      country: "Philippines",
      region: "Malapascua",
    },
    {
      id: 9,
      animal: "Seahorse",
      country: "Philippines",
      region: "Malapascua",
    },
    {
      id: 10,
      animal: "Thresher Shark",
      country: "Philippines",
      region: "Malapascua",
    },
    {
      id: 11,
      animal: "Frog Fish",
      country: "Philippines",
      region: "Malapascua",
    },
  ],
};
