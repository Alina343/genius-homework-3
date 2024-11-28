const form = document.querySelector('form[name="contact-form"]');
const userNameInput = document.getElementById('user-name');
const userTelInput = document.getElementById('user-tel');
const userEmailInput = document.getElementById('user-email');
const submitButton = form.querySelector('.form-button');

// Повідомлення для користувача
const successMessage = 'Форма успішно відправлена!';
const errorMessage = 'Будь ласка, перевірте правильність даних.';

// Функція для перевірки поля за допомогою регулярного виразу
const validateInput = (input) => {
  if (input.required && !input.value.trim()) {
    return false; // Поле порожнє
  }

  if (input.pattern) {
    const regex = new RegExp(input.pattern);
    return regex.test(input.value.trim());
  }

  return true;
};

// Додаємо обробник події "submit" для форми
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  // Перевіряємо всі поля
  const isNameValid = validateInput(userNameInput);
  const isTelValid = validateInput(userTelInput);
  const isEmailValid = userEmailInput.value ? validateInput(userEmailInput) : true;

  if (!isNameValid || !isTelValid || !isEmailValid) {
    alert(errorMessage);
    return;
  }

  // Якщо перевірка пройшла, збираємо дані
  const formData = {
    name: userNameInput.value.trim(),
    phone: userTelInput.value.trim(),
    email: userEmailInput.value.trim(),
  };

  try {
    // Відправляємо дані на сервер через fetch
    const response = await fetch('https://your-server-endpoint.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert(successMessage); // Повідомлення про успіх
      form.reset(); // Очищаємо форму
    } else {
      alert('Помилка на сервері. Спробуйте пізніше.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Неможливо відправити форму. Перевірте з’єднання.');
  }
});