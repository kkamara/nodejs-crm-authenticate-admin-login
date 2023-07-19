const form = document.querySelector('form.login-form');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const username = event.target.elements.username.value;
  const password = event.target.elements.password.value;
  console.log('username', username);
  const res = await axios.post(domain+'/admin', {
    username, password,
  });
  console.log(res.data);
});
