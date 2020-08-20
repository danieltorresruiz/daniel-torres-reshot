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

    obtenerFecha(fechaDate) {
        if (fechaDate !== '') {
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

    getPaisPrecio(pais, precio) {
        const separadorPais = pais ? ' - ' : '';
        const costo = this.traducirACosto(precio);
        const textoPrecio = costo !== '' ? 'Tipo precio: '.concat(costo) : '';
        return pais.concat(separadorPais.concat(textoPrecio));
    }

    render() {
      const pais = this.esValido(this.props.pais) ? 'País: '.concat(this.props.pais) : '';
      const joinPaisPrecio = this.props.precio ? this.getPaisPrecio(pais, this.props.precio) : pais;
      const habitacion = this.props.habitacion && this.props.habitacion !== 'todos'
                            ? 'Tamaño: '.concat(this.props.habitacion) : '';
      return (
        <React.Fragment>
            <div class="row presentation titulo-header"> 
                <div class="col-lg-4 col-md-4">
                    <h3>{this.props.titulo}</h3>
                </div>
                <div class="col-lg-4 col-md-4 texto-dias">
                    {this.props.diainicio} {this.obtenerFecha(this.props.fechainicio)}
                </div>
                <div class="col-lg-4 col-md-4 texto-dias">
                    {this.props.diafin} {this.obtenerFecha(this.props.fechafin)}
                </div>
                <div class="col-lg-4 col-md-4 texto-dias">
                    <a class="trash c-pointer" onClick={this.props.eliminarFiltros}>
                        <i class="far fa-trash-alt"></i>
                        <span> Quitar filtros de búsqueda</span>
                    </a>
                </div>
                <div class="col-lg-4 col-md-4 texto-dias">{joinPaisPrecio}</div>
                <div class="col-lg-4 col-md-4 texto-dias">{habitacion}</div>
            </div>
        </React.Fragment>
      ); 
    }
  }
  
  export default TituloHeader;