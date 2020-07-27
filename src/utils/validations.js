export const detailOfferVE = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input name cannot be empty',
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last name cannot be empty',
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input email cannot be empty',
    },
  ];
  export const detailOfferZE = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input name cannot be empty',
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last name cannot be empty',
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input email cannot be empty',
    },
    {
      field: 'accountNumber',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input account number cannot be empty',
    },
  ];
  export const detailOfferMP = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input name cannot be empty',
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last name cannot be empty',
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input email cannot be empty',
    },
    {
      field: 'bankData',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input payment data cannot be empty',
    },
    {
      field: 'address',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input address cannot be empty',
    },
  ];
  
  export const detailOfferWU = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input name cannot be empty',
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last name cannot be empty',
    },
    {
      field: 'bankData',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input payment data cannot be empty',
    },
    {
      field: 'address',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input address cannot be empty',
    },
  ];
  
  export const detailOfferMG = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input name cannot be empty',
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last name cannot be empty',
    },
    {
      field: 'phone',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input phone cannot be empty',
    },
    {
      field: 'bankData',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input payment data cannot be empty',
    },
    {
      field: 'address',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input address cannot be empty',
    },
  ];
  
  export const detailOfferNE = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input name cannot be empty',
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last name cannot be empty',
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input email cannot be empty',
    },
  ];
  
  export const detailOfferUP = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input name cannot be empty',
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last name cannot be empty',
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input email cannot be empty',
    },
  ];
  
  export const detailOfferPP = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input name cannot be empty',
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last name cannot be empty',
    },
    {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input email cannot be empty',
    },
  ];
  
  export const detailOfferBN = [
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input name cannot be empty',
    },
    {
      field: 'lastName',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last name cannot be empty',
    },
    {
      field: 'bankData',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input payment data cannot be empty',
    },
   
  ];

  export const createPinValidations =[

    {
      field: 'pin',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input pin cannot be empty',
    },
    {
      field: 'pin',
      method: 'isLength',
      args: [{min:6, max: undefined}],
      validWhen: true,
      message: 'You must enter 6 numbers',
    },
    {
      field: 'pin',
      method: 'isInt',      
      validWhen: true,
      message: 'The pin can only be numbers',
    },
    {
      field: 'pinConfirm',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input last pinConfirm cannot be empty',
    },
    {
      field: 'pinConfirm',
      method: 'isLength',
      args: [{min:6, max: undefined}],
      validWhen: true,
      message: 'You must enter 6 numbers',
    },
    {
      field: 'pinConfirm',
      method: 'isInt',      
      validWhen: true,
      message: 'The pinConfirm can only be numbers',
    }
      
  ];

  export const PinFormValidations =[

    {
      field: 'pin',
      method: 'isEmpty',
      validWhen: false,
      message: 'The input pin cannot be empty',
    },
    {
      field: 'pin',
      method: 'isLength',
      args: [{min:6, max: undefined}],
      validWhen: true,
      message: 'You must enter 6 numbers',
    }      
  ];