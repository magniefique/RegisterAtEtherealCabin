const landing_page = document.getElementById("landing_page");
const home_page = document.getElementById("reg_page");

function disableLanding()
{
    landing_page.addEventListener("transitionend", hideLanding());
    landing_page.style.opacity = "0%";
    landing_page.style.visibility = "hidden";
}

function hideLanding(){
    home_page.style.opacity = "100%";
    home_page.style.visibility = "visible";
    home_page.style.overflowY = "scroll";
}

const reg_cont = document.getElementById("region");
const prov_cont = document.getElementById("prov");
const city_cont = document.getElementById("city");
const brgy_cont = document.getElementById("brgy");
const default_cont = document.querySelectorAll("#default");

var region_dict = {};
var prov_dict = {};
var city_dict = {};

async function appendRegion() {
    const response = await fetch("./data/refregion.json");
    region_data = await response.json();

    region_data.RECORDS.forEach(function(record){
        region_dict[record.regDesc] = record.regCode;
        let reg_opt = document.createElement("option");
        reg_opt.value = record.regDesc;
        reg_opt.innerHTML = record.regDesc;
        reg_cont.append(reg_opt);
    });
}

function updateReg(){
    appendRegion();
}

async function updateProv(){
    prov_dict = {};

    removeOptions(prov_cont);
    removeOptions(city_cont);
    removeOptions(brgy_cont);

    default_cont.forEach((el) => resetDefault(el));

    const response = await fetch("./data/refprovince.json");
    prov_data = await response.json();

    prov_data.RECORDS.forEach(function(record){
        prov_dict[record.provDesc] = record.provCode;
        let prov_opt = document.createElement("option");
        if (record.regCode == region_dict[reg_cont.value]){
            prov_opt.value = record.provDesc;
            prov_opt.innerHTML = record.provDesc;
            prov_cont.append(prov_opt);
        }
    });
}

async function updateCity(){
    city_dict = {};

    removeOptions(city_cont);
    removeOptions(brgy_cont);

    resetDefault(default_cont[1]);
    resetDefault(default_cont[2]);

    const response = await fetch("./data/refcitymun.json");
    city_data = await response.json();

    city_data.RECORDS.forEach(function(record){
        city_dict[record.citymunDesc] = record.citymunCode;
        let city_opt = document.createElement("option");
        if (record.provCode == prov_dict[prov_cont.value]){
            city_opt.value = record.citymunDesc;
            city_opt.innerHTML = record.citymunDesc;
            city_cont.append(city_opt);
        }
    });
}

async function updateBrgy(){
    
    removeOptions(brgy_cont);

    resetDefault(default_cont[2]);

    const response = await fetch("./data/refbrgy.json");
    brgy_data = await response.json();

    brgy_data.RECORDS.forEach(function(record){
        let brgy_opt = document.createElement("option");
        if (record.citymunCode == city_dict[city_cont.value]){
            brgy_opt.value = record.brgyDesc;
            brgy_opt.innerHTML = record.brgyDesc;
            brgy_cont.append(brgy_opt);
        }
    });
}

function removeOptions(cont){
    while(cont.lastChild.id !== "default") {
        cont.removeChild(cont.lastChild);
    }
}

function resetDefault(opt){
    opt.disabled = false;
    opt.selected = true;
    opt.disabled = true;
}

let pass_check = false;
let cnum_check = false

function checkPass() {
    let password = document.getElementById("pass");
    let repassword = document.getElementById("repass");
    let passconfirm = document.getElementById("pass_confirm");

    if (repassword.value !== ""){
        if(password.value == repassword.value) {
            passconfirm.innerHTML = "Passwords match.";
            passconfirm.style.color = "#90EE90";
            pass_check = 1;
        }
        else {
            passconfirm.innerHTML = "Passwords does not match.";
            passconfirm.style.color = "	#FF7F7F";
            pass_check = 0;
        }
    }
}

function changeText(){
    let btn = document.getElementsByClassName("file_button");
    btn[0].innerHTML = "Uploaded";
}

// Check each field
function checkFields(div) {
    var inputs = document.querySelectorAll(div);
    var filled = true;

    inputs.forEach(function(input) {
        if (input.value.trim() === '') {
            filled = false;
        }
        if (input.name === 'repass') {
            if (pass_check === 0 || input.value.length < 4) {
                filled = false;
            }
        }
        if (input.name === 'cnum'){
            if (input.value.length < 11){
                filled = false;
            }
        }
        if (input.name === 'pcode'){
            if (input.value.length < 4){
                filled = false;
            }
        }
    });

    return filled;
}

// Function to remove blur effect from pers_info
function removeBlur(div) {
    document.getElementById(div).style.filter = "none";
    document.getElementById(div).style.pointerEvents = "all";
}

function addBlur(div) {
    document.getElementById(div).style.filter = "blur(4px)";
    document.getElementById(div).style.pointerEvents = "none";
}

// Event listener for input changes in acc_dets
document.getElementById('acc_dets').addEventListener('input', function() {
    if (checkFields('#acc_dets input[required]')) {
        removeBlur('pers_info');
    }
    else {
        addBlur('pers_info');
    }
});

// Event listener for input changes in pers_info
document.getElementById('pers_info').addEventListener('input', function() {
    if (checkFields('#pers_info input[required]')) {
        removeBlur('add_info');
    }
    else {
        addBlur('add_info');
    }
});

// Event listener for input changes in add_info
document.getElementById('add_info').addEventListener('input', function() {
    if (checkFields('#add_info input[required]')) {
        removeBlur('address');
    }
    else {
        addBlur('address');
    }
});

// Event listener for input changes in address
document.getElementById('address').addEventListener('input', function() {
    if (checkFields('#address input[required]')) {
        removeBlur('member');
    }
    else {
        addBlur('member');
    }
});

// Event listener for input changes in member
document.getElementById('member').addEventListener('input', function() {
    if (checkFields('#member input[required]')) {
        removeBlur('submit_cont');
    }
    else {
        addBlur('submit_cont');
    }
});