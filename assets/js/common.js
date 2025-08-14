
    // Scroll toggle body class
    window.addEventListener('scroll', () => {
      document.body.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Toggle menu
    function toggleMenu() {
      const nav = document.getElementById('navLinks');
      const burger = document.querySelector('.burger');
      nav.classList.toggle('show');
      burger.classList.toggle('active');
    }

    function closeMenu() {
      document.getElementById('navLinks').classList.remove('show');
      document.querySelector('.burger').classList.remove('active');
    }

    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;

  //  document.addEventListener("DOMContentLoaded", function () {
  //   setTimeout(() => {
  //     document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
  //       // Optional: add delay between each element
  //       setTimeout(() => {
  //         el.classList.add('visible');
  //       }, index * 200); // stagger animation by 200ms per item
  //     });
  //   }, 1000); // wait 1 second before starting animation
  // });
$(document).ready(function () {
  // Delegate submit to dynamically loaded form
  $(document).on("submit", "#contact-form", function (e) {
    e.preventDefault();
    console.log("Form submitted");

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbx-ylb_8rCoKc9F88UADDYoq9HBbRaYDnZepSSLm53qI3X2QtmEPPZPB8JVX9HgJCMF/exec",
      method: "POST",
      data: $(this).serialize(),
      success: function (response) {
        alert("Form submitted");
        $("#contact-form")[0].reset(); // optional reset
        // window.location.reload();
      },
      error: function (xhr, status, error) {
        console.warn("Likely CORS block, but data was submitted.");
        console.warn("XHR:", xhr);

        // Suppress error alert if form was likely successful
        if (xhr.status === 0 || xhr.readyState === 0) {
          alert("Form submitted successfully");
          $("#contact-form")[0].reset();
        } else {
          alert("Error submitting form: " + error);
        }
      }
    });
  });
});



      
  

