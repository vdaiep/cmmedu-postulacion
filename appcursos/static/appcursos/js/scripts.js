let CURSOS_OTONO = ["MA11 - Álgebra I", "MA01 - Cálculo I", "FI01 - Física Clásica", "QC01 - Química", "BI01 - Biología"];
let CURSOS_PRIMAVERA = ["MA12 - Álgebra II", "MA02 - Cálculo II", "EC01 - Economía", "FI01 - Física Moderna", "CC01 - Programación"];

$( document ).ready(function(){
    updateCursoSelect();
    handleSemestreSelect();
});

function handleSemestreSelect(){
    $("#semestre-select").on("change", function(){
        updateCursoSelect();
    });
};

function updateCursoSelect(){
    $("#curso-select").empty();
    if($("#semestre-select").val().split("-")[1] == 1){
        for(curso of CURSOS_OTONO){
            opt = document.createElement("option");
            opt.text = curso;
            opt.value = curso;
            document.getElementById("curso-select").appendChild(opt);
        };
    } else {
        for(curso of CURSOS_PRIMAVERA){
            opt = document.createElement("option");
            opt.text = curso;
            opt.value = curso;
            document.getElementById("curso-select").appendChild(opt);
        };
    };
};

var table;
function updateTable(data) {
    if(table != null){
        table.destroy();
    };
    $("#latest-tweets-datatable > thead").empty();
    $("#latest-tweets-datatable > tfoot").empty();
    $("#latest-tweets-datatable > tbody").empty();
    $("#latest-tweets-datatable > thead").append("<tr><th>Estudiante</th><th>Pregunta</th><th>Respuesta correcta</th><th>Respuesta estudiante</th></tr>");
    $("#latest-tweets-datatable > tfoot").append("<tr><th>Estudiante</th><th>Pregunta</th><th>Respuesta correcta</th><th>Respuesta estudiante</th></tr>");
    for(let i=0; i<data.length; i++){
        $("#results-table > tbody").append(`<tr><td>${data[i]["estudiante"]}</td><td>${data[i]["pregunta"]}</td><td>${data[i]["respuesta_correcta"]}</td><td>${data[i]["respuesta_estudiante"]}</td></tr>`);
    };
    datatable = document.getElementById('results-table');
    table = new simpleDatatables.DataTable(datatable);
    $("#table-container").removeAttr("hidden");
};  