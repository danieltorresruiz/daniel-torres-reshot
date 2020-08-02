class Filtros extends React.Component {
    constructor(props) {
        super(props);
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
                    <select class="form-control input-field" name="" id="">
                    </select>
                </div>
            </div>
            <div class="form-group col-md-2">
                <div class="input-icons">
                    <i class="fas fa-dollar-sign"></i>
                    <select class="form-control input-field" name="" id="">
                    </select>
                </div>
            </div>
            <div class="form-group col-md-2">
                <div class="input-icons">
                    <i class="fas fa-bed"></i>
                    <select class="form-control input-field" name="" id="">
                    </select>
                </div>
              </div>      
        </div> 
      ); 
    }
  }
  
  export default Filtros;