/* ---------- RÉCUPÉRATION DE L'ARTICLE AVEC AJAX ----------
************************************************************/
// Récupération de l'ID de l'article choisi dans la page index.html
const params = (new URL(document.location)).searchParams;
const id = params.get('id');
let teddy = null;

// Récupérer ce qu'il ya dans le panier
let products = JSON.parse(localStorage.getItem('panier')) || [];

// Récupération de l'article sélectionné en page index
function teddySelected() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            teddy = JSON.parse(this.responseText);

            // Récupération de l'ID "description" dans la partie "article" de la page produit.html
            const target = document.getElementById('description');

            // Choix de la couleur du teddy (nulle au départ)
            let options = "";
            for (const color of teddy.colors) {
                options += `<option value="${color}">${color}</option>`
            }

            // Mise en forme de l'article récupéré
            const article =
                `<div class="card col-md-4 mx-md-4 mb-5 p-0 Small shadow bg-dark">
                <img class="card-img-top" src="${teddy.imageUrl}" alt="Teddy">
                <div class="card-body">
                    <p class="card-text text-white font-weight-light small id-of-teddy"><em>Réf. ${teddy._id}</em></p>
                    <h3 class="card-title h5 text-white">${teddy.name}</h3>
                    <p class="text-white mb-5 describ">Description :</br><em>${teddy.description}</em></p>
                    <p class="text-white mb-4 ">Choisissez sa couleur. . . <select class="option-colors form-select-sm ml-md-3 col-6 col-md-5 rounded" aria-label="bouton sélection">${options}</select></p>
                    <div class="row justify-content-center">
                        <p class="card-text text-color mb-3 teddy-price"><strong>${(teddy.price / 100).toFixed(2)} €</strong></p>
                    </div>
                    <div class="row justify-content-center">
                        <button class="btn btn-light col-9" data-toggle="modal" data-target="#staticBackdrop" aria-labelledby="staticBackdropLabel">Ajoutez ${teddy.name} au panier !</button>
                    </div>
                </div>
            </div>`

            // ajout automatique de l'article sur la page HTML
            target.innerHTML += article;

            // Sélection du bouton pour sauvegarder dans le localStorage
            const addButton = document.querySelector('.btn-light');

            // Ecoute de l'évènement du bouton "Ajoutez au panier"
            addButton.addEventListener('click', addToCart);
        }
    };

    // Envoi le la requette au serveur
    request.open("GET", "http://localhost:3000/api/teddies/" + id);
    request.send();
};
// Appel de la fonction
teddySelected();


/* ---------- AJOUT DES ARTICLES DANS LE LOCALSTORAGE ----------
*******************************************************************/
const addToCart = () => {
    // Sélection de la classe << option-color >> du HTML
    const optionColors = document.querySelector('.option-colors');

    // Vérifier si un produit avec cet id et cette couleur est déjà dans le panier
    const product = products.find(product => product.id == teddy._id && product.color == optionColors.value);

    // Si le panier est vide on ajoute le produit
    if (product === undefined) {
        const ligne = {
            name: teddy.name,
            id: teddy._id,
            color: optionColors.value,
            price: teddy.price,
            quantity: 1,
        }
        products.push(ligne);
    } else {
        // Si le panier contient déjà des produits, on y ajoute un produit supplémentaire
        product.quantity++
    };

    // Envoie des produits au localStorage
    localStorage.setItem("panier", JSON.stringify(products));
};
