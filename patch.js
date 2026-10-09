const fs = require('fs');

// 1. Update App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(
  '<a href="#" className="hover:text-black transition-colors">Brands</a>',
  '<a href="#brands" onClick={(e) => { e.preventDefault(); document.getElementById(\'brands\').scrollIntoView({ behavior: \'smooth\' }); }} className="hover:text-black transition-colors cursor-pointer">Brands</a>'
);
fs.writeFileSync('src/App.jsx', app);

// 2. Update BrandsSection.jsx
let brands = fs.readFileSync('src/components/BrandsSection.jsx', 'utf8');
brands = brands.replace(
  '<section className="py-20 bg-white overflow-hidden flex flex-col items-center">',
  '<section id="brands" className="py-10 bg-white overflow-hidden flex flex-col items-center">'
);
brands = brands.replace(
  'className="w-full text-center mb-12"',
  'className="w-full text-center mb-6"'
);
fs.writeFileSync('src/components/BrandsSection.jsx', brands);

console.log("Patch applied successfully.");
