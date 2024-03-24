// scriptResultados.js (en la página "resultados.html")
document.addEventListener("DOMContentLoaded", function() {
    try {
        
    
    const tablaResultados = document.getElementById("tablaResultados");
      // Obtener los envíos almacenados en el almacenamiento local
    const envios = JSON.parse(localStorage.getItem("envios"));
     // Recorrer los envíos y agregar filas a la tabla
    envios.forEach((envio) => {

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <th scope="row">${envio.id}</th>
            <td>${envio.nombre}</td>
            <td>${envio.apellidos}</td>
            <td>${envio.numeroFinal}</td>
            <td>${envio.correo}</td>
            <td>${envio.edad}</td>
            <td>${envio.fechaNacimiento}</td>
        `;
        tablaResultados.appendChild(fila);
    });
} catch (error) {
        console.log("No hay elementos en memoria");
}
});

function borrarDatos(){

    localStorage.clear();
    document.location.reload();
}