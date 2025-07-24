//! Hero image auto crousoules
const slides = [
  {
    image: "images/hero11.jpg",
    text: "Great spaces for perfection <br> and class at best price",
  },
  {
    image: "images/hero7.jpg",
    text: "Luxury living in the heart of the city",
  },
  {
    image: "images/hero4.jpg",
    text: "Your dream stay is just one step away",
  },
  {
    image: "images/hero1.jpg",
    text: "Luxury living in the heart of the city",
  },
  {
    image: "images/hero12.jpg",
    text: "Your dream stay is just one step away",
  },
];

let currentSlide = 0;
const heroSection = document.getElementById("heroSlider");
const heroHeading = document.getElementById("heroHeading");

function changeSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  const slide = slides[currentSlide];

  // Change background
  heroSection.style.backgroundImage = `url('${slide.image}')`;

  // Change text
  heroHeading.innerHTML = slide.text;
}

// Set initial image
heroSection.style.backgroundImage = `url('${slides[0].image}')`;

// Rotate every 5 seconds
setInterval(changeSlide, 4950);

// !Auto close navbar when i click somewhere else on page
document.addEventListener("click", function (event) {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  const isClickInsideNavbar =
    navbarCollapse.contains(event.target) ||
    navbarToggler.contains(event.target);

  if (!isClickInsideNavbar && navbarCollapse.classList.contains("show")) {
    // Collapse the navbar
    const collapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false,
    });
    collapse.hide();
  }
});

// ! for inc/dec no of travellers to add
document.addEventListener("DOMContentLoaded", function () {
  const updateCounter = (parent, increment) => {
    const countSpan = parent.querySelector("span.counter");
    let count = parseInt(countSpan.innerText);
    count += increment;
    if (count < 0) count = 0;
    countSpan.innerText = count;
    updateSummary(); // update display
  };

  const updateSummary = () => {
    const groups = document.querySelectorAll(".counter-group");
    let summary = [];

    groups.forEach((group) => {
      const label = group.querySelector("span").innerText;
      const count = group.querySelector("span.counter").innerText;
      summary.push(`${count} ${label}`);
    });

    document.getElementById("travellerSummary").innerText = summary.join(", ");
  };

  document.querySelectorAll(".btn-counter").forEach((button) => {
    button.addEventListener("click", function () {
      const parent = this.closest(".counter-group");
      const increment = this.dataset.action === "plus" ? 1 : -1;
      updateCounter(parent, increment);
    });
  });
});

// ! For SLO-MO scroll effect on sections while  scrolling

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("active");
          }, index * 300); // 300ms stagger
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  reveals.forEach((el) => observer.observe(el));
});

// ! Hotel Cards (Carousel)

document.querySelectorAll(".deal-card").forEach((card) => {
  const images = card.querySelectorAll(".carousel-img");
  let currentIndex = 0;

  const showImage = (index) => {
    images.forEach((img) => img.classList.remove("active"));
    images[index].classList.add("active");
  };

  const next = () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  };

  const prev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  };

  card.querySelector(".nav-btn.right").addEventListener("click", next);
  card.querySelector(".nav-btn.left").addEventListener("click", prev);
});

// ! Popular destination cards

const tabButtons = document.querySelectorAll(".tab-btn");
const carouselContents = document.querySelectorAll(
  ".destination-carousel-content"
);

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove all active classes
    tabButtons.forEach((btn) => btn.classList.remove("custom-active"));
    carouselContents.forEach((content) =>
      content.classList.remove("content-show")
    );

    // Add to current
    button.classList.add("custom-active");
    const targetId = button.getAttribute("data-target");
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.add("content-show");
    }
  });
});

// TODO:  LATER JS ADDES FOR SOME FEATURES ===================================================================
// TODO:  LATER JS ADDES FOR SOME FEATURES ====================================================================

// !for whatsapp popup
document.addEventListener("DOMContentLoaded", () => {
  const enquireBtn = document.querySelector('a[href="#enquire"]');
  const popup = document.getElementById("whatsappPopup");
  const closeBtn = document.querySelector(".close-popup");

  enquireBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent scroll
    popup.classList.remove("d-none");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("d-none");
  });

  // Close on background click
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.add("d-none");
  });
});

// ! For search button functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", () => {
    const location = document.querySelector("select").value;
    const [startDateInput, endDateInput] =
      document.querySelectorAll("input[type='date']");
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    const counters = document.querySelectorAll(".counter-group");
    const adults = parseInt(counters[0].querySelector(".counter").innerText);
    const children = parseInt(counters[1].querySelector(".counter").innerText);
    const rooms = parseInt(counters[2].querySelector(".counter").innerText);

    // Validate inputs
    if (!location || !startDate || !endDate) {
      // alert("Please select location and dates.");
    showSearchAlert("Please select a <strong>location</strong> and <strong>dates</strong> to search hotels.");
return;

      // return;
    }

    // Save to sessionStorage
    sessionStorage.setItem(
      "searchParams",
      JSON.stringify({
        location,
        startDate,
        endDate,
        adults,
        children,
        rooms,
      })
    );

    // Redirect to results page
    window.location.href = "search.html";
  });
});

// ! Please select location and dates alert
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", () => {
    const location = document
      .getElementById("selectedLocation")
      ?.textContent?.trim();
    const [startDateInput, endDateInput] =
      document.querySelectorAll("input[type='date']");
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    const isInvalid =
      !location || location === "Select Location" || !startDate || !endDate;

    if (isInvalid) {
      const modal = new bootstrap.Modal(
        document.getElementById("inputWarningModal")
      );
      modal.show();
      return;
    }

    const counters = document.querySelectorAll(".counter-group");
    const adults = parseInt(counters[0].querySelector(".counter").innerText);
    const children = parseInt(counters[1].querySelector(".counter").innerText);
    const rooms = parseInt(counters[2].querySelector(".counter").innerText);

    sessionStorage.setItem(
      "searchParams",
      JSON.stringify({
        location,
        startDate,
        endDate,
        adults,
        children,
        rooms,
      })
    );

    window.location.href = "search.html";
  });
});


function showSearchAlert(message, duration = 2000) {
  const wrapper = document.querySelector(".booking-wrapper");

  // Remove existing alert if any
  const existingAlert = wrapper.querySelector(".interactive-alert");
  if (existingAlert) existingAlert.remove();

  // Create alert
  const alertBox = document.createElement("div");
  alertBox.className = "interactive-alert mb-3";
  alertBox.innerHTML = `
    <i class="bi bi-exclamation-triangle-fill text-warning"></i>
    <span>${message}</span>
  `;

  // Insert into DOM
  wrapper.insertBefore(alertBox, wrapper.firstChild);

  // Auto-hide after X ms
  setTimeout(() => {
    alertBox.remove();
  }, duration);
}


// !Watsapp action button popup
document.addEventListener("DOMContentLoaded", () => {
  const whatsappBtn = document.getElementById("whatsappEnquire");
  const popup = document.getElementById("whatsappPopup");
  const closeBtn = document.querySelector(".close-popup");

  whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("d-none");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("d-none");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.add("d-none");
  });
});
