Использование:

```bash
include ../form-textarea/form-textarea

+form-textarea({
      label: 'Введите имя',
      error: 'Введите имя',
    }).modifier#id
```

В качестве `placeholder` используется `<label>`.

`#id` передается в `id` для `<textarea>` и в `for` для `<label>`.

При фокусе в `<textarea>` очищается класс `.error` с обертки `.form-textarea`.
