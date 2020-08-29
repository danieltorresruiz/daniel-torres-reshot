/**
 * Tamaño Hotel =>
 *      Pequeño hasta 10 habitaciones
 *      Mediano entre 10 y 25 habitaciones
 *      Grande mas de 25 habitaciones
 */
const HOTEL_HAB_PEQUENO = 10;
const HOTEL_HAB_GRANDE = 25;
const PRECIOS = ['PB', 'PM', 'PA', 'VIP'];
class Filtros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paises: ['todos', 'Argentina', 'Brasil', 'Chile', 'Uruguay', 'Colombia'],
            precios: ['todos', 'PB', 'PM', 'PA', 'VIP'],
            habitacion: ['todos', 'Hotel pequeño', 'Hotel mediano', 'Hotel grande']
        }
    }

    static obtenerFechaZonaHoraria(fechaInput) {
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const timeZone = Filtros.getTimeZone(now);
            const fechaHora = new Date(utc + 3600000 * timeZone);
            const anio = fechaInput.substring(0,4);
            const mes = parseInt(fechaInput.substring(5,7)) - 1;
            const dia = fechaInput.substring(8,10);
            return new Date(anio, mes, dia, fechaHora.getHours(), fechaHora.getMinutes(), fechaHora.getSeconds());
    }

    static getTimeZone(now) {
        const offset = now.getTimezoneOffset(), o = Math.abs(offset);
        return (offset < 0 ? "+" : "-") + ("" + Math.floor(o / 60)).slice(-2);
    }

    static obtenerFechaYYYYMMDD(timeDate) {
        const feentrada = new Date(timeDate);
        const anio = feentrada.getFullYear();
        const month = feentrada.getMonth() + 1;
        const mes = month < 10 ? '0'+month : month;
        const dia = feentrada.getDate() < 10 ? '0'+feentrada.getDate() : feentrada.getDate();
        return anio+''+mes+''+dia;
    }

    /*********************************************************************************
     *********** Bloque métodos de Filtrar *******************************************
     *********************************************************************************/

    static esTodos(valor) {
        return valor === 'todos';
    }

    static filtrarTamanoHabitacion(valor, hoteles) {
        if (this.esTodos(valor)) {
            return hoteles;
        }
        if (valor === 'Hotel pequeño') {
            return hoteles.filter(hotel => hotel.rooms <= HOTEL_HAB_PEQUENO);
        }
        if (valor === 'Hotel mediano') {
            return hoteles.filter(hotel => hotel.rooms > HOTEL_HAB_PEQUENO && hotel.rooms < HOTEL_HAB_GRANDE);
        }
        if (valor === 'Hotel grande') {
            return hoteles.filter(hotel => hotel.rooms >= HOTEL_HAB_GRANDE);
        }
    }

    static filtrarPrecio(valor, hoteles) {
        if (this.esTodos(valor)) {
            return hoteles;
        }
        const priceIndex = PRECIOS.findIndex(p => p === valor) + 1; 
        return hoteles.filter(hotel => hotel.price === priceIndex);
    }

    static validarDisponiblidadEntrada(fecha, availability) {
        const fechaSeleccionaba = this.obtenerFechaYYYYMMDD(fecha);
        const fechaHotel = this.obtenerFechaYYYYMMDD(availability);
        return fechaSeleccionaba >= fechaHotel;
    }

    static validarDisponiblidadSalida(fecha, availability, ) {
        const fechaSeleccionaba = this.obtenerFechaYYYYMMDD(fecha);
        const fechaHotel = this.obtenerFechaYYYYMMDD(availability);
        return fechaSeleccionaba <= fechaHotel;
    }

    /**
     * método que aplica para búsqueda con los input de select
     */
    static aplicarFiltros(opcion, valor, hoteles, filtros) {
        switch (opcion) {
            case 'pais':
                filtros.pais = valor;
                break;
            case 'precio':
                filtros.precio = valor;
                break;
            case 'habitacion':
                filtros.habitacion = valor;
                break;
            default:
                break;
        }
        return this.aplicarFiltrosConFecha(hoteles, filtros);
    }

    /**
     * método para búsqueda con los input date antes del filtrado final de los tipo lista
     */
    static aplicarFiltrosConFecha(hoteles, filtros) {
        let listaHoteles = [...hoteles];
        if (filtros.feentrada) {
            listaHoteles = listaHoteles.filter(hotel => {
                                return this.validarDisponiblidadEntrada(filtros.feentrada.valueOf(), hotel.availabilityFrom);
                            });
        }
        if (filtros.fesalida) {
            listaHoteles = listaHoteles.filter(hotel => {
                                return this.validarDisponiblidadSalida(filtros.fesalida.valueOf(), hotel.availabilityTo);
                           });
        }
        return this.filtrar(listaHoteles, filtros);
    }

    /**
     * método que aplica la búsqueda con valores de los listados
     */
    static filtrar(hoteles, filtros) {
        let listaHoteles = [...hoteles];
        if (filtros.pais) {
            listaHoteles = this.esTodos(filtros.pais) ? listaHoteles : listaHoteles.filter(hotel => hotel.country === filtros.pais);
        }
        if (filtros.precio) {
            listaHoteles = this.filtrarPrecio(filtros.precio, listaHoteles);
        }
        if (filtros.habitacion) {
            listaHoteles = this.filtrarTamanoHabitacion(filtros.habitacion, listaHoteles);
        }
        return listaHoteles;
    }

    /**
     * método que aplica la búsqueda con valores de los listados
     */
    InputLista(nombre) {
        let estilo = 'form-control input-select';
        let todos, filtro, opciones;
        switch (nombre) {
            case 'pais':
                todos = 'Todos los países';
                filtro = this.props.filtros.pais;
                opciones = this.state.paises;
                break;
            case 'precio':
                todos = 'Cualquier precio';
                filtro = this.props.filtros.precio;
                opciones = this.state.precios;
                break;
            case 'habitacion':
                todos = 'Cualquier tamaño';
                filtro = this.props.filtros.habitacion;
                opciones = this.state.habitacion;
                estilo = estilo.concat('2');
                break;
            default:
                break;
        }
        return (
            <select id={nombre} name={nombre} class={estilo}
                    onChange={this.props.handleSelect} value={filtro}>
                    {
                        opciones.map(opcion =>
                            <option value={opcion}>{this.nombreOpcion(opcion, todos)}</option>
                        )
                    }
            </select>
        );
    }

    nombreOpcion(opcion, todos) {
        return opcion === 'todos' ? todos : opcion;
    }

    render() {
      return (
        <div id="filters" class="row fondo-fitros"> 
            <div class="form-group col-md-3">
                <div class="input-icons">
                    <i class="fas fa-share"></i>
                    <input id="infeentrada" class="form-control input-field" type="date"
                        onChange={this.props.handleFechaEntrada} />  
                </div>
            </div>
            <div class="form-group col-md-3">
                <div class="input-icons">
                    <i class="fas fa-reply"></i>
                    <input id="infesalida" class="form-control input-field" type="date"
                        onChange={this.props.handleFechaSalida}/>  
                </div>
            </div>
            <div class="form-group col-md-2">
                <div class="input-icons">
                    <i class="fas fa-globe"></i>
                    { this.InputLista('pais') }
                </div>
            </div>
            <div class="form-group col-md-2">
                <div class="input-icons">
                    <i class="fas fa-dollar-sign"></i>
                    { this.InputLista('precio') }
                </div>
            </div>
            <div class="form-group col-md-2">
                <div class="input-icons">
                    <i class="fas fa-bed"></i>
                    { this.InputLista('habitacion') }
                </div>
              </div>      
        </div> 
      ); 
    }
  }
  
  export default Filtros;