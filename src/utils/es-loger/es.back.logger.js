
class EsBackLogger {
  envStatus = process.env.API_LOG;
  isLoging = false;

  constructor() {

    if (this.envStatus == "true") {
      this.isLoging = true;
    }
  }

  error(msg, obj) {
    if (this.isLoging) {
      console.error(msg, obj);
    }
  }

  info(msg, obj) {

    if (this.isLoging) {
      console.info(msg, obj);
    }
  }
}

export const esBackLogger = new EsBackLogger();
