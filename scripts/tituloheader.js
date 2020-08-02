class TituloHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    obtenerFechaInicio() {
        return this.obtenerFecha(this.props.fechainicio);
    }

    obtenerFechaFin() {
        return this.obtenerFecha(this.props.fechafin);
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
                {this.props.diainicio} {this.obtenerFechaInicio()}
            </div>
            <div class="col-lg-4 col-md-4">
                {this.props.diafin} {this.obtenerFechaFin()}
            </div>
        </div>
      ); 
    }
  }
  
  export default TituloHeader;