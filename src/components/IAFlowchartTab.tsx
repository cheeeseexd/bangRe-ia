import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Maximize2, 
  ChevronDown, 
  ChevronRight, 
  X, 
  Layers,
  ArrowRight,
  ExternalLink,
  Folder,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Search
} from 'lucide-react';

interface IAFlowchartTabProps {
  onPreviewLivePage?: (slug: string) => void;
}

export interface IANodeData {
  id: string;
  label: string; // 3-4 words plain language for canvas
  fullTitle: string;
  level: 'root' | 'main' | 'section' | 'subpage' | 'cluster' | 'item' | 'sector';
  purpose: string; // One-line purpose
  contains: string[]; // What the page contains (key sections/items)
  parentLabel?: string;
  parentId?: string;
  childLabels?: string[];
  status?: 'Ready' | 'Needs review' | 'Needs verification' | 'Archived';
  reviewNotes?: string;
  wireframeSlug?: string;
  sectors?: string[]; // For expandable related sectors
  children?: IANodeData[];
}

export const IAFlowchartTab: React.FC<IAFlowchartTabProps> = ({ onPreviewLivePage }) => {
  // Canvas Transform State
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 40, y: 30 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState<boolean>(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Expand / Collapse State for Top-Level Branches
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'home-sections': false,
    'what-we-do': true,
    'industries': true,
    'work': true,
    'how-we-work': true,
    'about-bang': true,
    'talk-to-bang': true,
    'insights-archive': true,
    'pdm': true,
    'digital-growth': true,
    'featured-case-studies': true,
    'med-sci': true,
    'ind-auto': true,
    'con-hw': true,
    'mob-nrg': true,
    'med-sectors': false,
    'ind-sectors': false,
    'con-sectors': false,
    'mob-sectors': false
  });

  // Selected Node State for Side Panel
  const [selectedNode, setSelectedNode] = useState<IANodeData | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

  // Full IA Hierarchy Specification
  const homeSections: IANodeData[] = [
    {
      id: 'sec-val-prop',
      label: 'Clear Value Proposition',
      fullTitle: 'Hero & Value Proposition Section',
      level: 'section',
      purpose: 'State Bang’s core promise and primary capabilities immediately upon landing.',
      contains: [
        'High-impact headline defining physical and digital product creation',
        'Direct credibility statement (30+ years track record, 1000+ products)',
        'Primary action to schedule a strategy consultation',
        'Fast orientation indicator for founders vs. enterprise R&D leads'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      status: 'Ready',
      wireframeSlug: '/'
    },
    {
      id: 'sec-client-proof',
      label: 'Trusted Client Proof',
      fullTitle: 'Trusted Client Proof & Brand Logos',
      level: 'section',
      purpose: 'Establish instant institutional credibility with recognized client partner marks.',
      contains: [
        'Recognized corporate and startup logo banner',
        'Verified metrics ticker (products shipped, yield rates, patents)',
        'Clear industrial sector accreditation highlights'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      status: 'Ready',
      wireframeSlug: '/'
    },
    {
      id: 'sec-choose-path',
      label: 'Choose Your Path',
      fullTitle: 'Choose Your Orientation Path',
      level: 'section',
      purpose: 'Help visitors self-select into their exact project stage or industry focus.',
      contains: [
        'Early-stage concept to prototype routing',
        'Scale-up engineering and manufacturing tooling',
        'Turnkey digital launch and commercial acceleration',
        'Direct links to specific sector domains'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      status: 'Ready',
      wireframeSlug: '/'
    },
    {
      id: 'sec-two-offers',
      label: 'Two Core Offers',
      fullTitle: 'Two Core Flagship Offers Overview',
      level: 'section',
      purpose: 'Introduce the two primary service engines: Product to Manufacturing and Digital Growth.',
      contains: [
        'Product Design to Manufacturing: Hardware engineering, DFM, pilot tooling',
        'Digital Growth: 3D visualization, interactive websites, AI growth systems',
        'Key capability tags and comparison overview'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      status: 'Ready',
      wireframeSlug: '/'
    },
    {
      id: 'sec-feat-cases',
      label: 'Featured Case Studies',
      fullTitle: 'Featured Proof & Case Studies Grid',
      level: 'section',
      purpose: 'Demonstrate real physical product breakthroughs with high-resolution visual evidence.',
      contains: [
        'Invento Mitra humanoid robotics showcase',
        'Embrace infant warmer global health impact',
        'Ari autonomous utility rover platform',
        'BioFi Powertron commercial power conditioning',
        'Elisar AVA clinical EEG wearable headset'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      status: 'Ready',
      wireframeSlug: '/'
    },
    {
      id: 'sec-how-works',
      label: 'How Bang Works',
      fullTitle: 'How Bang Works: Collaborative Delivery Model',
      level: 'section',
      purpose: 'Explain our transparent multidisciplinary sprint workflow and stage-gate milestones.',
      contains: [
        'Integrated industrial design + mechanical + firmware teams',
        'Weekly prototyping iterations with physical validation',
        'Zero agency fluff, partner-level direct engineering involvement'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      status: 'Ready',
      wireframeSlug: '/'
    },
    {
      id: 'sec-why-bang',
      label: 'Why Choose Bang',
      fullTitle: 'Why Choose Bang: 30-Year Differentiators',
      level: 'section',
      purpose: 'Highlight key differentiators that separate Bang from pure design or pure software agencies.',
      contains: [
        'Full manufacturing accountability through final factory tooling',
        'Cross-disciplinary hardware and digital mastery',
        '30-year lineage of solving impossible packaging and thermal challenges'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      status: 'Ready',
      wireframeSlug: '/'
    },
    {
      id: 'sec-start-convo',
      label: 'Start a Conversation',
      fullTitle: 'Start a Project Conversation CTA',
      level: 'section',
      purpose: 'Provide a clean, friction-free mechanism for teams to initiate scoping.',
      contains: [
        'Direct calendar booking widget',
        'Structured project brief intake form',
        'Immediate NDA assurance and turnaround timeframe'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      status: 'Ready',
      wireframeSlug: '/'
    },
    {
      id: 'sec-common-faqs',
      label: 'Common Questions',
      fullTitle: 'Frequently Asked Questions',
      level: 'section',
      purpose: 'Address upfront questions regarding IP ownership, engagement models, and timing.',
      contains: [
        '100% client IP assignment terms',
        'Typical project timelines (8-16 week sprints)',
        'Budget thresholds and flexible engagement types'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      status: 'Ready',
      wireframeSlug: '/'
    }
  ];

  // Top Level 7 Branches
  const topBranches: IANodeData[] = [
    // 1. WHAT WE DO
    {
      id: 'what-we-do',
      label: 'What We Do',
      fullTitle: 'What We Do (Service Overview)',
      level: 'main',
      purpose: 'Help visitors choose the right development or digital pathway for their product.',
      contains: [
        'High-level comparison between physical hardware engineering and digital growth services',
        'Multidisciplinary capability matrix across ID, mechanical, embedded, and digital systems',
        'Engagement routing to Product to Manufacturing or Digital Growth dedicated pages',
        'Direct link to project scoping consultation'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      childLabels: ['Product to Manufacturing', 'Digital Growth'],
      status: 'Ready',
      wireframeSlug: '/product-design-to-manufacturing',
      children: [
        {
          id: 'pdm',
          label: 'Product to Manufacturing',
          fullTitle: 'Product Design to Manufacturing (Flagship Offer)',
          level: 'subpage',
          purpose: 'Move physical concepts from napkin sketches to tooling-ready production.',
          contains: [
            'Comprehensive 4-stage hardware development roadmap',
            'Integrated Industrial Design, Mechanical, Electrical, and Firmware teams',
            'In-house rapid prototyping and functional testing lab',
            'Direct supplier network for tooling, injection molding, and PCB assembly'
          ],
          parentLabel: 'What We Do',
          parentId: 'what-we-do',
          childLabels: ['Product Strategy', 'Product Design', 'Engineering Support', 'Prototype and Test', 'Production Support'],
          status: 'Ready',
          wireframeSlug: '/product-design-to-manufacturing',
          children: [
            {
              id: 'pdm-strategy',
              label: 'Product Strategy',
              fullTitle: 'Product Strategy & Architecture',
              level: 'item',
              purpose: 'Define technical feasibility, BOM cost targets, and product requirements before CAD.',
              contains: [
                'Product Requirement Document (PRD) authoring',
                'BOM cost modeling and component supply chain audit',
                'Regulatory classification roadmap (CE, FCC, ISO, FDA)',
                'Ergonomic user journey and competitive benchmarking'
              ],
              parentLabel: 'Product to Manufacturing',
              parentId: 'pdm',
              status: 'Ready'
            },
            {
              id: 'pdm-design',
              label: 'Product Design',
              fullTitle: 'Industrial Design & Surfacing',
              level: 'item',
              purpose: 'Create desirable, iconic forms engineered with strict mechanical intent.',
              contains: [
                'Class-A surface modeling and human factors ergonomics',
                'Color, Material, Finish (CMF) specification sheets',
                'Iterative hand-sketching and physical foam scale mockups',
                'Intuitive physical UI/UX and tactile switch ergonomics'
              ],
              parentLabel: 'Product to Manufacturing',
              parentId: 'pdm',
              status: 'Ready'
            },
            {
              id: 'pdm-engineering',
              label: 'Engineering Support',
              fullTitle: 'Mechanical & Embedded Engineering Support',
              level: 'item',
              purpose: 'Engineer robust internal chassis, thermal solutions, and embedded hardware.',
              contains: [
                'Parametric 3D CAD modeling (SolidWorks / Creo)',
                'Finite element analysis (FEA) for drop, shock, and structural load',
                'Thermal simulation (CFD) for heat sinks and fanless chassis',
                'PCB schematic review and custom wire harness routing'
              ],
              parentLabel: 'Product to Manufacturing',
              parentId: 'pdm',
              status: 'Ready'
            },
            {
              id: 'pdm-prototype',
              label: 'Prototype and Test',
              fullTitle: 'Functional Prototyping & Testing',
              level: 'item',
              purpose: 'Validate aesthetics, fit, and rigorous functional performance with real physical builds.',
              contains: [
                'SLA, SLS, and CNC machined look-and-feel aesthetic prototypes',
                'Fully functional engineering rigs (Alpha / Beta builds)',
                'Environmental ingress (IP67/IP68) water and dust testing',
                'Drop, cycle fatigue, and thermal chamber endurance runs'
              ],
              parentLabel: 'Product to Manufacturing',
              parentId: 'pdm',
              status: 'Ready'
            },
            {
              id: 'pdm-production',
              label: 'Production Support',
              fullTitle: 'DFM, Tooling & Production Support',
              level: 'item',
              purpose: 'Bridge design engineering into high-yield factory tooling and pilot assembly.',
              contains: [
                'Design for Manufacture (DFM) and Design for Assembly (DFA) audits',
                'Moldflow simulation for draft angles, sink marks, and parting lines',
                'On-site toolmaker review and First Article Inspection (FAI)',
                'Production test fixture design and quality control inspection criteria'
              ],
              parentLabel: 'Product to Manufacturing',
              parentId: 'pdm',
              status: 'Ready'
            }
          ]
        },
        {
          id: 'digital-growth',
          label: 'Digital Growth',
          fullTitle: 'Digital Growth (Flagship Offer)',
          level: 'subpage',
          purpose: 'Help teams communicate, launch, and scale physical and connected products digitally.',
          contains: [
            'Digital touchpoint strategy linking hardware with software experience',
            'Photorealistic 3D visualization and real-time interactive product configurators',
            'High-converting marketing websites and web application platforms',
            'AI-enabled growth workflows and qualification funnels'
          ],
          parentLabel: 'What We Do',
          parentId: 'what-we-do',
          childLabels: ['UX and Experience', 'Websites and Conversion', 'Product Storytelling', 'Product Visualization', 'AI Growth Systems'],
          status: 'Ready',
          wireframeSlug: '/digital-growth',
          children: [
            {
              id: 'dg-ux',
              label: 'UX and Experience',
              fullTitle: 'UX and Digital Product Experience',
              level: 'item',
              purpose: 'Design intuitive companion software and web applications for hardware ecosystems.',
              contains: [
                'Mobile companion app wireframing and interactive prototyping',
                'Device onboarding and Bluetooth/Wi-Fi provisioning flows',
                'IoT telemetry dashboards and operational management consoles',
                'Accessibility-compliant design system components'
              ],
              parentLabel: 'Digital Growth',
              parentId: 'digital-growth',
              status: 'Ready'
            },
            {
              id: 'dg-web',
              label: 'Websites and Conversion',
              fullTitle: 'Websites and Conversion Systems',
              level: 'item',
              purpose: 'Build performant, conversion-engineered digital storefronts and sales portals.',
              contains: [
                'Full-stack Next.js/React marketing websites with sub-second load times',
                'Conversion Rate Optimization (CRO) data-informed layout funnels',
                'Interactive pricing calculators and procurement lead capture',
                'Enterprise CMS integration for agile editorial updates'
              ],
              parentLabel: 'Digital Growth',
              parentId: 'digital-growth',
              status: 'Ready'
            },
            {
              id: 'dg-storytelling',
              label: 'Product Storytelling',
              fullTitle: 'Brand & Product Storytelling',
              level: 'item',
              purpose: 'Translate complex technical architectures into compelling customer narratives.',
              contains: [
                'Clear positioning frameworks separating technical features from outcomes',
                'Exploded component diagrams and technical infographic illustrations',
                'Product launch launch-kit collateral and press assets',
                'Investor and customer pitch presentation decks'
              ],
              parentLabel: 'Digital Growth',
              parentId: 'digital-growth',
              status: 'Ready'
            },
            {
              id: 'dg-vis',
              label: 'Product Visualization',
              fullTitle: '3D Product Visualization & Motion',
              level: 'item',
              purpose: 'Generate photorealistic 3D renders and interactive WebGL experiences before tooling.',
              contains: [
                'Cinema-grade photorealistic studio lighting and material textures',
                'Exploded assembly animations detailing internal engineering',
                'Real-time 3D web configurators allowing custom CMF previewing',
                'High-resolution packaging renders and digital sales assets'
              ],
              parentLabel: 'Digital Growth',
              parentId: 'digital-growth',
              status: 'Ready'
            },
            {
              id: 'dg-ai',
              label: 'AI Growth Systems',
              fullTitle: 'AI Growth Systems & Workflows',
              level: 'item',
              purpose: 'Deploy automated AI systems to accelerate technical qualification and customer acquisition.',
              contains: [
                'Autonomous product concierge chatbots trained on engineering specs',
                'AI-augmented lead routing and RFQ parsing pipelines',
                'Dynamic content generation and automated technical documentation',
                'Intelligent user feedback aggregation and sentiment tracking'
              ],
              parentLabel: 'Digital Growth',
              parentId: 'digital-growth',
              status: 'Ready'
            }
          ]
        }
      ]
    },

    // 2. INDUSTRIES
    {
      id: 'industries',
      label: 'Industries',
      fullTitle: 'Industries (Domain Specializations)',
      level: 'main',
      purpose: 'Connect visitors to specialized engineering and compliance expertise in their field.',
      contains: [
        '4 core hardware clusters: Medical & Scientific, Industrial & Automation, Consumer Hardware, Mobility & Energy',
        'Compliance matrix: ISO 13485, IP68, NEMA 4X, PPAP, UL/CE regulatory roadmaps',
        'Preserved 15-sector historical archive for legacy SEO continuity',
        'Direct consultation routing by engineering vertical'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      childLabels: ['Medical and Scientific', 'Industrial and Automation', 'Consumer Hardware', 'Mobility and Energy'],
      status: 'Ready',
      wireframeSlug: '/industries',
      children: [
        {
          id: 'med-sci',
          label: 'Medical and Scientific',
          fullTitle: 'Medical and Scientific Products Cluster',
          level: 'cluster',
          purpose: 'Develop rigorous clinical devices and laboratory instruments with human factors precision.',
          contains: [
            'Class I, IIa, and IIb medical device industrial design and engineering',
            'ISO 13485 and FDA Design History File (DHF) compliant documentation',
            'Sterilization compatibility, biocompatible CMF, and human factors validation',
            'Preserved legacy life sciences sector records'
          ],
          parentLabel: 'Industries',
          parentId: 'industries',
          childLabels: ['Product Usability', 'Patient Experience', 'Relevant Case Studies', 'Technical Considerations'],
          status: 'Ready',
          wireframeSlug: '/industries',
          sectors: ['Medical and life sciences'],
          children: [
            {
              id: 'med-usability',
              label: 'Product Usability',
              fullTitle: 'Clinical Product Usability & Human Factors',
              level: 'item',
              purpose: 'Eliminate operator error in high-stress clinical and laboratory workflows.',
              contains: ['IEC 62366 usability engineering sprints', 'Glove-compatible physical dials and touch controls', 'Visual status alarms and ergonomic viewing angles'],
              parentLabel: 'Medical and Scientific',
              parentId: 'med-sci',
              status: 'Ready'
            },
            {
              id: 'med-patient',
              label: 'Patient Experience',
              fullTitle: 'Patient Experience & Comfort Ergonomics',
              level: 'item',
              purpose: 'Reduce anxiety and discomfort with soft anthropometric geometries and quiet operation.',
              contains: ['Biocompatible skin-contact materials (ISO 10993)', 'Non-threatening aesthetic styling for pediatric/clinical use', 'Low-vibration and acoustic dampening enclosure design'],
              parentLabel: 'Medical and Scientific',
              parentId: 'med-sci',
              status: 'Ready'
            },
            {
              id: 'med-cases',
              label: 'Relevant Case Studies',
              fullTitle: 'Medical & Scientific Verified Case Studies',
              level: 'item',
              purpose: 'Provide verified proof of clinical deployments and life-saving hardware innovations.',
              contains: ['Embrace Infant Warmer (300,000+ premature babies saved)', 'Elisar AVA Clinical EEG Wearable Headset'],
              parentLabel: 'Medical and Scientific',
              parentId: 'med-sci',
              status: 'Ready'
            },
            {
              id: 'med-tech',
              label: 'Technical Considerations',
              fullTitle: 'Medical Regulatory & Manufacturing Compliance',
              level: 'item',
              purpose: 'Ensure complete traceability and cleanroom manufacturing readiness.',
              contains: ['Autoclave and chemical disinfectant resistance', 'Creepage and clearance electrical isolation (IEC 60601-1)', 'DHF and Risk Management (ISO 14971) deliverables'],
              parentLabel: 'Medical and Scientific',
              parentId: 'med-sci',
              status: 'Needs verification',
              reviewNotes: 'Verify ISO 13485 documentation template alignment'
            }
          ]
        },
        {
          id: 'ind-auto',
          label: 'Industrial and Automation',
          fullTitle: 'Industrial and Automation Cluster',
          level: 'cluster',
          purpose: 'Engineer heavy-duty robotics, capital equipment, and edge telemetry hardware.',
          contains: [
            'Ruggedized enclosure engineering for extreme factory and agricultural environments',
            'IP67/IP69K environmental ingress sealing and high shock/vibration tolerance',
            'Thermal management for continuous 24/7 duty cycles and high MTBF targets',
            'Preserved legacy industrial, robotics, and farming sector records'
          ],
          parentLabel: 'Industries',
          parentId: 'industries',
          childLabels: ['Product Modernization', 'Field Usability', 'Relevant Case Studies', 'Technical Considerations'],
          status: 'Ready',
          wireframeSlug: '/industries',
          sectors: [
            'Agriculture and farming',
            'Industrial and capital goods',
            'Manufacturing and robotics',
            'Technology and edge hardware'
          ],
          children: [
            {
              id: 'ind-modern',
              label: 'Product Modernization',
              fullTitle: 'Industrial Product Modernization',
              level: 'item',
              purpose: 'Transform utilitarian machinery into sleek, branded, high-value commercial systems.',
              contains: ['Structural sheet metal and cast aluminum styling', 'Integrated capacitive touch displays and HMI bezels', 'Modular panel architectures for easy field maintenance'],
              parentLabel: 'Industrial and Automation',
              parentId: 'ind-auto',
              status: 'Ready'
            },
            {
              id: 'ind-field',
              label: 'Field Usability',
              fullTitle: 'Field Usability & Serviceability',
              level: 'item',
              purpose: 'Facilitate fast maintenance and intuitive operation in rugged factory conditions.',
              contains: ['Tool-less quick release service latches', 'High-contrast outdoor status LED indicators', 'Heavy glove and ruggedized touch controls'],
              parentLabel: 'Industrial and Automation',
              parentId: 'ind-auto',
              status: 'Ready'
            },
            {
              id: 'ind-cases',
              label: 'Relevant Case Studies',
              fullTitle: 'Industrial & Robotics Case Studies',
              level: 'item',
              purpose: 'Highlight real-world deployments in autonomous navigation and automation.',
              contains: ['Invento Mitra Humanoid Commercial Service Robot', 'Ari Autonomous Heavy Utility Rover Platform'],
              parentLabel: 'Industrial and Automation',
              parentId: 'ind-auto',
              status: 'Ready'
            },
            {
              id: 'ind-tech',
              label: 'Technical Considerations',
              fullTitle: 'Thermal, Ingress & Shock Considerations',
              level: 'item',
              purpose: 'Guarantee 50,000-hour MTBF in harsh industrial operating conditions.',
              contains: ['IP68/IP69K gasket compression rib modeling', 'Passive convection thermal chimneys for fanless operation', 'MIL-STD-810G vibration and drop shock testing'],
              parentLabel: 'Industrial and Automation',
              parentId: 'ind-auto',
              status: 'Ready'
            }
          ]
        },
        {
          id: 'con-hw',
          label: 'Consumer Hardware',
          fullTitle: 'Consumer Hardware and Appliances Cluster',
          level: 'cluster',
          purpose: 'Create desirable, intuitive consumer electronics and connected appliances.',
          contains: [
            'High-volume injection molding tool design and CMF surface perfection',
            'Tactile push-button feel, rotary encoder detents, and acoustic sound tuning',
            'Strict BOM cost optimization for mass-market retail margins',
            'Preserved legacy appliances, consumer products, F&B, and sports sectors'
          ],
          parentLabel: 'Industries',
          parentId: 'industries',
          childLabels: ['Product Appeal', 'Everyday Usability', 'Relevant Case Studies', 'Launch Readiness'],
          status: 'Ready',
          wireframeSlug: '/industries',
          sectors: [
            'Appliances',
            'Consumer products',
            'Consumer electronics',
            'Food and beverages',
            'Sports goods'
          ],
          children: [
            {
              id: 'con-appeal',
              label: 'Product Appeal',
              fullTitle: 'Aesthetic Appeal & CMF Excellence',
              level: 'item',
              purpose: 'Stand out on retail shelves and digital unboxing with premium finishes.',
              contains: ['Soft-touch matte textures, metallic accents, and seamless split lines', 'Micro-perforated acoustic speaker grilles', 'Refined packaging architecture and unboxing reveal'],
              parentLabel: 'Consumer Hardware',
              parentId: 'con-hw',
              status: 'Ready'
            },
            {
              id: 'con-everyday',
              label: 'Everyday Usability',
              fullTitle: 'Everyday Usability & Ergonomics',
              level: 'item',
              purpose: 'Deliver effortless daily interactions that build long-term brand loyalty.',
              contains: ['One-handed balance and grip texture optimization', 'Intuitive magnetic alignment and snap-fit docking', 'Micro-LED diffused feedback lighting'],
              parentLabel: 'Consumer Hardware',
              parentId: 'con-hw',
              status: 'Ready'
            },
            {
              id: 'con-cases',
              label: 'Relevant Case Studies',
              fullTitle: 'Consumer Hardware Case Studies',
              level: 'item',
              purpose: 'Showcase market-dominating consumer electronics and lifestyle devices.',
              contains: ['BioFi Powertron Compact Power Conditioning Unit', 'Invento Mitra Hospitality Assistant'],
              parentLabel: 'Consumer Hardware',
              parentId: 'con-hw',
              status: 'Ready'
            },
            {
              id: 'con-launch',
              label: 'Launch Readiness',
              fullTitle: 'High-Volume Tooling & Launch Readiness',
              level: 'item',
              purpose: 'Achieve 98%+ manufacturing yields across 100k+ unit production runs.',
              contains: ['Multi-cavity moldflow simulation and lifter optimization', 'Sub-second snap-fit assembly without fasteners', 'Packaging drop test and retail shelf presence optimization'],
              parentLabel: 'Consumer Hardware',
              parentId: 'con-hw',
              status: 'Ready'
            }
          ]
        },
        {
          id: 'mob-nrg',
          label: 'Mobility and Energy',
          fullTitle: 'Mobility, Energy, and Infrastructure Cluster',
          level: 'cluster',
          purpose: 'Design resilient outdoor charging systems, batteries, and mobility platforms.',
          contains: [
            'All-weather outdoor enclosure engineering (NEMA 4X / UV-resistant plastics)',
            'High-voltage safety isolation, thermal venting, and fire containment',
            'Vandal-resistant operator interfaces and modular quick-swap assemblies',
            'Preserved legacy automotive, energy, aerospace, and defense sectors'
          ],
          parentLabel: 'Industries',
          parentId: 'industries',
          childLabels: ['Real World Use', 'Product Reliability', 'Relevant Case Studies', 'System Experience'],
          status: 'Ready',
          wireframeSlug: '/industries',
          sectors: [
            'Automotive and mobility',
            'Renewables and environment',
            'Aerospace and defense',
            'Defense and security',
            'Energy systems'
          ],
          children: [
            {
              id: 'mob-real',
              label: 'Real World Use',
              fullTitle: 'Real World Outdoor Deployment',
              level: 'item',
              purpose: 'Withstand rain, blizzards, desert heat, and public street vandalism.',
              contains: ['UV-stabilized polycarbonate and stainless structural chassis', 'Sunlight-readable anti-glare capacitive touch screens', 'Drainage channels and internal condensation traps'],
              parentLabel: 'Mobility and Energy',
              parentId: 'mob-nrg',
              status: 'Ready'
            },
            {
              id: 'mob-reliable',
              label: 'Product Reliability',
              fullTitle: 'High-Power Reliability & Safety',
              level: 'item',
              purpose: 'Manage high heat loads and maintain safety in high-voltage charging systems.',
              contains: ['Dual-wall isolated battery containment cells', 'Direct liquid cooling plate and heatsink integration', 'Emergency stop and physical interlock mechanisms'],
              parentLabel: 'Mobility and Energy',
              parentId: 'mob-nrg',
              status: 'Ready'
            },
            {
              id: 'mob-cases',
              label: 'Relevant Case Studies',
              fullTitle: 'Mobility & Energy Case Studies',
              level: 'item',
              purpose: 'Prove performance in autonomous navigation and power distribution.',
              contains: ['Ari Autonomous Rover Platform', 'BioFi Powertron Grid Power Conditioner'],
              parentLabel: 'Mobility and Energy',
              parentId: 'mob-nrg',
              status: 'Ready'
            },
            {
              id: 'mob-system',
              label: 'System Experience',
              fullTitle: 'Operator & Driver System Experience',
              level: 'item',
              purpose: 'Make complex high-power charging and vehicle fleet telemetry effortless.',
              contains: ['Ergonomic heavy cable holstering and counterbalance arms', 'Contactless payment and QR code authentication beacons', 'Real-time charging rate LED indicators'],
              parentLabel: 'Mobility and Energy',
              parentId: 'mob-nrg',
              status: 'Ready'
            }
          ]
        }
      ]
    },

    // 3. WORK
    {
      id: 'work',
      label: 'Work',
      fullTitle: 'Work (Portfolio & Case Studies)',
      level: 'main',
      purpose: 'Explore Bang’s 30-year track record of commercialized physical products.',
      contains: [
        'Curated flagship case studies across robotics, medical, consumer, and energy',
        'Filterable portfolio matrix by industry vertical and engineering requirement',
        'Client testimonials and commercial outcome metrics',
        'Complete historical archive of over 1,000 completed products'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      childLabels: ['Featured Case Studies', 'Browse by Industry', 'Browse by Need', 'Client Testimonials'],
      status: 'Ready',
      wireframeSlug: '/work',
      children: [
        {
          id: 'featured-case-studies',
          label: 'Featured Case Studies',
          fullTitle: 'Featured Commercial Case Studies',
          level: 'subpage',
          purpose: 'In-depth engineering and design breakdowns of flagship client projects.',
          contains: [
            '6 featured case studies detailing problem, design process, and production outcome',
            'Full photographic galleries and exploded CAD models',
            'Verified production volume numbers and award accolades'
          ],
          parentLabel: 'Work',
          parentId: 'work',
          childLabels: [
            'Mitra Service Robot',
            'Ari Education Tablet',
            'BioFi Powertron',
            'Elisar AVA Headset',
            'Embrace Infant Warmer',
            'BioFi Car Purifier'
          ],
          status: 'Ready',
          wireframeSlug: '/work',
          children: [
            {
              id: 'case-mitra',
              label: 'Mitra Service Robot',
              fullTitle: 'Invento Mitra: Humanoid Service Robot',
              level: 'item',
              purpose: 'Design India’s pioneering humanoid service robot for hospitality and banking.',
              contains: [
                'Welcoming human-robot interaction aesthetic styling',
                'Internal welded steel skeletal chassis supporting 24/7 navigation',
                'Thermal airflow channels cooling high-performance onboard compute',
                'Low-volume fiberglass and ABS tooling for pilot fleet deployment'
              ],
              parentLabel: 'Featured Case Studies',
              parentId: 'featured-case-studies',
              status: 'Ready',
              wireframeSlug: '/case-study/mitra'
            },
            {
              id: 'case-ari',
              label: 'Ari Education Tablet',
              fullTitle: 'Ari Autonomous Mobility / Education Tablet',
              level: 'item',
              purpose: 'Ruggedized outdoor autonomous vehicle platform and connected interface.',
              contains: [
                'All-weather rotomolded and thermoformed outer skin engineering',
                'Modular LiDAR and optical camera sensor pod packaging',
                'Shock-damped internal electronics tray with IP67 weather sealing',
                'Quick-swap modular battery access mechanism'
              ],
              parentLabel: 'Featured Case Studies',
              parentId: 'featured-case-studies',
              status: 'Ready',
              wireframeSlug: '/case-study/ari'
            },
            {
              id: 'case-biofi-power',
              label: 'BioFi Powertron',
              fullTitle: 'BioFi Powertron: Power Conditioning Unit',
              level: 'item',
              purpose: 'Commercial high-density power conditioner in an ultra-compact enclosure.',
              contains: [
                'Custom extruded aluminum housing doubling as a passive heatsink',
                'Electromagnetic interference (EMI) isolation compartments',
                'Single-tool assembly architecture reducing factory cycle time',
                'Minimalist architectural form factor for wall and server mounting'
              ],
              parentLabel: 'Featured Case Studies',
              parentId: 'featured-case-studies',
              status: 'Ready',
              wireframeSlug: '/case-study/biofi-powertron'
            },
            {
              id: 'case-elisar',
              label: 'Elisar AVA Headset',
              fullTitle: 'Elisar AVA: Wearable Clinical EEG Headset',
              level: 'item',
              purpose: 'High-precision wearable clinical EEG recording headset with flexible strap.',
              contains: [
                'Anthropometric head sizing studies spanning 5th to 95th percentile',
                'Spring-loaded dry electrode nodes for rapid hair penetration',
                'Sanitizable medical-grade silicone overmolded flexible band',
                'Validated signal fidelity in clinical trials'
              ],
              parentLabel: 'Featured Case Studies',
              parentId: 'featured-case-studies',
              status: 'Ready',
              wireframeSlug: '/case-study/elisar-ava'
            },
            {
              id: 'case-embrace',
              label: 'Embrace Infant Warmer',
              fullTitle: 'Embrace Infant Warmer: Low-Cost Incubator',
              level: 'item',
              purpose: 'Ultra-low cost infant warmer designed for rural clinics without steady power.',
              contains: [
                'Phase-change material (PCM) pouch maintaining 37°C for 6 hours without electricity',
                'Intuitive non-literate visual instruction iconography for village health workers',
                'Biocompatible, waterproof, and easily sanitizable medical textiles',
                'Credited with saving over 300,000 premature babies worldwide'
              ],
              parentLabel: 'Featured Case Studies',
              parentId: 'featured-case-studies',
              status: 'Ready',
              wireframeSlug: '/case-study/embrace'
            },
            {
              id: 'case-biofi-car',
              label: 'BioFi Car Purifier',
              fullTitle: 'BioFi Car Air Purifier (Audit Pending)',
              level: 'item',
              purpose: 'In-cabin negative ion generator and vehicular air quality purifier.',
              contains: [
                'Automotive cup-holder form factor enclosure',
                'Low-noise centrifugal radial fan and replaceable HEPA filter',
                '12V auxiliary power cord integration with tactile control switch'
              ],
              parentLabel: 'Featured Case Studies',
              parentId: 'featured-case-studies',
              status: 'Needs review',
              reviewNotes: 'The current live page contains conflicting product copy. Do not state a final outcome until reviewed.',
              wireframeSlug: '/case-study/biofi-car'
            }
          ]
        },
        {
          id: 'browse-industry',
          label: 'Browse by Industry',
          fullTitle: 'Browse Work by Industry Sector',
          level: 'subpage',
          purpose: 'Filter all 1,000+ completed projects by specialized market sector.',
          contains: [
            'Medical & Life Sciences filter stream',
            'Industrial, Capital Goods & Robotics filter stream',
            'Consumer Electronics & Appliances filter stream',
            'Mobility, Clean Energy & Defense filter stream'
          ],
          parentLabel: 'Work',
          parentId: 'work',
          status: 'Ready',
          wireframeSlug: '/work'
        },
        {
          id: 'browse-need',
          label: 'Browse by Need',
          fullTitle: 'Browse Work by Engineering Need',
          level: 'subpage',
          purpose: 'Filter portfolio by technical stage and functional discipline.',
          contains: [
            'Concept Architecture & Industrial Design projects',
            'DFM, Tooling & High-Volume Injection Molding projects',
            'Embedded Electronics & IoT Firmware projects',
            'Digital Launch, 3D Visualization & Companion Apps'
          ],
          parentLabel: 'Work',
          parentId: 'work',
          status: 'Ready',
          wireframeSlug: '/work'
        },
        {
          id: 'client-testimonials',
          label: 'Client Testimonials',
          fullTitle: 'Client Testimonials & Executive Proof',
          level: 'subpage',
          purpose: 'Direct founder and VP Engineering feedback regarding collaboration with Bang.',
          contains: [
            'Video and written endorsements from hardware leaders',
            'Timeline adherence and manufacturing yield confirmations',
            'Investor feedback on commercial acceleration'
          ],
          parentLabel: 'Work',
          parentId: 'work',
          status: 'Ready',
          wireframeSlug: '/work'
        }
      ]
    },

    // 4. HOW WE WORK
    {
      id: 'how-we-work',
      label: 'How We Work',
      fullTitle: 'How We Work (Collaboration & Engagement)',
      level: 'main',
      purpose: 'Clarify our engagement models, agile sprint structure, and commercial options.',
      contains: [
        'Overview of 4 engagement models: Focused Project, Product Program, Ongoing Team, Venture Partnership',
        'Stage-gate milestone structure and transparent weekly deliverables',
        'Comprehensive FAQ covering IP assignment, confidentiality, and tooling oversight'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      childLabels: [
        'Ways to Work',
        'Focused Project Support',
        'Longer Product Programs',
        'Ongoing Team Support',
        'Venture Partnership',
        'Common Questions'
      ],
      status: 'Ready',
      wireframeSlug: '/how-we-work',
      children: [
        {
          id: 'hww-ways',
          label: 'Ways to Work',
          fullTitle: 'Ways to Work: Overview Matrix',
          level: 'item',
          purpose: 'Compare all engagement models to find the ideal match for your team size and timeline.',
          contains: [
            'Clear side-by-side comparison table of all 4 models',
            'Estimated sprint durations and resource allocations',
            'Dedicated project lead vs. embedded team mechanics'
          ],
          parentLabel: 'How We Work',
          parentId: 'how-we-work',
          status: 'Ready'
        },
        {
          id: 'hww-focused',
          label: 'Focused Project Support',
          fullTitle: 'Focused Project Support (Sprints)',
          level: 'item',
          purpose: 'Targeted 4 to 8-week sprints solving specific design, thermal, or tooling blockers.',
          contains: [
            'Fixed-scope deliverables with guaranteed timeline milestones',
            'Ideal for early ID concepts, DFM audits, or PCB packaging redesigns',
            'Immediate kick-off with minimal onboarding overhead'
          ],
          parentLabel: 'How We Work',
          parentId: 'how-we-work',
          status: 'Ready'
        },
        {
          id: 'hww-longer',
          label: 'Longer Product Programs',
          fullTitle: 'Longer Product Programs (Turnkey)',
          level: 'item',
          purpose: 'Comprehensive 12 to 24-week programs driving from PRD to production handover.',
          contains: [
            'End-to-end management across Industrial Design, Mechanical, Electrical, and Tooling',
            'Formal Phase-Gate reviews (Concept, Alpha, Beta, Pilot Tooling)',
            'On-site factory tool qualification and First Article Inspection'
          ],
          parentLabel: 'How We Work',
          parentId: 'how-we-work',
          status: 'Ready'
        },
        {
          id: 'hww-ongoing',
          label: 'Ongoing Team Support',
          fullTitle: 'Ongoing Team Support (Retainer)',
          level: 'item',
          purpose: 'Dedicated embedded engineering and design pod acting as your internal hardware division.',
          contains: [
            'Continuous roadmap execution and sustaining engineering',
            'Rapid turnaround on line extensions, accessories, and packaging updates',
            'Direct Slack and weekly sync integration with client leadership'
          ],
          parentLabel: 'How We Work',
          parentId: 'how-we-work',
          status: 'Ready'
        },
        {
          id: 'hww-venture',
          label: 'Venture Partnership',
          fullTitle: 'Venture Partnership & Strategic Co-Creation',
          level: 'item',
          purpose: 'Selective shared-risk co-creation for high-conviction hardware startups and spinouts.',
          contains: [
            'Aligned equity or royalty-supported commercial co-development models',
            'Access to Bang prototype lab, supplier tooling discounts, and investor network',
            'Commercial mechanics detailed exclusively during partner qualification'
          ],
          parentLabel: 'How We Work',
          parentId: 'how-we-work',
          status: 'Ready'
        },
        {
          id: 'hww-faqs',
          label: 'Common Questions',
          fullTitle: 'How We Work: Common Questions',
          level: 'item',
          purpose: 'Answer practical questions regarding payment milestones, NDAs, and changes of scope.',
          contains: [
            'Full client ownership of all CAD files, schematics, and IP',
            'Weekly sprint reviews and transparent change request policies',
            'Tooling supplier warranty and manufacturing liaison guidelines'
          ],
          parentLabel: 'How We Work',
          parentId: 'how-we-work',
          status: 'Ready'
        }
      ]
    },

    // 5. ABOUT BANG
    {
      id: 'about-bang',
      label: 'About Bang',
      fullTitle: 'About Bang (Studio & Heritage)',
      level: 'main',
      purpose: 'Share Bang’s 30-year design philosophy, leadership team, and studio values.',
      contains: [
        'Multidisciplinary studio manifesto: Form, function, and manufacturing in unison',
        'Leadership profiles and senior engineering directors',
        'Physical studio workshop tour and prototyping equipment highlights',
        'Studio history timeline from 1994 to present'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      childLabels: [
        'Studio Point of View',
        'Team and Leadership',
        'How We Collaborate',
        'Our Product Process',
        'Studio Story',
        'Frequently Asked Questions'
      ],
      status: 'Ready',
      wireframeSlug: '/about',
      children: [
        {
          id: 'abt-pov',
          label: 'Studio Point of View',
          fullTitle: 'Studio Point of View & Philosophy',
          level: 'item',
          purpose: 'Articulate why physical hardware requires a unified, non-siloed engineering approach.',
          contains: [
            'Rejection of purely decorative styling in favor of manufacturing truth',
            'The harmony of tactile human emotion and mechanical precision',
            'Designing for longevity, repairability, and sustainable materials'
          ],
          parentLabel: 'About Bang',
          parentId: 'about-bang',
          status: 'Ready'
        },
        {
          id: 'abt-team',
          label: 'Team and Leadership',
          fullTitle: 'Team and Leadership Profiles',
          level: 'item',
          purpose: 'Introduce the senior designers, mechanical engineers, and manufacturing veterans.',
          contains: [
            'Founding partners and principal engineering leads',
            'Experience across global tier-1 consumer, automotive, and medical OEMs',
            'Direct access to partners throughout every client project'
          ],
          parentLabel: 'About Bang',
          parentId: 'about-bang',
          status: 'Ready'
        },
        {
          id: 'abt-collab',
          label: 'How We Collaborate',
          fullTitle: 'How We Collaborate with Client Teams',
          level: 'item',
          purpose: 'Explain how we integrate seamlessly with in-house founders and engineering squads.',
          contains: [
            'Collaborative CAD modeling and shared milestone dashboards',
            'Weekly hands-on design reviews and physical prototype teardowns',
            'Transparent documentation and knowledge handover'
          ],
          parentLabel: 'About Bang',
          parentId: 'about-bang',
          status: 'Ready'
        },
        {
          id: 'abt-process',
          label: 'Our Product Process',
          fullTitle: 'Our Product Development Process',
          level: 'item',
          purpose: 'Step through our battle-tested 4-phase physical creation methodology.',
          contains: [
            'Phase 1: Discovery, Research & Concept Architecture',
            'Phase 2: Detailed CAD Engineering & Prototyping',
            'Phase 3: DFM, Tooling Handover & Sourcing',
            'Phase 4: Pilot Batch Optimization & Commercial Launch'
          ],
          parentLabel: 'About Bang',
          parentId: 'about-bang',
          status: 'Ready'
        },
        {
          id: 'abt-story',
          label: 'Studio Story',
          fullTitle: 'Studio Heritage & 30-Year Story',
          level: 'item',
          purpose: 'Chronicle 30 years of industrial design evolution from analog models to AI hardware.',
          contains: [
            'Founded in 1994 with a commitment to physical craftsmanship',
            'Pioneered early consumer electronics, automotive, and medical devices in Asia',
            'Over 1,000 successful product commercializations and 28 design awards'
          ],
          parentLabel: 'About Bang',
          parentId: 'about-bang',
          status: 'Ready'
        },
        {
          id: 'abt-faqs',
          label: 'Frequently Asked Questions',
          fullTitle: 'About Bang: Frequently Asked Questions',
          level: 'item',
          purpose: 'Address common questions about studio location, facilities, and visiting.',
          contains: [
            'Studio prototyping lab capabilities (3D printers, CNC, testing rigs)',
            'Client visit protocols and in-person workshop intensives',
            'Internship and recruitment inquiries'
          ],
          parentLabel: 'About Bang',
          parentId: 'about-bang',
          status: 'Ready'
        }
      ]
    },

    // 6. TALK TO BANG
    {
      id: 'talk-to-bang',
      label: 'Talk to Bang',
      fullTitle: 'Talk to Bang (Contact & Consultation)',
      level: 'main',
      purpose: 'Initiate a direct conversation to scope, price, or evaluate your product.',
      contains: [
        'Direct partner calendar booking for 30-minute scoping calls',
        'Confidential project brief intake form with immediate NDA safeguard',
        'Interactive AI Studio Concierge for instant spec answers',
        'Clear expectations on what happens within 24 hours of reaching out'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      childLabels: ['Book a Call', 'Send a Brief', 'Ask AI Concierge', 'What Happens Next'],
      status: 'Ready',
      wireframeSlug: '/contact',
      children: [
        {
          id: 'ttb-book',
          label: 'Book a Call',
          fullTitle: 'Book a Strategy Consultation Call',
          level: 'item',
          purpose: 'Directly schedule a 30-minute technical evaluation with a senior partner.',
          contains: [
            'Real-time partner calendar integration',
            'Preparation guide: What to bring to the initial scoping call',
            'Discussion of timelines, budget targets, and technical feasibility'
          ],
          parentLabel: 'Talk to Bang',
          parentId: 'talk-to-bang',
          status: 'Ready'
        },
        {
          id: 'ttb-brief',
          label: 'Send a Brief',
          fullTitle: 'Submit a Confidential Project Brief',
          level: 'item',
          purpose: 'Submit existing PRDs, sketches, or 3D files under mutual NDA protection.',
          contains: [
            'Secure document and file upload form',
            'Pre-signed standard mutual Non-Disclosure Agreement (NDA)',
            'Structured questions capturing technical stage, target BOM, and deadline'
          ],
          parentLabel: 'Talk to Bang',
          parentId: 'talk-to-bang',
          status: 'Ready'
        },
        {
          id: 'ttb-ai',
          label: 'Ask AI Concierge',
          fullTitle: 'Interactive AI Studio Concierge',
          level: 'item',
          purpose: 'Get immediate answers about Bang capabilities, team expertise, and case studies.',
          contains: [
            'Trained on Bang’s 30-year case database and technical deliverables',
            'Instant capability matchmaking and project scope estimations',
            'Seamless handoff to human partner consultation'
          ],
          parentLabel: 'Talk to Bang',
          parentId: 'talk-to-bang',
          status: 'Ready'
        },
        {
          id: 'ttb-next',
          label: 'What Happens Next',
          fullTitle: 'What Happens Next: Scoping Roadmap',
          level: 'item',
          purpose: 'Provide complete transparency on our rapid response and proposal process.',
          contains: [
            'Step 1: Partner review and mutual NDA confirmation within 24 hours',
            'Step 2: 30-minute technical scoping call to align on PRD requirements',
            'Step 3: Detailed phase-gate proposal with transparent budget and timeline'
          ],
          parentLabel: 'Talk to Bang',
          parentId: 'talk-to-bang',
          status: 'Ready'
        }
      ]
    },

    // 7. INSIGHTS ARCHIVE
    {
      id: 'insights-archive',
      label: 'Insights Archive',
      fullTitle: 'Insights Archive (Knowledge Base)',
      level: 'main',
      purpose: 'Provide rigorous engineering guides, DFM articles, and hardware launch insights.',
      contains: [
        'Curated technical library written by practicing mechanical and industrial engineers',
        'Practical guides on injection molding, thermal dissipation, and medical device DHF',
        'Downloadable checklists for hardware founders and engineering managers',
        'Searchable archive spanning all development disciplines'
      ],
      parentLabel: 'Home',
      parentId: 'home',
      childLabels: [
        'Product Development',
        'Engineering Guides',
        'Manufacturing Insights',
        'Digital Experience',
        'Launch and Growth',
        'Browse All Articles'
      ],
      status: 'Ready',
      wireframeSlug: '/insights',
      children: [
        {
          id: 'ins-prod-dev',
          label: 'Product Development',
          fullTitle: 'Product Development & Strategy Insights',
          level: 'item',
          purpose: 'Articles on product-market fit, PRD authoring, and concept architecture.',
          contains: [
            'How to define hardware BOM targets before hiring design agencies',
            'Navigating trade-offs between custom tooling vs. off-the-shelf components',
            'Ergonomic testing protocols for handheld physical devices'
          ],
          parentLabel: 'Insights Archive',
          parentId: 'insights-archive',
          status: 'Ready'
        },
        {
          id: 'ins-eng',
          label: 'Engineering Guides',
          fullTitle: 'Mechanical & Hardware Engineering Guides',
          level: 'item',
          purpose: 'In-depth tutorials on FEA simulation, thermal management, and PCB packaging.',
          contains: [
            'Passive vs. active thermal cooling strategies for sealed enclosures',
            'Designing robust snap-fit joints without stress fractures',
            'Ingress protection design rules: Achieving reliable IP67 sealing'
          ],
          parentLabel: 'Insights Archive',
          parentId: 'insights-archive',
          status: 'Ready'
        },
        {
          id: 'ins-mfg',
          label: 'Manufacturing Insights',
          fullTitle: 'DFM, Tooling & Manufacturing Insights',
          level: 'item',
          purpose: 'Practical advice on mold design, toolmaker negotiations, and quality control.',
          contains: [
            'How to review moldflow simulations to eliminate sink marks',
            'First Article Inspection (FAI) checklist for plastic injection parts',
            'Calculating real-world yield loss in multi-part assemblies'
          ],
          parentLabel: 'Insights Archive',
          parentId: 'insights-archive',
          status: 'Ready'
        },
        {
          id: 'ins-digital',
          label: 'Digital Experience',
          fullTitle: 'Digital Product & Companion App Insights',
          level: 'item',
          purpose: 'Best practices for Bluetooth provisioning, IoT dashboards, and companion apps.',
          contains: [
            'Eliminating friction in BLE device pairing flows',
            'Designing dark-mode companion app interfaces for outdoor use',
            'Telemetry dashboard architectures for industrial fleets'
          ],
          parentLabel: 'Insights Archive',
          parentId: 'insights-archive',
          status: 'Ready'
        },
        {
          id: 'ins-launch',
          label: 'Launch and Growth',
          fullTitle: 'Launch Strategy & Commercial Growth',
          level: 'item',
          purpose: 'Tactics for crowdfunding, 3D product visualization, and retail distribution.',
          contains: [
            'Why cinema-grade 3D renders accelerate pre-orders before tooling',
            'Building high-converting hardware marketing websites',
            'B2B hardware sales funnel optimization with interactive configurators'
          ],
          parentLabel: 'Insights Archive',
          parentId: 'insights-archive',
          status: 'Ready'
        },
        {
          id: 'ins-browse',
          label: 'Browse All Articles',
          fullTitle: 'Complete Searchable Insights Directory',
          level: 'item',
          purpose: 'Search and filter the complete archive of over 50 technical hardware articles.',
          contains: [
            'Filter by topic: Design, Engineering, Tooling, Medical, Growth',
            'Search by keyword and component type',
            'Direct PDF download of technical whitepapers'
          ],
          parentLabel: 'Insights Archive',
          parentId: 'insights-archive',
          status: 'Ready'
        }
      ]
    }
  ];

  // Root Node Object
  const rootNode: IANodeData = {
    id: 'home',
    label: 'Home',
    fullTitle: 'Bang Design Studio (Home)',
    level: 'root',
    purpose: 'Understand Bang’s 30-year capabilities and choose the right product path.',
    contains: [
      'Clear Value Proposition hero section',
      'Trusted client proof and tier-1 partner marks',
      'Visitor self-selection routing (Founders vs. Enterprise R&D)',
      'Two flagship core offers: Product to Manufacturing & Digital Growth',
      'Curated proof gallery of commercialized hardware',
      'Direct scheduling and confidential brief submission'
    ],
    childLabels: [
      'What We Do',
      'Industries',
      'Work',
      'How We Work',
      'About Bang',
      'Talk to Bang',
      'Insights Archive'
    ],
    status: 'Ready',
    wireframeSlug: '/'
  };

  // Keyboard navigation & space drag
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isSpacePressed && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        setIsSpacePressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isSpacePressed]);

  // Center & Fit Canvas Helper
  const handleResetView = useCallback(() => {
    setScale(0.85);
    setPan({ x: 40, y: 30 });
  }, []);

  const handleFitMap = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const virtualWidth = 2320;
    const targetScale = Math.min(0.9, Math.max(0.35, (containerWidth - 64) / virtualWidth));
    setScale(targetScale);
    setPan({ x: 20, y: 20 });
  }, []);

  // Zoom on Wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const zoomFactor = 1.08;
    const delta = -e.deltaY;
    const oldScale = scale;
    let newScale = delta > 0 ? oldScale * zoomFactor : oldScale / zoomFactor;
    newScale = Math.min(2.0, Math.max(0.3, newScale));

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newPanX = mouseX - (mouseX - pan.x) * (newScale / scale);
    const newPanY = mouseY - (mouseY - pan.y) * (newScale / scale);

    setScale(newScale);
    setPan({ x: newPanX, y: newPanY });
  };

  // Drag Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(2.0, prev + 0.12));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.3, prev - 0.12));
  };

  const toggleNodeExpansion = (nodeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {
      'home-sections': true,
      'what-we-do': true,
      'industries': true,
      'work': true,
      'how-we-work': true,
      'about-bang': true,
      'talk-to-bang': true,
      'insights-archive': true,
      'pdm': true,
      'digital-growth': true,
      'featured-case-studies': true,
      'med-sci': true,
      'ind-auto': true,
      'con-hw': true,
      'mob-nrg': true,
      'med-sectors': true,
      'ind-sectors': true,
      'con-sectors': true,
      'mob-sectors': true
    };
    setExpandedNodes(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {
      'home-sections': false,
      'what-we-do': false,
      'industries': false,
      'work': false,
      'how-we-work': false,
      'about-bang': false,
      'talk-to-bang': false,
      'insights-archive': false,
      'pdm': false,
      'digital-growth': false,
      'featured-case-studies': false,
      'med-sci': false,
      'ind-auto': false,
      'con-hw': false,
      'mob-nrg': false,
      'med-sectors': false,
      'ind-sectors': false,
      'con-sectors': false,
      'mob-sectors': false
    };
    setExpandedNodes(allCollapsed);
  };

  // Node Selection Handler
  const handleSelectNode = (node: IANodeData, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedNode(node);
    setIsSidePanelOpen(true);
  };

  // Helper to find node by id
  const findNodeById = (id: string): IANodeData | undefined => {
    if (id === 'home') return rootNode;
    const allHomeSec = homeSections.find(s => s.id === id);
    if (allHomeSec) return allHomeSec;

    for (const b of topBranches) {
      if (b.id === id) return b;
      if (b.children) {
        for (const c of b.children) {
          if (c.id === id) return c;
          if (c.children) {
            for (const sub of c.children) {
              if (sub.id === id) return sub;
            }
          }
        }
      }
    }
    return undefined;
  };

  return (
    <div className="relative w-full h-[calc(100vh-54px)] bg-[#F8F9FA] overflow-hidden select-none font-sans">
      
      {/* 1. TOP FLOATING CONTROLS TOOLBAR */}
      <div className="absolute top-4 left-4 z-20 flex items-center bg-white border border-[#E2E8F0] shadow-xs px-2 py-1 space-x-1.5 text-xs text-black">
        <button
          onClick={handleZoomOut}
          title="Zoom out (−)"
          className="p-1.5 hover:bg-[#F1F5F9] rounded text-black transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="text-[11px] font-medium text-black px-2 min-w-[46px] text-center">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          title="Zoom in (+)"
          className="p-1.5 hover:bg-[#F1F5F9] rounded text-black transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-4 bg-[#E2E8F0] mx-1" />

        <button
          onClick={handleResetView}
          title="Reset to 100% view"
          className="px-2 py-1 hover:bg-[#F1F5F9] rounded text-[11px] font-medium flex items-center space-x-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3 text-[#64748B]" />
          <span>Reset</span>
        </button>

        <button
          onClick={handleFitMap}
          title="Fit full hierarchy"
          className="px-2 py-1 hover:bg-[#F1F5F9] rounded text-[11px] font-medium flex items-center space-x-1 transition-colors"
        >
          <Maximize2 className="w-3 h-3 text-[#64748B]" />
          <span>Fit map</span>
        </button>

        <div className="w-[1px] h-4 bg-[#E2E8F0] mx-1" />

        <button
          onClick={expandAll}
          title="Expand all branches"
          className="px-2 py-1 hover:bg-[#F1F5F9] rounded text-[11px] font-medium text-[#475569] transition-colors"
        >
          Expand all
        </button>

        <button
          onClick={collapseAll}
          title="Collapse all branches"
          className="px-2 py-1 hover:bg-[#F1F5F9] rounded text-[11px] font-medium text-[#475569] transition-colors"
        >
          Collapse all
        </button>
      </div>

      {/* Floating Canvas Navigation Hint */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center space-x-2 bg-white/95 backdrop-blur-xs border border-[#E2E8F0] px-3 py-1 text-[11px] text-[#64748B] shadow-xs pointer-events-none">
        <span>Scroll to zoom</span>
        <span>•</span>
        <span>Drag to pan</span>
        <span>•</span>
        <span>Click any card to inspect full specifications</span>
      </div>

      {/* 2. MAIN PAN-AND-ZOOM CANVAS */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full h-full cursor-grab ${
          isDragging || isSpacePressed ? 'cursor-grabbing' : ''
        }`}
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      >
        {/* Scaled & Translated Virtual Workspace */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            width: '2380px',
          }}
          className="transition-transform duration-75 ease-out pt-6 pb-40 px-10"
        >
          
          {/* ========================================================================= */}
          {/* LEVEL 0: ROOT NODE (HOME)                                                */}
          {/* ========================================================================= */}
          <div className="flex flex-col items-center">
            
            {/* Home Root Card */}
            <div
              onClick={(e) => handleSelectNode(rootNode, e)}
              className={`w-[260px] bg-white border cursor-pointer transition-all duration-150 shadow-xs flex items-center justify-between px-4 py-3 ${
                selectedNode?.id === 'home'
                  ? 'border-black ring-2 ring-black bg-[#FAFAFA]'
                  : 'border-[#111111] hover:border-black hover:bg-[#FAFAFA]'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-black" />
                <span className="text-[14px] font-semibold text-black tracking-tight">
                  Home
                </span>
              </div>
              
              {/* Toggle to view Home Page Sections */}
              <button
                onClick={(e) => toggleNodeExpansion('home-sections', e)}
                title="Toggle Home page sections"
                className="text-[#64748B] hover:text-black p-1 hover:bg-[#F1F5F9] rounded"
              >
                {expandedNodes['home-sections'] ? (
                  <ChevronDown className="w-4 h-4 text-black" />
                ) : (
                  <span className="text-[11px] font-medium text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.5 rounded">
                    9 sections
                  </span>
                )}
              </button>
            </div>

            {/* Expandable Home Page Sections Subtree */}
            {expandedNodes['home-sections'] && (
              <div className="mt-4 flex flex-col items-center animate-in fade-in duration-150">
                <div className="w-[1px] h-4 bg-[#94A3B8]" />
                <div className="border border-[#CBD5E1] bg-white/80 p-3 rounded shadow-xs max-w-[840px]">
                  <div className="text-[11px] font-medium text-[#64748B] mb-2 text-center uppercase tracking-wider">
                    Home Page Content Sections
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {homeSections.map((sec) => (
                      <div
                        key={sec.id}
                        onClick={(e) => handleSelectNode(sec, e)}
                        className={`bg-white border px-3 py-2 text-left cursor-pointer transition-all ${
                          selectedNode?.id === sec.id
                            ? 'border-black ring-1 ring-black bg-[#F8FAFC]'
                            : 'border-[#E2E8F0] hover:border-black'
                        }`}
                      >
                        <div className="text-[12px] font-medium text-black truncate">
                          {sec.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Vertical Trunk Line from Home */}
            <div className="w-[1px] h-8 bg-[#94A3B8] my-1" />

            {/* Horizontal Distribution Line across 7 Main Columns */}
            <div className="w-[2080px] h-[1px] bg-[#94A3B8]" />
          </div>

          {/* ========================================================================= */}
          {/* LEVEL 1: SEVEN MAIN IA BRANCHES                                          */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-7 gap-[32px] items-start mt-0">
            
            {topBranches.map((branch) => {
              const isExpanded = expandedNodes[branch.id] ?? false;
              const hasChildren = (branch.children && branch.children.length > 0);

              return (
                <div key={branch.id} className="w-[270px] flex flex-col items-center">
                  
                  {/* Vertical drop line from horizontal distribution header */}
                  <div className="w-[1px] h-6 bg-[#94A3B8]" />

                  {/* Top-Level Main Branch Card (Classic 3-4 word box) */}
                  <div
                    onClick={(e) => {
                      handleSelectNode(branch, e);
                      toggleNodeExpansion(branch.id, e);
                    }}
                    className={`w-full bg-white border cursor-pointer transition-all duration-150 shadow-xs flex items-center justify-between px-3.5 py-3 ${
                      selectedNode?.id === branch.id
                        ? 'border-black ring-2 ring-black bg-[#FAFAFA]'
                        : 'border-[#111111] hover:border-black hover:bg-[#FAFAFA]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-[14px] font-semibold text-black tracking-tight">
                        {branch.label}
                      </span>
                    </div>

                    {hasChildren && (
                      <button
                        onClick={(e) => toggleNodeExpansion(branch.id, e)}
                        className="text-[#64748B] hover:text-black p-0.5 hover:bg-[#F1F5F9] rounded"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-black" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* =================================================================== */}
                  {/* LEVEL 2 & 3: EXPANDABLE SUB-BRANCHES                               */}
                  {/* =================================================================== */}
                  {isExpanded && branch.children && (
                    <div className="w-full flex flex-col items-center mt-2 animate-in fade-in duration-150">
                      
                      {/* Vertical line connecting parent to child stack */}
                      <div className="w-[1px] h-3 bg-[#CBD5E1]" />

                      {/* Stack of Child Nodes */}
                      <div className="w-full space-y-2.5">
                        {branch.children.map((child) => {
                          const isChildExpanded = expandedNodes[child.id] ?? false;
                          const hasSubChildren = child.children && child.children.length > 0;
                          const hasSectors = child.sectors && child.sectors.length > 0;
                          const sectorKey = `${child.id}-sectors`;
                          const isSectorsExpanded = expandedNodes[sectorKey] ?? false;

                          return (
                            <div key={child.id} className="w-full flex flex-col">
                              
                              {/* Child Box (Classic clean IA diagram node) */}
                              <div
                                onClick={(e) => {
                                  handleSelectNode(child, e);
                                  if (hasSubChildren) {
                                    toggleNodeExpansion(child.id, e);
                                  }
                                }}
                                className={`w-full bg-white border cursor-pointer transition-all flex items-center justify-between px-3 py-2.5 ${
                                  selectedNode?.id === child.id
                                    ? 'border-black ring-1 ring-black bg-[#F8FAFC]'
                                    : 'border-[#CBD5E1] hover:border-black'
                                }`}
                              >
                                <div className="text-[13px] font-medium text-black">
                                  {child.label}
                                </div>

                                {hasSubChildren && (
                                  <button
                                    onClick={(e) => toggleNodeExpansion(child.id, e)}
                                    className="text-[#64748B] hover:text-black p-0.5 hover:bg-[#F1F5F9] rounded"
                                  >
                                    {isChildExpanded ? (
                                      <ChevronDown className="w-3.5 h-3.5 text-black" />
                                    ) : (
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                )}
                              </div>

                              {/* LEVEL 3: Sub-child items (e.g. capabilities, cluster sections) */}
                              {isChildExpanded && hasSubChildren && (
                                <div className="ml-3 pl-2.5 border-l-2 border-[#E2E8F0] mt-1.5 space-y-1.5 animate-in fade-in duration-100">
                                  {child.children!.map((subChild) => (
                                    <div
                                      key={subChild.id}
                                      onClick={(e) => handleSelectNode(subChild, e)}
                                      className={`w-full bg-white border px-2.5 py-1.5 text-left cursor-pointer transition-all flex items-center justify-between ${
                                        selectedNode?.id === subChild.id
                                          ? 'border-black ring-1 ring-black bg-[#F8FAFC]'
                                          : 'border-[#E2E8F0] hover:border-black'
                                      }`}
                                    >
                                      <span className="text-[12px] font-normal text-black truncate">
                                        {subChild.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* RELATED SECTORS ACCORDION (For 15 legacy preserved sectors) */}
                              {hasSectors && (
                                <div className="mt-1 ml-3 pl-2.5 border-l-2 border-[#E2E8F0]">
                                  <button
                                    onClick={(e) => toggleNodeExpansion(sectorKey, e)}
                                    className="text-[11px] font-medium text-[#475569] hover:text-black flex items-center space-x-1 py-1"
                                  >
                                    {isSectorsExpanded ? (
                                      <ChevronDown className="w-3 h-3 text-black" />
                                    ) : (
                                      <ChevronRight className="w-3 h-3" />
                                    )}
                                    <span>Related Sectors ({child.sectors!.length})</span>
                                  </button>

                                  {isSectorsExpanded && (
                                    <div className="space-y-1 mt-1 animate-in fade-in duration-100">
                                      {child.sectors!.map((sector, idx) => (
                                        <div
                                          key={idx}
                                          onClick={(e) => handleSelectNode({
                                            id: `sector-${sector.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                                            label: sector,
                                            fullTitle: `${sector} (Preserved Legacy Sector)`,
                                            level: 'sector',
                                            purpose: `Preserved legacy sector page for ${sector} with SEO redirection and historical project records.`,
                                            contains: [
                                              `Dedicated sector overview for ${sector}`,
                                              'Historical project archives and technical case references',
                                              'Preserved canonical URL structure for search equity',
                                              'Routing into primary cluster engineering consultations'
                                            ],
                                            parentLabel: child.label,
                                            parentId: child.id,
                                            status: 'Archived',
                                            wireframeSlug: '/industries'
                                          }, e)}
                                          className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-black px-2 py-1 text-[11px] text-[#334155] cursor-pointer"
                                        >
                                          {sector}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                            </div>
                          );
                        })}
                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INSPECTION SIDE PANEL (Shows Detailed Specs on Selection)               */}
      {/* ========================================================================= */}
      {isSidePanelOpen && selectedNode && (
        <div className="absolute top-0 right-0 z-30 w-full max-w-[420px] h-full bg-white border-l border-[#E2E8F0] shadow-xl flex flex-col animate-in slide-in-from-right duration-200">
          
          {/* Panel Header */}
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] bg-white border border-[#CBD5E1] px-2 py-0.5 rounded">
                {selectedNode.level}
              </span>

              {/* Status Indicator Badge (Only shown in side panel!) */}
              {selectedNode.status && (
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded flex items-center space-x-1 ${
                  selectedNode.status === 'Ready'
                    ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                    : selectedNode.status === 'Needs review'
                    ? 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]'
                    : selectedNode.status === 'Needs verification'
                    ? 'bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]'
                    : 'bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]'
                }`}>
                  {selectedNode.status === 'Ready' && <CheckCircle2 className="w-3 h-3" />}
                  {selectedNode.status === 'Needs review' && <AlertCircle className="w-3 h-3" />}
                  {selectedNode.status === 'Needs verification' && <HelpCircle className="w-3 h-3" />}
                  {selectedNode.status === 'Archived' && <Clock className="w-3 h-3" />}
                  <span>{selectedNode.status}</span>
                </span>
              )}
            </div>

            <button
              onClick={() => setIsSidePanelOpen(false)}
              className="p-1 hover:bg-[#E2E8F0] rounded text-[#64748B] hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Panel Content Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* 1. Full Page Title */}
            <div>
              <div className="text-[11px] font-medium text-[#64748B] uppercase tracking-wider mb-1">
                Full Page Title
              </div>
              <h2 className="text-[17px] font-semibold text-black tracking-tight leading-snug">
                {selectedNode.fullTitle}
              </h2>
            </div>

            {/* 2. One-Line Purpose */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded">
              <div className="text-[11px] font-semibold text-[#475569] uppercase tracking-wider mb-1">
                One-Line Purpose
              </div>
              <p className="text-[13px] font-normal text-[#1E293B] leading-relaxed">
                {selectedNode.purpose}
              </p>
            </div>

            {/* Special Review / Audit Note if present */}
            {selectedNode.reviewNotes && (
              <div className="bg-[#FFFBEB] border border-[#FDE68A] p-3.5 rounded">
                <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-[#92400E] uppercase tracking-wider mb-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Audit Note</span>
                </div>
                <p className="text-[12px] font-medium text-[#78350F] leading-relaxed">
                  {selectedNode.reviewNotes}
                </p>
              </div>
            )}

            {/* 3. What the Page Contains */}
            <div>
              <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                What the Page Contains
              </div>
              <ul className="space-y-2">
                {selectedNode.contains.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-[13px] text-[#334155] leading-snug">
                    <span className="text-black font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Related Parent & Child Pages */}
            <div className="border-t border-[#E2E8F0] pt-4 space-y-3">
              <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Hierarchy & Related Pages
              </div>

              {/* Parent link */}
              {selectedNode.parentLabel && (
                <div className="flex items-center justify-between text-[12px] bg-[#F1F5F9] px-3 py-2 rounded">
                  <span className="text-[#64748B]">Parent page:</span>
                  <button
                    onClick={() => {
                      if (selectedNode.parentId) {
                        const parent = findNodeById(selectedNode.parentId);
                        if (parent) handleSelectNode(parent);
                      }
                    }}
                    className="font-medium text-black hover:underline flex items-center space-x-1"
                  >
                    <span>{selectedNode.parentLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Child pages list */}
              {selectedNode.childLabels && selectedNode.childLabels.length > 0 && (
                <div>
                  <div className="text-[11px] text-[#64748B] mb-1.5">
                    Direct child pages ({selectedNode.childLabels.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.childLabels.map((childLabel, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-white border border-[#CBD5E1] px-2 py-1 rounded text-[#1E293B]"
                      >
                        {childLabel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Source Status & Verification */}
            <div className="border-t border-[#E2E8F0] pt-4 space-y-2">
              <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Source Status
              </div>
              <div className="text-[12px] text-[#475569] leading-relaxed">
                {selectedNode.status === 'Ready' && 'Verified and aligned with Bang Design 2026 information architecture specification.'}
                {selectedNode.status === 'Needs review' && 'Audit flagged: Under content review prior to final production signoff.'}
                {selectedNode.status === 'Needs verification' && 'Pending client clearance or technical specification confirmation.'}
                {selectedNode.status === 'Archived' && 'Preserved legacy sector route with 301 redirection equity.'}
              </div>
            </div>

          </div>

          {/* Panel Footer: Wireframe Action Button */}
          {selectedNode.wireframeSlug && (
            <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
              <button
                onClick={() => {
                  if (onPreviewLivePage && selectedNode.wireframeSlug) {
                    onPreviewLivePage(selectedNode.wireframeSlug);
                  }
                }}
                className="w-full bg-black text-white hover:bg-[#222222] font-medium text-[13px] py-2.5 px-4 rounded transition-colors flex items-center justify-center space-x-2"
              >
                <span>Preview in Live 2026 Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
