/* =========================
   HF SYSTEMS - CLEAN ENGINE
   ========================= */

const sections = document.querySelectorAll("section");
const navDots = document.querySelectorAll(".nav-dot");

/* Navigation */
/* Navigation - slower smooth scroll */
function smoothScrollTo(targetY, duration = 1100) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

navDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const target = document.getElementById(dot.dataset.section);

    if (target) {
      smoothScrollTo(target.offsetTop, 1150);
    }
  });
});

/* Active section */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navDots.forEach(dot => {
        dot.classList.toggle("active", dot.dataset.section === entry.target.id);
      });
    }
  });
}, { threshold: 0.6 });

sections.forEach(sec => observer.observe(sec));

/* Cursor glow */
document.querySelectorAll(".cursor-glow").forEach(el => el.remove());

const cursor = document.createElement("div");
cursor.className = "cursor-glow";
document.body.appendChild(cursor);

/* Background */
const bgLayer = document.querySelector(".background-layer");

/* Mouse interaction */
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  if (bgLayer) {
    bgLayer.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
  }
});

/* Section depth */
sections.forEach(sec => {
  sec.addEventListener("mousemove", (e) => {
    const r = sec.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    const items = sec.querySelectorAll(
      ".hero-layout, .section-header, .manifesto-grid"
    );

    items.forEach((item, index) => {
      const strength = 6 + index * 2;
      item.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
  });

  sec.addEventListener("mouseleave", () => {
    const items = sec.querySelectorAll(
      ".hero-layout, .section-header, .manifesto-grid"
    );

    items.forEach(item => {
      item.style.transform = "translate(0,0)";
    });
  });
});

/* Particles */
document.querySelectorAll("canvas.hf-particles").forEach(el => el.remove());

const canvas = document.createElement("canvas");
canvas.className = "hf-particles";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

let particles = Array.from({ length: 70 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
  r: Math.random() * 1.7 + 0.3
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(120, 185, 255, 0.55)";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", resizeCanvas);




/* =========================
   SCROLL PROGRESS
   ========================= */

const progressBar = document.querySelector(".scroll-progress span");

function updateScrollProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progressBar.style.height = progress + "%";
}

window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();




/* =========================
   PROJECT INTERACTION
   ========================= */

document.querySelectorAll(".project-card").forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    card.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });

});




/* =========================
   LANGUAGE SYSTEM
   ========================= */

/* =========================
   LANGUAGE SYSTEM
   ========================= */

/* =========================
   LANGUAGE SYSTEM
   ========================= */

const translations = {
  en: {
    founderLine: "Hussain Yousef",
    metaFounder: "Founder of HF Systems",
    metaLocation: "Najaf, Iraq",
    metaAvailable: "Available for Projects",

    card1Title: "Software Development",
    card1Desc: "Robust systems and scalable applications.",

    card2Title: "Business Strategy",
    card2Desc: "Turning ideas into structured business models.",

    card3Title: "Digital Growth",
    card3Desc: "Marketing and growth systems for real results.",

    card4Title: "Based in Iraq",
    card4Desc: "Local roots with a global digital vision.",




    heroTitle: "TURNING IDEAS<br>INTO SCALABLE<br>BUSINESSES",
    heroSubtitle: "Where Technology Meets Strategy",
    heroDescription:
      "I design systems, products and strategies that help ideas become real, useful and scalable digital businesses.",

    role1: "Entrepreneur",
    role2: "Software Architect",
    role3: "Digital Strategist",

    btnWork: "Explore My Work",
    btnTalk: "Let’s Talk",


    manifestoLabel: "THE VISION",
    manifestoTitle: "I don’t just build websites. I build digital systems.",

    manifestoCard1Title: "From idea to execution",
    manifestoCard1Desc:
      "I connect technology, design and business thinking to turn raw ideas into structured digital products that can actually work in the real world.",

    manifestoCard2Title: "Technical mindset",
    manifestoCard2Desc:
      "Software, systems, automation and data are not just tools — they are the foundation for building smarter businesses.",

    manifestoCard3Title: "Business vision",
    manifestoCard3Desc:
      "Every project should have a clear purpose, a real market need and a path toward growth.",




    capabilitiesLabel: "CAPABILITIES",
    capabilitiesTitle: "What I can build, design and grow.",

    capability1Title: "Software Systems",
    capability1Desc:
      "Desktop applications, database-driven systems and tools that solve real operational problems.",

    capability2Title: "Web Experiences",
    capability2Desc:
      "Modern websites and interfaces with strong visual identity, responsiveness and smooth interaction.",

    capability3Title: "Business Strategy",
    capability3Desc:
      "Feasibility studies, project analysis and turning raw ideas into structured business plans.",

    capability4Title: "Digital Growth",
    capability4Desc:
      "Marketing direction, content thinking and growth strategies for local businesses and digital brands.",




      projectsLabel: "PROJECTS",
      projectsTitle: "Selected work and ideas in progress.",

      project1Type: "Software System",
      project1Title: "Expense Management System",
      project1Desc:
        "A desktop application designed to manage personal expenses, monthly budgets and user-specific financial data.",

      project2Type: "Digital Product",
      project2Title: "Fashion Intelligence Platform",
      project2Desc:
        "A desktop and web concept for outfit coordination, wardrobe management and global fashion trend matching.",

      project3Type: "Automation",
      project3Title: "Smart Irrigation Project",
      project3Desc:
        "An electronic irrigation control concept focused on improving water usage and automating agricultural decisions.",

      project4Type: "Robotics",
      project4Title: "Robotic Arm Controller",
      project4Desc:
        "A robotic arm controlled through a manual gaming controller interface, combining control logic and hardware interaction.",





        achievementsLabel: "ACHIEVEMENTS",
        achievementsTitle: "Academic excellence, certificates and recognition.",

        achievement1Label: "Academic Excellence",
        achievement1Title: "#1 ITM Student",
        achievement1Desc:
          "Ranked first in the Information Technology Management department across multiple academic years.",

        achievementStat1: "Years first on Class",
        achievementStat2: "Years first on Department",

        achievement2Label: "College Recognition",
        achievement2Title: "Top 10 College Students",
        achievement2Desc:
          "Ranked among the top 10 students in the college for three academic years.",

        achievement3Label: "Degree",
        achievement3Title: "Information Technology Management",
        achievement3Desc:
          "Graduate of ITM with a strong focus on technology, management, systems and business analysis.",

        achievement4Label: "Certificates",
        achievement4Title: "Certificates Coming Soon",
        achievement4Desc:
          "This area is ready to display professional certificates, courses and verified achievements.",




        thinkingLabel: "THINKING",
        thinkingTitle: "How I approach ideas, systems and growth.",

        thinkingStep1Title: "Understand the real problem",
        thinkingStep1Desc:
          "I start by identifying what the project truly needs, not just what looks good on the surface.",

        thinkingStep2Title: "Design the system",
        thinkingStep2Desc:
          "I turn the idea into structure: features, user flow, business logic and technical direction.",

        thinkingStep3Title: "Build with purpose",
        thinkingStep3Desc:
          "Every interface, function and decision should support a real goal — usability, growth or efficiency.",

        thinkingStep4Title: "Improve and scale",
        thinkingStep4Desc:
          "I believe good projects are not finished once they launch; they evolve through feedback and better systems.",
            


        contactLabel: "CONTACT",
        contactTitle: "Let’s build something serious.",
        contactDesc:
          "If you have an idea, a business, a project, or a digital problem that needs a strong technical and strategic mind, let’s talk.",

        footerLocation: "Based in Iraq 🇮🇶",


  },

  ar: {
    founderLine: "حسين يوسف",
    metaFounder: "مؤسس HF Systems",
    metaLocation: "النجف، العراق",
    metaAvailable: "متاح للمشاريع",

    card1Title: "تطوير البرمجيات",
    card1Desc: "أنظمة قوية وتطبيقات قابلة للتوسع.",

    card2Title: "استراتيجية الأعمال",
    card2Desc: "تحويل الأفكار إلى نماذج أعمال منظمة.",

    card3Title: "النمو الرقمي",
    card3Desc: "أنظمة تسويق ونمو تحقق نتائج حقيقية.",

    card4Title: "مقره في العراق",
    card4Desc: "جذور محلية برؤية رقمية عالمية.",



    heroTitle: "تحويل الأفكار<br>إلى مشاريع<br>قابلة للنمو",
    heroSubtitle: "حيث تلتقي التقنية بالاستراتيجية",
    heroDescription:
      "أصمم الأنظمة والمنتجات والاستراتيجيات التي تساعد الأفكار على التحول إلى مشاريع رقمية حقيقية ومفيدة وقابلة للنمو.",

    role1: "رائد أعمال",
    role2: "مهندس برمجيات",
    role3: "استراتيجي رقمي",

    btnWork: "استعرض أعمالي",
    btnTalk: "لنتحدث",




    manifestoLabel: "الرؤية",
    manifestoTitle: "أنا لا أبني مواقع إلكترونية فقط. أنا أبني أنظمة رقمية.",

    manifestoCard1Title: "من الفكرة إلى التنفيذ",
    manifestoCard1Desc:
      "أربط بين التقنية والتصميم والتفكير التجاري لتحويل الأفكار الأولية إلى منتجات رقمية منظمة يمكن أن تعمل فعلياً في الواقع.",

    manifestoCard2Title: "عقلية تقنية",
    manifestoCard2Desc:
      "البرمجيات والأنظمة والأتمتة والبيانات ليست مجرد أدوات، بل هي الأساس لبناء أعمال أكثر ذكاءً.",

    manifestoCard3Title: "رؤية تجارية",
    manifestoCard3Desc:
      "كل مشروع يجب أن يمتلك هدفاً واضحاً، وحاجة حقيقية في السوق، ومساراً نحو النمو.",




    capabilitiesLabel: "المهارات",
    capabilitiesTitle: "ما الذي أستطيع بناءه وتصميمه وتطويره.",

    capability1Title: "الأنظمة البرمجية",
    capability1Desc:
        "تطبيقات سطح المكتب والأنظمة المعتمدة على قواعد البيانات والأدوات التي تعالج مشاكل تشغيلية حقيقية.",

    capability2Title: "التجارب الرقمية",
    capability2Desc:
        "مواقع وواجهات حديثة بهوية بصرية قوية وتجربة استخدام سلسة واستجابة كاملة.",

    capability3Title: "استراتيجية الأعمال",
    capability3Desc:
        "دراسات الجدوى وتحليل المشاريع وتحويل الأفكار الأولية إلى خطط أعمال منظمة.",

    capability4Title: "النمو الرقمي",
    capability4Desc:
        "التوجيه التسويقي والتفكير بالمحتوى واستراتيجيات النمو للمشاريع المحلية والعلامات الرقمية.",

      



    projectsLabel: "المشاريع",
    projectsTitle: "أعمال ومشاريع مختارة قيد التطوير والتنفيذ.",

    project1Type: "نظام برمجي",
    project1Title: "نظام إدارة المصاريف",
    project1Desc:
          "تطبيق سطح مكتب لإدارة المصاريف الشخصية والميزانيات الشهرية والبيانات المالية الخاصة بكل مستخدم.",

    project2Type: "منتج رقمي",
    project2Title: "منصة الذكاء الأزيائي",
    project2Desc:
          "منصة مكتبية وويب لتنسيق الأزياء وإدارة الخزانة ومطابقة الإطلالات مع الأنماط العالمية.",

    project3Type: "أتمتة",
    project3Title: "مشروع الري الذكي",
    project3Desc:
          "نظام تحكم إلكتروني بالري يهدف إلى تحسين استهلاك المياه وأتمتة القرارات الزراعية.",

    project4Type: "روبوتات",
    project4Title: "نظام التحكم بالذراع الروبوتية",
    project4Desc:
          "ذراع روبوتية يتم التحكم بها عبر وحدة تحكم يدوية مع دمج البرمجيات والتجهيزات الإلكترونية.",




    achievementsLabel: "الإنجازات",
    achievementsTitle: "تميّز أكاديمي، شهادات، وتقدير.",

    achievement1Label: "تميّز أكاديمي",
    achievement1Title: "الأول على قسم ITM",
    achievement1Desc:
            "حصل على المركز الأول في قسم إدارة تكنولوجيا المعلومات خلال عدة سنوات دراسية.",

    achievementStat1: "سنوات الأول على الدفعة",
    achievementStat2: "سنوات الأول على القسم",

    achievement2Label: "تقدير على مستوى الكلية",
    achievement2Title: "ضمن أفضل 10 طلاب في الكلية",
    achievement2Desc:
            "صُنّف ضمن أفضل 10 طلاب في الكلية خلال ثلاث سنوات دراسية.",

    achievement3Label: "التخصص",
    achievement3Title: "إدارة تكنولوجيا المعلومات",
    achievement3Desc:
            "خريج ITM بتركيز قوي على التقنية والإدارة والأنظمة وتحليل الأعمال.",

    achievement4Label: "الشهادات",
    achievement4Title: "الشهادات قريباً",
    achievement4Desc:
            "هذا القسم جاهز لعرض الشهادات المهنية والدورات والإنجازات الموثقة.",




    thinkingLabel: "المنهج",
    thinkingTitle: "كيف أتعامل مع الأفكار والأنظمة والنمو.",

    thinkingStep1Title: "فهم المشكلة الحقيقية",
    thinkingStep1Desc:
      "أبدأ بتحديد ما يحتاجه المشروع فعلاً، وليس فقط ما يبدو جيداً من الخارج.",

    thinkingStep2Title: "تصميم النظام",
    thinkingStep2Desc:
      "أحوّل الفكرة إلى هيكل واضح: المزايا، تجربة المستخدم، منطق العمل، والاتجاه التقني.",

    thinkingStep3Title: "البناء بهدف واضح",
    thinkingStep3Desc:
      "كل واجهة وكل وظيفة وكل قرار يجب أن يخدم هدفاً حقيقياً، مثل سهولة الاستخدام أو النمو أو الكفاءة.",

    thinkingStep4Title: "التحسين والتوسّع",
    thinkingStep4Desc:
      "أؤمن أن المشاريع الجيدة لا تنتهي عند الإطلاق، بل تتطور من خلال الملاحظات وبناء أنظمة أفضل.",




    contactLabel: "التواصل",
    contactTitle: "لنَبْنِ شيئاً حقيقياً وقوياً.",
    contactDesc:
      "إذا كانت لديك فكرة، مشروع، عمل تجاري، أو مشكلة رقمية تحتاج إلى عقل تقني واستراتيجي قوي، فلنتحدث.",

    footerLocation: "مقره في العراق 🇮🇶",



  }
};

  const navTranslations = {
  en: {
    hero: "Home",
    manifesto: "Vision",
    capabilities: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    thinking: "Thinking",
    contact: "Contact"
  },

  ar: {
    hero: "الرئيسية",
    manifesto: "الرؤية",
    capabilities: "المهارات",
    projects: "المشاريع",
    certifications: "الشهادات",
    thinking: "المنهج",
    contact: "التواصل"
  }

};

let currentLang = localStorage.getItem("hf-lang") || "en";
const langToggle = document.getElementById("langToggle");

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("hf-lang", lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", lang === "ar");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = translations[lang][key];

    if (value !== undefined) {
      element.innerHTML = value;
    }
  });

  document.querySelectorAll(".nav-dot").forEach((dot) => {
    const section = dot.dataset.section;
    if (navTranslations[lang][section]) {
      dot.setAttribute("data-label", navTranslations[lang][section]);
    }
  });

  langToggle.textContent = lang === "en" ? "AR" : "EN";
}

langToggle.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "ar" : "en");
});







setLanguage(currentLang);