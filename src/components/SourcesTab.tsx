import React, { useState } from 'react';
import { SOURCES_DATA, AUDIT_LOG_PHASE1, SourceAuditRecord } from '../data/bangSpecData';
import { CheckCircle2, AlertCircle, ShieldAlert, FileText, Search } from 'lucide-react';

export const SourcesTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSources = SOURCES_DATA.filter(s =>
    !searchQuery ||
    s.scopeOrClaim.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.sourceDocument.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white text-black min-h-[calc(100vh-54px)] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E5] pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">
              <span>Architecture Map</span>
              <span>/</span>
              <span className="text-black">[05] Source Verification & Claims Audit</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-black mt-0.5">
              Source Documents & Verification Log
            </h1>
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-[#737373] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search claims or documents..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
            />
          </div>
        </div>

        {/* Audit Policy Notice */}
        <div className="p-4 bg-[#FAFAFA] border border-black space-y-2 text-xs">
          <div className="flex items-center space-x-2 font-bold text-black">
            <ShieldAlert className="w-4 h-4 text-black" />
            <span>Strict Evidence Verification Directive:</span>
          </div>
          <p className="text-[#525252] leading-relaxed">
            All proof, metrics, standards (FDA, ISO 13485, DO-160), awards, patent claims, and case-study outcomes remain marked 
            <strong> "Needs verification"</strong> and hidden from public marketing copy until verified against certified source documents and signed client releases.
          </p>
        </div>

        {/* Sources & Claims Table */}
        <div className="border border-black overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-black text-[#737373] font-mono text-[11px] uppercase">
                <th className="p-3 border-r border-[#E5E5E5] font-semibold text-black">Scope / Claim</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">Source Document</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">Verification Status</th>
                <th className="p-3 font-semibold">Audit Notes & Requirements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredSources.map((source) => (
                <tr key={source.id} className="hover:bg-[#FAFAFA] transition-colors">
                  {/* Scope or Claim */}
                  <td className="p-3 border-r border-[#E5E5E5] font-bold text-black max-w-sm">
                    {source.scopeOrClaim}
                  </td>

                  {/* Source Document */}
                  <td className="p-3 border-r border-[#E5E5E5] font-mono text-[11px] text-[#262626] whitespace-nowrap">
                    <div className="flex items-center space-x-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#737373]" />
                      <span>{source.sourceDocument}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-3 border-r border-[#E5E5E5] whitespace-nowrap">
                    {source.verificationStatus === 'Verified' ? (
                      <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 text-[10px] font-medium bg-black text-white">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 text-[10px] font-medium bg-[#FAFAFA] text-black border border-dashed border-black">
                        <AlertCircle className="w-2.5 h-2.5" />
                        <span>Needs verification</span>
                      </span>
                    )}
                  </td>

                  {/* Notes */}
                  <td className="p-3 text-[#525252] leading-relaxed">
                    {source.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
