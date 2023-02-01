// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
   getFirestore,
   collection,
   addDoc,
   getDocs,
   getDoc,
   onSnapshot,
   deleteDoc,
   doc,
   query,
   where,
   updateDoc
    } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
  import { 
    getStorage, ref as sRef,uploadBytesResumable ,getDownloadURL ,deleteObject 
   } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASn_dVH1-71sFZ0fU9yBmTIOnBGC4mQqk",
  authDomain: "muebleria-81761.firebaseapp.com",
  projectId: "muebleria-81761",
  storageBucket: "muebleria-81761.appspot.com",
  messagingSenderId: "1000217690495",
  appId: "1:1000217690495:web:a062d3996b23b522bf9a4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const dbstorage = getStorage();


// creando una CRUD producto
export const saveProeducto = (nombre,precio,categoria,descripsion)=>{
  addDoc(collection(db,'Producto'),{
    Nombre:nombre,
    Precio:precio,
    Categoria :categoria,
    Descripsion : descripsion
  });
}
// optner el producto
export const getProducto = () => getDocs(collection(db,'Producto'))
//totod producto con su categoria 
export const GetProductocategoria = (n) =>getDocs(query(collection(db,'Producto'),where("Categoria","==",n)));


// optener el producto en tiempo real 

export const onGetProducto = (callback) => onSnapshot(collection(db,'Producto'), callback)
 // elimiar el  un Producto 
export const delateProducto = id =>deleteDoc(doc(db,'Producto',id))

//Actualizar Producto

  // optener el producto segun su iD
export const getIdProduct = (id)=>getDoc(doc(db,"Producto",id));

// actualiazr  el producto 


export const UpdateProducto =(id,newFilds) => 
    updateDoc(doc(db,"Producto",id),newFilds)

export const GetidProducto = (name) =>getDocs(query(collection(db,'Producto'),where("Nombre","==",name)));
// buscador 
export const GetBrouserProducto = (name) =>getDocs(query(collection(db,'Producto'),where("Nombre","<=",name)));


//CRUD para categoria
export const saveCategoria = (nombre) =>{
  addDoc(collection(db,'Categoria'),{
    Nombre:nombre
  });
}
export const OnGetCategoria = (callback) => onSnapshot(collection(db,'Categoria'), callback)
export const delateCategoria = id =>deleteDoc(doc(db,'Categoria',id))

export const UpdateCategoria =(id,newFilds) => 
    updateDoc(doc(db,"Categoria",id),newFilds)

export const getIdCategoria = (id)=>getDoc(doc(db,"Categoria",id));
export const Getcategoria = (name) =>getDocs(query(collection(db,'Categoria'),where("Nombre","==",name)));


//CRUD para Proyectos  

export const savePreyecto = (nombre,descripsion) =>{
  addDoc(collection(db,'Proyecto'),{
    Nombre:nombre,
    Descripsion: descripsion
  });
}
export const Getimg = (id) =>getDoc(doc(db,'Proyecto',id));
export const OnGetProyecto = (callback) => onSnapshot(collection(db,'Proyecto'), callback)

export const delateProyecto = id =>deleteDoc(doc(db,'Proyecto',id))

export const Updateproyecto =(id,newFilds) => 
    updateDoc(doc(db,"Proyecto",id),newFilds)

export const getIdproyecto = (id)=>getDoc(doc(db,"Proyecto",id));
export const Getproyecto = (name) =>getDocs(query(collection(db,'Proyecto'),where("Nombre","==",name)));


// Consulta  de usuario para autentificarse 


export const GetUserAten = (username,password) =>getDocs(query(collection(db,'Usuario'),where("User","==",username),where("Pasword","==",password)));

export const GetEstadoSesion = () =>getDoc(doc(db,'Usuario','pgJ9nLgXIAZeCm39hfdk'));

export const AtualizarEstado =(estado) => updateDoc(doc(db,'Usuario','pgJ9nLgXIAZeCm39hfdk'),estado)

/// subir imgen
export function subirimagen (img,name,id){
  const metaData = {
    contentType:img.type
  }


  
 const storageRef =sRef(dbstorage,"Proyectos/"+name);
 const uploadTasck = uploadBytesResumable(storageRef,img,metaData);
 uploadTasck.on('state-changed',(snapshot)=>{
  var progres=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
  console.log('update '+progres+'%');

 }, 
 (error)=>{
  alert("error: imagen no uploatd")
 },
 ()=>{
  getDownloadURL(uploadTasck.snapshot.ref).then((downloadURL)=>{
    console.log(downloadURL);
    updateDoc(doc(db,"Proyecto",id),{
      NombreImg:name,
      img:downloadURL})
  })
 }
 );

}


export function UpdateProyecto2 (img,nameimg,id,name,descripsion,nameimgAntiguo){
  const metaData = {
    contentType:img.type
  }
  const desertRef = sRef(dbstorage, "Proyectos/"+nameimgAntiguo);
  deleteObject(desertRef);
  
 const storageRef =sRef(dbstorage,"Proyectos/"+nameimg);
 const uploadTasck = uploadBytesResumable(storageRef,img,metaData);
 uploadTasck.on('state-changed',(snapshot)=>{
  var progres=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
  console.log('update '+progres+'%');
 }, 
 (error)=>{
  alert("error: imagen no uploatd")
 },
 ()=>{
  getDownloadURL(uploadTasck.snapshot.ref).then((downloadURL)=>{
    console.log(downloadURL);
    updateDoc(doc(db,"Proyecto",id),{
      Nombre:name,
      NombreImg:nameimg,
      Descripsion:descripsion,
      img:downloadURL
    })
  })
 }
 );

}

// para elimar  dirrecto 

export const ElimarImagen =(name)=> deleteObject(sRef(dbstorage, "Proyectos/"+name));
export const ElimarImagenP =(name)=> deleteObject(sRef(dbstorage, "Productos/"+name));


// subir imgenes a Productos


export function subirimagenProductos (dataImg,id){
  const ListImg = [];
  for (let data of dataImg.keys()){
    var img=data.LinkImg;
    var name=data.NombreImg;
    const metaData = {
      contentType:img.type
    }
    const storageRef =sRef(dbstorage,"Productos/"+name);
    const uploadTasck = uploadBytesResumable(storageRef,img,metaData);
    uploadTasck.on('state-changed',(snapshot)=>{
     var progres=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
     console.log('update '+progres+'%');
    }, 
    (error)=>{
     alert("error: imagen no uploatd")
    },
    ()=>{
     getDownloadURL(uploadTasck.snapshot.ref).then((downloadURL)=>{
       console.log(downloadURL);
       let Image = {
        "NombreImg":name ,
        "LinkImg": downloadURL
       }
       ListImg.push(Image);
       console.log(ListImg);
       updateDoc(doc(db,"Producto",id),{Lista:ListImg})
      
     })
    }
    );
   
  }




}

 