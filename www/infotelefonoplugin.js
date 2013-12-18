cordova.define("com.alex.plugin.infotelefonoplugin", 
		
	function(require,exports,module){
		//Así cargamos un JS desde otro JS sin tener que hacerlo a través del HTML
		var exec = require('cordova/exec');
		var InfoTelefonoWinki = require('./InfoTelefono');
		
		var InfoTelefonoPlugin = function() {
			
		};
		
		InfoTelefonoPlugin.prototype.obtenerInfo = function(success, fail){
			//Esta línea ejecuta el código nativo de Java (InfoTelefonoPlugin.execute)
			exec(
				function(jsonJava){
					var resultado = new InfoTelefono();
					resultado.imei = jsonJava.imei;
					resultado.imsi = jsonJava.imsi;
					resultado.numero = jsonJava.numero;
					//Al haber creado esta funcion de arriba podemos procesar la respuesta de java aquí
					//En lugar de hacerlo en el lugar donde se ejecute el obtenerInfo(...)
					//Java lo que nos está devolviendo es un JSON en este ejemplo nuestro (desde InfoTelefonoPlugin.java)
					success(resultado);
				}, fail, 'InfoTelefonoPlugin', 'OBTENER_INFO_ACCION', []);//Esto último es el parámetro args del execute de Java pero como no usamos parámetros en este ejemplo es vacío
		};
		
		//Aquí exportamos lo que queremos, ponemos un new porque queremos devolver el objeto ya creado para que le hagan un obtenerInfo()
		module.exports = new InfoTelefonoPlugin();
	}
	
);