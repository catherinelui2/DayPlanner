// allows users to save events for each hour
let text = JSON.parse(localStorage.getItem("#text")) || [];
let lastID = localStorage.getItem("lastID") || 0;

$('#button-addon2').click(function(event) {
    event.preventDefault();
    const newItem = {
        id: ++lastID,
        event: $('#text').val().trim()
    }
    if (!newItem.event) {
        return alert("Must enter a task/event in order to save!")
    }

    text.push(newItem);
    updateStorage();
    text.text(newItem.event);

});



const updateStorage = () => {
    localStorage.setItem("text", JSON.stringify(text));
    localStorage.setItem("lastID", JSON.stringify(lastID));
}
// Add important events to a daily planner
// current day is displayed at the top 
var currentDate = moment().format('LLLL');
$('#currentDay').append(currentDate);
// scroll to present timeblocks for standard business hours
// timeblocks color coded to indicate whether it is the past, present or future
// click timeblock to edit or enter event
// click save button on timeblock to local storage and keep content on timeblock