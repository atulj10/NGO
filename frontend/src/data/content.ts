export const siteConfig = {
  organizationName: "HEALTH EDUCATION AND LIVELIHOOD PROMOTION SOCIETY",

  logo: {
    type: "temporary",
  },

  theme: {
    orange: "#FF6845",
    offWhite: "#F5F4ED",
    black: "#111111",
    white: "#FFFFFF",
  },

  typography: {
    display: "Bebas Neue",
    body: "Inter",
  },

  navigation: [
    { label: "PROGRAMS", target: "objectives" },
    { label: "BLOG & ADVOCACY", target: "what-we-do" },
    { label: "STORIES", target: "join" },
    { label: "CONTACT", target: "/contact" },
  ],

  hero: {
    titleLines: ["HEALTH EDUCATION AND", "LIVELIHOOD PROMOTION SOCIETY"],
    image: "/assets/masked_image_hero.webp",
    primaryCta: { label: "DONATE", target: "join" },
    secondaryCta: { label: "TELL MY STORY", target: "contact" },
  },

  impact: {
    heading: "OUR IMPACT IN ACTION",
    accentWord: "IMPACT",
    description:
      "Health Education and Livelihood Promotion Society supports grassroots leaders, educators, and advocates who fight for equity, dignity, and justice.",
    stats: [
      {
        label: "STORIES SHARED",
        value: 943,
        suffix: "+",
        description:
          "We helped communities document and share their experiences to inspire global action.",
      },
      {
        label: "PROGRAMS FUNDED",
        value: 55,
        suffix: "+",
        description:
          "We back local solutions that change lives, from climate to girls' education.",
      },
      {
        label: "CHILDREN SAFE",
        value: 2515,
        suffix: "+",
        description:
          "We supported local shelters and trained community leaders to protect children.",
      },
    ],
  },

  objectives: [
    {
      title: "SADHNA",
      image:
        "/assets/child-holding-red-rubber-heart.webp",
    },
    {
      title: "SEWA",
      image:
        "/assets/hands-trees-growing-seedlings.webp",
    },
    {
      title: "SATSANG",
      image:
        "/assets/Kids_in_uniform.webp",
    },
  ],

  whatWeDo: {
    heading: "WHAT WE DO",
    description:
      "We support communities through livelihood, education, and platform — turning lived experience into lasting change.",
    cards: [
      {
        title: "HELPING PEOPLE FOR LIVELIHOOD",
        description:
          "We train people to be on their own — with dignity, safety, and reach.",
        image:
          "/assets/indian-engineer-work-building-site.webp",
      },
      {
        title: "CREATING SPACES TO LEARN",
        description:
          "Our workshops help communities advocate, organize, and protect their rights.",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "TURNING WORDS INTO ACTION",
        description:
          "Local voices into national conversations — through campaigns, reports, and engagement.",
        image:
          "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },

  joinUs: {
    eyebrow: "BECOME PART OF THE MOVEMENT",
    heading: "JOIN THE MOVEMENT",
    description:
      "One email, twice a month. Stories, campaigns, and ways to act — straight from the field.",
    image:
      "/assets/volunteer.webp",
    waveBars: [
      { x: 21, y: 43, width: 6, height: 14, rx: 3 },
      { x: 41, y: 33, width: 6, height: 34, rx: 3 },
      { x: 31, y: 37, width: 6, height: 26, rx: 3 },
      { x: 51, y: 30, width: 6, height: 40, rx: 3 },
      { x: 71, y: 37, width: 6, height: 26, rx: 3 },
      { x: 61, y: 33, width: 6, height: 34, rx: 3 },
      { x: 81, y: 43, width: 6, height: 14, rx: 3 },
    ],
    newsletter: {
      placeholder: "Your email...",
      button: "SUBSCRIBE",
      success: "You're in. Watch your inbox.",
    },
  },

  footer: {
    tagline: "Turning lived experience into lasting change.",
    statement: "STORIES THAT SPEAK. ACTIONS THAT COUNT.",
    columns: [
      {
        heading: "ORGANIZATION",
        links: [
          { label: "Staff", url: "/contact" },
          { label: "Community", url: "#impact" },
          { label: "Career", url: "/contact" },
          { label: "Contact Us", url: "/contact" },
        ],
      },
      {
        heading: "ENGAGE",
        links: [
          { label: "Our Mentors", url: "#what-we-do" },
          { label: "Become A Speaker", url: "#join" },
          { label: "Request Your Story", url: "#join" },
          { label: "Private Engagements", url: "/contact" },
        ],
      },
      {
        heading: "SUPPORT",
        links: [
          { label: "Donate", url: "#join" },
          { label: "Become A Member", url: "#join" },
          { label: "Sponsorship", url: "/contact" },
          { label: "Become A Volunteer", url: "#join" },
        ],
      },
    ],
    copyright: "All Rights Reserved 2026",
    socials: [
      {
        name: "Instagram",
        icon: "instagram",
        url: "https://www.instagram.com",
      },
      { name: "X (Twitter)", icon: "twitter", url: "https://www.x.com" },
      { name: "Facebook", icon: "facebook", url: "https://www.facebook.com" },
      { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com" },
    ],
  },
} as const;
