import Contenedor from './contenedor.js';
import TituloHeader from './tituloheader.js';
import Filtros from './filtros.js';
import CardHotel from './cardhotel.js';
import ListaHoteles from './listahoteles.js';
import Footer from './footer.js';
import Reservar from './reservar.js';
import FotoHotel from './fotohotel.js';
import NombreHotel from './nombrehotel.js';
import DescripcionHotel from './descripcionhotel.js';
import InfoPrincipalHotel from './infoprincipalhotel.js';
import SinResultados from './sinresultados.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: 'Hoteles',
      diaentrada: 'Selecciona la fecha de entrada',
      fechaentrada: '',
      diasalida: 'Selecciona la fecha de salida',
      fechasalida: '',
      hoteles: [],
      hotelesCompletos: [],
      esSinResultados: false,
      filtros: {
                pais: 'todos',
                precio: 'todos',
                habitacion: 'todos'
              }
    };
    this.handleFechaEntrada = this.handleFechaEntrada.bind(this);
    this.handleFechaSalida = this.handleFechaSalida.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.recuperarHoteles = this.recuperarHoteles.bind(this);
  }

  componentDidMount() {
    this.recuperarHoteles();
  }

  handleFechaEntrada(e) {
    const fechaentrada = Filtros.obtenerFechaZonaHoraria(e.target.value);
    const diaentrada = TituloHeader.obtenerDiaEspanol("desde el ", fechaentrada);
    if (this.state.fechasalida) {
      this.validarFechaEntrada(fechaentrada, diaentrada);
    } else {
      this.setState({ fechaentrada, diaentrada });
    }
  }

  validarFechaEntrada(fechaentrada, diaentrada) {
    if (fechaentrada > this.state.fechasalida) {
      swal('La fecha de entrada no puede ser mayor a la fecha de salida.');
      this.setState({ fechaentrada: '', diaentrada: 'Selecciona la fecha de entrada' });
    } else {
      this.setState({ fechaentrada, diaentrada });
    }
  }

  handleFechaSalida(e) {
    const fechasalida = Filtros.obtenerFechaZonaHoraria(e.target.value);
    const diasalida = TituloHeader.obtenerDiaEspanol("hasta el ", fechasalida);
    if (this.state.fechaentrada) {
      this.validarFechaSalida(fechasalida, diasalida);
    } else {
      this.setState({ fechasalida, diasalida });
    }
  }

  validarFechaSalida(fechasalida, diasalida) {
    if (fechasalida < this.state.fechaentrada) {
      swal('La fecha de salida no puede ser menor a la fecha de entrada.');
      this.setState({ fechasalida: '', diasalida: 'Selecciona la fecha de salida' });
    } else {
      this.setState({ fechasalida, diasalida });
    }
  }

  handleSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.actualizarHotelesFiltrados(e.target.name, e.target.value);
  }

  actualizarHotelesFiltrados(opcion, valor,) {
    const filtros = this.state.filtros;
    const hoteles = Filtros.aplicarFiltros(opcion, valor, this.state.hotelesCompletos, this.state.filtros);
    const esSinResultados = hoteles.length === 0;
    this.setState({ hoteles, filtros, esSinResultados });
  }

  recuperarHoteles() {
    const hotelesCompletos = ListaHoteles.obtenerListadoHoteles();
    const hoteles =  hotelesCompletos.map((h) => h);
    const filtros = { pais: 'todos', precio: 'todos', habitacion: 'todos' }
    this.setState({ hotelesCompletos, hoteles, filtros });
  }

  render() {
    return (
      <div>
        <Contenedor>
          <TituloHeader
            titulo='Hoteles Descansar.com'
            diainicio={this.state.diaentrada}
            fechainicio={this.state.fechaentrada}
            diafin={this.state.diasalida}
            fechafin={this.state.fechasalida}
            pais={this.state.filtros.pais}
            precio={this.state.filtros.precio}
            habitacion={this.state.filtros.habitacion}
            eliminarFiltros={this.recuperarHoteles}
          />
          <Filtros 
            handleFechaEntrada={this.handleFechaEntrada}
            handleFechaSalida={this.handleFechaSalida}
            handleSelect={this.handleSelect}
            filtros={this.state.filtros}
          />
          <ListaHoteles>
            <CardHotel hoteles={this.state.hoteles}
              foto={
                <FotoHotel />
              }
              nombre={
                <NombreHotel />
              }
              descripcion={
                <DescripcionHotel />
              }
              principal={
                <InfoPrincipalHotel />
              }
              reservar={
                <Reservar />
              }
            />
          </ListaHoteles>
          {
            this.state.esSinResultados ? <SinResultados /> : null
          }
          <Footer />
        </Contenedor>
      </div>
    );
  }
}

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App />, rootElement);
