<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title> SANPETROL </title>

    <!-- Bootstrap -->
    <link href="../../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="../../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="../../vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- Animate.css -->
    <link href="../../vendors/animate.css/animate.min.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="../../build/css/custom.min.css" rel="stylesheet">
  </head>

  <body class="login">
    <div>
      <a class="hiddenanchor" id="signup"></a>
      <a class="hiddenanchor" id="signin"></a>
      <div class="login_wrapper">
        <div class="animate form login_form">
          <section class="login_content">
            <form>
              <h1>Inicio de sesión</h1>
              <div>
                <input type="text" class="form-control" placeholder="Nombre de usuario" required="" />
              </div>
              <div>
                <input type="password" class="form-control" placeholder="Contraseña" required="" />
              </div>
              <div>
                <div class="x_content">
                  <div class="row">
                    <div class="col-sm-9">
                    </div>
                    <div class="col-sm-3">
                        <button type="button" style="width: 100%" class="btn btn-primary btn-sm">Iniciar</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="separator">
                  <a href="#signup" class="to_register"> Crear cuenta </a>
                  <a href="#signup" class="to_register"> Recuperar contraseña </a>
                <div class="clearfix"></div>
                <br />
                <div>
                  <h1>SANPETROL XXI</h1>
                  <p>©2019 Todos los derechos reservados.</p>
                </div>
              </div>
            </form>
          </section>
        </div>

        <div id="register" class="animate form registration_form">
          <section class="login_content">
            <form>
              <h1>Crear cuenta</h1>
              <div>
                <input type="text" class="form-control" placeholder="Nombre de usuario" required="" />
              </div>
              <div>
                <input type="email" class="form-control" placeholder="Email" required="" />
              </div>
              <div>
                <input type="password" class="form-control" placeholder="Contraseña" required="" />
              </div>
              <div>
                <div class="x_content">
                  <div class="row">
                    <div class="col-sm-9">
                    </div>
                    <div class="col-sm-3">
                        <button type="button" style="width: 100%" class="btn btn-success btn-sm">Crear</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="separator">
                <p class="change_link">Already a member ?
                  <a href="#signin" class="to_register"> Log in </a>
                </p>
                <div class="clearfix"></div>
                <br />
                <div>
                  <h1>SANPETROL</h1>
                  <p>©2019 Todos los derechos reservados.</p>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </body>
</html>
