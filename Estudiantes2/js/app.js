Vue.component('form-registro',{
    data(){
        return{
            documento:"",
            nombres:"",
            apellidos:"",
            telefono:"",
            correo:"",
            carrera:"",
            semestre:"",
        }
    },
    template:`
    <div class="container">
            <div class="col-md-1">
            <h1 class="font-weight-bold"> REGISTRO</h1>
            <label>Documento</label><input type="text" v-model="documento" placeholder='Ingrese un documento'><br><br>
            <label>Nombre</label><input type="text" v-model="nombres" placeholder='Ingrese los nombres'> <br><br>
            <label>Apellido</label><input type="text" v-model="apellidos" placeholder='Ingrese los apellidos'><br><br>
            <label>Telefono</label><input type="text" v-model="telefono" placeholder='Ingrese un telefono'><br><br>
            <label>Correo</label><input type="text" v-model="correo" placeholder='example@example.com'><br><br>
            <label>Carrera</label><input type="text" v-model="carrera" placeholder='Ingrese una carrera'><br><br>
            <label>Semestre</label><input type="text" v-model="semestre" placeholder='Numero de semestre'><br><br>
            <input type="button" value="Guardar" v-on:click="guardaEstudiante"  class="btn btn-info"><br><br>
            </div>  
    </div>
    `,
    methods:{
        guardaEstudiante(){
            const endpoint="http://localhost:8080/estudiante"
            const opciones={
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({documento:this.documento,nombres:this.nombres,apellidos:this.apellidos,telefono:this.telefono,correo:this.correo,carrera:this.carrera,semestre:this.semestre})
            }
            fetch(endpoint,opciones).then(async Response=>{
                this.datos= await Response.json();
                Swal.fire({
                    position: 'mid-end',
                    icon: 'success',
                    title: 'Guardado con exito',
                    showConfirmButton: false,
                    timer: 1500
                  });

                })
            }
     }

    
});
Vue.component('form-verestudiantes',{
    data(){
        return{
            documento:"",
            nombres:"",
            apellidos:"",
            telefono:"",
            correo:"",
            carrera:"",
            semestre:"",
            datos:{},
            datosconsulta:[],
            eliminarid:"",
            respuestaEliminar:false,
            buscarId:"",
            datos2:{},
            datos3:[],
            buscarN:"",
        }
    },
    template:`
    <div class="container">
            <h1 class="font-weight-bold"> VER ESTUDIANTES</h1>
            <input type="button" value="consultar" v-on:click="verEstudiantes" class="btn btn-success"><br>
            <label class="font-weight-bold" >Buscar por documento</label>
            <input type="text"  v-model="buscarId">
            <input type="submit" value="buscar" v-on:click="buscaId" class="btn btn-secondary">
            <label class="font-weight-bold" >Buscar por nombre</label>
            <input type="text"  v-model="buscarN">
            <input type="submit" value="buscar" v-on:click="buscaNombre" class="btn btn-secondary">

            <table class="table table-bordered">
                <thead>
                    <th class="font-weight-bold">Documento</th>
                    <th class="font-weight-bold">Nombres</th>
                    <th class="font-weight-bold">Apellidos</th>
                    <th class="font-weight-bold">Telefono</th>
                    <th class="font-weight-bold">Correo</th>
                    <th class="font-weight-bold">Carrera</th>
                    <th class="font-weight-bold">Semestre</th>
                </thead>
                <tbody>
                    <tr v-for='estudiante in datosconsulta'>
                        <td>{{ estudiante.documento}}</td>
                        <td>{{ estudiante.nombres}}</td>
                        <td>{{ estudiante.apellidos}}</td>
                        <td>{{ estudiante.telefono}}</td>
                        <td>{{ estudiante.correo}}</td>
                        <td>{{ estudiante.carrera}}</td>
                        <td>{{ estudiante.semestre}}</td>
                    </tr>
                    <tr>
                      <td>{{ datos2.documento}}</td>
                      <td>{{ datos2.nombres}}</td>
                      <td>{{ datos2.apellidos}}</td>
                      <td>{{ datos2.telefono}}</td>
                      <td>{{ datos2.correo}}</td>
                      <td>{{ datos2.carrera}}</td>
                      <td>{{ datos2.semestre}}</td>
                     </tr>
                     <tr v-for='estudiante in datos3'>
                        <td>{{ estudiante.documento}}</td>
                        <td>{{ estudiante.nombres}}</td>
                        <td>{{ estudiante.apellidos}}</td>
                        <td>{{ estudiante.telefono}}</td>
                        <td>{{ estudiante.correo}}</td>
                        <td>{{ estudiante.carrera}}</td>
                        <td>{{ estudiante.semestre}}</td>
                     </tr>

                </tbody>
            </table>
    </div>
    `,
    methods:{
        
        verEstudiantes(){
            this.datosconsulta="";
            this.datos2="";
            this.datos3="";
            const endpoint="http://localhost:8080/estudiante"
            const opciones={method:'GET'};

            fetch(endpoint,opciones).then(async Response=>{
                this.datosconsulta= await Response.json();
            })
        },
        buscaId(){
            this.datosconsulta="";
            this.datos2="";
            this.datos3="";
            const endpoint="http://localhost:8080/estudiante/buscar/"+this.buscarId;
            const opciones={method:'GET'};

            fetch(endpoint,opciones).then(async Response=>{
                this.datos2= await Response.json();
            })

        },
        buscaNombre(){
            this.datosconsulta="";
            this.datos2="";
            this.datos3="";
            const endpoint="http://localhost:8080/estudiante/buscarnombres/"+this.buscarN;
            const opciones={method:'GET'};

            fetch(endpoint,opciones).then(async Response=>{
                this.datos3= await Response.json();
            })
        }
    }

    
});
Vue.component('form-eliminar',{
    data(){
        return{
            documento:"",
            nombres:"",
            apellidos:"",
            telefono:"",
            correo:"",
            carrera:"",
            semestre:"",
            eliminarid:"",
            respuestaEliminar:false,
        }
    },
    template:`
    <div class="container">
              <h1 class="font-weight-bold">ELIMINAR ESTUDIANTE</h1>
              <label for="">Numero de documento</label>
              <input type="text" v-model="eliminarid">
              <input type="submit" value="ELIMINAR" v-on:click="EliminarEstudiante" class="btn btn-danger">
    </div>
    `,
    methods:{
        EliminarEstudiante(){
            const endpoint="http://localhost:8080/estudiante/borrar/"+this.eliminarid;
            const opciones={method:'DELETE'};

            fetch(endpoint,opciones).then(async Response=>{
                this.respuestaEliminar= await Response.json()
                alert("Estudiante eliminado");
            })
        }
    }
    
});

new Vue({
    el:"#app",
    data(){
        return{
            menu:0,
        }
    }

})