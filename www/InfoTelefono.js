//Con este cordova.define() definimos un módulo con nuestro código para usarlo desde otro sitio
cordova.define("com.alex.plugin.InfoTelefono", function(require,exports,module){
	
	/**
	 * 
	 * @param numero
	 * @param imei
	 * @param imsi
	 * @returns
	 */
	function InfoTelefono(numero,imei,imsi){
		this.numero=numero;
		this.imei=imei;
		this.imsi=imsi;
	}
	
	/**
	 * Aquí documentaríamos las propiedades del prototype 
	 * porque como JS permite construir el objeto sin definir 
	 * sus atributos en otro sitio, esto se hace por convención para que
	 * estén documentadas las propiedades
	 */
	InfoTelefono.prototype.numero = null;
	InfoTelefono.prototype.imei = null;
	InfoTelefono.prototype.imsi = null;

	//Aquí exportamos lo que queremos, ponemos el nombre de la función constructora para que desde fuera hagan un new InfoTelefono()
	module.exports = InfoTelefono;
});