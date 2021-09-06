it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({
    amount: 40000,
    years: 10,
    rate: 0.06,
  })).toBe('444.08');
  expect(calculateMonthlyPayment({
    amount: 200000,
    years: 30,
    rate: 0.05,
  })).toBe('1073.64');
  expect(calculateMonthlyPayment({
    amount: 200001,
    years: 30,
    rate: 0.05,
  })).toBe('1073.65');
});

it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({
    amount: 20000,
    years: 8,
    rate: 0.07,
  }).length).toBe(6);
  expect(calculateMonthlyPayment({
    amount: 20023.89,
    years: 8,
    rate: 0.07,
  }).length).toBe(6);
  expect(calculateMonthlyPayment({
    amount: 1,
    years: 30,
    rate: 0.02,
  }).length).toBe(4);

});

/// etc
