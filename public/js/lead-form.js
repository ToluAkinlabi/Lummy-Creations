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

    const formData = new FormData(form);
    const payloadObj = {};
    for (const [key, value] of formData.entries()) {
      if (!(key in payloadObj)) payloadObj[key] = value;
    }
    if (!payloadObj._replyto && payloadObj.email) {
      payloadObj._replyto = payloadObj.email;
    }
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadObj)
      });
      // Formspree may return 200 with an error payload; inspect JSON
      let payload = null;
      try {
        payload = await res.json();
      } catch(_) {
        payload = null;
      }

      const isSuccess = res.ok && payload && payload.ok === true;
      if(isSuccess){
        form.reset();
        if(successEl){
          successEl.style.display = 'block';
        }
        submitBtn.textContent = 'Sent';
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Inquiry';
        const errorMsg = (payload && payload.errors && payload.errors[0] && payload.errors[0].message)
          ? payload.errors[0].message
          : `There was an issue submitting the form. Status: ${res.status}`;
        console.error('Formspree submission error:', { status: res.status, payload });
        alert(errorMsg);
      }
    } catch(err){
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
      console.error('Form submission network error:', err);
      alert('Network error. Please retry.');
    }
  });
})();