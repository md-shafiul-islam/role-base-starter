import mongoose, { Mongoose } from "mongoose";
import { dbUri } from "./db.config";
import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';

class DbClient {

  connection = {};

  curentConnect = {};

  constructor() {
    this.dbConnect();
  }

  dbConnect = async () => {

    try {
      
      if (this.connection.isConnected) {
        esBackLogger.info("already connected");
        return;
      }

      if (mongoose.connections) {
        if (mongoose.connections.lenght > 0) {
          this.connection.isConnected = mongoose.connections[0].readyState;
          this.curentConnect = mongoose.connection;
          if (this.connection.isConnected === 1) {
            return;
          }
          await mongoose.disconnect();
        }
      }

      // mongoose.connect();
      const db = await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      if (db.connections) {
        this.connection.isConnected = db.connections[0]
          ? db.connections[0].readyState
          : false;

        this.curentConnect = mongoose.connection;
      }
    } catch (error) {
      esBackLogger.info("DB Connection Error ", error)
    }



  };

  disconnect = async () => {
    if (this.connection.isConnected) {
      if (process.env.NODE_ENV === "production") {
        await mongoose.disconnect();
        this.connection.isConnected = false;
        this.curentConnect = undefined;
      } else {
        esBackLogger.info("not disconnected");
      }
    }
  };

  convertDocToObj = (doc) => {
    if (doc) {
      doc._id = doc._id.toString();
      doc.createdAt = doc.createdAt?.toString();
      doc.updatedAt = doc.createdAt?.toString();
    }
    return doc;
  };

  getConnection = async () => {
    await this.connect();
    return this.connection;
  }

  getConnect = () => {
    return this.curentConnect;
  }
}

const dbClient = new DbClient();
export default dbClient;
