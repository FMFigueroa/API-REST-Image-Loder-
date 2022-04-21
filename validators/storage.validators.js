import  { check } from "express-validator";
import  { validateResult } from "../utils/handleValidator.js";


export const validateId = [
  check('id').exists().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];