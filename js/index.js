// Initialize AOS
// AOS.init();



let summary = document.querySelector('#summary');
let btnDropdown = document.querySelector('#btn-dropdown');

btnDropdown.addEventListener('click', (e) => {
  e.preventDefault();
  summary.classList.contains('dropdown') ? summary.classList.remove('dropdown') : summary.classList.add('dropdown');
});

console.log(summary, btnDropdown);


