$('#btn-form-simplex[type=button]').click( function(e) {

    e.preventDefault();

    let formData = $('form#form-simplex').serializeArray();
    let quantidade = {};

    $.map(formData, function(n, i){
        quantidade[n['name']] = n['value'];
    });

    makeForm(quantidade.qntV, quantidade.qntR, quantidade.max_min, quantidade.checkPass);
    
});

function makeForm(qntV, qntR, maxMin, step) {
     
    qntR = parseInt(qntR)
    qntV = parseInt(qntV)
    maxMin = parseInt(maxMin)
    step = parseInt(step)

    rowElems = $(document).find('div.row.mt-5');

    rowElems.text(``);

    form = rowElems.closest('form#form-simplex');    

    rowElems.append(` <input type="hidden" name="qntV" value="${qntV}">`);
    rowElems.append(` <input type="hidden" name="qntR" value="${qntR}">`);
    rowElems.append(` <input type="hidden" name="step" value="${step}">`);
    rowElems.append(` <input type="hidden" name="maxMin" value="${maxMin}">`);

    rowElems.append(` <div class="form-group col-sm-12 text-left">
                        <h3>Função Objetivo (FO)</h3>
                      </div>`);

    for(j = 0; j < qntV; j++) {
        if(j == 0)
        rowElems.append(`            
            <div class="form-group col-sm-2">
                <label>X`+ j +`</label>
                <input name="x[]" type="text" class="form-control">
            </div>
        `);
        else 
        rowElems.append(`            
            <div class="form-group col-sm-2">
                <label>+ X`+ j +`</label>
                <input name="x[]" type="text" class="form-control">
            </div>
        `);
    }  

    rowElems.append(` <div class="form-group col-sm-12 text-left">
                        <h3>Restrições</h3>
                      </div>`);
        
    for(i = 0; i < qntR; i++) {
        rowElems.append(`<div class="row groupEl${i} text-center" style="margin: 10px 0px;justify-content: center;">`);
        for(j = 0; j < (qntV+1); j++) {
            if (j != qntV)
                $(`div.row.groupEl${i}`).append(`            
                    <div class="form-group col-sm-2">
                        <label>X${j}</label>
                        <input name="f[`+ (i) +`]" type="text" step="any" class="form-control">
                    </div>
                `);
            else
                $(`div.row.groupEl${i}`).append(`            
                    <div class="form-group col-sm-2">
                        <label><=</label>
                        <input name="f[`+ (i) +`]" type="text" step="any" class="form-control">
                    </div>
                `);
        }   
        rowElems.append(`</div>`)
    }

    rowElems.append(`
                <div class="form-group col-12 text-center mt-4">
                    <button class="btn btn-dark col-6 col-sm-5" type="submit" id="btn-form-simplex">OK</button>
                </div>  `);
}

function makeMatrix(qntV, qntR, res, fo, maxMin) {
    
    let table = Array(qntR + 1).fill(null).map(() => Array((qntR + qntV) + 1).fill(0));

    for(y =0; y < qntR; y++){
        for(x=0; x < qntV; x++){
            table[y][x] = parseFloat(res[y][x].replace(',', '.'));
        }

        for(j=qntV; j < (qntV+qntR); j++){
            if((j-qntV) == y)
                table[y][j] = 1;
        }            
    }
    
    if(maxMin == 1) {
        for(i=0; i < qntV; i++) {
            table[qntR][i] = parseFloat(fo[i]) * -1;
        }               
    } else  {        
        for(i=0; i < qntV; i++) {
            table[qntR][i] = parseFloat(fo[i]);
        }
    }

    for(i =0; i < qntR; i++){
        table[i][qntR + qntV] = parseFloat(res[i][qntV].replace(',', '.'));
    }
 
    return table
}

function verifyParade(matrix, qntV, qntR){
    for(i=0; i < qntV; i++) {
        if(matrix[qntR][i] < 0)
            return true
    }
    return false
}

function simplex(matrix, qntV, qntR, base){

    div = [];
    
    var min = matrix[qntR].map(Number).reduce(function(a, b) {
        return Math.min(a, b);
    });

    for(i =0; i < qntV; i++){
        if( matrix[qntR][i] == min)
            enterLine = i;
    }
    
    for(i =0; i < qntR; i++){
        try{
            div.push(matrix[i][qntR+qntV] / matrix[i][enterLine]);
        } catch (e) {
            div.push(0);
        }            
    }
    
    a = Infinity;
    for(i =0; i < qntR; i++){
        if( (div[i] < a) && (div[i] > 0)){
            a = div[i];   
            outLine = i;
        }
    }  
    
    base[outLine] = 'X'+ (enterLine+1) 
    
    pivo = matrix[outLine][enterLine];
    newMatrix = matrix;
    
    for(j=0; j < (qntR + qntV + 1); j++)       
        newMatrix[outLine][j] = matrix[outLine][j] / pivo;

    for( i=0; i < (qntR + 1); i++){
        valorDiv = matrix[i][enterLine];
        for( j=0; j < (qntR + qntV + 1);j++){
            if( i != outLine)                                
                newMatrix[i][j] = newMatrix[outLine][j] * (valorDiv * -1) + matrix[i][j];
        }          
    }        

    return [newMatrix, base]
}

function printSimplex(table, qntV, qntR, base, cont, maxMin, nameTb){
    
    rowElems = $(document).find('div.row.mt-5');
    console.log(cont)
    
    rowElems.append(`<div class="col-md-12 name-table"><h3>Tabela ${nameTb}</h3></div>
                    <div class="table-responsive">
                    <table class="table table-striped table-${cont}">
                     <thead class="thead-dark">
                     </thead>
                    <tbody>
                    </tbody>
                    </table>
                    </div>`);

    $(`table.table-striped.table-${cont} thead`).append(`
                     <tr>
                    </tr>`);
    
    $(`table.table-striped.table-${cont} thead tr`).append(`<th scope="col">Base</th>`);

    for (i=0; i < qntV; i++){
        $(`table.table-striped.table-${cont} thead tr`).append(`<th scope="col">X${i+1}</th>`);
    }

    for(i =0; i < qntR; i++){
        $(`table.table-striped.table-${cont} thead tr`).append(`<th scope="col">F${i+1}</th>`);
    }

    $(`table.table-striped.table-${cont} thead tr`).append(`<th scope="col">B</th>`);

    for(y=0; y < ( qntR + 1); y++) {
        $(`table.table-striped.table-${cont} tbody`).append(`<tr></tr>`);
        if( y == qntR){
            if(maxMin == 1)
                $(`table.table-striped.table-${cont} tbody tr:nth-child(${y+1})`).append(`<td>Z</td>`);  
            else
                $(`table.table-striped.table-${cont} tbody tr:nth-child(${y+1})`).append(`<td>-Z</td>`);  
        }            
        else if (y == 0)
            $(`table.table-striped.table-${cont} tbody tr`).append(`<td>${base[y]}</td>`);     
        else
            $(`table.table-striped.table-${cont} tbody tr:nth-child(${y+1})`).append(`<td>${base[y]}</td>`);     
        
        for(x=0; x < ((qntR + qntV) + 1); x++)
            $(`table.table-striped.table-${cont} tbody tr:nth-child(${y+1})`).append(`<td>${(table[y][x]).toFixed(2)}</td>`);   
    }   

}    
        

$('#form-simplex').submit(function (e) {
    e.preventDefault();
   
    var vazios = $("input[type=text]").filter(function() {
        return !this.value;
    }).get();

    if (vazios.length) {
       
        $(vazios).addClass('vazio');
        alert("Todos os campos devem ser preenchidos.");
        return false;

    } else {
        var tableBase = [] 
        let formData = $('form#form-simplex').serializeArray();
        let quantidade = {};
        let restrictions = []

        $.map(formData, function(n, i){
            quantidade[n['name']] = n['value'];
        });

        qntR = parseInt(quantidade.qntR)
        qntV = parseInt(quantidade.qntV)
        maxMin = parseInt(quantidade.maxMin)
        step = parseInt(quantidade.step)

        let variables = $("input[name='x[]']").map(function(){return $(this).val();}).get();

        for(i=0; i < quantidade.qntR; i++) {        
            res = $(`input[name='f[${i}]']`).map(function(){return $(this).val();}).get();
            restrictions.push(res)
            tableBase.push(`F${i+1}`)
        }

        var table = makeMatrix(qntV, qntR, restrictions, variables, maxMin)
        var cont = 0;

        rowElems = $(document).find('div.row.mt-5');
        rowElems.text(``);

        printSimplex(table, qntV, qntR, tableBase, cont, maxMin, "Inicial"); 
        cont++;
        while(verifyParade(table, qntV, qntR)){
            
            if(step){
                if (cont != 1){                   
                    printSimplex(table, qntV, qntR, tableBase, cont, maxMin, `${cont-1}`);   
                }
            } 
                                           
            [table, tableBase] = simplex(table, qntV, qntR, tableBase)  
            cont++;   
        }
        
        printSimplex(table, qntV, qntR, tableBase, cont, maxMin, "Final");             
    }

});