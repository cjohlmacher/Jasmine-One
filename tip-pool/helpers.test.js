describe("Helpers test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
      allPayments = {
        payment1: {
            billAmt: '100',
            tipAmt: '18',
            tipPercent: '18',
        },
        payment2: {
            billAmt: '200',
            tipAmt: '20',
            tipPercent: '10',
        },
      }
    });
  
    it('should sum the tip amounts for all payments', function () {
      expect(sumPaymentTotal('tipAmt')).toBe(38);
    });

    it('should sum the bill amounts for all payments', function () {
        expect(sumPaymentTotal('billAmt')).toBe(300);
      });

    it('should sum the tip percent amounts for all payments', function () {
    expect(sumPaymentTotal('tipPercent')).toBe(28);
    });

    it('should calculate the tip percent rounded to whole number', function () {
        expect(calculateTipPercent('100','18')).toBe(18);
        expect(calculateTipPercent('200','20')).toBe(10);
        expect(calculateTipPercent('73','14')).toBe(19);
    });
  
    it('should add a new table datum to a table row ', function () {
        const tableRow = document.createElement("tr");
        appendTd(tableRow, '5');
        const tableDatum = tableRow.querySelector("td");
        expect(tableDatum.innerText).toBe('5');
    });

    it('should add a delete button to a table row', function () {
      const tableRow = document.createElement("tr");
      appendTd(tableRow, '5');
      appendDeleteBtn(tableRow);
      const tableData = tableRow.querySelectorAll("td");
      expect(tableData[1].innerText).toBe('X');
  });

    afterEach(function() {
      allPayments = {};
      serverId = 0;
      serverTbody.innerHTML = '';
    });
  });