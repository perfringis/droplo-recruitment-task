# droplo-recruitment-task

## Task description

Oto Twoje zadanie rekrutacyjne:

W pliku image_processor.js znajduje sie klasa ImageProcessor jej jedynym zadaniem jest wczytanie pliku CSV iraz wygenerowanie miniaturek do pobranych zdjec z linkow i zapisanie ich do bazy danych mongodb.

Struktura pliku csv wyglada nastepujaco:

```
index, id, url
0, 42fb7bba-7f84-433e-88e5-cb20e6243cac, hhttps://placeholder.com/image1.jpg
```

Dla uproszczenia mozemy zlozyc ze pliki wieksze niz 120mb powinny byc odrzucane.

Twoim zadaniem bedzie zastanowienie sie nad kodem tej klasy i wypisanie potencjanych bledow w kodzie oraz usprawnien.

## What is missing?

- The proper project structure
- The instruction to run the project
- The .env file config for running the app

## What is wrong?

- The index.js file has a lot of responsibilities. The script should be split into smaller ones. 