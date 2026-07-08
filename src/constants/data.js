const A = (name) => `/assets/${name}`;

export const TOOLS = [
  { name: "Figma", img: A("figma.png") },
  { name: "Framer", img: A("photoshop.png") },
  { name: "PhotoShop", img: A("canva.png") },
  { name: "Canva", img: "https://framerusercontent.com/images/vCwVIRyGkHD6g9mFIgpI3D4Ir34.jpg?width=400" },
  { name: "Premiere Pro", img: A("framer.png") },
  { name: "CapCut", img: "https://framerusercontent.com/images/WJImTxlxgxCYePL4d9WjjjK9aSY.jpg?width=400" },
  { name: "Davinci Resolve", img: "https://framerusercontent.com/images/vxdPAFLOMFrp6Jbu9lYXhtC38E.png?width=1024" },
  { name: "VN Editor", img: A("vn_app.png") },
];

export const GRAPHIC_ROW1 = [
  { title: "ARRIVAL Movie Screening Poster", img: A("arrival-screening.png"), link: "https://www.instagram.com/p/DM5V_reNaE8/" },
  { title: "ARRIVAL Movie Invitation Poster", img: A("arrival-invitation.png"), link: null },
  { title: "The Teacher's Lounge Screening Poster", img: A("teachers-lounge.png"), link: "https://www.instagram.com/p/DOAa-edgb-U/" },
  { title: "Supermen Of Malegaon Screening Poster", img: A("supermen.png"), link: "https://www.instagram.com/p/DRcN82RgbHx/" },
];

export const GRAPHIC_ROW2 = [
  { title: "Nike Shoe Poster", img: A("nike.png"), link: "https://www.instagram.com/p/DOtBbsCEt35/" },
  { title: "Spirit Movie Poster", img: A("spirit.png"), link: "https://www.instagram.com/p/DSC2j5_Er9o/" },
  { title: "RANGMANCH Club Auditions 2025 Poster", img: A("rangmanch.png"), link: null },
];

export const UIUX_PROJECTS = [
  { title: "Stuverse Home Page", img: A("stuverse.png"), desc: "A sleek glassmorphism login/signup page featuring frosted-glass cards, soft shadows, and blurred backgrounds to draw attention to the authentication form. The layout uses clear input fields and balanced spacing to make the sign-in and registration experience intuitive, modern, and visually engaging.", link: "https://www.figma.com/design/cF9QnNKu5MB5zy07kQep2P/Stuverse-home-page" },
  { title: "Glass Morphism Effect Login/Signup page", img: A("glassmorphism.png"), desc: "A sleek glassmorphism login/signup page featuring frosted-glass cards, soft shadows, and blurred backgrounds to draw attention to the authentication form. The layout uses clear input fields and balanced spacing to make the sign-in and registration experience intuitive, modern, and visually engaging.", link: "https://www.figma.com/design/bkvbvRVpzypkDSdVgt8Lwe/glassmorphism-login" },
];

export const EXPERIENCE = [
  { company: "InAmigos Foundation", role: "Graphic Design Intern", period: "January 2026 to Present" },
  { company: "CVR Talkies", role: "Graphic Design Lead", period: "August 2025 to Present" },
];

export const SERVICES = [
  { title: "UI/UX Design", desc: "Designing interfaces that are as beautiful as they are functional — turning business goals into intuitive digital experiences that users love and metrics reflect." },
  { title: "Graphic Design", desc: "Building bold, cohesive visual identities — logos, social creatives, posters — that make brands instantly recognizable and unmistakably yours, across every surface." },
  { title: "Video Editing", desc: "Crafting fast-paced, high-retention edits — sharp cuts, seamless transitions, and music that hits on beat — built to stop the scroll on reels, shorts, and promos." },
];

export const DESIGN_PROCESS = [
  {
    title: "Discovery",
    desc: "Uncovering the real problem before jumping to solutions. Digging into goals, audience, and context to understand the \"why\" behind the ask.",
    icon: "🔍",
  },
  {
    title: "Explore & Structure",
    desc: "Mapping out the bones before the beauty. Low-fidelity sketches, moodboards, and structural drafts test direction and flow early.",
    icon: "🧩",
  },
  {
    title: "Craft",
    desc: "Bringing the concept to life with intention. Every visual — interface, brand asset, or frame — is crafted to align with brand identity.",
    icon: "🎨",
  },
  {
    title: "Refine",
    desc: "Great work gets sharper with feedback. Refining details and decisions until the output is the best possible version of itself.",
    icon: "✨",
  },
  {
    title: "Launch",
    desc: "Delivery is more than dropping off files. Organized assets, export-ready formats, and clear documentation for an effortless transition.",
    icon: "🚀",
  },
];
