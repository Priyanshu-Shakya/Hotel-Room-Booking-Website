    document.addEventListener("DOMContentLoaded", () => {
      const buttons = document.querySelectorAll(".category-btn");
      const items = document.querySelectorAll(".video-item");

      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          buttons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const cat = btn.dataset.cat;
          items.forEach(el => {
            el.style.display = (cat === "all" || el.dataset.cat === cat) ? "block" : "none";
          });
        });
      });

      // Open video modal
      document.querySelectorAll(".video-card").forEach(card => {
        card.addEventListener("click", () => {
          const title = card.querySelector("h6").innerText;
          const videoPath = card.parentElement.dataset.videoPath;
          const modalVideo = document.getElementById("modalVideo");
          document.querySelector("#videoModal .modal-title").innerText = title;
          modalVideo.src = videoPath;
          new bootstrap.Modal(document.getElementById("videoModal")).show();
        });
      });

      // Clear video on modal close
      document.getElementById("videoModal").addEventListener("hidden.bs.modal", () => {
        const modalVideo = document.getElementById("modalVideo");
        modalVideo.pause();
        modalVideo.removeAttribute("src");
      });
    });
