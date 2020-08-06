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
                <p class="descripcion-hotel">{hotel.city}, {hotel.country}</p>
                <p class="descripcion-hotel">{hotel.rooms} Habitaciones</p>
              </div>
            ))
          }
      </React.Fragment>
      ); 
    }
  }
  
  export default CardHotel;