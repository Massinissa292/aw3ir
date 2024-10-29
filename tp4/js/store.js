var contactStore = (function () {
    // Variable privée pour stocker les contacts
    let contactListString = localStorage.getItem("contactList");
    var contactList = contactListString ? JSON.parse(contactListString) : [];

    return {
        add: function (_name, _firstname, _date, _address, _mail) {
            var contact = {
                name: _name,
                firstname: _firstname,
                date: _date,
                address: _address,
                mail: _mail,
            };
            // Ajout du contact à la liste
            contactList.push(contact);

            // Persistance de la liste dans localStorage
            localStorage.setItem("contactList", JSON.stringify(contactList));
            return contactList;
        },
        reset: function () {
            localStorage.removeItem("contactList");
            contactList = []; // Réinitialiser la liste locale
            return contactList;
        },
        getList: function () {
            return contactList;
        },
    };
})();









// Utilisez DOMContentLoaded pour s'assurer que le DOM est chargé avant d'ajouter des écouteurs d'événements
document.addEventListener("DOMContentLoaded", function () {
    // Assurez-vous que le bouton est présent dans le DOM
    const addContactBtn = document.getElementById("addContactBtn");
    const resetContactBtn= document.getElementById("resetContactBtn");
    
    if (addContactBtn) {
        addContactBtn.addEventListener("click", function (e) {
            e.preventDefault(); // Empêche la soumission du formulaire

            // Récupérez les valeurs des champs d'entrée
            const name = document.getElementById("inputName")?.value || '';
            const firstname = document.getElementById("inputFirstname")?.value || ''; // Ajout du prénom
            const date = document.getElementById("birthday")?.value || ''; // Date de naissance
            const address = document.getElementById("inputAddress")?.value || ''; // Adresse
            const mail = document.getElementById("inputEmail4")?.value || ''; // Email

            // Vérifiez que tous les champs sont remplis
            if (!name || !firstname || !date || !address || !mail) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            // Ajoutez le contact à la liste
            contactStore.add(name, firstname, date, address, mail);

            // Réinitialisez les champs
            document.getElementById("inputName").value = '';
            document.getElementById("inputFirstname").value = ''; // Assurez-vous d'avoir un champ pour le prénom
            document.getElementById("birthday").value = ''; // Réinitialiser la date de naissance
            document.getElementById("inputAddress").value = ''; // Réinitialiser l'adresse
            document.getElementById("inputEmail4").value = ''; // Réinitialiser l'email

            // Réaffichez la liste
            displayContactList();
        });
    }
    
      if (resetContactBtn) {
        resetContactBtn.addEventListener("click", function (e) {
            e.preventDefault(); // Empêche la soumission du formulaire

            // Réinitialiser la liste des contacts
            contactStore.reset();

            // Mettre à jour l'affichage de la liste
            displayContactList();
        });
    }


    

    // Fonction pour afficher la liste des contacts
    function displayContactList() {
        const contactList = contactStore.getList();
        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = ""; // Vider le tableau avant d'afficher les contacts
        if (contactList.length === 0) {
            tbody.innerHTML = "<tr><td colspan='5'>Aucun contact disponible.</td></tr>";
            return;
        }
        else{
        for (const contact of contactList) {
            tbody.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.firstname}</td>
                <td>${contact.date}</td>
                <td>${contact.address}</td>
                <td>${contact.mail}</td>
            </tr>`;
        }}
    }
    

    // Initialisation de l'affichage lors du chargement de la page
    displayContactList();
});

