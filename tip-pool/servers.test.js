describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
  });

  it('should increment server id for each new server', function () {
    submitServerInfo();
    expect(serverId).toEqual(1);
    serverNameInput.value = 'Bob';
    submitServerInfo();
    expect(serverId).toEqual(2);
  });

  it('should not update for server name that is empty string', function () {
    serverNameInput.value = '';
    submitServerInfo();
    expect(serverId).toEqual(0);
    expect(Object.keys(allServers).length).toBe(0);
  });

  it('should clear the serverNameInput after form submit', function () {
    submitServerInfo();
    expect(serverNameInput.value).toBe('');
  });

  it('should have a row for each server in the server table', function() {
    submitServerInfo();
    const serverTable = document.getElementById("serverTable");
    let tableRows = serverTable.querySelectorAll("tbody > tr");
    expect(tableRows.length).toEqual(1);
    serverNameInput.value = 'Bob';
    submitServerInfo();
    tableRows = serverTable.querySelectorAll("tbody > tr");
    expect(tableRows.length).toEqual(2);
  });

  it('should create one table datum for server name and one table datum for amount', function() {
    submitServerInfo();
    const serverTable = document.getElementById("serverTable");
    serverNameInput.value = 'Bob';
    submitServerInfo();
    const tableRows = serverTable.querySelectorAll("tbody > tr");
    let tableRowData = tableRows[0].querySelectorAll("td");
    expect(tableRowData[0].innerHTML).toEqual('Alice');
    expect(tableRowData[1].innerHTML).toEqual('$0.00');
    tableRowData = tableRows[1].querySelectorAll("td");
    expect(tableRowData[0].innerHTML).toEqual('Bob');
    expect(tableRowData[1].innerHTML).toEqual('$0.00');
  });

  it('should have a delete button for each server in the table', function() {
    submitServerInfo();
    const serverTable = document.getElementById("serverTable");
    serverNameInput.value = 'Bob';
    submitServerInfo();
    const tableRows = serverTable.querySelectorAll("tbody > tr");
    let tableRowData = tableRows[0].querySelectorAll("td");
    expect(tableRowData[2].innerHTML).toEqual('X');
    tableRowData = tableRows[1].querySelectorAll("td");
    expect(tableRowData[2].innerHTML).toEqual('X');
  });

  it('should set the id for the table row as "server"+serverId', function() {
    submitServerInfo();
    const serverTable = document.getElementById("serverTable");
    serverNameInput.value = 'Bob';
    submitServerInfo();
    let tableRows = serverTable.querySelectorAll("tbody > tr");
    expect(tableRows[0].id).toEqual('server1');
    expect(tableRows[1].id).toEqual('server2');
  });

  it('should calculate the tip average based off the number of servers', function() {
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
    };
    submitServerInfo();
    serverNameInput.value = 'Bob';
    submitServerInfo();
    const tableRows = serverTable.querySelectorAll("tbody > tr");
    let tableRowData = tableRows[0].querySelectorAll("td");
    expect(tableRowData[1].innerHTML).toEqual('$19.00');
    tableRowData = tableRows[1].querySelectorAll("td");
    expect(tableRowData[1].innerHTML).toEqual('$19.00');
  });

  it('should display the tip value rounded to two decimal places', function() {
    allPayments = {
      payment1: {
          billAmt: '100',
          tipAmt: '17.04',
          tipPercent: '18',
      },
      payment2: {
          billAmt: '200',
          tipAmt: '20',
          tipPercent: '10',
      },
    };
    submitServerInfo();
    serverNameInput.value = 'Bob';
    submitServerInfo();
    const tableRows = serverTable.querySelectorAll("tbody > tr");
    let tableRowData = tableRows[0].querySelectorAll("td");
    expect(tableRowData[1].innerHTML).toEqual('$18.52');
    tableRowData = tableRows[1].querySelectorAll("td");
    expect(tableRowData[1].innerHTML).toEqual('$18.52');
  });

  afterEach(function() {
    allServers = {};
    allPayments = {};
    serverId = 0;
    serverTbody.innerHTML = '';
  });
});
