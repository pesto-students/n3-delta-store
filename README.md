![](https://res.cloudinary.com/dwclofpev/image/upload/v1625492082/samples/Delta_Store_yzqtj1.png)

# Getting Started with Delta Store

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Hosted Link

The application is hosted at [http://deltastore.netlify.app/](http://deltastore.netlify.app/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Keys required

| Library                                                     |                Keys Required                | Description                                                                                                                                                      |
| ----------------------------------------------------------- | :-----------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Commerce.js](https://dashboard.chec.io/settings/developer) | Eg.: pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX | Login to [Commerce.js](https://dashboard.chec.io/settings/developer) go to Developer Tab and click on API keys and get the respective key as per the environment |
| [Firbase](https://console.firebase.google.com/)             |              FIREBASE_API_KEY               | Login to firebase, create a project and add a web app name, as the application basic setup is complete you will get all the keys mentioned in firebaseConfig     |
|                                                             |            FIREBASE_AUTH_DOMAIN             |                                                                                                                                                                  |
|                                                             |             FIREBASE_PROJECT_ID             |                                                                                                                                                                  |
|                                                             |           FIREBASE_STORAGE_BUCKET           |                                                                                                                                                                  |
|                                                             |        FIREBASE_MESSAGING_SENDER_ID         |                                                                                                                                                                  |
|                                                             |               FIREBASE_APP_ID               |                                                                                                                                                                  |
|                                                             |           FIREBASE_MEASUREMENT_ID           |                                                                                                                                                                  |

## Technology Stack

| Library                                                                                                                                                                     |                     Description                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------: |
| [React](https://reactjs.org/)                                                                                                                                               |                  Front End Library                   |
| [Firebase](https://firebase.google.com/)                                                                                                                                    |           Library used for authentication            |
| [Firestore](https://firebase.google.com/products/firestore?gclsrc=aw.ds&gclid=Cj0KCQjw24qHBhCnARIsAPbdtlJ8Wq-nK99Zgqjibv2EKRFJ3d23t6H3PQeWlmzWpQxJnzG59rYhyKwaAmqeEALw_wcB) |       To store wishlist and user related data        |
| [Commerce.js](https://commercejs.com/)                                                                                                                                      | Library to get products, cart and store cart details |

## Features

| Feature                   | Implemented? | Description                                                         |
| ------------------------- | :----------: | :------------------------------------------------------------------ |
| Gelocation                |   &#10004;   | Detect user's geolocation and set the product listing order         |
| Cart                      |   &#10004;   | A new Cart is created for every user                                |
| See Cart                  |   &#10004;   | Ability to see the Cart and it items                                |
| Add Item                  |   &#10004;   | Ability to add a new Item on the Cart                               |
| Remove a Item             |   &#10004;   | Ability of Remove a Item from the Cart                              |
| Add Item to wishlist      |   &#10004;   | Ability to add a Item to wishlist                                   |
| Remove Item from wishlist |   &#10004;   | Ability to remove a Item from wishlist                              |
| Move to wishlist          |   &#10004;   | Ability to move item from cart to wishlist                          |
| Checkout                  |   &#10004;   | Ability to Checkout                                                 |
| Localisation              |   &#10004;   | Ability to get text localised                                       |
| Search Product            |   &#10004;   | Ability to search a product                                         |
| List of Products          |   &#10004;   | Ability to get all the prodcuts present in the store                |
| Filter Products           |   &#10004;   | Ability to filter all prodcuts present in the store with categories |
| Product Size Selector     |   &#10004;   | Ability to select a product's size variant if present in a product  |
| Product Color Selector    |   &#10004;   | Ability to select a product's color variant if present in a product |

## Screen

![](https://res.cloudinary.com/dwclofpev/image/upload/v1626287732/samples/Screenshot_from_2021-07-15_00-00-52_zw3e6w.png)
