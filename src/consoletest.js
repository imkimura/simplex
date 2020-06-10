// Teste 1 <--
$('input[name=qntV]').val(2);
$('input[name=qntR]').val(4);
$('input[name=checkPass][value=1]').attr('checked', true);
$('#btn-form-simplex').click();

let vari = 10;
$('input[name="x[]"]').each(function() { $(this).val(vari); vari-- });

let cont = cont2 = cont3 = cont4 = 0;
let varsf = [0.7, 1, 630];
let varss = [0.5, 0.85, 600];
let varst = [1, 0.66, 700];
let varsft = [0.1, 0.25, 135];

$('input[name="f[0]"]').each(function() { $(this).val(varsf[cont]); cont++ })
$('input[name="f[1]"]').each(function() { $(this).val(varss[cont2]); cont2++ })
$('input[name="f[2]"]').each(function() { $(this).val(varst[cont4]); cont4++ })
$('input[name="f[3]"]').each(function() { $(this).val(varsft[cont3]); cont3++ })
$('#btn-form-simplex').click();

//  Teste 2

$('input[name=qntV]').val(2);
$('input[name=qntR]').val(2);
$('input[name=checkPass][value=1]').attr('checked', true);
$('#btn-form-simplex').click();

let conta = 0;
let vari = [300, 400];
$('input[name="x[]"]').each(function() { $(this).val(vari[conta]); conta++ });

let cont = cont2 = 0;
let varsf = [1, 4, 200];
let varss = [5, 7, 300];
$('input[name="f[0]"]').each(function() { $(this).val(varsf[cont]); cont++ })
$('input[name="f[1]"]').each(function() { $(this).val(varss[cont2]); cont2++ })
$('#btn-form-simplex').click();