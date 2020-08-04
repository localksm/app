import { mapPaymentMethod, cleanText, copy } from '../src/utils/misc';

// Test copy address
test('copy address', () =>{
  expect(copy('1234567890')).toBe(undefined)
})

// Test clean text helper
test('cleanText string', () => {
  expect(cleanText('Text with special character==')).toBe('Text with special character');
});

// Test payment method mapping
test('mapPaymentMethod VE', () => {
  expect(mapPaymentMethod('VE')).toBe('Venmo');
});

test('mapPaymentMethod ZE', () => {
  expect(mapPaymentMethod('ZE')).toBe('Zelle');
});

test('mapPaymentMethod MP', () => {
  expect(mapPaymentMethod('MP')).toBe('Mercado Pago');
});

test('mapPaymentMethod WU', () => {
  expect(mapPaymentMethod('WU')).toBe('Western Union');
});

test('mapPaymentMethod MG', () => {
  expect(mapPaymentMethod('MG')).toBe('Money Gram');
});

test('mapPaymentMethod NE', () => {
  expect(mapPaymentMethod('NE')).toBe('Neteller');
});

test('mapPaymentMethod UP', () => {
  expect(mapPaymentMethod('UP')).toBe('Uphold');
});

test('mapPaymentMethod PP', () => {
  expect(mapPaymentMethod('PP')).toBe('Paypal');
});

test('mapPaymentMethod Bank', () => {
  expect(mapPaymentMethod('BN')).toBe('Bank');
});

test('mapPaymentMethod OT', () => {
  expect(mapPaymentMethod('OT')).toBe('Other');
});
