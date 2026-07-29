/**
 * FAITHORA Logger
 */

const logger = {
  info(message: string) {
    console.log("INFO:", message);
  },

  error(message: string, error?: unknown) {
    console.error("ERROR:", message, error);
  },

  http(message: string) {
    console.log("HTTP:", message);
  }
};

export default logger;