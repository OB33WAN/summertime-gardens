const contact = {
  email: "hello@summertimegardens.co.uk",
  phoneDisplay: "020 0000 0000",
  phoneHref: "+442000000000"
};

const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const form = document.querySelector("[data-booking-form]");
const status = document.querySelector("[data-form-status]");

if (form instanceof HTMLFormElement && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const postcode = String(data.get("postcode") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = `Garden visit enquiry from ${name || "website visitor"}`;
    const body = [
      "New garden visit enquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Postcode: ${postcode}`,
      `Service: ${service}`,
      "",
      "Garden details:",
      message
    ].join("\n");

    const href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Opening your email app with the enquiry details.";
    window.location.href = href;
  });
}
