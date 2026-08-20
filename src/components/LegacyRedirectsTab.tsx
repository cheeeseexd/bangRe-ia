import React, { useState } from 'react';
import { REDIRECTS_DATA, RedirectRecord } from '../data/bangSpecData';
import { CheckCircle2, ArrowRight, ShieldCheck, Search } from 'lucide-react';

export const LegacyRedirectsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRedirects = REDIRECTS_DATA.filter(r => 
    !searchQuery ||
    r.legacyUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.proposedCanonical.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white text-black min-h-[calc(100vh-54px)] p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header and Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E5] pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#737373]">
              <span>Architecture Map</span>
              <span>/</span>
              <span className="text-black">[04] Legacy URLs & 301 Redirect Rules</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-black mt-0.5">
              URL Preservation & Transition Rules
            </h1>
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-[#737373] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legacy URLs or canonicals..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E5E5E5] focus:border-black focus:outline-none"
            />
          </div>
        </div>

        {/* SEO Preservation Rule Notice */}
        <div className="p-4 bg-[#FAFAFA] border border-black flex items-start space-x-3 text-xs">
          <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-black font-bold">Absolute SEO Preservation Protocol:</strong>
            <p className="text-[#525252] leading-relaxed">
              All 500+ legacy blog article URLs under <code>/insights/*</code> are preserved verbatim with zero renames or drops. 
              Legacy transactional routes (such as <code>/start-for-free</code> and <code>/plans</code>) are permanently redirected via 301 rules to ensure seamless user routing and zero broken backlinks.
            </p>
          </div>
        </div>

        {/* Redirect Table */}
        <div className="border border-black overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-black text-[#737373] font-mono text-[11px] uppercase">
                <th className="p-3 border-r border-[#E5E5E5] font-semibold text-black">Legacy URL</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">Redirect Type</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold text-black">Proposed Canonical</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">Transition Purpose</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredRedirects.map((redirect, idx) => (
                <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                  {/* Legacy URL */}
                  <td className="p-3 border-r border-[#E5E5E5] font-mono text-black font-semibold whitespace-nowrap">
                    <code>{redirect.legacyUrl}</code>
                  </td>

                  {/* Redirect Type */}
                  <td className="p-3 border-r border-[#E5E5E5] whitespace-nowrap font-mono text-[11px]">
                    <span className="bg-[#F0F0F0] px-1.5 py-0.5 text-black">
                      {redirect.redirectType}
                    </span>
                  </td>

                  {/* Proposed Canonical */}
                  <td className="p-3 border-r border-[#E5E5E5] font-mono text-black font-bold whitespace-nowrap">
                    <div className="flex items-center space-x-1.5">
                      <ArrowRight className="w-3 h-3 text-[#737373]" />
                      <code>{redirect.proposedCanonical}</code>
                    </div>
                  </td>

                  {/* Purpose */}
                  <td className="p-3 border-r border-[#E5E5E5] text-[#525252]">
                    {redirect.purpose}
                  </td>

                  {/* Status */}
                  <td className="p-3 whitespace-nowrap">
                    <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 text-[10px] font-medium bg-black text-white">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>{redirect.status}</span>
                    </span>
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
