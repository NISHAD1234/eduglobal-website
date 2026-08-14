(function () {
  var PAGE_SIZE = 50;
  var state = { rows: [], filtered: [], page: 1 };

  var root = document.getElementById('seats-directory');
  if (!root) return;

  var toolbar = document.createElement('div');
  toolbar.className = 'dt-toolbar';
  toolbar.innerHTML =
    '<input type="text" class="dt-search" id="seatsSearch" placeholder="Search state, college or university...">' +
    '<span class="dt-count" id="seatsCount"></span>';

  var tableWrap = document.createElement('div');
  tableWrap.className = 'table-wrap dt-scroll';
  tableWrap.innerHTML =
    '<table class="info-table">' +
    '<thead><tr>' +
    '<th>State</th><th>College Name</th><th>Affiliated University</th>' +
    '<th>Management</th><th>Seats</th><th>Recognition Status</th>' +
    '</tr></thead>' +
    '<tbody id="seatsBody"></tbody>' +
    '</table>';

  var pagination = document.createElement('div');
  pagination.className = 'dt-pagination';
  pagination.id = 'seatsPagination';

  root.appendChild(toolbar);
  root.appendChild(tableWrap);
  root.appendChild(pagination);

  var searchEl = document.getElementById('seatsSearch');
  var bodyEl = document.getElementById('seatsBody');
  var countEl = document.getElementById('seatsCount');
  var pagEl = document.getElementById('seatsPagination');

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function render() {
    var totalPages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * PAGE_SIZE;
    var pageRows = state.filtered.slice(start, start + PAGE_SIZE);

    bodyEl.innerHTML = pageRows.map(function (r) {
      return '<tr>' +
        '<td>' + esc(r.state) + '</td>' +
        '<td>' + esc(r.college) + '</td>' +
        '<td>' + esc(r.university) + '</td>' +
        '<td>' + esc(r.management) + '</td>' +
        '<td>' + (r.seats == null ? '—' : esc(r.seats)) + '</td>' +
        '<td>' + esc(r.status) + '</td>' +
        '</tr>';
    }).join('');

    var shownFrom = state.filtered.length === 0 ? 0 : start + 1;
    var shownTo = Math.min(start + PAGE_SIZE, state.filtered.length);
    countEl.textContent = 'Showing ' + shownFrom + '–' + shownTo + ' of ' + state.filtered.length + ' colleges';

    var btns = [];
    btns.push('<button ' + (state.page === 1 ? 'disabled' : '') + ' data-page="' + (state.page - 1) + '">Prev</button>');
    var windowStart = Math.max(1, state.page - 2);
    var windowEnd = Math.min(totalPages, windowStart + 4);
    windowStart = Math.max(1, windowEnd - 4);
    for (var p = windowStart; p <= windowEnd; p++) {
      btns.push('<button class="' + (p === state.page ? 'active' : '') + '" data-page="' + p + '">' + p + '</button>');
    }
    btns.push('<button ' + (state.page === totalPages ? 'disabled' : '') + ' data-page="' + (state.page + 1) + '">Next</button>');
    pagEl.innerHTML = btns.join('');
  }

  pagEl.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-page]');
    if (!btn || btn.disabled) return;
    state.page = parseInt(btn.getAttribute('data-page'), 10);
    render();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  var searchTimer;
  searchEl.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      var q = searchEl.value.trim().toLowerCase();
      state.filtered = !q ? state.rows : state.rows.filter(function (r) {
        return (r.state + ' ' + r.college + ' ' + r.university).toLowerCase().indexOf(q) !== -1;
      });
      state.page = 1;
      render();
    }, 150);
  });

  fetch('assets/data/mbbs-seats-india.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      state.rows = data;
      state.filtered = data;
      render();
    })
    .catch(function () {
      countEl.textContent = 'Could not load college data.';
    });
})();
