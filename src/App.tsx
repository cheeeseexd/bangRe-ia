/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav, AppTabType } from './components/TopNav';
import { IAFlowchartTab } from './components/IAFlowchartTab';
import { MainPagesTableTab } from './components/MainPagesTableTab';
import { SubpagesTableTab } from './components/SubpagesTableTab';
import { LegacyRedirectsTab } from './components/LegacyRedirectsTab';
import { SourcesTab } from './components/SourcesTab';
import { LiveWebsiteView } from './components/LiveWebsiteView';
import { AIConciergeModal } from './components/AIConciergeModal';
import { JsonSpecModal } from './components/JsonSpecModal';

export default function App() {
  // Parse initial state from window.location
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return { tab: 'live' as AppTabType, slug: '/' };
    }
    const path = window.location.pathname.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get('tab') as AppTabType | null;

    if (tabParam && ['flowchart', 'main_pages', 'subpages', 'redirects', 'sources', 'live'].includes(tabParam)) {
      return { tab: tabParam, slug: path || '/' };
    }

    if (path === '/ia-flowchart' || path === '/flowchart' || path === '/blueprint') {
      return { tab: 'flowchart' as AppTabType, slug: '/' };
    }
    if (path === '/main-pages') {
      return { tab: 'main_pages' as AppTabType, slug: '/' };
    }
    if (path === '/subpages') {
      return { tab: 'subpages' as AppTabType, slug: '/' };
    }
    if (path === '/legacy-redirects' || path === '/redirects') {
      return { tab: 'redirects' as AppTabType, slug: '/' };
    }
    if (path === '/sources') {
      return { tab: 'sources' as AppTabType, slug: '/' };
    }

    // Default to Live Website Wireframe
    return { tab: 'live' as AppTabType, slug: path && path !== '' ? path : '/' };
  };

  const initialState = getInitialState();
  const [activeTab, setActiveTab] = useState<AppTabType>(initialState.tab);
  const [livePageSlug, setLivePageSlug] = useState<string>(initialState.slug);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');
  const [isJsonModalOpen, setIsJsonModalOpen] = useState<boolean>(false);

  // Sync state with browser URL
  useEffect(() => {
    const handlePopState = () => {
      const current = getInitialState();
      setActiveTab(current.tab);
      setLivePageSlug(current.slug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update tab and handle history
  const handleSelectTab = (tab: AppTabType) => {
    if (tab === 'ai_concierge') {
      setIsAIModalOpen(true);
      return;
    }
    setActiveTab(tab);
    if (tab === 'live') {
      if (window.location.pathname !== livePageSlug) {
        window.history.pushState(null, '', livePageSlug);
      }
    } else {
      const tabPaths: Record<string, string> = {
        flowchart: '/ia-flowchart',
        main_pages: '/main-pages',
        subpages: '/subpages',
        redirects: '/redirects',
        sources: '/sources',
      };
      if (tabPaths[tab] && window.location.pathname !== tabPaths[tab]) {
        window.history.pushState(null, '', tabPaths[tab]);
      }
    }
  };

  // Transition to live page preview from IA tabs
  const handlePreviewLivePage = (slug: string) => {
    setLivePageSlug(slug);
    setActiveTab('live');
    if (window.location.pathname !== slug) {
      window.history.pushState(null, '', slug);
    }
  };

  // Transition from live page back to flowchart
  const handleOpenNodeInBlueprint = (slug: string) => {
    setActiveTab('flowchart');
    if (window.location.pathname !== '/ia-flowchart') {
      window.history.pushState(null, '', '/ia-flowchart');
    }
  };

  const handleOpenAIConcierge = (prompt?: string) => {
    setAiInitialPrompt(prompt || '');
    setIsAIModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-black selection:text-white">
      {/* Top Universal Control Header */}
      <TopNav
        currentTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenJsonSpec={() => setIsJsonModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'flowchart' && (
          <IAFlowchartTab onPreviewLivePage={handlePreviewLivePage} />
        )}

        {activeTab === 'main_pages' && (
          <MainPagesTableTab onPreviewLivePage={handlePreviewLivePage} />
        )}

        {activeTab === 'subpages' && (
          <SubpagesTableTab onPreviewLivePage={handlePreviewLivePage} />
        )}

        {activeTab === 'redirects' && (
          <LegacyRedirectsTab />
        )}

        {activeTab === 'sources' && (
          <SourcesTab />
        )}

        {activeTab === 'live' && (
          <LiveWebsiteView
            initialSlug={livePageSlug}
            onOpenAIConcierge={handleOpenAIConcierge}
            onOpenNodeInBlueprint={handleOpenNodeInBlueprint}
          />
        )}
      </main>

      {/* Floating AI Concierge Drawer */}
      <AIConciergeModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        initialQuery={aiInitialPrompt}
        onSelectNodeInTree={() => {
          setActiveTab('flowchart');
          setIsAIModalOpen(false);
        }}
      />

      {/* JSON Specification Modal */}
      <JsonSpecModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
      />
    </div>
  );
}



