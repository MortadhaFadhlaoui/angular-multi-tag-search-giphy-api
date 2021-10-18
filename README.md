# AngularMultiTagSearchGiphyApi

This is an Angular version 12.2.10 project listing result of images from the [Giphy API](https://developers.giphy.com/).

The main page provides a search field with multi-tag search words, you can just enter your word and the
field will suggest for you existing tags from the API. Also, you can search with your preferred tag when you enter the word and clicking **SPACE**.

Results displayed in 3 x 3 images and both list and search list with pagination (9 pictures
per page).

## Development server

Run `ng serve` for a dev server.

Run `ng test` for unit test.

Run `npm run e2e` for e2e tests.

# comments

The **ngx-infinite-scroll** library used for pagination.  
The **@angular/material** library used for set up multi-tag search field.  
The **bootstrap** library used for UI.
The **cypress** library used for e2e tests.

# remarks

Project build with Angular 12 && TypeScript.  
Unit tests build with Jasmine test framework.  
We used Cypress for e2e tests since Protractor is deprecated in the latest versions.
