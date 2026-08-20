(function () {
  var root = document.getElementById('fmge-year-table');
  if (!root) return;

  var DATA = {
    '2022': [
      ['Al Farabi Kazakh National University', '12.50%'],
      ['Kazakh National Medical University', '14.90%'],
      ['Caspian University', '13.16%'],
      ['South Kazakh Medical Academy', '23.62%'],
      ['Karaganda Medical University', '19.49%'],
      ['Kazakh-Russian Medical University', '26.44%'],
      ['Astana Medical University', '32.52%'],
      ['West Kazakh Medical University', '29.44%'],
      ['Semey State Medical University', '24.51%']
    ],
    '2023': [
      ['Al Farabi Kazakh National University', '1/4 = 25%'],
      ['Kazakh National Medical University', '33/408 = 8.08%'],
      ['Caspian University', '18/294 = 6.12%'],
      ['South Kazakh Medical Academy', '30/341 = 8.79%'],
      ['Karaganda Medical University', '118/1,106 = 10.66%'],
      ['Kazakh-Russian Medical University', '54/355 = 15.21%'],
      ['Astana Medical University', '84/358 = 23.46%'],
      ['West Kazakh Medical University', '59/267 = 23.68%'],
      ['Semey State Medical University', '90/650 = 13.84%']
    ],
    '2024': [
      ['Al Farabi Kazakh National University', '95/186 = 51.07%'],
      ['Kazakh National Medical University', '178/655 = 27.17%'],
      ['Caspian University', '35/401 = 8.72%'],
      ['South Kazakh Medical Academy', '134/538 = 24.90%'],
      ['Karaganda Medical University', '277/1,142 = 24.25%'],
      ['Kazakh-Russian Medical University', '95/400 = 23.75%'],
      ['Astana Medical University', '149/416 = 35.81%'],
      ['West Kazakh Medical University', '70/273 = 25.64%'],
      ['Semey State Medical University', '164/751 = 21.83%']
    ],
    'Jun 2025': [
      ['Al Farabi Kazakh National University', '38/101 = 37.62%'],
      ['Kazakh National Medical University', '50/275 = 18.18%'],
      ['Caspian University', '16/180 = 8.89%'],
      ['South Kazakh Medical Academy', '55/263 = 20.91%'],
      ['Karaganda Medical University', '55/461 = 11.93%'],
      ['Kazakh-Russian Medical University', '22/160 = 13.75%'],
      ['Astana Medical University', '23/144 = 15.97%'],
      ['West Kazakh Medical University', '13/112 = 11.61%'],
      ['Semey State Medical University', '50/316 = 15.82%']
    ],
    'Dec 2025': [
      ['Al Farabi Kazakh National University', '19/62 = 30.65%'],
      ['Kazakh National Medical University', '382/947 = 40.34%'],
      ['Caspian University', '26/180 = 14.44%'],
      ['South Kazakh Medical Academy', '85/358 = 23.74%'],
      ['Karaganda Medical University', '154/667 = 23.09%'],
      ['Kazakh-Russian Medical University', '51/220 = 23.18%'],
      ['Astana Medical University', '109/300 = 36.33%'],
      ['West Kazakh Medical University', '43/176 = 24.43%'],
      ['Semey State Medical University', '96/381 = 25.20%']
    ]
  };

  var years = Object.keys(DATA);

  var tabBar = document.createElement('div');
  tabBar.className = 'year-tab-bar';
  tabBar.innerHTML = years.map(function (y, i) {
    return '<button class="year-tab' + (i === years.length - 1 ? ' active' : '') + '" data-year="' + y + '">' + y + '</button>';
  }).join('');

  var tableWrap = document.createElement('div');
  tableWrap.className = 'table-wrap';
  tableWrap.innerHTML = '<table class="info-table"><thead><tr><th>University</th><th>FMGE Passing %</th></tr></thead><tbody id="fmgeBody"></tbody></table>';

  root.appendChild(tabBar);
  root.appendChild(tableWrap);

  var bodyEl = document.getElementById('fmgeBody');

  function render(year) {
    bodyEl.innerHTML = DATA[year].map(function (row) {
      return '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td></tr>';
    }).join('');
  }

  tabBar.addEventListener('click', function (e) {
    var btn = e.target.closest('.year-tab');
    if (!btn) return;
    tabBar.querySelectorAll('.year-tab').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
    render(btn.getAttribute('data-year'));
  });

  render(years[years.length - 1]);
})();
