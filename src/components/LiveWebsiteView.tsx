import React, { useState } from 'react';
import { BANG_SPEC, CaseStudy, IndustryItem } from '../data/bangSpecData';
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Layers, 
  Sparkles, 
  Calendar, 
  FileUp, 
  MessageSquare, 
  ShieldCheck,
  Award,
  Cpu,
  Boxes,
  Zap,
  Activity,
  Clock,
  FileText,
  Lock,
  Upload,
  X,
  User,
  Mail,
  Building,
  Globe
} from 'lucide-react';

interface LiveWebsiteViewProps {
  initialSlug?: string;
  onOpenAIConcierge: (initialPrompt?: string) => void;
  onOpenNodeInBlueprint: (slug: string) => void;
}

export const LiveWebsiteView: React.FC<LiveWebsiteViewProps> = ({
  initialSlug = '/',
  onOpenAIConcierge,
  onOpenNodeInBlueprint
}) => {
  // Navigation & View States
  const [currentRoute, setCurrentRoute] = useState<string>(initialSlug);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Interactive Path Selector
  const [selectedPathIndex, setSelectedPathIndex] = useState<number>(0);
  
  // Work Filter
  const [workFilter, setWorkFilter] = useState<string>('All');
  const [activeCaseStudyModal, setActiveCaseStudyModal] = useState<CaseStudy | null>(null);
  
  // Conversion / Booking State
  const [bookingMode, setBookingMode] = useState<'qualification' | 'direct_calendar'>('qualification');
  const [qualificationStep, setQualificationStep] = useState<number>(1);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('2026-08-20');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM EST');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('EST (Eastern Time)');
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  
  // Interactive Scope Estimator on Plans Page
  const [estimatorState, setEstimatorState] = useState({
    projectType: 'turnkey',
    complianceLevel: 'medical',
    urgency: 'standard'
  });

  const [formData, setFormData] = useState({
    building: '',
    stage: 'Concept / Idea Stage',
    supportNeed: 'End-to-End Product Design to Manufacturing',
    contactName: '',
    contactEmail: '',
    contactCompany: '',
    preferredDate: 'Tomorrow, 10:00 AM EST',
    projectSummary: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  // FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const pathOptions = [
    {
      title: "we have a product idea",
      desc: "turn napkin sketch or early ip into verified 3d cad, physical prototypes, and a clear manufacturing roadmap.",
      recommendedOffer: "Product Design to Manufacturing",
      primarySlug: "/product-design-to-manufacturing",
      cta: "discuss a product idea"
    },
    {
      title: "we need to redesign or improve a product",
      desc: "modernize ergonomics, slash bill of materials (bom) cost, improve cmf styling, and solve assembly bottlenecks.",
      recommendedOffer: "Product Design to Manufacturing",
      primarySlug: "/product-design-to-manufacturing",
      cta: "plan a redesign sprint"
    },
    {
      title: "we need engineering or manufacturing support",
      desc: "structural fea, thermal dissipation cfd, iso 13485 dfm, hardened tooling fabrication, and factory quality control.",
      recommendedOffer: "Product Design to Manufacturing",
      primarySlug: "/product/product-engineering",
      cta: "audit dfm & tooling"
    },
    {
      title: "we need to launch, market, or grow a product",
      desc: "photorealistic 3d visualizers, high-converting product landing sites, companion mobile apps, and ai-enabled outbound growth.",
      recommendedOffer: "Digital Growth",
      primarySlug: "/digital-growth",
      cta: "discuss digital growth"
    }
  ];

  const filteredCaseStudies = BANG_SPEC.caseStudies.filter(cs => {
    if (workFilter === 'All') return true;
    return cs.category.toLowerCase().includes(workFilter.toLowerCase());
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const navigateTo = (slug: string) => {
    setCurrentRoute(slug);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white flex flex-col">
      {/* 1. TOP STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-none border-b border-[#E5E5E5] px-6 lg:px-12 py-3.5 flex items-center justify-between">
        {/* Brand Mark */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigateTo('/')}
            className="text-left group flex items-baseline space-x-2"
          >
            <span className="font-bold text-lg tracking-tight text-black">Bang Design</span>
            <span className="text-xs text-[#737373]">/ 2026</span>
          </button>
          <span className="hidden md:inline-block text-xs text-[#A3A3A3] px-2 py-0.5 border border-[#E5E5E5]">
            bangid.com
          </span>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium">
          {/* Dropdown 1: What We Do */}
          <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'what-we-do' ? null : 'what-we-do')}
              onMouseEnter={() => setActiveDropdown('what-we-do')}
              className="flex items-center space-x-1 py-2 text-black hover:text-neutral-500 transition-colors text-xs"
            >
              <span>what we do</span>
              <ChevronDown className="w-3 h-3 text-[#737373]" />
            </button>

            {activeDropdown === 'what-we-do' && (
              <div className="absolute left-0 top-full w-80 bg-white border border-black shadow-none p-4 space-y-3 z-50">
                <div className="text-[10px] text-[#737373] border-b border-[#E5E5E5] pb-1">
                  two primary offers
                </div>
                
                <button
                  onClick={() => navigateTo('/product-design-to-manufacturing')}
                  className="w-full text-left p-2 hover:bg-[#F4F4F4] transition-colors border border-transparent hover:border-[#E5E5E5]"
                >
                  <div className="font-medium text-xs text-black">01. Product Design to Manufacturing</div>
                  <div className="text-[11px] text-[#525252] leading-tight mt-0.5">
                    Hardware, engineering, DFM, tooling, and mass production.
                  </div>
                </button>

                <button
                  onClick={() => navigateTo('/digital-growth')}
                  className="w-full text-left p-2 hover:bg-[#F4F4F4] transition-colors border border-transparent hover:border-[#E5E5E5]"
                >
                  <div className="font-medium text-xs text-black">02. Digital Growth</div>
                  <div className="text-[11px] text-[#525252] leading-tight mt-0.5">
                    UX, conversion websites, 3D renders, and AI marketing workflows.
                  </div>
                </button>

                <div className="text-[10px] text-[#737373] border-t border-[#E5E5E5] pt-2">
                  specialized capabilities
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-[#525252]">
                  <button onClick={() => navigateTo('/product/product-engineering')} className="text-left py-1 hover:text-black">
                    • engineering & fea
                  </button>
                  <button onClick={() => navigateTo('/product/dfm-and-tooling')} className="text-left py-1 hover:text-black">
                    • dfm & tooling
                  </button>
                  <button onClick={() => navigateTo('/product/industrial-design')} className="text-left py-1 hover:text-black">
                    • industrial design
                  </button>
                  <button onClick={() => navigateTo('/digital/product-visualization')} className="text-left py-1 hover:text-black">
                    • 3d visualization
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown 2: Industries */}
          <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'industries' ? null : 'industries')}
              onMouseEnter={() => setActiveDropdown('industries')}
              className="flex items-center space-x-1 py-2 text-black hover:text-neutral-500 transition-colors text-xs"
            >
              <span>industries</span>
              <ChevronDown className="w-3 h-3 text-[#737373]" />
            </button>

            {activeDropdown === 'industries' && (
              <div className="absolute left-0 top-full w-[480px] bg-white border border-black shadow-none p-4 space-y-3 z-50">
                <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-1">
                  <div className="text-[10px] text-[#737373]">
                    15 specialized engineering sectors
                  </div>
                  <button 
                    onClick={() => navigateTo('/industries')}
                    className="text-[10px] text-black hover:underline"
                  >
                    view all sectors →
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {BANG_SPEC.industries.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => navigateTo(ind.canonicalRoute)}
                      className="text-left p-1 hover:bg-[#F4F4F4] text-xs text-[#222222] hover:text-black transition-colors truncate"
                    >
                      • {ind.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Work / Case Studies Link */}
          <button
            onClick={() => navigateTo('/work')}
            className={`transition-colors text-xs ${
              currentRoute === '/work' ? 'text-black font-medium underline' : 'text-black hover:text-neutral-500'
            }`}
          >
            work
          </button>

          {/* Plans & Pricing Link */}
          <button
            onClick={() => navigateTo('/plans')}
            className={`transition-colors text-xs ${
              currentRoute === '/plans' || currentRoute === '/pricing' ? 'text-black font-medium underline' : 'text-black hover:text-neutral-500'
            }`}
          >
            plans & pricing
          </button>

          {/* About Link */}
          <button
            onClick={() => navigateTo('/about')}
            className={`transition-colors text-xs ${
              currentRoute === '/about' ? 'text-black font-medium underline' : 'text-black hover:text-neutral-500'
            }`}
          >
            about
          </button>

          {/* Preserved Blog & Archive Link */}
          <button
            onClick={() => navigateTo('/insights')}
            className="text-[#737373] hover:text-black transition-colors text-xs"
          >
            insights
          </button>
        </nav>

        {/* Right Header CTAs */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onOpenAIConcierge()}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-[#F4F4F4] hover:bg-neutral-200 border border-[#E5E5E5] text-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>ai concierge</span>
          </button>

          <button
            onClick={() => navigateTo('/start-for-free')}
            className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs font-medium tracking-tight transition-colors flex items-center space-x-1.5"
          >
            <span>book a strategy call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. SUB-ROUTE BREADCRUMB & IA INSPECTOR SYNC */}
      <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] px-6 lg:px-12 py-2 flex items-center justify-between text-xs text-[#737373]">
        <div className="flex items-center space-x-2">
          <span>route:</span>
          <span className="text-black font-medium">{currentRoute}</span>
          {currentRoute !== '/' && (
            <button
              onClick={() => navigateTo('/')}
              className="text-[11px] underline hover:text-black ml-2"
            >
              (return to home)
            </button>
          )}
        </div>

        <button
          onClick={() => onOpenNodeInBlueprint(currentRoute)}
          className="flex items-center space-x-1 text-[#525252] hover:text-black transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>inspect node in ia blueprint</span>
        </button>
      </div>

      {/* 3. MAIN HOMEPAGE / CONDITIONAL ROUTE VIEW */}
      {currentRoute === '/' && (
        <main className="flex-1">
          {/* SECTION 1: HERO */}
          <section className="px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto border-b border-[#E5E5E5]">
            <div className="space-y-6 max-w-4xl">
              <div className="text-xs text-[#737373] tracking-wider">
                // product design • engineering • dfm • digital growth systems
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black lowercase leading-[1.1]">
                We turn complex product ideas into market-ready products.
              </h1>

              <p className="text-base sm:text-lg text-[#525252] max-w-2xl leading-relaxed">
                Bang Design helps ambitious product companies define, design, engineer, produce, and grow physical and connected products.
              </p>

              {/* Strict Primary CTA with Secondary Link */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('/start-for-free')}
                  className="px-6 py-3 bg-black text-white hover:bg-neutral-800 text-xs font-medium tracking-tight transition-colors flex items-center space-x-2"
                >
                  <span>book a strategy call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('section-work');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-white hover:bg-[#F9F9F9] border border-[#E5E5E5] hover:border-black text-xs font-medium transition-colors"
                >
                  see relevant work
                </button>

                <button
                  onClick={() => onOpenAIConcierge('What are the differences between the two primary offers?')}
                  className="px-4 py-3 bg-[#FAFAFA] hover:bg-[#F0F0F0] border border-[#E5E5E5] text-xs text-[#525252] flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>ask ai concierge</span>
                </button>
              </div>

              {/* Fulfillment Promise */}
              <div className="pt-4 text-xs text-[#737373] flex flex-wrap gap-4 border-t border-[#F4F4F4]">
                <span>✓ 30-min strategy assessment</span>
                <span>✓ initial route & feasibility guidance</span>
                <span>✓ no commitment required</span>
              </div>
            </div>
          </section>

          {/* SECTION 2: IMMEDIATE VALIDATED PROOF */}
          <section className="bg-[#FAFAFA] border-b border-[#E5E5E5] px-6 lg:px-12 py-10">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-wrap items-center justify-between text-xs text-[#737373]">
                <span>validated industry outcomes & track record</span>
                <span>iso 13485 • fda 510(k) • ce / fcc compliant</span>
              </div>

              {/* Quantitative Metric Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-[#E5E5E5]">
                  <div className="text-2xl lg:text-3xl font-medium text-black tracking-tight">8.5 mo</div>
                  <div className="text-xs text-[#525252] mt-1">napkin to fda 510(k) filing</div>
                  <div className="text-[11px] text-[#737373] mt-2 border-t border-[#F4F4F4] pt-1">sensiflow medical</div>
                </div>
                <div className="p-4 bg-white border border-[#E5E5E5]">
                  <div className="text-2xl lg:text-3xl font-medium text-black tracking-tight">-38 dba</div>
                  <div className="text-xs text-[#525252] mt-1">acoustic vibration reduction</div>
                  <div className="text-[11px] text-[#737373] mt-2 border-t border-[#F4F4F4] pt-1">apex industrial robotics</div>
                </div>
                <div className="p-4 bg-white border border-[#E5E5E5]">
                  <div className="text-2xl lg:text-3xl font-medium text-black tracking-tight">-$42.10</div>
                  <div className="text-xs text-[#525252] mt-1">bom unit cost reduction</div>
                  <div className="text-[11px] text-[#737373] mt-2 border-t border-[#F4F4F4] pt-1">omnibrew consumer appliance</div>
                </div>
                <div className="p-4 bg-white border border-[#E5E5E5]">
                  <div className="text-2xl lg:text-3xl font-medium text-black tracking-tight">3.8x</div>
                  <div className="text-xs text-[#525252] mt-1">b2b conversion velocity</div>
                  <div className="text-[11px] text-[#737373] mt-2 border-t border-[#F4F4F4] pt-1">voltnode energy infrastructure</div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: CHOOSE YOUR PATH (INTERACTIVE ROUTER) */}
          <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-b border-[#E5E5E5]">
            <div className="space-y-8">
              <div className="space-y-1">
                <div className="text-xs text-[#737373]">
                  // self-qualification & guidance
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-black lowercase">
                  What are you trying to achieve?
                </h2>
                <p className="text-xs text-[#525252]">
                  Select your current objective to reveal the exact delivery model, deliverables, and timeline.
                </p>
              </div>

              {/* 4 Interactive Option Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pathOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPathIndex(idx)}
                    className={`p-5 text-left border transition-all flex flex-col justify-between ${
                      selectedPathIndex === idx
                        ? 'border-black bg-[#FAFAFA] ring-2 ring-black'
                        : 'border-[#E5E5E5] bg-white hover:border-black'
                    }`}
                  >
                    <div>
                      <div className="text-xs text-[#737373] mb-2">0{idx + 1}.</div>
                      <div className="font-medium text-sm text-black mb-2 lowercase">{opt.title}</div>
                      <p className="text-xs text-[#525252] leading-relaxed">{opt.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-medium text-black">
                      <span>select</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${selectedPathIndex === idx ? 'text-black' : 'text-[#A3A3A3]'}`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Dynamic Path Outcome Panel */}
              <div className="p-6 bg-[#FAFAFA] border border-black space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#737373]">recommended offer:</span>
                    <span className="font-semibold text-black">{pathOptions[selectedPathIndex].recommendedOffer}</span>
                  </div>
                  <span className="text-[11px] text-[#737373]">
                    target route: {pathOptions[selectedPathIndex].primarySlug}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[#333333] max-w-2xl">
                    Bang provides dedicated senior engineering, industrial design, and production validation specifically tailored to {pathOptions[selectedPathIndex].title.toLowerCase()}.
                  </p>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => navigateTo(pathOptions[selectedPathIndex].primarySlug)}
                      className="px-4 py-2 bg-white hover:bg-[#F4F4F4] border border-black text-xs font-medium transition-colors"
                    >
                      view full offer details
                    </button>
                    <button
                      onClick={() => navigateTo('/start-for-free')}
                      className="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs font-medium transition-colors flex items-center space-x-1.5"
                    >
                      <span>{pathOptions[selectedPathIndex].cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: THE TWO PRIMARY OFFERS (COMPARATIVE MATRIX) */}
          <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-b border-[#E5E5E5]">
            <div className="space-y-10">
              <div className="space-y-2 max-w-3xl">
                <div className="text-xs text-[#737373]">
                  // clear taxonomy • zero competing calls to action
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-black lowercase">
                  Two Clear Ways We Partner
                </h2>
                <p className="text-xs text-[#525252]">
                  We deliberately structure our practice into two focused, world-class offerings.
                </p>
              </div>

              {/* Two Distinct Large Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* OFFER 1: Product Design to Manufacturing */}
                <div className="p-8 border border-black bg-white space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs text-[#737373]">
                      <span>01. PHYSICAL & CONNECTED HARDWARE</span>
                      <span className="bg-black text-white px-2 py-0.5 text-[10px]">
                        PRIMARY OFFER
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium text-black lowercase">
                      Product Design to Manufacturing
                    </h3>

                    <p className="text-xs text-[#525252] leading-relaxed">
                      The shortest path from product idea to manufacturable, launch-ready product, with no compromise.
                    </p>

                    <div className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] space-y-1">
                      <div className="text-[11px] text-[#737373]">who it is for:</div>
                      <div className="text-xs text-black">
                        Companies developing, manufacturing, or commercializing complex physical or connected products.
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] text-[#737373]">core capabilities included:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#333333]">
                        <div>• industrial & product design</div>
                        <div>• mechanical engineering & fea</div>
                        <div>• human factors & ux testing</div>
                        <div>• class-a surface styling</div>
                        <div>• design for manufacturing (dfm)</div>
                        <div>• hardened tooling management</div>
                        <div>• bill of materials (bom) audit</div>
                        <div>• factory pilot quality control</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] text-[#737373]">validated proof:</div>
                      <div className="text-xs text-[#525252]">
                        Over 140+ physical products manufactured globally across medical, industrial robotics, and consumer IoT.
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E5E5E5] flex items-center justify-between">
                    <button
                      onClick={() => navigateTo('/product-design-to-manufacturing')}
                      className="text-xs underline text-[#525252] hover:text-black font-medium"
                    >
                      explore capabilities & dfm specs →
                    </button>
                    <button
                      onClick={() => navigateTo('/start-for-free')}
                      className="px-4 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
                    >
                      <span>discuss a product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* OFFER 2: Digital Growth */}
                <div className="p-8 border border-[#E5E5E5] bg-white space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs text-[#737373]">
                      <span>02. DIGITAL EXPERIENCE & AI SYSTEMS</span>
                      <span className="bg-[#F4F4F4] text-black px-2 py-0.5 text-[10px] border border-[#E5E5E5]">
                        PRIMARY OFFER
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium text-black lowercase">
                      Digital Growth
                    </h3>

                    <p className="text-xs text-[#525252] leading-relaxed">
                      Human creative UX and AI-enabled growth systems that make products easier to understand, choose, and grow.
                    </p>

                    <div className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] space-y-1">
                      <div className="text-[11px] text-[#737373]">who it is for:</div>
                      <div className="text-xs text-black">
                        Product companies that need stronger digital experience, communication, conversion, or marketing systems.
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] text-[#737373]">core capabilities included:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#333333]">
                        <div>• conversion-led product websites</div>
                        <div>• 3d interactive visualizers</div>
                        <div>• companion mobile & web apps</div>
                        <div>• ai content generation pipelines</div>
                        <div>• intelligent qualification bots</div>
                        <div>• automated b2b outbound funnels</div>
                        <div>• brand identity & visual systems</div>
                        <div>• analytics & telemetry pipelines</div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] text-[#737373]">validated proof:</div>
                      <div className="text-xs text-[#525252]">
                        Average 3.2x increase in qualified inbound conversion for technical B2B and consumer brands.
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E5E5E5] flex items-center justify-between">
                    <button
                      onClick={() => navigateTo('/digital-growth')}
                      className="text-xs underline text-[#525252] hover:text-black font-medium"
                    >
                      explore digital systems & 3d renders →
                    </button>
                    <button
                      onClick={() => navigateTo('/start-for-free')}
                      className="px-4 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
                    >
                      <span>discuss growth</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4.5: 15 SPECIALIZED ENGINEERING SECTORS */}
          <section id="section-industries" className="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-b border-[#E5E5E5]">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="text-xs text-[#737373]">
                  // cross-domain technical capabilities
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-black lowercase">
                  15 Specialized Industry Sectors
                </h2>
                <p className="text-xs text-[#525252] max-w-3xl leading-relaxed">
                  Bang Design provides dedicated mechanical, industrial design, electronic packaging, and regulatory expertise tailored to the specific standards of each sector.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {BANG_SPEC.industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => navigateTo(ind.canonicalRoute)}
                    className="p-3.5 bg-[#FAFAFA] border border-[#E5E5E5] hover:border-black hover:bg-white text-left transition-all group flex flex-col justify-between h-36"
                  >
                    <div className="space-y-1.5">
                      <div className="font-medium text-xs text-black group-hover:text-black">
                        {ind.name}
                      </div>
                      <p className="text-[11px] text-[#737373] line-clamp-2 leading-relaxed">
                        {ind.heroHeadline}
                      </p>
                    </div>
                    <div className="text-[10px] text-[#737373] group-hover:text-black flex items-center space-x-1 pt-2 border-t border-[#EAEAEA]">
                      <span>explore sector</span>
                      <span>→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: FEATURED WORK & VALIDATED CASE STUDIES */}
          <section id="section-work" className="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-b border-[#E5E5E5]">
            <div className="space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-xs text-[#737373]">
                    // rigorous engineering & design proof
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-black lowercase">
                    Featured Work & Validated Outcomes
                  </h2>
                  <p className="text-xs text-[#525252]">
                    Every case study follows our strict standard: Challenge, Bang's Role, Process, and Validated Outcome.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-1 border border-[#E5E5E5] bg-white p-1">
                  {['All', 'Medical', 'Industrial', 'Consumer', 'Energy'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setWorkFilter(cat)}
                      className={`px-3 py-1 text-xs transition-colors ${
                        workFilter === cat
                          ? 'bg-black text-white font-medium'
                          : 'text-[#525252] hover:text-black hover:bg-[#F9F9F9]'
                      }`}
                    >
                      {cat.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Case Study Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCaseStudies.map((cs) => (
                  <div
                    key={cs.id}
                    className="border border-[#E5E5E5] bg-white p-6 space-y-4 hover:border-black transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-black font-medium">{cs.category}</span>
                        <span className="text-[#737373] text-[11px]">{cs.clientContext}</span>
                      </div>

                      <h3 className="text-xl font-medium text-black lowercase tracking-tight">
                        {cs.title}
                      </h3>

                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-[#737373] font-medium">challenge: </span>
                          <span className="text-[#333333]">{cs.challenge}</span>
                        </div>
                        <div>
                          <span className="text-[#737373] font-medium">bang's role: </span>
                          <span className="text-[#333333]">{cs.bangRole}</span>
                        </div>
                        <div className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] text-xs">
                          <span className="font-semibold text-black">validated outcome: </span>
                          <span className="text-[#222222]">{cs.validatedOutcome}</span>
                        </div>
                      </div>

                      {/* Key Metrics Badges */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {cs.metrics.map((m, idx) => (
                          <div key={idx} className="p-2 bg-[#F4F4F4] border border-[#E5E5E5] text-xs">
                            <div className="font-bold text-black">{m.value}</div>
                            <div className="text-[10px] text-[#737373]">{m.label.toLowerCase()}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                      <button
                        onClick={() => setActiveCaseStudyModal(cs)}
                        className="text-xs text-black font-medium hover:underline flex items-center space-x-1"
                      >
                        <span>read full case study</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => navigateTo(`/work/${cs.id}`)}
                        className="text-xs text-[#737373] hover:text-black"
                      >
                        view dedicated page →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: HOW BANG WORKS (6-STEP METHODOLOGY) */}
          <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-b border-[#E5E5E5]">
            <div className="space-y-10">
              <div className="space-y-2">
                <div className="text-xs text-[#737373]">
                  // structured engagement methodology
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-black lowercase">
                  How Bang Works
                </h2>
                <p className="text-xs text-[#525252]">
                  From initial constraint definition to tooling sign-off and continuous commercial growth.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { step: "01", title: "Understand constraints", desc: "deep dive into regulatory requirements (fda, ce, ul), user ergonomics, bill of materials targets, and supply chain constraints." },
                  { step: "02", title: "Define route & architecture", desc: "synthesize initial mechanical layout, electrical architecture, industrial design concepts, and unit economics." },
                  { step: "03", title: "Design & engineer", desc: "develop production 3d cad, structural fea simulations, thermal cfd models, and class-a aesthetic surfacing." },
                  { step: "04", title: "Prototype, test & refine", desc: "fabricate high-fidelity functional prototypes, conduct user human factors trials, and verify tolerance stack-ups." },
                  { step: "05", title: "Prepare for production", desc: "draft complete dfm specifications, build hardened steel injection molds, audit factories, and oversee pilot runs." },
                  { step: "06", title: "Support growth & launch", desc: "create photorealistic 3d assets, launch conversion web platforms, and deploy ai outbound marketing funnels." }
                ].map((s) => (
                  <div key={s.step} className="p-6 border border-[#E5E5E5] bg-[#FAFAFA] space-y-2 text-left">
                    <div className="text-xs text-[#A3A3A3] font-medium">STEP {s.step}</div>
                    <div className="font-medium text-sm text-black lowercase">{s.title}</div>
                    <p className="text-xs text-[#525252] leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7: WHY BANG (INTEGRATED ADVANTAGE) */}
          <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-b border-[#E5E5E5] bg-[#FAFAFA]">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="text-xs text-[#737373]">
                  // the boutique advantage
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-black lowercase">
                  Why Work with Bang
                </h2>
                <p className="text-xs text-[#525252]">
                  Eliminating the friction between styling studios, engineering firms, and overseas factories.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-[#E5E5E5] space-y-2">
                  <div className="font-medium text-sm text-black">one integrated team</div>
                  <p className="text-xs text-[#525252] leading-relaxed">
                    Industrial design, mechanical engineering, human factors, and manufacturing oversight sit under one roof. No misaligned handoffs.
                  </p>
                </div>
                <div className="p-6 bg-white border border-[#E5E5E5] space-y-2">
                  <div className="font-medium text-sm text-black">factory-floor credibility</div>
                  <p className="text-xs text-[#525252] leading-relaxed">
                    We write tooling specifications and stand beside press machines during first article inspections. What we design can actually be made.
                  </p>
                </div>
                <div className="p-6 bg-white border border-[#E5E5E5] space-y-2">
                  <div className="font-medium text-sm text-black">commercial & digital perspective</div>
                  <p className="text-xs text-[#525252] leading-relaxed">
                    A great product must sell. Our digital growth practice creates the 3D visualizers, marketing funnels, and websites that win market share.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8: CONVERSION / 4-STEP QUALIFICATION ENGINE */}
          <section id="section-conversion" className="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-b border-[#E5E5E5]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Context & Guarantees */}
              <div className="lg:col-span-5 space-y-6">
                <div className="text-xs text-[#737373]">
                  // 30-minute introductory strategy session
                </div>
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black lowercase leading-tight">
                  Tell us what you are building.
                </h2>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Book a direct 30-minute strategy call with a Bang Design partner. We will evaluate technical feasibility, provide initial route guidance, identify critical manufacturing risks, and outline realistic timelines.
                </p>

                <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2 text-xs">
                  <div className="font-semibold text-black flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-black" />
                    <span>what to expect:</span>
                  </div>
                  <div className="space-y-1 text-[#525252]">
                    <div>• 30-minute focused video call directly with a partner</div>
                    <div>• initial feasibility, tooling & timeline assessment</div>
                    <div>• 100% mutual nda protection for confidential ip</div>
                    <div>• zero obligation before initial conversation</div>
                  </div>
                </div>

                {/* Minute-by-Minute Breakdown */}
                <div className="p-4 bg-white border border-[#E5E5E5] space-y-2 text-xs">
                  <div className="font-semibold text-black flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-black" />
                    <span>strategy call breakdown:</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-[#525252]">
                    <div className="flex items-start space-x-2">
                      <span className="font-mono text-black font-semibold">00-07m</span>
                      <span>Product architecture & commercial goals review</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-mono text-black font-semibold">07-18m</span>
                      <span>Mechanical, DFM tooling & regulatory risk analysis</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-mono text-black font-semibold">18-25m</span>
                      <span>Recommended development roadmap & timeline</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-mono text-black font-semibold">25-30m</span>
                      <span>Next steps & formal fixed proposal within 24h</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col space-y-2">
                  <button
                    onClick={() => onOpenAIConcierge('Can you help me prepare a brief before booking?')}
                    className="p-3 bg-white hover:bg-[#F9F9F9] border border-[#E5E5E5] text-xs text-left flex items-center justify-between text-[#525252] hover:text-black transition-colors"
                  >
                    <span>not ready to book? use our ai concierge</span>
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Booking Engine */}
              <div className="lg:col-span-7 bg-[#FAFAFA] border border-black p-6 sm:p-8">
                {/* Mode Selector Tabs */}
                <div className="flex items-center space-x-2 mb-6 border-b border-[#E5E5E5] pb-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setBookingMode('qualification')}
                    className={`px-3 py-1.5 font-medium transition-colors ${
                      bookingMode === 'qualification'
                        ? 'bg-black text-white'
                        : 'bg-white text-[#525252] border border-[#E5E5E5] hover:text-black'
                    }`}
                  >
                    1. guided qualification
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingMode('direct_calendar')}
                    className={`px-3 py-1.5 font-medium transition-colors ${
                      bookingMode === 'direct_calendar'
                        ? 'bg-black text-white'
                        : 'bg-white text-[#525252] border border-[#E5E5E5] hover:text-black'
                    }`}
                  >
                    2. direct calendar slot
                  </button>
                </div>

                {!isFormSubmitted ? (
                  bookingMode === 'qualification' ? (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      {/* Progress Bar */}
                      <div className="flex items-center justify-between text-xs pb-3 border-b border-[#E5E5E5]">
                        <span className="font-medium text-black">
                          step 0{qualificationStep} of 04
                        </span>
                        <span className="text-[#737373]">
                          {qualificationStep === 1 && 'product category'}
                          {qualificationStep === 2 && 'development stage'}
                          {qualificationStep === 3 && 'support requirement & brief'}
                          {qualificationStep === 4 && 'contact & schedule'}
                        </span>
                      </div>

                      {/* Step 1: What are you building? */}
                      {qualificationStep === 1 && (
                        <div className="space-y-4">
                          <label className="block text-xs font-semibold text-black">
                            1. What type of product are you developing or redesigning?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {[
                              'Medical / Diagnostic Hardware',
                              'Industrial Robotics / Automation',
                              'Consumer Hardware / Appliance',
                              'Energy / Power Infrastructure',
                              'Connected IoT / Smart Device',
                              'Digital Growth / Conversion System'
                            ].map((item) => (
                              <button
                                type="button"
                                key={item}
                                onClick={() => setFormData({ ...formData, building: item })}
                                className={`p-3 text-left border text-xs transition-colors ${
                                  formData.building === item
                                    ? 'border-black bg-black text-white font-medium'
                                    : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                                }`}
                              >
                                {item.toLowerCase()}
                              </button>
                            ))}
                          </div>
                          <input
                            type="text"
                            value={formData.building}
                            onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                            placeholder="or describe your product in one sentence..."
                            className="w-full p-2.5 bg-white border border-[#E5E5E5] focus:border-black text-xs focus:outline-none"
                          />
                        </div>
                      )}

                      {/* Step 2: What stage are you at? */}
                      {qualificationStep === 2 && (
                        <div className="space-y-4">
                          <label className="block text-xs font-semibold text-black">
                            2. What is the current stage of this project?
                          </label>
                          <div className="space-y-2 text-xs">
                            {[
                              { title: 'Concept / Napkin Idea', desc: 'No CAD or prototype yet; need product definition and feasibility.' },
                              { title: 'Early Prototype / Breadboard', desc: 'Functional electronics or proof-of-concept ready; need styling, UX, and mechanical engineering.' },
                              { title: 'Ready for DFM & Tooling', desc: 'CAD exists; need tooling specification, cost reduction, and manufacturing oversight.' },
                              { title: 'Existing Marketed Product', desc: 'Need redesign, BOM cost reduction, or digital growth and 3D visualizers.' }
                            ].map((stg) => (
                              <button
                                type="button"
                                key={stg.title}
                                onClick={() => setFormData({ ...formData, stage: stg.title })}
                                className={`w-full p-3 text-left border text-xs transition-colors ${
                                  formData.stage === stg.title
                                    ? 'border-black bg-black text-white'
                                    : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                                }`}
                              >
                                <div className="font-semibold">{stg.title.toLowerCase()}</div>
                                <div className={`text-[11px] ${formData.stage === stg.title ? 'text-neutral-300' : 'text-[#737373]'}`}>
                                  {stg.desc.toLowerCase()}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 3: What primary support do you need? */}
                      {qualificationStep === 3 && (
                        <div className="space-y-4">
                          <label className="block text-xs font-semibold text-black">
                            3. What primary capability do you need from Bang?
                          </label>
                          <div className="space-y-2 text-xs">
                            {[
                              'Turnkey Concept-to-Production Hardware Program',
                              'Mechanical Engineering, FEA & DFM Tooling Audit',
                              'Industrial Design & Ergonomic Human Factors',
                              'Digital Growth, Conversion Website & 3D Visualizer',
                              'Dedicated Engineering Retainer & Scaling Support'
                            ].map((need) => (
                              <button
                                type="button"
                                key={need}
                                onClick={() => setFormData({ ...formData, supportNeed: need })}
                                className={`w-full p-3 text-left border text-xs transition-colors ${
                                  formData.supportNeed === need
                                    ? 'border-black bg-black text-white font-medium'
                                    : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                                }`}
                              >
                                {need.toLowerCase()}
                              </button>
                            ))}
                          </div>

                          {/* File Attachment Dropzone */}
                          <div className="pt-2">
                            <span className="text-[11px] text-[#737373] block mb-1.5">
                              Optional CAD or Brief Attachment (Protected by NDA):
                            </span>
                            {attachedFile ? (
                              <div className="p-3 bg-white border border-black flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-2">
                                  <FileText className="w-4 h-4 text-black" />
                                  <span className="font-medium text-black">{attachedFile.name}</span>
                                  <span className="text-[#737373]">({attachedFile.size})</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setAttachedFile(null)}
                                  className="text-xs text-neutral-400 hover:text-black"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <label className="p-4 bg-white border border-dashed border-[#CCCCCC] hover:border-black cursor-pointer flex flex-col items-center justify-center space-y-1 transition-colors">
                                <Upload className="w-4 h-4 text-[#737373]" />
                                <span className="text-xs text-[#525252]">Click or drag STEP, IGES, STL, or PDF brief</span>
                                <span className="text-[10px] text-[#A3A3A3]">Max 50MB • AES-256 Encrypted Private Storage</span>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const f = e.target.files[0];
                                      setAttachedFile({
                                        name: f.name,
                                        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`
                                      });
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Step 4: Contact & Meeting Slot */}
                      {qualificationStep === 4 && (
                        <div className="space-y-4 text-xs">
                          <label className="block text-xs font-semibold text-black">
                            4. Where should we send calendar invitation and NDA?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[11px] text-[#737373] block mb-1">Your Full Name:</span>
                              <input
                                type="text"
                                required
                                value={formData.contactName}
                                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                placeholder="Sarah Jenkins"
                                className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] text-[#737373] block mb-1">Work Email:</span>
                              <input
                                type="email"
                                required
                                value={formData.contactEmail}
                                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                placeholder="sarah@company.com"
                                className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] text-[#737373] block mb-1">Company / Organization:</span>
                            <input
                              type="text"
                              value={formData.contactCompany}
                              onChange={(e) => setFormData({ ...formData, contactCompany: e.target.value })}
                              placeholder="Aether Robotics"
                              className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                            />
                          </div>

                          <div className="p-3 bg-white border border-[#E5E5E5] space-y-2">
                            <span className="text-[11px] text-[#737373] block">Preferred 30-min Strategy Call Slot:</span>
                            <div className="flex flex-wrap gap-2">
                              {['Tomorrow, 10:00 AM EST', 'Thursday, 2:00 PM EST', 'Friday, 11:30 AM EST'].map((slot) => (
                                <button
                                  type="button"
                                  key={slot}
                                  onClick={() => setFormData({ ...formData, preferredDate: slot })}
                                  className={`px-2.5 py-1 text-xs border ${
                                    formData.preferredDate === slot
                                      ? 'bg-black text-white border-black'
                                      : 'bg-[#FAFAFA] text-[#525252] border-[#E5E5E5]'
                                  }`}
                                >
                                  {slot.toLowerCase()}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step Navigation Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
                        {qualificationStep > 1 ? (
                          <button
                            type="button"
                            onClick={() => setQualificationStep(prev => prev - 1)}
                            className="px-4 py-2 border border-[#E5E5E5] bg-white text-xs text-[#525252] hover:text-black"
                          >
                            ← back
                          </button>
                        ) : <div />}

                        {qualificationStep < 4 ? (
                          <button
                            type="button"
                            onClick={() => setQualificationStep(prev => prev + 1)}
                            className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
                          >
                            <span>continue to step 0{qualificationStep + 1}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
                          >
                            <span>confirm strategy call</span>
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </form>
                  ) : (
                    /* DIRECT LIVE CALENDAR BOOKING MODE */
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-black">
                            Select Available Date & Time Slot:
                          </label>
                          <select
                            value={selectedTimezone}
                            onChange={(e) => setSelectedTimezone(e.target.value)}
                            className="text-[11px] p-1 bg-white border border-[#E5E5E5] focus:outline-none"
                          >
                            <option value="EST (Eastern Time)">EST (Eastern Time)</option>
                            <option value="CST (Central Time)">CST (Central Time)</option>
                            <option value="PST (Pacific Time)">PST (Pacific Time)</option>
                            <option value="GMT (London)">GMT (London)</option>
                            <option value="CET (Europe)">CET (Europe)</option>
                          </select>
                        </div>

                        {/* Calendar Date Selector */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          {[
                            { day: 'Wed', date: 'Aug 20', full: '2026-08-20' },
                            { day: 'Thu', date: 'Aug 21', full: '2026-08-21' },
                            { day: 'Fri', date: 'Aug 22', full: '2026-08-22' },
                            { day: 'Mon', date: 'Aug 25', full: '2026-08-25' }
                          ].map((d) => (
                            <button
                              type="button"
                              key={d.full}
                              onClick={() => setSelectedCalendarDate(d.full)}
                              className={`p-2.5 text-center border transition-colors ${
                                selectedCalendarDate === d.full
                                  ? 'border-black bg-black text-white'
                                  : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                              }`}
                            >
                              <div className="text-[10px] uppercase tracking-wider opacity-80">{d.day}</div>
                              <div className="font-semibold text-xs mt-0.5">{d.date}</div>
                            </button>
                          ))}
                        </div>

                        {/* Available Slots */}
                        <div className="pt-2">
                          <span className="text-[11px] text-[#737373] block mb-1.5">
                            Available 30-min slots for {selectedCalendarDate}:
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {['09:30 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:15 PM'].map((slot) => (
                              <button
                                type="button"
                                key={slot}
                                onClick={() => {
                                  setSelectedTimeSlot(slot);
                                  setFormData({ ...formData, preferredDate: `${selectedCalendarDate} at ${slot} (${selectedTimezone})` });
                                }}
                                className={`p-2 text-xs border text-center transition-colors ${
                                  selectedTimeSlot === slot
                                    ? 'border-black bg-black text-white font-semibold'
                                    : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Direct Contact Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                        <div>
                          <span className="text-[11px] text-[#737373] block mb-1">Your Full Name:</span>
                          <input
                            type="text"
                            required
                            value={formData.contactName}
                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                            placeholder="Sarah Jenkins"
                            className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[11px] text-[#737373] block mb-1">Work Email:</span>
                          <input
                            type="email"
                            required
                            value={formData.contactEmail}
                            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                            placeholder="sarah@company.com"
                            className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] text-[#737373] block mb-1">Product Description / Notes (Optional):</span>
                        <input
                          type="text"
                          value={formData.building}
                          onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                          placeholder="e.g. Next-gen diagnostic handheld device ready for DFM tooling audit"
                          className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none text-xs"
                        />
                      </div>

                      <div className="pt-4 border-t border-[#E5E5E5] flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
                        >
                          <span>book {selectedTimeSlot} slot</span>
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </form>
                  )
                ) : (
                  /* Form Submission Success State */
                  <div className="p-6 bg-white border border-black space-y-4 text-left">
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-medium text-black lowercase">
                      Strategy Session Reserved
                    </h3>
                    <p className="text-xs text-[#525252] leading-relaxed">
                      Thank you, {formData.contactName || 'Partner'}. A calendar invitation for <strong className="text-black">{formData.preferredDate}</strong> and a preliminary preparation briefing have been dispatched to <strong className="text-black">{formData.contactEmail || 'your email'}</strong>.
                    </p>
                    <div className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] text-xs text-[#525252] space-y-1">
                      <div>• Selected Track: {formData.supportNeed}</div>
                      <div>• Stage: {formData.stage}</div>
                      {attachedFile && <div>• Attached Asset: {attachedFile.name} ({attachedFile.size})</div>}
                      <div>• Mutual NDA automatically attached to confirmation.</div>
                    </div>
                    <button
                      onClick={() => {
                        setIsFormSubmitted(false);
                        setQualificationStep(1);
                        setAttachedFile(null);
                      }}
                      className="text-xs text-[#737373] underline hover:text-black pt-2 block"
                    >
                      submit another inquiry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 9: ACCORDION FAQ */}
          <section className="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-b border-[#E5E5E5]">
            <div className="space-y-8 max-w-4xl">
              <div className="space-y-2">
                <div className="text-xs text-[#737373]">
                  // answers & engagement clarity
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-black lowercase">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="border border-[#E5E5E5] divide-y divide-[#E5E5E5]">
                {BANG_SPEC.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FAFAFA] transition-colors"
                    >
                      <span className="font-medium text-xs text-black">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#737373] transition-transform duration-150 ${
                          openFaqIndex === idx ? 'rotate-180 text-black' : ''
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 pt-0 text-xs text-[#525252] leading-relaxed bg-[#FAFAFA]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* CONDITIONAL SUB-PAGE: PRODUCT DESIGN TO MANUFACTURING */}
      {currentRoute === '/product-design-to-manufacturing' && (
        <main className="flex-1 px-6 lg:px-12 py-16 max-w-7xl mx-auto space-y-12">
          <div className="space-y-4 max-w-3xl">
            <div className="text-xs text-[#737373]">
              // primary offer 01 • hardware lifecycle
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-black lowercase">
              Product Design to Manufacturing
            </h1>
            <p className="text-base text-[#525252] leading-relaxed">
              The shortest path from product idea to manufacturable, launch-ready product, with no compromise. We engineer, design, prototype, and oversee factory mass production.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={() => navigateTo('/start-for-free')}
                className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
              >
                <span>discuss a product</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenAIConcierge('What DFM specifications does Bang provide for medical injection molding?')}
                className="px-4 py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] text-xs text-[#525252]"
              >
                ask ai about dfm specs
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[#E5E5E5]">
            <div className="p-5 border border-[#E5E5E5] bg-[#FAFAFA] space-y-2">
              <div className="text-xs text-[#737373]">01. INDUSTRIAL DESIGN</div>
              <div className="font-semibold text-xs text-black">Form, CMF & Ergonomics</div>
              <p className="text-xs text-[#525252]">Human factors user testing, Class-A surfacing, and industrial styling tailored to regulatory requirements.</p>
            </div>
            <div className="p-5 border border-[#E5E5E5] bg-[#FAFAFA] space-y-2">
              <div className="text-xs text-[#737373]">02. ENGINEERING</div>
              <div className="font-semibold text-xs text-black">Mechanical CAD & FEA</div>
              <p className="text-xs text-[#525252]">Structural stress analysis, thermal CFD management, electromechanical packaging, and tolerance stack-up audits.</p>
            </div>
            <div className="p-5 border border-[#E5E5E5] bg-[#FAFAFA] space-y-2">
              <div className="text-xs text-[#737373]">03. DFM & TOOLING</div>
              <div className="font-semibold text-xs text-black">Hardened Tooling Specs</div>
              <p className="text-xs text-[#525252]">Draft angle optimization, mold flow analysis, tool steel selection, and BOM unit cost reduction.</p>
            </div>
            <div className="p-5 border border-[#E5E5E5] bg-[#FAFAFA] space-y-2">
              <div className="text-xs text-[#737373]">04. FACTORY SCALE</div>
              <div className="font-semibold text-xs text-black">Quality Control & FAI</div>
              <p className="text-xs text-[#525252]">Contract manufacturer audits, first article inspection (FAI), and pilot run supervision.</p>
            </div>
          </div>
        </main>
      )}

      {/* CONDITIONAL SUB-PAGE: DIGITAL GROWTH */}
      {currentRoute === '/digital-growth' && (
        <main className="flex-1 px-6 lg:px-12 py-16 max-w-7xl mx-auto space-y-12">
          <div className="space-y-4 max-w-3xl">
            <div className="text-xs text-[#737373]">
              // primary offer 02 • digital experience & systems
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-black lowercase">
              Digital Growth
            </h1>
            <p className="text-base text-[#525252] leading-relaxed">
              Human creative UX and AI-enabled growth systems that make products easier to understand, choose, and grow.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={() => navigateTo('/start-for-free')}
                className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
              >
                <span>discuss growth</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E5E5E5]">
            <div className="p-6 border border-[#E5E5E5] bg-white space-y-3">
              <div className="font-medium text-sm text-black">01. 3D Product Storytelling</div>
              <p className="text-xs text-[#525252] leading-relaxed">
                Photorealistic exploded views, interactive WebGL configurators, and animation demonstrating internal engineering without expensive studio shoots.
              </p>
            </div>
            <div className="p-6 border border-[#E5E5E5] bg-white space-y-3">
              <div className="font-medium text-sm text-black">02. Conversion Web Platforms</div>
              <p className="text-xs text-[#525252] leading-relaxed">
                High-performance web architecture built in Elementor Pro or headless Next.js, optimized for technical buyer conversion and self-qualification.
              </p>
            </div>
            <div className="p-6 border border-[#E5E5E5] bg-white space-y-3">
              <div className="font-medium text-sm text-black">03. AI-Driven Growth Systems</div>
              <p className="text-xs text-[#525252] leading-relaxed">
                Automated qualification concierges, intelligent outbound campaigns, and multi-channel content generation workflows.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* CONDITIONAL SUB-PAGE: INDUSTRY SECTOR VIEW */}
      {(currentRoute.startsWith('/industry/') || currentRoute === '/industries') && (() => {
        const selectedIndustry = BANG_SPEC.industries.find(
          ind => ind.canonicalRoute === currentRoute || ind.existingRoute === currentRoute
        ) || BANG_SPEC.industries[0];

        const matchedCaseStudy = BANG_SPEC.caseStudies.find(
          cs => cs.id === selectedIndustry.caseStudyRef
        ) || BANG_SPEC.caseStudies[0];

        return (
          <main className="flex-1 px-6 lg:px-12 py-16 max-w-7xl mx-auto space-y-12">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center space-x-2 text-xs text-[#737373]">
                <button onClick={() => navigateTo('/')} className="hover:text-black">home</button>
                <span>/</span>
                <button onClick={() => navigateTo('/industries')} className="hover:text-black">industries</button>
                <span>/</span>
                <span className="text-black font-medium">{selectedIndustry.name.toLowerCase()}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-black lowercase">
                {selectedIndustry.name}
              </h1>
              <p className="text-base text-[#525252] leading-relaxed">
                {selectedIndustry.heroHeadline}
              </p>
              <div className="pt-2 flex items-center space-x-3">
                <button
                  onClick={() => navigateTo('/start-for-free')}
                  className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
                >
                  <span>discuss a {selectedIndustry.name.toLowerCase()} project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenAIConcierge(`What engineering standards does Bang follow for ${selectedIndustry.name}?`)}
                  className="px-4 py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] text-xs text-[#525252] hover:text-black"
                >
                  ask ai concierge about this sector
                </button>
              </div>
            </div>

            {/* Typical Needs & Pain Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E5E5E5]">
              <div className="p-6 border border-[#E5E5E5] bg-[#FAFAFA] space-y-3">
                <div className="text-xs font-semibold text-black">
                  typical engineering & design requirements
                </div>
                <div className="space-y-2 text-xs text-[#525252]">
                  {selectedIndustry.typicalNeeds.map((need, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-black font-bold">•</span>
                      <span>{need}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border border-[#E5E5E5] bg-[#FAFAFA] space-y-3">
                <div className="text-xs font-semibold text-black">
                  critical pain points solved by bang
                </div>
                <div className="space-y-2 text-xs text-[#525252]">
                  {selectedIndustry.painPoints.map((pp, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-black font-bold">•</span>
                      <span>{pp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Validated Sector Proof */}
            <div className="p-6 border border-black bg-white space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
                <div>
                  <div className="text-[10px] text-[#737373]">sector proof & validated outcome</div>
                  <div className="font-medium text-base text-black mt-0.5">{matchedCaseStudy.title}</div>
                </div>
                <button
                  onClick={() => setActiveCaseStudyModal(matchedCaseStudy)}
                  className="px-3 py-1.5 border border-black text-xs hover:bg-black hover:text-white transition-colors"
                >
                  view full case study
                </button>
              </div>
              <p className="text-xs text-[#525252] leading-relaxed">
                {matchedCaseStudy.validatedOutcome}
              </p>
            </div>

            {/* Quick Sector Navigator */}
            <div className="space-y-3 pt-6 border-t border-[#E5E5E5]">
              <div className="text-xs text-[#737373]">all 15 engineering sectors</div>
              <div className="flex flex-wrap gap-2">
                {BANG_SPEC.industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => navigateTo(ind.canonicalRoute)}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      ind.canonicalRoute === currentRoute
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-[#525252] border-[#E5E5E5] hover:border-black hover:text-black'
                    }`}
                  >
                    {ind.name.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </main>
        );
      })()}

      {/* CONDITIONAL SUB-PAGE: DEDICATED BOOK A STRATEGY CALL PORTAL */}
      {(currentRoute === '/start-for-free' || currentRoute === '/book' || currentRoute === '/strategy-call' || currentRoute === '/book-a-strategy-call' || currentRoute === '/brief') && (
        <main className="flex-1 px-6 lg:px-12 py-16 max-w-7xl mx-auto space-y-16">
          {/* Breadcrumb & Hero */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs text-[#737373]">
              <button onClick={() => navigateTo('/')} className="hover:text-black">home</button>
              <span>/</span>
              <span className="text-black font-medium">book a strategy call</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-black lowercase">
              Book a 30-Minute Strategy Call
            </h1>
            <p className="text-base text-[#525252] leading-relaxed">
              Direct technical session with Bang Design's engineering partners. We evaluate your product architecture, analyze mechanical & DFM feasibility, calculate realistic timelines, and outline stage-gate budgets.
            </p>
          </div>

          {/* Partner Guarantees & Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-black">
                <Lock className="w-3.5 h-3.5 text-black" />
                <span>100% mutual nda</span>
              </div>
              <p className="text-[11px] text-[#525252] leading-relaxed">
                Your intellectual property, patents, and CAD models are strictly protected before any technical discussion begins.
              </p>
            </div>

            <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-black">
                <User className="w-3.5 h-3.5 text-black" />
                <span>direct partner access</span>
              </div>
              <p className="text-[11px] text-[#525252] leading-relaxed">
                Speak directly with senior hardware engineering & industrial design leads — no junior sales qualification gatekeepers.
              </p>
            </div>

            <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-black">
                <FileText className="w-3.5 h-3.5 text-black" />
                <span>24h written action plan</span>
              </div>
              <p className="text-[11px] text-[#525252] leading-relaxed">
                Receive an actionable technical feasibility summary, phase timeline, and fixed-milestone scope within 24 hours.
              </p>
            </div>
          </div>

          {/* Core Interactive Booking Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: What to Expect & Session Timeline */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-white border border-black space-y-4">
                <div className="text-xs text-[#737373]">// session agenda</div>
                <h3 className="text-lg font-medium text-black lowercase">
                  What happens in this 30-minute call?
                </h3>
                <div className="space-y-3 text-xs text-[#525252]">
                  <div className="flex items-start space-x-2.5 pb-2 border-b border-[#E5E5E5]">
                    <span className="font-mono text-black font-semibold text-xs">00-07m</span>
                    <div>
                      <div className="font-semibold text-black">Architecture & Goal Audit</div>
                      <p className="text-[11px] text-[#737373]">Review commercial requirements, target BOM unit cost, and volume goals.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 pb-2 border-b border-[#E5E5E5]">
                    <span className="font-mono text-black font-semibold text-xs">07-18m</span>
                    <div>
                      <div className="font-semibold text-black">Mechanical & DFM Feasibility</div>
                      <p className="text-[11px] text-[#737373]">Examine tooling draft angles, thermal dissipation, materials (CMF), and regulatory path.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5 pb-2 border-b border-[#E5E5E5]">
                    <span className="font-mono text-black font-semibold text-xs">18-25m</span>
                    <div>
                      <div className="font-semibold text-black">Roadmap & Timeline Sizing</div>
                      <p className="text-[11px] text-[#737373]">Determine whether a fixed-scope sprint (2-4 wks) or turnkey lifecycle (3-9 mo) fits best.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-black font-semibold text-xs">25-30m</span>
                    <div>
                      <div className="font-semibold text-black">Commercial Next Steps</div>
                      <p className="text-[11px] text-[#737373]">Formal proposal formulation delivered to your inbox within 24 hours.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Testimonials */}
              <div className="p-6 bg-[#FAFAFA] border border-[#E5E5E5] space-y-3">
                <div className="text-[10px] text-[#737373] uppercase tracking-wider">verified engineering feedback</div>
                <p className="text-xs text-black italic leading-relaxed">
                  "Bang eliminated 4 months of tooling delays on our diagnostic analyzer. In our very first 30-minute call, their partner spotted a mold draft angle flaw that our previous vendor missed."
                </p>
                <div className="text-[11px] text-[#737373]">
                  — VP Engineering, MedTech Device Manufacturer
                </div>
              </div>

              {/* Quick AI Concierge Alternative */}
              <div className="p-4 bg-white border border-[#E5E5E5] space-y-2">
                <div className="text-xs font-semibold text-black flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>want immediate preliminary guidance?</span>
                </div>
                <p className="text-[11px] text-[#525252]">
                  Interact with our AI Concierge trained on Bang Design's complete engineering knowledge base.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenAIConcierge('What DFM parameters do I need to prepare before my strategy call?')}
                  className="px-3 py-1.5 bg-[#FAFAFA] border border-[#E5E5E5] text-xs text-black hover:border-black transition-colors"
                >
                  open ai concierge
                </button>
              </div>
            </div>

            {/* Right: Booking Form Container */}
            <div className="lg:col-span-7 bg-[#FAFAFA] border border-black p-6 sm:p-8">
              {/* Mode Selector Tabs */}
              <div className="flex items-center space-x-2 mb-6 border-b border-[#E5E5E5] pb-3 text-xs">
                <button
                  type="button"
                  onClick={() => setBookingMode('qualification')}
                  className={`px-3 py-1.5 font-medium transition-colors ${
                    bookingMode === 'qualification'
                      ? 'bg-black text-white'
                      : 'bg-white text-[#525252] border border-[#E5E5E5] hover:text-black'
                  }`}
                >
                  1. guided technical qualification
                </button>
                <button
                  type="button"
                  onClick={() => setBookingMode('direct_calendar')}
                  className={`px-3 py-1.5 font-medium transition-colors ${
                    bookingMode === 'direct_calendar'
                      ? 'bg-black text-white'
                      : 'bg-white text-[#525252] border border-[#E5E5E5] hover:text-black'
                  }`}
                >
                  2. direct live calendar slot
                </button>
              </div>

              {!isFormSubmitted ? (
                bookingMode === 'qualification' ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    {/* Progress Bar */}
                    <div className="flex items-center justify-between text-xs pb-3 border-b border-[#E5E5E5]">
                      <span className="font-medium text-black">
                        step 0{qualificationStep} of 04
                      </span>
                      <span className="text-[#737373]">
                        {qualificationStep === 1 && 'product category'}
                        {qualificationStep === 2 && 'development stage'}
                        {qualificationStep === 3 && 'support requirement & brief'}
                        {qualificationStep === 4 && 'contact & schedule'}
                      </span>
                    </div>

                    {/* Step 1: What are you building? */}
                    {qualificationStep === 1 && (
                      <div className="space-y-4">
                        <label className="block text-xs font-semibold text-black">
                          1. What type of product are you developing or redesigning?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {[
                            'Medical / Diagnostic Hardware',
                            'Industrial Robotics / Automation',
                            'Consumer Hardware / Appliance',
                            'Energy / Power Infrastructure',
                            'Connected IoT / Smart Device',
                            'Digital Growth / Conversion System'
                          ].map((item) => (
                            <button
                              type="button"
                              key={item}
                              onClick={() => setFormData({ ...formData, building: item })}
                              className={`p-3 text-left border text-xs transition-colors ${
                                formData.building === item
                                  ? 'border-black bg-black text-white font-medium'
                                  : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                              }`}
                            >
                              {item.toLowerCase()}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={formData.building}
                          onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                          placeholder="or describe your product in one sentence..."
                          className="w-full p-2.5 bg-white border border-[#E5E5E5] focus:border-black text-xs focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Step 2: What stage are you at? */}
                    {qualificationStep === 2 && (
                      <div className="space-y-4">
                        <label className="block text-xs font-semibold text-black">
                          2. What is the current stage of this project?
                        </label>
                        <div className="space-y-2 text-xs">
                          {[
                            { title: 'Concept / Napkin Idea', desc: 'No CAD or prototype yet; need product definition and feasibility.' },
                            { title: 'Early Prototype / Breadboard', desc: 'Functional electronics or proof-of-concept ready; need styling, UX, and mechanical engineering.' },
                            { title: 'Ready for DFM & Tooling', desc: 'CAD exists; need tooling specification, cost reduction, and manufacturing oversight.' },
                            { title: 'Existing Marketed Product', desc: 'Need redesign, BOM cost reduction, or digital growth and 3D visualizers.' }
                          ].map((stg) => (
                            <button
                              type="button"
                              key={stg.title}
                              onClick={() => setFormData({ ...formData, stage: stg.title })}
                              className={`w-full p-3 text-left border text-xs transition-colors ${
                                formData.stage === stg.title
                                  ? 'border-black bg-black text-white'
                                  : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                              }`}
                            >
                              <div className="font-semibold">{stg.title.toLowerCase()}</div>
                              <div className={`text-[11px] ${formData.stage === stg.title ? 'text-neutral-300' : 'text-[#737373]'}`}>
                                {stg.desc.toLowerCase()}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 3: What primary support do you need? */}
                    {qualificationStep === 3 && (
                      <div className="space-y-4">
                        <label className="block text-xs font-semibold text-black">
                          3. What primary capability do you need from Bang?
                        </label>
                        <div className="space-y-2 text-xs">
                          {[
                            'Turnkey Concept-to-Production Hardware Program',
                            'Mechanical Engineering, FEA & DFM Tooling Audit',
                            'Industrial Design & Ergonomic Human Factors',
                            'Digital Growth, Conversion Website & 3D Visualizer',
                            'Dedicated Engineering Retainer & Scaling Support'
                          ].map((need) => (
                            <button
                              type="button"
                              key={need}
                              onClick={() => setFormData({ ...formData, supportNeed: need })}
                              className={`w-full p-3 text-left border text-xs transition-colors ${
                                formData.supportNeed === need
                                  ? 'border-black bg-black text-white font-medium'
                                  : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                              }`}
                            >
                              {need.toLowerCase()}
                            </button>
                          ))}
                        </div>

                        {/* File Attachment Dropzone */}
                        <div className="pt-2">
                          <span className="text-[11px] text-[#737373] block mb-1.5">
                            Optional CAD or Brief Attachment (Protected by NDA):
                          </span>
                          {attachedFile ? (
                            <div className="p-3 bg-white border border-black flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-black" />
                                <span className="font-medium text-black">{attachedFile.name}</span>
                                <span className="text-[#737373]">({attachedFile.size})</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setAttachedFile(null)}
                                className="text-xs text-neutral-400 hover:text-black"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="p-4 bg-white border border-dashed border-[#CCCCCC] hover:border-black cursor-pointer flex flex-col items-center justify-center space-y-1 transition-colors">
                              <Upload className="w-4 h-4 text-[#737373]" />
                              <span className="text-xs text-[#525252]">Click or drag STEP, IGES, STL, or PDF brief</span>
                              <span className="text-[10px] text-[#A3A3A3]">Max 50MB • AES-256 Encrypted Private Storage</span>
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const f = e.target.files[0];
                                    setAttachedFile({
                                      name: f.name,
                                      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`
                                    });
                                  }
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Contact & Meeting Slot */}
                    {qualificationStep === 4 && (
                      <div className="space-y-4 text-xs">
                        <label className="block text-xs font-semibold text-black">
                          4. Where should we send calendar invitation and NDA?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <span className="text-[11px] text-[#737373] block mb-1">Your Full Name:</span>
                            <input
                              type="text"
                              required
                              value={formData.contactName}
                              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                              placeholder="Sarah Jenkins"
                              className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                            />
                          </div>
                          <div>
                            <span className="text-[11px] text-[#737373] block mb-1">Work Email:</span>
                            <input
                              type="email"
                              required
                              value={formData.contactEmail}
                              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                              placeholder="sarah@company.com"
                              className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <span className="text-[11px] text-[#737373] block mb-1">Company / Organization:</span>
                          <input
                            type="text"
                            value={formData.contactCompany}
                            onChange={(e) => setFormData({ ...formData, contactCompany: e.target.value })}
                            placeholder="Aether Robotics"
                            className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                          />
                        </div>

                        <div className="p-3 bg-white border border-[#E5E5E5] space-y-2">
                          <span className="text-[11px] text-[#737373] block">Preferred 30-min Strategy Call Slot:</span>
                          <div className="flex flex-wrap gap-2">
                            {['Tomorrow, 10:00 AM EST', 'Thursday, 2:00 PM EST', 'Friday, 11:30 AM EST'].map((slot) => (
                              <button
                                type="button"
                                key={slot}
                                onClick={() => setFormData({ ...formData, preferredDate: slot })}
                                className={`px-2.5 py-1 text-xs border ${
                                  formData.preferredDate === slot
                                    ? 'bg-black text-white border-black'
                                    : 'bg-[#FAFAFA] text-[#525252] border-[#E5E5E5]'
                                }`}
                              >
                                {slot.toLowerCase()}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
                      {qualificationStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => setQualificationStep(prev => prev - 1)}
                          className="px-4 py-2 border border-[#E5E5E5] bg-white text-xs text-[#525252] hover:text-black"
                        >
                          ← back
                        </button>
                      ) : <div />}

                      {qualificationStep < 4 ? (
                        <button
                          type="button"
                          onClick={() => setQualificationStep(prev => prev + 1)}
                          className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
                        >
                          <span>continue to step 0{qualificationStep + 1}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
                        >
                          <span>confirm strategy call</span>
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  /* DIRECT LIVE CALENDAR BOOKING MODE */
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-black">
                          Select Available Date & Time Slot:
                        </label>
                        <select
                          value={selectedTimezone}
                          onChange={(e) => setSelectedTimezone(e.target.value)}
                          className="text-[11px] p-1 bg-white border border-[#E5E5E5] focus:outline-none"
                        >
                          <option value="EST (Eastern Time)">EST (Eastern Time)</option>
                          <option value="CST (Central Time)">CST (Central Time)</option>
                          <option value="PST (Pacific Time)">PST (Pacific Time)</option>
                          <option value="GMT (London)">GMT (London)</option>
                          <option value="CET (Europe)">CET (Europe)</option>
                        </select>
                      </div>

                      {/* Calendar Date Selector */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {[
                          { day: 'Wed', date: 'Aug 20', full: '2026-08-20' },
                          { day: 'Thu', date: 'Aug 21', full: '2026-08-21' },
                          { day: 'Fri', date: 'Aug 22', full: '2026-08-22' },
                          { day: 'Mon', date: 'Aug 25', full: '2026-08-25' }
                        ].map((d) => (
                          <button
                            type="button"
                            key={d.full}
                            onClick={() => setSelectedCalendarDate(d.full)}
                            className={`p-2.5 text-center border transition-colors ${
                              selectedCalendarDate === d.full
                                ? 'border-black bg-black text-white'
                                : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                            }`}
                          >
                            <div className="text-[10px] uppercase tracking-wider opacity-80">{d.day}</div>
                            <div className="font-semibold text-xs mt-0.5">{d.date}</div>
                          </button>
                        ))}
                      </div>

                      {/* Available Slots */}
                      <div className="pt-2">
                        <span className="text-[11px] text-[#737373] block mb-1.5">
                          Available 30-min slots for {selectedCalendarDate}:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {['09:30 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:15 PM'].map((slot) => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => {
                                setSelectedTimeSlot(slot);
                                setFormData({ ...formData, preferredDate: `${selectedCalendarDate} at ${slot} (${selectedTimezone})` });
                              }}
                              className={`p-2 text-xs border text-center transition-colors ${
                                selectedTimeSlot === slot
                                  ? 'border-black bg-black text-white font-semibold'
                                  : 'border-[#E5E5E5] bg-white text-[#333333] hover:border-black'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Direct Contact Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div>
                        <span className="text-[11px] text-[#737373] block mb-1">Your Full Name:</span>
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          placeholder="Sarah Jenkins"
                          className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-[#737373] block mb-1">Work Email:</span>
                        <input
                          type="email"
                          required
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                          placeholder="sarah@company.com"
                          className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#737373] block mb-1">Product Description / Notes (Optional):</span>
                      <input
                        type="text"
                        value={formData.building}
                        onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                        placeholder="e.g. Next-gen diagnostic handheld device ready for DFM tooling audit"
                        className="w-full p-2 bg-white border border-[#E5E5E5] focus:border-black focus:outline-none text-xs"
                      />
                    </div>

                    <div className="pt-4 border-t border-[#E5E5E5] flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-medium flex items-center space-x-1.5"
                      >
                        <span>book {selectedTimeSlot} slot</span>
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )
              ) : (
                /* Form Submission Success State */
                <div className="p-6 bg-white border border-black space-y-4 text-left">
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-medium text-black lowercase">
                    Strategy Session Reserved
                  </h3>
                  <p className="text-xs text-[#525252] leading-relaxed">
                    Thank you, {formData.contactName || 'Partner'}. A calendar invitation for <strong className="text-black">{formData.preferredDate}</strong> and a preliminary preparation briefing have been dispatched to <strong className="text-black">{formData.contactEmail || 'your email'}</strong>.
                  </p>
                  <div className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] text-xs text-[#525252] space-y-1">
                    <div>• Selected Track: {formData.supportNeed}</div>
                    <div>• Stage: {formData.stage}</div>
                    {attachedFile && <div>• Attached Asset: {attachedFile.name} ({attachedFile.size})</div>}
                    <div>• Mutual NDA automatically attached to confirmation.</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsFormSubmitted(false);
                      setQualificationStep(1);
                      setAttachedFile(null);
                    }}
                    className="text-xs text-[#737373] underline hover:text-black pt-2 block"
                  >
                    submit another inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* CONDITIONAL SUB-PAGE: PLANS & PRICING / ENGAGEMENT MODELS */}
      {(currentRoute === '/plans' || currentRoute === '/pricing') && (
        <main className="flex-1 px-6 lg:px-12 py-16 max-w-7xl mx-auto space-y-16">
          {/* Breadcrumb & Hero */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs text-[#737373]">
              <button onClick={() => navigateTo('/')} className="hover:text-black">home</button>
              <span>/</span>
              <span className="text-black font-medium">plans & pricing</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-black lowercase">
              Plans & Engagement Models
            </h1>
            <p className="text-base text-[#525252] leading-relaxed">
              Transparent milestone pricing, sprint packages, and turnkey hardware programs. Every engagement guarantees 100% client intellectual property ownership with rigorous ISO 13485 quality standards.
            </p>
          </div>

          {/* Core Commitments Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[#E5E5E5] py-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-black shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-xs text-black">100% Client IP Ownership</div>
                <p className="text-[11px] text-[#525252]">All CAD, SolidWorks files, tooling blueprints, and firmware code belong completely to your organization.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-black shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-xs text-black">Stage-Gated Milestone Approvals</div>
                <p className="text-[11px] text-[#525252]">Fixed scope per phase. Payments unlocked only after physical prototype validation and client sign-off.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Award className="w-5 h-5 text-black shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-xs text-black">Factory-Audited DFM Quality</div>
                <p className="text-[11px] text-[#525252]">On-site contract manufacturing inspection and tooling sign-off ensuring zero post-production surprises.</p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE SCOPE & TIMELINE ESTIMATOR */}
          <div className="p-6 sm:p-8 bg-[#FAFAFA] border border-black space-y-6">
            <div className="space-y-1">
              <div className="text-xs text-[#737373]">// interactive scope calculator</div>
              <h2 className="text-2xl font-medium text-black lowercase">
                Scope & Engagement Model Estimator
              </h2>
              <p className="text-xs text-[#525252]">
                Configure your product parameters below to see the recommended engagement model, timeline breakdown, and milestone architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E5E5E5]">
              {/* Parameter 1: Project Type */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-black">
                  1. Project Classification
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'turnkey', label: 'Turnkey Hardware (Concept to Production)' },
                    { id: 'dfm_audit', label: 'DFM & Tooling Audit Sprint' },
                    { id: 'industrial_design', label: 'Industrial Design & CMF Sprint' },
                    { id: 'growth_platform', label: 'Digital Growth & 3D Web Visualizer' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEstimatorState({ ...estimatorState, projectType: item.id })}
                      className={`w-full p-2.5 text-left text-xs border transition-colors ${
                        estimatorState.projectType === item.id
                          ? 'bg-black text-white border-black font-medium'
                          : 'bg-white text-[#333333] border-[#E5E5E5] hover:border-black'
                      }`}
                    >
                      {item.label.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 2: Compliance & Rigor */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-black">
                  2. Regulatory & Rigor Standard
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'consumer', label: 'Consumer Grade (FCC / CE / UL)' },
                    { id: 'industrial', label: 'Industrial Rugged (IP67 / IP68 / NEMA)' },
                    { id: 'medical', label: 'Medical Hardware (ISO 13485 / FDA 510(k))' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEstimatorState({ ...estimatorState, complianceLevel: item.id })}
                      className={`w-full p-2.5 text-left text-xs border transition-colors ${
                        estimatorState.complianceLevel === item.id
                          ? 'bg-black text-white border-black font-medium'
                          : 'bg-white text-[#333333] border-[#E5E5E5] hover:border-black'
                      }`}
                    >
                      {item.label.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter 3: Urgency / Velocity */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-black">
                  3. Development Velocity
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'standard', label: 'Standard Phased Pace (Optimal BOM)' },
                    { id: 'accelerated', label: 'Accelerated Skunkworks Sprint' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEstimatorState({ ...estimatorState, urgency: item.id })}
                      className={`w-full p-2.5 text-left text-xs border transition-colors ${
                        estimatorState.urgency === item.id
                          ? 'bg-black text-white border-black font-medium'
                          : 'bg-white text-[#333333] border-[#E5E5E5] hover:border-black'
                      }`}
                    >
                      {item.label.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimator Dynamic Result Box */}
            <div className="p-5 bg-white border border-black space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E5] pb-3">
                <div>
                  <span className="text-[10px] text-[#737373] uppercase tracking-wider block">Recommended Engagement Model</span>
                  <div className="font-semibold text-base text-black mt-0.5">
                    {estimatorState.projectType === 'turnkey' && 'Turnkey Hardware Program (Stage-Gated Fixed Milestones)'}
                    {estimatorState.projectType === 'dfm_audit' && 'Rapid DFM & Tooling Audit Sprint (Fixed Scope)'}
                    {estimatorState.projectType === 'industrial_design' && 'Industrial Styling & Ergonomics Sprint (Fixed Scope)'}
                    {estimatorState.projectType === 'growth_platform' && 'Digital Growth & 3D Interactive Platform (Fixed Scope)'}
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-xs">
                  <div>
                    <span className="text-[#737373] block text-[10px]">Estimated Timeline</span>
                    <span className="font-bold text-black">
                      {estimatorState.projectType === 'turnkey'
                        ? (estimatorState.urgency === 'accelerated' ? '12 - 16 Weeks' : '20 - 28 Weeks')
                        : (estimatorState.urgency === 'accelerated' ? '1 - 2 Weeks' : '3 - 4 Weeks')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#737373] block text-[10px]">Quality Standard</span>
                    <span className="font-bold text-black uppercase">
                      {estimatorState.complianceLevel === 'medical' ? 'ISO 13485' : (estimatorState.complianceLevel === 'industrial' ? 'IP67/NEMA' : 'FCC/CE')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[#525252]">
                  Includes full CAD source deliverables, factory DFM sign-off, and weekly engineering synchronization.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      supportNeed: estimatorState.projectType === 'turnkey'
                        ? 'Turnkey Concept-to-Production Hardware Program'
                        : 'Mechanical Engineering, FEA & DFM Tooling Audit'
                    });
                    navigateTo('/start-for-free');
                  }}
                  className="px-5 py-2 bg-black text-white text-xs font-medium hover:bg-neutral-800 flex items-center space-x-1.5"
                >
                  <span>book strategy call for this scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* THE 3 DETAILED ENGAGEMENT TIERS */}
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="text-xs text-[#737373]">// engagement tiers</div>
              <h2 className="text-2xl font-medium text-black lowercase">
                Three Transparent Working Models
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* TIER 1: Fixed-Scope Sprints */}
              <div className="p-6 border border-[#E5E5E5] bg-white flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-[#737373] uppercase tracking-wider">01. SPRINT MODEL</span>
                    <span className="px-2 py-0.5 bg-[#FAFAFA] border border-[#E5E5E5] text-[10px] text-[#525252]">2 - 4 weeks</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-black lowercase">Fixed-Scope Sprints & Audits</h3>
                    <p className="text-xs text-[#525252] mt-1 leading-relaxed">
                      Targeted engineering audits or rapid styling sprints designed to resolve specific technical bottlenecks quickly.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E5E5E5] space-y-2 text-xs text-[#525252]">
                    <div className="font-semibold text-black">ideal for:</div>
                    <div>• CAD DFM tooling reviews before steel cutting</div>
                    <div>• FEA stress & thermal dissipation analysis</div>
                    <div>• Industrial design styling & CMF exploration</div>
                    <div>• Bill of materials (BOM) cost reduction audits</div>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#525252]">
                    <div className="font-semibold text-black">deliverables:</div>
                    <div>• Complete 3D CAD (.STEP / SolidWorks)</div>
                    <div>• Detailed DFM Redline & Tooling Dossier</div>
                    <div>• 24h partner turn-around on revisions</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, supportNeed: 'Mechanical Engineering, FEA & DFM Tooling Audit' });
                    navigateTo('/start-for-free');
                  }}
                  className="w-full py-2.5 border border-black text-xs font-medium text-black hover:bg-black hover:text-white transition-colors"
                >
                  discuss a sprint
                </button>
              </div>

              {/* TIER 2: Turnkey Hardware Program (FEATURED) */}
              <div className="p-6 border-2 border-black bg-[#FAFAFA] flex flex-col justify-between space-y-6 relative">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-black font-bold uppercase tracking-wider">02. TURNKEY PROGRAM</span>
                    <span className="px-2 py-0.5 bg-black text-white text-[10px] font-medium">3 - 9 months</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-black lowercase">Turnkey Concept-to-Production</h3>
                    <p className="text-xs text-[#525252] mt-1 leading-relaxed">
                      Full-lifecycle hardware development from industrial styling through prototype verification, hardened tooling, and factory mass manufacturing.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E5E5E5] space-y-2 text-xs text-[#525252]">
                    <div className="font-semibold text-black">ideal for:</div>
                    <div>• Startups building their first flagship device</div>
                    <div>• Corporations expanding their physical hardware lines</div>
                    <div>• Regulated MedTech & industrial IoT devices</div>
                    <div>• Products targeting &gt;$1M+ in mass manufacturing</div>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#525252]">
                    <div className="font-semibold text-black">deliverables:</div>
                    <div>• Stage-gate validated physical prototypes</div>
                    <div>• Production-ready injection & sheet metal tooling CAD</div>
                    <div>• Contract Manufacturer selection & on-site FAI audits</div>
                    <div>• Full regulatory compliance documentation (ISO 13485)</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, supportNeed: 'Turnkey Concept-to-Production Hardware Program' });
                    navigateTo('/start-for-free');
                  }}
                  className="w-full py-2.5 bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
                >
                  book turnkey strategy session
                </button>
              </div>

              {/* TIER 3: Dedicated Retainer */}
              <div className="p-6 border border-[#E5E5E5] bg-white flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-[#737373] uppercase tracking-wider">03. RETAINER MODEL</span>
                    <span className="px-2 py-0.5 bg-[#FAFAFA] border border-[#E5E5E5] text-[10px] text-[#525252]">ongoing / quarterly</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-black lowercase">Dedicated Engineering & Growth</h3>
                    <p className="text-xs text-[#525252] mt-1 leading-relaxed">
                      Embedded senior engineering, continuous factory liaison, and digital growth capacity scaling alongside your product lineup.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#E5E5E5] space-y-2 text-xs text-[#525252]">
                    <div className="font-semibold text-black">ideal for:</div>
                    <div>• Multi-SKU product ecosystems requiring ongoing ECOs</div>
                    <div>• Continuous factory quality control & tooling maintenance</div>
                    <div>• 3D WebGL configurator updates and digital launches</div>
                    <div>• Fractional Chief Product Officer / VP Engineering capacity</div>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#525252]">
                    <div className="font-semibold text-black">deliverables:</div>
                    <div>• Guaranteed dedicated engineering hours per sprint</div>
                    <div>• Priority 4-hour SLA response times</div>
                    <div>• Direct Slack & weekly partner strategy reviews</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, supportNeed: 'Dedicated Engineering Retainer & Scaling Support' });
                    navigateTo('/start-for-free');
                  }}
                  className="w-full py-2.5 border border-black text-xs font-medium text-black hover:bg-black hover:text-white transition-colors"
                >
                  inquire about retainer
                </button>
              </div>
            </div>
          </div>

          {/* DELIVERABLES & SLA COMPARISON TABLE */}
          <div className="space-y-6 pt-6 border-t border-[#E5E5E5]">
            <div className="space-y-1">
              <div className="text-xs text-[#737373]">// feature matrix</div>
              <h2 className="text-2xl font-medium text-black lowercase">
                Model Comparison & Deliverable Matrix
              </h2>
            </div>

            <div className="border border-[#E5E5E5] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                    <th className="p-3.5 font-semibold text-black">Capability & Deliverable</th>
                    <th className="p-3.5 font-semibold text-black">Fixed Sprints</th>
                    <th className="p-3.5 font-semibold text-black bg-[#F0F0F0]">Turnkey Program</th>
                    <th className="p-3.5 font-semibold text-black">Dedicated Retainer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  <tr>
                    <td className="p-3.5 font-medium text-black">100% Client IP Ownership</td>
                    <td className="p-3.5 text-[#525252] font-semibold">Included (Day 1)</td>
                    <td className="p-3.5 text-black font-semibold bg-[#FAFAFA]">Included (Day 1)</td>
                    <td className="p-3.5 text-[#525252] font-semibold">Included (Day 1)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-black">Native CAD & Source Files (.STEP, SolidWorks)</td>
                    <td className="p-3.5 text-[#525252]">Included</td>
                    <td className="p-3.5 text-black font-semibold bg-[#FAFAFA]">Included</td>
                    <td className="p-3.5 text-[#525252]">Included</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-black">Hardened Tooling Specification & Moldflow</td>
                    <td className="p-3.5 text-[#525252]">Audit Only</td>
                    <td className="p-3.5 text-black font-semibold bg-[#FAFAFA]">Complete Specification</td>
                    <td className="p-3.5 text-[#525252]">Continuous Maintenance</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-black">On-Site Factory Audits & First Article Inspection (FAI)</td>
                    <td className="p-3.5 text-[#A3A3A3]">Optional Add-on</td>
                    <td className="p-3.5 text-black font-semibold bg-[#FAFAFA]">Fully Supervised</td>
                    <td className="p-3.5 text-[#525252]">Continuous Supervision</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-black">ISO 13485 Regulatory Device Master Record (DMR)</td>
                    <td className="p-3.5 text-[#A3A3A3]">Optional</td>
                    <td className="p-3.5 text-black font-semibold bg-[#FAFAFA]">Full Dossier</td>
                    <td className="p-3.5 text-[#525252]">Active Maintenance</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-black">3D Interactive WebGL Visualizer</td>
                    <td className="p-3.5 text-[#A3A3A3]">Available on Request</td>
                    <td className="p-3.5 text-black font-semibold bg-[#FAFAFA]">Included in Growth Gate</td>
                    <td className="p-3.5 text-[#525252]">Included</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-black">SLA Response Time</td>
                    <td className="p-3.5 text-[#525252]">24 Hours</td>
                    <td className="p-3.5 text-black font-semibold bg-[#FAFAFA]">12 Hours</td>
                    <td className="p-3.5 text-[#525252]">4 Hours Priority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ENGAGEMENT FAQS */}
          <div className="space-y-6 pt-6 border-t border-[#E5E5E5]">
            <div className="space-y-1">
              <div className="text-xs text-[#737373]">// common questions</div>
              <h2 className="text-2xl font-medium text-black lowercase">
                Plans & Engagement FAQ
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
                <div className="font-semibold text-xs text-black">How are milestone payments structured?</div>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Every project is divided into tangible engineering stage-gates (e.g., Concept Lock, Prototype Validation, DFM Tooling Sign-off). Milestone payments are only disbursed after you inspect and approve the physical deliverables.
                </p>
              </div>

              <div className="p-5 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
                <div className="font-semibold text-xs text-black">Do you take equity or royalties?</div>
                <p className="text-xs text-[#525252] leading-relaxed">
                  No. We operate purely on transparent, fee-for-service fixed milestone contracts. You retain 100% of your company's equity, patent rights, and product margins.
                </p>
              </div>

              <div className="p-5 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
                <div className="font-semibold text-xs text-black">Can we bring our own contract manufacturer?</div>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Yes. We frequently integrate with our clients' preferred factory partners, or we can introduce pre-vetted ISO 13485 contract manufacturers across North America, Europe, and Asia.
                </p>
              </div>

              <div className="p-5 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
                <div className="font-semibold text-xs text-black">How do we get an exact quote?</div>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Book a direct 30-minute strategy call. After reviewing your CAD or napkin sketch under mutual NDA, we deliver a formal fixed-scope milestone proposal within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="p-8 bg-black text-white flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs text-neutral-400">ready to define your scope?</div>
              <div className="text-xl font-medium">Book a 30-Minute Technical Strategy Call</div>
            </div>
            <button
              onClick={() => navigateTo('/start-for-free')}
              className="px-6 py-3 bg-white text-black hover:bg-neutral-200 text-xs font-semibold"
            >
              book a strategy call
            </button>
          </div>
        </main>
      )}

      {/* CONDITIONAL SUB-PAGE: WORK / CASE STUDIES */}
      {(currentRoute === '/work' || currentRoute.startsWith('/work/')) && (
        <main className="flex-1 px-6 lg:px-12 py-16 max-w-7xl mx-auto space-y-12">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs text-[#737373]">
              <button onClick={() => navigateTo('/')} className="hover:text-black">home</button>
              <span>/</span>
              <span className="text-black font-medium">work</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-black lowercase">
              Case Studies & Proof
            </h1>
            <p className="text-base text-[#525252] leading-relaxed">
              Real engineering outcomes, validated mass production runs, and quantifiable commercial results across 15 industrial sectors.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 border-y border-[#E5E5E5] py-4 text-xs">
            {['All', 'Medical', 'Industrial', 'Robotics', 'Consumer', 'Energy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setWorkFilter(cat)}
                className={`px-3 py-1.5 border transition-colors ${
                  workFilter === cat
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-[#525252] border-[#E5E5E5] hover:border-black hover:text-black'
                }`}
              >
                {cat.toLowerCase()}
              </button>
            ))}
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((cs) => (
              <div
                key={cs.id}
                onClick={() => setActiveCaseStudyModal(cs)}
                className="p-6 border border-[#E5E5E5] bg-white hover:border-black transition-colors cursor-pointer space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-[#737373]">
                    <span>{cs.category.toLowerCase()}</span>
                    <span>{cs.clientContext.toLowerCase()}</span>
                  </div>
                  <h3 className="font-medium text-base text-black lowercase">{cs.title}</h3>
                  <p className="text-xs text-[#525252] leading-relaxed line-clamp-3">
                    {cs.challenge}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E5E5E5]">
                  <div className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] text-[11px] text-[#222222]">
                    {cs.validatedOutcome}
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-black">
                    <span>read engineering study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* CONDITIONAL SUB-PAGE: ABOUT BANG DESIGN */}
      {currentRoute === '/about' && (
        <main className="flex-1 px-6 lg:px-12 py-16 max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs text-[#737373]">
              <button onClick={() => navigateTo('/')} className="hover:text-black">home</button>
              <span>/</span>
              <span className="text-black font-medium">about</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-black lowercase">
              Engineering & Industrial Rigor
            </h1>
            <p className="text-base text-[#525252] leading-relaxed">
              Bang Design bridges the chasm between visionary industrial styling and zero-defect factory mass production. Founded by hardware engineers and industrial design purists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E5E5E5]">
            <div className="p-6 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
              <div className="text-2xl font-bold text-black">200+</div>
              <div className="font-semibold text-xs text-black">Products Manufactured</div>
              <p className="text-xs text-[#525252]">From high-precision diagnostic tools to rugged agricultural telemetry systems shipped globally.</p>
            </div>

            <div className="p-6 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
              <div className="text-2xl font-bold text-black">ISO 13485</div>
              <div className="font-semibold text-xs text-black">Medical Certification</div>
              <p className="text-xs text-[#525252]">Full regulatory Device Master Records (DMR) and human factors documentation adhering to FDA 510(k).</p>
            </div>

            <div className="p-6 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2">
              <div className="text-2xl font-bold text-black">100%</div>
              <div className="font-semibold text-xs text-black">Client IP Retention</div>
              <p className="text-xs text-[#525252]">Zero equity claims or royalties. Complete ownership of CAD models, tooling, and firmware code.</p>
            </div>
          </div>
        </main>
      )}

      {/* CONDITIONAL SUB-PAGE: INSIGHTS & BLOG ARCHIVE */}
      {currentRoute === '/insights' && (
        <main className="flex-1 px-6 lg:px-12 py-16 max-w-7xl mx-auto space-y-12">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center space-x-2 text-xs text-[#737373]">
              <button onClick={() => navigateTo('/')} className="hover:text-black">home</button>
              <span>/</span>
              <span className="text-black font-medium">insights & archive</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-black lowercase">
              500+ Technical Insights Archive
            </h1>
            <p className="text-base text-[#525252] leading-relaxed">
              In-depth engineering teardowns, DFM injection molding guides, regulatory whitepapers, and hardware case studies. All legacy URLs are 301-redirected with zero broken links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-[#E5E5E5]">
            {[
              {
                title: "DFM Injection Molding: 7 Draft Angle Mistakes That Cause Tooling Failure",
                cat: "DFM & Engineering",
                date: "Aug 2026",
                read: "8 min read"
              },
              {
                title: "ISO 13485 vs FDA 510(k): Navigating Medical Hardware Design Verification",
                cat: "Medical & Regulatory",
                date: "Jul 2026",
                read: "12 min read"
              },
              {
                title: "Bill of Materials (BOM) Optimization: Slashing 35% Off Unit Production Costs",
                cat: "Manufacturing & Scale",
                date: "Jun 2026",
                read: "6 min read"
              },
              {
                title: "Thermal Management in Compact Robotics: CFD Modeling vs Physical Heatsinks",
                cat: "Robotics & FEA",
                date: "May 2026",
                read: "10 min read"
              },
              {
                title: "Interactive 3D WebGL Configurator Case Study: 4.2x Conversion Lift",
                cat: "Digital Growth",
                date: "Apr 2026",
                read: "5 min read"
              },
              {
                title: "Selecting the Right Contract Manufacturer: A 25-Point Audit Checklist",
                cat: "Factory Procurement",
                date: "Mar 2026",
                read: "9 min read"
              }
            ].map((art, idx) => (
              <div key={idx} className="p-6 border border-[#E5E5E5] bg-white space-y-3 hover:border-black transition-colors">
                <div className="flex justify-between items-center text-[10px] text-[#737373]">
                  <span>{art.cat.toLowerCase()}</span>
                  <span>{art.read}</span>
                </div>
                <h3 className="font-medium text-sm text-black lowercase leading-snug">{art.title}</h3>
                <div className="text-[11px] text-[#737373]">{art.date}</div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 4. FOOTER */}
      <footer className="bg-black text-white px-6 lg:px-12 py-16 border-t border-black">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Footer Statement */}
          <div className="flex flex-wrap items-start justify-between gap-8 pb-12 border-b border-neutral-800">
            <div className="space-y-3 max-w-xl">
              <div className="font-bold text-xl tracking-tight">Bang Design</div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Bang Design takes ambitious physical and connected products from idea to manufacturable reality, then helps those products win through digital experience and AI-enabled growth systems.
              </p>
            </div>

            <div className="space-y-2 text-right">
              <div className="text-xs text-neutral-400">ready to start?</div>
              <button
                onClick={() => navigateTo('/start-for-free')}
                className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-semibold"
              >
                book a strategy call
              </button>
            </div>
          </div>

          {/* 5-Column IA Footer Map */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs text-neutral-400">
            <div className="space-y-2">
              <div className="font-semibold text-white">what we do</div>
              <div className="space-y-1.5">
                <button onClick={() => navigateTo('/product-design-to-manufacturing')} className="block hover:text-white text-left">product to mfg</button>
                <button onClick={() => navigateTo('/digital-growth')} className="block hover:text-white text-left">digital growth</button>
                <button onClick={() => navigateTo('/product/industrial-design')} className="block hover:text-white text-left">industrial design</button>
                <button onClick={() => navigateTo('/product/dfm-and-tooling')} className="block hover:text-white text-left">dfm & tooling</button>
                <button onClick={() => navigateTo('/product/product-engineering')} className="block hover:text-white text-left">engineering & fea</button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-white">industries (15 sectors)</div>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {BANG_SPEC.industries.map((ind) => (
                  <button key={ind.id} onClick={() => navigateTo(ind.canonicalRoute)} className="block hover:text-white text-left truncate">
                    {ind.name.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-white">work</div>
              <div className="space-y-1.5">
                {BANG_SPEC.caseStudies.map((cs) => (
                  <button key={cs.id} onClick={() => navigateTo(`/work/${cs.id}`)} className="block hover:text-white text-left">
                    {cs.title.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-white">conversion</div>
              <div className="space-y-1.5">
                <button onClick={() => navigateTo('/plans')} className="block hover:text-white text-left">plans & pricing</button>
                <button onClick={() => navigateTo('/start-for-free')} className="block hover:text-white text-left">book strategy call</button>
                <button onClick={() => navigateTo('/brief')} className="block hover:text-white text-left">submit a brief</button>
                <button onClick={() => onOpenAIConcierge()} className="block hover:text-white text-left">ai concierge</button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-white">archive & seo</div>
              <div className="space-y-1.5">
                <button onClick={() => navigateTo('/insights')} className="block hover:text-white text-left">500+ blog archive</button>
                <button onClick={() => navigateTo('/about')} className="block hover:text-white text-left">about bang</button>
                <span className="block text-[11px] text-neutral-600">301 redirects active</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Technical Tag */}
          <div className="pt-8 border-t border-neutral-900 flex flex-wrap items-center justify-between text-[11px] text-neutral-500">
            <div>
              © 2026 Bang Design Pty Ltd. All rights reserved. Registered ISO 13485 partner.
            </div>
            <div>
              Platform: WordPress 6.7 + Elementor Pro Wireframe
            </div>
          </div>
        </div>
      </footer>

      {/* CASE STUDY MODAL */}
      {activeCaseStudyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-none flex items-center justify-center p-4">
          <div className="bg-white border border-black max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-start border-b border-[#E5E5E5] pb-4">
              <div>
                <div className="text-xs text-[#737373]">{activeCaseStudyModal.category} • {activeCaseStudyModal.clientContext}</div>
                <h3 className="text-2xl font-medium text-black lowercase mt-1">{activeCaseStudyModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveCaseStudyModal(null)}
                className="p-1 hover:bg-black hover:text-white border border-[#E5E5E5]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="font-semibold text-black mb-1">the challenge:</div>
                <p className="text-[#525252] leading-relaxed">{activeCaseStudyModal.challenge}</p>
              </div>

              <div>
                <div className="font-semibold text-black mb-1">bang's role:</div>
                <p className="text-[#525252] leading-relaxed">{activeCaseStudyModal.bangRole}</p>
              </div>

              <div>
                <div className="font-semibold text-black mb-1">engineering & design process:</div>
                <div className="space-y-1.5">
                  {activeCaseStudyModal.process.map((p, i) => (
                    <div key={i} className="flex items-start space-x-2 text-[#525252]">
                      <span className="font-medium text-black">•</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5]">
                <div className="font-semibold text-black mb-1">validated outcome:</div>
                <p className="text-[#222222] leading-relaxed">{activeCaseStudyModal.validatedOutcome}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {activeCaseStudyModal.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 bg-[#F4F4F4] border border-[#E5E5E5]">
                    <div className="text-lg font-bold text-black">{m.value}</div>
                    <div className="text-[11px] text-[#737373]">{m.label.toLowerCase()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] flex justify-between items-center">
              <button
                onClick={() => {
                  navigateTo('/start-for-free');
                  setActiveCaseStudyModal(null);
                }}
                className="px-4 py-2 bg-black text-white text-xs font-medium"
              >
                discuss similar project
              </button>
              <button
                onClick={() => setActiveCaseStudyModal(null)}
                className="text-xs text-[#737373] hover:text-black"
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
