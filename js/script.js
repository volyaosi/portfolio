document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  // Added Background to the topbar when the user scrolls down the first screen till user reaches the last screen
  const topBar = document.querySelector(".top-bar");
  const logo = topBar.querySelector("img");
  const logoText = topBar.querySelector(".logo-text");
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  window.addEventListener("scroll", function () {
    if (
      document.documentElement.clientHeight < window.pageYOffset &&
      scrollHeight - document.documentElement.clientHeight - 70 >
        window.pageYOffset
    ) {
      topBar.classList.add("visible-bg");
      // logo.classList.remove("hide");
      logoText.classList.remove("logo-fadein");
      logoText.classList.add("logo-fadeout");
    } else {
      topBar.classList.remove("visible-bg");
      // logo.classList.add("hide");
      logoText.classList.remove("logo-fadeout");
      logoText.classList.add("logo-fadein");
    }
  });

  // Animaten button and direction to works in About section
  const aboutSection = document.querySelector("#about"),
    btn = aboutSection.querySelector(".btn-about");

  window.addEventListener("scroll", function () {
    if (
      window.pageYOffset > aboutSection.offsetTop - 50 &&
      window.pageYOffset <
        aboutSection.offsetTop + aboutSection.offsetHeight + 100
    ) {
      btn.style.animation = "attention 1s 2s 2 ";
    }
  });

  //form validation
  const form = document.querySelector("form"),
    fields = form.querySelectorAll(".field");

  fields.forEach((field) => {
    field.isValid = false;
    field.isNotEmpty = false;
  });

  //regular expression
  const regExpName = /^[a-zа-яё ,.'-]+$/i,
    regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{1,4}$/i;

  const generateErr = (elem, message) => {
    let error = document.createElement("div");
    error.classList.add("error");
    error.innerHTML = message;
    elem.after(error);
    elem.classList.add("error-border");
  };

  const removeErr = (elem) => {
    let error = elem.nextElementSibling;
    if (error) {
      error.remove();
      elem.classList.remove("error-border");
    }
  };

  const eachFieldValidation = (elem) => {
    if (elem.value.trim() === "") {
      generateErr(elem, `Please provide your ${elem.name}`);
      return false;
    }
    return true;
  };

  const validateInput = (elem) => {
    elem.value = elem.value.trim();

    switch (elem.name) {
      case "name":
        if (!regExpName.test(elem.value)) {
          generateErr(elem, `Only latin and cyrillic letters are allowed`);
          elem.isValid = false;
          break;
        }
        elem.isValid = true;
        break;
      case "email":
        if (!regExpEmail.test(elem.value)) {
          generateErr(elem, "Please enter the correct email");
          elem.isValid = false;
          break;
        }
        elem.isValid = true;
        break;
      case "message":
        elem.isValid = true;
        break;
    }
  };

  // validate input on each field change
  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      removeErr(field);

      field.isNotEmpty = eachFieldValidation(field);

      if (field.isNotEmpty) {
        validateInput(field);
        field.classList.add("success-border");
      }
    });
  });

  // validate form on submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    fields.forEach((field) => {
      removeErr(field);

      field.isNotEmpty = eachFieldValidation(field);

      if (field.isNotEmpty) {
        validateInput(field);
      }
    });

    //verify if all fields filled in properly
    let correctFieldsNum = Array.from(fields).reduce((total, field) => {
      if (field.isValid) total++;
      return total;
    }, 0);

    if (correctFieldsNum === fields.length) {
      form.submit();
      form.reset();
    }
  });

  const  img = document.querySelectorAll('img');
  const isSupported = supportWebpCheck();
  img.forEach((elem) => {
    if (!isSupported) {
      elem.src = elem.getAttribute('data-otherImg');
    } else {
      elem.src = elem.getAttribute('data-webp');
    }
  });


  function supportWebpCheck() {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }

    // very old browser like IE 8, canvas not supported
    return false;
  }
});