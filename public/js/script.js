document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const button = form.querySelector("button[type='submit']");

      if (button) {
        button.disabled = true;
        button.style.cursor = "progress";
        button.textContent = "Loading....";
        button.style.backgroundColor = "rgb(186 230 253)";
      }
    });
  });
});
