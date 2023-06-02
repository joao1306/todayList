
$(document).ready(function(){

    //CRIAR
    $('#input').change(function(){
        var input = $(this).val();
        var tarefaAFazer = 
        
        `<li class='tarefa'>
            <p class="conteudo-tarefa">${input}</p>
            <div class="icons">
                <i class="fa-solid fa-circle-check" id="check-incompletas"></i>
                <i class="fa-solid fa-trash" id="delet-incompleta"></i>
            </div>
        </li> `
        $('#ul-incompletas').append(tarefaAFazer);
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
                <i class="fa-solid fa-circle-check"></i>
                <i class="fa-solid fa-trash"></i>
            </div>
        </li>`
        
        $('#ul-completas').append(tarefaFeita);
    })

})