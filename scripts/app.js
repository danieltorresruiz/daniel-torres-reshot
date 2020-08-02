import Contenedor from './contenedor.js';
import TituloHeader from './tituloheader.js';
import Filtros from './filtros.js';
import {obtenerDiaEspanol} from './funcionesfiltros.js';
import {obtenerFechaZonaHoraria} from './funcionesfiltros.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: 'Hoteles',
      diaentrada: 'selecciona la fecha de entrada',
      fechaentrada: '',
      diasalida: 'selecciona la fecha de salida',
      fechasalida: ''
    };
    this.handleFechaEntrada = this.handleFechaEntrada.bind(this);
    this.handleFechaSalida = this.handleFechaSalida.bind(this);
  }
  
  handleFechaEntrada(e) {
    const fechaentrada = obtenerFechaZonaHoraria(e.target.value);
    const diaentrada = obtenerDiaEspanol("desde el ", fechaentrada);
    this.setState({
      fechaentrada,
      diaentrada
    });
  }

  handleFechaSalida(e) {
    const fechasalida = obtenerFechaZonaHoraria(e.target.value);
    const diasalida = obtenerDiaEspanol("hasta el ", fechasalida);
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
