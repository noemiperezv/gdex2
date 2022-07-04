/* COMENTADO
//Desplegar div
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
  }
}

//menu side bar
function openNav() {
  document.getElementById("mySidenav").style.width = "18%";
  document.getElementById("contenido").style.width = "82%";
  
  document.getElementsByClassName('btn-flotante')[0].style.display = 'none';
  
  
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("contenido").style.width = "100%";
  document.getElementsByClassName('btn-flotante')[0].style.display = 'block';
}

//Comentarios

//Modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

btn.onclick = function() {
  modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
var btnModalCancelar = document.getElementsByClassName("btnCerrarModal")[0];

btnModalCancelar.onclick = function() {
  modal.style.display = "none";
   document.getElementsByClassName("modalComentario")[0].value="";

}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
*/