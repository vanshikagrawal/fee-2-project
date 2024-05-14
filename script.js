const searchInput = document.getElementById('searchInput');
const accordionContainer = document.getElementById('accordionContainer');

// Sample FAQ data
const faqs = [
    { question: "What is HTML?", answer: "HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages." },
    { question: "What is CSS?", answer: "CSS stands for Cascading Style Sheets. It is used to style the appearance of HTML elements on a web page." },
    { question: "What is JavaScript?", answer: "JavaScript is a programming language that enables interactive web pages and web applications." },
    { question: "What is Tailwind CSS?", answer: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to quickly build custom designs." },
    { question: "What is an API?", answer: "An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other." },
    // Additional questions
    { question: "What is responsive web design?", answer: "Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes." },
    { question: "What is version control?", answer: "Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later." },
    { question: "What is the difference between HTTP and HTTPS?", answer: "HTTP (Hypertext Transfer Protocol) is a protocol used for transmitting data over the internet, while HTTPS (Hypertext Transfer Protocol Secure) is a secure version of HTTP that uses encryption to protect data." },
    { question: "What is a database?", answer: "A database is an organized collection of structured information, typically stored electronically in a computer system." },
    { question: "What is cloud computing?", answer: "Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, and more—over the internet ('the cloud')." }
];

// Function to render FAQs
function renderFAQs() {
    accordionContainer.innerHTML = ''; 

    faqs.forEach((faq, index) => {
        const accordion = document.createElement('div');
        accordion.classList.add('accordion', 'border', 'border-gray-200', 'rounded-lg', 'bg-white', 'shadow-md', 'my-4');
        accordion.id = `accordion${index + 1}`;

        const title = document.createElement('div');
        title.classList.add('accordion-title', 'flex', 'justify-between', 'items-center', 'cursor-pointer', 'p-4', 'border-b', 'border-gray-200');
        title.innerHTML = `<span class="text-lg">${faq.question}</span><span class="icon">+</span>`;
        title.addEventListener('click', () => toggleAccordion(accordion, title, title.nextElementSibling, title.querySelector('.icon')));

        const content = document.createElement('div');
        content.classList.add('accordion-content', 'hidden', 'px-4', 'py-3');
        content.textContent = faq.answer;

        accordion.appendChild(title);
        accordion.appendChild(content);
        accordionContainer.appendChild(accordion);
    });
}

// Toggle accordion content
function toggleAccordion(accordion, title, content, icon) {
    const isHidden = content.classList.contains('hidden');
    
    const allAccordions = document.querySelectorAll('.accordion-content');
    allAccordions.forEach((acc) => {
        acc.classList.add('hidden');
        acc.previousElementSibling.classList.remove('active');
        acc.previousElementSibling.querySelector('.icon').textContent = '+';
    });

    if (isHidden) {
        content.classList.remove('hidden');
        icon.textContent = '-';
        title.classList.add('active');
    } else {
        content.classList.add('hidden');
        icon.textContent = '+';
        title.classList.remove('active');
    }
}

// Search functionality
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.trim().toLowerCase();

    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach((accordion) => {
        const title = accordion.querySelector('.accordion-title');
        const content = accordion.querySelector('.accordion-content');

        const question = title.textContent.trim().toLowerCase();
        const answer = content.textContent.trim().toLowerCase();

        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            accordion.style.display = 'block';
        } else {
            accordion.style.display = 'none';
            content.classList.add('hidden');
            title.querySelector('.icon').textContent = '+';
            title.classList.remove('active'); 
        }
    });
});

// Initial render
renderFAQs();
