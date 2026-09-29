import React, { useState, useEffect } from 'react';
import {
  GitBranch,
  GitCommit,
  Star,
  ExternalLink,
  Code2,
  RefreshCw,
  Sparkles,
  GitFork,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { api } from '../services/api.js';

export const GitHubActivitySection = () => {
  const [username, setUsername] = useState('abhay-kumar-js');
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [filterLang, setFilterLang] = useState('ALL');

  const fetchActivity = async (targetUser = username, isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await api.github.getActivity(targetUser);
      if (res.success && res.data) {
        setActivityData(res.data);
      } else {
        setError('Unable to load GitHub data');
      }
    } catch (err) {
      console.error('Failed to fetch GitHub activity:', err);
      setError('Could not connect to GitHub API. Showing local archive.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchActivity(username);
  }, []);

  const profile = activityData?.profile;
  const stats = activityData?.stats;
  const repos = activityData?.repos || [];

  const languages = ['ALL', ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const filteredRepos =
    filterLang === 'ALL'
      ? repos
      : repos.filter((r) => r.language?.toLowerCase() === filterLang.toLowerCase());

  // Generate mock contribution cells for high-density matrix visualization
  const getContributionColor = (seed) => {
    const val = (seed * 37) % 10;
    if (val > 7) return 'bg-blue-500';
    if (val > 4) return 'bg-blue-600/70';
    if (val > 2) return 'bg-blue-800/50';
    if (val > 0) return 'bg-blue-950/60 border border-blue-900/40';
    return 'bg-slate-200 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800/40';
  };

  return (
    <section className="relative py-12 sm:py-16" aria-label="GitHub Development Activity">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>Live Development Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              GitHub Activity &amp; Open Source
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Continuous commit cadence, active open-source repositories, and verified full-stack architecture on GitHub.
            </p>
          </div>

          {/* Quick Profile Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchActivity(username, true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-mono transition-all cursor-pointer disabled:opacity-50 shadow-sm"
              title="Refresh repository data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-blue-500' : ''}`} />
              <span className="hidden sm:inline">Sync Activity</span>
            </button>

            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-md shadow-blue-600/20"
            >
              <span>GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Profile Card & Language Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Profile Summary Card */}
          <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:to-[#0A0E1A] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-md shadow-slate-900/5 dark:shadow-xl">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={profile?.avatarUrl || 'https://avatars.githubusercontent.com/u/150480377?v=4'}
                      alt={profile?.login || 'Abhay Kumar'}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shadow-md"
                      onError={(e) => {
                        e.target.src = 'https://avatars.githubusercontent.com/u/150480377?v=4';
                      }}
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0F172A]" title="Active committer" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                      {profile?.name || 'Abhay Kumar'}
                    </h3>
                    <a
                      href={profile?.htmlUrl || `https://github.com/${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      @{profile?.login || username}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 font-semibold">
                  Verified Dev
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {profile?.bio ||
                  "Hi, I'm a MERN-Stack-Developer. I build with JavaScript, React.js, Next.js, Node.js, Shopify, WordPress & Tailwind CSS."}
              </p>
            </div>

            {/* Micro Stats Grid */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <p className="text-lg font-bold text-slate-900 dark:text-white font-display">{stats?.totalRepos || 38}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Public Repos</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <p className="text-lg font-bold text-amber-500 dark:text-amber-400 font-display">{stats?.totalStars || 18}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Stars</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400 font-display">{activityData?.streak?.totalContributions || '380+'}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Commits / Yrs</p>
              </div>
            </div>
          </div>

          {/* Right: Contribution Heatmap Preview & Language Distribution */}
          <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:to-[#0A0E1A] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-md shadow-slate-900/5 dark:shadow-xl">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Contribution Timeline
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-200 dark:bg-blue-950/60" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-400 dark:bg-blue-800/60" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 dark:bg-blue-600/80" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-700 dark:bg-blue-500" />
                  </div>
                  <span>More</span>
                </div>
              </div>

              {/* Dynamic SVG / Matrix Chart */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070B14] border border-slate-200 dark:border-slate-800/80 overflow-x-auto">
                <div className="min-w-[620px]">
                  {/* Contribution Graph Embedded SVG with direct fallback to CSS grid */}
                  <img
                    src={`https://ghchart.rshah.org/3b82f6/${username}`}
                    alt={`${username} GitHub Contribution Heatmap`}
                    className="w-full h-auto rounded"
                    onError={(e) => {
                      // If external chart service is slow or unreachable, show high-density native activity grid
                      e.target.style.display = 'none';
                      const fallbackGrid = document.getElementById('gh-fallback-grid');
                      if (fallbackGrid) fallbackGrid.style.display = 'grid';
                    }}
                  />

                  {/* Accessible native contribution matrix fallback */}
                  <div id="gh-fallback-grid" className="hidden grid-flow-col grid-rows-7 gap-1 h-28 w-full">
                    {[...Array(52 * 7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-xs transition-colors hover:scale-125 ${getContributionColor(i)}`}
                        title={`Day ${i + 1}: Activity logged`}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/60">
                    <span>Active development cadence across repositories</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">100% Automated CI/CD &amp; Clean Code</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Breakdown Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Primary Codebase Stacks:</span>
                <span className="text-slate-800 dark:text-slate-300 font-semibold">MERN &bull; Java &bull; Web</span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-900 overflow-hidden flex">
                {(stats?.topLanguages || []).map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percentage}%`}
                    className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                {(stats?.topLanguages || []).map((lang) => (
                  <div key={lang.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{lang.name}</span>
                    <span className="text-slate-500">({lang.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Repositories Activity Cards */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-slate-900 dark:text-white">
                Featured Repositories &amp; Public Code
              </h3>
            </div>

            {/* Language Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilterLang(lang)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                    filterLang.toLowerCase() === lang.toLowerCase()
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-800 shadow-xs'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Repository Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRepos.map((repo) => (
              <a
                key={repo.id || repo.name}
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl bg-white dark:bg-[#0D1322] border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/50 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <GitBranch className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0 group-hover:rotate-12 transition-transform" />
                      <h4 className="font-mono text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {repo.name}
                      </h4>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {repo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          repo.language === 'JavaScript'
                            ? '#f7df1e'
                            : repo.language === 'TypeScript'
                            ? '#3178c6'
                            : repo.language === 'Java'
                            ? '#b07219'
                            : '#60a5fa',
                      }}
                    />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                        <Star className="w-3 h-3 text-amber-500" />
                        <span>{repo.stars}</span>
                      </span>
                    )}
                    {repo.forks > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-slate-400" />
                        <span>{repo.forks}</span>
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">
                      {repo.updatedAt ? new Date(repo.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Recent'}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivitySection;
