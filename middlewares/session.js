import {
  handleHttpError,
  handleErrorResponse,
}  from "../utils/handleError.js";
import { verifyToken } from "../utils/handleToken.js";
import Users from "../models/nosql/users.model.js";



export const authMiddleware = async (req, res, next) => {
  try{
     if(!req.headers.authorization){
        handleErrorResponse(res, "NEED_SESSION", 401);
        return
    }
    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    if(!dataToken){
        handleErrorResponse(res, "NOT_PAYLOAD_DATA", 401);
        return
    }
    
    /* const query = {
      [propertiesKey.id]:dataToken[propertiesKey.id]
    }
    const user = await Users.findOne(query) */
    const user = await Users.findById(dataToken._id);
    req.user = user;

     next()
    
  }catch(e){
    handleHttpError(res, e);
  }
}