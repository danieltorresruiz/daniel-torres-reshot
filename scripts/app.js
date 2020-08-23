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
      cantidadBusqueda: 0,
      filtros: {
                pais: 'todos',
                precio: 'todos',
                habitacion: 'todos',
                feentrada: null,
                fesalida: null
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

  setFechaEntrada(fechaentrada, diaentrada) {
    const filtros = this.state.filtros;
    filtros.feentrada = fechaentrada !== '' ? fechaentrada : null;
    const hoteles = Filtros.aplicarFiltrosDeFecha(this.state.hotelesCompletos, filtros);
    const cantidadBusqueda = hoteles.length;
    this.setState({ fechaentrada, diaentrada, filtros, hoteles, cantidadBusqueda });
  }

  handleFechaEntrada(e) {
    const fechaentrada = Filtros.obtenerFechaZonaHoraria(e.target.value);
    const diaentrada = TituloHeader.obtenerDiaEspanol('desde el ', fechaentrada);
    if (this.state.fechasalida) {
      this.validarFechaEntrada(fechaentrada, diaentrada);
    } else {
      this.setFechaEntrada(fechaentrada, diaentrada);
    }
  }

  validarFechaEntrada(fechaentrada, diaentrada) {
    if (fechaentrada > this.state.fechasalida) {
      swal('La fecha de entrada no puede ser mayor a la fecha de salida.');
      this.setFechaEntrada('', 'Selecciona la fecha de entrada');
    } else {
      this.setFechaEntrada(fechaentrada, diaentrada);
    }
  }

  setFechaSalida(fechasalida, diasalida) {
    const filtros = this.state.filtros;
    filtros.fesalida = fechasalida !== '' ? fechasalida : null;
    const hoteles = Filtros.aplicarFiltrosDeFecha(this.state.hotelesCompletos, filtros);
    const cantidadBusqueda = hoteles.length;
    this.setState({ fechasalida, diasalida, filtros, hoteles, cantidadBusqueda });
  }

  handleFechaSalida(e) {
    const fechasalida = Filtros.obtenerFechaZonaHoraria(e.target.value);
    const diasalida = TituloHeader.obtenerDiaEspanol('hasta el ', fechasalida);
    if (this.state.fechaentrada) {
      this.validarFechaSalida(fechasalida, diasalida);
    } else {
      this.setFechaSalida(fechasalida, diasalida);
    }
  }

  validarFechaSalida(fechasalida, diasalida) {
    if (fechasalida < this.state.fechaentrada) {
      swal('La fecha de salida no puede ser menor a la fecha de entrada.');
      this.setState({ fechasalida: '', diasalida: 'Selecciona la fecha de salida' });
      this.setFechaSalida('', 'Selecciona la fecha de entrada');
    } else {
      this.setFechaSalida(fechasalida, diasalida);
    }
  }

  handleSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.actualizarHotelesFiltrados(e.target.name, e.target.value);
  }

  actualizarHotelesFiltrados(opcion, valor,) {
    const filtros = this.state.filtros;
    const hoteles = Filtros.aplicarFiltros(opcion, valor, this.state.hotelesCompletos, this.state.filtros);
    const cantidadBusqueda = hoteles.length;
    this.setState({ hoteles, filtros, cantidadBusqueda });
  }

  recuperarHoteles() {
    const hotelesCompletos = ListaHoteles.obtenerListadoHoteles();
    const hoteles =  hotelesCompletos.map((h) => h);
    const filtros = { pais: 'todos', precio: 'todos', habitacion: 'todos' }
    const cantidadBusqueda = hoteles.length;
    this.setState({ hotelesCompletos, hoteles, filtros, cantidadBusqueda });
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
            cantidadHoteles={this.state.cantidadBusqueda}
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
            this.state.cantidadBusqueda === 0 ? <SinResultados /> : null
          }
          <Footer />
        </Contenedor>
      </div>
    );
  }
}

const rootElement = document.getElementById("app-root");
ReactDOM.render(<App />, rootElement);
