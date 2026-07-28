const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'contact', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Title/Subtitle
content = content.replace(
  `If you have questions or you'd like to find out more about
                      our services, please get in touch.`,
  `If you have questions about our services or anything, please don’t hesitate to contact us using the form below. For all your fire safety compliance needs!`
);
content = content.replace(
  "If you have questions or you'd like to find out more about our services, please get in touch.",
  "If you have questions about our services or anything, please don’t hesitate to contact us using the form below. For all your fire safety compliance needs!"
);

// Form Fields
content = content.replace(
  'First Name*',
  'Name*'
);
content = content.replace(
  'name="First-Name"',
  'name="Name"'
);
content = content.replace(
  'data-name="First Name"',
  'data-name="Name"'
);
content = content.replace(
  'placeholder="John"',
  'placeholder="Enter your full name"'
);

// We can replace the Last Name wrapper entirely with a Company/Building input
// Or just let it be. Wait, replacing it with Company/Building:
content = content.replace(
  '<label\n                            htmlFor="Last-Name-3"\n                            className="form_field-label"\n                          >\n                            Last Name*\n                          </label>\n                          <input\n                            className="form_input w-input"\n                            maxLength="256"\n                            name="Last-Name"\n                            data-name="Last Name"\n                            placeholder="Smith"\n                            type="text"\n                            id="Last-Name-3"\n                            required\n                          />',
  '<label htmlFor="Company-Building" className="form_field-label">Company or Building</label><input className="form_input w-input" maxLength="256" name="Company-Building" data-name="Company or Building" placeholder="Enter your company or building name" type="text" id="Company-Building" />'
);
// Make sure it works if prettier made it single line
content = content.replace(
  /Last Name\*/g,
  'Company or Building'
);
content = content.replace(
  /name="Last-Name"/g,
  'name="Company-Building"'
);
content = content.replace(
  /data-name="Last Name"/g,
  'data-name="Company or Building"'
);
content = content.replace(
  /placeholder="Smith"/g,
  'placeholder="Enter your company or building name"'
);

// Vehicle Make -> Suburb
content = content.replace(
  /Vehicle Make/g,
  'Suburb'
);
content = content.replace(
  /name="Vehicle"/g,
  'name="Suburb"'
);
content = content.replace(
  /data-name="Vehicle"/g,
  'data-name="Suburb"'
);
content = content.replace(
  /placeholder="e\.g\. Volkswagen"/g,
  'placeholder="Enter your suburb"'
);

// Vehicle Model -> Service Required
content = content.replace(
  /Vehicle Model/g,
  'Service Required'
);
content = content.replace(
  /name="Vehicle-Model"/g,
  'name="Service-Required"'
);
content = content.replace(
  /data-name="Vehicle Model"/g,
  'data-name="Service Required"'
);
content = content.replace(
  /placeholder="e\.g\. Transporter T6"/g,
  'placeholder="Select a fire-safety service"'
);

// Other placeholders
content = content.replace(
  /placeholder="name@example\.com"/g,
  'placeholder="Enter your email address"'
);
content = content.replace(
  /placeholder="\+44 \(0\)"/g,
  'placeholder="Enter your phone number"'
);
content = content.replace(
  /placeholder="Type something\.\.\."/g,
  'placeholder="Tell us how we can help"'
);

// Info List
content = content.replace(
  'Unit 5, Skelton Industrial Estate, Skelton Rd,\n                        Crosshills, Keighley, BD20 7BY.',
  '330 Wattle St, Ultimo NSW 2007, Australia'
);
content = content.replace(
  'Unit 5, Skelton Industrial Estate, Skelton Rd, Crosshills, Keighley, BD20 7BY.',
  '330 Wattle St, Ultimo NSW 2007, Australia'
);

content = content.replace(
  /01535 637777/g,
  '1300 765 594'
);
content = content.replace(
  /tel:01535637777/g,
  'tel:1300765594'
);

content = content.replace(
  /sales@allfireservices\.co\.uk/g,
  'admin@allfireservices.com.au'
);
content = content.replace(
  /mailto:sales@allfireservices\.co\.uk/g,
  'mailto:admin@allfireservices.com.au'
);

// Adding office hours
content = content.replace(
  /<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/header>/,
  `</div>
                    <div className="contact_info-item">
                      <div className="text-size-medium text-weight-medium text-color-black">
                        Office Hours:
                      </div>
                      <div className="body-text">
                        Monday – Friday 07:00am – 6:30pm<br/>
                        Saturday 7:00am – 12:30pm<br/>
                        24/7 After Hours, Phone 0484 648 400
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>`
);

// Replace Fitter CTA with map
// Actually I'll just remove section_fitter-cta since it's about "Find your nearest fitter" and we don't need it.
content = content.replace(/<section data-theme="light" className="section_fitter-cta">[\s\S]*?<\/section>/, '');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Contact replacements done.');
