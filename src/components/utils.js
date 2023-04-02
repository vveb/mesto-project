export function renderLoading(isLoading, submitButton, loadingText) {
  if (isLoading) {
    localStorage.setItem('buttonText', submitButton.textContent);
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = localStorage.getItem('buttonText');
    localStorage.removeItem('buttonText');
  }
}