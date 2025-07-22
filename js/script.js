  //! Hero image auto crousoules
  const slides = [
    {
      image: 'images/hero11.jpg',
      text: 'Great spaces for perfection <br> and class at best price'
    },
    {
      image: 'images/hero7.jpg',
      text: 'Luxury living in the heart of the city'
    },
    {
      image: 'images/hero4.jpg',
      text: 'Your dream stay is just one step away'
    },
     {
      image: 'images/hero1.jpg',
      text: 'Luxury living in the heart of the city'
    },
    {
      image: 'images/hero12.jpg',
      text: 'Your dream stay is just one step away'
    }
  ];

  let currentSlide = 0;
  const heroSection = document.getElementById('heroSlider');
  const heroHeading = document.getElementById('heroHeading');

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
document.addEventListener('click', function (event) {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    const isClickInsideNavbar = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);

    if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
      // Collapse the navbar
      const collapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
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

      groups.forEach(group => {
        const label = group.querySelector("span").innerText;
        const count = group.querySelector("span.counter").innerText;
        summary.push(`${count} ${label}`);
      });

      document.getElementById("travellerSummary").innerText = summary.join(", ");
    };

    document.querySelectorAll(".btn-counter").forEach(button => {
      button.addEventListener("click", function () {
        const parent = this.closest(".counter-group");
        const increment = this.dataset.action === "plus" ? 1 : -1;
        updateCounter(parent, increment);
      });
    });
  });


  // ! For SLO-MO scroll effect on sections while  scrolling

  document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 300); // 300ms stagger
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  });



// ! Hotel Cards (Carousel)

  document.querySelectorAll('.deal-card').forEach(card => {
    const images = card.querySelectorAll('.carousel-img');
    let currentIndex = 0;

    const showImage = (index) => {
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
    };

    const next = () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    };

    const prev = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    };

    card.querySelector('.nav-btn.right').addEventListener('click', next);
    card.querySelector('.nav-btn.left').addEventListener('click', prev);
  });









