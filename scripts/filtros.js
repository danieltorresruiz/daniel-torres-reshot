const HOTEL_HAB_PEQUENO = 10;
const HOTEL_HAB_GRANDE = 25;
class Filtros extends React.Component {
    constructor(props) {
        super(props);
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

    static obtenerHoteles(now) {
        const offset = now.getTimezoneOffset(), o = Math.abs(offset);
        return (offset < 0 ? "+" : "-") + ("" + Math.floor(o / 60)).slice(-2);
    }

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
        if (valor === 'PB') {
            return hoteles.filter(hotel => hotel.price === 1);
        }
        if (valor === 'PM') {
            return hoteles.filter(hotel => hotel.price === 2);
        }
        if (valor === 'PA') {
            return hoteles.filter(hotel => hotel.price === 3);
        }
        if (valor === 'VIP') {
            return hoteles.filter(hotel => hotel.price === 4);
        }
    }

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
        return this.filtrar(hoteles, filtros);
    }

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

    static obtenerFechaYYYYMMDD(timeDate) {
        const feentrada = new Date(timeDate);
        const anio = feentrada.getFullYear();
        const month = feentrada.getMonth() + 1;
        const mes = month < 10 ? '0'+month : month;
        const dia = feentrada.getDate() < 10 ? '0'+feentrada.getDate() : feentrada.getDate();
        return anio+''+mes+''+dia;
    }

    static aplicarFiltrosDeFecha(hoteles, filtros) {
        let listaHoteles = [...hoteles];
        if (filtros.feentrada) {
            listaHoteles = listaHoteles.filter(hotel => {
                return this.validarDisponiblidad(filtros.feentrada.valueOf(), hotel.availabilityFrom);
            });
        }
        if (filtros.fesalida) {
            listaHoteles = listaHoteles.filter(hotel => {
                return this.validarDisponiblidad(filtros.fesalida.valueOf(), hotel.availabilityTo);
            });
        }
        return listaHoteles;
    }

    static validarDisponiblidad(fecha, availability) {
        const fechaSeleccionaba = this.obtenerFechaYYYYMMDD(fecha);
        const fechaHotel = this.obtenerFechaYYYYMMDD(availability);
        return fechaSeleccionaba >= fechaHotel;
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
                    <select id="pais" name="pais" class="form-control input-select"
                        onChange={this.props.handleSelect} value={this.props.filtros.pais}>
                        <option value="todos">Todos los países</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Chile">Chile</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Colombia">Colombia</option>
                    </select>
                </div>
            </div>
            <div class="form-group col-md-2">
                <div class="input-icons">
                    <i class="fas fa-dollar-sign"></i>
                    <select id="precio" name="precio" class="form-control input-select"
                        onChange={this.props.handleSelect} value={this.props.filtros.precio}>
                        <option value="todos">Cualquier precio</option>
                        <option value="PB">$</option>
                        <option value="PM">$$</option>
                        <option value="PA">$$$</option>
                        <option value="VIP">$$$$</option>
                    </select>
                </div>
            </div>
            <div class="form-group col-md-2">
                <div class="input-icons">
                    <i class="fas fa-bed"></i>
                    <select id="habitacion" name="habitacion" class="form-control input-select2"
                        onChange={this.props.handleSelect} value={this.props.filtros.habitacion}>
                        <option value="todos">Cualquier tamaño</option>
                        <option value="Hotel pequeño">Hotel pequeño</option>
                        <option value="Hotel mediano">Hotel mediano</option>
                        <option value="Hotel grande">Hotel grande</option>
                    </select>
                </div>
              </div>      
        </div> 
      ); 
    }
  }
  
  export default Filtros;