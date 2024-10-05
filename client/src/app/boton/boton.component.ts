import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css'],
})
export class BotonComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    this.loadScript();
    this.setupPayment();
  }

  setupPayment() {
    (window as any).data = {
      // Requerido. Email del establecimiento o Id/Class del elemento html que posee el valor
      PayboxRemail: 'dmorales@pagoplux.com',
      // Opcional. Email del usuario que realiza el pago o Id/Class del elemento html que posee el valor
      PayboxSendmail: 'test@test.com',
      // Rquerido. Nombre del usuario/cuenta PagoPlux o Id/Class del elemento html que posee el valor
      PayboxRename: 'dmorales',
      // Opcional. nombre de persona que realiza el pago o Id/Class del elemento html
      PayboxSendname: 'Test',
      // Requerido. Valor Base 0. Valor que no incluye impuesto
      PayboxBase0: '2.0',
      // Requerido. Valor Base 12. Valor que si incluye impuesto
      PayboxBase12: '10.0',
      // Requerido. Descripcion del pago o Id/Class del elemento html que posee el valor
      PayboxDescription: 'Descripcion del pago',
      // Opcional. Lenguaje del Paybox
      // Español: es | (string) (Paybox en español)
      // Ingles: us | (string) (Paybox en Ingles)
      PayboxLanguage: 'es',
      // Requerido. direccion del pago
      PayboxDirection: 'Loja',
      // Requerido. Teléfono del cliente.
      PayBoxClientPhone: '1234567890',
      // True -> produccion
      // False -> test
      PayboxProduction: false,
      // ===============================LOS SIGUIENTES PARAMETROS SOLO SE USA EN PAGOS RECURRENTES============================================
      // True -> en caso de realizar un pago recurrente almacena datos tarjeta
      // False -> si es pago normal
      PayboxRecurrent: false,
      // Id o nombre del plan registrado en el comercio en la plataforma de pagoplux (el nombre debe ser exacto)
      PayboxIdPlan: '',
      // true -> los cobros se realizan de manera automatica segun la frecuencia del plan asignado en PAGOPLUX
      // false -> los cobros se realizan mediante solicitud
      PayboxPermitirCalendarizar: false,
      // true -> El débito se realiza en el momento del pago
      // false -> El débito se realizará en la fecha de corte según el plan contratado
      PayboxPagoInmediato: true,
      // true -> si desea realizar un pago de prueba de 1$ y reverso del mismo de manera automática
      //         nota: PayboxPagoImediato debe ser igual false
      // false -> no se realizara ningún cobro de prueba
      PayboxCobroPrueba: false,
      // Valor de identificación de tarjetahabiente
      PayBoxClientIdentification: '',
      // Entorno de ejecución del botón de pagos valores: prod (ambiente de producción), sandbox (ambiente de pruebas)
      //<----ESTAS VARIABLES SE USAN PARA PAGOS RECURRENTES CON MONTO VARIABLES ---->
      PayboxAmountVariablePlan: false,
      /* Frecuencia del plan
        "SEM" SEMANAL
        "MEN" MENSUAL
        "BME" BIMESTRAL
        "TME" TRIMESTRAL
        "SME" SEMESTRAL
        "ANU" ANUAL
      */
      PayboxFrequencyPlan: 'MEN',
      // true ->tiene iva
      // false ->no tiene iva
      PayboxTieneIvaPlan: true,
      // La descripción del plan, no debe superar los 200 caracteres.
      PayboxDescriptionPlan: 'Descripcion plan',
      PayboxEnvironment: 'sandbox',
      // Se usa en TRUE cuando se necesita enlazar el paybox a un botón ya existente en el sitio del cliente, caso contrario FALSE o NULL
      PayboxPagoPlux: false,
      // Identificador del botón o elemento en el comercio del cliente
      PayboxIdElement: 'ButtonPaybox',
    };

    (window as any).onAuthorize = function (response: any) {
      // La variable response posee un Objeto con la respuesta de PagoPlux.
      if (response.status == 'succeeded') {
        // Pago exitoso response contiene la información del pago la cual puede
        // usarse para validaciones que depende del tipo de pago realizado
        console.log(response);
        // "amount": 7.00,
        // "deferred": 0,
        // "interest": ”SI”,
        // "interestValue": "0.23",
        // "amountWoTaxes": 7.00,
        // "taxesValue": 7.00,
        // "cardInfo": "XXXX XXXX XXXX 0000",
        // "cardIssuer": "VISA",
        // "cardType": "credit",
        // "clientID": "1003088679",
        // "clientName": "CRISTIAN BASTIDAS",
        // "fecha": "2020-08-26 09:40:46",
        // "id_transaccion": "6a574ae6-1",
        // "state": "PAGADO",
        // "token": "088021-200826-000019",
        // "tipoPago": "TARJETA"
      }
    };
  }

  loadScript() {
    const script = document.createElement('script');
    script.src = 'https://sandbox-paybox.pagoplux.com/paybox/index.js';
    script.id = 'payboxScript';
    document.head.appendChild(script);
  }
}
