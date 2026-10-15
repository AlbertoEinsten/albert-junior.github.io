const btnFundo = document.querySelector("#btn-cor-fundo button");
const body = document.body;
const ctx = document.getElementById("myChart");
const formulario = document.querySelector("#form-contato");
const msgForm = document.querySelector("#form-status");

/* ==========================================================
   GRÁFICO (Chart.js)
   ========================================================== */

let grafico = null;

// Só cria o gráfico se a biblioteca carregou (evita quebrar o resto do script)
if (ctx && typeof Chart !== "undefined") {
    grafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Loja online", "Site Games", "WebMaster Dashboard", "GameDev Portfolio", "CodeCraft Blog", "FrontPlay Studio"],
            datasets: [{
                label: "Nº de Projetos feitos",
                data: [2, 10, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: {}, grid: {} },
                y: { beginAtZero: true, ticks: { precision: 0 }, grid: {} }
            },
            plugins: { legend: { labels: {} } }
        }
    });
}

// Ajusta as cores do gráfico de acordo com o tema
function atualizarGrafico(escuro) {
    if (!grafico) return;

    const texto = escuro ? "#F5F5DC" : "#222222";
    const grade = escuro ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)";
    const barra = escuro ? "#F5F5DC" : "#4b4b4b";

    grafico.options.scales.x.ticks.color = texto;
    grafico.options.scales.y.ticks.color = texto;
    grafico.options.scales.x.grid.color = grade;
    grafico.options.scales.y.grid.color = grade;
    grafico.options.plugins.legend.labels.color = texto;
    grafico.data.datasets[0].backgroundColor = barra;
    grafico.data.datasets[0].borderColor = barra;
    grafico.update();
}

/* ==========================================================
   TEMA CLARO / ESCURO
   ========================================================== */

function aplicarTema(escuro) {
    body.classList.toggle("escuro", escuro);
    btnFundo.setAttribute("aria-pressed", String(escuro));
    atualizarGrafico(escuro);
}

btnFundo.addEventListener("click", function () {
    const escuro = !body.classList.contains("escuro");
    aplicarTema(escuro);

    try {
        localStorage.setItem("tema", escuro ? "escuro" : "claro");
    } catch (erro) {
        // localStorage pode estar bloqueado; o tema continua funcionando
    }
});

// Lembra a escolha ao recarregar a página (sem animar na carga)
let temaSalvo = null;
try {
    temaSalvo = localStorage.getItem("tema");
} catch (erro) {
    temaSalvo = null;
}

body.style.transition = "none";
aplicarTema(temaSalvo === "escuro");
void body.offsetHeight; // força o navegador a aplicar o estado inicial
body.style.transition = "";

/* ==========================================================
   FORMULÁRIO DE CONTATO
   ========================================================== */

// Ainda não existe servidor para receber a mensagem: por enquanto só evita
// que a página recarregue. Para enviar de verdade, use um serviço como
// Formspree/EmailJS ou um back-end próprio.
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    msgForm.textContent = "Formulário de demonstração: a mensagem ainda não é enviada a nenhum servidor.";
    formulario.reset();
});