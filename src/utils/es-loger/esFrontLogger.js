class EsFrontLogger {
  isEnvLoging = process.env.NEXT_PUBLIC_LOG_ON;
  isLoging = false;

  constructor() {
    if (this.isEnvLoging == "true") {
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
      console.log(msg, obj);
    }
  }
}

export const esFrontLogger = new EsFrontLogger();
