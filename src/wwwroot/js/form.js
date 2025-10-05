const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

function validateField(field) {
    const error = field.parentElement.querySelector('.error-message');

    if (!field.validity.valid) {
        error.textContent = field.dataset.error || "This field is required";

        return false;
    }

    error.textContent = "";
    return true;
}

form.querySelectorAll('input:not([name="hp"]), textarea').forEach(field => {
    field.addEventListener("blur", () => {
        validateField(field);
    })

    field.addEventListener("input", () => {
        if (field.validity.valid) {
            const error = field.parentElement.querySelector('.error-message');
            error.textContent = "";
        }
    });
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    const fields = form.querySelectorAll('input:not([name="hp"]), textarea');

    fields.forEach(field => {
        console.log(`Checking ${field.name}`);
        const fieldValid = validateField(field);
        if (!fieldValid) {
            isValid = false;
        }
    });

    if (!isValid) {
        form.querySelector(':invalid').focus();
        return;
    }

    statusMessage.textContent = "Sending...";

    const formData = new FormData(form);

    try {
        const res = await fetch('/api/submit', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            statusMessage.textContent = "Thank you! Your message has been received. We'll get back to you soon.";
            statusMessage.classList.add('color-success')
            form.reset();
        } else {
            statusMessage.classList.add('color-failure')
            statusMessage.textContent = 'Apologies, something went wrong. Please send me a message directly or try again later.';
        }
    } catch (err) {
        statusMessage.classList.add('color-failure')
        statusMessage.textContent = 'Error submitting the form. Please check your connection.';
    }
});