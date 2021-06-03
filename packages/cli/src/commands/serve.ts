import path from 'path';
import { Command } from 'commander';

import { serve } from 'api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server', '4000')
  .action(async (filename = 'sandbox.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        isProduction
      );
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`
      );
    } catch (err) {
      if (err.code === 'EADDRINUSE')
        console.log('Port already in use. Try other ports.');
      else console.log('Something went wrong.', err.message);
      process.exit(1);
    }
  });
