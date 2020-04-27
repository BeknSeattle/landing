/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 *
*/
const array = [];
const select = document.querySelector('#navbar__list');
const main = document.querySelector('main');
const mainSections = main.querySelectorAll('section');
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function insertDataToArray() {
    //the data-nav attribute is automatically written inside the const array
    for (let mainSection of mainSections){
        const navType = mainSection.getAttribute('data-nav');
        array.push(navType); 
    }
    console.log(array);
}
insertDataToArray();
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
function createNavigation() {
    for (let i = 0; i < array.length; i++) {
        // Build menu
        let { link, li, text } = linkAttribute(i);
        // whatever is written in section area with its id and data-nav attribute will be written in the const array automatically amd becomes a link and attached the data-nav text as the navigation link inside the ul tag.
        link.setAttribute('href', '#' + (array[i]));
        li.appendChild(link);
        link.appendChild(text);
        // new links inside the ul #navbar__list
        select.insertBefore(li, select.childNodes[i]);
        console.log(select);
    }

    function linkAttribute(i) {
        let li = document.createElement("li");
        let link = document.createElement("a");
        let text = document.createTextNode(array[i]);
        return { link, li, text };
    }
}
createNavigation();

const navLinks = select.querySelectorAll('li');
function makeActive() {
    for (var i = 0; i < navLinks.length; i++){
        // Add class 'active' to the navigation links
        navLinks[i].classList.remove('active');
        this.classList.add('active');
        
        //clicking active links will also go to section areas and add and remove your-active-class class.
        activeSection();
    }

    function activeSection() {
        if (navLinks[i].classList.contains('active')) {
            mainSections[i].classList.add('your-active-class');
        }
        else {
            mainSections[i].classList.remove('your-active-class');
        }
    }
}
function nowActive() {
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', makeActive);
    }
}
nowActive();

// Scroll to anchor ID using scrollIntoView event
// smooth scrolling does not work on safari 
function scrollToLink() {
    select.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
scrollToLink();

//hiding navigation bar on scroll
//based on w3schools.com/howto/howto_js_navbar_hide_scroll.asp
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
const headerNav = document.querySelector("header");
let scrollUp = window.pageYOffset;
function showNavOnScroll() {
    let scrollDown = window.pageYOffset;
    if (scrollUp > scrollDown) {
        headerNav.style.top = "0";
    }
    else {
        headerNav.style.top = "-88.75px";
    }
    scrollUp = scrollDown;

}
document.addEventListener('scroll', showNavOnScroll);