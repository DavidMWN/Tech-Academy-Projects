// =========== SLIDESHOW ===========

// Display first image in slideshow when page loads
var slideIndex = 1;
showSlides(slideIndex);

// Change slide when Next/Previous arrows are clicked
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Change slide when dots are clicked
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Main slideshow display function
function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides"); // Stores all elements of class "mySlides" in an array
    var dots = document.getElementsByClassName("dot"); // stores all elements of class "dot" in an array

    if (n > slides.length) {slideIndex = 1}; // sets slide to first image when Next button is clicked while on last image
    if (n < 1) {slideIndex = slides.length}; // sets slide to last image when Previous button is clicked while on first image

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // sets display to none for each item in "slides" array
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace (" active", ""); //removes "active" from class name of all dots (affects styling)
    }

    slides[slideIndex - 1].style.display = "block"; //displays the image in the slideshow

    dots[slideIndex - 1].className += " active"; //adds "active" to class name of the dot assiciated with displayed image (affects styling)
}

// =========== END SLIDESHOW ===========

// =========== CONTACT FORM ============

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// This code will close the contact form when the user clicks off of it
document.addEventListener("click", function(event) {
    // if the click happens on the cancel button OR anywhere that is not the contact form AND not on any element within the contact class, then closeForm() is called
    if (event.target.matches(".cancel") || !event.target.closest(".form-popup") && !event.target.closest(".pop-up-button") && !event.target.closest(".contact")) {
        closeForm()
    }
}, false)