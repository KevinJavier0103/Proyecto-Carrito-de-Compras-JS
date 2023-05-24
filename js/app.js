
const carrito  = document.querySelector("#carrito");
const listaCursos  = document.querySelector("#lista-cursos ");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const contendorCarrito = document.querySelector("#lista-carrito tbody");

let articulosCarrito = [];

cargarEventListener();


function cargarEventListener () {

    listaCursos.addEventListener("click",agregarCurso);
    carrito.addEventListener("click",eliminarCursos);

    vaciarCarrito.addEventListener("click",()=>{
        articulosCarrito=[];
        limpiarHTML();
    });

    document.addEventListener("DOMContentLoaded",()=>{
        articulosCarrito = JSON.parse(localStorage.getItem("compras"))|| [];
        carritoHTML();
    })
};

function agregarCurso(event){
    // console.log(event);
    event.preventDefault();
    if(event.target.classList.contains("agregar-carrito")){
        const informacion = event.target.parentElement.parentElement;
        leerDatos(informacion);
    }   
    
};

function leerDatos (informacion){
    
    const infoCursos = {
        imagen: informacion.querySelector("img").src,
        titulo:informacion.querySelector("h4").textContent,
        precio:informacion.querySelector(".precio span").textContent,
        id: informacion.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    

    const existe = articulosCarrito.some(curso => curso.id === infoCursos.id);

    if(existe){
        const cursos = articulosCarrito.map (curso =>{
            if (curso.id === infoCursos.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            };
        });
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito =[...articulosCarrito,infoCursos];
    } 
    
    carritoHTML();

    sincronizarLocalStorage();
};


function sincronizarLocalStorage () {
   
    localStorage.setItem("compras",JSON.stringify(articulosCarrito));
};

function carritoHTML(){
    // LLAMAR A FUCNION DE LIMPIEZA PREVIAMENTE 
    limpiarHTML();

    articulosCarrito.forEach(articulo =>{
        const{imagen,titulo,precio,id,cantidad} = articulo;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td> 
                <img  src="${imagen}" width="100" />
            </td>
            <td> ${titulo} </td>
            <td> ${precio} $</td>
            <td> ${cantidad}</td>
            <td>
                <a href="#" class = "borrar-curso" data-id="${id}" >X</a>
            </td>
        `;

        contendorCarrito.appendChild(row)
    });    
}

function limpiarHTML (){
    while(contendorCarrito.firstChild){
        contendorCarrito.removeChild(contendorCarrito.firstChild);
    }
}

function eliminarCursos (event){
   
    if(event.target.classList.contains("borrar-curso")){
        const containerCurso = event.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(clase => clase.id !== containerCurso);
    };

    carritoHTML();
    
}