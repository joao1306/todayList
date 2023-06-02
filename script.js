
$(document).ready(function(){

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
    });

    //DELETAR
    $('#ul-incompletas').on('click', '.fa-trash', function(){
        $(this).closest('li').fadeOut(20);
    })
    
    $('#ul-completas').on('click', '.fa-trash', function(){
        $(this).closest('li').fadeOut(20);
    })

    //TORNAR TAREFA FEITA
    $('#ul-incompletas').on('click', '.fa-circle-check', function(){
        $(this).closest('li').fadeOut(20);
        
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
    })

    //DESFAZER TAREFA FEITA
    $('#ul-completas').on('click', '#return', function(){
        $(this).closest('li').fadeOut(20);
        
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
    })

})