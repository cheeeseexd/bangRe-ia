import React from 'react';
import { GitFork, LayoutList, Layers, RefreshCw, ShieldCheck, Monitor, Sparkles, Code2 } from 'lucide-react';

export type AppTabType = 'flowchart' | 'main_pages' | 'subpages' | 'redirects' | 'sources' | 'live' | 'ai_concierge';

interface TopNavProps {
  currentTab: AppTabType;
  onSelectTab: (tab: AppTabType) => void;
  onOpenJsonSpec: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenJsonSpec
}) => {
  return (
    <header className="bg-black text-white border-b border-black px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
      {/* Brand & Project Identity */}
      <div className="flex items-center space-x-3">
        <div className="flex items-baseline space-x-2">
          <span className="font-bold text-sm tracking-tight text-white">
            Bang Design
          </span>
          <span className="text-xs text-[#A3A3A3]">
            / 2026 IA Map
          </span>
        </div>
      </div>

      {/* Main Decision Tabs */}
      <div className="flex items-center space-x-1 text-xs overflow-x-auto py-1">
        <button
          onClick={() => onSelectTab('flowchart')}
          className={`px-3 py-1.5 transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            currentTab === 'flowchart'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-neutral-900'
          }`}
        >
          <GitFork className="w-3.5 h-3.5" />
          <span>IA Flowchart</span>
        </button>

        <button
          onClick={() => onSelectTab('main_pages')}
          className={`px-3 py-1.5 transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            currentTab === 'main_pages'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-neutral-900'
          }`}
        >
          <LayoutList className="w-3.5 h-3.5" />
          <span>Main Pages</span>
        </button>

        <button
          onClick={() => onSelectTab('subpages')}
          className={`px-3 py-1.5 transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            currentTab === 'subpages'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Subpages</span>
        </button>

        <button
          onClick={() => onSelectTab('redirects')}
          className={`px-3 py-1.5 transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            currentTab === 'redirects'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-neutral-900'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Legacy & Redirects</span>
        </button>

        <button
          onClick={() => onSelectTab('sources')}
          className={`px-3 py-1.5 transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
            currentTab === 'sources'
              ? 'bg-white text-black font-semibold'
              : 'text-[#A3A3A3] hover:text-white hover:bg-neutral-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Sources</span>
        </button>
      </div>

      {/* Utilities & JSON Spec Inspector */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onSelectTab('live')}
          className={`px-2.5 py-1 text-xs transition-colors flex items-center space-x-1 border ${
            currentTab === 'live'
              ? 'bg-white text-black font-semibold border-white'
              : 'text-[#A3A3A3] hover:text-white bg-neutral-900 border-neutral-800 hover:border-neutral-700'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Wireframe Preview</span>
        </button>

        <button
          onClick={onOpenJsonSpec}
          className="px-2.5 py-1 text-xs text-[#D4D4D4] hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 flex items-center space-x-1.5 transition-colors"
          title="Inspect complete JSON specification"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">JSON Spec</span>
        </button>
      </div>
    </header>
  );
};



