// ─────────────────────────────────────────────────────────────────
//  Newton Harris G2K Manifesto — Canonical Content
//  DO NOT paraphrase. All text is verbatim from the PDF unless
//  noted as a nav label (marked with [NAV]).
// ─────────────────────────────────────────────────────────────────

export const candidate = {
  name: "Newton Harris",
  tagline: "Newton Is Your Solution",
  subtagline: "Tested. Proven. Ready to Lead on Day One.",
  era: "Ushering in a New Era of Opportunities, Stability, and Respect.",
  intro:
    "Newton Harris is the candidate of Operational Substance and Verifiable Impact. He represents a return to G2K's founding mission: serving as the intellectual and strategic engine for the Jamaica Labour Party.",

  professionalEdge: {
    heading: "The Professional Edge",
    body: "For over five years, Newton has served as a high-level Ministerial Advisor to Kamina Johnson Smith, consistently rated as one of Jamaica's top-performing Ministers. He has been in the room, absorbing governance mechanics, international strategy, and parliamentary procedure at the highest levels of government. This is the experience needed to lead an organisation with such a vital role to play in our nation's future.",
    highlights: [
      "High-level Ministerial Advisor to Kamina Johnson Smith",
      "Governance mechanics & international strategy",
      "Parliamentary procedure at the highest levels of government",
    ],
  },

  womenInPolitics: {
    heading: "A Proven Supporter of Women in Politics",
    intro:
      'Newton offers a verifiable history of being the "right-hand" support for some the Party\'s most effective female leaders:',
    leaders: [
      {
        name: "Kamina Johnson Smith",
        detail: "Supporting her in her successful global and parliamentary mandates.",
      },
      {
        name: "Fayval Williams",
        detail:
          "Conducted exhaustive ground campaigning in the high-pressure marginal seat of St. Andrew Eastern.",
      },
      {
        name: "Krystal Lee",
        detail:
          "Provided intense on-the-ground support in his battleground home constituency of St. Ann North-Western during the election.",
      },
    ],
  },

  g2kVeteran: {
    heading: "The G2K Veteran (Since 2018)",
    intro:
      "Newton's service to this organisation is deep and documented. As current Vice-President (International Relations) and former Deputy Treasurer, he has, among other notable achievements:",
    achievements: [
      "Secured hundreds of hygiene kits and tarps for G2K relief activities.",
      "Rebuilt and maintained critical relationships with international partners.",
      "Been central to the success of two National Forums held at UTech in 2025 and UWI in 2026.",
      "Facilitated a greater understanding of international relations and training in personal and professional conduct and etiquette for our members.",
    ],
    roles: [
      { title: "Vice-President (International Relations)", current: true },
      { title: "Deputy Treasurer", current: false },
    ],
  },
};

export const mission = {
  heading: "My Mission",
  body: "Every member of G2K reading this deeply cares about their country and their own professional growth. You are driven to sharpen your skills so you can contribute everything possible to Jamaica's future. Having been a diligent member of this organisation since 2018, I recognise and am motivated by that drive. My mission is to build a G2K that supports and facilitates your ambition with real solutions.",
  keyCommitment: "Make Your Membership Work For You.",
};

// ─── Pillar 1 ──────────────────────────────────────────────────────
export const pillar1 = {
  id: "chapter-and-member-development",
  number: 1,
  heading: "Chapter and Member Development",
  intro:
    "Your membership to this organisation should uplift you as much as you uplift it. G2K must return tangible value to its members. If you dedicate your time, it must return value to your career. My plan is built on a single promise:",
  promise: "Make Your Membership Work For You.",
  modules: [
    {
      id: "elevate-your-network",
      title: "Elevate Your Network",
      promise:
        "We will transform Chapter meetings into high-level networking hubs with regular, moderated engagements with Ministers and industry experts.",
      tactics: [
        {
          name: "Define Engagement Calendar",
          detail:
            "Establish a quarterly schedule for high-level meetings, securing commitments from at least two Cabinet Ministers and four industry experts per quarter.",
        },
        {
          name: "Implement a Moderated Q&A Format",
          detail:
            "Structure all networking sessions with a formal, moderated Q&A segment to ensure professional discourse and maximum member participation.",
        },
        {
          name: "Mandate Pre-Event Briefing",
          detail:
            "Provide Chapter leaders and participating members with a pre-event briefing package on the guest's expertise and portfolio to facilitate high-quality interaction.",
        },
      ],
      measurements: [
        {
          name: "Engagement Rate",
          detail:
            "Quarterly attendance of Ministers/Experts (Target: 100% of scheduled engagements).",
        },
        {
          name: "Member Satisfaction (Net Promoter Score)",
          detail:
            "Percentage of members rating the quality of networking events as 'Excellent' (Target: >80%).",
        },
        {
          name: "Professional Outcomes",
          detail:
            "Number of members reporting a direct professional opportunity (e.g., mentorship, job interview, partnership) resulting from a Chapter meeting (Target: 10 per annum).",
        },
      ],
    },
    {
      id: "accelerate-your-career",
      title: "Accelerate Your Career",
      promise:
        "G2K will be the premier credential for young professionals, offering specialised training including ECON 101 and Sector Fundamentals.",
      tactics: [
        {
          name: "Curriculum Development",
          detail:
            "Formalize and launch three core training modules (e.g., ECON 101, Public Policy Drafting, Sector Fundamentals) within the first six months.",
        },
        {
          name: "Certified Instructors",
          detail:
            "Partner with professional education institutions or government agencies to secure certified instructors for all training modules.",
        },
        {
          name: "Digital Resource Library",
          detail:
            "Create an exclusive, members-only digital repository of training materials, policy white papers, and professional development guides.",
        },
      ],
      measurements: [
        {
          name: "Course Completion Rate",
          detail:
            "Percentage of enrolled members who successfully complete the core training modules (Target: >75%).",
        },
        {
          name: "Certification Uptake",
          detail:
            "Total number of members receiving G2K specialized training certification (Target: 150 members in Year 1).",
        },
        {
          name: "Career Advancement",
          detail:
            "Percentage of trained members reporting a promotion or career-related move within 12 months of certification (Target: 30%).",
        },
      ],
    },
    {
      id: "formidable-political-force",
      title: "Be a Formidable Political Force",
      promise:
        "Through effective Chapters, learn strategies and deliver value to your communities and constituencies.",
      tactics: [
        {
          name: "Chapter Effectiveness Audit",
          detail:
            "Conduct a bi-annual review of all Chapters based on activity, membership retention, and community project impact.",
        },
        {
          name: '"Adopt-a-Constituency" Program',
          detail:
            "Formalize a program requiring each Chapter to partner with a marginal constituency to execute a targeted, measurable community value project (e.g., literacy drive, clean-up campaign).",
        },
        {
          name: "Grassroots Strategy Training",
          detail:
            "Host dedicated workshops on modern political strategy, voter mobilization, and effective constituency-level communication for all Chapter Executive members.",
        },
      ],
      measurements: [
        {
          name: "Constituency Impact Score",
          detail:
            "Measured success of Chapter-led community projects against predefined, agreed-upon objectives (Target: Average project success rate >90%).",
        },
        {
          name: "Chapter Activity Rate",
          detail:
            "Percentage of Chapters meeting the minimum standard for bi-monthly political activity/strategy sessions (Target: 95%).",
        },
        {
          name: "Membership Retention",
          detail:
            "Annual percentage of Chapter members retained, indicating perceived value of political involvement (Target: >85%).",
        },
      ],
    },
    {
      id: "innovate-for-jamaica",
      title: "Innovate for Jamaica",
      promise:
        "We will act as a policy incubator, giving members a platform to draft solutions for national challenges like disinformation, urban renewal and the creative economy.",
      tactics: [
        {
          name: 'Annual Policy Hackathon',
          detail:
            'Launch a flagship annual "Innovate for Jamaica" Policy Hackathon focusing on three critical national challenges.',
        },
        {
          name: "Ministerial Policy Submission Pipeline",
          detail:
            "Establish a formal channel for submitting top-tier policy papers generated by members directly to relevant Ministerial Advisors or Permanent Secretaries.",
        },
        {
          name: "Expert Review Panel",
          detail:
            "Create an internal review panel of subject matter experts (including former policymakers) to vet and refine member-drafted solutions before submission.",
        },
      ],
      measurements: [
        {
          name: "Policy Output",
          detail:
            "Total number of high-quality, fully drafted policy solutions generated by members (Target: 12 policy papers per year).",
        },
        {
          name: "Policy Adoption Rate",
          detail:
            "Number of member-drafted policy solutions formally recognized, discussed, or adopted by a Ministry or Agency (Target: 2 per year).",
        },
        {
          name: "Public Visibility",
          detail:
            "Number of policy papers published or cited in national media or academic journals (Target: 4 per year).",
        },
      ],
    },
  ],
};

// ─── Pillar 2 ──────────────────────────────────────────────────────
export const pillar2 = {
  id: "national-policy-and-thought-leadership",
  number: 2,
  heading: "National Policy and Thought Leadership",
  intro:
    "G2K is a resource to the Party, but it is an even greater resource to every Jamaican. We have a vital role to play as the bridge connecting the inner workings of government to the people on the ground and the nation-building power of the private sector. I believe our place is firmly in the marketplace of ideas, ensuring our members are the pillars of our communities.",
  boldStatement:
    "We do more than defend the Party; we elevate the conversation and edify our fellow citizens.",
  modules: [
    {
      id: "bridge-to-governance",
      title: "The Bridge to Governance",
      promise:
        "Empowering members to speak on current events with deep, factual knowledge rather than just a party line.",
      tactics: [
        {
          name: "Policy Primer Series",
          detail:
            "Establish a weekly internal memo or webinar series, led by Ministerial Advisors and technical experts, focusing on current events and policy context.",
        },
        {
          name: "Media Training Workshop",
          detail:
            'Host a mandatory "Media Training & Communications Workshop" quarterly for all Chapter Executive members and designated spokespersons, emphasizing factual grounding.',
        },
        {
          name: "Rapid-Response Fact-Check",
          detail:
            "Develop a rapid-response fact-check unit within the G2K Communications portfolio to provide members with verified data points on national issues within 2 hours of a major political statement.",
        },
      ],
      measurements: [
        {
          name: "Content Accuracy Score",
          detail:
            "Quarterly assessment of member public statements for factual accuracy and professional tone (Target: >95% accurate and non-contentious statements).",
        },
        {
          name: "Expert Engagement",
          detail:
            "Number of Policy Primers successfully delivered by Ministerial/Technical Experts (Target: 45 per annum).",
        },
        {
          name: "Spokesperson Utilization",
          detail:
            "Total number of external media appearances by G2K members as policy commentators (Target: 100 per annum).",
        },
      ],
    },
    {
      id: "economic-literacy",
      title: "Economic Literacy",
      promise:
        "Leading national budget cycle discussions with coworkers and citizens to translate complex fiscal policy into real-world impact.",
      tactics: [
        {
          name: '"Budget Break-Down" Campaign',
          detail:
            "Launch an annual public campaign, consisting of a series of infographics and town halls immediately following the National Budget presentation.",
        },
        {
          name: '"Fiscal Policy & You" Module',
          detail:
            "Integrate a mandatory module into the G2K training curriculum, focusing on complex fiscal topics like the Net International Reserve (NIR) and debt-to-GDP ratio.",
        },
        {
          name: "Budget Cheat Sheet",
          detail:
            'Create and distribute a simplified, user-friendly "Budget Cheat Sheet" to members and the public via digital and print channels for broad community outreach.',
        },
      ],
      measurements: [
        {
          name: "Public Reach",
          detail:
            'Total number of unique downloads/views of the "Budget Break-Down" campaign content (Target: 50,000 views/downloads).',
        },
        {
          name: "Citizen Engagement",
          detail:
            "Number of community town halls or workshops led by G2K members on economic literacy (Target: 20 across all Chapters annually).",
        },
        {
          name: "Knowledge Transfer",
          detail:
            "Increase in member scores on a post-training economic literacy assessment (Target: Average score improvement of 40%).",
        },
      ],
    },
    {
      id: "future-proofing-jamaica",
      title: "Future-Proofing Jamaica",
      promise:
        "Leading the conversation on resilience, renewables, the blue economy, and the creative industries to ensure we remain competitive globally.",
      tactics: [
        {
          name: "Policy Action Groups (PAGs)",
          detail:
            "Form three permanent Policy Action Groups (PAGs): Renewable Energy, Blue Economy, and Creative Economy, responsible for continuous policy research and advocacy.",
        },
        {
          name: "Annual Public Symposia",
          detail:
            "Mandate each PAG to host one high-level public symposium per year on their respective topic, featuring both local and international experts to elevate the conversation.",
        },
        {
          name: "International Collaboration",
          detail:
            "Leverage the Vice-President (International Relations) role to secure partnerships with international youth organizations focused on climate resilience and blue economy development for joint projects.",
        },
      ],
      measurements: [
        {
          name: "Policy Output",
          detail:
            "Number of research papers or policy briefs submitted by PAGs to relevant government ministries or agencies (Target: 6 papers per annum).",
        },
        {
          name: "Symposium Attendance",
          detail:
            "Average attendance rate (physical and virtual) at the three annual public symposia (Target: 300 unique attendees per event).",
        },
        {
          name: "International Collaboration",
          detail:
            "Number of formally established, active partnerships with international youth organizations on future-proofing topics (Target: 3 active partnerships).",
        },
      ],
    },
  ],
};

// ─── Pillar 3 ──────────────────────────────────────────────────────
export const pillar3 = {
  id: "sustainable-financing",
  number: 3,
  heading: "Sustainable Financing",
  intro:
    "To achieve our mission, G2K needs a financial plan, not just ad hoc fundraising. My plan,",
  boldInline: "FUNDING OUR FUTURE",
  introEnd: ", focuses on building an organisation that is financially self-sufficient and professionally managed.",
  keyTargets: [
    "5 new corporate partners per annum",
    "$1.5 million JMD Future Fund reserve by Year 2",
    "100% of planned National Policy Projects fully funded",
    "50% reduction in dependence on ad hoc funding by Year 1",
  ],
  modules: [
    {
      id: "professional-fundraising",
      title: "Professional Fundraising",
      promise:
        "Re-establishing the Fundraising Committee with a focus on corporate discipline and a clear value proposition for donors and partners.",
      tactics: [
        {
          name: "Establish a formal, documented Charter for the Fundraising Committee",
          detail:
            "Defining roles, responsibilities, and corporate governance standards within the first 30 days.",
        },
        {
          name: "Develop a professional, tiered Sponsorship Proposal Package (bronze, silver, gold)",
          detail:
            "Detailing G2K's value proposition (e.g., policy influence, member access) for private sector partners.",
        },
        {
          name: "Implement a donor management system (CRM)",
          detail:
            "To track all outreach, commitments, and fulfillment of donor benefits.",
        },
      ],
      measurements: [
        {
          name: "Committee Functionality",
          detail:
            "Charter adoption and 100% attendance at quarterly committee meetings.",
        },
        {
          name: "Proposal Quality",
          detail: "Launch of the tiered Sponsorship Package within 60 days.",
        },
        {
          name: "Corporate Engagement",
          detail:
            "Number of new corporate partners secured (Target: 5 per annum).",
        },
      ],
    },
    {
      id: "reliable-resources",
      title: "Reliable Resources",
      promise:
        "Moving toward a treasury model that can support major national policy projects and member development year-round.",
      tactics: [
        {
          name: 'Establish a "Future Fund" reserve account',
          detail:
            "Dedicating 25% of all new non-member revenue to this reserve to stabilize resources.",
        },
        {
          name: "Develop and implement a standardized budget allocation process",
          detail:
            'Dedicating specific annual amounts to "National Policy Projects" and "Member Training" (e.g., 40% of the annual budget).',
        },
        {
          name: "Introduce a standardized, low-cost member contribution",
          detail:
            '(e.g., $1,000 JMD annual fee) linked directly to exclusive "Accelerate Your Career" digital resources.',
        },
      ],
      measurements: [
        {
          name: "Financial Health (Reserve)",
          detail:
            'Total balance of the "Future Fund" reserve account (Target: $1.5 million JMD by Year 2).',
        },
        {
          name: "Project Funding",
          detail:
            "Percentage of planned National Policy Projects fully funded (Target: 100% of the annual project budget).",
        },
        {
          name: "Self-Sufficiency",
          detail:
            "Reduction in reliance on ad hoc, non-corporate, one-off fundraising events (Target: Decrease of 50% in dependence on ad-hoc funding by Year 1).",
        },
      ],
    },
  ],
};

// ─── Closing Message ──────────────────────────────────────────────
export const messageToG2K = {
  heading: "A Message to G2K",
  paragraphs: [
    "Fellow delegates, the G2K Presidency is an operational post, not a symbolic milestone. We need performance, not promises. I am stepping forward to offer you a renewed G2K defined by opportunities, an elevated profile and valuable impact.",
    "Our membership deserves a return on investment. I am ready to lead on Day One to ensure this is where the future happens.",
  ],
  closingLine: "Newton is your solution.",
  closingTagline: "TESTED. PROVEN. READY.",
};

// ─── Nav labels ───────────────────────────────────────────────────
export const navItems = [
  { label: "Home", href: "/" },
  { label: "The Candidate", href: "/the-candidate" },
  { label: "The Ticket", href: "/the-ticket" },
  { label: "Gallery", href: "/gallery" },
  { label: "Mission", href: "/mission" },
  {
    label: "The Plan",
    href: "/plan",
    children: [
      { label: "Pillar 1: Chapter & Member Development", href: "/plan/chapter-and-member-development" },
      { label: "Pillar 2: National Policy & Thought Leadership", href: "/plan/national-policy-and-thought-leadership" },
      { label: "Pillar 3: Sustainable Financing", href: "/plan/sustainable-financing" },
    ],
  },
  { label: "Message to G2K", href: "/message-to-g2k" },
  { label: "Reach Out", href: "/reach-out" },
];
