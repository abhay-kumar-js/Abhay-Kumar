import React, { useState, useEffect } from 'react';
import { Save, Check, AlertCircle, X, Globe, Sliders } from 'lucide-react';
import { api } from '../../services/api.js';
import Loader from '../../components/Loader.jsx';

export const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  const [formData, setFormData] = useState({
    name: 'Abhay Kumar',
    title: 'Web Developer / MERN Stack Developer',
    description: '',
    about: '',
    email: '',
    phone: '',
    location: 'India',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
    seoTitle: '',
    seoDescription: '',
  });

  useEffect(() => {
    document.title = 'Site Configuration | Admin CMS';

    const loadSettings = async () => {
      try {
        const res = await api.settings.get();
        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            ...res.data,
            socialLinks: {
              ...prev.socialLinks,
              ...(res.data.socialLinks || {}),
            },
          }));
        }
      } catch (err) {
        setActionError(err.message || 'Failed to load site configuration');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setActionSuccess('');
    setActionError('');

    try {
      const res = await api.settings.update(formData);
      if (res.success) {
        setActionSuccess('Site configuration saved successfully.');
      } else {
        setActionError(res.message || 'Failed to update settings');
      }
    } catch (err) {
      setActionError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader message="Loading site settings..." size="large" />;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Site Settings &amp; SEO
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Manage global developer identity, contact endpoints, social URLs, and metadata.
          </p>
        </div>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Profile */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0F1D] border border-slate-800 space-y-5">
          <h2 className="text-base font-bold font-display text-white pb-3 border-b border-slate-800 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Developer Profile &amp; Bio</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
              Hero Supporting Text
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
              About Section Paragraph
            </label>
            <textarea
              rows={3}
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Contact Endpoints */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0F1D] border border-slate-800 space-y-5">
          <h2 className="text-base font-bold font-display text-white pb-3 border-b border-slate-800">
            Official Contact Endpoints (Configurable)
          </h2>
          <p className="text-xs text-slate-400">
            Enter your real contact details here when ready. Left blank by default to avoid fake contact information.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. contact@abhaykumar.dev"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                Official Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                Base Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Accounts */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0F1D] border border-slate-800 space-y-5">
          <h2 className="text-base font-bold font-display text-white pb-3 border-b border-slate-800">
            Social &amp; Developer Profiles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.github || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, github: e.target.value },
                  })
                }
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                  })
                }
                placeholder="https://x.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.instagram || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Metadata */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0F1D] border border-slate-800 space-y-5">
          <h2 className="text-base font-bold font-display text-white pb-3 border-b border-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Search Engine Optimization (SEO)</span>
          </h2>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
              Default Document Title
            </label>
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.seoDescription}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Site Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
