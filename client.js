window.__ModuleLoader__.load({
  id: '@local/dsh-skill-catalog',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** Locale namespace this plugin owns. */
    const NAMESPACE = 'skill-catalog';
    /** One id addresses both the sidebar cell and the main panel behind it. */
    const PANEL_ID = 'skill-catalog';
    const FALLBACK_SNAPSHOT = Object.freeze({ active: 'en', locales: [], revision: 0 });

    const DICTIONARIES = {
      en: {
        'panel.label': 'Skills',
        title: 'Skills',
        subtitle:
          'Visible to one session, selected by its workspace and Agent preset. Invoke one with /name in the composer.',
        countSuffix: 'skills',
        sessionLabel: 'Session',
        running: 'running',
        refresh: 'Refresh',
        searchPlaceholder: 'Search skills',
        userOnly: 'user-only',
        copy: 'Copy',
        copied: 'Copied',
        loading: 'Loading…',
        retry: 'Retry',
        unavailableTitle: 'Skills are unavailable',
        unavailableHint: 'This deployment does not mount the skills remote, so no catalog can be read.',
        noSessionsTitle: 'No sessions yet',
        noSessionsHint:
          'Open or create a session first: its workspace and preset decide which skills are visible.',
        emptyTitle: 'No skills for this session',
        emptyHint:
          'Add a SKILL.md under the workspace or user skill directory, then refresh.',
        noResultsTitle: 'Nothing matches',
        noResultsHint: 'Try another keyword, or clear the search.',
        clearFilters: 'Clear search',
        errorTitle: 'Could not load skills',
        footer:
          'The catalog comes from the session workspace and preset. Invocation happens in the composer, not here.',
      },
      zh: {
        'panel.label': '技能库',
        title: '技能库',
        subtitle: '按所选会话的工作目录与 Agent 预设读取；在输入框输入 /名称 即可调用。',
        countSuffix: '个技能',
        sessionLabel: '会话',
        running: '运行中',
        refresh: '刷新',
        searchPlaceholder: '搜索技能',
        userOnly: '仅用户',
        copy: '复制',
        copied: '已复制',
        loading: '加载中…',
        retry: '重试',
        unavailableTitle: '技能目录不可用',
        unavailableHint: '当前部署没有挂载技能远程服务，无法读取技能目录。',
        noSessionsTitle: '还没有会话',
        noSessionsHint: '先打开或新建一个会话：它的工作目录与预设决定可见的技能。',
        emptyTitle: '这个会话没有可见技能',
        emptyHint: '在工作区或用户的技能目录里放一个 SKILL.md，然后刷新。',
        noResultsTitle: '没有匹配的技能',
        noResultsHint: '换个关键词，或清除搜索。',
        clearFilters: '清除搜索',
        errorTitle: '加载技能失败',
        footer: '技能目录由会话的工作目录与预设决定；调用发生在对话输入框，不在这里。',
      },
    };

    const STYLES = [
      '.dshsk-root {',
      '  box-sizing: border-box;',
      '  height: 100%;',
      '  min-height: 0;',
      '  overflow: auto;',
      '  background: var(--dsw-alias-bg-base);',
      '  color: var(--dsw-alias-label-primary);',
      '  font-size: 14px;',
      '  line-height: 1.55;',
      '}',
      '.dshsk-root *, .dshsk-root *::before, .dshsk-root *::after { box-sizing: border-box; }',
      '.dshsk-page {',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 22px;',
      '  width: 100%;',
      '  max-width: 1040px;',
      '  margin: 0 auto;',
      '  padding: 32px 28px 56px;',
      '}',
      '.dshsk-header {',
      '  display: flex;',
      '  align-items: flex-start;',
      '  justify-content: space-between;',
      '  gap: 16px;',
      '  flex-wrap: wrap;',
      '}',
      '.dshsk-heading { min-width: 0; }',
      '.dshsk-title { margin: 0; font-size: 21px; font-weight: 600; line-height: 1.3; letter-spacing: 0.01em; }',
      '.dshsk-subtitle {',
      '  margin: 6px 0 0;',
      '  max-width: 640px;',
      '  font-size: 13px;',
      '  line-height: 1.6;',
      '  color: var(--dsw-alias-label-secondary);',
      '}',
      '.dshsk-actions { display: flex; align-items: center; gap: 12px; }',
      '.dshsk-count {',
      '  font-size: 12px;',
      '  color: var(--dsw-alias-label-secondary);',
      '  font-variant-numeric: tabular-nums;',
      '  white-space: nowrap;',
      '}',
      '.dshsk-button {',
      '  appearance: none;',
      '  cursor: pointer;',
      '  font: inherit;',
      '  font-size: 13px;',
      '  line-height: 1.4;',
      '  padding: 6px 13px;',
      '  border-radius: 8px;',
      '  border: 1px solid var(--dsw-alias-border-l2);',
      '  background: transparent;',
      '  color: var(--dsw-alias-label-primary);',
      '  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;',
      '}',
      '.dshsk-button:hover { background: var(--dsw-alias-bg-layer-2); }',
      '.dshsk-button:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }',
      '.dshsk-button:disabled { opacity: 0.5; cursor: default; }',
      '.dshsk-button:disabled:hover { background: transparent; }',
      '.dshsk-toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }',
      '.dshsk-label { font-size: 12px; color: var(--dsw-alias-label-secondary); white-space: nowrap; }',
      '.dshsk-select {',
      '  flex: 0 1 260px;',
      '  min-width: 0;',
      '  padding: 8px 10px;',
      '  border: 1px solid var(--dsw-alias-border-l1);',
      '  border-radius: 9px;',
      '  background: var(--dsw-alias-bg-layer-1);',
      '  color: inherit;',
      '  font: inherit;',
      '  font-size: 13px;',
      '}',
      '.dshsk-select:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }',
      '.dshsk-search {',
      '  flex: 1 1 260px;',
      '  min-width: 0;',
      '  padding: 8px 12px;',
      '  border: 1px solid var(--dsw-alias-border-l1);',
      '  border-radius: 9px;',
      '  background: var(--dsw-alias-bg-layer-1);',
      '  color: inherit;',
      '  font: inherit;',
      '  font-size: 13px;',
      '}',
      '.dshsk-search::placeholder { color: var(--dsw-alias-label-secondary); opacity: 0.85; }',
      '.dshsk-search:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }',
      '.dshsk-grid {',
      '  display: grid;',
      '  grid-template-columns: repeat(2, minmax(0, 1fr));',
      '  gap: 10px;',
      '}',
      '.dshsk-card {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 10px;',
      '  width: 100%;',
      '  min-height: 46px;',
      '  padding: 10px 14px;',
      '  border: 1px solid var(--dsw-alias-border-l1);',
      '  border-radius: 10px;',
      '  background: var(--dsw-alias-bg-layer-1);',
      '  color: inherit;',
      '  font: inherit;',
      '  text-align: left;',
      '  cursor: pointer;',
      '  transition: background-color 120ms ease, border-color 120ms ease;',
      '}',
      '.dshsk-card:hover { background: var(--dsw-alias-bg-layer-2); border-color: var(--dsw-alias-border-l2); }',
      '.dshsk-card:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }',
      '.dshsk-name {',
      '  flex: 1 1 auto;',
      '  min-width: 0;',
      '  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;',
      '  font-size: 13px;',
      '  line-height: 1.6;',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '}',
      '.dshsk-name-mark { margin-right: 1px; color: var(--dsw-alias-label-secondary); }',
      '.dshsk-hint {',
      '  flex: none;',
      '  font-size: 11px;',
      '  color: var(--dsw-alias-label-secondary);',
      '  opacity: 0;',
      '  transition: opacity 120ms ease, color 120ms ease;',
      '}',
      '.dshsk-card:hover .dshsk-hint,',
      '.dshsk-card:focus-visible .dshsk-hint { opacity: 1; }',
      '.dshsk-card--copied { border-color: var(--dsw-alias-brand-primary); }',
      '.dshsk-card--copied .dshsk-hint { opacity: 1; color: var(--dsw-alias-brand-primary); }',
      '.dshsk-notice {',
      '  display: flex;',
      '  flex-direction: column;',
      '  align-items: center;',
      '  gap: 10px;',
      '  padding: 48px 24px;',
      '  border: 1px dashed var(--dsw-alias-border-l2);',
      '  border-radius: 14px;',
      '  text-align: center;',
      '  color: var(--dsw-alias-label-secondary);',
      '}',
      '.dshsk-notice-icon { color: var(--dsw-alias-label-secondary); opacity: 0.5; }',
      '.dshsk-notice-title { font-size: 14px; font-weight: 600; color: var(--dsw-alias-label-primary); }',
      '.dshsk-notice-hint { margin: 0; max-width: 420px; font-size: 13px; }',
      '.dshsk-notice-error {',
      '  margin: 0;',
      '  max-width: 520px;',
      '  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;',
      '  font-size: 12px;',
      '  color: var(--dsw-alias-state-error-primary);',
      '  word-break: break-word;',
      '}',
      '.dshsk-notice .dshsk-button { margin-top: 6px; }',
      '.dshsk-loading { padding: 42px 24px; text-align: center; font-size: 13px; color: var(--dsw-alias-label-secondary); }',
      '.dshsk-foot { margin: 2px 0 0; font-size: 12px; color: var(--dsw-alias-label-secondary); }',
      '@media (max-width: 760px) { .dshsk-grid { grid-template-columns: minmax(0, 1fr); } }',
      '@media (max-width: 620px) { .dshsk-page { padding: 22px 16px 44px; } }',
    ].join('\n');

    function readLocaleSnapshot(ctx) {
      const locale = ctx.get('locale');
      if (!locale || typeof locale.getSnapshot !== 'function') return FALLBACK_SNAPSHOT;
      try {
        return locale.getSnapshot() || FALLBACK_SNAPSHOT;
      } catch (_error) {
        return FALLBACK_SNAPSHOT;
      }
    }

    function createTranslator(ctx) {
      const locale = ctx.get('locale');
      let bound = null;
      if (locale && typeof locale.bind === 'function') {
        try {
          bound = locale.bind(NAMESPACE);
        } catch (_error) {
          bound = null;
        }
      }
      return function translate(key) {
        if (bound) {
          try {
            const value = bound(key);
            if (typeof value === 'string' && value.length > 0 && value !== key) return value;
          } catch (_error) {
            /* fall through to the built-in dictionary */
          }
        }
        const active = readLocaleSnapshot(ctx).active;
        const dictionary = /^zh/i.test(String(active)) ? DICTIONARIES.zh : DICTIONARIES.en;
        return dictionary[key] || DICTIONARIES.en[key] || key;
      };
    }

    function registerDictionaries(ctx) {
      const locale = ctx.get('locale');
      if (!locale || typeof locale.register !== 'function') return;
      ctx.effect(() => {
        const disposers = [];
        for (const localeId of Object.keys(DICTIONARIES)) {
          try {
            const dispose = locale.register(NAMESPACE, localeId, DICTIONARIES[localeId]);
            if (typeof dispose === 'function') disposers.push(dispose);
          } catch (error) {
            console.warn(`[skill-catalog] could not register the ${localeId} dictionary`, error);
          }
        }
        return () => {
          for (const dispose of disposers) {
            try {
              dispose();
            } catch (_error) {
              /* already disposed */
            }
          }
        };
      }, 'skill-catalog-locale');
    }

    /** Resolve a dotted service key directly, then through its parent facade. */
    function resolveService(ctx, key) {
      try {
        const direct = ctx.get(key);
        if (direct) return direct;
      } catch (_error) {
        /* not provided under the full key */
      }
      const dot = key.indexOf('.');
      if (dot > 0) {
        try {
          const parent = ctx.get(key.slice(0, dot));
          if (parent) {
            const child = parent[key.slice(dot + 1)];
            if (child) return child;
          }
        } catch (_error) {
          /* parent facade unavailable */
        }
      }
      return undefined;
    }

    function messageOf(error) {
      if (!error) return 'unknown error';
      if (typeof error === 'string') return error;
      if (typeof error.message === 'string' && error.message.length > 0) return error.message;
      return String(error);
    }

    function failureOf(result) {
      if (!result || typeof result !== 'object') return 'empty response';
      if (result.ok === false && result.error) {
        const code = typeof result.error.code === 'string' ? result.error.code : 'remote/error';
        const message = typeof result.error.message === 'string' ? result.error.message : 'request failed';
        return `${code}: ${message}`;
      }
      return 'request failed';
    }

    function describeSession(summary, runningLabel) {
      const values = (summary && summary.projections && summary.projections.values) || {};
      const title = typeof values.title === 'string' ? values.title.trim() : '';
      const cwd =
        summary && typeof summary.cwd === 'string' && summary.cwd.length > 0
          ? summary.cwd
          : typeof values.workingDirectory === 'string'
            ? values.workingDirectory
            : '';
      const base = cwd ? cwd.replace(/[\\/]+$/, '').split(/[\\/]/).pop() : '';
      const name = title || base || `#${String((summary && summary.sessionId) || '').slice(0, 8)}`;
      return summary && summary.running ? `${name} · ${runningLabel}` : name;
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        registerDictionaries(ctx);
        const t = createTranslator(ctx);

        /** Icon cell of the sidebar panel list; the sidebar owns the button. */
        function SkillIcon(props) {
          const size = props && Number.isFinite(props.size) ? props.size : 20;
          const active = !!(props && props.active);
          return h(
            'svg',
            {
              className: (props && props.className) || undefined,
              width: size,
              height: size,
              viewBox: '0 0 24 24',
              fill: 'none',
              'aria-hidden': 'true',
              focusable: 'false',
              style: { display: 'block' },
            },
            h('path', {
              d: 'M12 2.8 13.9 10.1 21.2 12 13.9 13.9 12 21.2 10.1 13.9 2.8 12 10.1 10.1Z',
              fill: active ? 'currentColor' : 'none',
              fillOpacity: active ? 0.16 : 0,
              stroke: 'currentColor',
              strokeWidth: 1.3,
              strokeLinejoin: 'round',
            }),
            h('path', {
              d: 'M18.6 15.4 19.3 17.7 21.6 18.4 19.3 19.1 18.6 21.4 17.9 19.1 15.6 18.4 17.9 17.7Z',
              fill: 'currentColor',
              opacity: 0.75,
            }),
          );
        }

        function SkillPanel() {
          const [sessions, setSessions] = React.useState(null);
          const [sessionId, setSessionId] = React.useState(null);
          const [skills, setSkills] = React.useState(null);
          const [error, setError] = React.useState(null);
          const [unavailable, setUnavailable] = React.useState(false);
          const [query, setQuery] = React.useState('');
          const [refreshToken, setRefreshToken] = React.useState(0);
          const [copiedName, setCopiedName] = React.useState(null);
          const [, setLocaleTick] = React.useState(0);

          // `t` reads the active locale at call time; this subscription makes a
          // locale switch re-render the already-mounted panel.
          React.useEffect(() => {
            const locale = ctx.get('locale');
            if (!locale || typeof locale.subscribe !== 'function') return undefined;
            return locale.subscribe(() => setLocaleTick((value) => value + 1));
          }, []);

          React.useEffect(() => {
            if (!copiedName) return undefined;
            const timer = window.setTimeout(() => setCopiedName(null), 1600);
            return () => window.clearTimeout(timer);
          }, [copiedName]);

          // Skill providers change with plugin installation and preset switches;
          // a connection reset drops the Remote cache. Re-read in all three cases.
          React.useEffect(() => {
            const disposers = [];
            const bump = () => setRefreshToken((value) => value + 1);
            try {
              const remote = resolveService(ctx, 'remote');
              if (remote && typeof remote.$on === 'function') {
                disposers.push(remote.$on('plugin-manager/changed', bump));
                disposers.push(remote.$on('agent-preset/selected', bump));
              }
            } catch (_error) {
              /* forwarded events are optional */
            }
            if (typeof ctx.on === 'function') {
              disposers.push(ctx.on('connection/reset', bump));
            }
            return () => {
              for (const dispose of disposers) {
                try {
                  dispose();
                } catch (_error) {
                  /* already disposed */
                }
              }
            };
          }, []);

          // Session rows: the catalog is read per session, so list them first.
          React.useEffect(() => {
            const sessionRemote = resolveService(ctx, 'remote.session');
            if (!sessionRemote) {
              setUnavailable(true);
              setSessions([]);
              return undefined;
            }
            let cancelled = false;
            const controller = new AbortController();
            setError(null);
            setSessions(null);
            setSkills(null);
            (async () => {
              try {
                const result = await sessionRemote.list({}, controller.signal);
                if (cancelled) return;
                if (!result || result.ok !== true) throw new Error(failureOf(result));
                const items =
                  result.value && Array.isArray(result.value.items) ? result.value.items : [];
                const visible = items.filter((item) => item && item.origin !== 'subagent');
                setSessions(visible);
                setSessionId((current) => {
                  if (current && visible.some((item) => item.sessionId === current)) return current;
                  const preferred = visible.find((item) => item.blank !== true) || visible[0];
                  return preferred ? preferred.sessionId : null;
                });
              } catch (cause) {
                if (cancelled) return;
                setError(messageOf(cause));
                setSessions([]);
              }
            })();
            return () => {
              cancelled = true;
              controller.abort();
            };
          }, [refreshToken]);

          // Skills for the selected session; the Host resolves cwd and preset
          // without activating a cold Agent.
          React.useEffect(() => {
            if (!sessionId) {
              setSkills(null);
              return undefined;
            }
            const skillsRemote = resolveService(ctx, 'remote.skills');
            if (!skillsRemote) {
              setUnavailable(true);
              return undefined;
            }
            let cancelled = false;
            const controller = new AbortController();
            setSkills(null);
            setError(null);
            skillsRemote.list({ sessionId }, controller.signal).then(
              (result) => {
                if (cancelled) return;
                if (!result || result.ok !== true) {
                  setError(failureOf(result));
                  setSkills([]);
                  return;
                }
                const list =
                  result.value && Array.isArray(result.value.skills) ? result.value.skills : [];
                setSkills(list);
              },
              (cause) => {
                if (cancelled) return;
                setError(messageOf(cause));
                setSkills([]);
              },
            );
            return () => {
              cancelled = true;
              controller.abort();
            };
          }, [sessionId, refreshToken]);

          const copyText = (text) => {
            const clipboard = typeof navigator === 'undefined' ? undefined : navigator.clipboard;
            if (!clipboard || typeof clipboard.writeText !== 'function') return;
            clipboard.writeText(text).then(
              () => {},
              () => {},
            );
          };

          const copySkill = (skill) => {
            copyText(`/${skill.name}`);
            setCopiedName(skill.name);
          };

          const refresh = () => {
            setError(null);
            setQuery('');
            setRefreshToken((value) => value + 1);
          };

          const normalizedQuery = query.trim().toLowerCase();
          const filtering = normalizedQuery.length > 0;
          const filtered = (skills || []).filter((skill) => {
            if (!normalizedQuery) return true;
            return skill.name.toLowerCase().includes(normalizedQuery);
          });

          const renderNotice = (title, hint, extra) =>
            h(
              'section',
              { className: 'dshsk-notice' },
              h(SkillIcon, { size: 38, className: 'dshsk-notice-icon' }),
              h('div', { className: 'dshsk-notice-title' }, title),
              h('p', { className: 'dshsk-notice-hint' }, hint),
              extra || null,
            );

          const renderLoading = () => h('div', { className: 'dshsk-loading' }, t('loading'));

          const renderError = () =>
            h(
              'section',
              { className: 'dshsk-notice' },
              h('div', { className: 'dshsk-notice-title' }, t('errorTitle')),
              h('p', { className: 'dshsk-notice-error' }, error),
              h(
                'button',
                { type: 'button', className: 'dshsk-button', onClick: refresh },
                t('retry'),
              ),
            );

          const renderSkill = (skill) => {
            const copied = copiedName === skill.name;
            const tooltip = [skill.description, skill.whenToUse]
              .concat(skill.modelInvocable === false ? [t('userOnly')] : [])
              .filter((part) => typeof part === 'string' && part.length > 0)
              .join(' · ');
            return h(
              'button',
              {
                key: skill.name,
                type: 'button',
                className: `dshsk-card${copied ? ' dshsk-card--copied' : ''}`,
                title: tooltip || undefined,
                'aria-label': `/${skill.name}`,
                onClick: () => copySkill(skill),
              },
              h(
                'span',
                { className: 'dshsk-name' },
                h('span', { className: 'dshsk-name-mark' }, '/'),
                skill.name,
              ),
              h('span', { className: 'dshsk-hint' }, copied ? t('copied') : t('copy')),
            );
          };

          const hasToolbar = sessions !== null && sessions.length > 0;
          let content;
          if (unavailable) {
            content = renderNotice(t('unavailableTitle'), t('unavailableHint'));
          } else if (error) {
            content = renderError();
          } else if (sessions === null) {
            content = renderLoading();
          } else if (sessions.length === 0) {
            content = renderNotice(t('noSessionsTitle'), t('noSessionsHint'));
          } else if (skills === null) {
            content = renderLoading();
          } else if (skills.length === 0) {
            content = renderNotice(t('emptyTitle'), t('emptyHint'));
          } else if (filtered.length === 0) {
            content = renderNotice(
              t('noResultsTitle'),
              t('noResultsHint'),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dshsk-button',
                  onClick: () => setQuery(''),
                },
                t('clearFilters'),
              ),
            );
          } else {
            content = h('div', { className: 'dshsk-grid' }, filtered.map(renderSkill));
          }

          return h(
            'div',
            { className: 'dshsk-root' },
            h('style', { key: 'dshsk-styles' }, STYLES),
            h(
              'div',
              { className: 'dshsk-page' },
              h(
                'header',
                { className: 'dshsk-header' },
                h(
                  'div',
                  { className: 'dshsk-heading' },
                  h('h1', { className: 'dshsk-title' }, t('title')),
                  h('p', { className: 'dshsk-subtitle' }, t('subtitle')),
                ),
                h(
                  'div',
                  { className: 'dshsk-actions' },
                  skills !== null
                    ? h(
                        'span',
                        { className: 'dshsk-count' },
                        filtering
                          ? `${filtered.length} / ${skills.length}`
                          : `${skills.length} ${t('countSuffix')}`,
                      )
                    : null,
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dshsk-button',
                      onClick: refresh,
                      disabled: sessions === null,
                    },
                    t('refresh'),
                  ),
                ),
              ),
              hasToolbar
                ? h(
                    'div',
                    { className: 'dshsk-toolbar' },
                    h('label', { className: 'dshsk-label', htmlFor: 'dshsk-session' }, t('sessionLabel')),
                    h(
                      'select',
                      {
                        id: 'dshsk-session',
                        className: 'dshsk-select',
                        value: sessionId || '',
                        onChange: (event) => setSessionId(event.target.value),
                      },
                      sessions.map((session) =>
                        h(
                          'option',
                          { key: session.sessionId, value: session.sessionId },
                          describeSession(session, t('running')),
                        ),
                      ),
                    ),
                    h('input', {
                      className: 'dshsk-search',
                      type: 'text',
                      value: query,
                      placeholder: t('searchPlaceholder'),
                      'aria-label': t('searchPlaceholder'),
                      onChange: (event) => setQuery(event.target.value),
                      onKeyDown: (event) => {
                        if (event.key === 'Escape') setQuery('');
                      },
                    }),
                  )
                : null,
              content,
              h('p', { className: 'dshsk-foot' }, t('footer')),
            ),
          );
        }

        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: PANEL_ID,
              order: 40,
              label: () => t('panel.label'),
            },
            SkillIcon,
          ),
        );

        ctx.slots.inject('main', () =>
          ctx.slots.register(
            {
              name: 'main',
              key: PANEL_ID,
            },
            SkillPanel,
          ),
        );
      },
    };
  },
});
