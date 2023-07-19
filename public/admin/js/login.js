const form = document.querySelector('form.login-form');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = event.target.elements.email.value;
  const password = event.target.elements.password.value;
  
  const res = await axios.post(domain+'/admin', {
    email, password,
  });
  console.log(res.data);
});
