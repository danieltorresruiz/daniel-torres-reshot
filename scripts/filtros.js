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

    render() {
      return (
        <div id="filters" class="row fondo-fitros"> 
            <div class="form-group col-md-3">
                <div class="input-icons">
                    <i class="fas fa-share"></i>
                    <input class="form-control input-field" type="date"
                        onChange={this.props.handleFechaEntrada}/>  
                </div>
            </div>
            <div class="form-group col-md-3">
                <div class="input-icons">
                    <i class="fas fa-reply"></i>
                    <input class="form-control input-field" type="date"
                        onChange={this.props.handleFechaSalida}/>  
                </div>
            </div>
            <div class="form-group col-md-2">
                <div class="input-icons">
                    <i class="fas fa-globe"></i>
                    <select id="pais" name="pais" class="form-control input-select"
                        onChange={this.props.handleSelect}>
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
                        onChange={this.props.handleSelect}>
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
                        onChange={this.props.handleSelect}>
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