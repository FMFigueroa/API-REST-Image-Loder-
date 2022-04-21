import { encrypt, compare } from "../utils/handlePassword.js";
import {
  handleHttpError,
  handleErrorResponse,
}  from "../utils/handleError.js";
import { tokenSign } from "../utils/handleToken.js";

import Users from "../models/nosql/users.model.js";
import { matchedData } from "express-validator";

/* ===================== Sign In ========================== */
export const loginCtrl = async (req, res) => {
  try {
    const body = matchedData(req);
    const user = await Users.findOne({ email: body.email }).select('name email password role');
    if (!user) {
      handleErrorResponse(res, "USER_NOT_EXISTS", 404);
      return
    }
    const checkPassword = await compare(body.password, user.password);

    if (!checkPassword) {
      handleErrorResponse(res, "PASSWORD_INVALID", 401);
      return
    }

    const tokenJwt = await tokenSign(user);
    user.set('password', undefined, {strict:false});
    
    const data = {
      token: tokenJwt,
      user: user,
    };
    
    res.status(200).json([ 
        {success: true,
         message: 'User Login Successfully',
         results: data
        }
      ]) 
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* ====================== Sign Up ============================ */
export const registerCtrl = async (req, res) => {
  try {
    const body = matchedData(req);
    // const checkIsExist = await userModel.findOne({
    //   where: { email: body.email },
    // });
    const checkIsExist = await Users.findOne({ email: body.email });
    if (checkIsExist) {
      handleErrorResponse(res, "This user already exists", 401);
      return
    }
    const password = await encrypt(body.password);
    const bodyInsert = { ...body, password };
    const dataUser = await Users.create(bodyInsert);
    dataUser.set('password', undefined, {strict:false});
    const tokenJwt = await tokenSign(dataUser);
    res.status(201).json([ 
        {success: true,
         message: 'User Created Successfully',
         token: tokenJwt,
         user: dataUser
        }
      ])
  } catch (e) {
    handleHttpError(res, e);
  }
};
/* ========================================================== */