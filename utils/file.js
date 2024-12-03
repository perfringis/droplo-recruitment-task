const fs = require('fs');

class File {

  constructor({ path, limit, size }) {
    this.path = path;
    this.limit = limit;
    this.size = size;
  }

  static async of({ path, limit }) {
    try {
      const stats = await fs.promises.stat(path);
      const size = stats.size / (1024 * 1024);

      if (size > limit) {
        throw new Error(`File is bigger than ${limit}`);
      }

      return new File({
        path, limit, size,
      });
    } catch (error) {
      throw new Error(`Could not read a file ${path}: ${error.message}`);
    }
  }

  getPath() {
    return this.path;
  }

  getLimit() {
    return this.limit;
  }

  getSize() {
    return this.size;
  }
}

module.exports = File;