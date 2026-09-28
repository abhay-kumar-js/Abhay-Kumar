import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Boxes,
  Mail,
  Star,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Plus,
  Clock,
} from 'lucide-react';
import { api } from '../../services/api.js';
import Loader from '../../components/Loader.jsx';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalServices: 0,
    newMessages: 0,
    readMessages: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard | Admin CMS';

    const loadDashboardData = async () => {
      try {
        const [projRes, servRes, msgRes] = await Promise.all([
          api.projects.getAll().catch(() => ({ data: [] })),
          api.services.getAll().catch(() => ({ data: [] })),
          api.contact.getAll().catch(() => ({ data: [] })),
        ]);

        const projects = projRes.data || [];
        const services = servRes.data || [];
        const messages = msgRes.data || [];

        setStats({
          totalProjects: projects.length,
          featuredProjects: projects.filter((p) => p.featured).length,
          totalServices: services.length,
          newMessages: messages.filter((m) => m.status === 'new').length,
          readMessages: messages.filter((m) => m.status === 'read' || m.status === 'replied')
            .length,
        });

        setRecentProjects(projects.slice(0, 4));
        setRecentMessages(messages.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <Loader message="Loading dashboard metrics..." size="large" />;
  }

  const statCards = [
    {
      label: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderGit2,
      color: 'text-blue-400',
      bg: 'bg-blue-600/10 border-blue-500/20',
      link: '/admin/projects',
    },
    {
      label: 'Featured Projects',
      value: stats.featuredProjects,
      icon: Star,
      color: 'text-amber-400',
      bg: 'bg-amber-600/10 border-amber-500/20',
      link: '/admin/projects',
    },
    {
      label: 'Total Services',
      value: stats.totalServices,
      icon: Boxes,
      color: 'text-cyan-400',
      bg: 'bg-cyan-600/10 border-cyan-500/20',
      link: '/admin/services',
    },
    {
      label: 'New Messages',
      value: stats.newMessages,
      icon: Mail,
      color: 'text-emerald-400',
      bg: 'bg-emerald-600/10 border-emerald-500/20',
      link: '/admin/messages',
    },
    {
      label: 'Processed Messages',
      value: stats.readMessages,
      icon: CheckCircle,
      color: 'text-purple-400',
      bg: 'bg-purple-600/10 border-purple-500/20',
      link: '/admin/messages',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Welcome back to your portfolio management control center.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className="p-5 rounded-2xl bg-[#0A0F1D] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl border ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold font-display text-white tabular-nums">
                  {card.value}
                </p>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content Split: Recent Inquiries + Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Inquiries */}
        <div className="lg:col-span-7 bg-[#0A0F1D] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold font-display text-white">Recent Inquiries</h2>
              <p className="text-xs text-slate-400 font-mono">Latest submissions via contact form</p>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-mono text-blue-400 hover:text-blue-300 font-semibold"
            >
              View all →
            </Link>
          </div>

          {recentMessages.length > 0 ? (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white truncate">{msg.name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                          msg.status === 'new'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : msg.status === 'replied'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{msg.message}</p>
                    <p className="text-[11px] font-mono text-slate-500">
                      Service: <span className="text-slate-300">{msg.service}</span> · {msg.email}
                    </p>
                  </div>

                  <Link
                    to="/admin/messages"
                    className="text-xs font-mono text-blue-400 hover:underline shrink-0"
                  >
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 font-mono py-8 text-center">
              No inquiries received yet.
            </p>
          )}
        </div>

        {/* Right: Recent Projects */}
        <div className="lg:col-span-5 bg-[#0A0F1D] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold font-display text-white">Recent Projects</h2>
              <p className="text-xs text-slate-400 font-mono">Portfolio entries</p>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs font-mono text-blue-400 hover:text-blue-300 font-semibold"
            >
              Manage all →
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project._id || project.slug}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-xs text-white truncate">{project.title}</p>
                    {project.featured && (
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 truncate">
                    {project.category}
                  </p>
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
