import React, { useState, useEffect } from 'react';
import {
  Mail,
  CheckCircle,
  Archive,
  Trash2,
  Phone,
  Calendar,
  AlertCircle,
  Check,
  X,
  MessageSquare,
  Database,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  RefreshCw,
} from 'lucide-react';
import { api } from '../../services/api.js';
import Loader from '../../components/Loader.jsx';

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [dbStatus, setDbStatus] = useState(null);
  const [showAtlasGuide, setShowAtlasGuide] = useState(false);
  const [copiedUri, setCopiedUri] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [messagesRes, healthRes] = await Promise.all([
        api.contact.getAll().catch(() => ({ data: [] })),
        api.health().catch(() => null),
      ]);
      if (messagesRes?.data) setMessages(messagesRes.data);
      if (healthRes?.database) setDbStatus(healthRes.database);
    } catch (err) {
      setActionError(err.message || 'Failed to fetch contact inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Inquiries & Messages | Admin CMS';
    loadData();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.contact.updateStatus(id, newStatus);
      setActionSuccess(`Message updated to '${newStatus}'`);
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to update message status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this message?')) return;

    try {
      await api.contact.delete(id);
      setActionSuccess('Message deleted.');
      loadData();
    } catch (err) {
      setActionError(err.message || 'Failed to delete message');
    }
  };

  const copyUriTemplate = () => {
    const template = 'MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/abhay_portfolio?retryWrites=true&w=majority';
    navigator.clipboard.writeText(template);
    setCopiedUri(true);
    setTimeout(() => setCopiedUri(false), 2500);
  };

  const filteredMessages =
    filter === 'all' ? messages : messages.filter((m) => m.status === filter);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Client Inquiries &amp; Messages
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Review incoming project briefs, contact requests, and client submissions.
          </p>
        </div>

        {/* Filter controls & refresh */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadData}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh Inquiries"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {['all', 'new', 'read', 'replied', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                  filter === status
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MongoDB Atlas Database Status Banner */}
      <div className={`p-4 rounded-xl border text-xs ${
        dbStatus?.connected
          ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-300'
          : 'bg-amber-950/30 border-amber-800/80 text-amber-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Database className={`w-4 h-4 ${dbStatus?.connected ? 'text-emerald-400' : 'text-amber-400'}`} />
            <div>
              <span className="font-bold">
                {dbStatus?.connected ? 'Connected to MongoDB Atlas' : 'Running with Local Storage (MongoDB Atlas Not Connected)'}
              </span>
              <p className="text-[11px] opacity-80 mt-0.5 font-mono">
                {dbStatus?.connected
                  ? `Active Database: ${dbStatus.dbName} • Collection: contactmessages`
                  : 'Messages are stored in memory. To persist directly into MongoDB Atlas, configure MONGODB_URI.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAtlasGuide(!showAtlasGuide)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 text-white font-mono text-[11px] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>{showAtlasGuide ? 'Hide Setup Guide' : 'MongoDB Atlas Setup Guide'}</span>
            {showAtlasGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Atlas Setup Instructions */}
        {showAtlasGuide && (
          <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3 font-sans text-slate-300">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              How to Connect Contact Form to MongoDB Atlas in 4 Steps:
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed">
              <li>
                <strong>Create Cluster:</strong> Log in to{' '}
                <a
                  href="https://cloud.mongodb.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline inline-flex items-center gap-0.5"
                >
                  cloud.mongodb.com <ExternalLink className="w-3 h-3" />
                </a>{' '}
                and create a free M0 cluster (takes ~1 minute).
              </li>
              <li>
                <strong>Create Database User:</strong> Go to <em>Database Access</em> &rarr; <em>Add New Database User</em> (e.g. username <code>abhay_admin</code> and generate a password).
              </li>
              <li>
                <strong>Whitelist IP:</strong> Under <em>Network Access</em> &rarr; <em>Add IP Address</em>, select <em>Allow Access from Anywhere</em> (<code>0.0.0.0/0</code>) so the cloud server can connect.
              </li>
              <li>
                <strong>Get Connection String:</strong> Click <em>Connect</em> on your cluster &rarr; <em>Drivers (Node.js)</em> &rarr; copy the URI format:
              </li>
            </ol>

            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 flex items-center justify-between gap-3 font-mono text-[11px] text-emerald-400 overflow-x-auto">
              <code>MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.xxxxx.mongodb.net/abhay_portfolio?retryWrites=true&amp;w=majority</code>
              <button
                onClick={copyUriTemplate}
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs transition-colors"
                title="Copy template"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedUri ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Replace <code>&lt;username&gt;</code> and <code>&lt;password&gt;</code> with your Atlas credentials. Once set in your environment, the server automatically routes all contact form submissions into your Atlas <code>contactmessages</code> collection!
            </p>
          </div>
        )}
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess('')} className="p-1 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{actionError}</span>
          </div>
          <button onClick={() => setActionError('')} className="p-1 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Messages List */}
      {loading ? (
        <Loader message="Loading messages..." size="large" />
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-16 p-8 bg-[#0A0F1D] border border-slate-800 rounded-2xl">
          <Mail className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-mono text-slate-400">
            No messages found under "{filter}".
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className="p-6 rounded-2xl bg-[#0A0F1D] border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                    {msg.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white">{msg.name}</h3>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                          msg.status === 'new'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : msg.status === 'replied'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : msg.status === 'archived'
                            ? 'bg-slate-800 text-slate-400'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mt-0.5">
                      <a href={`mailto:${msg.email}`} className="text-blue-400 hover:underline">
                        {msg.email}
                      </a>
                      {msg.phone && (
                        <span className="flex items-center gap-1 text-slate-300">
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span>{msg.phone}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-slate-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Service & Content */}
              <div>
                <div className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-blue-300 mb-2">
                  Requested Service: <strong className="text-white">{msg.service}</strong>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">Mark as:</span>
                  {msg.status !== 'read' && (
                    <button
                      onClick={() => handleUpdateStatus(msg._id, 'read')}
                      className="px-2.5 py-1 rounded text-[11px] font-mono text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 cursor-pointer"
                    >
                      Read
                    </button>
                  )}
                  {msg.status !== 'replied' && (
                    <button
                      onClick={() => handleUpdateStatus(msg._id, 'replied')}
                      className="px-2.5 py-1 rounded text-[11px] font-mono text-blue-300 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-800 cursor-pointer"
                    >
                      Replied
                    </button>
                  )}
                  {msg.status !== 'archived' && (
                    <button
                      onClick={() => handleUpdateStatus(msg._id, 'archived')}
                      className="px-2.5 py-1 rounded text-[11px] font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
                    >
                      Archive
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${msg.email}?subject=Regarding your inquiry on Abhay Kumar Portfolio`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                  >
                    <span>Reply via Email</span>
                    <Mail className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
