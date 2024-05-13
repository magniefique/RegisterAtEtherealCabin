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
    addBlur('member');
    addBlur('submit_cont');

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
    addBlur('member');
    addBlur('submit_cont');

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
    addBlur('member');
    addBlur('submit_cont');
    
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
let verif1 = false;
let verif2 = false;

function checkPass() {
    let password = document.getElementById("pass");
    let repassword = document.getElementById("repass");
    let passcheck = document.getElementById("pass_check");
    let passconfirm = document.getElementById("pass_confirm");

    if (password.value !== ""){
        if(password.value.length < 4){
            passcheck.innerHTML = "Password is less than 4 characters";
            passcheck.style.color = "#FF7F7F";
        }
        else {
            passcheck.innerHTML = "Password looks good";
            passcheck.style.color = "#90EE90";
        }
    }

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
            if (input.value.length < 11 || Number.isNaN(input.value)){
                filled = false;
            }
        }
        if (input.name === 'pcode'){
            if (input.value.length < 4 || Number.isNaN(input.value)){
                filled = false;
            }
        }

        if (input.name === 'verif1'){
            if(!input.checked){
                filled = false
            }
        }

        if (input.name === 'verif2'){
            if(!input.checked){
                filled = false
            }
        }

        if (input.value === "default"){
            filled = false;
        }
    });

    return filled;
}

function checkSucceed(div1, div2){
    if(checkFields(div1)){
        removeBlur(div2);
    }
}

function checkSucceed2(div1, div2, div3){
    if(checkFields(div1) && checkFields(div2)){
        removeBlur(div3);
    }
}

function checkRadio(div1){
    let radio = document.querySelectorAll(div1);
    if(radio.length > 0) {  //Test if something was checked
        console.log(radio);
        return true;
    } 
    else {
        return false;
    }
}

function removeRadioBlur(){
    if (checkRadio('#add_info input[name = "gender"]:checked') && checkRadio('#add_info input[name = "empstatus"]:checked') && checkRadio('#add_info input[name = "disability"]:checked')) {
        removeBlur('address');
    }
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
        checkSucceed('#pers_info input[required]', 'add_info');
        removeRadioBlur()
        checkSucceed2('#address input[required]', '#address select', 'member');
        checkSucceed2('#member input[required]', '#member select', 'submit_cont');
    }
    else {
        addBlur('pers_info');
        addBlur('add_info');
        addBlur('address');
        addBlur('member');
        addBlur('submit_cont');
    }
});

// Event listener for input changes in pers_info
document.getElementById('pers_info').addEventListener('input', function() {
    if (checkFields('#pers_info input[required]')) {
        removeBlur('add_info');
        removeRadioBlur()
        checkSucceed2('#address input[required]', '#address select', 'member');
        checkSucceed2('#member input[required]', '#member select', 'submit_cont');
    }
    else {
        addBlur('add_info');
        addBlur('address');
        addBlur('member');
        addBlur('submit_cont');
    }
});

// Event listener for input changes in add_info
document.getElementById('add_info').addEventListener('input', function() {
    if (checkRadio('#add_info input[name = "gender"]:checked') && checkRadio('#add_info input[name = "empstatus"]:checked') && checkRadio('#add_info input[name = "disability"]:checked')) {
        removeBlur('address');
        checkSucceed2('#address input[required]', '#address select', 'member');
        checkSucceed2('#member input[required]', '#member select', 'submit_cont');
    }
    else {
        addBlur('address');
        addBlur('member');
        addBlur('submit_cont');
    }
});

// Event listener for input changes in address
document.getElementById('address').addEventListener('input', function() {
    if (checkFields('#address input[required]') && (checkFields('#address select'))) {
        removeBlur('member');
        checkSucceed('#member input[required]', 'submit_cont');
    }
    else {
        addBlur('member');
        addBlur('submit_cont');
    }
});

// Event listener for input changes in member
document.getElementById('member').addEventListener('input', function() {
    if (checkFields('#member input[required]') && (checkFields('#member select'))) {
        removeBlur('submit_cont');
    }
    else {
        addBlur('submit_cont');
    }
});

function formSubmit(event) {
    var url = "database.php";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() {
        console.log(request.responseText);
    };
  
    request.onerror = function() {
        console.log(request.responseText);
    };
  
    request.send(new FormData(event.target));
    event.preventDefault();
    window.location.replace("http://localhost/RegistrationForm/acknowledgement.php");
}

document.getElementById('regform').addEventListener("submit", formSubmit);
const alert_win = document.getElementById('alert');

function logIn(event){
    let username = document.getElementById('loginuser').value;
    let password = document.getElementById('loginpass').value;

    let userInfo = {username : username, password : password};
    
    fetch('accountcheck.php', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; characterset=utf8"
        },
        "body": JSON.stringify(userInfo)
    }).then((res) => res.json()).then(response => {
        let account = response[0];

        if(account != undefined){
            if(account.pass == password){
                localStorage.setItem("loggedInUser", JSON.stringify(account));
                window.location.href = "profile.php";
            }
            else {
                alert_win.classList.add('active');
            }
        }
        else {
            alert_win.classList.add('active');
        }
        
    }).catch(error => console.log(error));

    event.preventDefault();
}

function checkUsername(){
    let username = document.getElementById('username').value;
    let usercheck = document.getElementById('user_confirm');

    let userInfo = {
        username : username,
    };

    fetch('accountcheck.php', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; characterset=utf8"
        },
        "body": JSON.stringify(userInfo)
    }).then((res) => res.json()).then(response => {
        let account = response[0];

        if(account != undefined){
            usercheck.innerHTML = "Username is unavailable."
            usercheck.style.color = "#FF7F7F";
        }
        else {
            usercheck.innerHTML = "Username is available."
            usercheck.style.color = "#90EE90";
        }
        
    }).catch(error => console.log(error));
}