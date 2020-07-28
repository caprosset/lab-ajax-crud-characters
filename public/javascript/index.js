// Instanciar la clase APIHandler para usar sus métodos 
const charactersAPI = new APIHandler('http://localhost:8000');

// Acceder al primer contenedor de la página (index.html) que modificaremos para mostrar el o los personajes
const charactersContainer = document.getElementsByClassName("characters-container")[0];


window.addEventListener('load', () => {

  // ITERACIÓN 3 - Fetch all characters
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    
    charactersAPI.getFullList() // devuelve una promesa
    .then( (charactersArray) => {
      // Reiniciar el contenedor charactersContainer (vaciándolo)
      charactersContainer.innerHTML = "";

      // Para cada objeto personaje, crear una "card" dentro de charactersContainer
      charactersArray.forEach(characterObj => {
        charactersContainer.innerHTML += `
        <div class="character-info">
          <div class="name">${characterObj.name}</div>
          <div class="occupation">${characterObj.occupation}</div>
          <div class="cartoon">Is a cartoon? ${characterObj.cartoon}</div>
          <div class="weapon">${characterObj.weapon}</div>
        </div>
        `
      }) 
    })
    .catch( (err) => console.log(err));
  })


  // ITERACIÓN 3 - Fetch one character
  document.getElementById('fetch-one').addEventListener('click', function (event) {
    // Recuperar el id del personaje que queremos mostrar 
    let characterId = document.getElementsByName("character-id")[0].value;

    // Llamar al método getOneRegister() de la API, especificando el id del personaje
    charactersAPI.getOneRegister(characterId) // devuelve una promesa
    .then( (characterObj) => {
      // Reiniciar el contenedor charactersContainer (vaciándolo)
      charactersContainer.innerHTML = "";

      // Crear una "card" dentro de charactersContainer con la información del personaje
      charactersContainer.innerHTML = `
        <div class="character-info">
          <div class="name">${characterObj.name}</div>
          <div class="occupation">${characterObj.occupation}</div>
          <div class="cartoon">Is a cartoon? ${characterObj.cartoon}</div>
          <div class="weapon">${characterObj.weapon}</div>
        </div>
      `

      // vaciar el campo de búsqueda
      document.getElementsByName("character-id")[0].value = "";
    })
    .catch( (err) => console.log(err));
  });


  // ITERACIÓN 3 - Delete one character
  document.getElementById('delete-one').addEventListener('click', function (event) {
    // Recuperar el id del personaje que queremos eliminar 
    const characterId = document.getElementsByName("character-id-delete")[0].value;
    
    // Llamar al método getOneRegister() de la API, especificando el id del personaje
    charactersAPI.deleteOneRegister(characterId) // devuelve una promesa
    .then( () => {
      // Cambiar el color de fondo del botón a verde para indicar que se ha eliminado correctamente
      document.getElementById('delete-one').style.backgroundColor = "green";
    })
    .catch( (err) => {
      console.log(err);
      // Cambiar el color de fondo del botón a rojo para indicar que se ha producido un error
      document.getElementById('delete-one').style.backgroundColor = "red";
    });
  });


  // ITERACIÓN 3 - Edit a character
  document.getElementById('edit-character-form').addEventListener('submit', function (event)  {
    // Prevenir el refresh automático de la página después del submit
    event.preventDefault();
    
    // Recuperar la información del formulario
    const id = event.target["chr-id"].value;
    let name = event.target.name.value;
    let occupation = event.target.occupation.value;
    let weapon = event.target.weapon.value;
    let cartoon = event.target.cartoon.checked;

    // crear un objeto characterToUpdate con los datos del formulario
    const characterToUpdate = {
      name,
      occupation, 
      weapon,
      cartoon
    }

    // BONUS - comprobar que ningun input text esté vacío antes de enviar el formulario, sino mostrar mensaje de error
    if (name === "" || occupation === "" || weapon === "") {
      // crear un mensaje de error y añadirlo al DOM por unos 3 segundos 
      const errorMsg = document.createElement('p');
      errorMsg.textContent = "One or several fields are empty. Please try again.";
      document.getElementById('edit-character-form').append(errorMsg);
      setTimeout(() => { errorMsg.textContent =  "" }, 3000);
    } 
    else {
      // Editar el personaje llamando al método updateOneRegister() de la API
      charactersAPI.updateOneRegister(id, characterToUpdate)  // devuelve una promesa
      .then( () => {
        // Cambiar el color de fondo del botón a verde para indicar que se ha creado correctamente
        document.querySelector('#edit-character-form button').style.backgroundColor = "green";

        // Vacíar el formulario una vez que los datos se enviaron correctamente
        name = "";
        occupation = "";
        weapon = "";
        cartoon = false; 
      })
      .catch( (err) => {
        console.log(err);
        // Cambiar el color de fondo del botón a rojo para indicar que se ha producido un error
        document.querySelector('#edit-character-form button').style.backgroundColor = "red";
      });
    }
  });


  // ITERACIÓN 3 - Create new character
  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    // Prevenir el refresh automático de la página después del submit
    event.preventDefault();

    // Recuperar la información del formulario
    let name = event.target.name.value;
    let occupation = event.target.occupation.value;
    let weapon = event.target.weapon.value;
    let cartoon = event.target.cartoon.checked;

    // Crear un objeto newCharacter con los datos entrados por el usuario en el formulario
    const newCharacter = {
      name, 
      occupation, 
      weapon, 
      cartoon
    }

    // Crear el personaje llamando al método createOneRegister() de la API
    charactersAPI.createOneRegister(newCharacter)  // devuelve una promesa
    .then( () => {
      // Cambiar el color de fondo del botón a verde para indicar que se ha creado correctamente
      document.querySelector('#new-character-form button').style.backgroundColor = "green";

      // Vacíar el formulario
      name = "";
      occupation = "";
      weapon = "";
      cartoon = false;
    })
    .catch( (err) => {
      console.log(err);
      // Cambiar el color de fondo del botón a rojo para indicar que se ha producido un error
      document.querySelector('#new-character-form button').style.backgroundColor = "red";
    });
  });
});