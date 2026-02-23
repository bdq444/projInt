document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("demoForm");
  const preview = document.getElementById("preview");
  const exportBtn = document.getElementById("exportTxt");
  function getCheckedValues(formEl, name) {
    return Array.from(formEl.querySelectorAll(`input[name="${name}"]:checked`))
      .map(el => el.value);
  }

  function getRadioValue(formEl, name) {
    const el = formEl.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // FormData dobrze działa dla inputów tekstowych, ale dla checkboxów wygodniej jawnie zebrać zaznaczenia
    const data = new FormData(form);

    const name = (data.get("name") || "").toString().trim();
    const surname = (data.get("surname") || "").toString().trim();
    const gender = (data.get("gender") || "").toString().trim();
    const birthyear = (data.get("birthyear") || "").toString().trim();

    const email = (data.get("email") || "").toString().trim();
    const city = (data.get("city") || "").toString().trim();
    const country = (data.get("country") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();

    const discipline = (data.get("discipline") || "").toString().trim();
    const level = (data.get("level") || "").toString().trim();
    const device = (data.get("device") || "").toString().trim();

    const prefs = getCheckedValues(form, "prefs");
    const contactChannel = getRadioValue(form, "contact_channel");

    const notes = (data.get("notes") || "").toString().trim();

    let out = "";
    out += "=== DANE OSOBOWE ===\n";
    out += `Imię: ${name}\n`;

    out += `Nazwisko: ${surname}\n`;
    out += `Płeć: ${gender || "(brak)"}\n`;
    out += `Rok urodzenia: ${birthyear || "(brak)"}\n\n`;

    out += "=== DANE KONTAKTOWE ===\n";
    out += `E-mail: ${email}\n`;
    out += `Miasto: ${city || "(brak)"}\n`;
    out += `Kraj: ${country || "(brak)"}\n`;
    out += `Telefon: ${phone || "(brak)"}\n\n`;

    out += "=== ZAINTERESOWANIA ===\n";
    out += `Dziedzina: ${discipline || "(brak)"}\n`;
    out += `Poziom: ${level || "(brak)"}\n`;
    out += `Urządzenie: ${device || "(brak)"}\n\n`;

    out += "=== PREFERENCJE (CHECKBOX) ===\n";
    out += `prefs: ${prefs.length ? prefs.join(", ") : "(brak)"}\n\n`;

    out += "=== KANAŁ KONTAKTU (RADIO) ===\n";
    out += `contact_channel: ${contactChannel || "(brak)"}\n\n`;

    out += "=== UWAGI ===\n";
    out += notes ? notes + "\n" : "(brak)\n";
	
    preview.value = out;
  });

  exportBtn.addEventListener("click", () => {
    const text = (preview.value || "").trim();
    if (!text) {
      alert("Brak danych do eksportu. Najpierw kliknij „Wyślij”.");
      return;
    }

    const blob = new Blob([preview.value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "dane_formularza.txt";
    a.click();

    URL.revokeObjectURL(url);
  });

  // Uwaga: autofocus w HTML spełnia wymóg "pierwsze pole aktywne po wyrenderowaniu"
});
