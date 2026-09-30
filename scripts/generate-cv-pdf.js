import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(__dirname, '../public/assets/Abhay_Kumar_Web-Dev-CV.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 36, bottom: 36, left: 40, right: 40 },
  info: {
    Title: 'Abhay Kumar - Web Developer CV',
    Author: 'Abhay Kumar',
    Subject: 'Curriculum Vitae',
  }
});

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Fonts
const FONT_REG = 'Helvetica';
const FONT_BOLD = 'Helvetica-Bold';

// Header
doc.font(FONT_BOLD).fontSize(18).fillColor('#111827').text('ABHAY KUMAR', { align: 'center' });
doc.moveDown(0.2);
doc.font(FONT_REG).fontSize(11).fillColor('#222222').text('Web Developer', { align: 'center' });
doc.moveDown(0.3);
doc.font(FONT_REG).fontSize(8.5).fillColor('#111827').text('• +91-7379289932   • webdevabhay@gmail.com   • Linkedin/Abhay Kumar   • GitHub/abhay-kumar-js', { align: 'center' });
doc.moveDown(0.6);

// Divider
const drawDivider = () => {
  doc.moveDown(0.4);
  const y = doc.y;
  doc.strokeColor('#E5E7EB').lineWidth(0.8).moveTo(40, y).lineTo(555, y).stroke();
  doc.moveDown(0.6);
};

drawDivider();

// SUMMARY
doc.font(FONT_BOLD).fontSize(10.5).fillColor('#111827').text('SUMMARY');
doc.moveDown(0.3);
doc.font(FONT_REG).fontSize(8.8).lineGap(2).fillColor('#222222').text(
  'Full-StackMERN Developer with 4+ years of professional experience, including 3+ years of expertise in Shopify and WordPress development. Experienced in building scalable web applications, custom eCommerce solutions, REST APIs, and performance-optimized websites with a focus on delivering seamless user experiences.',
  { align: 'left' }
);

drawDivider();

// TECHNICAL SKILLS (Two Columns)
doc.font(FONT_BOLD).fontSize(10.5).fillColor('#111827').text('TECHNICAL SKILLS');
doc.moveDown(0.4);

const skillsY = doc.y;
const col1X = 40;
const col2X = 300;

// Left Column: Shopify & Frontend
doc.font(FONT_REG).fontSize(9).fillColor('#111827').text('Shopify:', col1X, skillsY);
const shopifyBullets = [
  'Shopify Liquid',
  'Shopify Store Development',
  'Shopify Theme Customization',
  'Shopify Apps Integration',
  'Shopify Store Optimization',
  'Payment Gateway Integration'
];
let curY = doc.y + 2;
shopifyBullets.forEach(b => {
  doc.font(FONT_REG).fontSize(8.5).fillColor('#222222').text('•  ' + b, col1X + 6, curY);
  curY = doc.y + 1.5;
});

curY += 4;
doc.font(FONT_REG).fontSize(9).fillColor('#111827').text('Frontend:', col1X, curY);
curY = doc.y + 2;
const frontendBullets = [
  'React.js & Redux, HTML5',
  'CSS3, Tailwind CSS, Bootstrap,',
  'JavaScript (ES6+), TypeScript'
];
frontendBullets.forEach(b => {
  doc.font(FONT_REG).fontSize(8.5).fillColor('#222222').text('•  ' + b, col1X + 6, curY);
  curY = doc.y + 1.5;
});
const leftColEndY = curY;

// Right Column: WordPress & Tools
doc.font(FONT_REG).fontSize(9).fillColor('#111827').text('WordPress:', col2X, skillsY);
const wpBullets = [
  'Custom WordPress Development',
  'Elementor, WooCommerce',
  'Theme Customization',
  'Plugin Configuration, Website Migration'
];
curY = doc.y + 2;
wpBullets.forEach(b => {
  doc.font(FONT_REG).fontSize(8.5).fillColor('#222222').text('•  ' + b, col2X + 6, curY);
  curY = doc.y + 1.5;
});

curY += 8;
doc.font(FONT_REG).fontSize(9).fillColor('#111827').text('Tools & Platforms:', col2X, curY);
curY = doc.y + 2;
const toolsBullets = [
  'Git & GitHub, Vercel, Netlify, Figma'
];
toolsBullets.forEach(b => {
  doc.font(FONT_REG).fontSize(8.5).fillColor('#222222').text('•  ' + b, col2X + 6, curY);
  curY = doc.y + 1.5;
});

doc.y = Math.max(leftColEndY, curY) + 4;
drawDivider();

// WORK EXPERIENCE
doc.font(FONT_BOLD).fontSize(10.5).fillColor('#111827').text('WORK EXPERIENCE', 40);
doc.moveDown(0.4);

// Job 1
doc.font(FONT_REG).fontSize(8.8).fillColor('#111827').text('Arabian Aroma Perfume | Dec, 2024 - Present | arabianaroma.in');
doc.moveDown(0.2);
doc.font(FONT_BOLD).fontSize(8.8).fillColor('#111827').text('Senior Web Developer');
doc.moveDown(0.2);
const job1Bullets = [
  'Manage and execute website development requirements for the company\'s eCommerce platform.',
  'Develop, customize, and maintain website features to improve functionality and user experience.',
  'Collaborate with stakeholders to gather requirements and implement technical solutions.',
  'Optimize website performance, responsiveness, and conversion rates.',
  'Troubleshoot technical issues and ensure smooth website operations.'
];
job1Bullets.forEach(b => {
  doc.font(FONT_REG).fontSize(8.5).fillColor('#222222').text('•  ' + b, 46, doc.y, { lineGap: 1.5 });
  doc.moveDown(0.15);
});

doc.moveDown(0.4);

// Job 2
doc.font(FONT_REG).fontSize(8.8).fillColor('#111827').text('Real Victory Group | March, 2023 - Aug, 2024', 40);
doc.moveDown(0.2);
doc.font(FONT_BOLD).fontSize(8.8).fillColor('#111827').text('Front-End Developer');
doc.moveDown(0.2);
const job2Bullets = [
  'Real Victory Group designed and developed responsive, user-friendly, and visually engaging websites.',
  'Ensured a seamless and optimized user experience across all platforms.',
  'Built the Real-Victory-Group website.'
];
job2Bullets.forEach(b => {
  doc.font(FONT_REG).fontSize(8.5).fillColor('#222222').text('•  ' + b, 46, doc.y, { lineGap: 1.5 });
  doc.moveDown(0.15);
});

drawDivider();

// EDUCATION
doc.font(FONT_BOLD).fontSize(10.5).fillColor('#111827').text('EDUCATION', 40);
doc.moveDown(0.4);

const eduItems = [
  { name: 'AxisInstituteofHigher Education, Bachelor of Computer Applications', year: '2022' },
  { name: 'BNSD Inter College, Intermediat UP Board', year: '2019' },
  { name: 'Bal Mandir Maharashtra Mandal, High School UP Board', year: '2017' }
];

eduItems.forEach(item => {
  const y = doc.y;
  doc.font(FONT_REG).fontSize(8.5).fillColor('#222222').text(item.name, 40, y);
  doc.font(FONT_REG).fontSize(8.5).fillColor('#222222').text(item.year, 530, y, { align: 'right' });
  
  // Dotted line connecting them
  const nameWidth = doc.widthOfString(item.name);
  const dotsStartX = 40 + nameWidth + 6;
  const dotsEndX = 524;
  if (dotsEndX > dotsStartX) {
    const dotStr = '.'.repeat(Math.floor((dotsEndX - dotsStartX) / 3));
    doc.fillColor('#9CA3AF').text(dotStr, dotsStartX, y, { width: dotsEndX - dotsStartX, lineBreak: false });
  }
  doc.y = y + 13;
});

drawDivider();

// PERSONAL DETAILS
doc.font(FONT_BOLD).fontSize(10.5).fillColor('#111827').text('PERSONAL DETAILS', 40);
doc.moveDown(0.4);
doc.font(FONT_REG).fontSize(8.5).fillColor('#222222').text(
  '•  Father: Late Mr. Rajesh Kumar             •  DOB: 17/11/2000             •  Languages: English, Hindi',
  40,
  doc.y
);

doc.end();
stream.on('finish', () => {
  console.log('CV PDF generated successfully at:', outputPath);
});
