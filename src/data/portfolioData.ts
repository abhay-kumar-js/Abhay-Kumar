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
  experience: '4+ Years',
  location: 'India',
  headline: 'Building Modern Websites & Digital Experiences That Grow Businesses.',
  supportingText:
    "I'm Abhay Kumar, a Web Developer with 4+ years of experience building fast, scalable, SEO-friendly and conversion-focused digital experiences using modern web technologies.",
  technologiesLine: 'MERN Stack • Shopify • WordPress • SEO • Graphic Design',
  aboutParagraph1:
    "I'm Abhay Kumar, a professional Web Developer with 4+ years of experience creating modern websites, e-commerce stores, and web applications.",
  aboutParagraph2:
    'My work combines development, design, performance, and SEO to create digital experiences that are not only visually appealing but also fast, scalable, user-friendly, and business-focused.',
  stats: [
    { value: '4+', label: 'Years Experience', note: 'Continuous web engineering' },
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
    category: 'E-Commerce / Website Development',
    description:
      'A modern e-commerce experience designed to showcase products, strengthen the brand presence, and provide customers with a smooth browsing experience.',
    tags: ['E-Commerce', 'Shopify & Web Development', 'UI/UX Design', 'Performance Optimization'],
    image: '/src/assets/images/project_arabian_aroma_1790582200011.jpg',
    highlights: [
      'Bespoke product showcase with refined luxury aesthetic',
      'Fluid navigation and streamlined checkout conversion flow',
      'Mobile-first responsive architecture and Core Web Vitals optimization',
    ],
  },
  {
    id: 'celestia-carat',
    name: 'Celestia Carat',
    url: 'https://celestiacarat.in/',
    category: 'E-Commerce / Web Development',
    description:
      'A premium digital presence designed for a modern jewelry-focused brand, combining visual presentation with an elegant user experience.',
    tags: ['Jewelry E-Commerce', 'Luxury Web Design', 'Responsive UI', 'Search Optimization'],
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
    category: 'E-Commerce / Website Development',
    description:
      'A modern online shopping experience focused on product presentation, usability, responsive design, and a smooth customer journey.',
    tags: ['Fashion & Apparel', 'Modern Storefront', 'Mobile First', 'Fast Checkout Flow'],
    image: '/src/assets/images/project_the_coed_1790582223025.jpg',
    highlights: [
      'Clean streetwear and lifestyle apparel lookbook showcase',
      'High-speed page load speeds and intuitive filter categorization',
      'Optimized customer acquisition funnel and frictionless browsing',
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
