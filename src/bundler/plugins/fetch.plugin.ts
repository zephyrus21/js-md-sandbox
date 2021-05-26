import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({ name: 'filecache' });

export const fetchPlugin = (input: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      //! To load the main file of the module
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: input,
        };
      });

      //! Function to get files from cached if available
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //! check to see if we have already fetched the file
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        //! if it is cached then return immediately
        if (cachedResult) return cachedResult;
      });

      //! Function for loading css files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const cssFile = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${cssFile}';
          document.head.appendChild(style); 
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        //! store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });

      //! Function for loading jsx files
      build.onLoad({ filter: /.*/ }, async (args: any) => {
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
