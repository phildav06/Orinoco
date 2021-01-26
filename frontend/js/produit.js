/* ---------- RÉCUPÉRATION DE L'ARTICLE AVEC AJAX ----------
**************************************************/
// Récupération de l'ID de l'article choisi dans la page index.html
const params = (new URL(document.location)).searchParams;
const id = params.get('id');

// Récupération de l'article sélectionné en page index
function teddySelected () {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            const teddy = JSON.parse(this.responseText);

            const target = document.getElementById('description');
            let options = "";
            for (const color of teddy.colors) {
            options += `<option value="${color}">${color}</option>`
            }
            const article = 
            `<div class="card col-md-4 mx-md-4 mb-5 p-0 Small shadow bg-dark">
                <img class="card-img-top" src="${teddy.imageUrl}" alt="Teddy">
                <div class="card-body">
                    <p class="card-text text-white font-weight-light small"><em>Réf. ${teddy._id}</em></p>
                    <h3 class="card-title h5 text-white">${teddy.name}</h3>
                    <p class="text-white mb-5">Description :</br><em>${teddy.description}</em></p>
                    <p class="text-white mb-4">Choisissez sa couleur. . . <select class="form-select-sm ml-md-3 col-6 col-md-5 rounded" aria-label="bouton sélection">${options}</select></p>
                    <div class="row justify-content-center">
                        <p class="card-text text-color mb-3"><strong>${(teddy.price/100).toFixed(2)} €</strong></p>
                    </div>
                    <div class="row justify-content-center">
                        <a id="btnCustomize" href="produit.html?id=${teddy._id}" class="btn btn-light col-9">Ajoutez ${teddy.name} au panier !</a>
                    </div>
                </div>
            </div>`
            // ajout automatique des articles sur la page HTML
            target.innerHTML += article; 
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies/" + id);
    request.send();
};
// Appel de la fonction
teddySelected ();