document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle button active state
            this.classList.toggle('active');
            
            // Toggle content
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });
});