let cart = document.querySelector('#cart');
function desplegar(){
    if(cart.classList.contains('active-cart')){
        cart.classList.remove('active-cart');
        cart.classList.add('notactive');
    }else{
        cart.classList.remove('notactive');
        cart.classList.add('active-cart');
    }
}
