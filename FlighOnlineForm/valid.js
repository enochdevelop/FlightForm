function MyClear() {
    console.log("clearing form");
    document.getElementById("myForm").reset();
}

function MySubmit() {
    alert("your form has been submitted");
}



function ValidAirCraft() {
    var myName = document.getElementById("Aircraft");
    var pos = myName.value.search(
        /^[0-9A-Z]+$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "Upper alphabets and numbers \n" +
            "Please go back and fix ");
        return false;
    } else
        return true;
}

function ValidAirCraftType() {
    var myName = document.getElementById("AircraftType");
    var pos = myName.value.search(
        /^[0-9A-Z]{4}-[0-9A-Z]{4}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "AAAA-AAAA \n" +
            "Please go back and fix ");
        return false;
    } else
        return true;
}

function Specification() {
    var myName = document.getElementById("SpecialEquipment");
    var pos = myName.value.search(
        /^[/A-Z]{2}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "/A \n" +
            "Please go back and fix ");
        return false;
    } else
        return true;
}

function AirSp() {
    var myName = document.getElementById("Speed");
    var pos = myName.value.search(
        /^[0-9]{3}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "### \n" +
            "Please go back and fix all positive numbers");
        return false;
    } else
        return true;
}

function Dep() {
    var myName = document.getElementById("Departure");
    var pos = myName.value.search(
        /^[A-Z0-9]{4}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "AAAA \n" +
            "Please go back and fix ex: A17A ");
        return false;
    } else
        return true;
}

function Prope() {
    var myName = document.getElementById("prop");
    var pos = myName.value.search(
        /^[0-5]?[0-9]{4}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "00:00 \n" +
            "Please go back and fix ex: 10:10");
        return false;
    } else
        return true;
}

function Alt() {
    var myName = document.getElementById("Altitude");
    var pos = myName.value.search(
        /^[0-9]?[0-9]{5}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "5 characters 0-9\n" +
            "Please go back and fix ex: 99998");
        return false;
    } else
        return true;
}

function Des() {
    var myName = document.getElementById("Destination");
    var pos = myName.value.search(
        /^[A-Z0-9]{4}?[A-Za-z]$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "AAAA and City\n" +
            "Please go back and fix ex: A17ANewYork ");
        return false;
    } else
        return true;
}

function Time() {
    var myName = document.getElementById("TimeRoute");
    var pos = myName.value.search(
        /^[0-9]?[0-9]{4}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "xx:xx \n" +
            "Please go back and fix ex: 01:20");
        return false;
    } else
        return true;
}

function Hours() {
    var myName = document.getElementById("How");
    var pos = myName.value.search(
        /^[0-9]{2}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "xx \n" +
            "Please go back and fix ex: 05 hours");
        return false;
    } else
        return true;
}

function Minutes() {
    var myName = document.getElementById("Min");
    var pos = myName.value.search(
        /^[0-9]{2}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "## \n" +
            "Please go back and fix ex: 20 minutes");
        return false;
    } else
        return true;
}

function Air() {
    var myName = document.getElementById("Airports");
    var pos = myName.value.search(
        /^[0-9A-Z]{4},[0-9A-Z]{4}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "AAAA \n" +
            "Please go back and fix ex: EW21");
        return false;
    } else
        return true;
}


function PeopleNames() {
    var myName = document.getElementById("Info");
    var pos = myName.value.search(
        /^[A-Z][a-z]+, ?[A-Z][a-z]+, ?[A-Z]\.?$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "First, Last, M\n" +
            "Please go back and fix");
        return false;
    } else
        return true;
}

function Phones() {
    var myName = document.getElementById("Info2");
    var pos = myName.value.search(/^\d{3}-\d{3}-\d{4}$/);

  if (pos != 0) {
    alert("The phone number you entered (" + myName.value +
          ") is not in the correct form. \n" +
          "The correct form is: ddd-ddd-dddd \n" +
          "Please go back and fix your phone number");
    return false;
  } else
    return true;
}


function HomeB() {
    var myName = document.getElementById("Info3");
    var pos = myName.value.search(
        /^[A-Z0-9]{4}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "AAAA\n" +
            "Please go back and fix");
        return false;
    } else
        return true;
}

function AB() {
    var myName = document.getElementById("Abroad");
    var pos = myName.value.search(
        /^[0-9]{3}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: " +
            "###\n" +
            "Please go back and fix");
        return false;
    } else
        return true;
}

function Color() {
    var myName = document.getElementById("Col");
    var pos = myName.value.search(/^[a-zA-Z._-]+$/);

  if (pos != 0) {
    alert("The phone number you entered (" + myName.value +
          ") is not in the correct form. \n" +
          "The correct form is: dddd-\n" +
          "Please go back and fix");
    return false;
  } else
    return true;
}

function Last() {
    var myName = document.getElementById("End");
    var pos = myName.value.search(
        /^[A-Za-z]{1,15}$/);

    if (pos != 0) {
        alert("The name you entered (" + myName.value +
            ") is not in the correct form. \n" +
            "The correct form is: Alpha numbers no more than 15 " +
            " \n" +
            "Please go back and fix ");
        return false;
    } else
        return true;
}