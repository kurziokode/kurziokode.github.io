   // set the target date and time
      const targetDate = new Date("June 15, 2024 00:00:00 GMT+0200");

      // update the countdown timer every second
      setInterval(() => {
        // get the current time in Athens time zone
        const now = new Date().toLocaleString("en-US", { timeZone: "Europe/Athens" });
        const nowAthens = new Date(now);

        // calculate the time difference between now and the target date
        const timeDiff = targetDate - nowAthens;

        // convert the time difference to days, hours, minutes, and seconds
        const totalSeconds = Math.floor(timeDiff / 1000);
        const days = Math.floor(totalSeconds / (24 * 3600));
        const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        // display the countdown timer
        const daysSpan = document.getElementById("days");
        const hoursSpan = document.getElementById("hours");
        const minutesSpan = document.getElementById("minutes");
        const secondsSpan = document.getElementById("seconds");
        daysSpan.textContent = days.toString().padStart(2, "0");
        hoursSpan.textContent = hours.toString().padStart(2, "0");
        minutesSpan.textContent = minutes.toString().padStart(2, "0");
        secondsSpan.textContent = seconds.toString().padStart(2, "0");
      }, 1000);
