// Order form: live total, and a mailto: draft so no server or signup is needed.

(function () {
  var EMAIL = 'luke.briggs.honey@gmail.com';
  var ITEMS = [
    { id: 'q250', label: 'Leatherwood 250g', price: 10 },
    { id: 'q1kg', label: 'Leatherwood 1kg',  price: 25 }
  ];

  var form  = document.getElementById('order-form');
  var total = document.getElementById('total');
  var error = document.getElementById('form-error');
  if (!form) return;

  function lines() {
    return ITEMS.map(function (item) {
      var qty = parseInt(document.getElementById(item.id).value, 10);
      if (!qty || qty < 1) return null;
      return { label: item.label, qty: qty, cost: qty * item.price };
    }).filter(Boolean);
  }

  function refreshTotal() {
    var sum = lines().reduce(function (a, l) { return a + l.cost; }, 0);
    total.textContent = '$' + sum;
  }

  ITEMS.forEach(function (item) {
    document.getElementById(item.id).addEventListener('input', refreshTotal);
  });
  refreshTotal();

  function fail(message) {
    error.textContent = message;
    error.hidden = false;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    error.hidden = true;

    var chosen = lines();
    // form.name / form.method are HTMLFormElement properties, so go via .elements
    var fields  = form.elements;
    var name    = fields.name.value.trim();
    var contact = fields.contact.value.trim();

    if (!chosen.length) return fail('Pick at least one jar first.');
    if (!name)          return fail('Please add your name so we know who to reply to.');
    if (!contact)       return fail('Please add a phone number or email so we can confirm.');

    var sum = chosen.reduce(function (a, l) { return a + l.cost; }, 0);
    var body = [
      'Hi, I’d like to order:',
      '',
      chosen.map(function (l) { return l.qty + ' x ' + l.label + ' — $' + l.cost; }).join('\n'),
      '',
      'Estimated total: $' + sum,
      '',
      'Name: ' + name,
      'Contact: ' + contact,
      'Pickup or delivery: ' + fields.method.value
    ];

    var notes = fields.notes.value.trim();
    if (notes) body.push('', 'Notes: ' + notes);

    window.location.href = 'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent('Honey order — ' + name) +
      '&body=' + encodeURIComponent(body.join('\n'));
  });
})();
