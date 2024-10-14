    // Function to calculate reading time
    function calculateReadingTime() {
      var contentElement = document.getElementById('content');
      if (!contentElement) return; // Exit if content element doesn't exist

      var text = contentElement.textContent || contentElement.innerText;
      var words = text.split(/\s+/).filter(Boolean)
        .length; // Count words, filtering out any empty strings
      var readingSpeed = 225; // Average reading speed (words per minute)
      var readingTime = Math.ceil(words / readingSpeed); // Calculate reading time and round up

      // Display the reading time
      var readingTimeElement = document.getElementById('readingTime');
      if (readingTimeElement) {
        readingTimeElement.textContent = readingTime + ' minute' + (readingTime !== 1 ? 's' : '') +
          ' read';
      }
    }

    // Call the function to calculate and display reading time
    calculateReadingTime();
