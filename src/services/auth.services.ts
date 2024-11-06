
import jwt from "jsonwebtoken";



class AuthServices {

    signToken = (aUser: any) => {
        const { _id, password, createdAt, updatedAt, __v, ...user } = aUser;

        return `Bearer ${jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "5d" })}`;
    }

    isVeryfy = async (token: string) => {
        token = token.substring(7);
        return jwt.verify(token, process.env.SECRET_KEY)
    }


}

const authServices = new AuthServices();

export default authServices;