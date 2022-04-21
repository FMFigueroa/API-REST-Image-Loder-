import { handleHttpError,  handleErrorResponse } from "../utils/handleError.js";

export const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role; //role: ["user"] o ["admin"]

    //TODO: ["admin","manager"]
     const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle)); //TODO: true, false

    if (!checkValueRol) {
       handleErrorResponse(res, "USER_NOT_PERMISSIONS", 403);
      return;
    } 
    next();
  } catch (e) {
      handleHttpError(res, e);
  }
};
