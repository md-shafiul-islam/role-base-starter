class EsLogger {
  isLogActive = process.env.NEXT_PUBLIC_FONT_LOG;
  
  
  log(message, obj) {
    if (this.isLogActive === "true") {
      obj=obj ?? "";
      //esBackLogger.info(message, obj);
    }
  }
}

export const esFontLogger = new EsLogger();
