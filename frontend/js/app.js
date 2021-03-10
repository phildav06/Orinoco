
// /* ---------- AJOUT DU NOMBRE D'ARTICLES DANS LE MENU PANIER ----------
// ***********************************************************************/

// Récupération des produits présents dans le localstorage
let cart = JSON.parse(localStorage.getItem('panier')) || [];

// // Sélection de la span dans le menu de navigation panier du HTML
const cartQuantity = document.querySelector('.badge');

function addItemsInCard(cart) {
    // Création du nombre d'articles (en tenant compte du coloris choisi)
    let qt = 0;
    for (const item of cart) {
        qt += item.quantity;
    };
    return qt;
};
// Appel de la fonction addItemsInCard
let qt = addItemsInCard(cart);

// Insertion du nombre d'articles dans le html du menu panier
cartQuantity.innerHTML = qt;

