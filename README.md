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
- The `__dirname` is pointing to the specific directory and that implementation is "fragile" to any changes.
- The `global.gc` will never invoke. Moreover, custom cleaning the memory should be investigated via `--inspect`.
- Instead of using `console.info` or `console.error`. The project should use logging system such as `winston`.
- The `batchSize` parameter for `processChunk` function is unused.
- Missing secure way of getting information from `.env` file.
- Mongoose connection in the `index.js` file.
- The `DEFAULT_BATCH_SIZE` is not dynamic type of information. Each time app has to be restarted to change that value.
- The implementation of `start` method creates own `id` in mongo database.

## What have I done?

- I moved schema and model to separate directories for better readability.
- I moved `ImageProcessor` class to separate directory.
- Introduced `prettier` for better readability of the code.
- Removed `global.gc`.
- Introduced `winston` logging system.
- Remove `batchSize` parameter from `processChunk` function.
- Installed `dotenv` lib for secure reading variables.
- Moved `dotenv` config to separate file.
- Moved `mongoose` connection to separate file.
- Restructure `.env` file in case of mongo variables.
- Removing `DEFAULT_BATCH_SIZE` variable and add parameter to start method with default start value.
- Rename from `id` to `_id`.