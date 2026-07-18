import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { AppConfig } from '../types';
import { useAnalytics } from '../analytics/provider';
import {
  trackIntegrationsConnectorsTabClick,
  trackIntegrationsTabClick,
  trackPageView,
  trackSettingsConnectorAuthResult,
} from '../analytics/events';
import { ConnectorSection } from './SettingsDialog';
import { McpClientSection } from './McpClientSection';
import { SkillsSection } from './SkillsSection';
import { UseEverywhereGuidePanel } from './UseEverywhereModal';
import { PageHeader } from './PageHeader';
import { useT } from '../i18n';

export type IntegrationTab = 'mcp' | 'connectors' | 'skills' | 'use-everywhere';

interface Props {
  config: AppConfig;
  initialTab?: IntegrationTab;
  composioConfigLoading?: boolean;
  onConfigPersist: (config: AppConfig) => Promise<void> | void;
  onPersistComposioKey: (composio: AppConfig['composio']) => Promise<void> | void;
  onSkillsRefresh?: () => Promise<void> | void;
  onSkillsChanged?: (affectedSkillId?: string) => void;
}

const INTEGRATION_TABS: ReadonlyArray<{
  id: IntegrationTab;
}> = [
  { id: 'mcp' },
  { id: 'connectors' },
  { id: 'skills' },
  { id: 'use-everywhere' },
];

function integrationTabToTrackingElement(
  id: IntegrationTab,
): 'mcp' | 'connectors' | 'skills' | 'use_everywhere' {
  if (id === 'use-everywhere') return 'use_everywhere';
  return id;
}

export function IntegrationsView({
  config,
  initialTab = 'mcp',
  composioConfigLoading = false,
  onConfigPersist,
  onPersistComposioKey,
  onSkillsRefresh,
  onSkillsChanged,
}: Props) {
  const t = useT();
  const analytics = useAnalytics();
  const integrationsPageViewFiredRef = useRef(false);
  useEffect(() => {
    if (integrationsPageViewFiredRef.current) return;
    integrationsPageViewFiredRef.current = true;
    trackPageView(analytics.track, { page_name: 'integrations' });
  }, [analytics.track]);
  const [activeTab, setActiveTab] = useState<IntegrationTab>(initialTab);
  const [localConfig, setLocalConfig] = useState<AppConfig>(config);
  const localConfigRef = useRef(localConfig);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    localConfigRef.current = config;
    setLocalConfig(config);
  }, [config]);

  const updateLocalConfig = useCallback<Dispatch<SetStateAction<AppConfig>>>(
    (nextConfig) => {
      const base = localConfigRef.current;
      const resolved =
        typeof nextConfig === 'function'
          ? (nextConfig as (current: AppConfig) => AppConfig)(base)
          : nextConfig;
      localConfigRef.current = resolved;
      setLocalConfig(resolved);
      void onConfigPersist(resolved);
    },
    [onConfigPersist],
  );

  const liveDaemonUrl =
    typeof window !== 'undefined' ? window.location.origin : undefined;

  return (
    <section className="integrations-view" aria-label={t('entry.navIntegrations')}>
      <PageHeader
        className="integrations-view__masthead"
        eyebrow={t('integrations.kicker')}
        title={t('integrations.mastheadTitleLead')}
        accent={t('integrations.mastheadTitleAccent')}
        trailing="."
        subtitle={t('integrations.lede')}
      />

      <nav
        className="integrations-view__scopes"
        role="tablist"
        aria-label={t('integrations.areasAria')}
      >
        {INTEGRATION_TABS.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`integrations-view__scope${active ? ' is-active' : ''}`}
              onClick={() => {
                trackIntegrationsTabClick(analytics.track, {
                  page_name: 'integrations',
                  area: 'integrations_tab',
                  element: integrationTabToTrackingElement(tab.id),
                });
                setActiveTab(tab.id);
              }}
              data-testid={`integrations-tab-${tab.id}`}
            >
              {integrationTabLabel(tab.id, t)}
            </button>
          );
        })}
      </nav>

      <div className="integrations-view__panel">
        {activeTab === 'mcp' ? <McpClientSection /> : null}

        {activeTab === 'connectors' ? (
          <ConnectorSection
            cfg={localConfig}
            setCfg={setLocalConfig}
            composioConfigLoading={composioConfigLoading}
            onPersistComposioKey={onPersistComposioKey}
            onConnectorsTabClick={(element) =>
              trackIntegrationsConnectorsTabClick(analytics.track, {
                page_name: 'integrations',
                area: 'connectors_tab',
                element,
              })
            }
            onConnectorAuthResult={({ connectorId, action, result, errorCode }) =>
              trackSettingsConnectorAuthResult(analytics.track, {
                page_name: 'settings',
                area: 'connectors',
                connector_id: connectorId,
                action,
                result,
                ...(errorCode ? { error_code: errorCode } : {}),
              })
            }
          />
        ) : null}

        {activeTab === 'skills' ? (
          <SkillsSection
            cfg={localConfig}
            setCfg={updateLocalConfig}
            onSkillsRefresh={onSkillsRefresh}
            onSkillsChanged={onSkillsChanged}
          />
        ) : null}

        {activeTab === 'use-everywhere' ? (
          <div className="integrations-view__use-everywhere">
            <UseEverywhereGuidePanel
              onOpenSettings={() => setActiveTab('mcp')}
              {...(liveDaemonUrl ? { daemonUrl: liveDaemonUrl } : {})}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function integrationTabLabel(id: IntegrationTab, t: ReturnType<typeof useT>): string {
  switch (id) {
    case 'mcp': return t('integrations.tabLabel.mcp');
    case 'connectors': return t('entry.tabConnectors');
    case 'skills': return t('integrations.tabLabel.skills');
    case 'use-everywhere': return t('entry.useEverywhereTitle');
  }
}
