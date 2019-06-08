const header = document.querySelector<HTMLElement>('#headerHome');
const aboutus = document.querySelector<HTMLDivElement>('#about-us');
const theexperience = document.querySelector<HTMLDivElement>('#the-experience');
const footer = document.querySelector<HTMLElement>('footer');

header!.addEventListener('click', (event) => {
    document.dispatchEvent(new CustomEvent('open-header-modal', { bubbles: true }));
});

aboutus!.addEventListener('click', (event) => {
    document.dispatchEvent(new CustomEvent('open-aboutus-modal', { bubbles: true }));

});

theexperience!.addEventListener('click', (event) => {
    document.dispatchEvent(new CustomEvent('open-theexperience-modal', { bubbles: true }));

});

footer!.addEventListener('click', (event) => {
    document.dispatchEvent(new CustomEvent('open-footer-modal', { bubbles: true }));

});


