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
    //whatever is written in section area with its id and data-nav attribute will be written in the const array automatically amd becomes a navigation link
    for (const el of array){
    const newCreatedNav = document.createTextNode(el);
    const a = document.createElement('a');
    a.setAttribute('href', '#' + el);
    const li = document.createElement('li');

    a.appendChild(newCreatedNav);
    li.appendChild(a);
    console.log(select.appendChild(li)); 
    }
}
createNavigation();

const navLinks = select.querySelectorAll('li');
function makeActive() {
    for (var i = 0; i < navLinks.length; i++){
        // Add class 'active' to the navigation links
        navLinks[i].classList.remove('active');
        this.classList.add('active');        
    }
}
//activating each linked by the clicking event
function nowActive() {
    for(const navLink of navLinks){
        navLink.addEventListener('click', makeActive )
    }
}
nowActive();

// Scroll to anchor ID using scrollIntoView event
// smooth scrolling does not work on safari 
const allHref = select.querySelectorAll('a[href^="#"]');
function scrollToLink() {
    allHref.forEach(anchor => {
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
    } else {
        headerNav.style.top = "-88.75px";
    }
    scrollUp = scrollDown;
}
document.addEventListener('scroll', showNavOnScroll);

//const clientRect sees if the viewport is on top when scrolled
//information from https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
const clientRect = function (elem) {
    let distance = elem.getBoundingClientRect();
    return (distance.top >= 0 && distance.left >= 0 && 
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) && distance.right <= (window.innerWidth || document.documentElement.clientWidth));
};
//detecting if the specific section id is on the top of the viewport
//going to each section if the distance of the viewport is top = 0 and left = 0
//adding class active-section
const isInViewport = clientRect;
window.addEventListener('scroll', function (e) {
    e.preventDefault();
    //checking all section when it hits the top of the viewport
    for (let i = 0; i < mainSections.length, i < navLinks.length; i++) {
        if (isInViewport(mainSections[i])){
            console.log('In viewport!');
            mainSections[i].classList.add('active-section');       
        } else {
            console.log('Nope...');
            mainSections[i].classList.remove('active-section');       
        }
        if (mainSections[i].classList.contains('active-section')) {
            navLinks[i].classList.add('active-scroll');           
        } else {
            navLinks[i].classList.remove('active-scroll');   
        }      
    }
}, false);
//button going back to top page
const id = document.getElementById('backToTop');
function backToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}
id.addEventListener('click', backToTop);
