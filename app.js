// Student Management System

class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.booksTracked = [];
    }
}

class Book {
    constructor(title) {
        this.title = title;
        this.dateAdded = new Date().toISOString().slice(0, 10);
    }
}

const students = [
    new Student(1, 'Student A'),
    new Student(2, 'Student B'),
    new Student(3, 'Student C'),
    new Student(4, 'Student D'),
    new Student(5, 'Student E'),
    new Student(6, 'Student F'),
    new Student(7, 'Student G'),
    new Student(8, 'Student H'),
    new Student(9, 'Student I'),
    new Student(10, 'Student J'),
    new Student(11, 'Student K'),
    new Student(12, 'Student L'),
    new Student(13, 'Student M'),
    new Student(14, 'Student N'),
    new Student(15, 'Student O'),
    new Student(16, 'Student P'),
    new Student(17, 'Student Q'),
    new Student(18, 'Student R'),
    new Student(19, 'Student S'),
    new Student(20, 'Student T'),
    new Student(21, 'Student U'),
    new Student(22, 'Student V'),
    new Student(23, 'Student W'),
    new Student(24, 'Student X'),
    new Student(25, 'Student Y'),
    new Student(26, 'Student Z'),
    new Student(27, 'Student AA'),
    new Student(28, 'Student AB'),
    new Student(29, 'Student AC'),
    new Student(30, 'Student AD'),
    new Student(31, 'Student AE')
];

class BookManager {
    constructor() {
        this.dailyLimit = 3;
        this.init();
    }

    init() {
        this.loadBooks();
        this.updateBookDisplay();
    }

    loadBooks() {
        const storedData = localStorage.getItem('studentsBooks');
        if (storedData) {
            students.forEach(student => {
                student.booksTracked = JSON.parse(storedData)[student.id] || [];
            });
        }
    }

    addBook(studentId, bookTitle) {
        const student = students.find(s => s.id === studentId);
        if (!student) return;
        // Check for duplicates
        if (student.booksTracked.some(b => b.title === bookTitle)) {
            alert('This book has already been added.');
            return;
        }
        // Limit check
        if (student.booksTracked.length >= this.dailyLimit) {
            alert('Daily limit reached.');
            return;
        }
        const newBook = new Book(bookTitle);
        student.booksTracked.push(newBook);
        this.saveBooks();
        this.updateBookDisplay();
    }

    removeBook(studentId, bookTitle) {
        const student = students.find(s => s.id === studentId);
        if (!student) return;

        student.booksTracked = student.booksTracked.filter(b => b.title !== bookTitle);
        this.saveBooks();
        this.updateBookDisplay();
    }

    saveBooks() {
        const dataToStore = {};
        students.forEach(student => {
            dataToStore[student.id] = student.booksTracked;
        });
        localStorage.setItem('studentsBooks', JSON.stringify(dataToStore));
    }

    updateBookDisplay() {
        students.forEach(student => {
            console.log(`Student: ${student.name}, Books:`, student.booksTracked);
        });
    }
}

const bookManager = new BookManager();

// Example usage:
// bookManager.addBook(1, 'New Book Title');
// bookManager.removeBook(1, 'New Book Title');