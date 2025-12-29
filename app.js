// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") root.classList.add("light");
themeBtn.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
});

// Reveal on scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

// Content (ES/EN) based on your CV
// Contact + title + summary + skills + experience + education + certifications:
// - Email/LinkedIn/Title/Location/Skills/Extract/Experience/Education/Certs from your PDF. :contentReference[oaicite:3]{index=3} :contentReference[oaicite:4]{index=4}
const DATA = {
  es: {
    nav: { about:"Perfil", skills:"Skills", projects:"Proyectos", exp:"Experiencia", edu:"Educación", certs:"Certificaciones", contact:"Contacto" },
    kicker: "Australia · Disponible para remoto",
    headline: "Técnica IT (ASIR) · Ciberseguridad · Redes · Linux · Firewalls · Docker",
    summary:
      "Soy Técnica en Administración de Sistemas Informáticos en Red (ASIR) con experiencia práctica en administración de redes, configuración de firewalls (pfSense), virtualización (VMware, VirtualBox), contenedores Docker y entornos Windows y Linux.",
    cardTitle: "Enfoque",
    focus: [
      "Administración de sistemas y redes",
      "Seguridad perimetral (pfSense, iptables)",
      "Virtualización y contenedores",
      "Entornos Windows / Linux",
      "Orientada a trabajo remoto"
    ],
    skillsTitle:"Skills",
    skillsSubtitle:"Competencias clave para Sysadmin / Network / Blue Team.",
    skillsTechTitle:"Técnicas",
    skillsOtherTitle:"Idiomas",
    skillsTech: [
      "Networking (Cisco, VLANs, routing)",
      "Firewalls (pfSense, iptables)",
      "Sistemas (Linux, Windows Server)",
      "Docker, VirtualBox, Wireshark, Cloudflare"
    ],
    skillsLang: [
      "Inglés: nivel profesional (B2 aprox.)",
      "Portugués: A2"
    ],
    projectsTitle:"Proyectos",
    projectsSubtitle:"Portfolios públicos para mostrar trabajo real.",
    projBlueDesc:"Lab reproducible: telemetría Sysmon, validación con queries, log samples sanitizados, runbooks y MITRE mapping.",
    projTfgDesc:"Proyecto de segmentación (Administración/IoT/Invitados) con reglas de firewall, VPN y controles para elevar la seguridad doméstica.",
    expTitle:"Experiencia",
    expSubtitle:"Historial profesional.",
    exp: [
      "Tecnek Cybersecurity — Analista de ciberseguridad (oct 2024 – sep 2025)",
      "Groupon — Business Development Consultant (nov 2022 – nov 2024)",
      "Línea Directa Aseguradora — Telemarketing (nov 2017 – nov 2022)",
      "GSS (Global Sales Solutions) — Coordinador (mar 2016 – nov 2017)",
      "GSS (Global Sales Solutions) — Operador (dic 2014 – mar 2016)"
    ],
    eduTitle:"Educación",
    edu: [
      "Universidad Europea — FP Grado Superior ASIR (oct 2023 – may 2025)"
    ],
    certsTitle:"Certificaciones",
    certs: [
      "Cisco Certified Entry Networking Technician",
      "Palo Alto Networks Cybersecurity Academy",
      "Cloud Security Fundamental",
      "Cybersecurity Foundation",
      "Network Security Fundamental"
    ],
    contactTitle:"Contacto",
    ctaProjects:"Ver proyectos",
    ctaContact:"Contactar",
    badgeBlue:"Blue Team",
    badgeNet:"Network"
  },
  en: {
    nav: { about:"About", skills:"Skills", projects:"Projects", exp:"Experience", edu:"Education", certs:"Certifications", contact:"Contact" },
    kicker: "Australia · Remote-ready",
    headline: "IT Technician (ASIR) · Cybersecurity · Networks · Linux · Firewalls · Docker",
    summary:
      "I’m an IT Systems and Network Administration Technician (ASIR) with hands-on experience in network administration, firewall configuration (pfSense), virtualization (VMware, VirtualBox), Docker containers, and both Windows and Linux environments.",
    cardTitle: "Focus",
    focus: [
      "Systems & network administration",
      "Perimeter security (pfSense, iptables)",
      "Virtualization & containers",
      "Windows / Linux environments",
      "Open to remote roles"
    ],
    skillsTitle:"Skills",
    skillsSubtitle:"Key skills for Sysadmin / Network / Blue Team roles.",
    skillsTechTitle:"Technical",
    skillsOtherTitle:"Languages",
    skillsTech: [
      "Networking (Cisco, VLANs, routing)",
      "Firewalls (pfSense, iptables)",
      "Systems (Linux, Windows Server)",
      "Docker, VirtualBox, Wireshark"
    ],
    skillsLang: [
      "English: Professional working (approx. B2)",
      "Portuguese: A2"
    ],
    projectsTitle:"Projects",
    projectsSubtitle:"Public portfolios to show verifiable work.",
    projBlueDesc:"Reproducible lab: Sysmon telemetry, validation queries, sanitized log samples, runbooks, and MITRE mapping.",
    projTfgDesc:"Home segmentation (Admin/IoT/Guest) with firewall rules, VPN and controls to raise home security.",
    expTitle:"Experience",
    expSubtitle:"Professional background.",
    exp: [
      "Tecnek Cybersecurity — Cybersecurity Analyst (Oct 2024 – Sep 2025)",
      "Groupon — Business Development Consultant (Nov 2022 – Nov 2024)",
      "Linea Directa Aseguradora — Telemarketing (Nov 2017 – Nov 2022)",
      "GSS (Global Sales Solutions) — Coordinator (Mar 2016 – Nov 2017)",
      "GSS (Global Sales Solutions) — Operator (Dec 2014 – Mar 2016)"
    ],
    eduTitle:"Education",
    edu: [
      "Universidad Europea — Higher VET (ASIR) (Oct 2023 – May 2025)"
    ],
    certsTitle:"Certifications",
    certs: [
      "Cisco Certified Entry Networking Technician",
      "Palo Alto Networks Cybersecurity Academy",
      "Cloud Security Fundamental",
      "Cybersecurity Foundation",
      "Network Security Fundamental"
    ],
    contactTitle:"Contact",
    ctaProjects:"View projects",
    ctaContact:"Contact",
    badgeBlue:"Blue Team",
    badgeNet:"Network"
  }
};

let lang = localStorage.getItem("lang") || "es";
const langBtn = document.getElementById("langBtn");

function setList(id, arr){
  const el = document.getElementById(id);
  el.innerHTML = "";
  arr.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    el.appendChild(li);
  });
}

function render(){
  const t = DATA[lang];

  // nav
  document.getElementById("navAbout").textContent = t.nav.about;
  document.getElementById("navSkills").textContent = t.nav.skills;
  document.getElementById("navProjects").textContent = t.nav.projects;
  document.getElementById("navExp").textContent = t.nav.exp;
  document.getElementById("navEdu").textContent = t.nav.edu;
  document.getElementById("navCerts").textContent = t.nav.certs;
  document.getElementById("navContact").textContent = t.nav.contact;

  document.getElementById("kicker").textContent = t.kicker;
  document.getElementById("headline").textContent = t.headline;
  document.getElementById("summary").textContent = t.summary;

  document.getElementById("cardTitle").textContent = t.cardTitle;
  setList("focusList", t.focus);

  document.getElementById("skillsTitle").textContent = t.skillsTitle;
  document.getElementById("skillsSubtitle").textContent = t.skillsSubtitle;
  document.getElementById("skillsTechTitle").textContent = t.skillsTechTitle;
  document.getElementById("skillsOtherTitle").textContent = t.skillsOtherTitle;

  setList("skillsTech", t.skillsTech);
  setList("skillsLang", t.skillsLang);

  document.getElementById("projectsTitle").textContent = t.projectsTitle;
  document.getElementById("projectsSubtitle").textContent = t.projectsSubtitle;
  document.getElementById("projBlueDesc").textContent = t.projBlueDesc;
  document.getElementById("projTfgDesc").textContent = t.projTfgDesc;

  document.getElementById("expTitle").textContent = t.expTitle;
  document.getElementById("expSubtitle").textContent = t.expSubtitle;
  setList("expList", t.exp);

  document.getElementById("eduTitle").textContent = t.eduTitle;
  setList("eduList", t.edu);

  document.getElementById("certsTitle").textContent = t.certsTitle;
  setList("certsList", t.certs);

  document.getElementById("contactTitle").textContent = t.contactTitle;
  document.getElementById("ctaProjects").textContent = t.ctaProjects;
  document.getElementById("ctaContact").textContent = t.ctaContact;

  document.getElementById("badgeBlue").textContent = t.badgeBlue;
  document.getElementById("badgeNet").textContent = t.badgeNet;

  // button label
  langBtn.textContent = (lang === "es") ? "EN" : "ES";
}

langBtn.addEventListener("click", () => {
  lang = (lang === "es") ? "en" : "es";
  localStorage.setItem("lang", lang);
  render();
});

render();
