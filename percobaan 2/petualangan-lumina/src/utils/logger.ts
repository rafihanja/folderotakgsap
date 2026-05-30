import { gameConfig } from '../config/gameConfig';

export const logger = {
  info: (msg: string, ...args: any[]) => {
    if (gameConfig.debug) console.log(`[INFO] ${msg}`, ...args);
  },
  warn: (msg: string, ...args: any[]) => {
    if (gameConfig.debug) console.warn(`[WARN] ${msg}`, ...args);
  },
  error: (msg: string, ...args: any[]) => {
    console.error(`[ERROR] ${msg}`, ...args);
  }
};
