const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const userForm = document.querySelector('.ad-form');
const avatarChooser = userForm.querySelector('.ad-form-header__input');
const avatarPreviewContainer = userForm.querySelector('.ad-form-header__preview');
const avatarPreview = userForm.querySelector('.ad-form-header__preview').querySelector('img');
const photoChooser = userForm.querySelector('.ad-form__input');
const photoContainer = userForm.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
  avatarPreview.width = avatarPreviewContainer.clientWidth;
  avatarPreview.height = avatarPreviewContainer.clientHeight;
  avatarPreviewContainer.style.padding = 0;
});

photoChooser.addEventListener('change', () => {
  const photoItem = document.createElement('img');
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    photoItem.src = URL.createObjectURL(file);
  }
  photoItem.alt = 'Фото Вашего объявления';
  photoItem.width = photoContainer.clientWidth;
  photoItem.height = photoContainer.clientHeight;
  photoItem.classList.add('ad-form__photo', 'users-photo');
  photoContainer.appendChild(photoItem);
});
