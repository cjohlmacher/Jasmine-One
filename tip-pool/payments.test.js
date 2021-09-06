describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
      billAmtInput.value = '100';
      tipAmtInput.value = '18';
    });
  
    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
      });
    
      it('should increment payment id for each new payment', function () {
        submitPaymentInfo();
        expect(paymentId).toEqual(1);
        billAmtInput.value = '70';
        tipAmtInput.value = '14';
        submitPaymentInfo();
        expect(paymentId).toEqual(2);
      });
    
      it('should not update for empty bill amount', function () {
        billAmtInput.value = '';
        submitPaymentInfo();
        expect(paymentId).toEqual(0);
        expect(Object.keys(allPayments).length).toBe(0);
      });

      it('should not update for empty tip amount', function () {
        tipAmtInput.value = '';
        submitPaymentInfo();
        expect(paymentId).toEqual(0);
        expect(Object.keys(allPayments).length).toBe(0);
      });

      it('should not update for bill amount less than or equal to 0', function() {
        billAmtInput.value = '-20';
        submitPaymentInfo();
        billAmtInput.value = '0';
        tipAmtInput.value = '18';
        expect(paymentId).toEqual(0);
        expect(Object.keys(allPayments).length).toBe(0);
      });
    
      it('should clear the inputs after form submit', function () {
        tipAmtInput.value = '-1';
        submitPaymentInfo();
        expect(paymentId).toEqual(0);
        expect(Object.keys(allPayments).length).toBe(0);
      });
    
      it('should have a row for each payment in the payment table', function() {
        submitPaymentInfo();
        const paymentTable = document.getElementById("paymentTable");
        let tableRows = paymentTable.querySelectorAll("tbody > tr");
        expect(tableRows.length).toEqual(1);
        billAmtInput.value = '70';
        tipAmtInput.value = '14';
        submitPaymentInfo();
        tableRows = paymentTable.querySelectorAll("tbody > tr");
        expect(tableRows.length).toEqual(2);
      });
    
      it('should create one table datum for bill amount, one table datum for tip amount and one table datum for tip percent', function() {
        submitPaymentInfo();
        const paymentTable = document.getElementById("paymentTable");
        billAmtInput.value = '70';
        tipAmtInput.value = '14';
        submitPaymentInfo();
        const tableRows = paymentTable.querySelectorAll("tbody > tr");
        let tableRowData = tableRows[0].querySelectorAll("td");
        expect(tableRowData[0].innerHTML).toEqual('$100');
        expect(tableRowData[1].innerHTML).toEqual('$18');
        expect(tableRowData[2].innerHTML).toEqual('18%');
        tableRowData = tableRows[1].querySelectorAll("td");
        expect(tableRowData[0].innerHTML).toEqual('$70');
        expect(tableRowData[1].innerHTML).toEqual('$14');
        expect(tableRowData[2].innerHTML).toEqual('20%');
      });
    
      it('should set the id for the table row as "payment"+paymentId', function() {
        submitPaymentInfo();
        const paymentTable = document.getElementById("paymentTable");
        billAmtInput.value = '70';
        tipAmtInput.value = '14';
        submitPaymentInfo();
        let tableRows = paymentTable.querySelectorAll("tbody > tr");
        expect(tableRows[0].id).toEqual('payment1');
        expect(tableRows[1].id).toEqual('payment2');
      });
    
      it('should calculate tip percentage average rounded to nearest whole number', function() {
        submitPaymentInfo();
        billAmtInput.value = '70';
        tipAmtInput.value = '14';
        submitPaymentInfo();
        expect(summaryTds[2].innerHTML).toEqual('19%');
      });

      it('should display the sum of all bill amounts', function() {
        submitPaymentInfo();
        billAmtInput.value = '70';
        tipAmtInput.value = '14';
        submitPaymentInfo();
        expect(summaryTds[0].innerHTML).toEqual('$170');
      });

      it('should display the sum of all tip amounts', function() {
        submitPaymentInfo();
        billAmtInput.value = '70';
        tipAmtInput.value = '14';
        submitPaymentInfo();
        expect(summaryTds[1].innerHTML).toEqual('$32');
      });

      it('should have a delete button for each payment in the table', function() {
        submitPaymentInfo();
        const paymentTable = document.getElementById("paymentTable");
        billAmtInput.value = '70';
        tipAmtInput.value = '14';
        submitPaymentInfo();
        const tableRows = paymentTable.querySelectorAll("tbody > tr");
        let tableRowData = tableRows[0].querySelectorAll("td");
        expect(tableRowData[3].innerHTML).toEqual('X');
        tableRowData = tableRows[1].querySelectorAll("td");
        expect(tableRowData[3].innerHTML).toEqual('X');
      });
  
    afterEach(function() {
      allPayments = {};
      paymentId = 0;
      paymentTbody.innerHTML = '';
      for (element of summaryTds) {
          element.innerHTML = '';
      };
      billAmtInput.value = '';
      tipAmtInput.value = '';
    });
  });