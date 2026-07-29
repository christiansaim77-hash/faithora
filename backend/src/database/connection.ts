/**
 * FAITHORA Database Connection
 */

export const database = {
  async connect() {
    console.log("Database connected");
  },

  async disconnect() {
    console.log("Database disconnected");
  }
};