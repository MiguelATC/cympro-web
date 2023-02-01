import { 
    OnGetProyecto
  
 } from "../Firebase/FireConfig.js";
 const ListProyectos = document.getElementById('contenedorCategorias');
 window.addEventListener('DOMContentLoaded',async ()=>{
    OnGetProyecto((querySnapshop) =>{
        let html ="";
        querySnapshop.forEach(doc => {

            const proyecto=doc.data();
            console.log(proyecto);
            html += "<div class='col-lg-6 col-sm-6'>"+
           "<div class='team-member text-center' id='card'>" +
                "<div class='member-photo'>" +
                    "<img class='img-fluid' src="+ proyecto.img+" alt='Muebles'>"+
                "</div>"+
                "<div class='member-content'>"+
                    "<h3>"+proyecto.Nombre+"</h3>"+
                    "<p>"+proyecto.Descripsion+"</p>"+ //arerelgar
                "</div>"+
            "</div>" +
        "</div>"
           });
           ListProyectos.innerHTML=html;
          


    });


 });