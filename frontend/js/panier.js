/* ---------- RÉCUPÉRATION DES PRODUITS ET CRÉATION DU PANIER ----------
************************************************************************/

// Récupération des produits présents dans le localstorage
let products = JSON.parse(localStorage.getItem('panier')) || [];

// Sélection des'ID panier, vide et plein du HTML
const tableauProducts = document.querySelector('#panier');
const vide = document.querySelector('#vide');
const plein = document.querySelector('#plein');
if (products.length === 0) {
    // Si le panier est vide, afficher le texte << Celui-ci est tristement vide ! >>
    vide.style.display = 'block';
    plein.style.display = 'none';
} else {
    // Si le panier est plein, afficher le texte << Houra! Il se remplit... >>
    vide.style.display = 'none';
    plein.style.display = 'block';
};

// Création des lignes du panier
for (const item in products) {
    const ligne = products[item];
    tableauProducts.innerHTML +=
        `<tr>
        <td class="align-middle text-center" scope="col"><strong>${ligne.name}</strong> </br><em>Réf. ${ligne.id}</em></td>
        <td class="align-middle text-center" scope="col">${ligne.color}</td>
        <td class="align-middle text-center" scope="col" id="price-of-teddy">${(ligne.price / 100).toFixed(2)} €</td>
        <td class="align-middle text-center" scope="col" id="quantity-of-teddies"><span id="nbr">${ligne.quantity}</span></td>
        <td class="align-middle text-center" scope="col" id="total-price-of-teddies">${((ligne.price * ligne.quantity) / 100).toFixed(2)} €</td>
        <td class="align-middle text-center"><button class="btn fas fa-trash fa-1x text-danger" data-index="${item}"></button></td>
    </tr>`
};


/* ---------- CALCUL DU MONTANT TOTAL ----------
************************************************/

// Sélection de l'ID total-price' dans la page panier.html (Prix total)
const productsPrice = document.querySelector('#total-price');

// Calcul du montant total à payer
const calculTotal = (products) => {
    let totalPrice = 0;
    for (const ligne of products) {
        totalPrice += ligne.price * ligne.quantity;
    };
    return totalPrice;
};
let totalPrice = calculTotal(products);

// Insertion du montant total dans le HTML
productsPrice.innerHTML = `${(totalPrice / 100).toFixed(2) + ' €'}`;


/* ---------- SUPPRIMER DES PRODUITS ----------
********************************************************/
// Récupération du bouton supprimer
let btnRemoveProducts = document.getElementsByClassName('fa-trash');

for (const btn of btnRemoveProducts) {
    // Ecoute du bouton supprimer
    btn.addEventListener('click', function (e) {

        // Récupération de l'attribut << data-id >> du HTML
        const id = e.target.getAttribute("data-id");

        // Récupération de l'attribut << data-index >> du HTML
        const index = e.target.getAttribute("data-index");

        // Suppression des produits
        products.splice(index, 1);
        localStorage.setItem("panier", JSON.stringify(products));

        // Message d'arlerte indiquant que l'article sélectionné à été supprimer
        alert('Cet article a bien été supprimé de votre panier !');

        // Rafraichissement la page HTML
        window.location.href = "panier.html";
    });
};


/* ---------- VALIDATION DU FORMULAIRE ----------
*************************************************/
// Sélection du formulaire
let contact = document.querySelector('.needs-validation');

// Ecoute de la modification du prénom
contact.firstname.addEventListener('input', function () {
    validForm(this);
});

// Ecoute de la modification du nom
contact.lastname.addEventListener('input', function () {
    validForm(this);
});

// Ecoute de la modification de l'adresse postale
contact.postaladdress.addEventListener('input', function () {
    validForm(this);
});

// Ecoute de la modification du code postal
contact.zipcode.addEventListener('input', function () {
    validForm(this);
});

// Ecoute de la modification de la ville
contact.city.addEventListener('input', function () {
    validForm(this);
});

// Ecoute de la modification de l'E-mail
contact.email.addEventListener('input', function () {
    validForm(this);
});

// On pourrait également utiliser ckeckValidity
const validForm = function (inputForm) {

    // Création de la regExp pour validation
    let regExp = inputForm.getAttribute('data-regexp');
    let formRegExp = new RegExp(regExp, 'g');
    let testForm = formRegExp.test(inputForm.value);
    let small = inputForm.nextElementSibling;
    let label = inputForm.getAttribute('data-label');

    if (testForm) {
        // Si les champs sont bien remplis, affiche << OK ! >> 
        small.innerHTML = `<p class="text-success mt-1">Ok !</p>`;
    } else {
        // Si les champs ne sont pas bien remplis, affiche << Veuillez entrer le champ valide ! >>
        small.innerHTML = `<p class="text-danger font-weight-bold mt-1">Veuillez entrer ${label} valide !</p>`;
    }
};

/* ---------- ENVOYER LA COMMANDE AU SERVEUR ----------
************************************************************/

// ENVOI DU FORMULAIRE PAR UNE REQUETE DE TYPE POST
sendData = (orderRequest) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status >= 200 && this.status < 400) {

                // Sauvegarde du retour serveur (API) dans la sessionStorage
                sessionStorage.setItem('order', this.responseText);
                sessionStorage.setItem('total', `${(totalPrice / 100).toFixed(2) + ' €'}`);

                // Chargement vers la page de confirmation de commande
                window.location.href = "commande.html"
                resolve(JSON.parse(this.responseText));
            } else {
                reject(request.status);
            };
        };
        // Envoi de la requette au serveur
        request.open('POST', 'http://localhost:3000/api/teddies/order');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(orderRequest);
    });
};

// Envoyer le formulaire en cliquant sur le bouton << Commander >>
const btnOrder = document.getElementById('post-form');

btnOrder.addEventListener('submit', (e) => {
    e.preventDefault();
    if (products || []) {
        console.log('On peut commander !');
        // initialisation des données du formulaire à transmettre
        let contactData = {
            firstName: contact.firstname.value,
            lastName: contact.lastname.value,
            address: contact.postaladdress.value,
            zipCode: contact.zipcode,
            city: contact.city.value,
            email: contact.email.value
        };
        // initialisation des données du tableau à transmettre
        let productsData = [];
        for (const product of products) {
            productsData.push(product.id)
        }
        // création de l'objet à envoyer
        let object = {
            contact: contactData,
            products: productsData,
        };

        // Mise de l'objet au format JSON
        let ObjectRequest = JSON.stringify(object);

        // Lancement de la fonction pour envoyer l'objet
        sendData(ObjectRequest);

        // Remise à zéro (à l'état initial) du contenu de l'objet dans le localStorage
        contact = {};
        products = [];

        localStorage.clear();
    } else {
        console.log("Erreur technique ! Contactez l'administrateur système.");
    };
});
