// Inputs e selects
const input_nome = document.querySelector("#input_nome");
const input_numero = document.querySelector("#input_numero");
const input_validade = document.querySelector("#input_validade");
const select_bandeira_cartao = document.querySelector("#select_bandeira_cartao");
const modelos = document.querySelectorAll('input[name="modelo"]');
const beneficios = document.querySelectorAll('input[name="beneficio"]');
//--------------

// Divs
const div_nome_titular = document.querySelector("#div_nome_titular");
const div_numero_cartao = document.querySelector("#div_numero_cartao");
const div_validade = document.querySelector("#div_validade");
const div_bandeira = document.querySelector("#div_bandeira");
const div_modelo = document.querySelector("#div_modelo");
const div_cartao = document.querySelector("#div_cartao");
const div_contactless = document.querySelector("#div_contactless");
const div_internacional = document.querySelector("#div_internacional");
const div_cashback = document.querySelector("#div_cashback");
//--------------

let ultimoValorValido = input_nome.value;

let contCaracter = 0;
input_nome.addEventListener("input", function(event) {
    // Substitui tudo que NÃO é letra (a-z, A-Z) ou espaço por nada
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');

    const valorOriginal = event.target.value;

    const valorSemEspacos = valorOriginal.replace(/\s/g, '');

    if (valorSemEspacos.length > 21) {
        this.value = ultimoValorValido;
    }else {
        ultimoValorValido = this.value;
    }

    div_nome_titular.textContent = `${input_nome.value}`     
});


input_numero.addEventListener("input", function(event){
    let posicaoCursor = event.target.selectionStart;
    let valorOriginal = event.target.value;

    // Remove tudo o que não for número
    let apenasNumeros = valorOriginal.replace(/\D/g, '');
    
    if(apenasNumeros.length > 16){
        apenasNumeros = apenasNumeros.substring(0, 16);        
    }

    // Agrupa de 4 em 4 números adicionando o espaço
    let valorFormatado = apenasNumeros.match(/.{1,4}/g)?.join(' ') || '';
    
    // Atualiza o valor do input
    event.target.value = valorFormatado;

    

    // Ajusta a posição do cursor caso um espaço tenha sido adicionado
    // Se o caractere antes da posição original era um espaço, move o cursor para frente
    if (valorFormatado.length > valorOriginal.length && valorFormatado[posicaoCursor - 1] === ' ') {
        posicaoCursor++;
    }   
    
    
    event.target.setSelectionRange(posicaoCursor, posicaoCursor);

    div_numero_cartao.textContent = valorFormatado;
});

function formatarMesAno(input){
    let valor = input.value.replace(/\D/g, '');

    valor = valor.substring(0, 4);

    const mes = parseInt(valor.substring(0, 2), 10);

    if(valor.length === 1 && valor > 1)
        valor = '0' + valor;

    if(mes > 12)
        valor = '12' + valor.substring(2);


    if(valor.length > 2)
        valor = valor.replace(/^(\d{2})(\d{0,2})/, "$1/$2");

    input.value = valor;
    return valor;     
}

input_validade.addEventListener("input", function(event){    
    div_validade.textContent = `${formatarMesAno(input_validade)}`
});

select_bandeira_cartao.addEventListener("input", function(event){
    div_bandeira.textContent = select_bandeira_cartao.value;    
});

modelos.forEach(function(modelo){
    modelo.addEventListener("change", function(event){

        div_cartao.classList.remove('classic');
        div_cartao.classList.remove('gold');
        div_cartao.classList.remove('platinum');

        if(this.value === 'classico'){
            div_cartao.classList.add('classic');
        }else{
            if(this.value === 'gold'){
                div_cartao.classList.add('gold');
            }else{
                if(this.value === 'platinum'){
                    div_cartao.classList.add('platinum');
                }
            }            
        } 
    }); 
});

beneficios.forEach(function(beneficio){
    beneficio.addEventListener("change", function(event){


        if(this.value === 'contactless' && this.checked === false)
            div_contactless.classList.add('hidden');
        if(this.value === 'internacional' && this.checked === false)
            div_internacional.classList.add('hidden');
        if(this.value === 'cashback' && this.checked === false)
            div_cashback.classList.add('hidden');    

        if(this.value === 'contactless' && this.checked === true)
            div_contactless.classList.remove('hidden');
        if(this.value === 'internacional' && this.checked === true)
            div_internacional.classList.remove('hidden');
        if(this.value === 'cashback' && this.checked === true)
            div_cashback.classList.remove('hidden');        
    });
});