/* ==========================================
   PIZZARETTO — BLACK TECH
   PESQUISA, FILTROS E FOTOGRAFIAS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const campoPesquisa = document.getElementById("pesquisa");
  const botoesFiltro = document.querySelectorAll(".filtro");
  const produtos = document.querySelectorAll(".produto");
  const mensagemVazia = document.getElementById("sem-resultados");

  let categoriaAtual = "todos";

  // FOTOGRAFIAS ILUSTRATIVAS
  // Imagens externas do Unsplash

  const imagens = {
    "Alho e Óleo": "photo-1513104890138-7c749659a591",
    "Americana": "photo-1574071318508-1cdbab80d002",
    "Atum": "photo-1565299624946-b28f40a0ae38",
    "Bacon": "photo-1513104890138-7c749659a591",
    "Calabresa": "photo-1565299624946-b28f40a0ae38",
    "Frango": "photo-1574071318508-1cdbab80d002",
    "Marguerita": "photo-1574071318508-1cdbab80d002",
    "Portuguesa": "photo-1513104890138-7c749659a591",
    "Quatro Queijos": "photo-1565299624946-b28f40a0ae38",

    "Calabresa Especial": "photo-1565299624946-b28f40a0ae38",
    "Frango Especial": "photo-1513104890138-7c749659a591",
    "Portuguesa Especial": "photo-1574071318508-1cdbab80d002",
    "Strogonoff de Filé": "photo-1565299624946-b28f40a0ae38",
    "Strogonoff de Camarão": "photo-1513104890138-7c749659a591",

    "Filé com Legumes": "photo-1547592180-85f173990554",
    "Filé à Parmegiana": "photo-1547592180-85f173990554",

    "Moqueca": "photo-1559847844-5315695dadae",
    "Tilápia à Grega": "photo-1519708227418-c8fd9a32b7a2"
  };

  // ADICIONAR IMAGENS AUTOMATICAMENTE

  produtos.forEach(produto => {

    const nome = produto.querySelector("h3")?.textContent.trim();
    const container = produto.querySelector(".produto-imagem");

    if (!nome || !container) return;

    const foto = imagens[nome];

    if (!foto) return;

    const img = document.createElement("img");

    img.src = `https://images.unsplash.com/${foto}?auto=format&fit=crop&w=700&q=80`;
    img.alt = `Imagem ilustrativa de ${nome}`;
    img.loading = "lazy";

    img.onerror = () => {
      container.textContent = "🍽️";
    };

    container.textContent = "";
    container.appendChild(img);

  });

  // PESQUISA E FILTROS

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function filtrarProdutos() {

    const pesquisa = normalizar(campoPesquisa?.value || "");

    let encontrados = 0;

    produtos.forEach(produto => {

      const nome = produto.querySelector("h3")?.textContent || "";
      const descricao = produto.querySelector("p")?.textContent || "";

      const texto = normalizar(`${nome} ${descricao}`);

      const correspondePesquisa = texto.includes(pesquisa);

      const correspondeCategoria =
        categoriaAtual === "todos" ||
        produto.dataset.categoria === categoriaAtual;

      const mostrar = correspondePesquisa && correspondeCategoria;

      produto.style.display = mostrar ? "" : "none";

      if (mostrar) encontrados++;

    });

    if (mensagemVazia) {
      mensagemVazia.style.display =
        encontrados === 0 ? "block" : "none";
    }

  }

  campoPesquisa?.addEventListener("input", filtrarProdutos);

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
