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
    
    matrix = Array(qntR + 1).fill(null).map(() => Array((qntR + qntV) + 1).fill(0));

    for(y =0; y < qntR; y++){
        for(x=0; x < qntV; x++){
            matrix[y][x] = parseFloat(res[y][x].replace(',', '.'));
        }

        for(j=qntV; j < (qntV+qntR); j++){
            if((j-qntV) == y)
                matrix[y][j] = 1;
        }            
    }
    
    if(maxMin == 1) {
        for(i=0; i < qntV; i++) {
            matrix[qntR][i] = parseFloat(fo[i]) * -1;
        }               
    } else  {        
        for(i=0; i < qntV; i++) {
            matrix[qntR][i] = parseFloat(fo[i]);
        }
    }

    for(i =0; i < qntR; i++){
        matrix[i][qntR + qntV] = parseFloat(res[i][qntV].replace(',', '.'));
    }

    console.log(matrix, " Matrix");
    return matrix
}
function analyseSensibility(qntV, qntR, oldtable, newtable, basic, nobasic) {
    let table = Array((qntR + qntV) + 1).fill(null).map(() => Array(14).fill(0));

    // Tipo de Variavel, Valor Inicial, Básica(Sim ou Não)
    for(y=0; y < qntV; y++){
        table[y][0] = 'X'+(y+1);
        
        table[y][1] = 'Decisão';
        
        table[y][2] = 0;
        
        if(basic.includes(`X${y+1}`))
            table[y][4] = 'Sim';
        else
            table[y][4] = 'Não';

    }

    // console.log(oldtable);
    // console.log(newtable);

    for(y=qntV; y < qntR+qntV; y++){
        table[y][0] = 'F'+(y-1);
        
        table[y][1] = 'Folga';
        
        table[y][2] = oldtable[(qntR+qntV)-qntV][qntV+qntR];
        
        if(basic.includes(`F${y-1}`))
            table[y][4] = 'Sim';
        else
            table[y][4] = 'Não';

    }

    console.log(table);
}
function verifyStop(matrix, qntV, qntR){
    for(i=0; i < qntV; i++) {
        if(matrix[qntR][i] < 0)
            return true
    }
    return false
}

function simplex(matrix, qntV, qntR, base, nobasic){

    div = [];
    vars = [];
    
    var min = matrix[qntR].map(Number).reduce(function(a, b) {
        return Math.min(a, b);
    });

    for(i =0; i < qntV; i++){
        if( matrix[qntR][i] == min)
            enterLine = i;
    }

    vars.push('X'+(enterLine+1))

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
    vars.push(base[outLine])
    
    nobasic = nobasic.map((nb) => {
        if (('X'+(enterLine+1)) == nb) {
            return base[outLine];
        } else
            return nb;
    });

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
    console.log(newMatrix, " Simplex");
    return [newMatrix, base, vars, nobasic]
}

function printSimplex(table, qntV, qntR, base, cont, maxMin, nameTb, vars=[], nobasic=[]){
    
    rowElems = $(document).find('div.row.mt-5');

    rowElems.append(`<div class="col-md-12 name-table"><h3>Tabela ${nameTb}</h3></div>
                    <div class="table-responsive">
                    <table class="table table-striped table-${cont}">
                     <thead class="thead-dark">
                     </thead>
                    <tbody>
                    </tbody>
                    </table>
                    </div>
                    <hr/>`);


    if(typeof vars !== 'undefined' && vars.length > 0) {       
        rowElems.append(`<p> Entra <b>${vars[0]}</b> e Sai <b>${vars[1]}</b></p></br>`)        
    }

    if(nameTb == "Final")
        var auxS = '<p> Solução Final::   </p><p> Básicas-> ';
    else if(nameTb == "Inicial")
        var auxS = '<p> Solução Inicial::   </p><p> Básicas-> ';
    else 
        var auxS = '<p>   Básicas-> ';
    
    for(i =0; i < qntR; i++){
        auxS += `| <b>${base[i]}</b> = ${table[i][qntR+qntV].toFixed(2)} `;
    }

    if(maxMin == 1)
        auxS += `| <b>Z</b> = ${table[qntR][qntR+qntV].toFixed(2)} | </p>`;
    else
        auxS += `| <b>Z</b> = ${(table[qntR][qntR+qntV].toFixed(2)) * -1} | </p>`;
    
    auxS += '<p> Não Básicas-> ';

    for(let i = 0; i < nobasic.length; i++) {
        auxS += `| <b>${nobasic[i]}</b>  = 0`;
    }

    auxS += '</p>';
    
    rowElems.append(auxS)

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
    if(nameTb == "Final")
        rowElems.append(`
        <div class="form-group col-12 text-center mt-4">
            <a href="index.php" class="btn btn-dark col-6 col-sm-5" type="button">VOLTAR</a>
        </div>`)

}    

function operational(qntV, qntR, maxMin, step) {
    
    let restrictions = [];
    var cont = 0;
    var tableBase = [] 
    var nobasic = [];

    let variables = $("input[name='x[]']").map(function(){return $(this).val();}).get();

    for(i=0; i < qntR; i++) {        
        res = $(`input[name='f[${i}]']`).map(function(){return $(this).val();}).get();
        restrictions.push(res)
        tableBase.push(`F${i+1}`)
    }

    const oldtable = makeMatrix(qntV, qntR, restrictions, variables, maxMin);
    var tableSimplex = oldtable;         

    rowElems = $(document).find('div.row.mt-5');
    rowElems.text(``);

    for (let i = 0; i < qntV; i++) {
        nobasic.push(`X${i+1}`);
    }

    printSimplex(tableSimplex, qntV, qntR, tableBase, cont, maxMin, "Inicial", vars=[], nobasic); 
    cont++;

    while(verifyStop(tableSimplex, qntV, qntR)){
        
        if(step){
            if (cont != 1){                   
                printSimplex(tableSimplex, qntV, qntR, tableBase, cont, maxMin, `${cont-1}`, vars, nobasic);   
            }
        } 
                                        
        [tableSimplex, tableBase, vars, nobasic] = simplex(tableSimplex, qntV, qntR, tableBase, nobasic)  
        cont++;   
    }
    
    printSimplex(tableSimplex, qntV, qntR, tableBase, cont, maxMin, "Final", vars, nobasic);          
    
    analyseSensibility(qntV, qntR, oldtable, newtable=tableSimplex, tableBase, nobasic);
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

        let quantidade = {};
        let formData = $('form#form-simplex').serializeArray();
        

        $.map(formData, function(n, i){
            quantidade[n['name']] = n['value'];
        });

        qntR = parseInt(quantidade.qntR)
        qntV = parseInt(quantidade.qntV)
        maxMin = parseInt(quantidade.maxMin)
        step = parseInt(quantidade.step)

        operational(qntV, qntR, maxMin, step);
    }

});