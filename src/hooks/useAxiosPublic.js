import axios from "axios";
import { useNavigate } from "react-router-dom";


const axiosPublic = axios.create({});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
