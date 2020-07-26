// allows users to save events for each hour
const savedToDoStorageKey = "savedToDos";
let savedToDos = JSON.parse(localStorage.getItem(savedToDoStorageKey)) || {};
const timeSlotsContainer = $('#timeSlotsContainer');
const beginningHour24 = 8;
const endingHour24 = 5 + 12;
const currentDateTime = moment().subtract(8, 'hour'); 
for (let slotHour24 = beginningHour24; slotHour24 <= endingHour24; slotHour24++) {
    let slotHour12;
    let slotMeridian; 
    if (slotHour24 > 12) {
        slotHour12 = slotHour24 - 12;
        slotMeridian = "pm";
    }
    else {
        slotHour12 = slotHour24;
        slotMeridian = "am";
    }

    let currentSlotClassName;
    let currentHr24 = currentDateTime.hour();
    if (currentHr24 === slotHour24) {
        currentSlotClassName = "currentHrTimeSlot";
    } else if (currentHr24 < slotHour24 ) {
        currentSlotClassName = "futureHrTimeSlot";
    } else {
        currentSlotClassName = "pastHrTimeSlot";
    }


    const timeSlotHr = slotHour12 + slotMeridian;
    const timeSlotHTML = createTimeSlotHtml(timeSlotHr);
    let timeSlotEl = $($.parseHTML(timeSlotHTML));
    timeSlotEl.addClass(currentSlotClassName);
    let textAreaEl = timeSlotEl.find("textarea");
    let savedToDo = savedToDos[timeSlotHr];
    if (savedToDo) {
        textAreaEl.val(savedToDo);
    }
    let buttonEl = timeSlotEl.find("button");
    timeSlotsContainer.append(timeSlotEl);



    buttonEl.click(function (event) {
        event.preventDefault();
        const newItem = textAreaEl.val().trim();

        if (!newItem) {
            return alert("Must enter a task/event in order to save!");
        }

        savedToDos[timeSlotHr] = newItem;
        updateStorage();
    });

    
}


function createTimeSlotHtml(timeSlotHr) {
    const timeSlotHTML = `
    <div id="input-${timeSlotHr}" class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">${timeSlotHr}</span>
        </div>
        <textarea class="form-control" aria-label="With textarea"></textarea>
        <button class="btn btn-outline-secondary" type="button" class="button-addon2">Save</button>
    </div>`;
    return timeSlotHTML;
};

const updateStorage = () => {
    localStorage.setItem(savedToDoStorageKey, JSON.stringify(savedToDos));
};
// Add important events to a daily planner
// current day is displayed at the top

$("#currentDay").append(currentDateTime.format("LLLL"));
// scroll to present timeblocks for standard business hours
// timeblocks color coded to indicate whether it is the past, present or future
// click timeblock to edit or enter event
// click save button on timeblock to local storage and keep content on timeblock
