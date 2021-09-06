
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

function appendDeleteBtn(tr) {
  let newTd = document.createElement('td');
  newTd.innerText = 'X';
  newTd.addEventListener('click',function(event) {
    const parentRow = event.target.parentElement;
    const parentRowId = parentRow.id;
    if (parentRow.id.slice(0,6) === 'server') {
      delete allServers[parentRow.id];
    } else if (parentRow.id.slice(0,7) === 'payment') {
      delete allPayments[parentRow.id];
    }
    event.target.parentElement.remove();
    updateSummary();
    updateServerTable();
  });
  tr.append(newTd);
}