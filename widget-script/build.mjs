// import * as esbuild from 'esbuild';

// esbuild.build({
//   entryPoints: ['src/index.js'],
//   bundle: true,
//   minify: true,
//   sourcemap: false,
//   target: ['es2020'],
//   outfile: '../backend/static/widget.js', // Compiles directly into FastAPI static folder
// }).then(() => {
//   console.log('✅ Widget bundled successfully -> backend/static/widget.js');
// }).catch(() => process.exit(1));

import * as esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['es2020'],
  // loader: { '.css': 'text' },
  outfile: '../backend/static/widget.js',
}).then(() => {
  console.log('✅ Widget bundled successfully -> backend/static/widget.js');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});