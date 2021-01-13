// ------------ TEST D'ACCES A L'API TEDDIES ----------
// fetch("http://localhost:3000/api/teddies")
// .then((response) => response.json())
// .then((json) => console.log(json));

// ------------ À placer dans la page produit.html -----------
// <p class="card-text text-white"><strong>Description:</strong><br>${teddy.description}</p>


// Accès base de données
const firstPromise = fetch("http://localhost:3000/api/teddies");
firstPromise.then((response) => {
    console.log(response); // contrôle d'accès code 200 Ok !

    const data = response.json();
    console.log(data); // firstPromise accès Ok!

    // Création des articles
    data.then((teddies) => {
        console.log(teddies);
        const articles = document.getElementById("articles");
        for (const teddy of teddies) {
        const article = `<div class="card col-12 col-md-3 mx-md-5 mb-5 p-0 Small shadow bg-dark">
            <img class="card-img-top" src="${teddy.imageUrl}" alt="Teddy">
            <div class="card-body">
                <p class="card-text text-white"><em>Réf. ${teddy._id}</em></p>
                <h3 class="card-title fs-4 text-white">${teddy.name}</h3>
                <p class="card-text text-color"><strong>${(teddy.price/100).toFixed(2)} €</strong></p>
                <div class="row justify-content-center">
                    <a href="produit.html?id=${teddy._id}" class="btn btn-light stretched-link col-10">Personnalisez ${teddy.name} !</a>
                </div>
            </div>
        </div>`

        // ajout automatique des articles
        articles.innerHTML += article; 
        }
    })
})
.catch((err) => {console.log(err)}); // Aide à marquer les erreurs dans la console

{/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}