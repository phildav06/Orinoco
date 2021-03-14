/* ---------- RÉCUPÉRATION DU TABLEAU, DU FORMULAIRE ET CRÉATION DE LA COMMANDE ----------
******************************************************************************************/

// Récupération de l'ID << confirm-order >> de la page commande.html
const confirmOrder = document.getElementById('confirm-order');

// Récupération de l'item << order >> dans la sessionStorage et mise au bon format JSON
const local = JSON.parse(sessionStorage.getItem("order")) || [];

// Récupération de l'item << total >> dans la sessionStorage
const total = sessionStorage.getItem("total") || 0;

// Création et insertion du contenu HTML
const createOrder = () => {
    if (local != null)
        confirmOrder.innerHTML = `
            <h2 class="text-center text-success h5">Votre achat a bien été validé.<br><br></h2>
            <p>Commande n° : <span id="order-number" class="h6">${local.orderId}</span><br></p>
    
            <p class="text-left mt-4">Montant de la transaction : <span class="h6" id="total">${total}</span><br><br></p>
    
            <h3 class="h6 text-left"><u>Adresse de livraison</u> :</h3>
            
            <p class="text-left">
                
                ${local.contact.lastName} ${local.contact.firstName}<br><br>
                
                ${local.contact.address}<br>
                ${local.contact.city}<br><br>
                <em><u>Votre adresse email</u> : ${local.contact.email}</em>     
            </p><br>
    
            <h3 class="text-center mb-5 h5"><strong>Merci d'avoir commandé sur Orinoco.</strong></h3>
    
            <div class="d-flex justify-content-center">
                <a href="index.html" class="btn btn-dark mb-5">Revenir à l'accueil</a>
            </div>`
    
    // Remise à zéro (à l'état initial) du contenu de l'objet dans la sessionStorage
    contact = {};
    products = [];
    
    sessionStorage.clear();
};
createOrder();