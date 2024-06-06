import { S as Swiper, f as freeMode, T as Thumb, E as EffectFade, C as Controller, N as Navigation, P as Pagination, A as Autoplay, I as IMask, a as axios, g as gsapWithCSS, b as ScrollTrigger, L as Lenis } from "./vendor.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
Swiper.use([freeMode, Thumb, EffectFade, Controller, Navigation, Pagination, Autoplay]);
const menuLinks = document.querySelectorAll("[data-goto]");
if (menuLinks.length > 0) {
  let onMenuLinkClick = function(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      console.log(gotoBlock);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY;
      console.log(gotoBlockValue);
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault(e);
      document.body.classList.remove("_lock");
      iconMenu.classList.remove("active");
      menuBody.classList.remove("active");
      overlay.classList.remove("active");
    }
  };
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
}
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
let overlay = document.createElement("div");
overlay.className = "overlay";
if (iconMenu) {
  iconMenu.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("active");
    menuBody.classList.toggle("active");
    document.body.appendChild(overlay);
    overlay.classList.toggle("active");
  });
}
overlay.addEventListener("click", function() {
  document.body.classList.toggle("_lock");
  iconMenu.classList.toggle("active");
  menuBody.classList.toggle("active");
  overlay.classList.toggle("active");
});
document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".menu__item");
  accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector(".menu__item-nav");
    if (accordionHeader) {
      accordionHeader.addEventListener("click", () => {
        item.querySelector(".menu__sublist");
        toggleAccordion(item);
      });
    }
  });
  const toggleAccordion = (item) => {
    const accordionContent = item.querySelector(".menu__sublist");
    if (item.classList.contains("acrd-open")) {
      accordionContent.classList.remove("active");
      item.classList.remove("acrd-open");
    } else {
      accordionContent.classList.add("active");
      item.classList.add("acrd-open");
    }
  };
});
const navLink = document.querySelectorAll(".menu__subitem");
if (navLink) {
  const linkAction = () => {
    document.body.classList.remove("_lock");
    iconMenu.classList.remove("active");
    menuBody.classList.remove("active");
    overlay.classList.remove("active");
  };
  navLink.forEach((n) => n.addEventListener("click", linkAction));
}
new Swiper(".tea-slider", {
  spaceBetween: 20,
  slidesPerView: 4,
  loop: false,
  centeredSlides: false,
  navigation: {
    nextEl: ".tea-nav.catalog__slider-next",
    prevEl: ".tea-nav.catalog__slider-prev"
  },
  breakpoints: {
    1: {
      slidesPerView: 1,
      centeredSlides: false,
      spaceBetween: 10
    },
    500: {
      slidesPerView: 1.3,
      centeredSlides: false,
      spaceBetween: 15
    },
    650: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    968: {
      slidesPerView: 2,
      centeredSlides: false,
      spaceBetween: 30
    },
    1080: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: false
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: false
    }
  }
});
new Swiper(".fito-slider", {
  spaceBetween: 20,
  slidesPerView: 4,
  loop: false,
  centeredSlides: false,
  navigation: {
    nextEl: ".fito-nav.catalog__slider-next",
    prevEl: ".fito-nav.catalog__slider-prev"
  },
  breakpoints: {
    1: {
      slidesPerView: 1,
      centeredSlides: false,
      spaceBetween: 10
    },
    500: {
      slidesPerView: 1.3,
      centeredSlides: false,
      spaceBetween: 15
    },
    650: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    968: {
      slidesPerView: 2,
      centeredSlides: false,
      spaceBetween: 30
    },
    1080: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: false
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: false
    }
  }
});
document.addEventListener("DOMContentLoaded", function() {
  var thumbsSwiper = new Swiper(".gallery-thumbs", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
    // Ensure visibility tracking
  });
  new Swiper(".modal-chai__slider", {
    spaceBetween: 10,
    thumbs: {
      swiper: thumbsSwiper
    }
  });
});
function createSwiperSlides(images) {
  const modalSliderWrapper = document.querySelector(".modal-chai__slider .swiper-wrapper");
  const galleryThumbsWrapper = document.querySelector(".gallery-thumbs .swiper-wrapper");
  modalSliderWrapper.innerHTML = "";
  galleryThumbsWrapper.innerHTML = "";
  images.forEach((imgPath) => {
    const modalSwiperSlide = document.createElement("div");
    modalSwiperSlide.classList.add("swiper-slide");
    const modalImgContainer = document.createElement("div");
    modalImgContainer.classList.add("modal-chai__image");
    const img = document.createElement("img");
    img.setAttribute("src", imgPath);
    img.setAttribute("alt", "");
    modalImgContainer.appendChild(img);
    modalSwiperSlide.appendChild(modalImgContainer);
    modalSliderWrapper.appendChild(modalSwiperSlide);
    const thumbSwiperSlide = document.createElement("div");
    thumbSwiperSlide.classList.add("swiper-slide", "gallery-slide");
    const thumbImgContainer = document.createElement("div");
    thumbImgContainer.classList.add("gallery-image");
    const thumbImg = document.createElement("img");
    thumbImg.setAttribute("src", imgPath);
    thumbImg.setAttribute("alt", "");
    thumbImgContainer.appendChild(thumbImg);
    thumbSwiperSlide.appendChild(thumbImgContainer);
    galleryThumbsWrapper.appendChild(thumbSwiperSlide);
  });
  updateSwipers();
}
function updateSwipers() {
  new Swiper(".modal-chai__slider", {
    spaceBetween: 10,
    thumbs: {
      swiper: new Swiper(".gallery-thumbs", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      })
    }
  });
}
const catalogSlides = document.querySelectorAll(".catalog__slide");
const modalChaiBody = document.querySelector(".modal-chai__body");
const modalChaiContent = document.querySelector(".modal-chai__content");
const modalChaiClose = document.querySelector(".js-modal-close");
const modalChaiTitle = document.querySelector(".modal-chai__title");
const modalChaiDescription = document.querySelector(".modal-chai__text");
const modalChaiList = document.querySelector(".modal-chai__list");
const openModalChai = (title, description, ingredients, images) => {
  document.body.classList.add("_lock");
  modalChaiBody.classList.add("active");
  modalChaiContent.classList.add("active");
  modalChaiTitle.textContent = title;
  modalChaiDescription.textContent = description;
  modalChaiList.innerHTML = "";
  ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    li.classList.add("modal-chai__item");
    modalChaiList.appendChild(li);
  });
  createSwiperSlides(images);
};
catalogSlides.forEach((slide) => {
  slide.addEventListener("click", () => {
    const dataChai = slide.dataset.chai;
    if (!dataChai) {
      console.error("No data attribute found");
      return;
    }
    try {
      const { title, description, ingredients, images } = JSON.parse(dataChai);
      openModalChai(title, description, ingredients, images);
    } catch (error) {
      console.error("Invalid JSON in data attribute", error);
    }
  });
});
modalChaiClose.addEventListener("click", () => {
  modalChaiBody.classList.remove("active");
  document.body.classList.remove("_lock");
  modalChaiContent.classList.remove("active");
});
modalChaiBody.addEventListener("click", (event) => {
  if (!modalChaiContent.contains(event.target)) {
    modalChaiBody.classList.remove("active");
    document.body.classList.remove("_lock");
    modalChaiContent.classList.remove("active");
  }
});
const sucesBody = document.querySelector(".succes__body");
const sucesContent = document.querySelector(".succes__content");
const sucesClose = document.querySelector(".succes__close");
function sucesOpen() {
  sucesBody.classList.add("_active");
  sucesContent.classList.add("_active");
  document.body.classList.add("_lock");
}
if (sucesClose) {
  sucesClose.addEventListener("click", (e) => {
    sucesBody.classList.remove("_active");
    sucesContent.classList.remove("_active");
    document.body.classList.remove("_lock");
  });
}
sucesBody.addEventListener("click", (event) => {
  if (!sucesContent.contains(event.target)) {
    sucesBody.classList.remove("_active");
    sucesContent.classList.remove("_active");
    document.body.classList.remove("_lock");
  }
});
let phones = document.querySelectorAll('[data-mask="phone"]');
phones.forEach(function(element) {
  new IMask(element, {
    mask: "+{7}(000)000-00-00"
  });
});
function validatePhone(phone) {
  const cleanedPhone = phone.replace(/\D/g, "");
  console.log(new String(cleanedPhone).length);
  console.log(cleanedPhone.length === 11, "partial");
  if (cleanedPhone.length === 11) {
    return true;
  } else {
    return false;
  }
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validateText(text) {
  const trimmedText = text.trim();
  if (trimmedText.length >= 2) {
    return true;
  } else {
    return false;
  }
}
const validate = (input) => {
  const dataType = input.getAttribute("data-type");
  let res = true;
  switch (dataType) {
    case "phone":
      res = validatePhone(input.value);
      break;
    case "text":
      res = validateText(input.value);
      break;
    case "email":
      res = validateEmail(input.value);
      break;
  }
  console.log(input, res, dataType);
  return res;
};
let forms = document.querySelectorAll(".js-form");
console.log(forms);
forms.forEach((form) => {
  let formButton = form.querySelector(".js-form-submit");
  console.log(formButton);
  if (formButton) {
    formButton.addEventListener("click", (e) => {
      e.preventDefault();
      formButton.disabled = true;
      const inputs = form.querySelectorAll("input, textarea");
      const method = form.method;
      const action = form.action;
      let isValidated = true;
      let formData = [];
      inputs.forEach((input) => {
        formData.push({
          name: input.name,
          value: input.value,
          isValidate: validate(input)
        });
      });
      formData.forEach((item) => {
        const input = form.querySelector(`[name="${item.name}"]`);
        const wrapper = input.parentNode;
        const errorBlock = wrapper.querySelector(".js-error");
        if (!item.isValidate) {
          isValidated = false;
          errorBlock.classList.add("_active");
          wrapper.classList.add("_active");
        } else {
          errorBlock.classList.remove("_active");
          wrapper.classList.remove("_active");
        }
      });
      if (!isValidated) {
        formButton.disabled = false;
        return false;
      }
      axios({
        method,
        url: action,
        data: formData
      }).then((response) => {
        sucesOpen();
        console.log("success");
        formButton.disabled = false;
        inputs.forEach((input) => {
          input.value = "";
        });
      }).catch((error) => {
        console.log("error");
        document.body.classList.remove("_lock");
        sucesOpen();
        formButton.disabled = false;
        inputs.forEach((input) => {
          input.value = "";
        });
      });
    });
  }
});
gsapWithCSS.registerPlugin(ScrollTrigger);
const lenis = new Lenis();
lenis.on("scroll", (e) => {
  console.log(e);
});
lenis.on("scroll", ScrollTrigger.update);
gsapWithCSS.ticker.add((time) => {
  lenis.raf(time * 1e3);
});
gsapWithCSS.ticker.lagSmoothing(0);
document.addEventListener("DOMContentLoaded", () => {
  const animateElement = (element, yDistance) => {
    gsapWithCSS.fromTo(
      element,
      { y: yDistance },
      {
        y: 0,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          // начальная точка анимации
          end: "top center",
          // конечная точка анимации
          scrub: true
          // делает анимацию плавной при скролле
        }
      }
    );
  };
  const observerOptions = {
    threshold: 0.1
    // процент видимости элемента для триггера
  };
  const observer = new IntersectionObserver((entries, observer2) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("decor-brand-1")) {
          animateElement(entry.target, 100);
        } else if (entry.target.classList.contains("decor-brand-2")) {
          animateElement(entry.target, 100);
        }
        observer2.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const decorElements = document.querySelectorAll(".decor-brand-1, .decor-brand-2");
  decorElements.forEach((el) => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {
  const animateElement = (element, yDistance, duration) => {
    gsapWithCSS.fromTo(
      element,
      { y: 200 },
      {
        y: -yDistance,
        duration,
        ease: "expoScale(0.5,7,none)",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          // начальная точка анимации
          end: "bottom top",
          // конечная точка анимации
          scrub: true
          // делает анимацию плавной при скролле
        }
      }
    );
  };
  const observerOptions = {
    threshold: 0.1
    // процент видимости элемента для триггера
  };
  const observer = new IntersectionObserver((entries, observer2) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("hero-decor-1")) {
          animateElement(entry.target, 200, 0.5);
        } else if (entry.target.classList.contains("hero-decor-2")) {
          animateElement(entry.target, 200, 4);
        }
        observer2.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const heroDecorElements = document.querySelectorAll(".hero-decor-1, .hero-decor-2");
  heroDecorElements.forEach((el) => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {
  const animateElement = (element, yDistance, duration) => {
    gsapWithCSS.fromTo(
      element,
      { y: 200 },
      {
        y: -yDistance,
        duration,
        ease: "expoScale(0.5,7,none)",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          // начальная точка анимации
          end: "bottom top",
          // конечная точка анимации
          scrub: true
          // делает анимацию плавной при скролле
        }
      }
    );
  };
  const observerOptions = {
    threshold: 0.1
    // процент видимости элемента для триггера
  };
  const observer = new IntersectionObserver((entries, observer2) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("decor-catalog-1")) {
          animateElement(entry.target, 200, 0.5);
        } else if (entry.target.classList.contains("decor-catalog-2")) {
          animateElement(entry.target, 200, 4);
        }
        observer2.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const heroDecorElements = document.querySelectorAll(".decor-catalog-1, .decor-catalog-2");
  heroDecorElements.forEach((el) => observer.observe(el));
});
gsapWithCSS.utils.toArray(".image-parallax").forEach((container) => {
  const img = container.querySelector("svg");
  const tl = gsapWithCSS.timeline({
    scrollTrigger: {
      trigger: container,
      scrub: true,
      pin: false
    }
  });
  tl.fromTo(
    img,
    {
      yPercent: -15,
      ease: "none"
    },
    {
      yPercent: 20,
      ease: "none"
    }
  );
});
