function createBook(selector, bookTitle, author,isbn){
(function(){
    let id=1;
    return function(){
        let mainContainer=$(selector);
let bookContainer=$('<div>');
bookContainer
.attr('id', `book${id++}`)
.appendTo(mainContainer);

$('<p>')
.addClass('title')
.text(bookTitle)
.appendTo(bookContainer);
$('<p>')
.addClass('author')
.text(author)
.appendTo(bookContainer);
$('<p>')
.addClass('isbn')
.text(isbn)
.appendTo(bookContainer);

$('<button>')
.text('Select')
.appendTo(bookContainer);
$('<button>')
.text('Deselect')
.appendTo(bookContainer);
    }

}())()

}