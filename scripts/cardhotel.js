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
                <div class="row">
                    <div class="col-lg-11 col-md-11 simple-bordered">
                      <img className="foto-hotel" src={hotel.photo} alt={hotel.slug} />
                      <h4>{hotel.name}</h4>
                    </div>
                </div>
                <p class="descripcion-hotel">{hotel.description}</p>
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
                {this.props.children}
              </div>
            ))
          }
      </React.Fragment>
      ); 
    }
  }
  
  export default CardHotel;