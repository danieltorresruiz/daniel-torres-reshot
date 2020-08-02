import Contenedor from './contenedor.js';
import TituloHeader from './tituloheader.js';
import Filtros from './filtros.js';
import {obtenerDiaEspanol} from './funcionesfiltros.js';
import {obtenerFechaZonaHoraria} from './funcionesfiltros.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "Hoteles",
      diaentrada: "selecciona la fecha de entrada",
      fechaentrada: "",
      diasalida: "selecciona la fecha de salida",
      fechasalida: ""
    };
    this.handleFechaEntrada = this.handleFechaEntrada.bind(this);
    this.handleFechaSalida = this.handleFechaSalida.bind(this);
  }
  
  handleFechaEntrada(e) {
    const fechaInput = e.target.value;
    const fechaDate = obtenerFechaZonaHoraria(fechaInput);
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const fechaentrada = fechaDate.toLocaleDateString("es-ES", options);
    const diaentrada = obtenerDiaEspanol("desde el ", fechaDate);
    this.setState({
      fechaentrada,
      diaentrada
    });
  }

  handleFechaSalida(e) {
    const fechaInput = e.target.value;
    const fechaDate = obtenerFechaZonaHoraria(fechaInput);
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const fechasalida = fechaDate.toLocaleDateString("es-ES", options);
    const diasalida = obtenerDiaEspanol("hasta el ", fechaDate);
    this.setState({
      fechasalida,
      diasalida
    });
  }

  render() {
    return (
      <div>
        <Contenedor>
          <TituloHeader
            titulo="Hoteles"
            diainicio={this.state.diaentrada}
            fechainicio={this.state.fechaentrada}
            diafin={this.state.diasalida}
            fechafin={this.state.fechasalida}
          />
          <Filtros handleFechaEntrada={this.handleFechaEntrada} handleFechaSalida={this.handleFechaSalida} />
        </Contenedor>
        
      </div>
    );
  }
}

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App />, rootElement);
