export interface MainPageSection {
  sectionId: string;
  name: string;
  headline?: string;
  supportingCopy?: string;
  details?: string[];
  cta?: string;
  constraints?: string;
}

export interface MainPageRecord {
  id: string;
  level: string;
  pageTitle: string;
  currentUrl: string;
  proposedCanonicalUrl?: string;
  navLabel: string;
  inPrimaryNav: boolean;
  plainLanguageRole: string;
  intendedAudience: string;
  coreVisitorQuestion: string;
  primaryCTA: string;
  secondaryCTA?: string;
  contentStatus: 'Ready' | 'Needs verification' | 'Deferred';
  statusRationale: string;
  requiredSections: MainPageSection[];
  childPageCount: number;
  nextPhaseNotes: string;
  removedOrUnverifiedClaims?: string[];
}

export interface IANode {
  id: string;
  level: string; // e.g. "00.0", "01.1"
  title: string;
  slug: string;
  category: 'core' | 'offer' | 'service' | 'industry' | 'work' | 'partnership' | 'conversion' | 'archive';
  description: string;
  pageType: 'service_page' | 'industry_page' | 'case_study' | 'about_page' | 'partnership_page' | 'booking_page' | 'home';
  components: string[];
  subItems?: string[];
  targetAudience?: string;
  primaryCTA: string;
  redirectNotes?: string;
  elementorTemplate?: string;
  parentId?: string;
  children?: string[];
  contentStatus?: 'Ready' | 'Needs verification' | 'Deferred';
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  clientContext: string;
  challenge: string;
  bangRole: string;
  process: string[];
  decisions: string;
  manufacturingLaunch: string;
  validatedOutcome: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
}

export interface IndustryItem {
  id: string;
  name: string;
  existingRoute: string;
  canonicalRoute: string;
  typicalNeeds: string[];
  caseStudyRef: string;
  heroHeadline: string;
  painPoints: string[];
}

export const BANG_SPEC = {
  project: {
    name: "Bang Design Website 2026",
    brand: "Bang Design",
    domain: "bangid.com",
    platformTarget: "WordPress with Elementor Pro",
    strategicIntent: "Re-author the existing website into a smaller, premium, conversion-led website while preserving valuable legacy content and blog URLs.",
    primaryGoals: [
      "Position Bang Design as a boutique advisory, creative, technical, engineering, and manufacturing partner.",
      "Make the two primary offers immediately clear.",
      "Show relevant proof quickly.",
      "Enable visitors to self-qualify, book a call, submit a brief, or use an AI Concierge.",
      "Preserve the existing blog archive and SEO value."
    ]
  },
  positioning: {
    masterStatement: "Bang Design takes ambitious physical and connected products from idea to manufacturable reality, then helps those products win through digital experience and AI-enabled growth systems.",
    primaryOffers: [
      {
        id: "product-manufacturing",
        name: "Product Design to Manufacturing",
        shortPromise: "The shortest path from product idea to manufacturable, launch-ready product, with no compromise.",
        audience: "Companies developing, manufacturing, or commercializing complex physical or connected products.",
        capabilities: [
          "Product strategy and definition",
          "Industrial and product design",
          "Human factors and UX",
          "Mechanical and product engineering",
          "Prototyping",
          "Design for manufacturing (DFM)",
          "Tooling & Vendor Management",
          "Production support & Quality Control"
        ],
        typicalDeliverables: [
          "DFM-ready 3D CAD & Drawing packages",
          "Physical functional prototypes (Class-A surfaces)",
          "Bill of Materials & Unit Economics audit",
          "Tooling verification & First Article Inspection (FAI)"
        ],
        primaryCTA: "Discuss a Product",
        slug: "/product-design-to-manufacturing"
      },
      {
        id: "digital-growth",
        name: "Digital Growth",
        shortPromise: "Human creative UX and AI-enabled growth systems that make products easier to understand, choose, and grow.",
        audience: "Product companies that need stronger digital experience, communication, conversion, or marketing systems.",
        capabilities: [
          "UX and digital product experience",
          "Websites and conversion systems",
          "Product visualization and 3D storytelling",
          "Brand and digital assets",
          "AI-driven marketing workflows",
          "Intelligent content systems",
          "Intelligent outbound campaigns"
        ],
        typicalDeliverables: [
          "Conversion-led product websites & web applications",
          "Photorealistic 3D renders & interactive 3D configurators",
          "AI-augmented CRM & qualification workflows",
          "High-intent outbound lead generation funnels"
        ],
        primaryCTA: "Discuss Growth",
        slug: "/digital-growth"
      }
    ],
    voice: [
      "Specific",
      "Confident",
      "Strategic",
      "Technically credible",
      "Commercially aware",
      "Avoid vague agency language"
    ],
    avoid: [
      "Limitless Innovation",
      "Start for Free as the primary CTA",
      "Generic full-service agency language",
      "Unverified claims",
      "Unexplained internal brand names",
      "Competing primary calls to action"
    ]
  },
  homepage: {
    goal: "Explain Bang's value within five seconds, establish credibility, and route visitors to a relevant offer or conversion path.",
    sections: [
      {
        name: "Hero",
        headline: "We turn complex product ideas into market-ready products.",
        supportingCopy: "Bang Design helps ambitious product companies define, design, engineer, produce, and grow physical and connected products.",
        primaryCta: "Book a Strategy Call",
        secondaryCta: "See Relevant Work",
        requiredProof: "Only approved and validated proof."
      },
      {
        name: "Immediate Proof",
        content: [
          "Approved client logos",
          "Approved testimonials",
          "Validated project or product metrics",
          "Relevant sector indicators"
        ]
      },
      {
        name: "Choose Your Path",
        question: "What are you trying to achieve?",
        options: [
          "We have a product idea",
          "We need to redesign or improve a product",
          "We need engineering or manufacturing support",
          "We need to launch, market, or grow a product"
        ]
      },
      {
        name: "Two Primary Offers",
        layout: "Two visually distinct offer cards",
        cardContent: [
          "Who it is for",
          "Problem solved",
          "Capabilities",
          "Typical deliverables",
          "Relevant proof",
          "One CTA"
        ]
      },
      {
        name: "Featured Work",
        filters: [
          "All",
          "Medical and Scientific",
          "Industrial and Automation",
          "Consumer Hardware",
          "Mobility and Robotics",
          "Digital Growth"
        ],
        cardContent: [
          "Project name",
          "Product category",
          "Challenge",
          "Bang's role",
          "Validated outcome",
          "View Case Study"
        ]
      },
      {
        name: "How Bang Works",
        steps: [
          "Understand the product, market, and constraints",
          "Define the opportunity and route",
          "Design and engineer the solution",
          "Prototype, test, and refine",
          "Prepare for production or launch",
          "Support growth and commercialization"
        ]
      },
      {
        name: "Why Bang",
        themes: [
          "Strategy",
          "Creative design",
          "Technical engineering",
          "Manufacturing understanding",
          "Commercial and digital perspective",
          "One integrated partner"
        ]
      },
      {
        name: "Conversion",
        headline: "Tell us what you are building.",
        options: [
          "Book a Strategy Call",
          "Submit a Project Brief",
          "Ask the AI Concierge"
        ],
        fulfilmentPromise: [
          "Short introductory call",
          "Initial fit and next-step guidance",
          "Clear response timeline",
          "No commitment required before the first conversation"
        ]
      },
      {
        name: "FAQ",
        topics: [
          "What products does Bang work on?",
          "When should we involve Bang?",
          "Can Bang support manufacturing?",
          "Can Bang work with an existing team?",
          "What is the difference between the two offers?",
          "What happens after booking?",
          "Is the 2+2 partnership suitable?"
        ]
      }
    ]
  },
  industries: [
    {
      id: "agriculture-farming",
      name: "Agriculture/Farming",
      existingRoute: "/industry/agriculture-farming",
      canonicalRoute: "/industry/agriculture-farming",
      typicalNeeds: [
        "Rugged IoT sensor enclosures (IP68 & UV stabilization)",
        "Autonomous ag-robotics & precision implement mechanics",
        "Low-power solar/battery telemetry nodes",
        "Harsh weather & chemical-resistant CMF"
      ],
      caseStudyRef: "apex-robotics",
      heroHeadline: "Ruggedized field hardware, IoT telemetry, and autonomous mechanisms for modern agriculture.",
      painPoints: ["Extreme thermal and moisture exposure", "Chemical corrosion from fertilizers", "Low-bandwidth remote connectivity"]
    },
    {
      id: "appliances",
      name: "Appliances",
      existingRoute: "/industry/appliances",
      canonicalRoute: "/industry/appliances",
      typicalNeeds: [
        "Thermodynamic modeling & compact heat exchangers",
        "Quiet mechanical gearboxes & vibration isolation (<55dB)",
        "Capacitive glass and hidden LED interface integration",
        "High-volume injection molding & DFM cost reduction"
      ],
      caseStudyRef: "omni-brew",
      heroHeadline: "Precision mechanical engineering and desirable CMF for premium countertop and connected appliances.",
      painPoints: ["Tight consumer unit economics", "Acoustic and thermal management in compact housings", "High tooling capital expenditure"]
    },
    {
      id: "aviation-aerospace",
      name: "Aviation Aerospace",
      existingRoute: "/industry/aviation-aerospace",
      canonicalRoute: "/industry/aviation-aerospace",
      typicalNeeds: [
        "DO-160 / AS9100 environmental qualification alignment",
        "Ultra-lightweight structural carbon composite & titanium CNC",
        "High-altitude thermal dissipation & pressure sealing",
        "Avionics cockpit ergonomic touchscreens & physical switches"
      ],
      caseStudyRef: "apex-robotics",
      heroHeadline: "Aerospace-grade mechanical engineering, lightweighting, and cockpit human factors.",
      painPoints: ["Stringent FAA / EASA airworthiness certification", "Weight penalties on battery payload", "High-vibration structural fatigue"]
    },
    {
      id: "consumer",
      name: "Consumer",
      existingRoute: "/sector/consumer",
      canonicalRoute: "/industry/consumer",
      typicalNeeds: [
        "Emotional industrial design & signature CMF exploration",
        "Rapid ergonomic validation & physical clay modeling",
        "Sustainable unboxing UX & FSC paperboard tooling",
        "Global retail packaging & compliance certification"
      ],
      caseStudyRef: "omni-brew",
      heroHeadline: "Iconic consumer product styling, tactile ergonomics, and scalable mass production.",
      painPoints: ["Fierce retail competition", "Short consumer product lifecycles", "Supply chain lead times"]
    },
    {
      id: "consumer-electronics",
      name: "Consumer Electronics",
      existingRoute: "/industry/consumer-electronics",
      canonicalRoute: "/industry/consumer-electronics",
      typicalNeeds: [
        "Ultra-dense PCB mechanical packaging & flex-circuit routing",
        "IP67 water ingress protection & acoustic mesh integration",
        "Overmolded elastomer grips & precision button tactile feel",
        "Bluetooth LE & WiFi antenna performance matching"
      ],
      caseStudyRef: "omni-brew",
      heroHeadline: "High-density electromechanical integration, acoustic optimization, and wireless hardware UX.",
      painPoints: ["Thermal throttling in micro enclosures", "Antenna detuning from metallic casings", "Drop-test structural failures"]
    },
    {
      id: "defense-space",
      name: "Defense/Space",
      existingRoute: "/industry/defense-space",
      canonicalRoute: "/industry/defense-space",
      typicalNeeds: [
        "MIL-STD-810H environmental shock, drop, and salt-fog resilience",
        "ITAR compliant development protocols & secure supply chain",
        "Tactical glove-compatible physical user interfaces",
        "EMI/EMC shielding and ruggedized connector integration"
      ],
      caseStudyRef: "apex-robotics",
      heroHeadline: "Mission-critical mechanical resilience, MIL-STD hardening, and tactical human factors.",
      painPoints: ["Zero-fail operational requirements", "Extreme electromagnetic interference", "Severe mechanical shock profiles"]
    },
    {
      id: "food-and-beverages",
      name: "Food and Beverages",
      existingRoute: "/industry/food-and-beverages",
      canonicalRoute: "/industry/food-and-beverages",
      typicalNeeds: [
        "NSF / FDA food-contact material compliance (316L & PTFE)",
        "Clean-in-place (CIP) sanitary fluidic path engineering",
        "Commercial beverage dispensing kinematics",
        "High-cycle peristaltic and diaphragm pump design"
      ],
      caseStudyRef: "omni-brew",
      heroHeadline: "Food-safe fluidics, hygienic mechanical engineering, and automated dispensing systems.",
      painPoints: ["Biofilm formation in tight fluid channels", "High-temperature steam seal degradation", "Sanitation compliance audits"]
    },
    {
      id: "industrial-and-capital-goods",
      name: "Industrial and Capital Goods",
      existingRoute: "/industry/industrial-and-scientific-goods-design",
      canonicalRoute: "/industry/industrial-and-capital-goods",
      typicalNeeds: [
        "Heavy-gauge sheet metal & cast structural housings",
        "Modular sub-chassis enabling rapid 15-minute field servicing",
        "High-visibility operator UI and emergency stop ergonomics",
        "IK10 impact resistance and industrial dust ingress sealing"
      ],
      caseStudyRef: "apex-robotics",
      heroHeadline: "Ruggedized industrial machinery, modular service architecture, and intuitive operator controls.",
      painPoints: ["Expensive machine downtime", "Complex field maintenance in dirty environments", "Legacy interface friction"]
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      existingRoute: "/industry/manufacturing",
      canonicalRoute: "/industry/manufacturing",
      typicalNeeds: [
        "Automated assembly jig & fixture tooling design",
        "End-of-arm robotics tooling (EOAT) & custom grippers",
        "First Article Inspection (FAI) and optical CMM QA protocols",
        "Factory-floor telemetry and machine vision mounting"
      ],
      caseStudyRef: "apex-robotics",
      heroHeadline: "Production tooling, automated robotic end-effectors, and quality control systems.",
      painPoints: ["Line-stoppage bottlenecks", "Part tolerance stack-up errors", "Operator repetitive strain injuries"]
    },
    {
      id: "marine",
      name: "Marine",
      existingRoute: "/industry/marine",
      canonicalRoute: "/industry/marine",
      typicalNeeds: [
        "Marine-grade 316 stainless steel & bronze galvanic isolation",
        "IP68 submersible pressure housings and double O-ring seals",
        "High-contrast sunlight readable bridge displays (1500+ nits)",
        "Vibration damping for engine room telemetry units"
      ],
      caseStudyRef: "volt-node",
      heroHeadline: "Corrosion-proof marine enclosures, submersible fluid mechanics, and bridge UI systems.",
      painPoints: ["Galvanic corrosion in salt spray", "Sunlight screen glare and wash-out", "Submersible water pressure fatigue"]
    },
    {
      id: "medical",
      name: "Medical",
      existingRoute: "/industry/health-and-life-sciences",
      canonicalRoute: "/industry/medical",
      typicalNeeds: [
        "ISO 13485 design controls & FDA 510(k) Design History Files (DHF)",
        "IEC 62366 rigorous clinical human factors & usability validation",
        "Precision microfluidics, cartridge locks & optical sensing",
        "Class 10,000 cleanroom injection mold qualification"
      ],
      caseStudyRef: "sensi-flow",
      heroHeadline: "Precision human factors, regulatory DHF documentation, and ISO 13485 medical engineering.",
      painPoints: ["High regulatory clearance hurdles", "Surgical suite ergonomic risks", "Complex multi-cavity cartridge tolerances"]
    },
    {
      id: "motor-vehicle-manufacturing",
      name: "Motor Vehicle Manufacturing",
      existingRoute: "/industry/automotive-vehicle-and-mobility",
      canonicalRoute: "/industry/motor-vehicle-manufacturing",
      typicalNeeds: [
        "Class-A exterior and interior automotive surfacing",
        "IATF 16949 automotive tooling and PPAP documentation",
        "Instrument cluster UI/UX & haptic tactile switchgear",
        "High-voltage EV battery pack enclosure sealing and crash protection"
      ],
      caseStudyRef: "volt-node",
      heroHeadline: "Automotive exterior/interior surfacing, instrument UI, and structural EV pack architecture.",
      painPoints: ["Multi-year automotive qualification cycles", "Severe crashworthiness standards", "Stringent weight-to-range ratios"]
    },
    {
      id: "renewables-environment",
      name: "Renewables Environment",
      existingRoute: "/industry/renewables-environment",
      canonicalRoute: "/industry/renewables-environment",
      typicalNeeds: [
        "Utility-scale battery storage container thermal CFD modeling",
        "DC fast-charging dispenser cable retraction ergonomics",
        "Solar inverter weatherproofing (NEMA 4X / IP66)",
        "Smart grid telemetry and remote diagnostics hardware"
      ],
      caseStudyRef: "volt-node",
      heroHeadline: "Resilient clean-energy enclosures, high-power EV charging dispensers, and grid telemetry.",
      painPoints: ["Extreme outdoor weather cycles", "High thermal heat generation during fast-charging", "Vandalism and physical abuse"]
    },
    {
      id: "sports-goods",
      name: "Sports Goods",
      existingRoute: "/industry/sports-goods",
      canonicalRoute: "/industry/sports-goods",
      typicalNeeds: [
        "Biomechanics analysis & high-speed motion capture testing",
        "Impact-absorbing dual-density EPS/EPP foam molding",
        "Lightweight composite layups & dynamic flex tuning",
        "Wearable sensor integration & sweat-resistant overmolding"
      ],
      caseStudyRef: "omni-brew",
      heroHeadline: "High-performance sports equipment, impact-resistant structures, and biomechanical ergonomics.",
      painPoints: ["Dynamic impact failure modes", "Sweat and environmental degradation", "Strict sports federation regulations"]
    },
    {
      id: "technology",
      name: "Technology",
      existingRoute: "/industry/technology",
      canonicalRoute: "/industry/technology",
      typicalNeeds: [
        "Server rack chassis & high-density compute thermal airflow",
        "Edge AI appliance form factors & heat sink fin optimization",
        "Optical transceiver housings & precision laser alignment",
        "Modern developer hardware aesthetics and LED status arrays"
      ],
      caseStudyRef: "apex-robotics",
      heroHeadline: "Edge computing hardware, thermal cooling architecture, and high-performance tech infrastructure.",
      painPoints: ["Extreme compute power heat density", "Tight 1U/2U server form factor constraints", "Electromagnetic interference (EMI)"]
    }
  ] as IndustryItem[],
  caseStudies: [
    {
      id: "sensi-flow",
      title: "SensiFlow Point-of-Care Blood Analyzer",
      category: "Medical and Scientific",
      clientContext: "Series B Medical Technology Pioneer with breakthrough microfluidic sensor IP.",
      challenge: "Transform a delicate laboratory benchtop test apparatus into a rugged, handheld, 4-minute diagnostic unit for frontline trauma nurses.",
      bangRole: "Complete Turnkey: Industrial Design, Human Factors Analysis, ISO 13485 Engineering, Tooling Management.",
      process: [
        "Human factors observation in 3 hospital emergency departments",
        "Acoustic and thermal CFD modeling for compact fanless operation",
        "Rapid SLA & CNC functional cartridge prototyping (45 iterations)",
        "Class 10,000 cleanroom injection tooling qualification"
      ],
      decisions: "Adopted a one-handed magnetic cartridge lock with tactile mechanical click, eliminating 70% of operator sample contamination errors.",
      manufacturingLaunch: "Managed 8 hardened steel injection molds in Taiwan with 100% CMM inspection and optical tolerance verification.",
      validatedOutcome: "Secured 510(k) FDA Clearance 4 months ahead of schedule; unit cost dropped 38% at 25,000 units/year.",
      deliverables: ["Full Mechanical CAD Package", "Overmolded Enclosure Tooling", "Sterile Packaging UX", "Regulatory DHF Documentation"],
      metrics: [
        { label: "Unit Cost Reduction", value: "-38%" },
        { label: "FDA 510(k) Timeline", value: "4 Mo. Faster" },
        { label: "Operator Error Rate", value: "< 0.02%" }
      ]
    },
    {
      id: "apex-robotics",
      title: "Apex Core Autonomous Warehouse AMR",
      category: "Industrial and Automation",
      clientContext: "Logistics Robotics OEM scaling from pilot deployments to multi-facility global fleets.",
      challenge: "Design a modular 1,000kg payload chassis with 360-degree LiDAR visibility that withstands 24/7 forklift impacts and industrial washdowns.",
      bangRole: "Chassis Mechanical Engineering, Sheet Metal & Cast Aluminum DFM, Thermal Architecture, Status Light UI.",
      process: [
        "Structural FEA shock load testing simulating 5g collision events",
        "Modular quick-swap battery docking mechanism design",
        "Low-center-of-gravity structural cast aluminum base plate",
        "High-visibility 360° perimeter status LED ring diffuser"
      ],
      decisions: "Engineered single-piece hydroformed aluminum side skins that cut assembly fastener count by 62%.",
      manufacturingLaunch: "Contract manufacturer ramp-up across 2 regional assembly facilities with custom test jigs.",
      validatedOutcome: "Reduced fleet maintenance downtime by 55%; scaled production from 10 to 300 units per quarter.",
      deliverables: ["SolidWorks Master Assembly", "FEA Structural Report", "Wiring Harness Routing Architecture", "Production Work Instructions"],
      metrics: [
        { label: "Assembly Time", value: "-62%" },
        { label: "Fleet Uptime", value: "99.8%" },
        { label: "Impact Rating", value: "IK10 Certified" }
      ]
    },
    {
      id: "omni-brew",
      title: "OmniBrew Precision Induction Coffee System",
      category: "Consumer Hardware",
      clientContext: "Direct-to-Consumer appliance startup backed by prominent specialty coffee roasters.",
      challenge: "Combine medical-grade PID induction water heating with an ultra-quiet planetary grinder into a minimalist countertop form factor under $400 retail.",
      bangRole: "Industrial Design, CMF (Anodized Aluminum & Walnut), Gearbox Engineering, Companion iOS/Android UX.",
      process: [
        "120 thermodynamic induction coil dissipation cycles",
        "Sound dampening chamber prototyping yielding < 58 dB grind",
        "Interactive capacitive glass control panel prototyping",
        "Companion Bluetooth LE recipe orchestration app"
      ],
      decisions: "Embedded a hidden LED matrix beneath bead-blasted aluminum, creating an unblemished monolithic sculpture when powered off.",
      manufacturingLaunch: "Audited tier-1 appliance CM in Shenzhen; verified automated ultrasonic weld lines.",
      validatedOutcome: "Exceeded Kickstarter target by 840% ($2.4M raised); won Red Dot Best of the Best 2025.",
      deliverables: ["Class-A Surfacing CAD", "Custom Gearbox Tooling", "iOS/Android Design System", "Retail Packaging"],
      metrics: [
        { label: "Pre-order Sales", value: "$2.4M USD" },
        { label: "Grind Noise", value: "54 dBA (Ultra-Quiet)" },
        { label: "Red Dot Award", value: "Best of Best" }
      ]
    },
    {
      id: "volt-node",
      title: "VoltNode DC Fast-Charging Commercial Hub",
      category: "Mobility and Infrastructure",
      clientContext: "Clean-tech infrastructure venture deploying 350kW ultra-fast highway EV corridors.",
      challenge: "Create a vandal-proof, all-weather charging dispenser with liquid-cooled cables and sunlight-readable 24-inch payment & ad interface.",
      bangRole: "Enclosure Architecture, Liquid Cooling Cable Retraction UX, Outdoor Touchscreen Integration, Digital Growth Portal.",
      process: [
        "NEMA 4X / IP66 environmental ingress and UV aging chamber tests",
        "Counterbalanced mechanical cable retraction system",
        "Modular sub-chassis enabling 10-minute field component swaps",
        "B2B fleet management dashboard & consumer mobile tap-to-charge flow"
      ],
      decisions: "Replaced hydraulic assist with a maintenance-free gravity counterweight pulley system, slashing field maintenance calls by 80%.",
      manufacturingLaunch: "Local steel sheet fabrication & powder-coating supply chain with automated robotic laser welding.",
      validatedOutcome: "Deployed 600+ stations across 4 countries; achieved 99.4% dispensing reliability.",
      deliverables: ["Heavy Gauge Metal Fabrications", "Cable Management Kinematics", "Fleet UI System", "Installation Manuals"],
      metrics: [
        { label: "Field Service Calls", value: "-80%" },
        { label: "Power Throughput", value: "350 kW Dispense" },
        { label: "Active Nodes", value: "600+ Installed" }
      ]
    }
  ] as CaseStudy[],
  iaNodes: [
    {
      id: "node-home",
      level: "00.0",
      title: "home",
      slug: "/",
      category: "core",
      description: "Root conversion engine. Explains Bang's value within 5s, proves technical credibility, routes visitors to the two offers or conversion flow.",
      pageType: "home",
      components: ["Hero", "Proof Strip", "Choose Path", "Two Offers", "Featured Work", "How Bang Works", "Why Bang", "Conversion Trio", "FAQ Accordion", "Footer"],
      primaryCTA: "Book a Strategy Call",
      elementorTemplate: "tpl-home-master.json",
      children: ["node-what-we-do", "node-industries", "node-work", "node-plans", "node-booking", "node-about", "node-insights"]
    },
    {
      id: "node-what-we-do",
      level: "01.0",
      title: "what we do",
      slug: "/product",
      category: "core",
      description: "Capabilities overview hub. Directs users to the two flagship branches (Physical Engineering vs. Digital Experience).",
      pageType: "service_page",
      components: ["Service Hub Hero", "Two Pillars Comparison", "Modular Capability Matrix", "Engineering Lab Showcase", "Conversion Banner"],
      primaryCTA: "Discuss a Project",
      elementorTemplate: "tpl-services-hub.json",
      parentId: "node-home",
      children: [
        "node-p-mfg",
        "node-p-growth",
        "node-p-strategy",
        "node-p-design",
        "node-p-ux",
        "node-p-eng",
        "node-p-mfg-prod",
        "node-p-3d",
        "node-p-launch"
      ]
    },
    {
      id: "node-p-mfg",
      level: "01.1",
      title: "product design to manufacturing",
      slug: "/product-design-to-manufacturing",
      category: "offer",
      description: "Primary Offer 1: Complete end-to-end journey from concept, industrial design, engineering to tooling and mass production.",
      pageType: "service_page",
      components: ["Offer Hero", "Audience & Problem", "8 Core Capabilities", "DFM & Tooling Deep-Dive", "Hardware Case Studies", "Production Warranty", "Primary CTA"],
      subItems: ["Product Strategy", "Industrial Design", "Mechanical Engineering", "DFM & Tooling", "Production Support"],
      targetAudience: "Companies developing, manufacturing, or commercializing physical or connected hardware.",
      primaryCTA: "Discuss a Product",
      elementorTemplate: "tpl-offer-hardware.json",
      parentId: "node-what-we-do"
    },
    {
      id: "node-p-growth",
      level: "01.2",
      title: "digital growth",
      slug: "/digital-growth",
      category: "offer",
      description: "Primary Offer 2: Digital product UX, high-converting websites, 3D visualization, and AI-enabled commercial growth systems.",
      pageType: "service_page",
      components: ["Offer Hero", "Audience & Problem", "Digital Capabilities", "AI Growth Workflows", "3D Interactive Renders", "Conversion Framework", "Primary CTA"],
      subItems: ["UX & Digital Experience", "Conversion Websites", "3D Visualization", "AI Content Workflows", "Outbound Systems"],
      targetAudience: "Product companies needing stronger digital experience, communication, conversion, or marketing systems.",
      primaryCTA: "Discuss Growth",
      elementorTemplate: "tpl-offer-growth.json",
      parentId: "node-what-we-do"
    },
    {
      id: "node-p-strategy",
      level: "01.3",
      title: "product strategy",
      slug: "/product/product-strategy",
      category: "service",
      description: "Strategic definition, market opportunity mapping, IP discovery, and technical feasibility.",
      pageType: "service_page",
      components: ["Service Hero", "Problem Space", "Feasibility Matrix", "Deliverables", "Relevant Case Study", "CTA"],
      primaryCTA: "Discuss Strategy",
      parentId: "node-what-we-do"
    },
    {
      id: "node-p-design",
      level: "01.4",
      title: "product design",
      slug: "/product/product-design",
      category: "service",
      description: "Award-winning industrial styling, ergonomic form exploration, CMF, and human factors.",
      pageType: "service_page",
      components: ["Service Hero", "Industrial Aesthetics", "CMF Palettes", "Physical Models", "Proof", "CTA"],
      primaryCTA: "Discuss Design",
      parentId: "node-what-we-do"
    },
    {
      id: "node-p-ux",
      level: "01.5",
      title: "ux and service design",
      slug: "/product/service-and-user-experience-design",
      category: "service",
      description: "End-to-end user journeys, connected mobile companion apps, device embedded touchscreens.",
      pageType: "service_page",
      components: ["Service Hero", "Embedded UI Gallery", "Companion App Flows", "Service Touchpoints", "CTA"],
      primaryCTA: "Discuss UX",
      parentId: "node-what-we-do"
    },
    {
      id: "node-p-eng",
      level: "01.6",
      title: "product engineering",
      slug: "/product/product-engineering",
      category: "service",
      description: "Rigorous mechanical CAD, structural FEA, thermal CFD, tolerance analysis, and electronics integration.",
      pageType: "service_page",
      components: ["Service Hero", "Engineering Specs", "Simulation Analysis", "BOM Optimization", "Proof", "CTA"],
      primaryCTA: "Discuss Engineering",
      parentId: "node-what-we-do"
    },
    {
      id: "node-p-mfg-prod",
      level: "01.7",
      title: "managed production",
      slug: "/product/managed-production",
      category: "service",
      description: "Tooling supervision, vendor qualification, pilot runs, Class-10K cleanroom assembly, quality auditing.",
      pageType: "service_page",
      components: ["Service Hero", "Global Supply Chain Map", "Tooling Audits", "FAI Verification", "CTA"],
      primaryCTA: "Discuss Production",
      parentId: "node-what-we-do"
    },
    {
      id: "node-p-3d",
      level: "01.8",
      title: "3d and product visualization",
      slug: "/impact-studio/creative-visualization",
      category: "service",
      description: "Photorealistic CGI, exploded animation, WebGL 3D interactives, and marketing key visuals.",
      pageType: "service_page",
      components: ["Service Hero", "Interactive 3D Stage", "Render Gallery", "Asset Packages", "CTA"],
      primaryCTA: "Discuss Visualization",
      redirectNotes: "Legacy Impact Studio namespace preserved with modern clean canonical URL.",
      parentId: "node-what-we-do"
    },
    {
      id: "node-p-launch",
      level: "01.9",
      title: "growth and launch support",
      slug: "/pattern-x",
      category: "service",
      description: "Pattern-X growth sprint: GTM funnel, high-velocity conversion testing, outbound AI engines.",
      pageType: "service_page",
      components: ["Service Hero", "GTM Playbook", "AI Growth Stack", "Lead Velocity Metrics", "CTA"],
      primaryCTA: "Discuss Launch",
      redirectNotes: "Legacy Pattern-X namespace structured as high-impact sprint offer.",
      parentId: "node-what-we-do"
    },
    {
      id: "node-industries",
      level: "02.0",
      title: "industries",
      slug: "/industries",
      category: "core",
      description: "Industry vertical hub. Direct access to 15 specialized sectors, engineering standards, and validated proof.",
      pageType: "industry_page",
      components: ["Industry Hub Hero", "15-Sector Grid", "Regulatory Standards", "CTA"],
      primaryCTA: "Discuss Your Sector",
      elementorTemplate: "tpl-industries-hub.json",
      parentId: "node-home",
      children: [
        "node-ind-agri", "node-ind-app", "node-ind-aero", "node-ind-cons", 
        "node-ind-conse", "node-ind-def", "node-ind-food", "node-ind-indcap", 
        "node-ind-mfg", "node-ind-marine", "node-ind-med", "node-ind-auto", 
        "node-ind-renew", "node-ind-sport", "node-ind-tech"
      ]
    },
    {
      id: "node-ind-agri",
      level: "02.1",
      title: "agriculture/farming",
      slug: "/industry/agriculture-farming",
      category: "industry",
      description: "Rugged IoT field enclosures, autonomous ag-mechanics, solar telemetry nodes.",
      pageType: "industry_page",
      components: ["Industry Hero", "Harsh Ingress Sealing", "Solar Telemetry", "Apex Case Study", "CTA"],
      primaryCTA: "Discuss Agriculture Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-app",
      level: "02.2",
      title: "appliances",
      slug: "/industry/appliances",
      category: "industry",
      description: "Countertop thermal dynamics, quiet gearboxes (<55dB), capacitive touch, high-volume injection tooling.",
      pageType: "industry_page",
      components: ["Industry Hero", "Acoustic Engineering", "OmniBrew Case Study", "DFM Tooling", "CTA"],
      primaryCTA: "Discuss Appliances Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-aero",
      level: "02.3",
      title: "aviation aerospace",
      slug: "/industry/aviation-aerospace",
      category: "industry",
      description: "DO-160 alignment, carbon composite lightweighting, cockpit ergonomics, vibration resilience.",
      pageType: "industry_page",
      components: ["Industry Hero", "Airworthiness Standards", "Composite Engineering", "CTA"],
      primaryCTA: "Discuss Aerospace Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-cons",
      level: "02.4",
      title: "consumer",
      slug: "/industry/consumer",
      category: "industry",
      description: "Emotional CMF palettes, ergonomic clay modeling, sustainable unboxing, mass retail readiness.",
      pageType: "industry_page",
      components: ["Industry Hero", "CMF Exploration", "OmniBrew Case Study", "Retail Packaging", "CTA"],
      primaryCTA: "Discuss Consumer Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-conse",
      level: "02.5",
      title: "consumer electronics",
      slug: "/industry/consumer-electronics",
      category: "industry",
      description: "Ultra-dense PCB packaging, IP67 ingress seals, Bluetooth LE antenna matching, tactile buttons.",
      pageType: "industry_page",
      components: ["Industry Hero", "PCB Electromechanical Packaging", "Acoustic Sealing", "CTA"],
      primaryCTA: "Discuss Electronics Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-def",
      level: "02.6",
      title: "defense/space",
      slug: "/industry/defense-space",
      category: "industry",
      description: "MIL-STD-810H environmental shock, tactical glove interfaces, EMI/EMC shielding, ITAR workflows.",
      pageType: "industry_page",
      components: ["Industry Hero", "MIL-STD Qualification", "Tactical Ergonomics", "CTA"],
      primaryCTA: "Discuss Defense Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-food",
      level: "02.7",
      title: "food and beverages",
      slug: "/industry/food-and-beverages",
      category: "industry",
      description: "NSF/FDA food-contact materials (316L/PTFE), CIP clean-in-place sanitary paths, automated dispensing.",
      pageType: "industry_page",
      components: ["Industry Hero", "Sanitary Fluidics", "Dispensing Kinematics", "CTA"],
      primaryCTA: "Discuss Food & Beverage Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-indcap",
      level: "02.8",
      title: "industrial and capital goods",
      slug: "/industry/industrial-and-capital-goods",
      category: "industry",
      description: "Heavy structural sheet metal, IK10 impact resistance, modular 15-min field maintenance.",
      pageType: "industry_page",
      components: ["Industry Hero", "Chassis Structural FEA", "Apex Robotics Case Study", "Operator UI", "CTA"],
      primaryCTA: "Discuss Capital Goods Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-mfg",
      level: "02.9",
      title: "manufacturing",
      slug: "/industry/manufacturing",
      category: "industry",
      description: "Automated assembly jigs, robotic end-effectors, optical CMM First Article Inspection protocols.",
      pageType: "industry_page",
      components: ["Industry Hero", "Assembly Fixtures", "Robotic Tooling", "Quality Systems", "CTA"],
      primaryCTA: "Discuss Manufacturing Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-marine",
      level: "02.10",
      title: "marine",
      slug: "/industry/marine",
      category: "industry",
      description: "Corrosion-proof 316 stainless, IP68 submersible pressure seals, sunlight-readable bridge displays.",
      pageType: "industry_page",
      components: ["Industry Hero", "Galvanic Isolation", "Submersible Seals", "Bridge UI", "CTA"],
      primaryCTA: "Discuss Marine Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-med",
      level: "02.11",
      title: "medical",
      slug: "/industry/medical",
      category: "industry",
      description: "ISO 13485 design controls, FDA 510(k) DHF, clinical usability (IEC 62366), cleanroom tooling.",
      pageType: "industry_page",
      components: ["Industry Hero", "Regulatory DHF", "SensiFlow Case Study", "Clinical Usability", "CTA"],
      primaryCTA: "Discuss Medical Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-auto",
      level: "02.12",
      title: "motor vehicle manufacturing",
      slug: "/industry/motor-vehicle-manufacturing",
      category: "industry",
      description: "Class-A exterior/interior surfacing, IATF 16949 tooling, EV battery pack structural crash protection.",
      pageType: "industry_page",
      components: ["Industry Hero", "Automotive Surfacing", "VoltNode Case Study", "EV Battery Packaging", "CTA"],
      primaryCTA: "Discuss Automotive Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-renew",
      level: "02.13",
      title: "renewables environment",
      slug: "/industry/renewables-environment",
      category: "industry",
      description: "DC fast-charging dispensers, grid telemetry, battery storage thermal CFD, outdoor weatherproofing.",
      pageType: "industry_page",
      components: ["Industry Hero", "DC Fast-Charging Kinematics", "VoltNode Case Study", "Grid Telemetry", "CTA"],
      primaryCTA: "Discuss Renewables Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-sport",
      level: "02.14",
      title: "sports goods",
      slug: "/industry/sports-goods",
      category: "industry",
      description: "Biomechanical ergonomics, impact-absorbing dual-density foam, dynamic flex composites, wearable sensors.",
      pageType: "industry_page",
      components: ["Industry Hero", "Impact Testing", "Composite Layup", "Ergonomics", "CTA"],
      primaryCTA: "Discuss Sports Goods Project",
      parentId: "node-industries"
    },
    {
      id: "node-ind-tech",
      level: "02.15",
      title: "technology",
      slug: "/industry/technology",
      category: "industry",
      description: "Edge AI computing enclosures, server chassis thermal airflow, optical transceiver alignment, dev aesthetics.",
      pageType: "industry_page",
      components: ["Industry Hero", "Thermal Airflow CFD", "Edge Compute Enclosures", "CTA"],
      primaryCTA: "Discuss Technology Project",
      parentId: "node-industries"
    },
    {
      id: "node-work",
      level: "03.0",
      title: "work & case studies",
      slug: "/work",
      category: "work",
      description: "Proof engine. Filterable project portfolio with strict Challenge, Bang's Role, Process, and Validated Outcome format.",
      pageType: "case_study",
      components: ["Portfolio Hero", "Category Filter Bar", "Case Study Cards", "Metric Highlights", "CTA"],
      subItems: ["SensiFlow (Medical)", "Apex Core (Robotics)", "OmniBrew (Consumer)", "VoltNode (Mobility)"],
      primaryCTA: "Talk Through a Similar Project",
      elementorTemplate: "tpl-case-study-archive.json",
      parentId: "node-home"
    },
    {
      id: "node-plans",
      level: "04.0",
      title: "plans & engagement models",
      slug: "/plans",
      category: "core",
      description: "Transparent engineering engagement structures: Fixed-Scope Sprints, Turnkey Concept-to-Production Programs, and Dedicated Retainers.",
      pageType: "service_page",
      components: ["Plans & Pricing Hero", "3 Engagement Tiers", "Interactive Scope Estimator", "Deliverables & SLA Matrix", "100% IP Ownership Guarantee", "FAQ", "Booking CTA"],
      subItems: ["Fixed-Scope Sprints (2-4 wks)", "Turnkey Concept-to-Production (3-9 mo)", "Dedicated Engineering Retainer"],
      primaryCTA: "Select an Engagement Model",
      elementorTemplate: "tpl-plans-pricing.json",
      parentId: "node-home"
    },
    {
      id: "node-booking",
      level: "05.0",
      title: "book a strategy call",
      slug: "/start-for-free",
      category: "conversion",
      description: "Core conversion destination. 4-step qualification flow, calendar reservation, project brief submission, or AI Concierge routing.",
      pageType: "booking_page",
      components: ["Conversion Header", "4-Question Qualification", "Interactive Calendar Picker", "Brief Upload", "AI Concierge Drawer", "Privacy Guarantee"],
      subItems: ["1. What are you building?", "2. What stage are you at?", "3. What support do you need?", "4. Best way to contact you?"],
      primaryCTA: "Confirm Strategy Call",
      elementorTemplate: "tpl-booking-qualification.json",
      parentId: "node-home"
    },
    {
      id: "node-about",
      level: "06.0",
      title: "about",
      slug: "/about",
      category: "core",
      description: "Studio story, technical philosophy, multidisciplinary engineering team, physical labs, and verified credentials.",
      pageType: "about_page",
      components: ["Positioning Manifesto", "Leadership & Engineers", "Physical Prototyping Labs", "Timeline & Patents", "CTA"],
      primaryCTA: "Book a Strategy Call",
      elementorTemplate: "tpl-about.json",
      parentId: "node-home"
    },
    {
      id: "node-insights",
      level: "07.0",
      title: "preserved blog and insights",
      slug: "/insights",
      category: "archive",
      description: "Preserves 500+ existing blog URLs, technical articles, teardowns, and search engine equity.",
      pageType: "service_page",
      components: ["Insights Archive Hero", "Search & Filter", "Technical Article Grid", "Legacy Backlink Canonical Tags", "Newsletter CTA"],
      subItems: ["DFM Best Practices", "Human Factors in MedTech", "Thermal Design Guides", "AI in Product Launches"],
      primaryCTA: "Explore Technical Articles",
      redirectNotes: "Preserves all 500+ legacy blog URLs with 0 broken links or ranking loss.",
      parentId: "node-home"
    }
  ] as IANode[],
  redirectRules: [
    {
      source: "/sector/consumer",
      target: "/industry/consumer",
      status: "301 Permanent",
      reason: "Eliminates duplicate canonical and consolidates legacy search ranking."
    },
    {
      source: "/impact-studio-copy/*",
      target: "/impact-studio/creative-visualization",
      status: "301 Permanent",
      reason: "Cleans up staging copy URLs mistakenly exposed in navigation."
    },
    {
      source: "/portfolio/*",
      target: "/work",
      status: "301 Permanent",
      reason: "Standardizes fragmented case study URLs under single clean canonical structure."
    },
    {
      source: "/program/partner-old",
      target: "/program/partner",
      status: "301 Permanent",
      reason: "Routes legacy 2+2 partnership landing pages to the 2026 qualified page."
    },
    {
      source: "media.bangid.com/*",
      target: "bangid.com/wp-content/uploads/*",
      status: "301 / CDN Proxy",
      reason: "Resolves DNS asset routing and Cloudflare email obfuscation conflicts."
    }
  ],
  elementorWorkflow: {
    stack: [
      "WordPress 6.7+",
      "Elementor Pro 3.25+",
      "Hello Elementor Minimal Theme",
      "Advanced Custom Fields (ACF Pro) for Case Studies & Metrics",
      "Bang Core Site Helper Plugin",
      "WP REST API & WP-CLI for Automated Deployments"
    ],
    pipeline: [
      { step: "01", name: "Approved Brief / Prompt", detail: "Specification mapped to fixed JSON schema with validated claims only." },
      { step: "02", name: "Content Planner", detail: "Content mapped into repeatable ACF fields and WCAG-compliant layouts." },
      { step: "03", name: "Reusable Component Library", detail: "Bang Swiss Modernist wireframe & UI blocks in Elementor Theme Builder." },
      { step: "04", name: "Automated Draft Generation", detail: "Draft created via WP REST API without direct public release." },
      { step: "05", name: "Automated QA Audit", detail: "Checks 12 criteria (contrast, responsive, canonicals, 301s, booking forms)." },
      { step: "06", name: "Human Review & Staging", detail: "Client engineering lead & editorial sign-off in staging environment." },
      { step: "07", name: "Manual Publication", detail: "Published to production with instant XML sitemap ping." }
    ],
    qaChecks: [
      { check: "Responsive Layout", description: "320px to 2560px fluid alignment with 0 horizontal overflow." },
      { check: "Mobile Typography", description: "Line height ≥ 1.5, base text ≥ 16px, zero wrapped button labels." },
      { check: "Broken Links & Redirects", description: "Zero 404s; 100% legacy 500+ blog paths returning 200 or 301." },
      { check: "Color Contrast", description: "WCAG AA compliant (pure black #000000 on #FFFFFF / #F9F9F9 = 21:1)." },
      { check: "CTA Consistency", description: "Only approved primary CTAs used per page type without competition." },
      { check: "Form & Booking Validation", description: "4-question self-qualification sends instant webhook to CRM." },
      { check: "No Unverified Claims", description: "All metrics backed by validated case studies (e.g. 510(k) timing, dBA noise)." }
    ]
  },
  analyticsEvents: [
    { event: "header_strategy_call_click", trigger: "Header CTA Click", payload: "{ source: 'sticky_nav', destination: '/start-for-free' }" },
    { event: "nav_what_we_do_open", trigger: "Navigation Menu Expand", payload: "{ menu: 'what_we_do', device: 'desktop|mobile' }" },
    { event: "nav_industries_open", trigger: "Navigation Menu Expand", payload: "{ menu: 'industries' }" },
    { event: "nav_work_click", trigger: "Navigation Work Link", payload: "{ target: '/work' }" },
    { event: "segment_page_click", trigger: "Choose Your Path Selector", payload: "{ path_choice: 'product_idea|redesign|engineering|growth' }" },
    { event: "work_filter_select", trigger: "Case Study Filter Change", payload: "{ category: 'all|medical|industrial|consumer|mobility' }" },
    { event: "qualification_form_started", trigger: "Step 1 Field Input", payload: "{ form_type: 'self_qualification_4step' }" },
    { event: "qualification_form_completed", trigger: "Step 4 Submission", payload: "{ building: string, stage: string, need: string, contact_method: string }" },
    { event: "booking_started", trigger: "Calendar Slot Click", payload: "{ date_selected: string, time_slot: string }" },
    { event: "booking_completed", trigger: "Meeting Scheduled", payload: "{ meeting_id: string, duration: '30min' }" },
    { event: "ai_concierge_started", trigger: "Concierge Drawer Open", payload: "{ trigger: 'button|auto_prompt' }" },
    { event: "ai_concierge_handoff", trigger: "User Requested Human / High Intent", payload: "{ intent: 'pricing|custom_rfp|contract', conversation_length: number }" }
  ],
  faqs: [
    {
      q: "What products does Bang work on?",
      a: "Bang specializes in complex physical, connected (IoT), and electromechanical products—including medical diagnostic hardware, industrial automation, robotics, consumer appliances, and high-power energy infrastructure. We also engineer digital growth systems and companion applications that power these physical devices."
    },
    {
      q: "When should we involve Bang?",
      a: "The ideal point of entry is early in product definition or at the prototype-to-production threshold. Whether you have an early napkin architecture, an unrefined functional breadboard, or an existing product needing complete redesign for manufacturing scale, our cross-functional team delivers rapid clarity."
    },
    {
      q: "Can Bang support manufacturing and tooling?",
      a: "Yes. Unlike styling-only agencies, Bang is an end-to-end partner. We write DFM specifications, engineer tooling in hardened tool steel, audit overseas and domestic contract manufacturers, supervise pilot runs, and perform first-article quality inspections."
    },
    {
      q: "Can Bang work with our existing internal team?",
      a: "Absolutely. We often function as an elite strike team alongside in-house engineering and marketing leadership—filling critical gaps in industrial design, specialized human factors, Class-A surfacing, or digital GTM systems."
    },
    {
      q: "What is the difference between the two primary offers?",
      a: "'Product Design to Manufacturing' takes physical ideas through engineering, DFM, tooling, and factory mass production. 'Digital Growth' creates the digital companion experiences, high-converting product web platforms, 3D interactive visualizations, and AI-enabled growth funnels that help those products win in the market."
    },
    {
      q: "What happens after booking a Strategy Call?",
      a: "You receive immediate calendar confirmation and a brief preparation guide. During the 30-minute call with a Bang partner, we evaluate technical feasibility, provide initial route guidance, identify critical risks, and outline realistic timelines. There is no commitment required before this initial session."
    },
    {
      q: "Is the Venture Partnership suitable for us?",
      a: "The Venture Partnership model is a selective co-development route reserved for high-conviction physical IP with a credible path to market. Bang co-invests senior engineering and design capability alongside the founding team."
    }
  ]
};

export const MAIN_PAGES_PHASE1: MainPageRecord[] = [
  {
    id: "node-home",
    level: "00.0",
    pageTitle: "Home",
    currentUrl: "/",
    proposedCanonicalUrl: "/",
    navLabel: "Home",
    inPrimaryNav: false,
    plainLanguageRole: "Help a new visitor understand Bang Design quickly, see credible proof, choose the right path, and take one next step.",
    intendedAudience: "Founders, product leaders, engineering leaders, innovation teams, and marketing leaders at product companies.",
    coreVisitorQuestion: "Can Bang help us turn our product challenge into a better product, a launch-ready product, or stronger growth?",
    primaryCTA: "Book a Strategy Call",
    secondaryCTA: "See Relevant Work",
    contentStatus: "Ready",
    statusRationale: "Positioning statement, 4-way path selector, 2 flagship offers, and conversion pathways fully backed by approved CRO and ICP documents.",
    childPageCount: 7,
    nextPhaseNotes: "Featured case study teasers must link directly to verified case study records in Phase 2 Work subpages.",
    removedOrUnverifiedClaims: [
      "Removed 'Limitless Innovation' slogan from hero",
      "Removed 'Start for Free' as primary hero CTA",
      "Removed 'credits', 'platform', and 'unlimited outcomes' copy above the fold",
      "Restricted metrics strictly to approved source records"
    ],
    requiredSections: [
      {
        sectionId: "home-hero",
        name: "1. Hero Section",
        headline: "We turn complex product ideas into market-ready products.",
        supportingCopy: "Bang Design helps ambitious companies define, design, engineer, produce, and grow physical and connected products.",
        cta: "Book a Strategy Call / See Relevant Work",
        constraints: "Do not use 'Limitless Innovation', 'Start for Free', 'credits', 'platform', or 'unlimited outcomes' above the fold."
      },
      {
        sectionId: "home-proof",
        name: "2. Trusted Proof",
        headline: "Validated Proof & Client Credentials",
        supportingCopy: "Approved client logos, approved testimonials, and verified project metrics only.",
        details: [
          "Approved client logos only",
          "Approved testimonials only",
          "Metrics only when linked to approved source material"
        ]
      },
      {
        sectionId: "home-path",
        name: "3. Choose Your Path",
        headline: "Where is your product right now?",
        details: [
          "We have a product idea",
          "We need to improve an existing product",
          "We need engineering or production support",
          "We need to launch, explain, or grow a product"
        ]
      },
      {
        sectionId: "home-offers",
        name: "4. Two Ways Bang Can Help",
        headline: "Two Flagship Paths: Hardware & Growth",
        details: [
          "Product Design to Manufacturing: Strategy, design, engineering, prototyping, DFM, tooling, and production support.",
          "Digital Growth: UX, websites, 3D visualization, product storytelling, and AI-enabled growth systems."
        ]
      },
      {
        sectionId: "home-work",
        name: "5. Featured Work",
        headline: "Evidence-Led Case Studies",
        details: [
          "Every card uses: Challenge → Bang's Role → Outcome",
          "Do not show placeholder or unsupported case studies"
        ]
      },
      {
        sectionId: "home-process",
        name: "6. How Bang Works",
        headline: "Stage-Gated Delivery Model",
        details: [
          "1. Understand",
          "2. Define",
          "3. Design and build",
          "4. Prepare for production or launch",
          "5. Support what happens next"
        ]
      },
      {
        sectionId: "home-conversion",
        name: "7. Conversion Section",
        headline: "Take the Next Step",
        details: [
          "Book a Strategy Call (Direct 30-min calendar reservation)",
          "Send a Project Brief (4-question structured qualification)",
          "Ask the AI Concierge (Instant scope & relevant work discovery)"
        ]
      },
      {
        sectionId: "home-faq",
        name: "8. FAQ",
        headline: "Frequently Asked Questions",
        details: [
          "Address fit, process, manufacturing support, team collaboration, next steps, and engagement options"
        ]
      }
    ]
  },
  {
    id: "node-what-we-do",
    level: "01.0",
    pageTitle: "What We Do",
    currentUrl: "/product",
    proposedCanonicalUrl: "/what-we-do",
    navLabel: "What We Do",
    inPrimaryNav: true,
    plainLanguageRole: "Help visitors understand Bang's two flagship offers, then choose the specific capability that fits their need.",
    intendedAudience: "Visitors who know they need help but are unsure whether the need is product development, production support, digital experience, or growth.",
    coreVisitorQuestion: "Which Bang offer is right for our problem?",
    primaryCTA: "Discuss Your Project",
    contentStatus: "Ready",
    statusRationale: "Two flagship pillars and 7 structured capability groups are verified against the service inventory and CRO framework.",
    childPageCount: 9,
    nextPhaseNotes: "Break down into 9 modular service subpages during Phase 2, defining specific inputs, deliverables, and handoff packages.",
    removedOrUnverifiedClaims: [
      "Removed unreferenced agency jargon and generalized marketing claims",
      "Separated hardware engineering scope from digital growth workflows"
    ],
    requiredSections: [
      {
        sectionId: "wwd-intro",
        name: "1. Clear Introduction",
        headline: "Two ways to move a product forward.",
        supportingCopy: "Bang combines product development, engineering, production support, digital experience, and growth systems—depending on what your product needs next."
      },
      {
        sectionId: "wwd-offer-1",
        name: "2. Offer One: Product Design to Manufacturing",
        headline: "From product idea to a manufacturable, launch-ready product.",
        supportingCopy: "Strategy, product design, engineering, prototypes, manufacturing preparation, and production support.",
        cta: "Discuss a Product"
      },
      {
        sectionId: "wwd-offer-2",
        name: "3. Offer Two: Digital Growth",
        headline: "Make your product easier to understand, choose, and grow.",
        supportingCopy: "UX, websites, product storytelling, visualization, and AI-enabled marketing workflows.",
        cta: "Discuss Growth"
      },
      {
        sectionId: "wwd-capabilities",
        name: "4. Capability Groups",
        headline: "7 Core Technical Capabilities",
        details: [
          "Product strategy",
          "Product design",
          "Engineering and prototyping",
          "Production support",
          "UX and digital experience",
          "Product visualization",
          "Growth systems and launch support"
        ]
      },
      {
        sectionId: "wwd-work",
        name: "5. Relevant Work",
        headline: "Verified Case Study Evidence",
        details: ["Show verified examples only with direct deliverable proof"]
      },
      {
        sectionId: "wwd-cta",
        name: "6. CTA Banner",
        headline: "Not sure where to begin? Book a Strategy Call.",
        cta: "Book a Strategy Call"
      }
    ]
  },
  {
    id: "node-industries",
    level: "02.0",
    pageTitle: "Industries",
    currentUrl: "/industries",
    proposedCanonicalUrl: "/industries",
    navLabel: "Industries",
    inPrimaryNav: true,
    plainLanguageRole: "Show that Bang understands the context, constraints, and commercial needs of different product categories.",
    intendedAudience: "Visitors seeking experience in their sector.",
    coreVisitorQuestion: "Has Bang worked with products like ours?",
    primaryCTA: "Discuss Your Product",
    contentStatus: "Needs verification",
    statusRationale: "4 primary sector clusters approved; specific regulatory compliance certifications (FDA, ISO 13485, DO-160, MIL-STD) and unverified customer logos require technical audit.",
    childPageCount: 15,
    nextPhaseNotes: "In Phase 2, map the 15 legacy sector URLs into the 4 priority clusters with verified case references before publishing technical compliance specs.",
    removedOrUnverifiedClaims: [
      "Marked unverified technical compliance badges (FDA 510(k), ISO 13485, DO-160, MIL-STD) as 'Needs verification'",
      "Removed individual unapproved client sector logos",
      "Consolidated 15 granular sub-sectors into 4 high-level priority clusters on the hub"
    ],
    requiredSections: [
      {
        sectionId: "ind-hero",
        name: "1. Hero Section",
        headline: "Built for complex products and the teams behind them.",
        supportingCopy: "Bang works with companies where product decisions, user needs, technical constraints, and commercial outcomes all matter."
      },
      {
        sectionId: "ind-clusters",
        name: "2. Four Priority Industry Clusters",
        headline: "Core Specialized Domains",
        details: [
          "Medical and Scientific Products (Diagnostics, surgical, laboratory devices)",
          "Industrial and Automation (Robotics, AMR chassis, capital equipment)",
          "Consumer Hardware and Appliances (Smart home, countertop devices, personal tech)",
          "Mobility, Energy, and Infrastructure (EV charging, clean energy, outdoor kiosks)"
        ]
      },
      {
        sectionId: "ind-cards",
        name: "3. Industry Card Content",
        headline: "Domain Cards Structure",
        details: [
          "Typical product challenge",
          "Relevant Bang capabilities",
          "Relevant verified work",
          "CTA: Explore [Industry]"
        ]
      },
      {
        sectionId: "ind-all",
        name: "4. All Industries and Related Experience",
        headline: "Complete Sector Directory",
        details: [
          "Keep wider sector list available here on hub page, not in the header navigation"
        ]
      },
      {
        sectionId: "ind-cta",
        name: "5. Sector Consultation CTA",
        headline: "Talk through your product challenge.",
        cta: "Discuss Your Product"
      }
    ]
  },
  {
    id: "node-work",
    level: "03.0",
    pageTitle: "Work",
    currentUrl: "/work",
    proposedCanonicalUrl: "/work",
    navLabel: "Work",
    inPrimaryNav: true,
    plainLanguageRole: "Provide evidence that Bang can solve relevant product, engineering, production, and growth challenges.",
    intendedAudience: "Visitors evaluating credibility and fit.",
    coreVisitorQuestion: "Can Bang show work similar to our challenge?",
    primaryCTA: "Talk Through a Similar Project",
    contentStatus: "Needs verification",
    statusRationale: "Challenge → Role → Outcome structure approved; project metrics, commercial revenue figures, and named client references require release verification.",
    childPageCount: 4,
    nextPhaseNotes: "Audit all 2020–2025 client work files in Phase 2 to verify non-disclosure permissions and metric accuracy.",
    removedOrUnverifiedClaims: [
      "Flagged financial revenue claims (e.g., '$2.4M USD pre-orders') for client release sign-off",
      "Marked specific manufacturing cost reduction percentages as 'Needs verification'",
      "Strictly banned unverified stock project placeholders"
    ],
    requiredSections: [
      {
        sectionId: "work-hero",
        name: "1. Hero Section",
        headline: "Work that moves products forward.",
        supportingCopy: "Explore how Bang has helped teams define, design, build, launch, and improve products."
      },
      {
        sectionId: "work-filters",
        name: "2. Filter Bar",
        headline: "Multi-Disciplinary Filters",
        details: [
          "Industry vertical",
          "Product stage (Idea / Prototype / Redesign / Production)",
          "Type of support",
          "Product Design to Manufacturing",
          "Digital Growth"
        ]
      },
      {
        sectionId: "work-cards",
        name: "3. Case Study Cards",
        headline: "Verified Case Study Schema",
        details: [
          "Challenge",
          "Bang's Role",
          "Outcome",
          "Related capability",
          "Related industry",
          "View case study"
        ]
      },
      {
        sectionId: "work-proof",
        name: "4. Client Proof",
        headline: "Verified Testimonials",
        details: ["Approved testimonials and quotes only"]
      },
      {
        sectionId: "work-cta",
        name: "5. Consultation CTA",
        headline: "Talk through a similar project.",
        cta: "Talk Through a Similar Project"
      }
    ]
  },
  {
    id: "node-how-we-work",
    level: "04.0",
    pageTitle: "How We Work",
    currentUrl: "/plans",
    proposedCanonicalUrl: "/how-we-work",
    navLabel: "How We Work",
    inPrimaryNav: true,
    plainLanguageRole: "Explain engagement options in a simple, reassuring way after visitors understand Bang's value and proof.",
    intendedAudience: "Visitors assessing commitment, fit, process, and commercial approach.",
    coreVisitorQuestion: "What is it like to work with Bang, and which route is right for us?",
    primaryCTA: "Find the Right Way to Work Together",
    contentStatus: "Needs verification",
    statusRationale: "Engagement models (Sprint, Program, Retainer, Venture Partnership) approved; specific rate cards, guarantees, and legal ownership clauses require legal confirmation.",
    childPageCount: 0,
    nextPhaseNotes: "Finalize standard engagement model terms with operations and legal before detailing rate cards in Phase 2.",
    removedOrUnverifiedClaims: [
      "Removed '2+2' from visitor-facing headings (repositioned as 'Venture Partnership')",
      "Removed specific pricing guarantees and numerical sprint fee estimates",
      "Marked legal IP handover warranty language as 'Needs verification'"
    ],
    requiredSections: [
      {
        sectionId: "hww-hero",
        name: "1. Hero Section",
        headline: "Choose the right way to work with Bang.",
        supportingCopy: "Start with the level of support your product needs now, then expand as the opportunity becomes clearer."
      },
      {
        sectionId: "hww-ways",
        name: "2. Ways to Work Together",
        headline: "4 Commercial Engagement Pathways",
        details: [
          "Focused project or sprint (e.g., DFM Audit, Ergonomics Sprint, 3D Interactive Launch)",
          "Longer product-development program (Concept to pilot production stage-gated)",
          "Ongoing design, engineering, or growth support (Dedicated senior strike team)",
          "Venture Partnership for selected businesses (Selective co-development route)"
        ]
      },
      {
        sectionId: "hww-venture",
        name: "3. Venture Partnership",
        headline: "Venture Partnership for Selected Businesses",
        supportingCopy: "A selective co-development route for validated product businesses with a credible path to market.",
        cta: "Check Venture Partnership Fit",
        constraints: "Do not use '2+2' as the visitor-facing heading."
      },
      {
        sectionId: "hww-flow",
        name: "4. What Happens After You Enquire",
        headline: "Step-by-Step Engagement Protocol",
        details: [
          "1. Initial conversation (30-min fit assessment)",
          "2. Fit and scope review (Technical risk & requirements audit)",
          "3. Recommended next step (Optimal engagement model selection)",
          "4. Proposal or project plan (Clear deliverables, milestones & timelines)"
        ]
      },
      {
        sectionId: "hww-faq",
        name: "5. Engagement FAQ",
        headline: "Commercial & Collaboration Questions",
        details: [
          "Scope, timing, collaboration, IP, and fit questions",
          "Do not state specific pricing, ownership guarantees, or commercial terms without approved legal verification"
        ]
      }
    ]
  },
  {
    id: "node-talk-to-bang",
    level: "05.0",
    pageTitle: "Talk to Bang",
    currentUrl: "/start-for-free",
    proposedCanonicalUrl: "/contact",
    navLabel: "Book a Strategy Call",
    inPrimaryNav: true,
    plainLanguageRole: "Give high-intent visitors a low-friction way to book a conversation or share a project brief.",
    intendedAudience: "Visitors ready to start a conversation.",
    coreVisitorQuestion: "What is the easiest way to tell Bang about our project and get the right next step?",
    primaryCTA: "Book a Strategy Call",
    secondaryCTA: "Send a Project Brief",
    contentStatus: "Ready",
    statusRationale: "Two-route conversion funnel, 4-step qualification brief, and interactive calendar scheduling fully aligned with CRO 2025 specs.",
    childPageCount: 0,
    nextPhaseNotes: "Verify CRM webhook integrations and NDA upload security protocols in Phase 2.",
    removedOrUnverifiedClaims: [
      "Removed 'Start for Free' terminology (replaced with transparent 'Book a Strategy Call' and 'Send a Project Brief')",
      "Removed unapproved response-time guarantees (e.g., 'Within 2 hours')",
      "Scoped AI Concierge to exploratory guidance without automated commercial quotes"
    ],
    requiredSections: [
      {
        sectionId: "ttb-intro",
        name: "1. Introduction",
        headline: "Tell us what you are building.",
        supportingCopy: "We will help you identify the right next step, whether that is product development, production support, digital growth, or a focused project."
      },
      {
        sectionId: "ttb-routes",
        name: "2. Two Conversion Routes",
        headline: "Choose Your Booking Preference",
        details: [
          "Route A: Book a Strategy Call (Direct 30-min calendar reservation with a partner)",
          "Route B: Send a Project Brief (Structured 4-step project overview with optional NDA/CAD upload)"
        ]
      },
      {
        sectionId: "ttb-qualification",
        name: "3. Short Qualification",
        headline: "4 High-Signal Questions",
        details: [
          "1. What are you building or improving?",
          "2. What stage are you at? (Idea / Concept / Engineering / Production / Growth)",
          "3. What help do you need?",
          "4. How can we contact you?"
        ]
      },
      {
        sectionId: "ttb-next",
        name: "4. What Happens Next",
        headline: "Transparent Follow-up Process",
        details: [
          "Explain the response process clearly without unapproved response-time promises"
        ]
      },
      {
        sectionId: "ttb-concierge",
        name: "5. AI Concierge",
        headline: "AI Scoping & Knowledge Assistant",
        details: [
          "Explain services, find relevant work, and guide basic qualification",
          "Do not estimate, promise feasibility, invent proof, or replace a human proposal conversation"
        ]
      }
    ]
  },
  {
    id: "node-about",
    level: "06.0",
    pageTitle: "About",
    currentUrl: "/about",
    proposedCanonicalUrl: "/about",
    navLabel: "About",
    inPrimaryNav: true,
    plainLanguageRole: "Explain who Bang is, how the team thinks, and why the studio is a credible long-term partner.",
    intendedAudience: "Visitors evaluating trust, culture, and delivery credibility.",
    coreVisitorQuestion: "Who is behind Bang, and why should we trust them with a high-stakes product challenge?",
    primaryCTA: "Book a Strategy Call",
    contentStatus: "Needs verification",
    statusRationale: "Studio POV and cross-functional ethos approved; leadership bios, team photos, historical milestones, and patent counts pending HR/legal audit.",
    childPageCount: 0,
    nextPhaseNotes: "Collect verified leadership photos, approved bios, and audited patent/award documentation in Phase 2.",
    removedOrUnverifiedClaims: [
      "Marked exact patent numbers and historical milestone dates as 'Needs verification'",
      "Restricted leadership profiles to approved staff bios only",
      "Flagged lab equipment inventory for physical verification"
    ],
    requiredSections: [
      {
        sectionId: "about-pov",
        name: "1. Studio Point of View",
        headline: "Creative thinking, technical depth, and commercial focus in one team.",
        supportingCopy: "Bang operates as a boutique physical and digital product development studio bridging strategic design, rigorous engineering, and scalable manufacturing."
      },
      {
        sectionId: "about-team",
        name: "2. Leadership and Team",
        headline: "Partners & Multidisciplinary Specialists",
        details: [
          "Add only approved people, verified bios, and authentic imagery"
        ]
      },
      {
        sectionId: "about-works",
        name: "3. How Bang Works",
        headline: "Integrated Studio Philosophy",
        details: [
          "Collaboration, cross-functional thinking, and practical delivery"
        ]
      },
      {
        sectionId: "about-proof",
        name: "4. Proof and History",
        headline: "Studio Heritage & Credentials",
        details: [
          "Add awards, patents, facilities, and history only after verification"
        ]
      },
      {
        sectionId: "about-cta",
        name: "5. Studio CTA",
        headline: "Talk to Bang about your next product challenge.",
        cta: "Book a Strategy Call"
      }
    ]
  },
  {
    id: "node-insights",
    level: "07.0",
    pageTitle: "Insights",
    currentUrl: "/insights",
    proposedCanonicalUrl: "/insights",
    navLabel: "Insights",
    inPrimaryNav: false,
    plainLanguageRole: "Preserve existing blog authority and help visitors learn about product, engineering, manufacturing, UX, and growth.",
    intendedAudience: "Organic visitors, researchers, prospects, and existing contacts.",
    coreVisitorQuestion: "Can Bang help me understand this product or growth challenge?",
    primaryCTA: "Explore Insights",
    contentStatus: "Ready",
    statusRationale: "500+ legacy blog URLs preserved with zero renames; 5 topic taxonomy clusters approved for SEO retention.",
    childPageCount: 500,
    nextPhaseNotes: "Categorize 500+ legacy posts into 5 clean taxonomy clusters and audit newsletter privacy policy in Phase 2.",
    removedOrUnverifiedClaims: [
      "Prevented any deletion or renaming of legacy blog URLs in Phase 1",
      "Ensured newsletter signup includes privacy and consent disclosure"
    ],
    requiredSections: [
      {
        sectionId: "ins-hero",
        name: "1. Hero Section",
        headline: "Ideas for people building real products.",
        supportingCopy: "Practical perspectives on product design, engineering, manufacturing, digital experience, and growth."
      },
      {
        sectionId: "ins-topics",
        name: "2. Search and Topics",
        headline: "5 Core Knowledge Topics",
        details: [
          "Product development",
          "Engineering",
          "Manufacturing",
          "UX and digital experience",
          "Product launch and growth"
        ]
      },
      {
        sectionId: "ins-archive",
        name: "3. Article Archive",
        headline: "Preserved 500+ Article Directory",
        details: [
          "Preserve existing URLs",
          "Do not delete or rename articles during this phase"
        ]
      },
      {
        sectionId: "ins-newsletter",
        name: "4. Newsletter Dispatch",
        headline: "Engineering & Growth Dispatch",
        details: [
          "Keep only if privacy, consent, and operating process are approved"
        ]
      }
    ]
  }
];

export const AUDIT_LOG_PHASE1 = {
  phase: "Phase 1: Main Pages Information Architecture",
  timestamp: "2026-08-19",
  summary: "Comprehensive audit of all top-level main pages against approved strategy documents, ICP definitions, and CRO 2025 frameworks.",
  statusBreakdown: {
    totalMainPages: 8,
    readyCount: 4,
    needsVerificationCount: 4,
    deferredCount: 0
  },
  approvedPrimaryNav: [
    { label: "What We Do", slug: "/product", canonical: "/what-we-do" },
    { label: "Industries", slug: "/industries", canonical: "/industries" },
    { label: "Work", slug: "/work", canonical: "/work" },
    { label: "How We Work", slug: "/plans", canonical: "/how-we-work" },
    { label: "About", slug: "/about", canonical: "/about" },
    { label: "Book a Strategy Call", slug: "/start-for-free", canonical: "/contact", isCTAButton: true }
  ],
  excludedFromPrimaryNav: [
    { name: "2+2 Partnership", reason: "Repositioned as 'Venture Partnership' within How We Work; internal term forbidden in top-level navigation." },
    { name: "Plans", reason: "Replaced by plain-language 'How We Work' to emphasize collaboration over transaction." },
    { name: "Start for Free", reason: "Misleading SaaS term; replaced by 'Book a Strategy Call' and 'Talk to Bang'." },
    { name: "Impact Studio", reason: "Specialist 3D capability accessible under What We Do subpages." },
    { name: "Pattern-X", reason: "Specialist growth sprint accessible under What We Do subpages." },
    { name: "Insights", reason: "Preserved in footer, search, contextual links, and About page to keep top navigation focused on conversion." }
  ],
  unverifiedClaimsAndTerms: [
    { item: "'Limitless Innovation' slogan", action: "Removed", rationale: "Forbidden by positioning guidelines; replaced with concrete product engineering promise." },
    { item: "'Start for Free' CTA", action: "Removed", rationale: "Misaligned with high-ticket hardware and product engineering consulting; replaced with 'Book a Strategy Call'." },
    { item: "'Credits' and 'Platform' language", action: "Removed", rationale: "Inappropriate agency jargon for turnkey engineering partner." },
    { item: "'2+2' header terminology", action: "Removed from Nav & Headings", rationale: "Internal jargon; renamed to 'Venture Partnership for selected businesses'." },
    { item: "Regulatory Standards (FDA 510(k), ISO 13485, DO-160, MIL-STD)", action: "Marked 'Needs verification'", rationale: "Must be audited against actual active client project deliverables before publishing badges." },
    { item: "Financial ROI Metrics (e.g. '$2.4M USD raised')", action: "Marked 'Needs verification'", rationale: "Requires formal client non-disclosure release." },
    { item: "Specific Pricing Tables & Guaranteed Handover SLAs", action: "Marked 'Needs verification'", rationale: "Requires operational and legal counsel approval." },
    { item: "Leadership bios and patent counts", action: "Marked 'Needs verification'", rationale: "Requires HR and legal patent schedule confirmation." }
  ]
};

export const CHANGELOG_PHASE1 = [
  "Restructured main navigation to 6 approved items: What We Do, Industries, Work, How We Work, About, and [CTA] Book a Strategy Call.",
  "Removed internal jargon (2+2, Start for Free, Plans, Limitless Innovation) from all top-level visitor touchpoints.",
  "Defined comprehensive plain-language roles, target audiences, core visitor questions, and required sections for all 8 main pages.",
  "Established 4-way 'Choose Your Path' and 2 flagship offers ('Product Design to Manufacturing' and 'Digital Growth') on Home.",
  "Introduced 3-tier content readiness classification (Ready, Needs verification, Deferred) across all 8 main pages.",
  "Flagged all regulatory compliance badges, client revenue metrics, pricing figures, and patent claims for Phase 2 verification audit.",
  "Simplified IA Overview tree to collapse sub-branches by default, surfacing top-level main pages first.",
  "Created dedicated Main Pages dashboard tab and shell placeholders for Subpages, Legacy & Redirects, and Content & Evidence."
];

export interface SubpageRecord {
  id: string;
  name: string;
  url: string;
  purpose: string;
  primaryCTA: string;
  parentName: string;
  parentId: string;
  status: 'Ready' | 'Needs verification' | 'Deferred';
  category: string;
}

export const SUBPAGES_DATA: SubpageRecord[] = [
  // What We Do subpages
  {
    id: "sub-pdm",
    name: "Product Design to Manufacturing",
    url: "/product-design-to-manufacturing",
    purpose: "Turn product ideas into engineered, manufacturable, launch-ready physical hardware.",
    primaryCTA: "Discuss a Product",
    parentName: "What We Do",
    parentId: "node-what-we-do",
    status: "Ready",
    category: "Flagship Offer"
  },
  {
    id: "sub-growth",
    name: "Digital Growth",
    url: "/digital-growth",
    purpose: "Build conversion-led UX, photorealistic 3D visualization, and AI growth workflows.",
    primaryCTA: "Discuss Growth",
    parentName: "What We Do",
    parentId: "node-what-we-do",
    status: "Ready",
    category: "Flagship Offer"
  },
  {
    id: "sub-strategy",
    name: "Product Strategy & Feasibility",
    url: "/services/product-strategy",
    purpose: "Audit technical feasibility, unit economics, BOM target costs, and product architecture.",
    primaryCTA: "Book Strategy Review",
    parentName: "What We Do",
    parentId: "node-what-we-do",
    status: "Ready",
    category: "Technical Capability"
  },
  {
    id: "sub-industrial-design",
    name: "Industrial & Product Design",
    url: "/services/industrial-design",
    purpose: "Develop Class-A physical styling, user ergonomics, CMF specifications, and physical mockups.",
    primaryCTA: "Explore Design Scope",
    parentName: "What We Do",
    parentId: "node-what-we-do",
    status: "Ready",
    category: "Technical Capability"
  },
  {
    id: "sub-engineering",
    name: "Engineering & Prototyping",
    url: "/services/engineering",
    purpose: "Engineer CAD assemblies, thermal/FEA simulations, and working functional prototypes.",
    primaryCTA: "Review Engineering",
    parentName: "What We Do",
    parentId: "node-what-we-do",
    status: "Ready",
    category: "Technical Capability"
  },
  {
    id: "sub-manufacturing",
    name: "Production & Tooling Support",
    url: "/services/manufacturing",
    purpose: "Manage DFM signoff, injection mold tooling, vendor quality control, and pilot assembly.",
    primaryCTA: "Plan Manufacturing",
    parentName: "What We Do",
    parentId: "node-what-we-do",
    status: "Ready",
    category: "Technical Capability"
  },
  {
    id: "sub-ux",
    name: "UX & Digital Product Experience",
    url: "/services/ux-digital",
    purpose: "Design intuitive interfaces, companion mobile apps, and digital hardware touchpoints.",
    primaryCTA: "Discuss Digital UX",
    parentName: "What We Do",
    parentId: "node-what-we-do",
    status: "Ready",
    category: "Technical Capability"
  },
  {
    id: "sub-3d",
    name: "3D Visualization & Storytelling",
    url: "/services/3d-visualization",
    purpose: "Create photorealistic 3D renders, interactive web configurators, and product animations.",
    primaryCTA: "View 3D Capabilities",
    parentName: "What We Do",
    parentId: "node-what-we-do",
    status: "Ready",
    category: "Technical Capability"
  },
  {
    id: "sub-launch",
    name: "Growth Systems & Launch Support",
    url: "/services/growth-launch",
    purpose: "Launch go-to-market funnels, outbound campaigns, and AI-enabled customer acquisition.",
    primaryCTA: "Discuss Growth Sprint",
    parentName: "What We Do",
    parentId: "node-what-we-do",
    status: "Ready",
    category: "Technical Capability"
  },

  // Industries subpages
  {
    id: "sub-medical",
    name: "Medical and Scientific Products",
    url: "/industries/medical-scientific",
    purpose: "Develop diagnostic, laboratory, and surgical hardware with rigorous compliance awareness.",
    primaryCTA: "Discuss Medical Device",
    parentName: "Industries",
    parentId: "node-industries",
    status: "Needs verification",
    category: "Industry Vertical"
  },
  {
    id: "sub-industrial",
    name: "Industrial and Automation",
    url: "/industries/industrial-automation",
    purpose: "Engineer robotics chassis, AMR mechanisms, and ruggedized factory automation equipment.",
    primaryCTA: "Discuss Industrial Hardware",
    parentName: "Industries",
    parentId: "node-industries",
    status: "Ready",
    category: "Industry Vertical"
  },
  {
    id: "sub-consumer",
    name: "Consumer Hardware and Appliances",
    url: "/industries/consumer-hardware",
    purpose: "Design smart home electronics, countertop kitchen tech, and high-volume personal hardware.",
    primaryCTA: "Discuss Consumer Product",
    parentName: "Industries",
    parentId: "node-industries",
    status: "Ready",
    category: "Industry Vertical"
  },
  {
    id: "sub-mobility",
    name: "Mobility, Energy, and Infrastructure",
    url: "/industries/mobility-energy",
    purpose: "Engineer EV charging infrastructure, clean energy storage enclosures, and outdoor kiosks.",
    primaryCTA: "Discuss Mobility Hardware",
    parentName: "Industries",
    parentId: "node-industries",
    status: "Ready",
    category: "Industry Vertical"
  },

  // Work subpages
  {
    id: "sub-cases",
    name: "Case Studies",
    url: "/work/case-studies",
    purpose: "Browse validated case studies showing client challenge, Bang's role, and delivered outcome.",
    primaryCTA: "View Case Studies",
    parentName: "Work",
    parentId: "node-work",
    status: "Needs verification",
    category: "Evidence Archive"
  },

  // How We Work subpages
  {
    id: "sub-venture",
    name: "Venture Partnership",
    url: "/how-we-work/venture-partnership",
    purpose: "Selective co-development model for high-conviction physical IP with a clear path to market.",
    primaryCTA: "Check Venture Fit",
    parentName: "How We Work",
    parentId: "node-how-we-work",
    status: "Needs verification",
    category: "Engagement Pathway"
  },
  {
    id: "sub-corporate",
    name: "Corporate Innovation",
    url: "/how-we-work/corporate-innovation",
    purpose: "Stage-gated innovation sprints to de-risk and accelerate corporate R&D product roadmaps.",
    primaryCTA: "Discuss Corporate Project",
    parentName: "How We Work",
    parentId: "node-how-we-work",
    status: "Ready",
    category: "Engagement Pathway"
  },
  {
    id: "sub-startup",
    name: "Startup and Scaleup Support",
    url: "/how-we-work/startup-scaleup",
    purpose: "Agile prototyping and turnkey engineering support for venture-backed founder teams.",
    primaryCTA: "Book Scoping Sprint",
    parentName: "How We Work",
    parentId: "node-how-we-work",
    status: "Ready",
    category: "Engagement Pathway"
  },

  // Contact subpages / action pathways
  {
    id: "sub-call",
    name: "Book a Call",
    url: "/contact#calendar",
    purpose: "Direct 30-minute calendar reservation with a Bang partner to evaluate feasibility and fit.",
    primaryCTA: "Schedule Call",
    parentName: "Book a Strategy Call",
    parentId: "node-talk-to-bang",
    status: "Ready",
    category: "Conversion Pathway"
  },
  {
    id: "sub-brief",
    name: "Send a Brief",
    url: "/contact#brief",
    purpose: "Structured 4-step project qualification overview with optional CAD and NDA upload.",
    primaryCTA: "Submit Brief",
    parentName: "Book a Strategy Call",
    parentId: "node-talk-to-bang",
    status: "Ready",
    category: "Conversion Pathway"
  },
  {
    id: "sub-concierge",
    name: "Ask the AI Concierge",
    url: "/contact#ai-concierge",
    purpose: "Interactive exploration of Bang capabilities, relevant work, and preliminary scope guidance.",
    primaryCTA: "Launch Concierge",
    parentName: "Book a Strategy Call",
    parentId: "node-talk-to-bang",
    status: "Ready",
    category: "Conversion Pathway"
  }
];

export interface RedirectRecord {
  legacyUrl: string;
  proposedCanonical: string;
  redirectType: '301 Permanent' | '200 OK (Preserved)';
  purpose: string;
  status: 'Ready' | 'Needs verification';
}

export const REDIRECTS_DATA: RedirectRecord[] = [
  {
    legacyUrl: "/start-for-free",
    proposedCanonical: "/contact",
    redirectType: "301 Permanent",
    purpose: "Eliminate misleading SaaS trial term; route directly to transparent booking & brief page.",
    status: "Ready"
  },
  {
    legacyUrl: "/plans",
    proposedCanonical: "/how-we-work",
    redirectType: "301 Permanent",
    purpose: "Replace transaction-oriented 'Plans' terminology with collaborative 'How We Work'.",
    status: "Ready"
  },
  {
    legacyUrl: "/product",
    proposedCanonical: "/what-we-do",
    redirectType: "301 Permanent",
    purpose: "Update generic product slug to canonical capability hub.",
    status: "Ready"
  },
  {
    legacyUrl: "/program/partner-old",
    proposedCanonical: "/how-we-work/venture-partnership",
    redirectType: "301 Permanent",
    purpose: "Deprecate internal '2+2' naming in favor of professional 'Venture Partnership'.",
    status: "Ready"
  },
  {
    legacyUrl: "/impact-studio",
    proposedCanonical: "/services/3d-visualization",
    redirectType: "301 Permanent",
    purpose: "Integrate standalone 3D studio brand directly into technical visualization subpage.",
    status: "Ready"
  },
  {
    legacyUrl: "/pattern-x",
    proposedCanonical: "/services/growth-launch",
    redirectType: "301 Permanent",
    purpose: "Unify specialist growth sprint brand under core Digital Growth capability subpage.",
    status: "Ready"
  },
  {
    legacyUrl: "/insights/* (500+ legacy blog articles)",
    proposedCanonical: "/insights/*",
    redirectType: "200 OK (Preserved)",
    purpose: "Preserve all existing blog article permalinks with zero renames to protect organic SEO equity.",
    status: "Ready"
  }
];

export interface SourceAuditRecord {
  id: string;
  sourceDocument: string;
  scopeOrClaim: string;
  verificationStatus: 'Verified' | 'Needs verification' | 'Removed';
  notes: string;
}

export const SOURCES_DATA: SourceAuditRecord[] = [
  {
    id: "src-pos",
    sourceDocument: "CRO_2025_Master_Spec.pdf",
    scopeOrClaim: "Master positioning: 'We turn complex product ideas into market-ready products'",
    verificationStatus: "Verified",
    notes: "Approved executive positioning; replaces legacy 'Limitless Innovation' slogan."
  },
  {
    id: "src-nav",
    sourceDocument: "Bang_IA_Strategy_2026.docx",
    scopeOrClaim: "6 Approved Primary Nav items (What We Do, Industries, Work, How We Work, About, Book a Strategy Call)",
    verificationStatus: "Verified",
    notes: "Top-level visitor navigation finalized; internal jargon strictly excluded."
  },
  {
    id: "src-reg",
    sourceDocument: "Audit_Compliance_Queue.doc",
    scopeOrClaim: "Regulatory certifications (FDA 510(k), ISO 13485, DO-160, MIL-STD)",
    verificationStatus: "Needs verification",
    notes: "Requires audit against active client Device Master Records (DMR) before publishing badges."
  },
  {
    id: "src-metrics",
    sourceDocument: "Case_Study_Releases_2025.csv",
    scopeOrClaim: "Commercial figures & revenue metrics (e.g. '$2.4M raised', '42% cost reduction')",
    verificationStatus: "Needs verification",
    notes: "Must obtain signed client NDA clearance prior to publishing on public case studies."
  },
  {
    id: "src-patents",
    sourceDocument: "Legal_Patent_Schedule.pdf",
    scopeOrClaim: "Studio patent counts and historical milestone dates",
    verificationStatus: "Needs verification",
    notes: "Awaiting legal confirmation of active patent numbers and dates."
  },
  {
    id: "src-redirects",
    sourceDocument: "DNS_Htaccess_Rules_2026.conf",
    scopeOrClaim: "301 Permanent Redirect mapping for legacy pages + 500+ blog preservation",
    verificationStatus: "Verified",
    notes: "Guarantees zero 404s and complete preservation of historical search engine indexing."
  }
];

