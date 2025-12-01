(function(){
  const form = document.querySelector('form[action*="formspree.io"]');
  if(!form) return;
  const successEl = document.getElementById('form-success');
  const submitBtn = document.getElementById('lead-submit');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    if(!submitBtn) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      });
      if(res.ok){
        form.reset();
        if(successEl){
          successEl.style.display = 'block';
        }
        submitBtn.textContent = 'Sent';
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Inquiry';
        alert('There was an issue submitting the form. Please try again.');
      }
    } catch(err){
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
      alert('Network error. Please retry.');
    }
  });
})();