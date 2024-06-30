//Reload page to top
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };

// change color text nav
// function checkScrollPosition() {
//   const scrollPosition = window.scrollY;
//   const threshold = window.innerHeight * 1.15; // 95vh

//   if (scrollPosition >= threshold) {
//     gsap.to("body", { duration: 0.2, background: "#f1f1f1" });
//     gsap.to(".logo, .nav_list, .nav_list::before, .portofolio", {
//       duration: 1,
//       color: "#202020",
//     });
//     gsap.to(":root", {
//       duration: 1,
//       "--nav-list-before-border-color": "#000000",
//       "--nav-list-before-background-color-hover": "#000000",
//     });
//   } else {
//     gsap.to("body", { duration: 1, background: "#000000" });
//     gsap.to(".logo, .nav_list, .nav_list::before , .portofolio", {
//       duration: 1,
//       color: "#f1f1f1",
//     });

//     gsap.to(":root", {
//       duration: 0.2,
//       "--nav-list-before-border-color": "#f1f1f1",
//       "--nav-list-before-background-color-hover": "#f1f1f1",
//     });
//   }
// }

// window.addEventListener("load", checkScrollPosition);
// window.addEventListener("scroll", checkScrollPosition);

//hero animation and animation change section projects
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Animasi logo
  ScrollTrigger.create({
    animation: gsap.from(".logo", {
      y: "50vh",
      fontSize: "7vw",
      letterSpacing: "-2px",
      left: "1.9%",
      yPercent: -100,
    }),
    scrub: true,
    trigger: ".logo_trigger",
    start: "top bottom",
    endTrigger: ".logo_trigger",
    end: "top center",
  });
});

//lottie animation
document.addEventListener("DOMContentLoaded", function () {
  bodymovin.loadAnimation({
    container: document.getElementById("hero_animation"),
    path: "./assets/animations/wave_animation_white_black_by_Anna_Gradova.json",
    renderer: "svg",
    loop: true,
    autoplay: true,
  });
});

//lenis Smooth Scrolling
document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
});

//loader animation
document.addEventListener("DOMContentLoaded", () => {
  const counter = document.querySelector(".counter");
  const loader = document.querySelector(".loader");

  gsap.to(counter, {
    innerHTML: 100 + "%",
    duration: 2,
    snap: "innerHTML",
    ease: "power2.inOut",
    onComplete: () => {
      setTimeout(() => {
        gsap.to(counter, {
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            slideDownLoader();
            animateTextElements();
          },
        });
      }, 500);
    },
  });

  function animateMasks() {
    const masks = document.querySelectorAll(".hero-img .mask");
    const clipPathValues = [
      "polygon(10% 0, 0 0, 0 100%, 10% 100%)",
      "polygon(20% 0, 10% 0, 10% 100%, 20% 100%)",
      "polygon(30% 0, 20% 0, 20% 100%, 30% 100%)",
      "polygon(40% 0, 30% 0, 30% 100%, 40% 100%)",
      "polygon(50% 0, 40% 0, 40% 100%, 50% 100%)",
      "polygon(60% 0, 50% 0, 50% 100%, 60% 100%)",
      "polygon(70% 0, 60% 0, 60% 100%, 70% 100%)",
      "polygon(80% 0, 70% 0, 70% 100%, 80% 100%)",
      "polygon(90% 0, 80% 0, 80% 100%, 90% 100%)",
      "polygon(100% 0, 90% 0, 90% 100%, 100% 100%)",
    ];

    setTimeout(() => {
      masks.forEach((mask, index) => {
        gsap.to(mask, {
          clipPath: clipPathValues[index % clipPathValues.length],
          duration: 1,
          delay: index * 0.1,
        });
      });
    });
  }

  function slideDownLoader() {
    gsap.to(loader, {
      y: loader.offsetHeight, // Move loader down by its height
      duration: 0.3, // Duration of animation
      ease: "power2.in", // Easing function
      onComplete: () => {
        loader.style.display = "none"; // Ensure it's completely removed from the layout
        animateMasks();
      },
    });
  }

  function animateTextElements() {
    const elementsToAnimate = document.querySelectorAll(
      ".nav_list, .portofolio, .info_text, .social_link, .scroll"
    );

    const logoToAnimate = document.querySelector(".logo");

    elementsToAnimate.forEach((element) => {
      gsap.fromTo(
        element,
        {
          y: 20, // Start position (20px below)
          opacity: 0, // Start opacity
        },
        {
          y: 0, // End position
          opacity: 1, // End opacity
          duration: 2, // Animation duration
          ease: "power2.out", // Easing function
          stagger: 1, // Stagger start times
        }
      );
    });

    gsap.fromTo(
      logoToAnimate,
      {
        y: "50vh",
        fontSize: "120px",
        left: "1.9%",
        yPercent: -80,
        opacity: 0,
      },
      {
        yPercent: -100, // End position
        opacity: 1, // End opacity
        duration: 2, // Animation duration
        ease: "power2.out", // Easing function
        stagger: 1, // Stagger start times
      }
    );
  }
});

//text animation
document.addEventListener("DOMContentLoaded", () => {
  const descriptions = document.querySelectorAll(
    ".projects_header, .col:nth-child(1), .lit_desc_head, .lit_desc_info"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.classList.add("visible");
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 1,
    }
  );

  descriptions.forEach((description) => {
    observer.observe(description);
  });
});

//scroll animation
document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll_hero");

  scrollElements.forEach((element, index) => {
    // Set awal elemen di luar viewport
    gsap.set(element, { opacity: 0, y: -20 });

    // Animasi menggunakan GSAP
    const timeline = gsap.timeline({ repeat: -1 });
    timeline
      .to(element, { opacity: 0, y: -20, duration: 0.5, delay: 2 })
      .to(element, { opacity: 1, y: 0, duration: 0.5, delay: 1 })
      .to(element, { opacity: 0, y: 10, duration: 0.5, delay: 2 });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  const footer = document.querySelector(".about");
  const lastCard = document.querySelector(".card.scroll");
  const pinnedSections = gsap.utils.toArray(".pinned");

  pinnedSections.forEach((section, index, sections) => {
    let img = section.querySelector(".img_card");

    let nextSection = sections[index + 1] || lastCard;
    let endScalePoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;

    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end:
          index === sections.length
            ? `+=${lastCard.offsetHeight / 2}`
            : footer.offsetTop - window.innerHeight,
        pin: true,
        pinSpacing: false,
        scrub: 1,
      },
    });

    gsap.fromTo(
      img,
      { scale: 1 },
      {
        scale: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: endScalePoint,
          scrub: 1,
        },
      }
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);
  const footer = document.querySelector(".last");
  const lastCard = document.querySelector(".last_scroll");
  const pinnedSections = gsap.utils.toArray(".pinned_footer");

  pinnedSections.forEach((section, index, sections) => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",
        end:
          index === sections.length
            ? `+=${lastCard.offsetHeight / 2}`
            : footer.offsetTop - window.innerHeight,
        pin: true,
        pinSpacing: false,
        scrub: 1,
      },
    });
  });
});
