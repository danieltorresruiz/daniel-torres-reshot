class TituloHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div class="row presentation titulo-header"> 
            <div class="col-lg-4 col-md-4">
                <h3>{this.props.titulo}</h3>
            </div>
            <div class="col-lg-4 col-md-4">
                {this.props.diainicio} <b>{this.props.fechainicio}</b>
            </div>
            <div class="col-lg-4 col-md-4">
                {this.props.diafin} <b>{this.props.fechafin}</b>
            </div>
        </div>
      ); 
    }
  }
  
  export default TituloHeader;