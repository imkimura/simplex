def makeTable(fo, res, qntV, qntR):
    
    table = [[0 for i in range((qntR + qntV) + 1)] for j in range(qntR + 1)]

    for y in range(0, qntR):
        for x in range(0, qntV):
            table[y][x] = res[y][x]

        for j in range(qntV, (qntV+qntR)):            
            if (j-qntV) == y:
                table[y][j] = 1
    
    for i in range(qntV):
        table[qntR][i] = (fo[i]) * -1

    for i in range(qntR):
        table[i][qntR + qntV] = res[i][qntV]
   
    printSimplex(table, qntV, qntR)

    return table

def verifyParade(matrix, qntV, qntR):
    for i in range(qntV):
        if(matrix[qntR][i] < 0):
            return True
    return False

def simplex(matrix, qntV, qntR):
    
    div = []

    for i in range(qntV):
        if matrix[qntR][i] == min(matrix[qntR]):
            enterLine = i
    
    for i in range(qntR):
        try:
            div.append(matrix[i][qntR+qntV] / matrix[i][enterLine])
        except:
            div.append(0)
    
    a = float("inf")
    for i in range(qntR):
        if div[i] < a and div[i] > 0:
            a = div[i]    
            outLine = i    

    pivo = matrix[outLine][enterLine]
    newMatrix = matrix    
    
    for j in range(qntR + qntV + 1):        
        newMatrix[outLine][j] = matrix[outLine][j] / pivo

    for i in range(qntR + 1):
        valorDiv = matrix[i][enterLine]
        for j in range(qntR + qntV + 1):
            if i != outLine:                                
                newMatrix[i][j] = newMatrix[outLine][j] * (valorDiv * -1) + matrix[i][j]

    return newMatrix

def printSimplex(table, qntV, qntR):
    # print('  ', end='   |')

    for x in range(qntV):
        print(f'    x{x+1}   ', end='   |')
    for y in range(qntR):
        print(f'    f{(y+1)}   ', end='   |')
    
    print(f'    b   ', end='    |')

    print()

    for y in range(0,( qntR + 1)):   
        # if y == qntR:
        #     print(f'  Lucro  ', end='   |')     
        # else:
        #     print(f'    f{(y+1)}   ', end='   |')     
        
        for x in range(0, ((qntR + qntV) + 1)):
            print(f'  [{table[y][x]:.3f}]', end='   |')
        
        print()
    
    print()

class Simplex:
        
    qntVariaveis = int(input("Digite a qntd de variaveis de decisao: "))
    qntRestricoes = int(input("Digite a qntd de restrições: "))
  
   
    f = [0 for i in range(qntRestricoes)]
    fo = [0 for i in range(qntVariaveis)]

    print('Função Objetivo (FO): ')
    for var in range(0, qntVariaveis):        
        fo[var] = (float(input("Digite a qntd x"+ (str(var+1)) +" na FO: ")))

    for res in range(0, qntRestricoes):
        x = [0 for i in range(qntVariaveis+1)]
        for var in range(0, qntVariaveis+1):
            if var == qntVariaveis:
                x[var] = (float(input("Digite o valor de f"+ (str(res+1)) +": ")))
            else:
                x[var] = (float(input("Digite a qntd x"+ (str(var+1)) +" para f"+ (str(res+1)) +": ")))
        f[res] = x
    
    table = makeTable(fo, f, qntVariaveis, qntRestricoes)

    while(verifyParade(table, qntVariaveis, qntRestricoes)):
        
        table = simplex(table, qntVariaveis, qntRestricoes)
    
    printSimplex(table, qntVariaveis, qntRestricoes)
                

if __name__ == "__main__":
    Simplex()