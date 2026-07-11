const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', () => {
    const visibility = nav.getAttribute('data-visible')
    if (visibility === 'false') {
        nav.setAttribute('data-visible', 'true')
        navToggle.setAttribute('aria-expanded', 'true')
    } else if (visibility === 'true') {
        nav.setAttribute('data-visible', 'false')
        navToggle.setAttribute('aria-expanded', 'false')
    }
});
