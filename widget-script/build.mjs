// import * as esbuild from 'esbuild';

// esbuild.build({
//   entryPoints: ['src/index.js'],
//   bundle: true,
//   minify: true,
//   sourcemap: false,
//   target: ['es2020'],
//   outfile: '../backend/static/widget.js',
// }).then(() => {
//   console.log('✅ Widget bundled successfully -> backend/static/widget.js');
// }).catch((err) => {
//   console.error(err);
//   process.exit(1);
// });


import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

esbuild.build({
  entryPoints: [path.resolve(__dirname, 'src/index.js')],
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['es2020'],
  outfile: path.resolve(__dirname, '../backend/static/widget.js'),
  loader: {
    '.css': 'text', // Instructs esbuild to import .css as a raw text string
  },
}).then(() => {
  console.log('✅ Widget bundled successfully');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});