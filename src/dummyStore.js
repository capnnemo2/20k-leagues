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
      country: "USA",
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
      description:
        "Lots of old dead coral, but found some sweet nudis and a whitetip.",
      animals: [],
      rating: 3,
    },
    {
      id: 2,
      user_id: 1,
      date: "May 4, 2020",
      country: "USA",
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
      description:
        "Strong current, fast drift. Mostly just floated and watched the world go by.",
      animals: ["Manta Ray", "Great White Shark"],
      rating: 3,
    },
  ],
  animalTracker: [
    {
      country: "usa",
      animal: "manta ray",
    },
    {
      country: "usa",
      animal: "great white shark",
    },
  ],
};
