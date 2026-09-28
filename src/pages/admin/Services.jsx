import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Code2,
} from 'lucide-react';
import { api } from '../../services/api.js';
import Loader from '../../components/Loader.jsx';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    icon: 'Code2',
    features: '',
    order: 1,
    active: true,
  });

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await api.services.getAll();
      if (res.data) setServices(res.data);
    } catch (err) {
      setActionError(err.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Manage Services | Admin CMS';
    loadServices();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      icon: 'Code2',
      features: 'Full-stack delivery, REST APIs, Responsive UI',
      order: services.length + 1,
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      icon: service.icon || 'Code2',
      features: Array.isArray(service.features)
        ? service.features.join('\n')
        : service.features || '',
      order: service.order || 0,
      active: service.active !== false,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionError('');
    setActionSuccess('');

    try {
      const payload = {
        ...formData,
        features: formData.features
          .split(/[\n,]/)
          .map((f) => f.trim())
          .filter(Boolean),
        order: Number(formData.order) || 0,
        active: Boolean(formData.active),
      };

      if (editingService) {
        await api.services.update(editingService._id || editingService.slug, payload);
        setActionSuccess(`Service "${payload.title}" updated successfully.`);
      } else {
        await api.services.create(payload);
        setActionSuccess(`Service "${payload.title}" created successfully.`);
      }

      setIsModalOpen(false);
      loadServices();
    } catch (err) {
      setActionError(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (service) => {
    if (!window.confirm(`Are you sure you want to delete "${service.title}"?`)) return;

    try {
      await api.services.delete(service._id || service.slug);
      setActionSuccess(`Service "${service.title}" deleted.`);
      loadServices();
    } catch (err) {
      setActionError(err.message || 'Failed to delete service');
    }
  };

  const handleToggleActive = async (service) => {
    try {
      await api.services.update(service._id || service.slug, {
        active: !service.active,
      });
      loadServices();
    } catch (err) {
      setActionError(err.message || 'Failed to toggle service status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Services Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Configure client service offerings, feature checklists, and active status.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
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

      {/* Services Table */}
      {loading ? (
        <Loader message="Loading services..." size="large" />
      ) : services.length === 0 ? (
        <div className="text-center py-16 p-8 bg-[#0A0F1D] border border-slate-800 rounded-2xl">
          <p className="text-sm font-mono text-slate-400">No services found. Click "Add New Service" to create one.</p>
        </div>
      ) : (
        <div className="bg-[#0A0F1D] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Order</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Icon</th>
                  <th className="py-3.5 px-4">Features</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {services.map((service) => (
                  <tr key={service._id || service.slug} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-semibold text-slate-300">
                      {service.order}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-sm text-white">{service.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{service.description}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-blue-400">
                      {service.icon || 'Code2'}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-300">
                      {service.features?.length || 0} features
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleActive(service)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold cursor-pointer ${
                          service.active !== false
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <span>{service.active !== false ? 'Active' : 'Disabled'}</span>
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(service)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0B101D] border border-slate-700 rounded-2xl p-6 sm:p-8 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <h2 className="text-xl font-bold font-display text-white">
                {editingService ? 'Edit Service' : 'Create New Service'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. MERN Stack Development"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                    Icon Name (Lucide)
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Code2">Code2 (MERN)</option>
                    <option value="ShoppingBag">ShoppingBag (Shopify)</option>
                    <option value="Globe">Globe (WordPress)</option>
                    <option value="Search">Search (SEO)</option>
                    <option value="Palette">Palette (Design)</option>
                    <option value="Gauge">Gauge (Optimization)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  Short Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain what value this service brings to clients..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-1.5">
                  Deliverable Features (one per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="React applications&#10;Node.js APIs&#10;REST APIs&#10;Authentication"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="active-checkbox"
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
                />
                <label htmlFor="active-checkbox" className="text-xs font-mono text-slate-200 cursor-pointer">
                  Service is Active &amp; Displayed on Public Website
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
