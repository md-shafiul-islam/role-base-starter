import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export interface TechReviewApiRequest extends NextApiRequest {
  extdToken: {
    userId: string | null;
    userName: string | null;
    status: boolean | false;
  };
}

export default function getRouteHandeller() {
  return nextConnect<TechReviewApiRequest, NextApiResponse>({
    onError(error, req, resp) {
      resp
        .status(501)
        .json({ message: `Error something went wrong. ${error}` });
    },
    onNoMatch(req, resp) {
      resp.status(405).json({ message: `Method. ${req.method} Not Allowed` });
    },
  }).use((req, resp, next) => {
      req.extdToken = null;

      const {authorization} = req.headers;

      if(!authorization){
          next();
      }else{
          //TODO: Impliment Autintication
          next();
      }
  });
}
