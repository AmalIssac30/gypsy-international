
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
// $(document).ready(function () {
//   // Delegate submit to dynamically loaded form
//   $(document).on("submit", "#contact-form", function (e) {
//     e.preventDefault();
//     console.log("Form submitted");

//     $.ajax({
//       url: "https://script.google.com/macros/s/AKfycbwabqsgb_fJiVKVcaNYvvJbFI9H0wWupd3SwugEFJa2cDAPpftyaz9DcusdO7qhiLQ/exec",
//       method: "POST",
//       data: $(this).serialize(),
//       success: function (response) {
//         alert("Form submitted");
//         $("#contact-form")[0].reset(); // optional reset
//         // window.location.reload();
//       },
//       error: function (xhr, status, error) {
//         console.warn("Likely CORS block, but data was submitted.");
//         console.warn("XHR:", xhr);

//         // Suppress error alert if form was likely successful
//         if (xhr.status === 0 || xhr.readyState === 0) {
//           alert("Form submitted successfully");
//           $("#contact-form")[0].reset();
//         } else {
//           alert("Error submitting form: " + error);
//         }
//       }
//     });
//   });
// });
// ========================= FRONTEND SCRIPT ==============================
// jQuery AJAX with Loader + Custom Popup + Overlay + Subtext

// $(document).ready(function () {
//   // Inject loader and popup containers into body if not exist
//   if ($("#form-loader").length === 0) {
//     $("body").append('<div id="form-loader" style="display:none;"><div class="loader"></div></div>');
//   }

//   if ($("#form-popup-overlay").length === 0) {
//     $("body").append('<div id="form-popup-overlay" style="display:none;"><div id="form-popup"><span id="form-popup-message"></span><span id="form-popup-subtext"></span><br><button id="popup-ok-btn">OK</button></div></div>');
//   }

//   function showLoader() {
//     $("#form-loader").fadeIn();
//   }

//   function hideLoader() {
//     $("#form-loader").fadeOut();
//   }

//   function showPopup(message, subtext = "", isSuccess = true) {
//     var popup = $("#form-popup");
//     popup.removeClass("success error");
//     popup.addClass(isSuccess ? "success" : "error");
//     $("#form-popup-message").text(message);
//     $("#form-popup-subtext").text(subtext);
//     $("#form-popup-overlay").fadeIn();
//   }

//   // Close popup on OK button
//   $(document).on("click", "#popup-ok-btn", function () {
//     $("#form-popup-overlay").fadeOut();
//   });

//   // Delegate submit to dynamically loaded form
//   $(document).on("submit", "#contact-form", function (e) {
//     e.preventDefault();
//     console.log("Form submitted");

//     showLoader();

//     $.ajax({
//       url: "https://script.google.com/macros/s/AKfycbyJxDr8Yd4qbFTLBBAxnbQED6eY-SnrNPzE2zMtTbNN6FuZhKWQtDELWhtp268eIek/exec",
//       method: "POST",
//       data: $(this).serialize(),
//       success: function (response) {
//         hideLoader();
//         if (response && response.status === "success") {
//           showPopup("Form submitted successfully!", "We will get back to you shortly.", true);
//         } else {
//           showPopup("Form submitted but response invalid.", "Please check your form settings.", false);
//         }
//         $("#contact-form")[0].reset();
//       },
//       error: function (xhr, status, error) {
//         hideLoader();
//         console.warn("Likely CORS block, but data was submitted.");
//         if (xhr.status === 0 || xhr.readyState === 0) {
//           showPopup("Form submitted successfully!", "We will contact you soon.", true);
//           $("#contact-form")[0].reset();
//         } else {
//           showPopup("Error submitting form: " + error, "Please try again later.", false);
//         }
//       }
//     });
//   });
// });
// ========================= FRONTEND SCRIPT ==============================
$(document).ready(function () {
  if ($("#form-popup-overlay").length === 0) {
    $("body").append(`
      <div id="form-popup-overlay" style="display:none;">
        <div id="form-popup">
          <span id="form-popup-message"></span>
          <span id="form-popup-subtext"></span><br>
          <button id="popup-ok-btn">OK</button>
        </div>
      </div>
    `);
  }

  function showButtonLoader(button) {
    button.prop("disabled", true);
    button.data("original-text", button.html());
    button.html('<span class="spinner"></span> Submitting...');
  }

  function hideButtonLoader(button) {
    button.prop("disabled", false);
    button.html(button.data("original-text"));
  }

  function showPopup(message, subtext = "", isSuccess = true) {
    var popup = $("#form-popup");
    popup.removeClass("success error");
    popup.addClass(isSuccess ? "success" : "error");
    $("#form-popup-message").text(message);
    $("#form-popup-subtext").text(subtext);
    $("#form-popup-overlay").fadeIn();
  }

  $(document).on("click", "#popup-ok-btn", function () {
    $("#form-popup-overlay").fadeOut();
  });

  $(document).on("submit", "#contact-form", function (e) {
    e.preventDefault();

    let email = $("input[name=email]").val().trim();
    let phone = $("input[name=phone]").val().trim();

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // Normalize: remove (0), spaces, dashes, parentheses, dots
    let normalizedPhone = phone
      .replace(/\(0\)/g, "")
      .replace(/[\s\-().]/g, "");

    // Validation
    const indianPattern = /^\+91[6-9]\d{9}$|^[6-9]\d{9}$/;
    const internationalPattern = /^\+\d{1,3}\d{6,14}$/;

    if (normalizedPhone.startsWith("+91")) {
      const digitsOnly = normalizedPhone.replace(/^\+91/, "");
      if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
        showPopup("Invalid Phone Number", "Enter a valid 10-digit Indian number after +91.", false);
        return;
      }
    } else if (/^[6-9]\d{9}$/.test(normalizedPhone)) {
      // valid local Indian number
    } else if (internationalPattern.test(normalizedPhone)) {
      // valid international number
    } else {
      showPopup("Invalid Phone Number", "Please enter a valid Indian or international number with the country code.", false);
      return;
    }
    console.log("Form submitted");

    let submitBtn = $(this).find("button[type=submit]");
    showButtonLoader(submitBtn);

    // >>> IMPORTANT: Keep original formatting for Sheets (with +, spaces, dashes, parentheses)
    let phoneForSheet = phone;
    if (phoneForSheet.startsWith("+")) {
      phoneForSheet = "'" + phoneForSheet; // safe for Sheets
    }

    let formData = $(this).serializeArray().map(field => {
      if (field.name === "phone") {
        field.value = phoneForSheet; // saves user’s raw input format
      }
      return field;
    });

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbxWDUubTjx2qwzXzPxauLMlB_5MHSYp0HM9NKqJTfYiKZ5w_rSdigkUGDzselDGgZY/exec",
      method: "POST",
      data: $.param(formData),
      success: function (response) {
        hideButtonLoader(submitBtn);
        if (response && response.status === "success") {
          showPopup("Form submitted successfully!", "We will get back to you shortly.", true);
        } else {
          showPopup("Form submitted but response invalid.", "Please check your form settings.", false);
        }
        $("#contact-form")[0].reset();
      },
      error: function (xhr, status, error) {
        hideButtonLoader(submitBtn);
        if (xhr.status === 0 || xhr.readyState === 0) {
          showPopup("Form submitted successfully!", "We will contact you soon.", true);
          $("#contact-form")[0].reset();
        } else {
          showPopup("Error submitting form: " + error, "Please try again later.", false);
        }
      }
    });
  });
});










  

