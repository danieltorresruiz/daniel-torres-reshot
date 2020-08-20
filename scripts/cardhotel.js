class CardHotel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <React.Fragment>
          {
           this.props.hoteles.map(hotel => (
              <div class="col-md-4 services-bordered foto-bordered">
                <div class="row">
                  <div class="col-lg-11 col-md-11 simple-bordered nuevo-bordered">
                    { React.cloneElement(this.props.foto, { hotel }) }

                    { React.cloneElement(this.props.nombre, { hotel }) }

                    { React.cloneElement(this.props.descripcion, { hotel }) }

                    { React.cloneElement(this.props.principal, { hotel }) }

                     { this.props.reservar }
                  </div>
                </div>
              </div>
            ))
          }
      </React.Fragment>
      ); 
    }
  }
  
  export default CardHotel;