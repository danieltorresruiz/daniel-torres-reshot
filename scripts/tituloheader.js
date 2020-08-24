class TituloHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    static obtenerDiaEspanol(prefijo, fecha) {
        const DAYS = {
                       "days": [
                         "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
                       ]
                     }
        const DIAS_SEMANA = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
        const dayWeek = fecha.toString().substring(0,3);
        const index = DAYS.days.indexOf(dayWeek);
        return prefijo + DIAS_SEMANA[index] + ",";
    }

    obtenerFecha(fechaDate, dia) {
        const sinDia = dia.toLowerCase().includes('selecciona');
        if (!sinDia && fechaDate !== '') {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            const fecha = fechaDate.toLocaleDateString("es-ES", options);
            return <b>{fecha}</b>;
        }
        return null;
    }

    esValido(val) {
        return val && val !== 'todos';
    }

    traducirACosto(precio) {
        switch (precio) {
            case 'todos':
                return '';
            case 'PB':
                return 'Costo Bajo';
            case 'PM':
                return 'Costo Medio';
            case 'PA':
                return 'Costo Alto';
            case 'VIP':
                return 'Costo VIP';
            default:
                return precio;
        }
    }

    obtenerPrecio(precio) {
        const costo = this.traducirACosto(precio);
        return costo !== '' ? 'Po: '.concat(costo) : '';
    }

    //REACT RENDER
    render() {
      const pais = this.esValido(this.props.pais) ? 'Ps: '.concat(this.props.pais) : '';
      const precio = this.props.precio ? this.obtenerPrecio(this.props.precio) : '';
      const habitacion = this.props.habitacion && this.props.habitacion !== 'todos'
                            ? 'To: '.concat(this.props.habitacion) : '';
      const diainicio = null;
      return (
        <div class="presentation">
            <div class="row titulo-header titulo-color"> 
                <div class="col-lg-4 col-md-4">
                    <h3>{this.props.titulo}</h3>
                </div>
                <div class="col-lg-2 col-md-2 blanco">
                    <a class="subtitulo c-pointer" onClick={this.props.eliminarFiltros}>
                        <i class="far fa-trash-alt" title="Eliminar Filtros"></i>
                    </a>
                    <span> Eliminar Filtros</span>
                </div>
                <div class="col-lg-3 col-md-3 blanco">
                    <span> Hay {this.props.cantidadHoteles} hoteles disponibles</span>
                </div>
                <div class="col-lg-3 col-md-3 fs2">
                    <span class="abrev-right">* Ps (País) | Po (Precio) | To (Tamaño)</span>
                </div>
            </div>
            <div class="row titulo-color">
                <div id="divfeentrada" class="col-lg-3 col-md-3 texto-dias">
                    {this.props.diainicio} {this.obtenerFecha(this.props.fechainicio, this.props.diainicio)}
                </div>
                <div id="divfesalida" class="col-lg-3 col-md-3 texto-dias">
                    {this.props.diafin} {this.obtenerFecha(this.props.fechafin, this.props.diafin)}
                </div>
                <div class="col-lg-2 col-md-2 fs1">{pais}</div>
                <div class="col-lg-2 col-md-2 fs1">{precio}</div>
                <div class="col-lg-2 col-md-2 fs1">{habitacion}</div>
            </div>
        </div>
      ); 
    }
  }
  
  export default TituloHeader;