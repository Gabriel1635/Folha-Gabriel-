function calcularHoras() {
    const entrada = document.getElementById('entrada').value;
    const saidaAlmoco = document.getElementById('saida-almoco').value;
    const retornoAlmoco = document.getElementById('retorno-almoco').value;
    const saida = document.getElementById('saida').value;

    if (!entrada || !saidaAlmoco || !retornoAlmoco || !saida) {
        document.getElementById('resultado').textContent = "Por favor, preencha todos os campos.";
        return;
    }

    const [hEntrada, mEntrada] = entrada.split(':').map(Number);
    const [hSaidaAlmoco, mSaidaAlmoco] = saidaAlmoco.split(':').map(Number);
    const [hRetornoAlmoco, mRetornoAlmoco] = retornoAlmoco.split(':').map(Number);
    const [hSaida, mSaida] = saida.split(':').map(Number);

    const entradaDate = new Date(0, 0, 0, hEntrada, mEntrada);
    const saidaAlmocoDate = new Date(0, 0, 0, hSaidaAlmoco, mSaidaAlmoco);
    const retornoAlmocoDate = new Date(0, 0, 0, hRetornoAlmoco, mRetornoAlmoco);
    const saidaDate = new Date(0, 0, 0, hSaida, mSaida);

    const horasManha = (saidaAlmocoDate - entradaDate) / (1000 * 60 * 60);
    const horasTarde = (saidaDate - retornoAlmocoDate) / (1000 * 60 * 60);
    const totalHoras = horasManha + horasTarde;

    document.getElementById('resultado').textContent = `Total de Horas Trabalhadas: ${totalHoras.toFixed(2)} horas`;
}

function salvarHoras() {
    localStorage.setItem('entrada', document.getElementById('entrada').value);
    localStorage.setItem('saidaAlmoco', document.getElementById('saida-almoco').value);
    localStorage.setItem('retornoAlmoco', document.getElementById('retorno-almoco').value);
    localStorage.setItem('saida', document.getElementById('saida').value);
}

function carregarHoras() {
    document.getElementById('entrada').value = localStorage.getItem('entrada') || '';
    document.getElementById('saida-almoco').value = localStorage.getItem('saidaAlmoco') || '';
    document.getElementById('retorno-almoco').value = localStorage.getItem('retornoAlmoco') || '';
    document.getElementById('saida').value = localStorage.getItem('saida') || '';
}

window.onload = carregarHoras;

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Relatório de Horas Trabalhadas", 10, 10);
    doc.text("Hora de Entrada: " + document.getElementById('entrada').value, 10, 20);
    doc.text("Hora de Saída para Almoço: " + document.getElementById('saida-almoco').value, 10, 30);
    doc.text("Hora de Retorno do Almoço: " + document.getElementById('retorno-almoco').value, 10, 40);
    doc.text("Hora de Saída: " + document.getElementById('saida').value, 10, 50);
    doc.text("Total de Horas: " + document.getElementById('resultado').textContent, 10, 60);
    doc.save("relatorio_folha_de_ponto.pdf");
}
