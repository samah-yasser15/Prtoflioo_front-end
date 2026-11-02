/* =========================================================
   Portfolio Dynamic Script - Samah Yasser
   ========================================================= */

const portfolioData = {
  name: "Samah Yasser",
  intro: "I build beautiful, responsive, and user-friendly web experiences with a focus on clean code and thoughtful details.",
  about: "I'm a passionate Front-End Developer who enjoys transforming ideas and designs into interactive websites. I care about the little details, accessible experiences, and writing code that stays organized and easy to maintain.",
  email: "samahyasser490@gmail.com",
  whatsappPhone: "+20 1020661260",
  location: "Egypt",
  socials: {
    github: "https://github.com/samah-yasser15",
    linkedin: "https://linkedin.com/in/samah-yasser152820",
  },
  skills: [
    { name: "HTML5", level: "Semantic structure", icon: "◇" },
    { name: "CSS3", level: "Responsive styling", icon: "✿" },
    { name: "JavaScript", level: "Interactive experiences", icon: "JS" },
    { name: "Bootstrap", level: "UI framework", icon: "▦" },
    { name: "React", level: "Component-based UI", icon: "⚛" },
    { name: "Git & GitHub", level: "Version control", icon: "⌘" },
    { name: "Responsive Design", level: "Mobile-first layouts", icon: "▣" },
    { name: "Figma", level: "Design handoff", icon: "◈" }
  ],
  projects: [
    {
      title: "Passionate Web Developer",
      description: "This is a modern, responsive single-page portfolio built with HTML, Bootstrap 5, and FontAwesome.",
      category: "Web App",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://samah-yasser15.github.io/front_end1/",
      image: "image/Passionate Web Developer.png" // <--- حطي هنا مسار أو لينك صورة المشروع الأول
    },
    {
      title: "Family Bakery",
      description: "We're the biggest, best equipped and most advanced Bakery in the greater Los Angeles area with responsive layouts.",
      category: "Landing Page",
      tech: ["HTML", "CSS", "Responsive"],
      link: "https://samah-yasser15.github.io/Family-Bakery/",
      image: "image/Family Bakery.png" // <--- صورة المشروع الثاني
    },
    {
      title: "Personal Portfolio Website",
      description: "A personal portfolio website that introduces an individual, highlights their skills, and showcases their work.",
      category: "UI Design",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://samah-yasser15.github.io/DevelopFoli/",
      image: "image/Personal Portfolio Website.png" 
    },
    {
      title: "Leaf & Ink Bookstore",
      description: "An online bookstore that allows users to explore books, browse collections, and manage their shopping cart.",
      category: "UI Design",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://samah-yasser15.github.io/task3/",
      image: "image/Leaf & Ink Bookstore.png" 
    }
  ]
};


document.title = `${portfolioData.name} | Front-End Developer`;

const heroNameEl = document.getElementById("hero-name");
if (heroNameEl) {
  const parts = portfolioData.name.split(" ");
  heroNameEl.innerHTML = `${escapeHTML(parts.slice(0, -1).join(" "))} <span>${escapeHTML(parts.pop())}</span>`;
}

document.getElementById("hero-intro").textContent = portfolioData.intro;
document.getElementById("about-text").textContent = portfolioData.about;


const emailBtn = document.getElementById("email-button");
if (emailBtn) emailBtn.href = `mailto:${portfolioData.email}`;

// إعداد روابط الواتساب
const whatsappMsg = encodeURIComponent("Hello Samah, I came across your portfolio and would love to connect!");
const whatsappUrl = `https://wa.me/${portfolioData.whatsappPhone}?text=${whatsappMsg}`;

const whatsappBtn = document.getElementById("whatsapp-button");
if (whatsappBtn) {
  whatsappBtn.href = whatsappUrl;
  whatsappBtn.target = "_blank";
  whatsappBtn.rel = "noopener noreferrer";
}

const heroWhatsappBtn = document.getElementById("hero-whatsapp-btn");
if (heroWhatsappBtn) {
  heroWhatsappBtn.href = whatsappUrl;
  heroWhatsappBtn.target = "_blank";
  heroWhatsappBtn.rel = "noopener noreferrer";
}

// عرض بيانات الاتصال والسنة
document.getElementById("email-text").textContent = portfolioData.email;
document.getElementById("whatsapp-text").textContent = `+${portfolioData.whatsappPhone}`;
document.getElementById("location-text").textContent = portfolioData.location;
document.getElementById("footer-name").textContent = portfolioData.name;
document.getElementById("year").textContent = new Date().getFullYear();

for (const [id, url] of Object.entries(portfolioData.socials)) {
  const el = document.getElementById(`${id}-link`);
  if (el) el.href = url;
}


document.getElementById("skills-grid").innerHTML = portfolioData.skills.map(skill => `
  <article class="skill">
    <div class="skill-icon">${escapeHTML(skill.icon)}</div>
    <h3>${escapeHTML(skill.name)}</h3>
    <p>${escapeHTML(skill.level)}</p>
  </article>
`).join("");


function renderProjects(filter = "All") {
  const projects = portfolioData.projects.filter(p => filter === "All" || p.category === filter);
  const grid = document.getElementById("projects-grid");
  
  grid.innerHTML = projects.length ? projects.map((p, i) => `
    <article class="project-card">
      <a class="project-visual" href="${safeURL(p.link)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(p.title)}">
        <span class="project-number">PROJECT 0${i+1}</span>
        <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)}" class="project-img">
        <span class="project-open">↗</span>
      </a>
      <div class="project-info">
        <h3>${escapeHTML(p.title)}</h3>
        <p>${escapeHTML(p.description)}</p>
        <div class="tags">${p.tech.map(t => `<span>${escapeHTML(t)}</span>`).join("")}</div>
        <a class="project-link" href="${safeURL(p.link)}" target="_blank" rel="noopener noreferrer">View live project ↗</a>
      </div>
    </article>`).join("") : `<p class="empty-state">No projects in this category yet.</p>`;
}
renderProjects();


document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelector(".filter.active")?.classList.remove("active");
  button.classList.add("active");
  renderProjects(button.dataset.filter);
}));


const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  }
}), { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));


document.getElementById("theme-toggle")?.addEventListener("click", () => document.body.classList.toggle("light-mode"));
document.getElementById("menu-toggle")?.addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));
navLinks.forEach(link => link.addEventListener("click", () => document.querySelector(".sidebar").classList.remove("open")));


function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

function safeURL(value) {
  try { 
    const url = new URL(value); 
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#"; 
  } catch { 
    return "#"; 
  }
}