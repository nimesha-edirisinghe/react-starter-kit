import consola, { LogLevel } from 'consola';

const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;

const log = consola.create({
  level: isProd ? 3 : 5, // 0=silent, 5=trace
  defaults: {
    tag: '⚛️ REACT-STARTER-KIT'
  }
});

export default {
  success: (...args: Parameters<typeof log.success>) => log.success(...args),
  info: (...args: Parameters<typeof log.info>) => log.info(...args),
  warn: (...args: Parameters<typeof log.warn>) => log.warn(...args),
  error: (...args: Parameters<typeof log.error>) => log.error(...args),
  debug: (...args: Parameters<typeof log.debug>) => {
    if (isDev) log.debug(...args);
  },
  trace: (...args: Parameters<typeof log.trace>) => {
    if (isDev) log.trace(...args);
  },
  withTag: (tag: string, level?: LogLevel) =>
    consola.create({
      level: level ?? (isProd ? 3 : 5),
      defaults: {
        tag
      }
    })
};
