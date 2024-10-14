        function updateCurrentTime() {
          const currentTimeDiv = document.querySelector('.current-time');
          const now = new Date();

          const hours = now.getHours();
          const minutes = now.getMinutes();
          const isPm = hours >= 12;
          const formattedHours = ((hours + 11) % 12 +
            1); // Converts 24h to 12h format and deals with midnight (0 hours).
          const formattedMinutes = minutes < 10 ? '0' + minutes :
            minutes; // Adds leading zero to minutes if needed.
          const amPm = isPm ? 'pm' : 'am';

          const day = now.getDate();
          const monthIndex = now.getMonth();
          const year = now.getFullYear();
          const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const monthName = monthNames[monthIndex];

          const dateString =
            `${day} ${monthName} ${year}, ${formattedHours}:${formattedMinutes}${amPm}`;

          currentTimeDiv.textContent = dateString;
        }

        // Update the time immediately and then every minute.
        updateCurrentTime();
        setInterval(updateCurrentTime, 60000);
