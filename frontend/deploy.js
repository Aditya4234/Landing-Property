const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting AwasDhara Properties Deployment...\n');

// Check if build exists
if (!fs.existsSync('.next')) {
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
}

console.log('✅ Build completed successfully!');
console.log('📋 Routes configured:');
console.log('  • / (Home)');
console.log('  • /about');
console.log('  • /contact');
console.log('  • /properties');
console.log('  • /location');
console.log('  • /schedule-visit');
console.log('\n🌐 Ready for deployment!\n');

console.log('To deploy manually:');
console.log('1. Go to https://vercel.com');
console.log('2. Click "Import Project"');
console.log('3. Connect your GitHub repo OR upload the frontend folder');
console.log('4. Vercel will auto-detect Next.js and deploy\n');

console.log('Or use CLI:');
console.log('npm run deploy (after vercel login)\n');