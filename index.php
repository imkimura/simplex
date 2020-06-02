<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simplex Algo</title>
        
    <link href="https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Chelsea+Market&family=Raleway:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">    
    <link rel="stylesheet" href="./src/style.css">    
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="index.php"><h3>Simplex</h3> <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="sobre.html"><h3>Sobre</h3></a>
            </li>
          </ul>
        </div>
      </nav>
    <div class="container">
        <div class="row text-center" style="padding: 120px 40px 150px;">
            <div class="col-md-12 text-center">
               <h2>Algoritmo Simplex</h2>
            </div>
            <form id="form-simplex" action="." method="POST" style="width: 100%;max-width: 100%;">
                <div class="row mt-5" style="width: 100%;justify-content: center;">     
                    <div class="form-group col-sm-6">
                        <label>Quantidade de Variáveis de Decisão</label>
                        <input name="qntV" type="number" class="form-control" required>
                    </div>           
                    <div class="form-group col-sm-6">
                        <label>Quantidade de Restrições</label>
                        <input name="qntR" type="number" class="form-control" required>
                    </div>
                    <div class="form-group col-sm-12">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="Minimizar" name="max_min" value="0">
                            <label class="form-check-label" for="Minimizar">Minimizar</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="max_min" id="Maximizar" value="1" checked>
                            <label class="form-check-label" for="Maximizar">Maximizar</label>
                          </div>
                    </div>
                    <div class="form-group col-sm-12">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" name="checkPass" type="checkbox" id="passtopass" value="1">
                            <label class="form-check-label" for="passtopass">Passo a Passo</label>
                          </div>
                    </div>
                    <div class="form-group col-12 text-center mt-4">
                        <button class="btn btn-dark col-6 col-sm-5" type="button" id="btn-form-simplex">OK</button>
                    </div>               
                </div>
            </form>
        </div>
    </div>
    
    <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
        <div class="container text-center">
          <p>Copyright 2020 &copy; <a href="https://github.com/imkimura" target="_blank">Kimura</a> & <a href="https://github.com/elton-tanaka" target="_blank">Tanaka</a></p>
        </div>
      </footer>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js" type="text/javascript"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>
    <script src="./src/main.js"></script>
</body>
</html>