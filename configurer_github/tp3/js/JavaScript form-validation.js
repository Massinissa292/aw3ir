window.onload = function () {
  console.log("DOM ready!");

  // Fonction pour valider l'email
  function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  // Fonction pour valider la date de naissance (elle doit être dans le passé)
  function validateDateDeNaissance(birthday) {
      const birthdayDate = new Date(birthday);
      const nowTimestamp = Date.now();
      const birthdayTimestamp = birthdayDate.getTime();

      return birthdayTimestamp < nowTimestamp;
  }

  // Fonction pour afficher la modale avec un message spécifique
  function showModal(name, message, mapUrl) {
      const modalTitle = document.querySelector('.modal-title'); // Sélectionne l'élément titre de la modal
      const modalBody = document.querySelector('.modal-body');

      // Met à jour le titre de la modal avec le nom
      modalTitle.innerText = `Bienvenue ${name}`; 
      // Met à jour le corps de la modal
      modalBody.innerHTML = message + `<br><img src="${mapUrl}" alt="map" class="img-fluid">`;

      var myModal = new bootstrap.Modal(document.getElementById("myModal"));
      myModal.show();
  }

  // Écouteur d'événement pour la soumission du formulaire
  const form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
      e.preventDefault(); // Empêche la soumission immédiate du formulaire

      const name = document.getElementById("inputName").value;
      const email = document.getElementById("inputEmail4").value;
      const birthday = document.getElementById("birthday").value;
      const address = document.getElementById("inputAddress").value;

      // Valider l'email
      if (!validateEmail(email)) {
          showModal("Invité", "Email invalide !"); // Passer un nom par défaut
          return;
      }

      // Valider la date de naissance (elle doit être dans le passé)
      if (!validateDateDeNaissance(birthday)) {
          showModal("Invité", "La date de naissance ne peut pas être dans le futur !"); // Passer un nom par défaut
          return;
      }

      // Si toutes les validations sont OK, on affiche la modale avec les infos
      const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=${encodeURIComponent(address)}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

      const modalMessage = `Vous êtes né(e) le ${birthday} et vous habitez :<br>${address}`;
      
      // Appel à la fonction showModal avec le nom et le message
      showModal(name, modalMessage, mapUrl);
  });
};
