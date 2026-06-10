/* =========================
   THEME SWITCHER
========================= */

const themeSelect = document.getElementById("theme-select");

function applyTheme(theme){

    document.body.classList.remove(
        "light-mode",
        "dark-mode",
        "system-mode"
    );

    if(theme === "light"){
        document.body.classList.add("light-mode");
    }

    else if(theme === "dark"){
        document.body.classList.add("dark-mode");
    }

    else{

        document.body.classList.add("system-mode");

    }

    localStorage.setItem("theme",theme);
}

const savedTheme =
localStorage.getItem("theme") || "system";

applyTheme(savedTheme);

if(themeSelect){
    themeSelect.value = savedTheme;

    themeSelect.addEventListener("change",e=>{

        applyTheme(e.target.value);

    });
}

/* =========================
   TYPING ANIMATION
========================= */

const typingElement =
document.getElementById("typing-text");

const words = [
    "MCA Student",
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    if(!typingElement) return;

    const currentWord =
    words[wordIndex];

    if(!deleting){

        typingElement.textContent =
        currentWord.substring(
            0,
            charIndex + 1
        );

        charIndex++;

        if(charIndex === currentWord.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;
        }
    }

    else{

        typingElement.textContent =
        currentWord.substring(
            0,
            charIndex - 1
        );

        charIndex--;

        if(charIndex === 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){
                wordIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 120
    );
}

typeEffect();

/* =========================
   SMOOTH SCROLL
========================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            document
            .querySelector(
                this.getAttribute("href")
            )
            .scrollIntoView({
                behavior:"smooth"
            });
        }
    );

});

/* =========================
   ACTIVE NAV LINKS
========================= */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".sidebar a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop =
        section.offsetTop - 200;

        const sectionHeight =
        section.clientHeight;

        if(
            pageYOffset >= sectionTop
            &&
            pageYOffset <
            sectionTop + sectionHeight
        ){

            current =
            section.getAttribute("id");
        }
    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === "#" + current
        ){

            link.classList.add("active");
        }
    });
});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
document.querySelectorAll(
    ".glass-card,.timeline-item,.skill,.stat-card,.cert-card"
);

const revealObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

    if(entry.isIntersecting){

        entry.target.style.opacity = "1";
        entry.target.style.transform =
        "translateY(0)";
    }

});

},
{
threshold:0.15
}

);

revealElements.forEach(el=>{

    el.style.opacity="0";

    el.style.transform=
    "translateY(40px)";

    el.style.transition=
    "all .8s ease";

    revealObserver.observe(el);

});

/* =========================
   COUNTER ANIMATION
========================= */

const counters =
document.querySelectorAll(".counter");

const counterObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter =
entry.target;

const target =
+counter.dataset.target;

let count = 0;

const speed =
target / 100;

const update = ()=>{

if(count < target){

count += speed;

counter.innerText =
Math.ceil(count);

requestAnimationFrame(update);

}

else{

counter.innerText =
target;

}

};

update();

}

});

},
{
threshold:0.4
}

);

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/* =========================
   NAVBAR SHADOW
========================= */

window.addEventListener(
"scroll",
()=>{

const sidebar =
document.querySelector(".sidebar");

if(!sidebar) return;

if(window.scrollY > 50){

sidebar.style.boxShadow =
"0 0 30px rgba(0,217,255,.25)";

}

else{

sidebar.style.boxShadow =
"none";

}

}
);

/* =========================
   YEAR AUTO UPDATE
========================= */

const year =
document.getElementById("year");

if(year){

year.textContent =
new Date().getFullYear();

}