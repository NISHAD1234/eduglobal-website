(function () {
  var PAGE_SIZE = 10;
  var state = { rows: [], filtered: [], page: 1 };

  var root = document.getElementById('university-directory');
  if (!root) return;

  var toolbar = document.createElement('div');
  toolbar.className = 'dt-toolbar';
  toolbar.innerHTML =
    '<input type="text" class="dt-search" id="uniSearch" placeholder="Search university or city...">' +
    '<span class="dt-count" id="uniCount"></span>';

  var tableWrap = document.createElement('div');
  tableWrap.className = 'table-wrap dt-scroll';
  tableWrap.innerHTML =
    '<table class="info-table">' +
    '<thead><tr>' +
    '<th>University</th><th>City / Region</th><th>Tuition / Year</th>' +
    '<th>FMGE Pass % (2025)</th><th>Hostel</th><th>Indian Mess</th><th>Rating</th>' +
    '</tr></thead>' +
    '<tbody id="uniBody"></tbody>' +
    '</table>';

  var pagination = document.createElement('div');
  pagination.className = 'dt-pagination';
  pagination.id = 'uniPagination';

  root.appendChild(toolbar);
  root.appendChild(tableWrap);
  root.appendChild(pagination);

  var searchEl = document.getElementById('uniSearch');
  var bodyEl = document.getElementById('uniBody');
  var countEl = document.getElementById('uniCount');
  var pagEl = document.getElementById('uniPagination');

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null || s === '' ? '—' : String(s);
    return d.innerHTML;
  }

  function stars(n) {
    if (!n) return '—';
    var full = '★'.repeat(n);
    var empty = '☆'.repeat(Math.max(0, 5 - n));
    return '<span style="color:var(--gold);letter-spacing:1px;">' + full + empty + '</span>';
  }

  function render() {
    var totalPages = Math.max(1, Math.ceil(state.filtered.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;
    var start = (state.page - 1) * PAGE_SIZE;
    var pageRows = state.filtered.slice(start, start + PAGE_SIZE);

    bodyEl.innerHTML = pageRows.map(function (r) {
      return '<tr>' +
        '<td>' + esc(r.university) + '</td>' +
        '<td>' + esc(r.city) + '</td>' +
        '<td>' + esc(r.tuition) + '</td>' +
        '<td>' + esc(r.fmge2025) + '</td>' +
        '<td>' + esc(r.hostel) + '</td>' +
        '<td>' + esc(r.indianMess) + '</td>' +
        '<td>' + stars(r.rating) + '</td>' +
        '</tr>';
    }).join('');

    var shownFrom = state.filtered.length === 0 ? 0 : start + 1;
    var shownTo = Math.min(start + PAGE_SIZE, state.filtered.length);
    countEl.textContent = 'Showing ' + shownFrom + '–' + shownTo + ' of ' + state.filtered.length + ' universities';

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
        return (r.university + ' ' + r.city).toLowerCase().indexOf(q) !== -1;
      });
      state.page = 1;
      render();
    }, 150);
  });

  fetch('assets/data/mbbs-russia-universities.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      state.rows = data;
      state.filtered = data;
      render();
    })
    .catch(function () {
      countEl.textContent = 'Could not load university data.';
    });
})();
