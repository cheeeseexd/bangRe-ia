import { BANG_SPEC } from '../data/bangSpecData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestions?: string[];
  handoffTriggered?: boolean;
  recommendedNodes?: string[];
}

export async function askAIConcierge(
  userQuery: string,
  history: { role: string; content: string }[] = []
): Promise<{ text: string; suggestions: string[]; handoffTriggered: boolean; recommendedNodes?: string[] }> {
  const queryLower = userQuery.toLowerCase();

  // Check for handoff triggers
  const handoffKeywords = ['pricing', 'quote', 'cost', 'contract', 'proposal', 'nda', 'human', 'speak to a partner', 'feasibility review', 'custom rfp'];
  const shouldHandoff = handoffKeywords.some(k => queryLower.includes(k));

  if (shouldHandoff) {
    return {
      text: "Because you're asking about commercial terms, detailed pricing, or custom engineering contracts, this requires direct review by a Bang Design partner. We don't generate binding automated quotes to ensure strict commercial precision.\n\nWould you like to book a 30-minute Strategy Call with our leadership, or submit your project brief for an NDA-protected review?",
      suggestions: ["Book a Strategy Call", "Submit Project Brief", "Explore Case Studies"],
      handoffTriggered: true,
      recommendedNodes: ["node-booking", "node-part-plans"]
    };
  }

  // Check for Medical / Diagnostics
  if (queryLower.includes('medical') || queryLower.includes('health') || queryLower.includes('clinical') || queryLower.includes('diagnostic') || queryLower.includes('sensiflow') || queryLower.includes('fda') || queryLower.includes('iso')) {
    return {
      text: "For medical and diagnostic hardware, Bang provides end-to-end ISO 13485-aligned engineering, human factors analysis, and cleanroom tooling management.\n\nA prime reference is the SensiFlow Point-of-Care Blood Analyzer, where our ergonomic one-handed cartridge lock and compact thermal architecture helped secure FDA 510(k) clearance 4 months ahead of schedule while cutting unit manufacturing costs by 38%.",
      suggestions: ["View SensiFlow Case Study", "Discuss Medical Product", "See Product Design to Manufacturing"],
      handoffTriggered: false,
      recommendedNodes: ["node-ind-med", "node-p-mfg"]
    };
  }

  // Check for Robotics / Industrial
  if (queryLower.includes('robot') || queryLower.includes('industrial') || queryLower.includes('machine') || queryLower.includes('automation') || queryLower.includes('apex') || queryLower.includes('chassis')) {
    return {
      text: "In industrial automation and robotics, Bang engineers heavy-duty, IP67/IK10 ruggedized enclosures, cast aluminum structural chassis, and intuitive operator interfaces.\n\nFor the Apex Core Autonomous Warehouse AMR, we designed a single-piece hydroformed aluminum side skin that reduced assembly fasteners by 62% and cut fleet maintenance downtime by 55%.",
      suggestions: ["View Apex Robotics Case Study", "Industrial & Automation Capabilities", "Mechanical Engineering Specs"],
      handoffTriggered: false,
      recommendedNodes: ["node-ind-ind", "node-p-eng"]
    };
  }

  // Check for Consumer / Coffee / Appliances
  if (queryLower.includes('consumer') || queryLower.includes('appliance') || queryLower.includes('coffee') || queryLower.includes('omnibrew') || queryLower.includes('kickstarter') || queryLower.includes('iot')) {
    return {
      text: "For consumer hardware and connected IoT appliances, Bang bridges desirable tactile industrial design with lean, high-volume manufacturing.\n\nOur work on the OmniBrew Precision Induction Coffee System integrated sub-58 dBA planetary grinding with an invisible-until-lit LED matrix, raising $2.4M on Kickstarter and winning the Red Dot Best of the Best award.",
      suggestions: ["View OmniBrew Case Study", "Consumer Hardware Capabilities", "Discuss a Consumer Product"],
      handoffTriggered: false,
      recommendedNodes: ["node-ind-con", "node-p-design"]
    };
  }

  // Check for EV / Energy / Mobility
  if (queryLower.includes('ev') || queryLower.includes('charging') || queryLower.includes('mobility') || queryLower.includes('energy') || queryLower.includes('voltnode') || queryLower.includes('infrastructure')) {
    return {
      text: "In mobility and infrastructure, Bang creates weatherproof, vandal-proof physical dispensers and intelligent telemetry portals.\n\nFor VoltNode's 350kW DC fast-charging hubs, our maintenance-free counterbalanced cable system reduced field service dispatches by 80% across 600+ deployed stations.",
      suggestions: ["View VoltNode Case Study", "Mobility Infrastructure Page", "Book a Strategy Call"],
      handoffTriggered: false,
      recommendedNodes: ["node-ind-mob", "node-p-ux"]
    };
  }

  // Check for Two Offers / What do you do
  if (queryLower.includes('offer') || queryLower.includes('service') || queryLower.includes('what do you do') || queryLower.includes('capability') || queryLower.includes('difference')) {
    return {
      text: "Bang Design focuses on two clear primary offers:\n\n1. [Product Design to Manufacturing]: Taking ambitious physical and connected hardware from initial definition through industrial design, mechanical engineering, DFM, tooling, and mass production.\n\n2. [Digital Growth]: Human creative UX, conversion-led web platforms, 3D visualization, and AI-enabled commercial growth workflows to help products win in the market.",
      suggestions: ["Product Design to Manufacturing", "Digital Growth", "How Bang Works", "Book a Strategy Call"],
      handoffTriggered: false,
      recommendedNodes: ["node-p-mfg", "node-p-growth"]
    };
  }

  // Check for 2+2 Venture Model / Partnerships
  if (queryLower.includes('2+2') || queryLower.includes('venture') || queryLower.includes('partnership') || queryLower.includes('equity') || queryLower.includes('startup')) {
    return {
      text: "The 2+2 Venture Partnership is Bang's selective co-development model. For high-conviction physical hardware innovations, Bang co-invests senior design and engineering firepower alongside founding teams in exchange for shared commercial upside.\n\nApplications are evaluated quarterly based on IP defensibility, market tailwind, and technical alignment.",
      suggestions: ["View 2+2 Partnership Details", "Startup & Scaleup Support", "Submit Project Brief"],
      handoffTriggered: false,
      recommendedNodes: ["node-part-22", "node-part-startup"]
    };
  }

  // Default response with context
  return {
    text: `Bang Design is a boutique advisory, creative, technical, engineering, and manufacturing partner. We help ambitious companies turn complex physical & connected ideas into market-ready products, then scale them with digital growth systems.\n\nHow can I best assist you today?`,
    suggestions: [
      "Explain the two primary offers",
      "I have a medical/diagnostic device",
      "I need robotics or industrial engineering",
      "I need high-volume consumer hardware",
      "Book a Strategy Call"
    ],
    handoffTriggered: false,
    recommendedNodes: ["node-home", "node-what-we-do", "node-booking"]
  };
}
