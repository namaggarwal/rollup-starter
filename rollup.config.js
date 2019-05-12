import babel from 'rollup-plugin-babel';
import del from 'rollup-plugin-delete'
import commonJs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

function createConfig({ isDebug, file = 'dist/index.js' }) {
  return {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file,
      name: 'RollUpTest',
      sourcemap: isDebug
    },
    plugins: [
      del({ targets: 'dist/*' }),
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonJs({ include: 'node_modules/**' }),
      uglify()
    ]
  };
}

export default commandLineArgs => {
  if (commandLineArgs.configDebug === true) {
    return createConfig({isDebug: true});
  }
  return createConfig({});
}