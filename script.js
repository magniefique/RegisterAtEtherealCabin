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

function checkPass() {
    let password = document.getElementById("pass");
    let repassword = document.getElementById("repass");

    if(password.value == repassword.value) {
        return true;
    }
    else {
        alert('Password does not match!');
        return false;
    }
}

function changeText(){
    let btn = document.getElementsByClassName("file_button");
    btn[0].innerHTML = "Uploaded";
}