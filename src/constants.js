const FormConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_active'
}

const initialPostsList = [
  {
    title: 'Sacre Coeur',
    link: './images/sacre-coeur.jpg'
  },
  {
    title: 'Лувр',
    link: './images/louvre.jpg'
  },
  {
    title: 'Сена',
    link: './images/la-seine.jpg'
  },
  {
    title: 'Notre Dame',
    link: './images/notre-dame.jpg'
  },
  {
    title: 'Триумфальная арка',
    link: './images/arc-de-triomph.jpg'
  },
  {
    title: 'Эйфелева башня',
    link: './images/tour-eiffel.jpg'
  }
];

export { FormConfig, initialPostsList };