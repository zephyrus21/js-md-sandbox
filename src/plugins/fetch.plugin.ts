import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({ name: 'filecache' });

export const fetchPlugin = (input: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: input,
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
