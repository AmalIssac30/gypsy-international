const routes = {
  '/': 'app/webpages/home.html',
  '/home': 'app/webpages/home.html',
  '/about': 'app/webpages/about.html',
  '/contact': 'app/webpages/contactUs.html',
  '/services': 'app/webpages/services.html',
  '/newupdates': 'app/webpages/newupdates.html',
};

function navigate(path) {
  const route = routes[path] || routes['/'];
  // 👉 Add loading class before fetch
  document.body.classList.add('is_loading');


  
  fetch(route)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
      // 👉 Remove loading and update page-specific class
      document.body.classList.remove('is_loading');

      if (path === '/' || path === '/home') {
        document.body.classList.add('homepage');
        document.body.classList.remove('subpages');
      } else {
        document.body.classList.add('subpages');
        document.body.classList.remove('homepage');
      }

      // Animate on scroll using IntersectionObserver 
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
      initOwlCarousel();
    })
    
    .catch(() => {
      document.body.classList.remove('is_loading');
      document.getElementById('content').innerHTML = '<h2>404 Page not found</h2>';
    });
}

// document.addEventListener('click', function (e) {
//   const target = e.target.closest('a');
//   if (target && target.origin === location.origin && target.hasAttribute('data-link')) {
//     e.preventDefault();
//     const path = target.getAttribute('href');
//     history.pushState(null, null, path);
//     navigate(path);
//   }
// });

document.addEventListener('click', function (e) {
  const target = e.target.closest('a');
  if (target && target.origin === location.origin && target.hasAttribute('data-link')) {
    e.preventDefault();
    const path = target.getAttribute('href');

    // 🔁 Force full reload
    window.location.href = path;
  }
});


window.addEventListener('popstate', () => {
  navigate(location.pathname);
});

window.addEventListener('DOMContentLoaded', () => {
  navigate(location.pathname);
});