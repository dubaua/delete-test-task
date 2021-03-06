export const maxFakeApiDelay = 3000;

export const fakeSubmit = ({ url, formData }) =>
  new Promise((resolve, reject) => {
    const success = Math.random() >= 0.5;
    const timeout = Math.ceil(Math.random() * maxFakeApiDelay);

    setTimeout(() => {
      if (success) {
        resolve({ success, message: 'Form was successfully sent via Fake JS API.' });
      } else {
        reject({ success, message: 'Form was Fake JS API randomly threw an error! Try again.' });
      }
    }, timeout);
  });
