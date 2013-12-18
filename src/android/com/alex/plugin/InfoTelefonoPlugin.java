package com.alex.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.telephony.TelephonyManager;
import android.util.Log;

public class InfoTelefonoPlugin extends CordovaPlugin {

		public static final String OBTENER_INFO_ACCION = "OBTENER_INFO_ACCION";
		
		public boolean execute(String action, JSONArray args, CallbackContext ctx) throws JSONException {
			
			boolean resultado = false;
			try {
				if(OBTENER_INFO_ACCION.equals(action) == true) {
					JSONObject jsonSuccess = this.obtenerInfoTelefonoImpl();
					//Esta línea de abajo pasa el resultado de java a javascript
					ctx.success(jsonSuccess);
					//La linea de arriba es la versión corta de la línea de abajo
					//ctx.sendPluginResult(new PluginResult(PluginResult.Status.OK,jsonSuccess));
				}else{
					throw new IllegalArgumentException(action+" no soportada");
				}
				
				resultado = true;
			} catch(Throwable exc){
				JSONObject jsonError = new JSONObject("{ \"mensaje\" : \"" + exc.getMessage() + "\"}");
				ctx.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,jsonError));
				Log.w(exc.getMessage(), exc);
			}
			
			return resultado;
		}

		private JSONObject obtenerInfoTelefonoImpl() throws JSONException {
			//super.cordova apunta al Activity que contiene el WebView que tiene el JS que me invoca (Plugin.java en este ejemplo)
			TelephonyManager manager = (TelephonyManager)super.cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
			String numero = manager.getLine1Number();//Esta llamada nos dice que según el operador devuelve cadena vacía
			String imei = manager.getDeviceId();
			String imsi = manager.getSubscriberId();//Identificador único en todo el planeta
			
			String jsonString = "{ 'numero' : '{0}', 'imei' : '{1}', 'imsi' : '{2}'}";
			jsonString = jsonString.replaceAll("'", "\"")
								   .replace("{0}",numero)
								   .replace("{1}",imei)
								   .replace("{2}",imsi);
			return new JSONObject(jsonString);
		
		}

}
