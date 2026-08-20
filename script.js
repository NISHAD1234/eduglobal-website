// ── EmailJS configuration ────────────────────────────────────────────────
// Template variables used ({{title}}, {{name}}, {{email}}, {{message}}, {{time}})
// must match the "Contact Us" template in the EmailJS dashboard.
// 1. Copy your Public Key from Account > General and paste it below.
// 2. Copy the Template ID for the "Contact Us" template (Content tab, top of page
//    or the template list) and paste it below.
var EMAILJS_CONFIG = {
  PUBLIC_KEY: 'l7BXlGQXXzCurtFyt',
  SERVICE_ID: 'service_z68wbxm',
  TEMPLATE_ID: 'template_gylspnq'
};

(function initEmailJS(){
  if (window.emailjs && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
  }
})();

function handleSubmit(e, type){
  e.preventDefault();
  var form = e.target;
  var successEl = document.getElementById(type === 'quick' ? 'quickSuccess' : 'fullSuccess');
  var errorEl = document.getElementById(type === 'quick' ? 'quickError' : 'fullError');
  var submitBtn = form.querySelector('button[type="submit"]');

  errorEl.classList.remove('show');
  successEl.classList.remove('show');

  var notConfigured = !window.emailjs || EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY';
  if (notConfigured) {
    console.warn('EmailJS is not configured yet — see EMAILJS_CONFIG in script.js. Showing demo success message only.');
    form.reset();
    successEl.classList.add('show');
    setTimeout(function(){ successEl.classList.remove('show'); }, 5000);
    return;
  }

  submitBtn.disabled = true;
  var originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';

  var data = new FormData(form);
  var name = data.get('user_name') || '';
  var phone = data.get('user_phone') || '';
  var email = data.get('user_email') || '';
  var country = data.get('country') || '';
  var message = data.get('message') || '';
  var formType = data.get('form_type') || 'Enquiry';

  var bodyLines = [
    'Phone: ' + phone,
    'Preferred country: ' + country
  ];
  if (message) bodyLines.push('Message: ' + message);

  var templateParams = {
    title: formType + ' — ' + name,
    name: name,
    email: email,
    message: bodyLines.join('\n')
  };

  emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
    .then(function(){
      form.reset();
      successEl.classList.add('show');
      setTimeout(function(){ successEl.classList.remove('show'); }, 5000);
    })
    .catch(function(err){
      console.error('EmailJS error:', err);
      errorEl.classList.add('show');
      setTimeout(function(){ errorEl.classList.remove('show'); }, 5000);
    })
    .finally(function(){
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
}

var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', function(){
  var isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = '#fff';
  navLinks.style.padding = '20px 24px';
  navLinks.style.boxShadow = '0 8px 20px rgba(15,42,74,.12)';
  navLinks.style.gap = '16px';
});
navLinks.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){
    if(window.innerWidth <= 700){ navLinks.style.display = 'none'; }
  });
});

// ── Basic inspect/right-click deterrent (cosmetic only — does not stop
// technical visitors; view-source, disabling JS, or a proxy all bypass it) ──
document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
document.addEventListener('keydown', function (e) {
  var k = e.key;
  var blocked =
    k === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].indexOf(k) !== -1) ||
    (e.ctrlKey && ['U', 'u', 'S', 's'].indexOf(k) !== -1);
  if (blocked) e.preventDefault();
});

var serviceTabs = document.getElementById('serviceTabs');
if (serviceTabs) {
  serviceTabs.querySelectorAll('.service-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      serviceTabs.querySelectorAll('.service-tab').forEach(function(t){ t.classList.remove('active'); });
      document.querySelectorAll('.service-panel').forEach(function(p){ p.classList.remove('active'); });
      tab.classList.add('active');
      var panel = document.querySelector('.service-panel[data-panel="' + tab.getAttribute('data-tab') + '"]');
      if (panel) panel.classList.add('active');
    });
  });
}
