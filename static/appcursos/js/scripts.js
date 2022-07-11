let CURSOS_OTONO = ["MA11 - Álgebra I", "MA01 - Cálculo I", "FI01 - Física Clásica", "QC01 - Química", "BI01 - Biología"];
let CURSOS_PRIMAVERA = ["MA12 - Álgebra II", "MA02 - Cálculo II", "EC01 - Economía", "FI01 - Física Moderna", "CC01 - Programación"];

$(document).ready(function () {
    updateCursoSelect();
    handleSemestreSelect();
    handleSubmitButton();
    handleExportButton();
});

function handleSemestreSelect() {
    $("#semestre-select").on("change", function () {
        updateCursoSelect();
    });
};

var cached_response;
var busy = false;
function handleSubmitButton() {
    $("#submit-button").on("click", function () {
        console.log("button");
        if (!busy) {
            busy = true;
            anio = $("#semestre-select").val().split("-")[0];
            semestre = $("#semestre-select").val().split("-")[1];
            codigo = $("#curso-select").val().split(" - ")[0];
            console.log($.cookie("csrftoken"));
            $.ajax({
                url: "/",
                type: "POST",
                dataType: "json",
                data: { anio: anio, semestre: semestre, codigo: codigo},
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRFToken": $.cookie("csrftoken"),
                },
                success: (response) => {
                    cached_response = response;
                    updateTable(response["data"]);
                },
                error: (error) => {
                    console.log(error);
                }
            });
            busy = false;
        };
    });
};

function handleExportButton(){
    $("#export-button").on("click", function(){
        exportCSV();
    });
};

function updateCursoSelect() {
    $("#curso-select").empty();
    if ($("#semestre-select").val().split("-")[1] == 1) {
        for (curso of CURSOS_OTONO) {
            opt = document.createElement("option");
            opt.text = curso;
            opt.value = curso;
            document.getElementById("curso-select").appendChild(opt);
        };
    } else {
        for (curso of CURSOS_PRIMAVERA) {
            opt = document.createElement("option");
            opt.text = curso;
            opt.value = curso;
            document.getElementById("curso-select").appendChild(opt);
        };
    };
};

var table;
function updateTable(data) {
    if (table != null) {
        table.destroy();
    };
    $("#results-table > thead").empty();
    $("#results-table > tfoot").empty();
    $("#results-table > tbody").empty();
    $("#results-table > thead").append("<tr><th>Número</th><th>Enunciado</th><th>Puntaje</th><th>Respuesta correcta</th><th>Respuesta estudiante</th><th>Estudiante</th></tr>");
    $("#results-table > tfoot").append("<tr><th>Número</th><th>Enunciado</th><th>Puntaje</th><th>Respuesta correcta</th><th>Respuesta estudiante</th><th>Estudiante</th></tr>");
    for (let i = 0; i < data.length; i++) {
        $("#results-table > tbody").append(`<tr><td>${data[i]["numero"]}</td><td>${data[i]["enunciado"]}</td><td>${data[i]["puntaje"]}</td><td>${data[i]["correcta"]}</td><td>${data[i]["respuesta"]}</td><td>${data[i]["nombre"]}</td></tr>`);
    };
    datatable = document.getElementById('results-table');
    table = new simpleDatatables.DataTable(datatable);
    $("#results-label").html("Resultados: " + codigo + ", " + anio + "-" + semestre)
    $("#table-container").removeAttr("hidden");
    $("#export-button-container").removeAttr("hidden");
};

function exportCSV(){
    rows = [["Pregunta", "Enunciado", "Puntaje", "Respuesta_correcta", "Respuesta_estudiante", "Nombre_estudiante"]];
    for(dict of cached_response["data"]){
        rows.push([dict["numero"], dict["enunciado"], dict["puntaje"], dict["correcta"], dict["respuesta"], dict["nombre"]]);
    };
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    filename = cached_response["input"]["codigo"] + "_" + cached_response["input"]["anio"] + "_" + cached_response["input"]["semestre"] + ".csv";
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
};