$('#Contenedor').html("<img src='https://i.gifer.com/ZaiM.gif' width='90px'><span>Cargando ..</span>");

    


$('#gridActividades').removeClass("scroll-y");

$.get('dwr/interface/departamentosServicio.js');
$.get('dwr/interface/clientesServicio.js');
$.get('dwr/interface/proyectosServicio.js');
$.get('dwr/interface/centroDeCostosServicio.js');
$.get('dwr/interface/tipoTareasServicio.js');
$.get('dwr/interface/cartasServicio.js');
$.get('dwr/interface/funcionalidadesServicio.js');
$.get('dwr/interface/categoriaActividadesServicio.js');
$.get('dwr/interface/hojasInstalacionesServicio.js');
$.get('dwr/interface/faseImplementacionServicio.js');
$.get('dwr/interface/programadoresPorCartasServicio.js');
$.get('dwr/interface/estimacionesServicio.js');
$.get('dwr/interface/camposActividadesServicio.js');
$.get('dwr/interface/registroActividadesServicio.js');
$.get('dwr/interface/actividadesServicio.js');
$.get('dwr/interface/tieneAmbientesServicio.js');
$.get('dwr/interface/ambientesServicio.js');

var vm_clientes_safi =[];
var vm_listaDepart_safi =[];
var vm_departamento_safi=0;
var vm_tipo_tarea = [];
var vm_ambiente_safi =[];
var vm_centrocosto_safi=[];
var vm_categorias_safi=[];
var vm_proyectos_safi=[];
var vm_listaActividades = new Map();
var vm_listaFechasHoras = '';

function vk_carga_SACE_Captura(){

    // CLIENTES DE SAFI  ---------------------------------------------------------------------------------------------------
    clientesServicio.listaClientes({clienteID:0},2, { async: false, callback: function(cliente){
            if(cliente!=null){
                vm_clientes_safi= cliente;
            }
    }});


    departamentosServicio.listaDepartamento(null,1,{ async: false, callback: function(departamento){
        if(departamento!=null){
            
            vm_listaDepart_safi=departamento;
        }
    }});

    // DEPARTAMENTO DEL ROL  ---------------------------------------------------------------------------------------------------

    var vm_deptoBean = {
                    'deptoID':  0,
                    'rolID':    parametroBean.perfilUsuario
    }
    departamentosServicio.consultaDepartamentos(vm_deptoBean,2,{ async: false, callback: function(depto){
        if(depto!=null){
            vm_departamento_safi = depto.deptoID;
        }
    }});

    // TIPOS DE TAREA POR DEPARTAMENTO  ---------------------------------------------------------------------------------------------------
    var tipoTareasBean = {
            'clave':        '',
            'descripcion':      '',
            'deptoID' :     vm_departamento_safi
    }

    /* Ejecución de la lista para el tipo de tarea para el combo correspondiente. */
    tipoTareasServicio.tipoTareasLista(tipoTareasBean,2, { async: false, callback: function(tipoTareas){
        if(tipoTareas!=null){
            vm_tipo_tarea=tipoTareas;
        }
    }});


    // AMBIENTES DEL SISTEMA  ---------------------------------------------------------------------------------------------------
    var vm_ambienteBean = {
            'ambiente':         ''
        }
    // Ejecución de la lista para los ambientes para el combo correspondiente.
    ambientesServicio.listasAmbiente(vm_ambienteBean,1,{ async: false, callback: function(ambiente){
        if(ambiente!=null){         
            vm_ambiente_safi=ambiente;
        }
    }});

    // CENTRO DE COSTOS  ---------------------------------------------------------------------------------------------------
    var vm_centroCostosBean = {
            'clave':        '',
            'nombre':       '',
            'deptoID':      vm_departamento_safi
        }

    /* Ejecución de la lista del centro de costos para el combo correspondiente. */
    centroDeCostosServicio.centroDeCostosLista(vm_centroCostosBean,2, { async: false, callback: function(centroCostos){
        if(centroCostos!=null){
            vm_centrocosto_safi=centroCostos;
        }
    }});

    // CATEGORIA DE ACTIVIDADES  ---------------------------------------------------------------------------------------------------

    var vm_categoriaBean = {
            'descripcion'   : '',
            'deptoID'       : vm_departamento_safi
        }

    /* Ejecución de la lista para las categorías para el combo correspondiente. */
    categoriaActividadesServicio.categoriaActividadesLista(vm_categoriaBean,2, { async: false, callback: function(categoria){
        if(categoria!=null){
            vm_categorias_safi=categoria;
        }
    }});

    var vm_proyectoBean = {
            'clave':        '',
            'descripcion':  '',
            'deptoID':      vm_departamento_safi
    }

    /* Ejecución de la lista para los proyectos para el combo correspondiente. */
    proyectosServicio.listaProyectos(vm_proyectoBean,2, { async: false, callback: function(proyectos){
        if(proyectos!=null){
            vm_proyectos_safi=proyectos;
        }
    }});

  


    var vm_formulario = `
    <div id="captura_actividad">
    <div class="col-sm-8">
        <div class="panel panel-primary">
             <div class="panel-heading">  <div class="btn-group pull-right"> <a class="btn btn-primary btn-sm" href="#footwear"  data-toggle="collapse" aria-expanded="false" aria-controls="footwear"><i class="glyphicon glyphicon-collapse-down  
    "></i></a></div><h4>Nueva Actividad</h4></div>
             <div class="panel-body" style="min-height: 236px;">

                     <div class="form-group col-sm-12">
                        <label>Descripción:</label>
                        <textarea id="vm_descripcion" class="form-control"></textarea>
                    </div>


                    <div class="form-group col-sm-4">
                        <label>Ambiente:</label>
                        <select id="vm_ambiente" class="form-control"><option value="">SELECCIONAR</option></select>
                    </div>
                    
                    <div class="form-group col-sm-4">
                        <label>Cliente:</label>
                        <select id="vm_cliente" class="form-control"><option value="">SELECCIONAR</option></select>
                    </div>
                    
                    <div class="form-group col-sm-4">
                        <label>Tipo Tarea:</label>
                        <select id="vm_tipotarea" class="form-control"><option value="">SELECCIONAR</option></select>
                    </div>

                 

                    <div id="div_vm_numticket" class="form-group col-sm-4">
                        <label>Ticket:</label>
                        <input id="vm_numticket" class="form-control"></input>
                    </div>
                    <div class="clearfix"></div>
                    <div class="collapse" id="footwear">

                         <div class="form-group col-sm-4">
                            <label>Departamento:</label>
                            <select id="vm_departamento" class="form-control"><option value="">SELECCIONAR</option></select>
                        </div>

                        <div class="form-group col-sm-4">
                            <label>Proyecto:</label>
                            <select id="vm_proyecto" class="form-control"><option value="">SELECCIONAR</option></select>
                        </div>

                        <div class="form-group col-sm-4">
                            <label>Facturable:</label>
                            <select id="vm_facturable" class="form-control"><option value="">SELECCIONAR</option></select>
                        </div>

                        <div class="form-group col-sm-4">
                            <label>Centro de Costo:</label>
                            <select id="vm_centrocosto" class="form-control"><option value="">SELECCIONAR</option></select>
                        </div>

                    </div>

                   
                    </div>
                        <div class="panel-footer">
                            <div class="pull-left">
                                <button class="btn btn-primary botonDeshabilitado submit submit:hover" onclick="vk_validaCierreTotalActividades()()">Cerrar todas las actividades</button>
                            </div>
                            <div class="pull-right">
                                 <button class="btn btn-primary" id="vm_enviaTarea" onclick="vm_EnviaTarea()">Registrar</button>
                            </div>
                             <div class="clearfix">
                        </div>
                    </div>
            </div>
        </di>
    </div>
    <div class="col-sm-4">
    <div class="panel panel-primary">
         <div class="panel-heading">
            <div class="col-sm-6">
            <h4>Progreso</h4>
            </div>
             <div class="col-sm-6">
            <select class="form-control" id="vk_seleccion_grafica" onchange="vk_cambia_grafica()">
                <option value="0"> ACTUAL</option>
                <option value="144"> BDIAZ</option>
                <option value="105"> KGALLEGOS</option>
                <option value="131"> JPECH</option>
                <option value="122"> IRAMIREZ</option>
            </select>
            </div>
            <div class="clearfix"/>
        </div>
         <div class="panel-body" id="vk_divProgreso">
         </div>
         <div class="panel-footer">
            <button class="btn btn-primary botonDeshabilitado submit submit:hover" onclick="vk_actualizaProgreso()">Actualiza Progreso:</button>
         </div>
    </div>
    </div>
    <div class="clearfix"/>
    <div id="lista_actividad" style="padding:15px;background:white;overflow:auto;">
    </div>
    `;

    $('#captura_actividad').remove();
    //$('.panel-body').prepend(vm_formulario);
    $('#Contenedor').html(vm_formulario);

    consultaMenuLateral(5, 2);

    dwr.util.removeAllOptions('vm_ambiente'); 
    dwr.util.removeAllOptions('vm_cliente'); 
    dwr.util.removeAllOptions('vm_tipotarea'); 

    dwr.util.addOptions('vm_ambiente', {'':'SELECCIONAR'});
    dwr.util.addOptions('vm_ambiente', {'0':'SIN AMBIENTE'});
    dwr.util.addOptions('vm_tipotarea', {'':'SELECCIONAR'});
    dwr.util.addOptions('vm_cliente', {'':'SELECCIONAR'});

    dwr.util.addOptions('vm_ambiente', vm_ambiente_safi, 'ambienteID', 'ambiente');
    dwr.util.addOptions('vm_tipotarea', vm_tipo_tarea, 'tipoTareaID', 'nombre');
    dwr.util.addOptions('vm_cliente', vm_clientes_safi, 'clienteID', 'nombre');

    dwr.util.removeAllOptions('vm_departamento');
    dwr.util.removeAllOptions('vm_proyecto');
    dwr.util.removeAllOptions('vm_facturable');
    dwr.util.removeAllOptions('vm_centrocosto');

    dwr.util.addOptions('vm_departamento', {'':'SELECCIONAR'});
    dwr.util.addOptions('vm_proyecto', {'':'SELECCIONAR'});
    dwr.util.addOptions('vm_facturable', {'':'SELECCIONAR'});
    dwr.util.addOptions('vm_centrocosto', {'':'SELECCIONAR'});

    dwr.util.addOptions('vm_departamento', vm_listaDepart_safi, 'deptoID', 'nombre');
    dwr.util.addOptions('vm_proyecto', vm_proyectos_safi, 'proyectoID', 'descripcion');
    dwr.util.addOptions('vm_facturable', {'S':'SI'});
    dwr.util.addOptions('vm_facturable', {'N':'NO'});
    dwr.util.addOptions('vm_centrocosto', vm_centrocosto_safi, 'centroCostoID', 'nombre');


    $('#vm_departamento').val(vm_departamento_safi);
    $('#vm_proyecto').val(1);
    $('#vm_facturable').val('N');
    $('#vm_centrocosto').val('7');
    $('#vm_ambiente').val('0');
    $('#vm_tipotarea').val('0');
    $('#vm_cliente').val('5');

    setTimeout(function(){$('#vm_descripcion').focus();},3000);

    $('#vm_ambiente').change(function(){
        dwr.util.removeAllOptions('vm_cliente'); 
        dwr.util.addOptions('vm_cliente', {'':'SELECCIONAR'});
        cargaClienteAmbiente($('#vm_ambiente').val());
    });

    $('#div_vm_numticket').hide();

    $('#vm_tipotarea').change(function(){
        if($('#vm_tipotarea').val() == "39"){
            $('#vm_numticket').val('');
            $('#div_vm_numticket').show();
        }else{
            $('#vm_numticket').val('');
            $('#div_vm_numticket').hide();
        }
    });

    vk_recargaListaActividades();
 
}// end funcion carga inicial



function vm_EnviaTarea(){
//$('#vm_enviaTarea').click(function(){
    deshabilitaBoton('vm_enviaTarea')

    var vm_ambiente = $('#vm_ambiente').val();
    var vm_cliente = $('#vm_cliente').val();
    var vm_tipotarea = $('#vm_tipotarea').val();
    var vm_descripcion = $('#vm_descripcion').val();
    var vm_numticket = $('#vm_numticket').val();

    if(vm_ambiente == ""){
        sweetAlert(constantes.CADENA_VACIA,"Seleccione un ambiente","warning");

        habilitaBoton('vm_enviaTarea');
        return false;
    }

    if(vm_cliente == ""){
        sweetAlert(constantes.CADENA_VACIA,"Seleccione un cliente","warning");
        habilitaBoton('vm_enviaTarea');
        return false;
    }

    if(vm_tipotarea == ""){
        sweetAlert(constantes.CADENA_VACIA,"Seleccione un tipo de tarea","warning");
        habilitaBoton('vm_enviaTarea');
        return false;
    }

    if(vm_descripcion == ""){
        sweetAlert(constantes.CADENA_VACIA,"Ingrese una descripcion","warning");
        habilitaBoton('vm_enviaTarea');
        return false;
    }

    var datos = {
        usuarioID:parametroBean.numeroUsuario,
        fechaCreacion: parametroBean.fechaAplicacion,
        actividadID:'' ,
        cartaID:'' ,
        ambienteID: vm_ambiente,
        numeroTicket:'' ,
        deptoID: '3',
        clienteID: vm_cliente,
        categoria: '',
        proyectoID: '1',
        tipoTareaID: vm_tipotarea,
        otroTipoTarea:'' ,
        facturable: 'N',
        centroCostoID: '4',
        contacto: 'N/A',
        faseImplement: '',
        descripcion: vm_descripcion,
        tipoTransaccion: '1',
        funcionalidadID: ''
    };

    $.post('/Efisys/actividadesAltaVista.htm',datos,function(response){

        $('#vm_ambiente').val('');
        $('#vm_cliente').val('');
        $('#vm_tipotarea').val('');
        $('#vm_descripcion').val('');
        $('#vm_numticket').val('');
        $('#div_vm_numticket').hide();
        habilitaBoton('vm_enviaTarea');


        var param = {
            'usuarioID':    parametroBean.numeroUsuario,
            'tipoLista':    numListaActividades.activPorUsuario,
            'descripcion':  $('#buscarActividad').val()
        };

        vk_recargaListaActividades();

        /*$.post("actividadesGrid.htm", param, function(actividadesGrid){     
            if(actividadesGrid.length > 0) {
                $('#gridActividades').html(actividadesGrid);
                $('#gridActividades').show();
            }
        });*/
    });

//});
}


function cargaClienteAmbiente(numCliente){
    var listaClientes = [];
    for (var i = 0; i < vm_clientes_safi.length; i++) {
        //if(vm_clientes_safi[i].ambienteID == numCliente ){
            listaClientes.push(vm_clientes_safi[i])
       // }
    }

    dwr.util.addOptions('vm_cliente', listaClientes, 'clienteID', 'nombre');

}


function sumaTiempos(val1,tiempo){
    
    t1=val1;
    t2=tiempo;

    var nuevaHora = '';
 
    var dot1 = t1.split(":");
    var dot2 = t2.split(":");

    var h1 = dot1[0];
    var h2 = dot2[0];

    var m1 = dot1[1];
    var m2 = dot2[1];

    var s1 = dot1[2];
    var s2 = dot2[2];


    var sRes = (Number(s1) + Number(s2));
    var mRes = (Number(m1) + Number(m2));
    var hRes = (Number(h1) + Number(h2));
    var addMin = 0;
    var addHour = 0;
    

    if(sRes >= 60 ){
        addMin = Math.floor(sRes/60);
        sRes   = sRes % 60;
    }

    mRes = mRes + addMin;

    if(mRes >= 60 ){
        addHour = Math.floor(mRes/60);
        mRes   = mRes % 60;
    }

    hRes = hRes + addHour;

   nuevaHora = (hRes < 10 ? '0' : '') + hRes + ':' + ( mRes < 10 ? '0' : '') + mRes + ':' +  ( sRes < 10 ? '0' : '' )+ sRes;
 

    

    return nuevaHora;
    
}
 




function calculaHorasDia(){

    var param = {
                'usuarioID':    parametroBean.numeroUsuario,
                'tipoLista':   2,
                'descripcion':  $('#buscarActividad').val()
    };

    actividadesServicio.actividadesLista(param,2,function(vm_actividades){
        var horas ='00:00:00';
        for (var i = 0; i < vm_actividades.length; i++) {
            horas = sumaTiempos(horas,vm_actividades[i].numeroHoras);
            
        }

        $('#vm_horasdia').html(horas);
        
        return horas;
    })

}

function vk_sumarDias(fecha, dias){
  var vk_fecha = new Date(fecha+" 00:00:01");
  vk_fecha.setDate(vk_fecha.getDate() + dias);
  return vk_fecha.getFullYear()+"-"+(vk_fecha.getMonth < 9 ? '0':'')+(vk_fecha.getMonth()+1)+"-"+(vk_fecha.getDate()<10?'0':'')+vk_fecha.getDate();
}

function vk_restarDias(fecha, dias){
  var vk_fecha = new Date(fecha+" 00:00:01");
  vk_fecha.setDate(vk_fecha.getDate() - dias);
  return vk_fecha.getFullYear()+"-"+(vk_fecha.getMonth < 9 ? '0':'')+(vk_fecha.getMonth()+1)+"-"+(vk_fecha.getDate()<10?'0':'')+vk_fecha.getDate();
}



function vk_nombreDelDiaSegunFecha(fecha){
    
    return [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ][new Date(fecha+' 00:00:10').getDay()];

}

function vk_fechaText(fecha){

    var diaTxt = vk_nombreDelDiaSegunFecha(fecha);
    var fechaDate = new Date(fecha+' 00:00:10');

    var meses =[
        'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
    ]

    var mesTxt = meses[fechaDate.getMonth()];
    var diaDate = (fechaDate.getDate() < 10 ? '0':'' ) + fechaDate.getDate();

    return diaDate +' ' + mesTxt + ', ' +diaTxt  ;
}

function vk_porcentajeProgreso(horas,fecha){
    var numHoras = horas.substring(0,2);
    var numMinutos = horas.substring(3,5);
    var diaSem = new Date(fecha+' 00:00:10').getDay();
    var horasDia = diaSem == 6 ? 5 : 8;
    var vk_adicional = parseInt(numMinutos)/60;

    var vk_porcentaje = (parseInt(numHoras)+vk_adicional)/horasDia*100;

    return parseInt(vk_porcentaje);
}


function vk_actualizaProgreso(usuarioID_con){
$('#vk_seleccion_grafica option[value="0"]').html(parametroBean.claveUsuario.toUpperCase());
var fechaAnterior = vk_restarDias(parametroBean.fechaAplicacion,6);
if(typeof usuarioID_con == 'undefined'){
    usuarioID_con = parametroBean.numeroUsuario;
    $('#vk_seleccion_grafica').val(0);
}

if( usuarioID_con == '0'){
    usuarioID_con = parametroBean.numeroUsuario;
}

var vk_objConsulta= { actividadID:0, 
                      usuarioID:usuarioID_con, 
                      fechaInicio:fechaAnterior, 
                      fechaFin:parametroBean.fechaAplicacion}

registroActividadesServicio.registroActividadesLista(vk_objConsulta,4,function(response){
    var vk_tablaProgreso = `
        <table class="table table-condensed table-hover table-bordered" style="margin-bottom: 0px;">
            <thead>
                <th>Día</th><th>Horas</th><th>Progreso</th>
            </thead>
            <tbody>`;

    for (var i = 0; i < response.length; i++) {
        vk_tablaProgreso = vk_tablaProgreso + '<tr><td>'+vk_fechaText(response[i].fechaInicio)
                +'</td><td>'+response[i].numeroHoras
                +'</td><td><div class="progress" style="margin-bottom: 0px;"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: '+vk_porcentajeProgreso(response[i].numeroHoras,response[i].fechaInicio)+'%">'
                + '<span class="">'+vk_porcentajeProgreso(response[i].numeroHoras,response[i].fechaInicio)+'%</span></div></div>'
                +'</td></tr>';
    }

    vk_tablaProgreso = vk_tablaProgreso + '</tbody></table> ';

    $('#vk_divProgreso').html(vk_tablaProgreso);
});

}

setTimeout(function(){
    vk_actualizaProgreso();
},2000);

function vk_cambia_grafica(){
    vk_actualizaProgreso($('#vk_seleccion_grafica').val())
}

function vk_validaCierreTotalActividades(){
    swal({ 
        title: "Finalizar",   
        text: "¿Está usted seguro que desea finalizar todas las actividades?",   
        type: "warning",   
        showCancelButton: true,   
        cancelButtonText: "Cancelar",   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Finalizar",  
        closeOnConfirm: false }, 
            /* Función en caso de aceptar. */
        function(){

            vk_cerrarTodas();

        });
}

function vk_cerrarTodas(){
    var total_exitosas = 0;
    var total_error = 0;
    $('[data-original-title="Iniciar"]').each(function(pos,actividad){
        var actividadID = $(actividad).attr('ID');
         actividadID = actividadID.replace('I','');
        var actividadBean = {
                'actividadID'   :   actividadID
        };

        actividadesServicio.actividadesTransaccion(actividadBean,8,{ async: false, callback: function (actividad){
                if(actividad.numero == constantes.ENTERO_CERO){
                    total_exitosas+=1;
                }else{
                    total_error+=1;
                }
        }});

    });

    sweetAlert(constantes.CADENA_VACIA,"Se han terminado las actividades - exitosas: "+total_exitosas+", fallidas: "+total_error,"success");
    vk_recargaActividades();
}



function cierreActividad(par_ActividadID) {
    var var_numeroHoras;
    var actividadBean = {
            'actividadID'   :   par_ActividadID
    };

    actividadesServicio.consultaActividades(actividadBean,numConsultaActividad.principal,{ async: false, callback: function(actividad){
        if(actividad!=null){
            var_numeroHoras = actividad.numeroHoras;
        }
    }});

    swal({ 
        title: "Finalizar",   
        text: "¿Está usted seguro que desea finalizar la activiadad con un total de "+var_numeroHoras+" horas?",   
        type: "warning",   
        showCancelButton: true,   
        cancelButtonText: "Cancelar",   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Finalizar",   
        closeOnConfirm: false }, 
            /* Función en caso de aceptar. */
        function(){

            /* Ejecución de la transacción. */
            actividadesServicio.actividadesTransaccion(actividadBean,8,{ async: false, callback: function (actividad){
                /* Se muestra el mensaje correspondiente. */
                if(actividad.numero == constantes.ENTERO_CERO){
                    sweetAlert(constantes.CADENA_VACIA,"La actividad se ha finalizado exitosamente.","success");
                }else{
                    sweetAlert("Error: "+actividad.numero,"Mensaje: "+actividad.descripcion,"warning");
                }
            }});

            vk_recargaActividades();

        });
}

function vk_recargaActividades(){
    var param = {
                'usuarioID':    parametroBean.numeroUsuario,
                'tipoLista':    numListaActividades.activPorUsuario,
                'descripcion':  $('#buscarActividad').val()
            };

            $.post("actividadesGrid.htm", param, function(actividadesGrid){     
                if(actividadesGrid.length > 0) {
                    $('#gridActividades').html(actividadesGrid);
                    $('#gridActividades').show();
                }
            });
}

function vk_cerrarActividad(actividadID){
    swal({
      title: "Cerrar Actividad",
      text: "¿Confirmas que deseas cerrar la activiadad?",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si, cerrar!",
      cancelButtonText: "Cancelar",
      imageUrl: "https://media4.giphy.com/media/l3vReH0vUdPOatiBa/200w.gif?cid=6c09b952kdb770c41t3bylsdwo07ov42ue9to78pvp5cv4zn&ep=v1_gifs_search&rid=200w.gif&ct=g",
      closeOnConfirm: true
    },
    function(){
      var actividadbean={actividadID:actividadID};
      actividadesServicio.actividadesTransaccion(actividadbean,8,function(respuesta){
            console.log(respuesta);
            vk_recargaListaActividades();
            vk_actualizaProgreso();

        });
    });
}

function vk_sumaTiempoAct(actividadID,tiempo,fechaHoras){
    var datosTime = {
    fechaInicio: $('#'+fechaHoras).val(),
    numeroHoras: tiempo+':00',
    clave:'', 
    actividadID: actividadID,
    usuarioID: parametroBean.numeroUsuario,
    tipoTransaccion: 1
    }

    $.post('http://159.54.129.44:8080/Efisys/registroActividadesAltaVista.htm',datosTime,function(respuesta){
        console.log(respuesta);
        vk_recargaListaActividades();
        vk_actualizaProgreso();

    });
}

function vk_generaListaFechas(){
    vm_listaFechasHoras = '';
    const meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const dias = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

    var currentDateObj = new Date();
    var textoFecha = currentDateObj.getFullYear()+"-"+meses[currentDateObj.getMonth()]+"-"+dias[currentDateObj.getDate()-1];
    console.log(currentDateObj);
    vm_listaFechasHoras = vm_listaFechasHoras + `<option value="${textoFecha}">${textoFecha}</option>`;

    for(var numdia=1;numdia<10;numdia++){
        var numberOfMlSeconds = currentDateObj.getTime();
        var addMlSeconds = 60 * 60000 * 24;
        currentDateObj = new Date(numberOfMlSeconds - addMlSeconds);
        console.log(currentDateObj);
        textoFecha = currentDateObj.getFullYear()+"-"+meses[currentDateObj.getMonth()]+"-"+dias[currentDateObj.getDate()-1];

        vm_listaFechasHoras = vm_listaFechasHoras + `<option value="${textoFecha}">${textoFecha}</option>`;
    }

    console.log(vm_listaFechasHoras)
    
}
vk_generaListaFechas();


function vk_recargaListaActividades(){
    var vk_actividadesbean =  {
        descripcion:'%%',
        usuarioID:parametroBean.numeroUsuario
    }
// actividadesServicio.consultaActividades({actividadID:"110985"},1,function(respuesta){console.log(respuesta)});

    var tabla_Actividades = `
        <table class="table table-bordered table-hover col-md-12">
            <thead>
                <th>Descripción</th><th>Ambiente</th><th>Cliente</th><th>Tipo Tarea</th> <th>Fecha Creación</th><th>Horas</th><th></th><th></th>
            </thead>
        <tbody>
    `;

    vm_listaActividades = new Map();
    vk_lista_rep = [];
    actividadesServicio.actividadesLista(vk_actividadesbean,2,{ async: false, callback: function(datos){
        console.log(datos)
        if(datos){
            for(var con=0;con<datos.length;con++){
                let datos_row = datos[con];
                let actividadBean =  vk_consultaActividad(datos_row.actividadID);
                vm_listaActividades.set(actividadBean.actividadID,actividadBean);
                vk_lista_rep.push(actividadBean);
                tabla_Actividades+=`<tr><td id="act_${actividadBean.actividadID}"><textarea id="vm_descripcion_grid_${actividadBean.actividadID}" class="form-control" style="width: 400px; height: 59px;"> ${actividadBean.descripcion}</textarea></td>
                                        <td><select style="width: 140px;" id="vm_ambiente_grid_${actividadBean.actividadID}" class="form-control"></select>  </td> 
                                        <td><select style="width: 180px;" id="vm_cliente_grid_${actividadBean.actividadID}" class="form-control"></select></td>
                                        <td><select style="width: 170px;" id="vm_tipotarea_grid_${actividadBean.actividadID}" class="form-control"></select></td>
                                        <td style="text-align: center;vertical-align: middle;"><div style="width: 100px">${actividadBean.fechaCreacion}</div></td>
                                        <td style="text-align: center;vertical-align: middle;"><div class="" style="font-size:1.1em">${actividadBean.numeroHoras}&#32;&#32;<i class="glyphicon glyphicon-time"></i></div></td>
                                        
                                        <td>
                                            <select id="vk_fechaHoras${actividadBean.actividadID}" style="padding: 3px 10px;width:100%;margin-bottom:4px">${vm_listaFechasHoras}</select><br>
                                            <button class="btn btn-sm btn-primary tooltip-top" onclick="vk_sumaTiempoAct(${actividadBean.actividadID},'00:15','vk_fechaHoras${actividadBean.actividadID}')"><b><i class="glyphicon glyphicon-plus-sign"></i>&#32;15</b></button>
                                            <button class="btn btn-sm btn-primary tooltip-top" onclick="vk_sumaTiempoAct(${actividadBean.actividadID},'00:30','vk_fechaHoras${actividadBean.actividadID}')"><b><i class="glyphicon glyphicon-plus-sign"></i>&#32;30</b></button>
                                            <button class="btn btn-sm btn-primary tooltip-top" onclick="vk_sumaTiempoAct(${actividadBean.actividadID},'01:00','vk_fechaHoras${actividadBean.actividadID}')"><b><i class="glyphicon glyphicon-plus-sign"></i>&#32;60</b></button>
                                        </td>
                                        <td style="text-align: center;vertical-align: middle;"><button class="btn btn-sm btn-danger tooltip-top" onclick="vk_cerrarActividad(${actividadBean.actividadID})" style="padding: 7px 13px;"><i class="glyphicon glyphicon-trash"></i></button></td>
                                        </tr> `;
            }
        }

        
    }});

    tabla_Actividades+=` </body></table><div class="clearfix"/> `;

    $('#lista_actividad').html(tabla_Actividades);

    for(var con=0;con<vk_lista_rep.length;con++){
        let datos_row = vk_lista_rep[con];
        vk_pintaComboAmbiente(datos_row.actividadID,datos_row.ambienteID);
        vk_pintaComboCliente(datos_row.actividadID,datos_row.clienteID);
        vk_pintaComboTipoTarea(datos_row.actividadID,datos_row.tipoTareaID);
               
    }


}

function vk_consultaActividad(actividadID){
    var datosActividad = {};
    actividadesServicio.consultaActividades({actividadID:actividadID},1,{ async: false, callback: function(respuesta){
        datosActividad = respuesta;
    }});

    return datosActividad;
}

function vk_pintaComboAmbiente(actividadID,ambienteID){
    dwr.util.removeAllOptions('vm_ambiente_grid_'+actividadID); 
    dwr.util.addOptions('vm_ambiente_grid_'+actividadID, {'0':'SIN AMBIENTE'});
    dwr.util.addOptions('vm_ambiente_grid_'+actividadID, vm_ambiente_safi, 'ambienteID', 'ambiente');

    $('#vm_ambiente_grid_'+actividadID).val(ambienteID);
}

function vk_pintaComboCliente(actividadID,clienteID){
    dwr.util.removeAllOptions('vm_cliente_grid_'+actividadID); 
    //dwr.util.addOptions('vm_cliente_grid_'+actividadID, {'0':'SIN CLIENTE'});
    dwr.util.addOptions('vm_cliente_grid_'+actividadID, vm_clientes_safi, 'clienteID', 'nombre');

    $('#vm_cliente_grid_'+actividadID).val(clienteID);
    console.log("PintCli: "+clienteID);
}

function vk_pintaComboTipoTarea(actividadID,tipoTareaID){
    dwr.util.removeAllOptions('vm_tipotarea_grid_'+actividadID); 
    dwr.util.addOptions('vm_tipotarea_grid_'+actividadID, vm_tipo_tarea, 'tipoTareaID', 'nombre');

    $('#vm_tipotarea_grid_'+actividadID).val(tipoTareaID);
}


setTimeout(function(){
vk_carga_SACE_Captura();
},2000);