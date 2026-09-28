import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Abhay Kumar',
    },
    title: {
      type: String,
      default: 'Web Developer / MERN Stack Developer',
    },
    description: {
      type: String,
      default:
        "I'm Abhay Kumar, a Web Developer with 4+ years of experience building modern websites, e-commerce experiences, and full-stack web applications.",
    },
    about: {
      type: String,
      default:
        'My work combines development, design, performance, and SEO to create digital experiences that are not only visually appealing but also fast, scalable, user-friendly, and business-focused.',
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'India',
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    seoTitle: {
      type: String,
      default: 'Abhay Kumar | Web Developer | MERN Stack, Shopify & WordPress',
    },
    seoDescription: {
      type: String,
      default:
        'Abhay Kumar is a Web Developer with 4+ years of experience in MERN Stack, Shopify, WordPress, SEO, and modern website development.',
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings =
  mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
