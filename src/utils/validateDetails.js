import FormValidator from './validator';

import {
  detailOfferZE,
  detailOfferWU,
  detailOfferVE,
  detailOfferUP,
  detailOfferPP,
  detailOfferNE,
  detailOfferMP,
  detailOfferMG,
  detailOfferBN,
} from './validations';

const validationObjects = {
  ZE: detailOfferZE,
  WU: detailOfferWU,
  VE: detailOfferVE,
  UP: detailOfferUP,
  PP: detailOfferPP,
  NE: detailOfferNE,
  MP: detailOfferMP,
  MG: detailOfferMG,
  BN: detailOfferBN,
};

function getValidationArray(paymentMethod) {
  return validationObjects[paymentMethod];
}

function buildValidationObject(fields = {}, validation = {}) {
    const fieldsToValidate = {};
    validation.forEach(i => {
    fieldsToValidate[i.field] = fields[i.field];
  });
  return fieldsToValidate;
}

export const validateFormDetails = (
  name,
  lastName,
  email,
  bankData,
  address,
  accountNumber,
  phone,
  paymentMethod,
) => {
  const validationObject = getValidationArray(paymentMethod);
  const fieldsToValidate = buildValidationObject(
    { name, lastName, email, bankData, address, accountNumber, phone },
    validationObject,
  );

  const validatorForm = new FormValidator(validationObject);
  const validation = validatorForm.validate(fieldsToValidate);
  return validation;
};
