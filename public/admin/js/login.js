const form = document.querySelector('form.login-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('username', event.target.elements.username.value);
});
