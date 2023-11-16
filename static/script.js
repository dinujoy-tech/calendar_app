
  let date = new Date();
  const tasksData = {};
  let selectedDateKey = "";


  const renderCalendar = () => {
    const localDate = new Date(date);
    date.setDate(1);

    const monthDays = document.querySelector(".days");

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayIndex = date.getDay();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentMonth = months[date.getMonth()];
    const currentYear = date.getFullYear();

    document.querySelector(".date h1").innerHTML = currentMonth;
    document.querySelector(".date p").innerHTML = currentYear;
    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }


for (let i = 1; i <= lastDay; i++) {
  const dateKey = `${currentYear}-${date.getMonth() + 1}-${i}`;
  if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
    days += `<div class="today calendar-day" onclick="selectDate('${dateKey}')">${i}</div>`;
  } else {
    days += `<div class="calendar-day" onclick="selectDate('${dateKey}')">${i}</div>`;
  }
}


    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
    }

    monthDays.innerHTML = days;
  };
 // renderCalendar();


function selectDate(dateKey) {
  // Use the dateKey parameter to access the selected date
  console.log(`Selected date: ${dateKey}`);


  const eventText = document.getElementById('eventInput');

  // Call the function to save the event to the database
  saveEventToDatabase(dateKey, eventText);
}


const saveEventToDatabase = async (dateKey, eventText) => {
  try {
    const response = await fetch('/api/saving-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: dateKey, event: eventText }),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Get the error message from the response body
      throw new Error(`Failed to save event for date ${dateKey}. Error: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Event saved successfully:', data.message);
  } catch (error) {
    console.error('Error saving event:', error.message);
  }
};







document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

// Initialize the calendar with the current date
renderCalendar();