
$(document).ready(function(){

    //SETUP LOCALSTORAGE
    let arrNaoFeitas = []
    let arrFeitas = []


    atualizar(); 
    
    if((arrNaoFeitas.length !== 0) && (arrFeitas.length !== 0)){
        mapearNaoFeitas();
        mapearFeitas();
    } else if(arrNaoFeitas.length!==0){
        mapearNaoFeitas();
    } else if(arrFeitas.length!==0){
        mapearFeitas();
    }


    function persistir(task, arr){
        arr.push(task);
    }

    function deletar(task, arr){
        let index = arr.indexOf(task)
        arr.splice(index, 1)
    }

    function atualizar() {
        let arrayNFLS = resgatarNaoFeitasLS();
        let arrayFLS = resgatarFeitasLS();
      
        if (arrayNFLS && arrayNFLS.length !== 0) {
          arrNaoFeitas = arrayNFLS;
        }
        if (arrayFLS && arrayFLS.length !== 0) {
          arrFeitas = arrayFLS;
        }
      }

    function mapearNaoFeitas(){
        if(arrNaoFeitas.length!==0){
                arrNaoFeitas.forEach(element => {
                var tarefaAFazer = 
            
            `<li class='tarefa'>
                <p class="conteudo-tarefa">${element}</p>
                <div class="icons">
                    <i class="fa-solid fa-circle-check" id="check-incompletas"></i>
                    <i class="fa-solid fa-trash" id="delete-incompleta"></i>
                </div>
            </li> `

            $('#ul-incompletas').append(tarefaAFazer);
            $(this).val('');
            });
        }
    }

    function mapearFeitas(){
        if(arrFeitas.length!==0){
            arrFeitas.forEach(element => {
                var tarefaFeita = 
                `<li class='tarefa-feita'>
                    <p class="conteudo-tarefa"> ${element} </p>
                    <div class="icons">
                        <i class="fa-solid fa-arrow-rotate-left" id="return"></i>
                        <i class="fa-solid fa-trash" id="delete-completa"></i>
                    </div>
                </li>`
                    
            $('#ul-completas').append(tarefaFeita);
            $(this).val('');
            });
        }
    }

    //LocalStorage
    function persistirNaoFeitasLS(){
        let stringArr =  JSON.stringify(arrNaoFeitas);
        localStorage.setItem("arrNaoFeitasLS", stringArr)
    }
    function persistirFeitasLS(){
        let stringArr =  JSON.stringify(arrFeitas);
        localStorage.setItem("arrFeitasLS", stringArr)
    }
    function resgatarNaoFeitasLS(){
        let string = localStorage.getItem("arrNaoFeitasLS");
        let arr = JSON.parse(string);
        return arr;
    }
    function resgatarFeitasLS(){
        let string = localStorage.getItem("arrFeitasLS");
        let arr = JSON.parse(string);
        return arr;
    }

    //CRIAR
    $('#input').change(function(){
        var input = $(this).val();
        var tarefaAFazer = 
        
        `<li class='tarefa'>
            <p class="conteudo-tarefa">${input}</p>
            <div class="icons">
                <i class="fa-solid fa-circle-check" id="check-incompletas"></i>
                <i class="fa-solid fa-trash" id="delete-incompleta"></i>
            </div>
        </li> `
        $('#ul-incompletas').append(tarefaAFazer);
        $(this).val('');

        persistir(input, arrNaoFeitas);
        persistirNaoFeitasLS();
    });

    //DELETAR
    $('#ul-incompletas').on('click', '.fa-trash', function(){
        $(this).closest('li').fadeOut(20).remove();
        var textoTarefa = $(this).closest('.tarefa').find('p').text();
        deletar(textoTarefa, arrNaoFeitas);
        persistirNaoFeitasLS();
    })
    
    $('#ul-completas').on('click', '.fa-trash', function(){
        $(this).closest('li').fadeOut(20).remove();
        var textoTarefa = $(this).closest('.tarefa-feita').find('p').text();
        deletar(textoTarefa, arrFeitas);
        persistirFeitasLS();
    })

    //TORNAR TAREFA FEITA
    $('#ul-incompletas').on('click', '.fa-circle-check', function(){
        $(this).closest('li').fadeOut(20).remove();
        
        var textoTarefaFeita = $(this).closest('.tarefa').find('p').text();

        var tarefaFeita = 
        `<li class='tarefa-feita'>
            <p class="conteudo-tarefa"> ${textoTarefaFeita} </p>
            <div class="icons">
                <i class="fa-solid fa-arrow-rotate-left" id="return"></i>
                <i class="fa-solid fa-trash" id="delete-completa"></i>
            </div>
        </li>`
        
        $('#ul-completas').append(tarefaFeita);
        deletar(textoTarefaFeita, arrNaoFeitas);
        persistir(textoTarefaFeita, arrFeitas);
        persistirFeitasLS();
        persistirNaoFeitasLS();
    })

    //DESFAZER TAREFA FEITA
    $('#ul-completas').on('click', '#return', function(){
        $(this).closest('li').fadeOut(20).remove();
        
        var textoTarefa = $(this).closest('.tarefa-feita').find('p').text();

        var tarefaFeita = 
        `<li class='tarefa'>
            <p class="conteudo-tarefa">${textoTarefa}</p>
            <div class="icons">
                <i class="fa-solid fa-circle-check" id="check-incompletas"></i>
                <i class="fa-solid fa-trash" id="delet-incompleta"></i>
            </div>
        </li> `
        
        $('#ul-incompletas').append(tarefaFeita);
        deletar(textoTarefa, arrFeitas);
        persistir(textoTarefa, arrNaoFeitas);
        persistirNaoFeitasLS();
        persistirFeitasLS();
    })

})