import { GetUserAten,
    GetEstadoSesion,
    AtualizarEstado
} from "../Firebase/FireConfig.js";
const FormLogin = document.getElementById('Forms-login');
window.addEventListener('DOMContentLoaded',async ()=>{
   
    const querySnapshop = await GetEstadoSesion()
    if(querySnapshop.data().Sesion== true){
        window.location.href = "NewProductos.html";
    }
        
});

 
// agarrar datos del usuario 
FormLogin.addEventListener('submit',   async (e)=>{
    e.preventDefault();
    var Estado = false;
    const user = FormLogin['username'];
    const pass = FormLogin['password'];  
    if(user.value =="" || pass.value==""){
        window.alert("Se olvido llenar un campo")
    }
    else{
        const querySnapshop = await GetUserAten(user.value,pass.value)
        querySnapshop.forEach(() => {
         Estado = true;
         });
        if(Estado== true)
        {
          AtualizarEstado({Sesion : true});
     
         setTimeout(() => {
            window.location.href = "NewProductos.html";
                     }, 2000);
  
        }
        else{
            window.alert("El usuario con la contraseña no coinsiden")
        }
    }
 


})
