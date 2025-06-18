window.onload = function () {
  var greeting = document.querySelector('.form__greeting');
  var form = document.getElementById('formSuscribe');

  var fields = {
    fullname: document.getElementById('fullname'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirm: document.getElementById('repeat-password'),
    edad: document.getElementById('edad'),
    telefono: document.getElementById('telefono'),
    direccion: document.getElementById('direccion'),
    ciudad: document.getElementById('ciudad'),
    cp: document.getElementById('cp'),
    dni: document.getElementById('dni')
  };

  var validators = {
    fullname: function (v) { return v.length > 6 && /\s+/.test(v); },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },
    password: function (v) { return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v); },
    confirm: function (v) { return v === fields.password.value; },
    edad: function (v) { return /^\d+$/.test(v) && parseInt(v, 10) >= 18; },
    telefono: function (v) { return /^\d{7,}$/.test(v); },
    direccion: function (v) { return /^.{5,}\s+/.test(v); },
    ciudad: function (v) { return v.trim().length >= 3; },
    cp: function (v) { return v.trim().length >= 3; },
    dni: function (v) { return /^\d{7,8}$/.test(v); }
  };

  var messages = {
    fullname: "Debe tener más de 6 letras y un espacio",
    email: "Email inválido",
    password: "8 caracteres, letras y números",
    confirm: "Las contraseñas deben coincidir",
    edad: "Edad mínima 18",
    telefono: "Al menos 7 dígitos sin símbolos",
    direccion: "Dirección con mínimo 5 caracteres y un espacio",
    ciudad: "Ciudad mínimo 3 caracteres",
    cp: "Código postal mínimo 3 caracteres",
    dni: "DNI debe tener 7 u 8 dígitos"
  };

  function showError(field) {
    var small = field.nextElementSibling;
    small.textContent = messages[field.id];
    field.className += ' invalid';
  }

  function clearError(field) {
    var small = field.nextElementSibling;
    small.textContent = '';
    field.className = field.className.replace(' invalid', '');
  }

  for (var key in fields) {
    if (fields.hasOwnProperty(key)) {
      (function (f, k) {
        f.addEventListener('blur', function () {
          if (!validators[k](f.value)) {
            showError(f);
          }
        });
        f.addEventListener('focus', function () {
          clearError(f);
        });
      })(fields[key], key);
    }
  }

fields.fullname.addEventListener('input', function () {
  var nombre = fields.fullname.value.toUpperCase();
  greeting.textContent = nombre.trim() === '' ? 'HOLA' : 'HOLA ' + nombre;
});


  fields.fullname.addEventListener('focus', function () {
    var nombre = fields.fullname.value.toUpperCase();
    if (nombre.trim() === '') {
      greeting.textContent = 'HOLA';
    } else {
      greeting.textContent = 'HOLA ' + nombre;
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    var data = {};

    for (var k in fields) {
      if (fields.hasOwnProperty(k)) {
        var f = fields[k];
        data[k] = f.value;
        if (!validators[k](f.value)) {
          showError(f);
          valid = false;
        }
      }
    }

   if (!valid) {
      var errores = Object.keys(fields)
        .filter(k => !validators[k](fields[k].value))
        .map(k => `${k}: ${messages[k]}`)
        .join('\n');
      alert("Errores detectados:\n\n" + errores);
    } else {
      alert("¡Enviado!\n\n" + JSON.stringify(data, null, 2));
      form.reset();
      greeting.textContent = "HOLA";
    }
    });


  const menuBtn = document.querySelector(".menu");
      const navMenu = document.querySelector(".nav ul");

      menuBtn.addEventListener("click", function () {
        navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
      });
};

