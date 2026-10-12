/* ==========================================
   PIZZARETTO — BLACK TECH
   SISTEMA DE PESQUISA E FILTROS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const campoPesquisa = document.getElementById("pesquisa");
  const botoesFiltro = document.querySelectorAll(".filtro");
  const produtos = document.querySelectorAll(".produto");
  const mensagemVazia = document.getElementById("sem-resultados");

  let categoriaAtual = "todos";

  function filtrarProdutos() {

    const pesquisa = (campoPesquisa?.value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

    let encontrados = 0;

    produtos.forEach(produto => {

      const nome = produto.querySelector("h3")?.textContent || "";
      const descricao = produto.querySelector("p")?.textContent || "";

      const texto = `${nome} ${descricao}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const categoria = produto.dataset.categoria;

      const correspondePesquisa = texto.includes(pesquisa);

      const correspondeCategoria =
        categoriaAtual === "todos" ||
        categoria === categoriaAtual;

      if (correspondePesquisa && correspondeCategoria) {
        produto.style.display = "";
        encontrados++;
      } else {
        produto.style.display = "none";
      }

    });

    if (mensagemVazia) {
      mensagemVazia.style.display =
        encontrados === 0 ? "block" : "none";
    }

  }

  // PESQUISA EM TEMPO REAL

  campoPesquisa?.addEventListener("input", filtrarProdutos);

  // FILTROS POR CATEGORIA

  botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

      botoesFiltro.forEach(b => b.classList.remove("ativo"));

      botao.classList.add("ativo");

      categoriaAtual = botao.dataset.filtro;

      filtrarProdutos();

    });

  });

  filtrarProdutos();

});
