import  { check } from "express-validator";
import  { validateResult } from "../utils/handleValidator.js";

export const validateObjectDataCreate = [
  check('name').exists().notEmpty().isLength({min:4,max:50}),
  check('album').exists().notEmpty(),
  check('cover').exists().notEmpty(),
  check('owner.name').exists().notEmpty(),
  check('owner.nickname').exists().notEmpty(),
  check('owner.nationality').exists().notEmpty(),
  check('price').exists().notEmpty(),
  check('assetId').exists().notEmpty().isMongoId(),
  (req,res,next) =>{
    validateResult(req, res, next);
  }
];

export const validateObjectDataUpdate = [
  check('id').exists().notEmpty(),
  check('name').exists().notEmpty(),
  check('album').exists().notEmpty(),
  check('cover').exists().notEmpty(),
  check('owner.name').exists().notEmpty(),
  check('owner.nickname').exists().notEmpty(),
  check('owner.nationality').exists().notEmpty(),
  check('price').exists().notEmpty(),
  check('assetId').exists().notEmpty().isMongoId(),
  (req,res,next) =>{
    validateResult(req, res, next);
  }
];

export const validateId = [
  check('id').exists().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];