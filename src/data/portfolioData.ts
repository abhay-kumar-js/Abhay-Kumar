export interface Project {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  metrics?: string;
  highlights: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  items: string[];
  iconName: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverables: string;
}

export interface ValueCard {
  title: string;
  description: string;
  iconName: string;
}

export const PORTFOLIO_INFO = {
  name: 'Abhay Kumar',
  role: 'Web Developer / MERN Stack Developer',
  experience: '3+ Years',
  location: 'India',
  headline: 'Building Modern Websites & Digital Experiences That Grow Businesses.',
  supportingText:
    "I'm Abhay Kumar, a Web Developer with 3+ years of experience building fast, scalable, SEO-friendly and conversion-focused digital experiences using modern web technologies.",
  technologiesLine: 'MERN Stack • Shopify • WordPress • SEO • Graphic Design',
  aboutParagraph1:
    "I'm Abhay Kumar, a professional Web Developer with 3+ years of experience creating modern websites, e-commerce stores, and web applications.",
  aboutParagraph2:
    'My work combines development, design, performance, and SEO to create digital experiences that are not only visually appealing but also fast, scalable, user-friendly, and business-focused.',
  stats: [
    { value: '3+', label: 'Years Experience', note: 'Continuous web engineering' },
    { value: 'MERN', label: 'Full-Stack Development', note: 'Mongo, Express, React, Node' },
    { value: 'Shopify + WordPress', label: 'E-Commerce & CMS', note: 'Custom themes & stores' },
    { value: 'SEO', label: 'Search Optimization', note: 'On-page & Core Web Vitals' },
  ],
};

export const SERVICES: Service[] = [
  {
    id: 'mern',
    number: '01',
    title: 'MERN Stack Development',
    tagline: 'Modern full-stack web applications built for speed, scalability, and robust security.',
    items: [
      'React applications',
      'Node.js APIs',
      'REST APIs',
      'Authentication',
      'Database integration',
      'Admin dashboards',
      'Scalable architecture',
    ],
    iconName: 'Code2',
  },
  {
    id: 'shopify',
    number: '02',
    title: 'Shopify Development',
    tagline: 'Professional and conversion-focused Shopify storefronts customized to your brand.',
    items: [
      'Shopify store development',
      'Theme customization',
      'Product pages',
      'Custom sections',
      'Store optimization',
      'E-commerce functionality',
    ],
    iconName: 'ShoppingBag',
  },
  {
    id: 'wordpress',
    number: '03',
    title: 'WordPress Development',
    tagline: 'Fast, responsive, and SEO-friendly WordPress websites crafted for business growth.',
    items: [
      'Business websites',
      'Custom WordPress websites',
      'Elementor development',
      'Theme customization',
      'Plugin integration',
      'Performance optimization',
    ],
    iconName: 'Globe',
  },
  {
    id: 'seo',
    number: '04',
    title: 'SEO (Search Engine Optimization)',
    tagline: 'Technical and structural search optimization to elevate organic visibility and rankings.',
    items: [
      'On-page SEO',
      'Technical SEO',
      'Website optimization',
      'Keyword optimization',
      'SEO-friendly architecture',
      'Performance improvements',
    ],
    iconName: 'Search',
  },
  {
    id: 'design',
    number: '05',
    title: 'Graphic Design',
    tagline: 'Visual creative assets that maintain a cohesive, high-impact brand identity.',
    items: [
      'Social media graphics',
      'Website graphics',
      'Banners',
      'Marketing creatives',
      'Branding assets',
    ],
    iconName: 'Palette',
  },
  {
    id: 'optimization',
    number: '06',
    title: 'Website Optimization',
    tagline: 'Core Web Vitals acceleration, accessibility refinement, and conversion uplift.',
    items: [
      'Core Web Vitals',
      'Performance optimization',
      'Mobile optimization',
      'UX improvements',
      'Technical fixes',
    ],
    iconName: 'Gauge',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'arabian-aroma',
    name: 'Arabian Aroma',
    url: 'https://arabianaroma.in/',
    category: 'Shopify / Luxury Fragrances',
    description:
      'High-conversion luxury oriental perfume e-commerce store with tailored fragrance collections, scent profiles, mobile-first checkout, and custom UI/UX design.',
    tags: ['Shopify', 'Liquid', 'Custom UI/UX', 'Speed Optimization', 'SEO'],
    image: '/src/assets/images/project_arabianaroma_1790667348374.jpg',
    highlights: [
      'Bespoke product showcase with refined luxury aesthetic and scent profiles',
      'Fluid navigation and streamlined checkout conversion flow with 30% discount banners',
      'Mobile-first responsive architecture and Core Web Vitals optimization',
    ],
  },
  {
    id: 'fusionwalks',
    name: 'Fusionwalks',
    url: 'https://www.fusionwalks.com/',
    category: 'Shopify / Footwear E-Commerce',
    description:
      'High-converting Shopify e-commerce website for handcrafted ethnic juttis and seasonal footwear with custom collection filters, fast mobile cart drawer, and seamless checkout.',
    tags: ['Shopify', 'E-Commerce', 'Custom Theme', 'Conversion Rate Optimization', 'Mobile UX'],
    image: '/src/assets/images/project_fusionwalks_1790667305126.jpg',
    highlights: [
      'Handcrafted jutti collection layouts with high-resolution imagery and size guides',
      'Instant add-to-cart drawer with cross-sell recommendations and promo badges',
      'Sub-second mobile responsiveness and optimized Indian payment gateways',
    ],
  },
  {
    id: 'fragobar',
    name: 'Fragobar',
    url: 'https://fragobar.com/',
    category: 'Shopify / Luxury Perfumes',
    description:
      'Boutique luxury perfume e-commerce store featuring a signature dark-gold aesthetic, olfactory note pyramid breakdowns, automated cart drawer, and high performance.',
    tags: ['Shopify', 'Luxury Branding', 'Custom Sections', 'Core Web Vitals', 'Conversion Focus'],
    image: '/src/assets/images/project_fragobar_1790667321204.jpg',
    highlights: [
      'Signature fragrance note pyramid and scent longevity guides',
      'Dark luxury styling with gold accents and responsive typography',
      'Accelerated Core Web Vitals and frictionless customer journey',
    ],
  },
  {
    id: 'routica',
    name: 'Rautica',
    url: 'https://www.routica.in/',
    category: 'Shopify / Women Handbags',
    description:
      'Sophisticated e-commerce store for designer women handbags, clutches, and leather accessories with minimalist editorial styling, lookbooks, and high conversion rate.',
    tags: ['Shopify', 'Fashion & Apparel', 'Liquid', 'Multi-Currency', 'Instagram Shop'],
    image: '/src/assets/images/project_routica_1790667336453.jpg',
    highlights: [
      'Editorial lookbook design with interactive product hotspots and categories',
      'Filtering for handbags, clutches, sling bags, and shoulder bags',
      'Engineered for fast mobile loading and elevated average order value',
    ],
  },
  {
    id: 'celestia-carat',
    name: 'Celestia Carat',
    url: 'https://celestiacarat.in/',
    category: 'Shopify / Fine Jewelry',
    description:
      'A premium digital presence designed for a modern jewelry-focused brand, combining visual presentation with an elegant user experience.',
    tags: ['Shopify', 'Jewelry E-Commerce', 'Luxury Web Design', 'Search Optimization'],
    image: '/src/assets/images/project_celestia_carat_1790582211499.jpg',
    highlights: [
      'Elevated visual storytelling for fine diamonds and jewelry',
      'High-resolution product zoom and detailed specifications',
      'Intuitive user journey from catalog discovery to seamless order placement',
    ],
  },
  {
    id: 'the-coed',
    name: 'The Coed',
    url: 'https://thecoed.in/',
    category: 'MERN Stack / Modern Storefront',
    description:
      'A modern online shopping experience built on React.js and Node.js REST APIs with responsive design, instant client-side transitions, and smooth customer checkout journey.',
    tags: ['MERN', 'React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    image: '/src/assets/images/project_the_coed_1790582223025.jpg',
    highlights: [
      'Clean streetwear and lifestyle apparel lookbook showcase',
      'High-speed page load speeds and intuitive filter categorization',
      'Optimized customer acquisition funnel and frictionless browsing',
    ],
  },
  {
    id: 'real-victory-group',
    name: 'Real Victory Group',
    url: '',
    category: 'WordPress & Frontend / Agency Platform',
    description:
      'Comprehensive corporate web platform and digital service showcase built for Real Victory Group with responsive layout, custom Elementor modules, and seamless cross-platform user experience.',
    tags: ['WordPress', 'Elementor Pro', 'React.js', 'Custom Theme', 'Responsive UI'],
    image: '/src/assets/images/project_realvictory_mockup_1790672832887.jpg',
    highlights: [
      'Engineered responsive, user-friendly, and visually engaging corporate web layouts',
      'Custom WordPress architecture with Elementor Pro integration and fast rendering',
      'Optimized asset pipeline achieving seamless cross-browser compatibility',
    ],
  },
  {
    id: 'artisan-commerce',
    name: 'Artisan Boutique',
    url: '',
    category: 'WordPress / WooCommerce Store',
    description:
      'Full-featured custom WordPress and WooCommerce e-commerce website with tailored theme architecture, product catalog, payment gateway integration, and Core Web Vitals optimization.',
    tags: ['WordPress', 'WooCommerce', 'Elementor', 'PHP', 'SEO & Speed'],
    image: '/src/assets/images/project_wp_woocommerce_mockup_1790672849871.jpg',
    highlights: [
      'Custom WooCommerce product archives and single product templating',
      'Integrated payment gateways, shipping zones, and automated receipt emails',
      '95+ desktop Lighthouse speed score with database caching and lazy-loading',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive Design', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'MongoDB'],
  },
  {
    category: 'CMS & E-Commerce',
    skills: ['Shopify', 'WordPress', 'WooCommerce'],
  },
  {
    category: 'Marketing & Optimization',
    skills: ['SEO', 'Website Performance', 'Technical SEO', 'Conversion Optimization'],
  },
  {
    category: 'Design',
    skills: ['Graphic Design', 'UI Design', 'Website Design', 'Marketing Creatives'],
  },
];

export const WHY_WORK_WITH_ME: ValueCard[] = [
  {
    title: 'Business-Focused Development',
    description:
      "I don't just build websites — I focus on creating digital experiences that support business goals.",
    iconName: 'Briefcase',
  },
  {
    title: 'Modern Technology',
    description:
      'Use modern development practices and technologies to build maintainable digital products.',
    iconName: 'Zap',
  },
  {
    title: 'Performance & SEO',
    description:
      'Websites should be fast, responsive, and search-engine friendly right from the start.',
    iconName: 'Gauge',
  },
  {
    title: 'End-to-End Solutions',
    description:
      'From development and design to e-commerce and SEO, provide a complete digital solution.',
    iconName: 'ShieldCheck',
  },
];

export const WORK_PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'Understand the business, audience, requirements, and goals.',
    deliverables: 'Requirement analysis, scope definition, user journey mapping',
  },
  {
    step: '02',
    title: 'Plan',
    description: 'Define the structure, technology, design direction, and development approach.',
    deliverables: 'Architecture blueprint, tech stack selection, milestone roadmap',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Develop a responsive, optimized, and user-friendly website or application.',
    deliverables: 'Clean code implementation, responsive layout, component testing',
  },
  {
    step: '04',
    title: 'Launch & Optimize',
    description: 'Test, launch, monitor, and continuously improve the digital experience.',
    deliverables: 'SEO auditing, Core Web Vitals checks, deployment & monitoring',
  },
];

export interface ShopifyTestimonial {
  id: string;
  projectSlug: string;
  storeName: string;
  storeUrl: string;
  storeCategory: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  quote: string;
  rating: number;
  highlightMetric: string;
  metricLabel: string;
  secondaryMetric: string;
  tags: string[];
}

export const SHOPIFY_TESTIMONIALS: ShopifyTestimonial[] = [
  {
    id: 'arabian-aroma-testimonial',
    projectSlug: 'arabian-aroma',
    storeName: 'Arabian Aroma',
    storeUrl: 'https://arabianaroma.in/',
    storeCategory: 'Luxury Oriental Fragrances',
    clientName: 'Faisal Al-Mansoor',
    clientRole: 'Founder & Creative Director',
    clientCompany: 'Arabian Aroma Fragrances',
    quote:
      'Abhay transformed our luxury perfume store with an opulent dark-gold aesthetic and ultra-fast mobile navigation. Our mobile conversion rate increased by 145%, and mobile checkout drop-offs dropped significantly. Exceptional Shopify engineering!',
    rating: 5,
    highlightMetric: '+145%',
    metricLabel: 'Mobile Conversion Rate',
    secondaryMetric: '1.1s Mobile Load Speed',
    tags: ['Shopify Liquid', 'Custom UI/UX', 'Speed Optimization', 'SEO'],
  },
  {
    id: 'fusionwalks-testimonial',
    projectSlug: 'fusionwalks',
    storeName: 'Fusionwalks',
    storeUrl: 'https://www.fusionwalks.com/',
    storeCategory: 'Ethnic Footwear & Juttis',
    clientName: 'Priya Sharma',
    clientRole: 'Co-Founder & Head of Operations',
    clientCompany: 'Fusionwalks Footwear',
    quote:
      'Our ethnic footwear store needed custom sizing filters and an instant slide-out cart drawer that would not slow down the site. Abhay delivered ahead of schedule with flawless mobile responsiveness. Orders jumped 180% within the first month!',
    rating: 5,
    highlightMetric: '+180%',
    metricLabel: 'First Month Orders',
    secondaryMetric: '99/100 Core Web Vitals',
    tags: ['Shopify Theme', 'Custom Size Filters', 'Cart Drawer', 'Conversion Rate'],
  },
  {
    id: 'fragobar-testimonial',
    projectSlug: 'fragobar',
    storeName: 'Fragobar',
    storeUrl: 'https://fragobar.com/',
    storeCategory: 'Luxury Designer Fragrances',
    clientName: 'Vikramaditya Singh',
    clientRole: 'Brand Director',
    clientCompany: 'Fragobar Parfums',
    quote:
      'The fragrance pyramid breakdown and bespoke collection filtering Abhay implemented gave Fragobar the elite, high-end feel we were aiming for. Average session duration doubled and our Google organic traffic has grown consistently.',
    rating: 5,
    highlightMetric: '2.4x',
    metricLabel: 'Session Duration Increase',
    secondaryMetric: '#1 Google Fragrance Rankings',
    tags: ['Shopify Architecture', 'Visual Merchandising', 'Technical SEO'],
  },
  {
    id: 'rautica-testimonial',
    projectSlug: 'routica',
    storeName: 'Rautica',
    storeUrl: 'https://www.routica.in/',
    storeCategory: 'Designer Handbags & Leather Goods',
    clientName: 'Ananya Verma',
    clientRole: 'Creative Head',
    clientCompany: 'Rautica Leathercraft',
    quote:
      'Abhay crafted a stunning editorial lookbook store for our designer bags. The speed optimization and streamlined 1-click checkout increased our repeat purchase rate by 65%. Truly a top-tier Shopify developer.',
    rating: 5,
    highlightMetric: '+65%',
    metricLabel: 'Repeat Purchase Rate',
    secondaryMetric: '0.9s Page Transitions',
    tags: ['Shopify Plus', 'Editorial Lookbook', '1-Click Checkout'],
  },
  {
    id: 'celestia-carat-testimonial',
    projectSlug: 'celestia-carat',
    storeName: 'Celestia Carat',
    storeUrl: '',
    storeCategory: 'Lab-Grown Luxury Jewelry',
    clientName: 'Rohan Mehra',
    clientRole: 'E-Commerce Director',
    clientCompany: 'Celestia Carat Jewels',
    quote:
      'The diamond carat customizer and interactive ring builder Abhay engineered are intuitive and lightning fast. Our luxury clientele frequently praise how seamless and elegant the shopping experience is.',
    rating: 5,
    highlightMetric: '+210%',
    metricLabel: 'Customizer Inquiries',
    secondaryMetric: '4.9/5 Client UX Score',
    tags: ['Shopify Storefront API', 'React Customizer', 'Luxury Branding'],
  },
  {
    id: 'the-coed-testimonial',
    projectSlug: 'the-coed',
    storeName: 'The Coed',
    storeUrl: '',
    storeCategory: 'Contemporary Streetwear',
    clientName: 'Devashish Roy',
    clientRole: 'Founder',
    clientCompany: 'The Coed Apparel',
    quote:
      'High-traffic drop days used to crash our checkout. Abhay re-architected our storefront caching and bundle logic. Our latest 10,000-visitor drop handled flawlessly with zero downtime.',
    rating: 5,
    highlightMetric: '0s',
    metricLabel: 'Downtime on 10k Drops',
    secondaryMetric: '+310% Peak Sales Volume',
    tags: ['Shopify Plus', 'High-Concurrency Drops', 'Bundle Architecture'],
  },
];
