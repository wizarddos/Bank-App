# Bank App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install

### needed

- npm

- git

- mysql and php server(apache or nginx) in linux or MacOS

OR

- XAMPP/WAMPP in  Windows

### Steps

- Clone repo to your computer to /var/www/html (in linux) or C:/xampp/htdocs (You or anywhere else where you have xampp):

```shell
git clone https://github.com/wizarddos/Bank-App
```

- Start apache and mysql:

- Import dump (not ready yet) into database named bank-app

- Init all packages using npm:

```
npm init
```

- And project is ready, run:

```
npm start
```

- And it's ready. Enjoy this app and give some feedback.

### NOTE

If you are using xampp you have to change /api/includes/connect.php to

```php
<?php
    $db_dsn = "mysql:host=localhost;dbname=bank-app";
    $db_user = "root";
    $db_pass = "";
```

And in Linux and MacOS  change $db_user to your mysql username and $db_pass to your mysql password

## About

It's Just a simple bank and stock market app "simulation".

You don't need any debit or credit card to run script.
It's just for fun and to train investing and managing buget

I hope you will like it

## What can you run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
