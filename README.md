# droplo-recruitment-task

## Task description

Oto Twoje zadanie rekrutacyjne:

W pliku image_processor.js znajduje sie klasa ImageProcessor jej jedynym zadaniem jest wczytanie pliku CSV iraz wygenerowanie miniaturek do pobranych zdjec z linkow i zapisanie ich do bazy danych mongodb.

Struktura pliku csv wyglada nastepujaco:

```
index, id, url
0, 42fb7bba-7f84-433e-88e5-cb20e6243cac, https://placeholder.com/image1.jpg
```

Dla uproszczenia mozemy zlozyc ze pliki wieksze niz 120mb powinny byc odrzucane.

Twoim zadaniem bedzie zastanowienie sie nad kodem tej klasy i wypisanie potencjanych bledow w kodzie oraz usprawnien.

## What is missing?

- The proper project structure
- The instruction to run the project
- The .env file config for running the app
- The data.csv file with data

## What is wrong?

- The index.js file has a lot of responsibilities. The script should be split into smaller ones.

- useNewUrlParser and useUnifiedTopology are deprecated.
```js
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
```

- The Program never runs/executes any csv file.
- Lack of `start` method invocation from `ImageProcessor` class.
- The path to `data/data.csv` could not be resolved. Additionally, template literals are not needed.
- `__dirname` is pointing to the specific directory and that implementation is "fragile" to any changes.

## What have I done?

- I moved schema and model to separate directories for better readability.
- I moved `ImageProcessor` class to separate directory.