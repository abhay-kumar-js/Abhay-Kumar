import React from 'react';
import {
  ShoppingBag,
  Zap,
  Truck,
  Coins,
  Bot,
  Users,
  CreditCard,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export const SHOPIFY_PARTNER_COMPANIES = [
  {
    id: 'gokwik',
    name: 'GoKwik Checkout & KwikEngage',
    category: 'D2C Checkout & WhatsApp Retention',
    domain: 'gokwik.co',
    url: 'https://www.gokwik.co/',
    icon: Zap,
    accent: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    description:
      'Seamless 1-click D2C checkout integration, RTO protection intelligence, and automated WhatsApp conversational marketing flows via KwikEngage.',
    capabilities: ['1-Click Checkout', 'KwikEngage WhatsApp', 'RTO Reduction'],
  },
  {
    id: 'shiprocket-checkout',
    name: 'Faster Checkout (Shiprocket)',
    category: 'Express D2C Checkout Engine',
    domain: 'shiprocket.in',
    url: 'https://www.shiprocket.in/',
    icon: ShoppingBag,
    accent: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
    description:
      'High-speed Shopify checkout integration with pre-filled buyer addresses, dynamic COD-to-prepaid incentives, and friction-free mobile payments.',
    capabilities: ['Instant Address Fill', 'Prepaid Upsells', 'Sub-10s Checkout'],
  },
  {
    id: 'shiprocket-orders',
    name: 'Shiprocket (Orders Dashboard)',
    category: 'Logistics & Order Fulfillment',
    domain: 'shiprocket.in',
    url: 'https://www.shiprocket.in/',
    icon: Truck,
    accent: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20',
    description:
      'End-to-end Shopify order synchronization, automated AWB generation, multi-courier shipping rules, and real-time buyer tracking notifications.',
    capabilities: ['Orders Dashboard Sync', 'Automated Fulfillment', 'Live Tracking'],
  },
  {
    id: 'yourtoken',
    name: 'YourToken',
    category: 'Tokenized Loyalty & Rewards',
    domain: 'yourtoken.io',
    url: 'https://yourtoken.io/',
    icon: Coins,
    accent: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    description:
      'Custom loyalty and digital token reward ecosystems integrated directly into Shopify storefronts to drive repeat customer retention.',
    capabilities: ['Reward Tokens', 'Customer Retention', 'Storefront Widgets'],
  },
  {
    id: 'verifast-ai',
    name: 'Verifast AI',
    category: 'Conversational AI Sales Assistant',
    domain: 'verifast.ai',
    url: 'https://verifast.ai/',
    icon: Bot,
    accent: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20',
    description:
      'AI-driven product discovery, real-time customer query resolution, and personalized guided selling integrated into high-volume Shopify stores.',
    capabilities: ['AI Shopping Assistant', 'Product Recommendations', '24/7 Support Sync'],
  },
  {
    id: 'togethr',
    name: 'Togethr',
    category: 'Collaborative & Social Commerce',
    domain: 'togethr.in',
    url: 'https://www.togethr.in/',
    icon: Users,
    accent: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
    description:
      'Interactive co-shopping and guided discovery journeys embedded on Shopify stores to increase buyer engagement and session conversion.',
    capabilities: ['Social Shopping', 'Interactive Discovery', 'Engagement Uplift'],
  },
  {
    id: 'snapmint',
    name: 'Snapmint',
    category: 'Cardless EMI & BNPL Financing',
    domain: 'snapmintbusiness.com',
    url: 'https://www.snapmintbusiness.com/',
    icon: CreditCard,
    accent: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/20',
    description:
      'On-page EMI affordability widgets and zero-cost Buy Now, Pay Later (BNPL) checkout integration using UPI without requiring credit cards.',
    capabilities: ['Cardless UPI EMI', 'Product Page Widgets', 'Higher AOV'],
  },
];

export const ShopifyPartnersSection = () => {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold mb-1.5">
            Shopify Store Ecosystem &amp; Partner Integrations
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Services &amp; Companies I Work With for Shopify Stores
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Hands-on production experience integrating India&apos;s leading D2C checkout engines, order fulfillment dashboards, AI shopping assistants, and BNPL payment providers into high-converting Shopify storefronts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>7 Production D2C Integrations</span>
        </div>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOPIFY_PARTNER_COMPANIES.map((partner) => {
          const Icon = partner.icon;
          return (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/40 shadow-sm hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Icon + External Link */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${partner.iconBg} ${partner.accent}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <span>{partner.domain}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Category & Name */}
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  {partner.category}
                </p>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2.5">
                  {partner.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {partner.description}
                </p>
              </div>

              {/* Clean unboxed typographic metadata capabilities */}
              <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                {partner.capabilities.map((cap, i) => (
                  <React.Fragment key={cap}>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {cap}
                    </span>
                    {i < partner.capabilities.length - 1 && (
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                        &middot;
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ShopifyPartnersSection;
