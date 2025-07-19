
const btn = document.getElementById("CTA");

btn.addEventListener('click', onClick);

function onClick(event) {
  alert('Click dispatched!');
  this.test = 1;
  console.log('click', event, '\ncontext:', this, this.test);
}
