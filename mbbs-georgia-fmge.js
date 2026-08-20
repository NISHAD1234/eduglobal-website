(function () {
  var root = document.getElementById('fmge-country-table');
  if (!root) return;

  var DATA = {
    '2022': [
      ['Georgia', '1,872', '651', '34.77%'],
      ['Russia', '5,973', '1,555', '26.03%'],
      ['Kazakhstan', '3,342', '714', '21.36%'],
      ['Kyrgyzstan', '6,683', '1,365', '20.42%'],
      ['Uzbekistan', '19', '1', '5.26%'],
      ['Bangladesh', '1,771', '801', '45.22%'],
      ['Romania', '13', '0', '0%'],
      ['Bulgaria', '15', '3', '20%']
    ],
    '2023': [
      ['Georgia', '3,123', '820', '26.26%'],
      ['Russia', '8,450', '1,642', '19.43%'],
      ['Kazakhstan', '3,907', '509', '13.02%'],
      ['Kyrgyzstan', '11,243', '2,017', '17.94%'],
      ['Uzbekistan', '64', '8', '12.50%'],
      ['Bangladesh', '2,342', '627', '26.77%'],
      ['Romania', '20', '1', '5%'],
      ['Bulgaria', '21', '3', '14.28%'],
      ['Armenia', '1,654', '134', '8.10%'],
      ['China', '10,466', '950', '9.07%'],
      ['Nepal', '1,812', '349', '19.26%']
    ],
    '2024': [
      ['Georgia', '4,221', '1,505', '35.65%'],
      ['Russia', '11,287', '3,291', '29.15%'],
      ['Kazakhstan', '5,017', '1,261', '25.13%'],
      ['Kyrgyzstan', '15,135', '3,792', '25.05%'],
      ['Uzbekistan', '490', '197', '40.20%'],
      ['Bangladesh', '2,822', '914', '32.38%'],
      ['Romania', '22', '1', '4.54%'],
      ['Bulgaria', '49', '14', '28.57%'],
      ['Armenia', '2,349', '415', '17.66%'],
      ['Nepal', '1,809', '545', '30.12%']
    ],
    '2025': [
      ['Georgia', '3,509', '1,548', '44.12%'],
      ['Russia', '7,700', '2,950', '38.31%'],
      ['Kazakhstan', '4,010', '1,427', '35.59%'],
      ['Kyrgyzstan', '8,413', '2,479', '29.47%'],
      ['Uzbekistan', '1,115', '533', '47.80%'],
      ['Bangladesh', '2,558', '1,222', '47.77%'],
      ['Romania', '9', '3', '33.33%'],
      ['China', '7,580', '1,975', '26.06%'],
      ['Tajikistan', '645', '186', '28.84%'],
      ['Nepal', '1,166', '441', '37.82%']
    ]
  };

  var years = Object.keys(DATA);

  var tabBar = document.createElement('div');
  tabBar.className = 'year-tab-bar';
  tabBar.innerHTML = years.map(function (y, i) {
    var label = y === '2025' ? '2025 (Consolidated)' : y;
    return '<button class="year-tab' + (i === years.length - 1 ? ' active' : '') + '" data-year="' + y + '">' + label + '</button>';
  }).join('');

  var tableWrap = document.createElement('div');
  tableWrap.className = 'table-wrap';
  tableWrap.innerHTML = '<table class="info-table"><thead><tr><th>Country</th><th>Appeared</th><th>Passed</th><th>Pass %</th></tr></thead><tbody id="fmgeCountryBody"></tbody></table>';

  root.appendChild(tabBar);
  root.appendChild(tableWrap);

  var bodyEl = document.getElementById('fmgeCountryBody');

  function render(year) {
    bodyEl.innerHTML = DATA[year].map(function (row) {
      var highlight = row[0] === 'Georgia' ? ' style="font-weight:700;color:var(--blue);"' : '';
      return '<tr' + highlight + '><td>' + row[0] + '</td><td>' + row[1] + '</td><td>' + row[2] + '</td><td>' + row[3] + '</td></tr>';
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
