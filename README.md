# Проект "Место" / Project "Mesto"

![Скриншот главной страницы](./src/images/mesto-main-page.jpg)

## Где посмотреть?

Ознакомиться с проектом можно [здесь](https://vveb.github.io/mesto-project/)

## О чем проект
Проект открывает дискуссию о новом подходе к авторскому контенту.

> "Не место красит человека, а человек место"

*Так ли это на самом деле?*

В нашем проекте данная мысль звучит особенно звонко.

Создайте собственное уникальное **Место** и расскажите о нем миллионам.

А пока приглашаем Вас в родину высокой кухни и моды, город на острове Сите, столицу Франции - Париж, - для знакоства с ее достопримечательностями:

* __Эйфелева башня__ (_fr. Tour Eiffel_) - главный символ Парижа (хоть французы и не взлюбили башню поначалу).
* __Триумфальная арка__ (_fr. L'arc de triomph_) - возведенная по распоряжению Наполеона Бонапарта в ознаменование побед его "Великой армии".
* __Собор Парижской Богоматери__ (_fr. Notre Dame de Paris_) - величественный католический собор, возведенный на острове Сите, откуда когда-то начинался Париж.
* __Сена__ (_fr. La Seine_) - река, на которой стоит Париж.
* __Лувр__ (_Louvre_) - королевский дворец, ныне являющийся одним из крупнейших и популярных художественных музеев мира.
* __Сакре-Кёр__ (_fr. Sacre Coeur_) - католический храм, возвышающий свою "сахарную голову" над самой высокой точкой Парижа - холмом Монмартр.

## Немного о технологиях

* Проект _свёрстан_ с использованием технологий __адаптивной вёрстки__ и __отзывчивого интерфейса__ для наиболее популярных разрешений.
* Использована __технология перестроения сетки__ в зависимости от __ширины__ окна просмотра.
* В скрытом виде свёрстан __popup__, доступный по модификатору `popup_opened`.
* Сборка проекта, минимизация и транспиляция кода на JS происходит с помощью инструмента __Webpack__ и сопутствующих плагинов.

### JavaScript

На языке `JavaScript` реализована функциональность:

* Открытие соответствующих __модальных окон__ по нажатию на кнопки редактирования профиля, добавления карточки, просмотра фото.
* Возможность __поставить лайк__ или __удалить__ карточку.
* Нативная отрисовка карточек фото на основе __template__-заготовки.
* Проверка __корректности__ заполнения форм, верификация ссылки загрузки фото по маске, обязательных полей.
* Форма редактирования профиля __динамически подгружает__ данные со страницы.
* __Не__ используется уязвимая технология добавления разметки с помощью __innerHTML__.
* Реализована __live-валидация__ полей ввода модальных окон.
* Для валидации полей `имя профиля`, `призвание`, `название места` применяется регулярное выражение.
* Код разбит на `модули`.

### Webpack

* Настроены сборки `build` и `dev`.
* Настроена минимизация и транспиляция с помощью __Babel__.
* Настроена обработка `HTML`, `CSS`, `JS`.
* Для __CSS__ настроена минимизация и автоматическая расстановка `вендорных префиксов`.

### Взаимодействие с сервером
Сайт выложен на собственный сервер и доступен для полнофункционального тестирования.

Реализовано с помощью `fetch-запросов`:

* Загрузка `информации о пользователе` с сервера.
* Загрузка `фотокарточек` с сервера.
* `Редактирование` информации профиля.
* `Обновление аватара` пользователя.
* `Добавление новой карточки` места.
* Отображение `количества лайков` карточки.
* Функционал `постановки` и `снятия` лайка.
* `Удаление` собственных карточек.
* Во всех формах улучшен `UX` при ожидании ответа сервера.

