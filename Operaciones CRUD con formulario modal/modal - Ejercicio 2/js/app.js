var modal = document. getElementById("myModal");
var AddButton = document.getElementById("AddButton");
var span = document.getElementsByClassName("close")[0];
var insertButton = document.getElementById("InsertButton");
var updateButton = document.getElementById("UpdateButton");
var table = document.getElementById("PersonTable");
var selectedRowIndex = 0;

AddButton.onclick = function(){
    modal.style.display = "block";
    ClearForm();
}

span.onclick = function(){
    modal.style.display = "none";
}

function GetCheckedRadioValue(RadiosName){
    var radios = document.getElementsByName(RadiosName);
    var selectedOption="";
    for (var i=0, length=radios.length; i<length;i++){
        if(radios[i].checked){
            selectedOption = radios[i].value;
            break;
        }
    }
    return selectedOption;
}

function GetCheckedBoxesValue(ChkboxName){
    var checkboxes = document.getElementsByName(ChkboxName);
    var checkboxesChecked ="";
    for (var i=0; i<checkboxes.length;i++){
        if(checkboxes[i].checked){
            checkboxesChecked = checkboxesChecked.concat(checkboxes[i].value).concat(", ");
        }
    }
    checkboxesChecked = checkboxesChecked.trim().substring(0,checkboxesChecked.trim().length-1);
    return checkboxesChecked.length>0?checkboxesChecked:"";
}

function InsertarRegistro(){
    if(document.getElementById("IDTextBox").value!==null && document.getElementById("IDTextBox").value!==undefined && document.getElementById("IDTextBox").value.toString().length==14){
        var a = document.getElementById("PersonTable").insertRow(1);
        var b = a.insertCell(0);
        var c = a.insertCell(1);
        var d = a.insertCell(2);
        var e = a.insertCell(3);
        var f = a.insertCell(4);
        var g = a.insertCell(5);

        b.innerHTML = document.getElementById("IDTextBox").value;
        c.innerHTML = document.getElementById("FirstNameTextBox").value;
        d.innerHTML = document.getElementById("LastNameTextBox").value;
        e.innerHTML = GetCheckedRadioValue("Sexo");
        f.innerHTML = GetCheckedBoxesValue("Pasatiempos");
        var buttons = "<button name=EditButton' onclick='ShowModalForEdit(this)'>Editar</button>";
        buttons = buttons.concat("&nbsp;").concat("<button name = 'DeleteButton' onclick='deleteRow(this)'>Eliminar</button>");
        
        g.innerHTML = buttons;

        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
}

function deleteRow(sender){
    var i = sender.parentNode.parentNode.rowIndex;
    document.getElementById("PersonTable").deleteRow(i);
}

function ShowModalForEdit(sender){
    modal.style.display = "block";
    selectedRowIndex = sender.parentNode.parentNode.rowIndex;

    document.getElementById("IDTextBox").value = table.rows[selectedRowIndex].cells[0].innerHTML.toString();
    document.getElementById("FirstNameTextBox").value = table.rows[selectedRowIndex].cells[1].innerHTML.toString();
    document.getElementById("LastNameTextBox").value = table.rows[selectedRowIndex].cells[2].innerHTML.toString();
    var genero = table.rows[selectedRowIndex].cells[3].innerHTML.toString();
    SelectRadioByValue("Sexo",genero);

    var PasatiemposString = table.rows[selectedRowIndex].cells[4].innerHTML.toString();
    var PasatiemposArray = PasatiemposString.split(",");

    for (var x=0;x<PasatiemposArray.length;x++){
        SelectCheckBoxByValue("Pasatiempos", PasatiemposArray[x].trim());
    }
}

function ClearForm(){
    document.getElementById("IDTextBox").value ='';
    document.getElementById("FirstNameTextBox").value ='';
    document.getElementById("LastNameTextBox").value ='';
    CheckBoxesToFalse("Pasatiempos");
    RadiosToFalse("Sexo");
}

function CheckBoxesToFalse(ChkboxName){
    var checkboxes = document.getElementsByName(ChkboxName);
    for (var i=0; i< checkboxes.length; i++){
        checkboxes[i].checked = false;
    }
    return;
}

function RadiosToFalse(RadiosName){
    var radios = document.getElementsByName(RadiosName);
    for (var i=0; i< radios.length; i++){
        radios[i].checked = false;
    }
    return;
}

function SelectRadioByValue(RadiosName,Value){
    var radios = document.getElementsByName(RadiosName);
    for (var i = 0; i<radios.length; i++){
        if(radios[i].value == Value){
            radios[i].checked = true;
            break;
        }
    }
    return;
}

function SelectCheckBoxByValue(ChkboxName,Value){
    var checkboxes = document.getElementsByName(ChkboxName);
    for (var i = 0; i<checkboxes.length; i++){
        if(checkboxes[i].value == Value){
            checkboxes[i].checked = true;
            break;
        }
    }
    return;
}

function ActualizarRegistro(){
    table.rows[selectedRowIndex].cells[0].innerHTML = document.getElementById("IDTextBox").value;
    table.rows[selectedRowIndex].cells[1].innerHTML = document.getElementById("FirstNameTextBox").value;
    table.rows[selectedRowIndex].cells[2].innerHTML = document.getElementById("LastNameTextBox").value;
    table.rows[selectedRowIndex].cells[3].innerHTML = GetCheckedRadioValue("Sexo");
    table.rows[selectedRowIndex].cells[4].innerHTML = GetCheckedBoxesValue("Pasatiempos");
    modal.style.display = "none";
}