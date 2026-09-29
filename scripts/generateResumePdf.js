import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const outputPath = path.resolve(targetDir, 'Abhay_Kumar_Resume.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 36, bottom: 36, left: 44, right: 44 },
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors
const primaryColor = '#111827';
const accentColor = '#2563EB';
const textColor = '#1F2937';
const mutedColor = '#4B5563';
const ruleColor = '#E5E7EB';

// HEADER
doc
  .font('Helvetica-Bold')
  .fontSize(22)
  .fillColor(primaryColor)
  .text('ABHAY KUMAR', { align: 'center', characterSpacing: 1.5 });

doc.moveDown(0.2);
doc
  .font('Helvetica')
  .fontSize(12)
  .fillColor(accentColor)
  .text('Web Developer / Full-Stack MERN Developer', { align: 'center' });

doc.moveDown(0.3);
doc
  .font('Helvetica')
  .fontSize(9)
  .fillColor(mutedColor)
  .text(
    '+91-7379289932   •   webdevabhay@gmail.com   •   linkedin.com/in/abhay-kumar   •   github.com/abhay-kumar-js',
    { align: 'center' }
  );

doc.moveDown(0.5);
doc.strokeColor(ruleColor).lineWidth(1).moveTo(44, doc.y).lineTo(551, doc.y).stroke();
doc.moveDown(0.6);

// SECTION HELPER
function addSectionHeader(title) {
  doc.moveDown(0.4);
  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(primaryColor)
    .text(title.toUpperCase(), { characterSpacing: 1 });
  doc.moveDown(0.2);
  doc.strokeColor('#3B82F6').lineWidth(1.5).moveTo(44, doc.y).lineTo(551, doc.y).stroke();
  doc.moveDown(0.4);
}

// SUMMARY
addSectionHeader('Summary');
doc
  .font('Helvetica')
  .fontSize(9.5)
  .fillColor(textColor)
  .text(
    'Full-Stack MERN Developer with 4+ years of professional experience, including 3+ years of expertise in Shopify and WordPress development. Experienced in building scalable web applications, custom eCommerce solutions, REST APIs, and performance-optimized websites with a focus on delivering seamless user experiences.',
    { lineGap: 2.5, align: 'justify' }
  );

// TECHNICAL SKILLS
addSectionHeader('Technical Skills');

const col1X = 44;
const col2X = 300;
let skillsStartY = doc.y;

// Left column: Shopify & Frontend
doc
  .font('Helvetica-Bold')
  .fontSize(9.5)
  .fillColor(primaryColor)
  .text('Shopify:', col1X, skillsStartY);
doc.font('Helvetica').fontSize(9).fillColor(textColor);
const shopifySkills = [
  'Shopify Liquid',
  'Shopify Store Development',
  'Shopify Theme Customization',
  'Shopify Apps Integration',
  'Shopify Store Optimization',
  'Payment Gateway Integration',
];
shopifySkills.forEach((s) => {
  doc.text(`  •  ${s}`, col1X, doc.y, { lineGap: 1.5 });
});

doc.moveDown(0.4);
doc
  .font('Helvetica-Bold')
  .fontSize(9.5)
  .fillColor(primaryColor)
  .text('Frontend:', col1X, doc.y);
doc.font('Helvetica').fontSize(9).fillColor(textColor);
const frontendSkills = [
  'React.js & Redux, HTML5',
  'CSS3, Tailwind CSS, Bootstrap',
  'JavaScript (ES6+), TypeScript',
];
frontendSkills.forEach((s) => {
  doc.text(`  •  ${s}`, col1X, doc.y, { lineGap: 1.5 });
});

// Right column: WordPress & Tools
doc
  .font('Helvetica-Bold')
  .fontSize(9.5)
  .fillColor(primaryColor)
  .text('WordPress:', col2X, skillsStartY);
doc.font('Helvetica').fontSize(9).fillColor(textColor);
const wpSkills = [
  'Custom WordPress Development',
  'Elementor, WooCommerce',
  'Theme Customization',
  'Plugin Configuration, Website Migration',
];
wpSkills.forEach((s) => {
  doc.text(`  •  ${s}`, col2X, doc.y, { lineGap: 1.5 });
});

doc.moveDown(0.4);
doc
  .font('Helvetica-Bold')
  .fontSize(9.5)
  .fillColor(primaryColor)
  .text('Tools & Platforms:', col2X, doc.y);
doc.font('Helvetica').fontSize(9).fillColor(textColor);
const toolsSkills = ['Git & GitHub, Vercel, Netlify, Figma', 'MongoDB, Express.js, Node.js, Postman'];
toolsSkills.forEach((s) => {
  doc.text(`  •  ${s}`, col2X, doc.y, { lineGap: 1.5 });
});

// Reset X position
doc.x = 44;
doc.y = Math.max(doc.y, skillsStartY + 140);

// WORK EXPERIENCE
addSectionHeader('Work Experience');

// Job 1
doc
  .font('Helvetica-Bold')
  .fontSize(10)
  .fillColor(primaryColor)
  .text('Arabian Aroma Perfume', 44, doc.y, { continued: true });
doc
  .font('Helvetica')
  .fontSize(9)
  .fillColor(mutedColor)
  .text('  |  Dec, 2024 - Present  |  arabianaroma.in');

doc
  .font('Helvetica-Bold')
  .fontSize(9)
  .fillColor(accentColor)
  .text('Senior Web Developer');

doc.font('Helvetica').fontSize(9).fillColor(textColor);
const arabianTasks = [
  "Manage and execute website development requirements for the company's eCommerce platform.",
  'Develop, customize, and maintain website features to improve functionality and user experience.',
  'Collaborate with stakeholders to gather requirements and implement technical solutions.',
  'Optimize website performance, responsiveness, and conversion rates.',
  'Troubleshoot technical issues and ensure smooth website operations.',
];
arabianTasks.forEach((t) => {
  doc.text(`  •  ${t}`, 44, doc.y, { lineGap: 1.5 });
});

doc.moveDown(0.5);

// Job 2
doc
  .font('Helvetica-Bold')
  .fontSize(10)
  .fillColor(primaryColor)
  .text('Real Victory Group', 44, doc.y, { continued: true });
doc
  .font('Helvetica')
  .fontSize(9)
  .fillColor(mutedColor)
  .text('  |  March, 2023 - Aug, 2024');

doc
  .font('Helvetica-Bold')
  .fontSize(9)
  .fillColor(accentColor)
  .text('Front-End Developer');

doc.font('Helvetica').fontSize(9).fillColor(textColor);
const rvgTasks = [
  'Real Victory Group designed and developed responsive, user-friendly, and visually engaging websites.',
  'Ensured a seamless and optimized user experience across all platforms.',
  'Built the Real-Victory-Group website.',
];
rvgTasks.forEach((t) => {
  doc.text(`  •  ${t}`, 44, doc.y, { lineGap: 1.5 });
});

// EDUCATION
addSectionHeader('Education');

const educationItems = [
  {
    institution: 'Axis Institute of Higher Education, Bachelor of Computer Applications',
    year: '2022',
  },
  {
    institution: 'BNSD Inter College, Intermediate UP Board',
    year: '2019',
  },
  {
    institution: 'Bal Mandir Maharashtra Mandal, High School UP Board',
    year: '2017',
  },
];

educationItems.forEach((item) => {
  const leftText = item.institution;
  const rightText = item.year;
  const y = doc.y;
  doc.font('Helvetica').fontSize(9).fillColor(textColor).text(leftText, 44, y);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(primaryColor).text(rightText, 490, y, { align: 'right' });
  doc.moveDown(0.2);
});

// PERSONAL DETAILS
addSectionHeader('Personal Details');
doc
  .font('Helvetica')
  .fontSize(9)
  .fillColor(textColor)
  .text(
    '  •  Father: Late Mr. Rajesh Kumar        •  DOB: 17/11/2000        •  Languages: English, Hindi',
    44,
    doc.y
  );

doc.end();

writeStream.on('finish', () => {
  console.log('✅ Generated Abhay_Kumar_Resume.pdf successfully at', outputPath);
});
