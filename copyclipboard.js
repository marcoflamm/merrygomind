  document.getElementById("copy-button").addEventListener("click", function () {
    // Get the current page URL
    var currentUrl = window.location.href;

    // Create a temporary input element
    var tempInput = document.createElement("input");

    // Add the current page URL to the input value
    tempInput.setAttribute("value", currentUrl);

    // Append the input to the body
    document.body.appendChild(tempInput);

    // Select the input
    tempInput.select();

    // Copy the selected text
    document.execCommand("copy");

    // Remove the input from the body
    document.body.removeChild(tempInput);

    // Update the text of the "copy-status" element
    document.getElementById("copy-status").textContent = "Copied!";
  });
