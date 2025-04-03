/**
 * 
 * Iterator design pattern is used to iterate over underlying collection of a class without letting
 * the client know regarding the underlying structure of the collection like array, set, map which should be iterated.
 * 
 * Lets take an example;
 * 
 * We have a library which can store books, now suppose the client wants to get details of all the books
 * which are stored in library, in case we have the getDetails method in library and it returns an array containing
 * the books, then the client will get back the array and then they have to traverse over it.
 * 
 * Now suppose some fine day we decide to change the inner data structure from array to something else, then client also
 * has to change their whole traversal process code and if there are n number of clients than it will be very difficult for
 * all the n clients to change their traversal logic so in such situations the iterator design pattern comes into picture.
 * 
 * In iterator design pattern we have 
 * 
 * 1. An iterator interface which will have two method declaration 
 *    hasNext()
 *    next()
 * 
 * 2. Container which in an interface and have method declaration 
 *    getIterator()
 * 
 * Now in iterator interface hasNext should be of return type boolean as it tells if the
 * iterable is having another element or not, left to iterate. The next() method has a return type of the type
 * or iterator which we are traversing since at time of declaration we don't know so we consider it generic type i,e T but
 * it can be null as well in case it don't have a next and thus its T or null.
 * 
 * interface Iterators<T> {
    hasNext(): boolean;
    next(): T | null;
   }

   Now the container has getIterator method which give me an iterator as name suggest so it should have a return type
   Iterator and since Iterator expects a datatype thus we consider it also generic so return type is Iterator<T>
 * 
 *  interface Container<T> {
    getIterator(): Iterators<T>;
   }


 *  Now we have a book class which has a name and a getName method simple.
    We have a library class which will store all the books, so we have an array of Books and at time
    of library instantiation we initialize this array as empty array i,e lazy loading. 

    Now it has a add book which takes a book type and add it to the books array.
    Since user will be interacting with library only and thus they need an iterator so Library class
    implements Container interface which has a getIterator and thus Library class will override this method.
    Thus getIterator has to return an Iterator reference.

    Now Book class don't implement Iterator interface and thus it can't act as a reference and thus we
    crated an BookIterator class now this class implements Iterator and thus over ride hasNext and next method.

    bookIterator class now expects array of Book which needs to be iterated , for iteration we kept a class
    instance i initialized to 0.
    
    hasNext check the current value of i, if its less than the length of books array it returns true else false.

    next return the current array of indexed element and increment i.

    Now coming back to getIterator method of Library class which should return a reference of Iterator,
    so now it return new instance of BookIterator as pass the array of books in its constructor.

    Now the client can create instance of library.
    Add multiple books to it.
    Then can call getIterator of library class which returns BookIterator.

    Since book Iterator has has next method so till it has next we keep iterating
    using iterator.next which returns an book object and thus we can get Details of the book.


    So in summary, in order to create an iterator Design we need

    1) An iterator interface with hasNext and next method
    2) An container interface to getIterator
 */

interface Iterators<T> {
    hasNext(): boolean;
    next(): T | null;
}

interface Container<T> {
    getIterator(): Iterators<T>;
}

class Book {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

class BookIterator implements Iterators<Book> {
    i = 0;
    books: Book[];

    constructor(books: Book[]) {
        this.books = books;
    }

    hasNext(): boolean {
        return this.i < this.books.length;
    }

    next(): Book | null {
        return this.hasNext() ? this.books[this.i++] : null;
    }
}

class Library implements Container<Book> {
    private books: Book[];

    constructor() {
        this.books = [];
    }

    addBooks(book: Book) {
        this.books.push(book);
    }

    getIterator() {
        return new BookIterator(this.books);
    }
}

let library = new Library();
library.addBooks(new Book("DSA"));
library.addBooks(new Book("PSA"))
library.addBooks(new Book("GSA"))
library.addBooks(new Book("SSA"))
library.addBooks(new Book("QSA"))

let iterator: Iterators<Book> = library.getIterator();
while (iterator.hasNext()) {
    let book: Book | null = iterator.next();
    console.log(book?.getName());
}


