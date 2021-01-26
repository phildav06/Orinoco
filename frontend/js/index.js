/* ------------ TEST D'ACCES A L'API TEDDIES ---------- 
*******************************************************/
// fetch("http://localhost:3000/api/teddies")
// .then((response) => response.json())
// .then((json) => console.log(json));


/* ----------- RÉCUPÉRATION DES DONNÉES ET CRÉATIONS ARTICLES ---------- 
************************************************************************/
// ACCÈS A LA BASE DE DONNÉES
const firstPromise = fetch("http://localhost:3000/api/teddies");
firstPromise.then((response) => {
    console.log(response); 
    // contrôle d'accès code 200 Ok !

    const data = response.json();
    console.log(data); 
    // firstPromise accès Ok!

// CRÉATION DES ARTICLES
    data.then((teddies) => {
        console.log(teddies);

        // Récupération des articles de l'API
        const articles = document.getElementById("articles");

        // Ajout de chaque article teddy
        for (const teddy of teddies) {
        const article = 
        `<div class="card col-md-4 mx-md-4 mb-5 p-0 Small shadow bg-dark">
            <img class="card-img-top" src="${teddy.imageUrl}" alt="Teddy">
            <div class="card-body">
                <p class="card-text text-white font-weight-light small"><em>Réf. ${teddy._id}</em></p>
                <h3 class="card-title h5 text-white">${teddy.name}</h3>
                <p class="card-text text-color"><strong>${(teddy.price/100).toFixed(2)} €</strong></p>
                <div class="row justify-content-center">
                    <a id="btnCustomize" href="produit.html?id=${teddy._id}" class="btn btn-light col-10">Personnalisez ${teddy.name} !</a>
                </div>
            </div>
        </div>`

        // ajout automatique des articles sur la page HTML
        articles.innerHTML += article; 
        }
    })
})
// Aide à marquer les erreurs dans la console
.catch((err) => {console.log(err)}); 

