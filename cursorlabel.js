    // Function to change the cursor label
    function changeCursorLabel(event) {
      const label = event.target.getAttribute('cursor-label');
      const cursorLabelDiv = document.querySelector('.cursor-circle_label');
      cursorLabelDiv.textContent = label;
    }

    // Function to reset the cursor label
    function resetCursorLabel() {
      const cursorLabelDiv = document.querySelector('.cursor-circle_label');
      cursorLabelDiv.textContent = '';
    }

    // Add event listeners to elements with the class 'hover-item'
    const hoverItems = document.querySelectorAll('[cursor-label]');
    hoverItems.forEach(item => {
      item.addEventListener('mouseenter', changeCursorLabel);
      item.addEventListener('mouseleave', resetCursorLabel);
    });
