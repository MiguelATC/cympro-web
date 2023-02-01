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
    Getimg,
    ElimarImagen,
    getProducto,
    GetProductocategoria,
    GetBrouserProducto

 } from "../Firebase/FireConfig.js";

 let html  ="";
 let htmll="";
 const contenodorProductos= document.getElementById('contenedorProductos');
 const contenodorProductosP= document.getElementById('Contenedor-Producto');
 const formBuscador= document.getElementById('form-Buscador');
 const cardproducto= document.getElementById('carimg');
 
 ///  cargar de la pagina
 
 window.addEventListener('DOMContentLoaded',()=>{
  
    OnGetCategoria( async (querySnapshop)=>{
        const arralis=[];
      
        querySnapshop.forEach(  doc => {
            const category = doc.data()

            html+= "<h2>"+category.Nombre+"</h2>"+
            "<div class='slick-list' id='slick-list' >"+

            "<button class='slick-arrow slick-prev' id='button-prev' data-button='button-prev' onclick='app.processingButton(event)'> "+ 
            "<img class='img-fluid'  "+
            "src='images/simbolo-menor-que.png'  alt='team people'/>"+
            "</button>" +
            "<div class='slick-track' name='track'  id='track' >"+
            "<div class='slick-track' name='track'  id='"+category.Nombre+"'></div>"+
            "</div>"+

            "<button class='slick-arrow slick-next' id='button-next' data-button='button-next' onclick='app.processingButton(event)'><img class='img-fluid' "+
            "src='images/mayor-que-el-simbolo.png' alt='team people'/>"+
            "</button>"+

         "</div>";
         arralis.push(category.Nombre);
        
        });
        
        
        contenodorProductos.innerHTML=html;
        
        for (let i = 0; i < arralis.length; i++) {
           
            const listProduscto= await GetProductocategoria( arralis[i]);
            const contnedor =document.getElementById(arralis[i]);
            let htnl="";
            listProduscto.forEach(doc => {
                const p = doc.data();
                htnl+= "<div class='slick' id='slick'>"+
               
                "<div class=' container team-member text-center'>"+
                    "<div class='member-photo'>"+
                        "<a class='img-fluid' > ";
                        for (const key of p.Lista) {
                            htnl+= "<img class='img-fluid' src='"+key.LinkImg +"'  alt='team people'>";
                            break;
                        }
                        htnl+="</a>"+
                    "</div>"+
                    
                    "<div class='member-content'>"+
                        "<h3>"+p.Nombre+"</h3>"+
                        "<p>Precion :"+p.Precio+"</p>"+
                        "<button class='btn-Vermas' data-id="+doc.id+">ver mas</button>"+
                    "</div>"+
                "</div>"+
            "</div>";
       
            });
            contnedor.innerHTML=htnl;
        
        }
        const btnvermas =  contenodorProductos.querySelectorAll('.btn-Vermas')
        btnvermas.forEach(btn => {
        btn.addEventListener('click',async ({target:{dataset}}) => {
           console.log(dataset.id);
           let html='';
           const doc = await getIdProduct(dataset.id)
           const p=doc.data();
       
            html+=
           "<div class='container'>"+
               "<div class='grid product' id='carimg'>"+
                   "<div class='column-xs-12 column-md-7'>"+
                     "<div class='product-gallery' >"+
                       "<div class='product-image'>";
                       for (const key of p.Lista) {
                        const src=key.LinkImg;
                        html+="<img class='active'  src='"+src+"'>";
                        break;
                    }
                        

                       html+= "</div>"+
                       "<ul class='image-list'>";
                       // siclo para mostrar
                       for (const key of p.Lista) {
                        const src=key.LinkImg;
                        html+= "<li class='image-item'><img id='imgdata' src='"+src+"'></li>";
                    }
                        
                       html+= "</ul>"+
                     "</div>"+
                   "</div>"+
                   "<div class='column-xs-12 column-md-5'>"+
                     "<h1>"+p.Nombre+"</h1>"+
                     "<h2>Precio: "+p.Precio+" $</h2>"+
                     "<div class='description'>"+
                       "<p>"+p.Descripsion+"</p>"+
                       
                     "</div>"+
                     "<button class='add-to-cart'>Whatsapp</button>"+
                   "</div>"+
                 "</div>"+
           "</div>";
   
       contenodorProductosP.innerHTML=html;
       const activeImage = document.querySelector(".product-image .active");
     const productImages = document.querySelectorAll(".image-list img");
     function changeImage(e) {
        activeImage.src = e.target.src;
      }
      productImages.forEach(image => image.addEventListener("click", changeImage));
      

       const btnwhatsap=contenodorProductosP.querySelectorAll('.add-to-cart');
       btnwhatsap.forEach( btn =>{
           btn.addEventListener('click',(e)=>{
               console.log('entro botom de watsap');
           })
       }

     )


        })

        });

       

        

        for (let g = 0; g < arralis.length; g++) {
            const listProduscto= await GetProductocategoria( arralis[g]);
            const img =document.getElementById(arralis[g])

            listProduscto.forEach(doc => {
                const p = doc.data();
                for (const key of p.Lista) {
                    img.src=key.LinkImg;
                 
                    break;
                }
            })                       
        }               
    });
   
    
   

 })
// form de buscador 
const broser = formBuscador['txtBuscadorr'];

broser.addEventListener('keyup', async (e)=>{
    contenodorProductos.innerHTML="";
   console.log(e.target.value);
   if(e.target.value !=""){
   const ListaBroser= await GetBrouserProducto(e.target.value)
   let htnl="<div class='containergridP'><div id='div1'><section class='section-grid'><div class='grid-prod'>";
   ListaBroser.forEach(doc => {
                const p = doc.data();
               htnl+= "<div class='prod-grid'>";
               for (const key of p.Lista) {
                htnl+= "<img  src='"+key.LinkImg +"'  alt='kalita'>";
                break;
            }
                htnl+="<h3>"+p.Nombre+"</h3>"+    
                    "<p>Precion :"+p.Precio+" $ </p>"+
         "<button class='btn-Vermas'  data-id="+doc.id+"> Ver Mas </i></button>"+
            "</div>";
           
       
            });
            htnl+="</div></section></div></div>";
            contenodorProductosP.innerHTML=htnl;
            const contenedor = document.getElementById('div1');
            const btnvermas =  contenedor.querySelectorAll('.btn-Vermas')
        btnvermas.forEach(btn => {
        btn.addEventListener('click',async ({target:{dataset}}) => {
           console.log(dataset.id);
           let html='';
           const doc = await getIdProduct(dataset.id)
           const p=doc.data();
       
            html+=
           "<div class='container'>"+
               "<div class='grid product' id='carimg'>"+
                   "<div class='column-xs-12 column-md-7'>"+
                     "<div class='product-gallery' >"+
                       "<div class='product-image'>";
                       for (const key of p.Lista) {
                        const src=key.LinkImg;
                        html+="<img class='active'  src='"+src+"'>";
                        break;
                    }
                       html+= "</div>"+
                       "<ul class='image-list'>";
                       // siclo para mostrar
                       for (const key of p.Lista) {
                        const src=key.LinkImg;
                        html+= "<li class='image-item'><img id='imgdata' src='"+src+"'></li>";
                    }
                        
                       html+= "</ul>"+
                     "</div>"+
                   "</div>"+
                   "<div class='column-xs-12 column-md-5' >"+
                     "<h1>"+p.Nombre+"</h1>"+
                     "<h2>Precio: "+p.Precio+" $</h2>"+
                     "<div class='description'>"+
                       "<p>"+p.Descripsion+"</p>"+
                     "</div>"+
                     "<button id='whatsapBtn' class='add-to-cart'>Whatsapp</button>"+
                   "</div>"+
                 "</div>"+
           "</div>";
   
       contenodorProductosP.innerHTML=html;
       const btnwhatsap=contenodorProductosP.querySelectorAll('.add-to-cart');
       btnwhatsap.forEach( btn =>{
           btn.addEventListener('click',(e)=>{
               console.log('entro botom de watsap');
           })
       }


     )
     const activeImage = document.querySelector(".product-image .active");
     const productImages = document.querySelectorAll(".image-list img");
     function changeImage(e) {
        activeImage.src = e.target.src;
      }
      productImages.forEach(image => image.addEventListener("click", changeImage));
      


        })
        });
   }

else{
    setTimeout(() => {
        window.location.href = "catalogo.html";
      }, 1000);
}
           


})





 

 
 
