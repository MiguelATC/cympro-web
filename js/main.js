function App() { }

window.onload = function (event) {
    var app = new App();
    window.app = app;
};




App.prototype.processingButton = function (event) {
    const btn = event.currentTarget;
    const slickList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const slick = track.querySelectorAll('.slick');

    const slickWidth = slick[0].offsetWidth;

    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    btn.dataset.button == "button-prev" ? prevAction(leftPosition, slickWidth, track) : nextAction(leftPosition, trackWidth, listWidth, slickWidth, track)
}

let prevAction = (leftPosition, slickWidth, track) => {
    if (leftPosition > 0) {
        console.log("entro 2")
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

let nextAction = (leftPosition, trackWidth, listWidth, slickWidth, track) => {
    if (leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }

   
}

 /*Modo claro*/
 const btnSwitch = document.querySelector('#switch');
 const contenedor = document.querySelector('#contenedorProductos');
 const contenedorP = document.querySelector('#Contenedor-Producto');
 const card = document.querySelectorAll('#card');
 const section = document.querySelectorAll('#section-white');


 btnSwitch.addEventListener('click', (e) => {
   
     btnSwitch.classList.toggle('active');
     // Guardamos el modo en localstorage.
     if (!document.body.classList.contains('white')) {
         localStorage.setItem('dark-mode', 'true');
     } else {
         localStorage.setItem('dark-mode', 'false');
         
     }
     window.location.href = "index.html";
 });

 // Obtenemos el modo actual.
 if (localStorage.getItem('dark-mode') === 'true') {
     document.body.classList.add('white');
     btnSwitch.classList.add('active');
     card.forEach(function (element) {
         element.classList.add('box-shadow-card')
     });
     

     section.forEach(function (elemento) {
         elemento.classList.add('white');
     });
     contenedor.style = "background-color: white;"
     contenedorP.style = "background-color: white;"
 } else {
     document.body.classList.remove('white');
     btnSwitch.classList.remove('active');
 }