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
                { React.cloneElement(this.props.header, { hotel }) }

                { React.cloneElement(this.props.principal, { hotel }) }
                
                {this.props.reservar}
              </div>
            ))
          }
      </React.Fragment>
      ); 
    }
  }
  
  export default CardHotel;