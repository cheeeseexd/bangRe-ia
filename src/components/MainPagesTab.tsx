import React, { useState } from 'react';
import { MAIN_PAGES_PHASE1, AUDIT_LOG_PHASE1, MainPageRecord } from '../data/bangSpecData';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  ShieldAlert, 
  Compass, 
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  FileText,
  HelpCircle,
  Users,
  Target
} from 'lucide-react';

interface MainPagesTabProps {
  onPreviewLivePage?: (slug: string) => void;
}

export const MainPagesTab: React.FC<MainPagesTabProps> = ({ onPreviewLivePage }) => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Ready' | 'Needs verification' | 'Deferred'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'node-home': true,
    'node-what-we-do': true
  });

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPages = MAIN_PAGES_PHASE1.filter(page => {
    const matchesStatus = selectedStatus === 'all' || page.contentStatus === selectedStatus;
    const matchesSearch = !searchQuery || 
      page.pageTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.plainLanguageRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.currentUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.navLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.coreVisitorQuestion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: 'Ready' | 'Needs verification' | 'Deferred') => {
    switch (status) {
      case 'Ready':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[11px] font-medium bg-black text-white border border-black">
            <CheckCircle2 className="w-3 h-3 text-white" />
            <span>Ready</span>
          </span>
        );
      case 'Needs verification':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[11px] font-medium bg-[#FAFAFA] text-black border border-dashed border-black">
            <AlertCircle className="w-3 h-3 text-black" />
            <span>Needs verification</span>
          </span>
        );
      case 'Deferred':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[11px] font-medium bg-[#F5F5F5] text-[#737373] border border-[#E5E5E5]">
            <Clock className="w-3 h-3 text-[#737373]" />
            <span>Deferred</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white text-black min-h-[calc(100vh-54px)]">
      {/* Top Architectural Strategy Banner */}
      <div className="bg-[#FAFAFA] border-b border-[#E5E5E5] px-6 lg:px-10 py-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">
                <span>Phase 1 Architecture</span>
                <span>/</span>
                <span className="text-black">Top-Level Main Pages Specification</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-black mt-1">
                Main Pages & Navigation Hierarchy
              </h1>
            </div>

            {/* Status Summary Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="px-3 py-1.5 bg-white border border-[#E5E5E5] flex items-center space-x-2">
                <span className="text-[#737373]">Total Main Pages:</span>
                <span className="font-bold text-black">{AUDIT_LOG_PHASE1.statusBreakdown.totalMainPages}</span>
              </div>
              <div className="px-3 py-1.5 bg-white border border-black flex items-center space-x-2">
                <span className="w-2 h-2 bg-black rounded-none"></span>
                <span className="text-black font-medium">Ready: {AUDIT_LOG_PHASE1.statusBreakdown.readyCount}</span>
              </div>
              <div className="px-3 py-1.5 bg-white border border-dashed border-black flex items-center space-x-2">
                <span className="w-2 h-2 border border-black rounded-none"></span>
                <span className="text-black font-medium">Needs verification: {AUDIT_LOG_PHASE1.statusBreakdown.needsVerificationCount}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#525252] leading-relaxed max-w-4xl">
            Phase 1 establishes clear, human-centric top-level navigation and page structures so non-technical visitors immediately understand Bang's two flagship offers, verify relevant technical proof, and initiate a conversation. All internal jargon, unverified claims, and SaaS-style terminology have been systematically audited.
          </p>

          {/* Approved Primary Navigation Preview Bar */}
          <div className="pt-4 border-t border-[#E5E5E5]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-2 flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5 text-black" />
              <span>Approved Visitor-Facing Primary Navigation</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-black">
              <div className="px-2.5 py-1 text-xs font-bold text-black border-r border-[#E5E5E5] pr-4">
                Bang Design
              </div>
              {AUDIT_LOG_PHASE1.approvedPrimaryNav.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`px-3 py-1 text-xs flex items-center space-x-1.5 ${
                    item.isCTAButton 
                      ? 'bg-black text-white font-medium ml-auto' 
                      : 'bg-[#F9F9F9] text-black border border-[#E5E5E5]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-60">({item.canonical})</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#737373]">
              <span><strong>Excluded from Header:</strong> 2+2 Partnership, Plans, Start for Free, Impact Studio, Pattern-X, Insights</span>
              <span><strong>Preserved in Footer/Search:</strong> Insights Archive (500+ URLs)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="border-b border-[#E5E5E5] px-6 lg:px-10 py-3 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Status Filter Tabs */}
          <div className="flex border border-[#E5E5E5]">
            {[
              { id: 'all', label: 'All Main Pages (8)' },
              { id: 'Ready', label: 'Ready (4)' },
              { id: 'Needs verification', label: 'Needs verification (4)' },
              { id: 'Deferred', label: 'Deferred (0)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id as any)}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  selectedStatus === tab.id
                    ? 'bg-black text-white font-medium'
                    : 'text-[#525252] hover:text-black hover:bg-[#F9F9F9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-[#737373] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search main pages, roles, URLs..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Pages Detailed Cards List */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 space-y-8">
        {filteredPages.map((page) => {
          const isExpanded = expandedSections[page.id] ?? false;

          return (
            <div 
              key={page.id}
              className="border border-black bg-white transition-shadow hover:shadow-sm"
            >
              {/* Card Header Bar */}
              <div className="p-6 border-b border-[#E5E5E5] bg-[#FAFAFA] flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs text-[#737373] bg-white px-2 py-0.5 border border-[#E5E5E5]">
                      {page.level}
                    </span>
                    <h2 className="text-lg font-bold text-black tracking-tight">
                      {page.pageTitle}
                    </h2>
                    {getStatusBadge(page.contentStatus)}
                    {page.inPrimaryNav && (
                      <span className="px-2 py-0.5 text-[10px] bg-black text-white font-semibold uppercase tracking-wider">
                        Primary Nav
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#525252] pt-1">
                    <div>
                      <span className="text-[#737373]">Current URL: </span>
                      <code className="bg-white px-1.5 py-0.5 border border-[#E5E5E5] font-mono text-black">
                        {page.currentUrl}
                      </code>
                    </div>
                    {page.proposedCanonicalUrl && page.proposedCanonicalUrl !== page.currentUrl && (
                      <div>
                        <span className="text-[#737373]">Proposed Canonical: </span>
                        <code className="bg-white px-1.5 py-0.5 border border-black font-mono text-black font-semibold">
                          {page.proposedCanonicalUrl}
                        </code>
                      </div>
                    )}
                    <div>
                      <span className="text-[#737373]">Nav Label: </span>
                      <strong className="text-black">{page.navLabel}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {onPreviewLivePage && (
                    <button
                      onClick={() => onPreviewLivePage(page.currentUrl)}
                      className="px-3 py-1.5 text-xs bg-white hover:bg-black hover:text-white border border-black flex items-center space-x-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Preview Live Wireframe</span>
                    </button>
                  )}
                  <button
                    onClick={() => toggleSection(page.id)}
                    className="p-1.5 bg-white border border-[#E5E5E5] hover:border-black transition-colors"
                    title={isExpanded ? "Collapse sections" : "Expand sections"}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Core Information Grid */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Column 1: Plain Language Role & Intended Audience */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1 flex items-center space-x-1">
                        <FileText className="w-3.5 h-3.5 text-black" />
                        <span>Plain-Language Role</span>
                      </div>
                      <p className="text-xs text-black leading-relaxed">
                        {page.plainLanguageRole}
                      </p>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1 flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-black" />
                        <span>Intended Audience</span>
                      </div>
                      <p className="text-xs text-[#525252] leading-relaxed">
                        {page.intendedAudience}
                      </p>
                    </div>
                  </div>

                  {/* Column 2: Core Visitor Question & CTAs */}
                  <div className="space-y-4">
                    <div className="p-3.5 bg-[#F9F9F9] border border-[#E5E5E5] space-y-1">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#737373] flex items-center space-x-1">
                        <HelpCircle className="w-3 h-3 text-black" />
                        <span>Core Visitor Question Answered</span>
                      </div>
                      <p className="text-xs font-semibold text-black italic">
                        "{page.coreVisitorQuestion}"
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] flex items-center space-x-1">
                        <Target className="w-3.5 h-3.5 text-black" />
                        <span>Call to Action Protocol</span>
                      </div>
                      <div className="flex flex-col space-y-1.5 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] bg-black text-white px-1.5 py-0.5 font-mono">PRIMARY</span>
                          <span className="font-semibold text-black">{page.primaryCTA}</span>
                        </div>
                        {page.secondaryCTA && (
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] bg-white border border-[#E5E5E5] text-[#737373] px-1.5 py-0.5 font-mono">SECONDARY</span>
                            <span className="text-[#525252]">{page.secondaryCTA}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Status Rationale, Child Count & Phase 2 Notes */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1 flex items-center space-x-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-black" />
                        <span>Content Status Rationale</span>
                      </div>
                      <p className="text-xs text-[#525252] leading-relaxed">
                        {page.statusRationale}
                      </p>
                    </div>

                    <div className="p-3 bg-white border border-[#E5E5E5] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[#737373]">
                        <span>Child-Page Count:</span>
                        <strong className="text-black">{page.childPageCount} subpages</strong>
                      </div>
                      <div className="text-[11px] text-[#525252] border-t border-[#E5E5E5] pt-1.5">
                        <span className="font-semibold text-black">Phase 2 Notes: </span>
                        {page.nextPhaseNotes}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit & Unverified Claims Strip */}
                {page.removedOrUnverifiedClaims && page.removedOrUnverifiedClaims.length > 0 && (
                  <div className="p-3.5 bg-[#FFFDF5] border border-[#E5E5E5] text-xs space-y-1.5">
                    <div className="flex items-center space-x-1.5 font-semibold text-black text-[11px] uppercase tracking-wider">
                      <AlertCircle className="w-3.5 h-3.5 text-black" />
                      <span>Phase 1 Claim & Nomenclature Audit Flags:</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-[11px] text-[#525252]">
                      {page.removedOrUnverifiedClaims.map((claim, cIdx) => (
                        <li key={cIdx} className="flex items-start space-x-1.5">
                          <span className="text-black font-bold">↳</span>
                          <span>{claim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Collapsible Required Sections Detail */}
                {isExpanded && (
                  <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wider text-black flex items-center space-x-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Required Sections Schema ({page.requiredSections.length})</span>
                      </div>
                      <span className="text-[11px] text-[#737373]">Strict visitor-facing section layout</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {page.requiredSections.map((sec, sIdx) => (
                        <div 
                          key={sIdx}
                          className="p-3.5 bg-[#FAFAFA] border border-[#E5E5E5] space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-black">{sec.name}</span>
                            {sec.cta && (
                              <span className="text-[10px] bg-black text-white px-2 py-0.5">
                                CTA: {sec.cta}
                              </span>
                            )}
                          </div>

                          {sec.headline && (
                            <div className="text-black font-medium">
                              "{sec.headline}"
                            </div>
                          )}

                          {sec.supportingCopy && (
                            <div className="text-[#525252] text-[11px] italic">
                              {sec.supportingCopy}
                            </div>
                          )}

                          {sec.details && sec.details.length > 0 && (
                            <ul className="space-y-1 text-[11px] text-[#525252] pt-1 border-t border-[#E5E5E5]">
                              {sec.details.map((d, dIdx) => (
                                <li key={dIdx} className="flex items-start space-x-1">
                                  <span className="text-[#737373]">•</span>
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {sec.constraints && (
                            <div className="text-[10px] text-black font-semibold bg-white p-1.5 border border-[#E5E5E5]">
                              <strong>Constraint:</strong> {sec.constraints}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
