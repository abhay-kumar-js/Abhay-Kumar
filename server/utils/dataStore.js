import bcrypt from 'bcryptjs';
import { connectDB, getIsConnected } from '../config/db.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import ContactMessage from '../models/ContactMessage.js';
import SiteSettings from '../models/SiteSettings.js';

// Initial Seed Data
const initialProjects = [
  {
    _id: 'proj_1',
    title: 'Arabian Aroma',
    slug: 'arabian-aroma',
    description:
      'High-conversion luxury oriental perfume e-commerce store with tailored fragrance collections, scent profiles, mobile-first checkout, and custom UI/UX design.',
    category: 'Shopify / Luxury Fragrances',
    image: '/assets/images/project_arabianaroma_1790667348374.jpg',
    url: 'https://arabianaroma.in/',
    technologies: ['Shopify', 'Liquid', 'Custom UI/UX', 'Speed Optimization', 'SEO'],
    featured: true,
    order: 1,
    createdAt: new Date('2025-01-10').toISOString(),
    updatedAt: new Date('2025-01-10').toISOString(),
  },
  {
    _id: 'proj_2',
    title: 'Fusionwalks',
    slug: 'fusionwalks',
    description:
      'High-converting Shopify e-commerce website for handcrafted ethnic juttis and seasonal footwear with custom collection filters, fast mobile cart drawer, and seamless checkout.',
    category: 'Shopify / Footwear E-Commerce',
    image: '/assets/images/project_fusionwalks_1790667305126.jpg',
    url: 'https://www.fusionwalks.com/',
    technologies: ['Shopify', 'E-Commerce', 'Custom Theme', 'CRO', 'Mobile UX'],
    featured: true,
    order: 2,
    createdAt: new Date('2025-01-20').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString(),
  },
  {
    _id: 'proj_3',
    title: 'Fragobar',
    slug: 'fragobar',
    description:
      'Boutique luxury perfume e-commerce store featuring a signature dark-gold aesthetic, olfactory note pyramid breakdowns, automated cart drawer, and high performance.',
    category: 'Shopify / Luxury Perfumes',
    image: '/assets/images/project_fragobar_1790667321204.jpg',
    url: 'https://fragobar.com/',
    technologies: ['Shopify', 'Luxury Branding', 'Custom Sections', 'Core Web Vitals'],
    featured: true,
    order: 3,
    createdAt: new Date('2025-02-05').toISOString(),
    updatedAt: new Date('2025-02-05').toISOString(),
  },
  {
    _id: 'proj_4',
    title: 'Rautica',
    slug: 'rautica',
    description:
      'Sophisticated e-commerce store for designer women handbags, clutches, and leather accessories with minimalist editorial styling, lookbooks, and high conversion rate.',
    category: 'Shopify / Women Handbags',
    image: '/assets/images/project_routica_1790667336453.jpg',
    url: 'https://www.routica.in/',
    technologies: ['Shopify', 'Fashion & Apparel', 'Liquid', 'Multi-Currency'],
    featured: true,
    order: 4,
    createdAt: new Date('2025-02-20').toISOString(),
    updatedAt: new Date('2025-02-20').toISOString(),
  },
  {
    _id: 'proj_5',
    title: 'Celestia Carat',
    slug: 'celestia-carat',
    description:
      'A premium digital presence designed for a modern jewelry-focused brand, combining visual presentation with an elegant user experience.',
    category: 'Shopify / Fine Jewelry',
    image: '/assets/images/project_celestia_carat_1790582211499.jpg',
    url: 'https://celestiacarat.in/',
    technologies: ['Shopify', 'Liquid', 'Responsive UI', 'Search Optimization'],
    featured: true,
    order: 5,
    createdAt: new Date('2025-03-01').toISOString(),
    updatedAt: new Date('2025-03-01').toISOString(),
  },
  {
    _id: 'proj_6',
    title: 'The Coed',
    slug: 'the-coed',
    description:
      'A modern online shopping experience built on React.js and Node.js REST APIs with responsive design, instant client-side transitions, and smooth customer checkout journey.',
    category: 'MERN Stack / Modern Storefront',
    image: '/assets/images/project_the_coed_1790582223025.jpg',
    url: 'https://thecoed.in/',
    technologies: ['MERN', 'React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    featured: true,
    order: 6,
    createdAt: new Date('2025-03-10').toISOString(),
    updatedAt: new Date('2025-03-10').toISOString(),
  },
  {
    _id: 'proj_7',
    title: 'Real Victory Group',
    slug: 'real-victory-group',
    description:
      'Comprehensive corporate web platform and digital service showcase built for Real Victory Group with responsive layout, custom Elementor modules, and seamless cross-platform user experience.',
    category: 'WordPress & Frontend / Agency Platform',
    image: '/assets/images/project_realvictory_mockup_1790672832887.jpg',
    url: '',
    technologies: ['WordPress', 'Elementor Pro', 'React.js', 'Custom Theme', 'Responsive UI'],
    featured: true,
    order: 7,
    createdAt: new Date('2025-03-15').toISOString(),
    updatedAt: new Date('2025-03-15').toISOString(),
  },
  {
    _id: 'proj_8',
    title: 'Artisan Boutique',
    slug: 'artisan-boutique',
    description:
      'Full-featured custom WordPress and WooCommerce e-commerce website with tailored theme architecture, product catalog, payment gateway integration, and Core Web Vitals optimization.',
    category: 'WordPress / WooCommerce Store',
    image: '/assets/images/project_wp_woocommerce_mockup_1790672849871.jpg',
    url: '',
    technologies: ['WordPress', 'WooCommerce', 'Elementor', 'PHP', 'SEO & Speed'],
    featured: true,
    order: 8,
    createdAt: new Date('2025-03-20').toISOString(),
    updatedAt: new Date('2025-03-20').toISOString(),
  },
];

const initialServices = [
  {
    _id: 'serv_1',
    title: 'MERN Stack Development',
    slug: 'mern-stack-development',
    description:
      'Build modern full-stack web applications using MongoDB, Express.js, React, and Node.js.',
    icon: 'Code2',
    features: [
      'React applications',
      'Node.js APIs',
      'REST APIs',
      'Authentication',
      'Database integration',
      'Admin dashboards',
      'Scalable architecture',
    ],
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'serv_2',
    title: 'Shopify Development',
    slug: 'shopify-development',
    description: 'Create professional and conversion-focused Shopify stores.',
    icon: 'ShoppingBag',
    features: [
      'Shopify store development',
      'Theme customization',
      'Product pages',
      'Custom sections',
      'Store optimization',
      'E-commerce functionality',
    ],
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'serv_3',
    title: 'WordPress Development',
    slug: 'wordpress-development',
    description: 'Build fast, responsive and SEO-friendly WordPress websites.',
    icon: 'Globe',
    features: [
      'Business websites',
      'Custom WordPress websites',
      'Elementor development',
      'Theme customization',
      'Plugin integration',
      'Performance optimization',
    ],
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'serv_4',
    title: 'SEO',
    slug: 'seo',
    description: 'Help websites improve their organic search visibility.',
    icon: 'Search',
    features: [
      'On-page SEO',
      'Technical SEO',
      'Website optimization',
      'Keyword optimization',
      'SEO-friendly architecture',
      'Performance improvements',
    ],
    order: 4,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'serv_5',
    title: 'Graphic Design',
    slug: 'graphic-design',
    description:
      'Create visual assets that maintain a strong and consistent brand identity.',
    icon: 'Palette',
    features: [
      'Social media graphics',
      'Website graphics',
      'Banners',
      'Marketing creatives',
      'Branding assets',
    ],
    order: 5,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'serv_6',
    title: 'Website Optimization',
    slug: 'website-optimization',
    description:
      'Improve existing websites for speed, usability, SEO, and conversions.',
    icon: 'Gauge',
    features: [
      'Core Web Vitals',
      'Performance optimization',
      'Mobile optimization',
      'UX improvements',
      'Technical fixes',
    ],
    order: 6,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let localUsers = [];
let localProjects = [...initialProjects];
let localServices = [...initialServices];
let localMessages = [
  {
    _id: 'msg_1',
    name: 'Sample Client',
    email: 'client@example.com',
    phone: '',
    service: 'MERN Stack Development',
    message: 'Hello Abhay, interested in discussing a new web application project with React and Node.js.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];
let localSettings = {
  name: 'Abhay Kumar',
  title: 'Web Developer / MERN Stack Developer',
  description:
    "I'm Abhay Kumar, a Web Developer with 3+ years of experience building fast, scalable, SEO-friendly and conversion-focused digital experiences using modern web technologies.",
  about:
    'My work combines development, design, performance, and SEO to create digital experiences that are not only visually appealing but also fast, scalable, user-friendly, and business-focused.',
  email: 'algoaxisoftech@gmail.com',
  phone: '+91-7379289932',
  location: 'India',
  socialLinks: {
    github: 'https://github.com/abhay-kumar-js',
    linkedin: '',
    twitter: '',
    instagram: '',
  },
  seoTitle: 'Abhay Kumar | Web Developer | MERN Stack, Shopify & WordPress',
  seoDescription:
    'Abhay Kumar is a Web Developer with 3+ years of experience in MERN Stack, Shopify, WordPress, SEO, and modern website development.',
  updatedAt: new Date().toISOString(),
};

// Initialize default admin user in local store
const ensureConnected = async () => {
  if (!getIsConnected()) {
    await connectDB();
  }
  return getIsConnected();
};

export const initAdminUser = async () => {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@abhaykumar.dev').toLowerCase();
  const rawAdminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
  let adminPassword = rawAdminPassword;
  try {
    adminPassword = decodeURIComponent(rawAdminPassword);
  } catch (_) {}
  const adminName = process.env.ADMIN_NAME || 'Abhay Kumar';

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminPassword, salt);

  const existing = localUsers.find((u) => u.email === adminEmail);
  if (!existing) {
    localUsers.push({
      _id: 'admin_user_1',
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } else {
    existing.password = hashedPassword;
  }

  // If MongoDB is connected, also seed Mongoose database in isolated blocks
  if (await ensureConnected()) {
    try {
      const userExists = await User.findOne({ email: adminEmail });
      if (!userExists) {
        await User.create({
          name: adminName,
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
        });
        console.log(`✅ Admin user created in MongoDB Atlas: ${adminEmail}`);
      }
    } catch (err) {
      console.warn('Admin user seed warning:', err.message);
    }

    try {
      const projectCount = await Project.countDocuments();
      if (projectCount === 0) {
        await Project.insertMany(
          initialProjects.map((p) => {
            const { _id, ...rest } = p;
            return rest;
          })
        );
        console.log('✅ Seeded initial projects to MongoDB Atlas');
      }
    } catch (err) {
      console.warn('Projects seed warning:', err.message);
    }

    try {
      const serviceCount = await Service.countDocuments();
      if (serviceCount === 0) {
        await Service.insertMany(
          initialServices.map((s) => {
            const { _id, ...rest } = s;
            return rest;
          })
        );
        console.log('✅ Seeded initial services to MongoDB Atlas');
      }
    } catch (err) {
      console.warn('Services seed warning:', err.message);
    }

    try {
      const settingsCount = await SiteSettings.countDocuments();
      if (settingsCount === 0) {
        await SiteSettings.create(localSettings);
        console.log('✅ Seeded site settings to MongoDB Atlas');
      }
    } catch (err) {
      console.warn('Settings seed warning:', err.message);
    }
  }
};

// Data Store Accessors
export const DataStore = {
  // USERS
  async findUserByEmail(email) {
    if (await ensureConnected()) {
      const dbUser = await User.findOne({ email: email.toLowerCase() });
      if (dbUser) return dbUser;
    }
    return localUsers.find((u) => u.email === email.toLowerCase());
  },

  async findUserById(id) {
    if (await ensureConnected()) {
      try {
        const dbUser = await User.findById(id).select('-password');
        if (dbUser) return dbUser;
      } catch (_) {}
    }
    const u = localUsers.find((user) => user._id === id);
    if (!u) return null;
    const { password, ...safeUser } = u;
    return safeUser;
  },

  // PROJECTS
  async getProjects() {
    if (await ensureConnected()) {
      const projects = await Project.find().sort({ order: 1, createdAt: -1 });
      if (projects.length > 0) return projects;
    }
    return [...localProjects].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async getProjectBySlug(slug) {
    if (await ensureConnected()) {
      const proj = await Project.findOne({ slug: slug.toLowerCase() });
      if (proj) return proj;
    }
    return localProjects.find((p) => p.slug === slug.toLowerCase()) || null;
  },

  async createProject(data) {
    if (await ensureConnected()) {
      return await Project.create(data);
    }
    const newProject = {
      _id: `proj_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localProjects.push(newProject);
    return newProject;
  },

  async updateProject(id, data) {
    if (await ensureConnected()) {
      return await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    const index = localProjects.findIndex((p) => p._id === id || p.slug === id);
    if (index === -1) return null;
    localProjects[index] = {
      ...localProjects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return localProjects[index];
  },

  async deleteProject(id) {
    if (await ensureConnected()) {
      return await Project.findByIdAndDelete(id);
    }
    const index = localProjects.findIndex((p) => p._id === id || p.slug === id);
    if (index === -1) return null;
    const deleted = localProjects.splice(index, 1);
    return deleted[0];
  },

  // SERVICES
  async getServices() {
    if (await ensureConnected()) {
      const services = await Service.find().sort({ order: 1 });
      if (services.length > 0) return services;
    }
    return [...localServices].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async createService(data) {
    if (await ensureConnected()) {
      return await Service.create(data);
    }
    const newService = {
      _id: `serv_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localServices.push(newService);
    return newService;
  },

  async updateService(id, data) {
    if (await ensureConnected()) {
      return await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    const index = localServices.findIndex((s) => s._id === id || s.slug === id);
    if (index === -1) return null;
    localServices[index] = {
      ...localServices[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return localServices[index];
  },

  async deleteService(id) {
    if (await ensureConnected()) {
      return await Service.findByIdAndDelete(id);
    }
    const index = localServices.findIndex((s) => s._id === id || s.slug === id);
    if (index === -1) return null;
    const deleted = localServices.splice(index, 1);
    return deleted[0];
  },

  // CONTACT MESSAGES
  async getMessages() {
    if (await ensureConnected()) {
      return await ContactMessage.find().sort({ createdAt: -1 });
    }
    return [...localMessages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async createMessage(data) {
    if (await ensureConnected()) {
      return await ContactMessage.create(data);
    }
    const newMessage = {
      _id: `msg_${Date.now()}`,
      ...data,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    localMessages.unshift(newMessage);
    return newMessage;
  },

  async updateMessageStatus(id, status) {
    if (await ensureConnected()) {
      return await ContactMessage.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
    }
    const msg = localMessages.find((m) => m._id === id);
    if (!msg) return null;
    msg.status = status;
    return msg;
  },

  async deleteMessage(id) {
    if (await ensureConnected()) {
      return await ContactMessage.findByIdAndDelete(id);
    }
    const index = localMessages.findIndex((m) => m._id === id);
    if (index === -1) return null;
    const deleted = localMessages.splice(index, 1);
    return deleted[0];
  },

  // SITE SETTINGS
  async getSettings() {
    if (await ensureConnected()) {
      const s = await SiteSettings.findOne();
      return s || localSettings;
    }
    return localSettings;
  },

  async updateSettings(data) {
    if (await ensureConnected()) {
      let s = await SiteSettings.findOne();
      if (s) {
        Object.assign(s, data);
        return await s.save();
      } else {
        return await SiteSettings.create(data);
      }
    }
    localSettings = {
      ...localSettings,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return localSettings;
  },
};
