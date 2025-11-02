# Library App

A simple in-browser library for adding, displaying, and managing books. Built with HTML, CSS, and vanilla JavaScript.

## Overview

* Books are stored in a JavaScript array called `myLibrary`.
* Each book is created with a constructor `Book` and is given a unique id using `crypto.randomUUID()` (with a simple fallback if not available).
* The UI is always rendered from the data in `myLibrary` — whenever the data changes, the page is re-rendered.
* Users can:

  * add a new book with a form,
  * remove an existing book,
  * toggle the book’s read status.

## How it works

1. Data model
   There is a `Book` constructor that creates book objects with: id, title, author, number of pages, and a boolean for whether it has been read. The constructor’s prototype has a method to toggle the read status.

2. Adding a book
   There is a function `addBookToLibrary(...)` that takes the form values, creates a new `Book` object, pushes it into `myLibrary`, and then calls the render function.

3. Rendering
   There is a `renderLibrary()` function that:

   * selects the `#library` container,
   * clears its contents,
   * loops over `myLibrary`,
   * for each book, creates a small “card” (title, author, pages, read/not read),
   * attaches two buttons: one to remove the book, one to toggle read status,
   * attaches the book’s unique id to the DOM element via a data-attribute so we can find the right book later.

4. Form
   A “New Book” button shows/hides the form.
   On submit, `event.preventDefault()` is used so the page does not reload.
   The form values are read and passed to `addBookToLibrary(...)`, the form is reset, and then hidden again.

## Files

* index.html – structure of the page, including the button, form, and the `#library` container
* style.css – layout and simple styling for cards and the form
* script.js – the constructor, the array, the rendering logic, and the event listeners

## Running

* Open `index.html` in a browser.
* Click “New Book” to add a book.
* Use the buttons on each book card to remove it or toggle its read status.

## Notes

* Data (the array) and presentation (the DOM) are kept separate on purpose. This makes it easier to rebuild the UI from the same data.
* Using a unique id per book prevents problems when books are removed or reordered.
