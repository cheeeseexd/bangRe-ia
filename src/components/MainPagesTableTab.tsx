import React, { useState } from 'react';
import { MAIN_PAGES_PHASE1, MainPageRecord } from '../data/bangSpecData';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  ExternalLink,
  Filter,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MainPagesTableTabProps {
  onPreviewLivePage?: (slug: string) => void;
}

export const MainPagesTableTab: React.FC<MainPagesTableTabProps> = ({ onPreviewLivePage }) => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Ready' | 'Needs verification' | 'Deferred'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const filteredPages = MAIN_PAGES_PHASE1.filter(page => {
    const matchesStatus = selectedStatus === 'all' || page.contentStatus === selectedStatus;
    const matchesSearch = !searchQuery || 
      page.pageTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.plainLanguageRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.currentUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.primaryCTA.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: 'Ready' | 'Needs verification' | 'Deferred') => {
    switch (status) {
      case 'Ready':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 text-[10px] font-medium bg-black text-white whitespace-nowrap">
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>Ready</span>
          </span>
        );
      case 'Needs verification':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 text-[10px] font-medium bg-[#FAFAFA] text-black border border-dashed border-black whitespace-nowrap">
            <AlertCircle className="w-2.5 h-2.5" />
            <span>Needs verification</span>
          </span>
        );
      case 'Deferred':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 text-[10px] font-medium bg-[#F5F5F5] text-[#737373] whitespace-nowrap">
            <Clock className="w-2.5 h-2.5" />
            <span>Deferred</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white text-black min-h-[calc(100vh-54px)] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E5] pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">
              <span>Architecture Map</span>
              <span>/</span>
              <span className="text-black">[02] Main Pages Master Table</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-black mt-0.5">
              Top-Level Main Pages (Decision Rows)
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex border border-[#E5E5E5] text-xs">
              {[
                { id: 'all', label: `All (${MAIN_PAGES_PHASE1.length})` },
                { id: 'Ready', label: 'Ready (4)' },
                { id: 'Needs verification', label: 'Needs verification (4)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatus(tab.id as any)}
                  className={`px-3 py-1.5 transition-colors ${
                    selectedStatus === tab.id
                      ? 'bg-black text-white font-medium'
                      : 'text-[#525252] hover:text-black hover:bg-[#F9F9F9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-[#737373] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search main pages, CTA, URLs..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Short Row Table */}
        <div className="border border-black overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-black text-[#737373] font-mono text-[11px] uppercase">
                <th className="p-3 border-r border-[#E5E5E5] font-semibold text-black">Page</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">URL / Route</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">One-Line Purpose</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">Primary CTA</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold text-center">Subpages</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">Status</th>
                <th className="p-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredPages.map((page) => {
                const isExpanded = expandedRowId === page.id;

                return (
                  <React.Fragment key={page.id}>
                    <tr className="hover:bg-[#FAFAFA] transition-colors">
                      {/* Page Title */}
                      <td className="p-3 border-r border-[#E5E5E5] font-bold text-black whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[10px] text-[#737373]">{page.level}</span>
                          <span>{page.pageTitle}</span>
                          {page.inPrimaryNav && (
                            <span className="text-[9px] bg-[#E5E5E5] text-black px-1 font-mono uppercase">
                              Nav
                            </span>
                          )}
                        </div>
                      </td>

                      {/* URL Route */}
                      <td className="p-3 border-r border-[#E5E5E5] font-mono text-[11px] text-black whitespace-nowrap">
                        <code>{page.proposedCanonicalUrl || page.currentUrl}</code>
                      </td>

                      {/* Purpose */}
                      <td className="p-3 border-r border-[#E5E5E5] text-[#262626] max-w-md">
                        {page.plainLanguageRole}
                      </td>

                      {/* Primary CTA */}
                      <td className="p-3 border-r border-[#E5E5E5] font-semibold text-black whitespace-nowrap">
                        {page.primaryCTA}
                      </td>

                      {/* Children Count */}
                      <td className="p-3 border-r border-[#E5E5E5] text-center font-mono text-black font-semibold whitespace-nowrap">
                        {page.childPageCount} subpages
                      </td>

                      {/* Status Badge */}
                      <td className="p-3 border-r border-[#E5E5E5] whitespace-nowrap">
                        {getStatusBadge(page.contentStatus)}
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          {onPreviewLivePage && (
                            <button
                              onClick={() => onPreviewLivePage(page.currentUrl)}
                              className="px-2 py-1 bg-white hover:bg-black hover:text-white border border-[#E5E5E5] hover:border-black text-[11px] font-medium transition-colors"
                              title="Preview Live Wireframe"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => setExpandedRowId(isExpanded ? null : page.id)}
                            className="px-2 py-1 bg-[#F5F5F5] hover:bg-black hover:text-white text-[11px] font-medium transition-colors flex items-center space-x-1"
                          >
                            <span>{isExpanded ? 'Less' : 'Details'}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Details Drawer */}
                    {isExpanded && (
                      <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
                        <td colSpan={7} className="p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div className="p-3 bg-white border border-[#E5E5E5] space-y-1">
                              <span className="font-bold text-black block">Core Visitor Question:</span>
                              <span className="italic text-[#525252]">"{page.coreVisitorQuestion}"</span>
                            </div>
                            <div className="p-3 bg-white border border-[#E5E5E5] space-y-1">
                              <span className="font-bold text-black block">Status Rationale:</span>
                              <span className="text-[#525252]">{page.statusRationale}</span>
                            </div>
                            <div className="p-3 bg-white border border-[#E5E5E5] space-y-1">
                              <span className="font-bold text-black block">Next Phase Notes:</span>
                              <span className="text-[#525252]">{page.nextPhaseNotes}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
