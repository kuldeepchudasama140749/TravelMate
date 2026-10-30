
// TravelMate - JavaScript Functionality


// 1. Get HTML Elements
const tripForm = document.getElementById("tripForm");

const destination = document.getElementById("destination");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const travelers = document.getElementById("travelers");

const tripDetails = document.getElementById("tripDetails");

const activityForm = document.getElementById("activityForm");

const activityName = document.getElementById("activityName");
const activityDate = document.getElementById("activityDate");
const activityTime = document.getElementById("activityTime");
const activityLocation = document.getElementById("activityLocation");

const activityList = document.getElementById("activityList");


// 2. Create My Trip Functionality

tripForm.addEventListener("submit", function(event) {

    // Prevent page from refreshing
    event.preventDefault();

    // Get values from the form
    let place = destination.value;
    let start = startDate.value;
    let end = endDate.value;
    let people = travelers.value;

    // Check whether end date is after start date
    if (end < start) {
        alert("End date must be after start date!");
        return;
    }

    // Display trip details
    tripDetails.innerHTML = `
        <h3>My Trip Details</h3>
        <p><strong>Destination:</strong> ${place}</p>
        <p><strong>Start Date:</strong> ${start}</p>
        <p><strong>End Date:</strong> ${end}</p>
        <p><strong>Travelers:</strong> ${people}</p>
    `;

    // Set activity date limits
    activityDate.min = start;
    activityDate.max = end;

    // Show success message
    alert("Your trip has been created successfully!");

});


// 3. Add Activity Functionality

activityForm.addEventListener("submit", function(event) {

    // Prevent page from refreshing
    event.preventDefault();

    // Get activity details
    let name = activityName.value;
    let date = activityDate.value;
    let time = activityTime.value;
    let location = activityLocation.value;

    // Check whether activity belongs to the trip dates
    if (!tripDetails.querySelector("h3")) {
        alert("Please create your trip first!");
        return;
    }

    let start = startDate.value;
    let end = endDate.value;

    if (date < start || date > end) {
        alert("Activity date must be within your trip dates!");
        return;
    }

    // Create a new activity card
    let activityCard = document.createElement("div");

    activityCard.className = "activity-card";

    // Add activity information
    let details = document.createElement("p");

    details.innerHTML = `
        <strong>${name}</strong><br>
        Date: ${date}<br>
        Time: ${time}<br>
        Location: ${location}
    `;

    // Create Delete Button
    let deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete Activity";

    deleteButton.type = "button";

    // Delete activity when button is clicked
    deleteButton.addEventListener("click", function() {
        activityCard.remove();
        
        // Show message if no activities remain
        if (activityList.children.length === 0) {
            activityList.innerHTML =
                "<p>No activities added yet.</p>";
        }
    });

    // Add details and button to activity card
    activityCard.appendChild(details);
    activityCard.appendChild(deleteButton);

    // Remove default empty message
    if (activityList.querySelector("p") &&
        activityList.children.length === 1 &&
        activityList.querySelector("p").textContent ===
        "No activities added yet.") {

        activityList.innerHTML = "";
    }

    // Add activity card to the activity list
    activityList.appendChild(activityCard);

    // Clear the activity form
    activityForm.reset();

});
