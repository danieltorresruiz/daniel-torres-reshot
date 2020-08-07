class CardHotel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <React.Fragment>
          {
           this.props.hoteles.map(hotel => (
              <div class="col-md-4 services-bordered">
                { React.cloneElement(this.props.header, { hotel })}
                <div class="input-group mb-12">
                  <div class="input-group-prepend">
                    <label class="form-control fondo-cuadro-icon">
                      <i class="fas fa-map-marker fondo-icon" />
                    </label>
                  </div>
                  <div class="input-group-prepend">
                    <label class="form-control fondo-texto-card">{hotel.city}, {hotel.country}</label>
                  </div>
                </div>
                <div class="input-group mb-12">
                  <div class="input-group-prepend">
                    <label class="form-control fondo-cuadro-icon">
                      <i class="fas fa-bed fondo-icon"></i>
                    </label>
                  </div>
                  <div class="input-group-prepend">
                    <label class="form-control fondo-texto-card">{hotel.rooms} Habitaciones</label>
                    <label class="form-control fondo-cuadro-icon">
                      <span class="icon-text">$$$</span>
                    </label>
                  </div>
                </div>
                {this.props.reservar}
              </div>
            ))
          }
      </React.Fragment>
      ); 
    }
  }
  
  export default CardHotel;