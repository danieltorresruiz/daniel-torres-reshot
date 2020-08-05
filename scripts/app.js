import Contenedor from './contenedor.js';
import TituloHeader from './tituloheader.js';
import Filtros from './filtros.js';
import CardHotel from './cardhotel.js';

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
    const fechaentrada = Filtros.obtenerFechaZonaHoraria(e.target.value);
    const diaentrada = TituloHeader.obtenerDiaEspanol("desde el ", fechaentrada);
    this.setState({
      fechaentrada,
      diaentrada
    });
  }

  handleFechaSalida(e) {
    const fechasalida = Filtros.obtenerFechaZonaHoraria(e.target.value);
    const diasalida = TituloHeader.obtenerDiaEspanol("hasta el ", fechasalida);
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
          <CardHotel />
        </Contenedor>
      </div>
    );
  }
}

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App />, rootElement);
