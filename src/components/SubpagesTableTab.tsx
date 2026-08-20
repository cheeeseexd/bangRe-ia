import React, { useState } from 'react';
import { SUBPAGES_DATA, SubpageRecord } from '../data/bangSpecData';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

interface SubpagesTableTabProps {
  onPreviewLivePage?: (slug: string) => void;
}

export const SubpagesTableTab: React.FC<SubpagesTableTabProps> = ({ onPreviewLivePage }) => {
  const [parentFilter, setParentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const parentOptions = ['all', 'What We Do', 'Industries', 'Work', 'How We Work', 'Book a Strategy Call'];

  const filteredSubpages = SUBPAGES_DATA.filter(sub => {
    const matchesParent = parentFilter === 'all' || sub.parentName === parentFilter;
    const matchesSearch = !searchQuery || 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.primaryCTA.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesParent && matchesSearch;
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
              <span className="text-black">[03] Subpages Inventory Table</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-black mt-0.5">
              Direct Child Pages (Decision Rows)
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Parent Branch Filter */}
            <div className="flex border border-[#E5E5E5] text-xs">
              {parentOptions.map((parent) => (
                <button
                  key={parent}
                  onClick={() => setParentFilter(parent)}
                  className={`px-3 py-1.5 transition-colors ${
                    parentFilter === parent
                      ? 'bg-black text-white font-medium'
                      : 'text-[#525252] hover:text-black hover:bg-[#F9F9F9]'
                  }`}
                >
                  {parent === 'all' ? `All (${SUBPAGES_DATA.length})` : parent}
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
                placeholder="Search subpages, parents, CTA..."
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
                <th className="p-3 border-r border-[#E5E5E5] font-semibold text-black">Subpage</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">URL / Route</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">One-Line Purpose</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">Primary CTA</th>
                <th className="p-3 border-r border-[#E5E5E5] font-semibold">Parent Page</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredSubpages.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#FAFAFA] transition-colors">
                  {/* Subpage Title */}
                  <td className="p-3 border-r border-[#E5E5E5] font-bold text-black whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>{sub.name}</span>
                      <span className="text-[9px] bg-[#F0F0F0] text-[#525252] px-1 font-mono">
                        {sub.category}
                      </span>
                    </div>
                  </td>

                  {/* URL */}
                  <td className="p-3 border-r border-[#E5E5E5] font-mono text-[11px] text-black whitespace-nowrap">
                    <code>{sub.url}</code>
                  </td>

                  {/* Purpose */}
                  <td className="p-3 border-r border-[#E5E5E5] text-[#262626] max-w-md">
                    {sub.purpose}
                  </td>

                  {/* Primary CTA */}
                  <td className="p-3 border-r border-[#E5E5E5] font-semibold text-black whitespace-nowrap">
                    {sub.primaryCTA}
                  </td>

                  {/* Parent */}
                  <td className="p-3 border-r border-[#E5E5E5] font-medium text-black whitespace-nowrap">
                    <span className="bg-[#FAFAFA] border border-[#E5E5E5] px-2 py-0.5">
                      {sub.parentName}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-3 whitespace-nowrap">
                    {getStatusBadge(sub.status)}
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
