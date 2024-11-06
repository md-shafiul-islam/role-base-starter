import { NextResponse } from "next/server";



export const getResponseFormatter = (
  response = null,
  status = false,
  message = "Work !"
) => {
  return NextResponse.json({ response, status, message });
};



export const getResponseFormatterObj = (
  data = { response: null, status: false, message: "Work!" }
) => {
  return NextResponse.json(data);
};

export const getRespFormatte = (
  response = null, status = false, message = "It Work !"
) => {
  return { response, status, message };
};



