let manualMode = false;
let currentHours = new Date().getHours();
let currentMinutes = new Date().getMinutes();
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');

function updateClock(hours, minutes, seconds = 0) {
   const hourDeg = (hours % 12) * 30 + (minutes / 60) * 30;
   const minuteDeg = (minutes * 6) + (seconds / 60) * 6;
   const secondDeg = seconds * 6;

   hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
   minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
   document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`; //Determines the degrees for each hand based on the time

   const sceneryElement = document.getElementById('scenery');  //Changes the scenery's background and text based on the current hour

   if (hours >= 6 && hours < 12) {
         sceneryElement.style.backgroundColor = '#FFFACD'; // Clear sky
         sceneryElement.innerText = "Good Morning!";
         sceneryElement.style.color = '#FFA500';

   } else if (hours >= 12 && hours < 18) {
         sceneryElement.style.backgroundColor = '#FFD700'; // Sunny
         sceneryElement.innerText = "Good Afternoon!";
         sceneryElement.style.color = '#8B4513';

   } else if (hours >= 18 && hours < 21) {
         sceneryElement.style.backgroundColor = '#FF4500'; // Sunset
         sceneryElement.innerText = "Good Evening!";
         sceneryElement.style.color = '#FFFFFF';

   } else {
         sceneryElement.style.backgroundColor = '#191970'; // Night sky
         sceneryElement.innerText = "Good Night!";
         sceneryElement.style.color = '#FFFFE0';
   }
}

function setAutomaticTime() { //Continuously updates the clock every second when in automatic mode
   manualMode = false; // Switch to automatic mode
   setInterval(() => {
         const now = new Date();
         if (!manualMode) {
            currentHours = now.getHours();
            currentMinutes = now.getMinutes();
            updateClock(currentHours, currentMinutes, now.getSeconds());
         }
   }, 1000);
}
// Event listeners
document.getElementById('autoButton').addEventListener('click', () => {
   manualMode = false; // Switch to automatic mode
   setAutomaticTime();
});  //

document.getElementById('manualButton').addEventListener('click', () => {
   manualMode = true; // Switch to manual mode
   document.getElementById('popupOverlay').style.display = 'block';
   document.getElementById('timePopup').style.display = 'block';
});

document.getElementById('setTimeButton').addEventListener('click', () => {
   const hours = parseInt(document.getElementById('hours').value);
   const minutes = parseInt(document.getElementById('minutes').value);
   currentHours = hours;
   currentMinutes = minutes;
   updateClock(currentHours, currentMinutes, 0);
   document.getElementById('popupOverlay').style.display = 'none';
   document.getElementById('timePopup').style.display = 'none';
});

document.getElementById('closePopup').addEventListener('click', () => {
   document.getElementById('popupOverlay').style.display = 'none';
   document.getElementById('timePopup').style.display = 'none';
});

setAutomaticTime(); // Start with automatic time