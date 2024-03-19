import path from 'path';
import { readFileSync } from 'fs';

export const getPortViaEnv = () => {
  try {
    const env = parseArgs()?.['env'] || null;
    const envPath = path.join(process.cwd(), env);

    const fileInfo = readFileSync(envPath);
    const port = fileInfo.toString().split('=')[1];

    if (port && typeof +port === 'number') {
      return port;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const parseArgs = () => {
  const args = process.argv;

  try {
    return args.reduce((result: any, value) => {
      if (value.startsWith('--') && value.length > 2) {
        const argsArray = value.split('=');

        result[argsArray[0].substring(2)] = argsArray[1];
      }

      return result;
    }, {});
  } catch {
    return {};
  }
};
