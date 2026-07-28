const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'app', 'page.tsx');
let homeContent = fs.readFileSync(homePath, 'utf-8');

const contactPath = path.join(__dirname, 'app', 'contact', 'page.tsx');
let contactContent = fs.readFileSync(contactPath, 'utf-8');

// 1. QR Database 2 (Clone Contact, add iframe)
let qrContent = contactContent;
qrContent = qrContent.replace(
  'If you have questions about our services or anything, please don’t hesitate to contact us using the form below. For all your fire safety compliance needs!',
  'QR Database 2: Please use the database below to view inspection and asset records.'
);

const formStart = qrContent.indexOf('<form');
const formEnd = qrContent.indexOf('</form>') + 7;
if (formStart !== -1 && formEnd !== -1) {
  qrContent = qrContent.substring(0, formStart) + 
    '<iframe src="https://example.com/qr-database" width="100%" height="600" style={{ border: "none", borderRadius: "8px" }} title="QR Database"></iframe>' 
    + qrContent.substring(formEnd);
}

const qrDir = path.join(__dirname, 'app', 'qr-database-2');
fs.mkdirSync(qrDir, { recursive: true });
fs.writeFileSync(path.join(qrDir, 'page.tsx'), qrContent, 'utf-8');


// 2. Homepage 2025 (Clone Home)
let hp2025 = homeContent;
hp2025 = hp2025.replace(
  'Sydney’s Premier Fire Protection Services',
  'ALLFIRE Services 2025'
);
hp2025 = hp2025.replace(
  'Expert fire safety solutions for strata, commercial, and industrial properties. Fully compliant, strictly professional.',
  'We employ NSW firemen to do our monthly, 6-monthly, and yearly inspections for the Annual Fire Safety (AFS) Statement. We also provide building defect reporting.'
);

const hp2025Dir = path.join(__dirname, 'app', 'homepage-2025');
fs.mkdirSync(hp2025Dir, { recursive: true });
fs.writeFileSync(path.join(hp2025Dir, 'page.tsx'), hp2025, 'utf-8');


// 3. Legacy Home (Clone Home)
let legacy = homeContent;
legacy = legacy.replace(
  'Sydney’s Premier Fire Protection Services',
  'Are you ready to get started with us?'
);
legacy = legacy.replace(
  'Expert fire safety solutions for strata, commercial, and industrial properties. Fully compliant, strictly professional.',
  'All Fire Services is an Australian owned and operated business created by former NSW Fire Brigades Senior Officer Grant Fuller in 2008. Our Mission is to provide High Level Professional Fire Safety Services whilst being Approachable, Practical and Reasonable.'
);

const legacyDir = path.join(__dirname, 'app', 'home');
fs.mkdirSync(legacyDir, { recursive: true });
fs.writeFileSync(path.join(legacyDir, 'page.tsx'), legacy, 'utf-8');

console.log('Built qr, homepage-2025, and legacy home');
