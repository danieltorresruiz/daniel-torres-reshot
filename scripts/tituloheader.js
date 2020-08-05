class TituloHeader extends React.Component {
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
    
    constructor(props) {
        super(props);
    }

    obtenerFecha(fechaDate) {
        if (fechaDate !== '') {
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            const fecha = fechaDate.toLocaleDateString("es-ES", options);
            return <b>{fecha}</b>;
        }
        return null;
    }

    render() {
      return (
        <div class="row presentation titulo-header"> 
            <div class="col-lg-4 col-md-4">
                <h3>{this.props.titulo}</h3>
            </div>
            <div class="col-lg-4 col-md-4">
                {this.props.diainicio} {this.obtenerFecha(this.props.fechainicio)}
            </div>
            <div class="col-lg-4 col-md-4">
                {this.props.diafin} {this.obtenerFecha(this.props.fechafin)}
            </div>
        </div>
      ); 
    }
  }
  
  export default TituloHeader;