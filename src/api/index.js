export const fakeSubmit = ({ url, formData }) =>
  new Promise((resolve, reject) => {
    const success = Math.random() >= 0.5;
    const timeout = Math.ceil(Math.random() * 3000);

    setTimeout(() => {
      if (success) {
        resolve({ success, message: 'You will never see this message, cause it doesn\'t handling on frontend.' });
      } else {
        reject({ success, message: 'Watch out! Fake JS API randomly threw an error! Try again.' });
      }
    }, timeout);
  });
