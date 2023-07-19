const form = document.querySelector('form.login-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log(event);
});
