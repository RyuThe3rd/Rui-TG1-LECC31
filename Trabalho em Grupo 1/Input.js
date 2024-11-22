function clique(){

    var pesquisa = document.getElementById('imput').value;
    
    if (pesquisa.trim() !== "") {
        localStorage.setItem('pesquisa', pesquisa);

        window.location.href = "pagina2.html";
    } else {
        alert("Por favor, insira um nome de filme ou série!");
    }

}