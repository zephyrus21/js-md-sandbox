import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({ name: 'filecache' });

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
            namespace: 'a',
          };
        }

        return { path: `https://unpkg.com/${args.path}`, namespace: 'a' };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import react from 'react';
              import reactDOM from 'react-dom';
              console.log(react, reactDOM);
            `,
          };
        }

        //! check to see if we have already fetched the file
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        //! if it is cached then return immediately
        if (cachedResult) return cachedResult;

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        //! store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
