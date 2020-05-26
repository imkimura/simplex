$('#form-simplex').submit( function(e) {

    e.preventDefault();

    let formData = $(this).serializeArray();
    let quantidade = {};

    $.map(formData, function(n, i){
        quantidade[n['name']] = n['value'];
    });

    makeForm(quantidade.qntV, quantidade.qntR);
    
});

function makeForm(qntV, qntR) {
    rowElems = $(document).find('div.row.mt-5');

    rowElems.text(``);

    form = rowElems.closest('form#form-simplex');

    form.prop('id', 'form-simplex-algo')

    rowElems.append(` <div class="form-group col-sm-12">
                        <h2>Função Objetivo</h2>
                      </div>`);

    for(j = 0; j < qntV; j++) {
        rowElems.append(`            
            <div class="form-group col-sm-6">
                <label>X`+ j +`</label>
                <input name="x[`+ (j+1) +`]" type="number" class="form-control" required>
            </div>
        `);
    }  

    rowElems.append(` <div class="form-group col-sm-12">
                        <h2>Restrições</h2>
                      </div>`);
    
    for(i = 0; i < qntR; i++) {
        for(j = 0; j < qntV; j++) {
            rowElems.append(`            
                <div class="form-group col-sm-6">
                    <label>Quantidade de Variáveis de Decisão `+ i +` `+ j +`</label>
                    <input name="f[`+ (i+1) +`][x][`+ (j+1) +`]" type="number" class="form-control" required>
                </div>
            `);
        }   
    }

    rowElems.append(`
                <div class="form-group col-12 text-center mt-4">
                    <button class="btn btn-dark col-6 col-sm-5" type="submit" id="btn-form-simplex">OK</button>
                </div>  `);
}

$(document).on('submit','#form-simplex-algo',function(){
    e.preventDefault();

    alert('oi')
    // let formData = $(this).serializeArray();
    // let quantidade = {};

    // $.map(formData, function(n, i){
    //     quantidade[n['name']] = n['value'];
    // });
    
});