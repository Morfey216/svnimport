Использование:

```bash
include ../form-input/form-input

+form-input({
      label: 'Введите имя',
      error: 'Введите имя',
    }).modifier#id
```

В качестве `placeholder` используется `<label>`.

`#id` передается в `id` для `<input>` и в `for` для `<label>`.

При фокусе в `<input>` очищается класс `.error` с обертки `.form-input`.
