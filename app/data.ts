export const site = {
  name: "RENDRD",
  email: "selviz@rendrd.com",
  url: "https://rendrd.tech",
  description: "RENDRD is a consultancy and creative studio for marketing and sales teams. Get a technology roadmap, a working prototype or demo, or a campaign ready to launch.",
  deck: "https://docs.google.com/presentation/d/13aoEyvk31l3CzoDFnnHiy8CodPuHPdgG-d8-90Wz5cs/edit",
};

// Projects use the supplied capabilities deck; the NBA films use the final Dropbox deliveries.
// Credential corrections and collaborator additions come from Will’s instructions.
// Engagement names are proposed service packaging. No prices or business metrics are inferred.
export const projects = [
  {
    slug: "nike-air-max", client: "Nike", title: "From the feed. To the street.",
    subtitle: "Campaigns & brand experiences", category: "Campaigns", image: "/media/nike.webp",
    video: "/media/nike.mp4", alt: "Nike Air Max 95 campaign imagery",
    discipline: "Campaigns / CGI / Interactive experiences", sourceSlide: 24,
    intro: "Six years of Nike campaigns, from digital billboards and product films to retail and interactive experiences. 2M+ views across Nike ads.",
    context: "An iconic shoe becomes the starting point for a visual story about a city. The Toronto Edition campaign brings product, place, and motion into the same frame.",
    contribution: "3D animation and visual effects connect the physical product with imagined environments, extending the campaign across video and out-of-home formats.",
    delivered: ["VFX campaign films", "3D product animation", "4D billboard creative"],
    takeaway: "A product story built to travel from a small screen to the city.",
    gallery: ["/media/nike-gallery.webp"],
  },
  {
    slug: "protopica-artechouse", client: "Protopica × ARTECHOUSE", title: "A world you step inside.",
    subtitle: "Immersive storytelling, New York", category: "Emerging experiences", image: "/media/artechouse.webp",
    video: "/media/artechouse.mp4", alt: "Protopica visuals filling the immersive ARTECHOUSE space",
    discipline: "World-building / Immersive visuals", sourceSlide: 12,
    intro: "Stories leave the screen in an 18K, 270-degree immersive environment at ARTECHOUSE in New York.",
    context: "Protopica brings creatives, scholars, and researchers together to explore culture through emerging technology. ARTECHOUSE gives that work an architectural scale.",
    contribution: "Cinema 4D, Houdini, and After Effects form a production toolkit for environments designed to surround an audience, making the room part of the story.",
    delivered: ["Large-scale immersive visuals", "3D environments", "Spatial storytelling"],
    takeaway: "A shared world that audiences experience together.",
    gallery: ["/media/artechouse-detail.webp"],
  },
  {
    slug: "raptors-vince-carter", client: "Toronto Raptors × Bell", title: "The game, beyond the court.",
    subtitle: "Vince Carter AR experience", category: "Campaigns", image: "/media/raptors.webp",
    video: "/media/raptors.mp4", alt: "Vince Carter augmented reality experience for the Toronto Raptors and Bell",
    discipline: "Augmented reality / 3D / Fan engagement", sourceSlide: 22,
    intro: "An augmented reality experience celebrating Vince Carter, recognized with a 2025 NBA Innovation Award.",
    context: "A major basketball moment becomes an opportunity to involve fans through a new kind of encounter with a sports icon.",
    contribution: "Machine learning, 3D animation, and augmented reality bring the experience into the fan's world. The project connects a technical approach with a moment that already matters to its audience.",
    delivered: ["AR experience", "3D animation", "Fan engagement creative"],
    takeaway: "NBA Innovation Award winner, 2025.",
    gallery: ["/media/raptors-detail.webp"],
  },
  {
    slug: "neurogenesis", client: "Protopica", title: "A story shaped by you.",
    subtitle: "Neurogenesis, Sónar Barcelona", category: "Emerging experiences", image: "/media/neurogenesis.webp",
    video: "", alt: "Visitor experiencing Protopica Neurogenesis at Sónar Barcelona",
    discipline: "Machine learning / Interactive installation", sourceSlide: 14,
    intro: "An emotionally responsive installation exploring what happens when an audience helps shape the story.",
    context: "Neurogenesis brings Protopica's research into human connection and emerging technology into an interactive setting at Sónar Barcelona.",
    contribution: "Brainwave sensing and generative film turn the audience's internal state into an input for the experience, exploring a different relationship between people and moving images.",
    delivered: ["Interactive experience", "Generative storytelling", "Audience-responsive film"],
    takeaway: "A working demonstration of a more personal relationship with technology.",
    gallery: ["/media/neurogenesis-detail.webp"],
  },
  {
    slug: "adobe-firefly", client: "Adobe", title: "From new tools to new thinking.",
    subtitle: "Firefly, Adobe MAX & creative dialogue", category: "Demos & adoption", image: "/media/adobe.webp",
    video: "", alt: "Creative collaborators at Adobe headquarters",
    discipline: "Creative advisory / Workshops / Speaking", sourceSlide: 11,
    intro: "Creative practice, product insight, and conversations about the role of technology in culture.",
    context: "The work with Adobe spans emerging technology conversations, creative experimentation, and public dialogue at Adobe HQ and the Adobe MAX VIP Summit.",
    contribution: "Presenting Protopica and moderating a conversation on technology for cultural preservation and purpose brings practical creative experience into the discussion of new tools.",
    delivered: ["Creative technology talks", "Panel moderation", "Product and workflow insight"],
    takeaway: "A link between the people building creative tools and the people using them.",
    gallery: ["/media/adobe-detail.webp"],
  },
  {
    slug: "nba-microsoft", client: "NBA × Microsoft", title: "Put the potential in play.",
    subtitle: "Campaigns, workshops & creative activations", category: "Demos & adoption", image: "/media/nba/montreal.webp",
    video: "", alt: "Basketball, Montréal streets, and colour in the Maison NBA event film",
    discipline: "Creative technology / 3D animation / Workshops", sourceSlide: 27,
    intro: "Making creative technology tangible through basketball, product demonstrations, and hands-on learning.",
    context: "The NBA and Microsoft projects connect emerging technology to a cultural context people already understand, from Maison NBA in Montreal to workshops and product launches.",
    contribution: "Creative direction, generative imagery, and 3D animation give technology a visible use case, supported by workshops that help teams understand how to work with it.",
    delivered: ["Creative technology development", "3D campaign content", "Workshops and product demonstrations"],
    takeaway: "Technology explained through something people care about.",
    gallery: ["/media/microsoft-detail.webp"],
  },
];
// Service packaging reflects the enterprise positioning brief supplied by Will on 9 November 2026.
// Named education/advisory credentials below are user-supplied; roles are kept distinct from brand collaborations.
export const credentials = [
 {name:"LABASAD",role:"Master’s-level teaching",description:"Teaching in the master’s program in advertising and generative AI."},
 {name:"OCAD University",role:"Faculty & graduate advisory",description:"Advising faculty and recent graduates on navigating the changing job market."},
 {name:"Oxford & Stanford",role:"Lectures",description:"Sharing a practitioner’s perspective on emerging technology."},
 {name:"OpenAI",role:"Representation",description:"Represented OpenAI at White House events."},
];
export const services = [
 {title:"Technology strategy & governance",short:"Know what to adopt, and how to own it.",text:"Choose the technology worth adopting, who owns the decisions, and how your team reviews the work. Leave with priorities and a practical adoption plan.",items:["Use-case priorities","Decision ownership & guardrails","Human review & evaluation"],project:""},
 {title:"Use-case development & pilots",short:"Prove the value in a real workflow.",text:"Turn a customer or workflow problem into a working prototype. Test its usefulness and limits before committing to a wider rollout.",items:["Opportunity mapping","Working prototypes","Pilot evaluation & handoff"],project:"neurogenesis"},
 {title:"Campaigns & brand storytelling",short:"Make the technology serve the audience.",text:"Build campaigns around what your audience cares about. Use creative technology, 3D, and film to make the brand story clear, relevant, and memorable.",items:["Creative strategy","Generative media, CGI & VFX production","Consumer campaigns & experiences"],project:"nike-air-max"},
 {title:"Product demos & sales enablement",short:"Give your team a story clients understand.",text:"Give sales teams demos and presentations that explain what a technology does, where it fits, and why a customer should care.",items:["Client-facing demonstrations","Use-case narratives & pitch materials","Sales-team coaching"],project:"nba-microsoft"},
 {title:"Team training & adoption",short:"Build capability that stays with the team.",text:"Help your team put new tools to work. Hands-on workshops build repeatable workflows and the judgment to evaluate the results.",items:["Hands-on technology workshops","Repeatable creative workflows","Team adoption & enablement"],project:"adobe-firefly"},
 {title:"Executive advisory & speaking",short:"Bring an informed perspective to the room.",text:"Help leaders make informed technology decisions. Briefings, advisory sessions, and talks connect emerging capabilities to your business and your audience.",items:["Leadership briefings","Institutional advisory","Talks & facilitated discussions"],project:""},
];
export const engagements = [
 {title:"Strategy & governance sprint",text:"A technology roadmap, clear ownership, and review criteria for the use cases worth pursuing.",detail:"Assess · Prioritize · Define"},
 {title:"Use case to market",text:"A working prototype, campaign, or product demo, with the materials your team needs to bring it to market.",detail:"Prototype · Produce · Enable"},
 {title:"Embedded advisory",text:"Ongoing support for your team’s technology decisions, experiments, and adoption as new capabilities emerge.",detail:"Advise · Evaluate · Build capability"},
];
