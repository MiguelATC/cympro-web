import { 
    saveProeducto,
    onGetProducto ,
    delateProducto,
    saveCategoria,
    OnGetCategoria,
    delateCategoria,
    GetEstadoSesion,
    getIdProduct,
    UpdateProducto,
    getIdCategoria,
    UpdateCategoria,
    AtualizarEstado,
    Getcategoria,
    subirimagen,
    UpdateProyecto2,
    OnGetProyecto,
    savePreyecto,
    delateProyecto,
    Updateproyecto,
    getIdproyecto,
    Getproyecto,
    Getimg,ElimarImagen,
    subirimagenProductos,
    GetidProducto,
    ElimarImagenP

 } from "../Firebase/FireConfig.js";
// formulario de Productos
const taskLIstCategori = document.getElementById('list-Categoria');
const taskLIstProductos = document.getElementById('list-Porductos');
const taskLIstProyecto = document.getElementById('list-Proyecto');

const taskFormasP = document.getElementById('Product-forms');
//OptenerLIstaCategorisSelect
const SelectCategoria = document.getElementById('SelecCategorria');
var options = document.querySelectorAll('#SelecCategorria option');


// editar datos 

let editarrEstatus=false;
let id="";

window.addEventListener('DOMContentLoaded', async () => {

    // ver si el usuario esta logueado 
    const querySnapshop = await GetEstadoSesion()
    if(querySnapshop.data().Sesion== false){
        window.location.href = "Login.html";
    }
    // inserta datos a la al selec de categorias
    OnGetCategoria((querySnapshop)=>{
        
        querySnapshop.forEach(doc => {
            const category = doc.data()
            var options =document.createElement("option");
            options.text= category.Nombre;
            SelectCategoria.add(options);
        });
        
    });

    // queri para que los datos se actualise al mometo de los datos 
    onGetProducto((querySnapshop) =>{
        let html =" ";
        querySnapshop.forEach(doc => {

            const producto=doc.data()
            html += "<div class='container mt-3'> "+
            "<h3>" + producto.Nombre +"</h3>"+
            " <button class ='btn-eliminar' data-id="+doc.id+">Eliminar</button>"
            + "<button class ='btn-editar' data-id="+doc.id+">Editar</button>"
            +"</div>"
           });

           taskLIstProductos.innerHTML=html;

           // boton de elminar Producto

        const btnEliminar =  taskLIstProductos.querySelectorAll('.btn-eliminar')
        btnEliminar.forEach(btn => {
            btn.addEventListener('click',({target:{dataset}}) => {
                delateProducto(dataset.id)
            })
                 
        });
        // boton de actualizar de producto
        const btnEdit =  taskLIstProductos.querySelectorAll('.btn-editar')
        btnEdit.forEach(btn => {
            btn.addEventListener('click',async (e)  => {
                const doc = await getIdProduct(e.target.dataset.id)
                const producto = doc.data();
                id=doc.id;
                
                taskFormasP['txtNombre'] .value=producto.Nombre
                taskFormasP['txtPrecio'] .value=producto.Precio
                taskFormasP['SelecCategorria'] .value=producto.Categoria
                taskFormasP['txtDescripcio'] .value=producto.Descripsion

                editarrEstatus=true;
            })
                 
        });
        

     


    });

  // queri para optener los datos en tipo real de Proyecto
  OnGetProyecto((querySnapshop) =>{
        let html =" ";
        querySnapshop.forEach(doc => {

            const proyecto=doc.data()
            html += "<div class='container-fluid mt-3'> "+
            "<h3>" + proyecto.Nombre +"</h3>"+ 
            "<p>" + proyecto.Descripsion +"</p>"+ 
            "<div class='row'> "+
            "<img src="+proyecto.img+"  class='mx-auto d-block' id='imgVista' data-name="+proyecto.NombreImg+" />"+
            "</div>"+
            "<button class ='btn-eliminar-Proyecto' data-id="+doc.id+">Eliminar</button>"
            + "<button class ='btn-editar' data-id="+doc.id+">Editar</button>"
            +"</div>";
            
           });
           // boton de eliminar proyecto
           taskLIstProyecto.innerHTML=html;
           const btnEliminar =  taskLIstProyecto.querySelectorAll('.btn-eliminar-Proyecto')
            btnEliminar.forEach(btn => {
            btn.addEventListener('click',async ({target:{dataset}}) => {
                const proyecto = await Getimg(dataset.id)
                ElimarImagen(proyecto.data().NombreImg)
                delateProyecto(dataset.id)
               
            })
           
        });
        // boton de actuali de proyecto
        const btnEdit =  taskLIstProyecto.querySelectorAll('.btn-editar')
        btnEdit.forEach(btn => {
            btn.addEventListener('click',async (e)  => {
                const doc = await getIdproyecto(e.target.dataset.id)
                const proyecto = doc.data();
                id=doc.id;
                nombreImg=proyecto.NombreImg
                taskFormasp.reset()
                taskFormasp['txtNombreC'].value=proyecto.Nombre
                taskFormasp['txtDescripcio'].value=proyecto.Descripsion
                taskFormasp['preview'].src=proyecto.img
               

                editarrEstatus=true;
             
                
            })
                 
        });
       

    });
  // queri para optener los datos en tipo real de categoria
    OnGetCategoria((querySnapshop) =>{
        let html =" ";
        querySnapshop.forEach(doc => {

            const categoria=doc.data()
            html += "<div> "+
            "<h4>" + categoria.Nombre +"</h4>"+ 
            " <button class ='btn-eliminar-Categoria' data-id="+doc.id+">Eliminar</button>"
            + "<button class ='btn-editar' data-id="+doc.id+">Editar</button>"
            +"</div>"
            
           });
           // boton de eliminar categori
           taskLIstCategori.innerHTML=html;
           const btnEliminar =  taskLIstCategori.querySelectorAll('.btn-eliminar-Categoria')
            btnEliminar.forEach(btn => {
            btn.addEventListener('click',({target:{dataset}}) => {
             
                delateCategoria(dataset.id)
                var options = document.querySelectorAll('#SelecCategorria option');
                options.forEach(o => o.remove());

               
            })
           
        });
        // boton de actuali de categori
        const btnEdit =  taskLIstCategori.querySelectorAll('.btn-editar')
        btnEdit.forEach(btn => {
            btn.addEventListener('click',async (e)  => {
                taskFormasp.reset()
                const doc = await getIdCategoria(e.target.dataset.id)
                const categoria = doc.data();
                id=doc.id;
                taskFormasc['txtNombreCC'].value=categoria.Nombre
                editarrEstatus=true;
             
                
            })
                 
        });
       

    });

});


// Agarrara datos del Formulario de Productos 

var contenedor = document.getElementById("contenedorImg");
const btnAddProducto=taskFormasP['btn-save-Product']
const alertp=document.getElementById("alertContainer");

const btnelimarImgnes=taskFormasP['btn-elimiar'];
const ListImg = new Map();
let contador=0;
btnelimarImgnes.addEventListener('click',(e)=>{
    e.preventDefault()
    ListImg.clear() 
    contador=0;
    contenedor.innerHTML=" ";
})

const btnFili=taskFormasP['ficheroP'];
btnAddProducto.addEventListener('click',async (e) =>{
    e.preventDefault()
    
    const nombre = taskFormasP['txtNombre'] 
    const precio = taskFormasP['txtPrecio'] 
    const categoria = taskFormasP['SelecCategorria'] 
    const descripion = taskFormasP['txtDescripcio'] 

    if(nombre.value  !== "" && precio.value > 0 ){
      
        if(editarrEstatus==true){
       
            UpdateProducto(id,{
                Categoria: categoria.value,
                Descripsion: descripion.value,
                Nombre: nombre.value,
                Precio:precio.value
    
            })
            editarrEstatus=false;
            taskFormasP.reset()
        }
        else{
            if (contador>0) {
                saveProeducto(nombre.value,precio.value,categoria.value,descripion.value)
                const p= await GetidProducto(nombre.value)
                p.forEach(doc => {
                    id = doc.id
                    });
                console.log(id);
                subirimagenProductos(ListImg,id);
                contador=0;
                contenedor.innerHTML=" ";
                taskFormasP.reset();
            } else {
                alertp.innerHTML= "<div class='alert alert-danger alert-dismissible'>"+
                "<button type='button' class='btn-close' data-bs-dismiss='alert'></button>"+
                "<strong>Alerta!</strong> No agrego imgen al producto."+
              "</div>";
            }
           
            
        }
        
    }
    else{
      
        alertp.innerHTML= "<div class='alert alert-danger alert-dismissible'>"+
                "<button type='button' class='btn-close' data-bs-dismiss='alert'></button>"+
                "<strong>Alerta!</strong> Se dejo un campo vacio "+
              "</div>";
    }
        
})





// file de productos


let imgTag="";

btnFili.addEventListener('change', async (e)=>{
    e.preventDefault();
    contador++;
var contenedor = document.getElementById("contenedorImg");
  var archivos = document.getElementById("ficheroP").files[0];
  var ImgNombre = document.getElementById("ficheroP").files[0].name;
contenedor.innerHTML='';

   if (contador ==  5) {
   
    for (let data of ListImg.keys()) {
        imgTag = document.createElement("img");
        imgTag.class="mx-auto d-block" ;
        imgTag.style="width:50%"
        imgTag.height = 200;//ESTAS LINEAS NO SON "NECESARIAS" 
        imgTag.width = 400; //ÚNICAMENTE HACEN QUE LAS IMÁGENES SE VEAN 
        imgTag.src = URL.createObjectURL (data.LinkImg);
        contenedor.appendChild(imgTag);}

   } else {
    let Image = {
        "NombreImg":ImgNombre ,
        "LinkImg": archivos
       }
       ListImg.set(Image);
    for (let data of ListImg.keys()) {
        imgTag = document.createElement("img");
        imgTag.class="mx-auto d-block" ;
        imgTag.style="width:50%"
        imgTag.height = 200;//ESTAS LINEAS NO SON "NECESARIAS" 
        imgTag.width = 400; //ÚNICAMENTE HACEN QUE LAS IMÁGENES SE VEAN 
        imgTag.src = URL.createObjectURL (data.LinkImg);
        contenedor.appendChild(imgTag);}
     
   }
  console.log(contador);

})



// Agarra Formulario de Proyecto
const taskFormasp = document.getElementById('Proyecto-forms');
const btn_Addproyecto = taskFormasp['btn-save-Proyecto'];
const btn_CanselarProyecto= taskFormasp['bn-cancelar']
const nombre = taskFormasp['txtNombreC']
const descpsion = taskFormasp['txtDescripcio']
const fileOnchacr = taskFormasp["ficheroC"];
const alertP=document.getElementById("alertContainerP");

let archivos = taskFormasp['ficheroC'];

btn_Addproyecto.addEventListener('click',async (e)=>{
    e.preventDefault()

    if(nombre.value=="" || descpsion.value==""){

        alertP.innerHTML= "<div class='alert alert-danger alert-dismissible'>"+
                "<button type='button' class='btn-close' data-bs-dismiss='alert'></button>"+
                "<strong>Alerta!</strong> Se dejo un campo vacio "+
              "</div>";
    }
    else{
    if(editarrEstatus==true){
       
        
        editarrEstatus=false;
        if(archivos.files[0]==null){
                 
            Updateproyecto(id,{
                Nombre: nombre.value,
                NombreImg:nombreImg,
                Descripsion:descpsion.value,
                img:imgContenedor.src
                
            })
            imgContenedor.src='./images/subi.png';
            taskFormasp.reset();
        }
        else{
            UpdateProyecto2(archivos.files[0],archivos.files[0].name,id,nombre.value,descpsion.value,nombreImg)
            editarrEstatus=false;
            imgContenedor.src='./images/subi.png';
            taskFormasp.reset();
          
        }
        
        
        
    }
    else{
        if (archivos.files[0]==null) {
            alertP.innerHTML= "<div class='alert alert-danger alert-dismissible'>"+
            "<button type='button' class='btn-close' data-bs-dismiss='alert'></button>"+
            "<strong>Alerta!</strong> No se agrego una imagen "+
          "</div>";
            
        } else {
            savePreyecto(nombre.value,descpsion.value);
             const c = await Getproyecto(nombre.value)
                 c.forEach(doc => {
                 id = doc.id
                     });
            var archivoss = taskFormasp['ficheroC'];
            subirimagen(archivoss.files[0],archivoss.files[0].name,id);
            imgContenedor.src = './images/subi.png';
            taskFormasp.reset()
        }
        
   

    }
    
   }


})

let nombreImg='';

var imgContenedor =taskFormasp['preview'];

fileOnchacr.addEventListener('change',(e)=>{
    e.preventDefault();
    console.log(archivos.files[0])
    imgContenedor.src = URL.createObjectURL(archivos.files[0])


})


btn_CanselarProyecto.addEventListener('click', (e)=>{
    e.preventDefault();
    editarrEstatus=false;
    imgContenedor.src='./images/subi.png';
    taskFormasp.reset();
  
})

// formulario de categoria
const taskFormasc = document.getElementById('Categoria-forms');
const  nameC= taskFormasc['txtNombreCC'];
const btnAddCategoria = taskFormasc['btn-save-Categoria'];
const alertc=document.getElementById("alertContainerC");
btnAddCategoria.addEventListener('click',(e) =>{
 
    e.preventDefault();
    var options = document.querySelectorAll('#SelecCategorria option');
    options.forEach(o => o.remove());
    if (nameC.value=="") {
        alertc.innerHTML= "<div class='alert alert-danger alert-dismissible'>"+
        "<button type='button' class='btn-close' data-bs-dismiss='alert'></button>"+
        "<strong>Alerta!</strong> No se debe dejar un campo vacio"+
      "</div>";
    } else {
        if(editarrEstatus==true){
     
            UpdateCategoria(id,{
                Nombre: nameC.value,
            })
            editarrEstatus=false;
        }
        else{
            saveCategoria(nameC.value)
        }
     taskFormasc.reset();
       
       
    }
})



// boton cerrar sesion 
const btnSerrarsecion = document.getElementById('Btn-CerrarSesion');
btnSerrarsecion.addEventListener('click',(e)=>{
  
    AtualizarEstado({Sesion : false});
    setTimeout(() => {
        window.location.href = "Login.html";
      }, 3000);
    
})





