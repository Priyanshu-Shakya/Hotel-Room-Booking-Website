document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const offers = document.querySelectorAll(".offer-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filterType = button.getAttribute("data-filter");

      offers.forEach((offer) => {
        const offerType = offer.getAttribute("data-type");

        if (filterType === "all" || offerType === filterType) {
          offer.classList.remove("d-none");
        } else {
          offer.classList.add("d-none");
        }
      });
    });
  });
});

// ! For the clickable copy and  book Button of deals and coupnes
document.addEventListener("DOMContentLoaded", () => {
  // COPY buttons
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.closest(".card").querySelector(".card-title").textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        showCopiedToast(code);
      });
    });
  });

  // "Book Now" buttons
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "booking.html"; // Change to actual booking route
    });
  });

  // Toast creation
  function showCopiedToast(code) {
    const toast = document.createElement("div");
    toast.className = "copy-toast";
    toast.innerHTML = `<i class="bi bi-clipboard-check me-2"></i> Copied <strong>${code}</strong>`;
    document.body.appendChild(toast);

    // Animate show
    setTimeout(() => toast.classList.add("show"), 10);

    // Remove after 2.5s
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
});
