export function mapPaymentMethod(method) {
    const methods = {
      VE: 'Venmo',
      ZE: 'Zelle',
      MP: 'Mercado Pago',
      WU: 'Western Union',
      MG: 'Money Gram',
      NE: 'Neteller',
      UP: 'Uphold',
      PP: 'Paypal',
      BN: 'Bank',
      OT: 'Other',
    };
    return methods[method];
  }
  