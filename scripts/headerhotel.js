  const HeaderHotel = (props) => {
        return (
            <React.Fragment>
                <div class="row">
                    <div class="col-lg-11 col-md-11 simple-bordered">
                        <img className="foto-hotel" src={props.hotel.photo} alt={props.hotel.slug} />
                        <h4>{props.hotel.name}</h4>
                    </div>
                </div>
                <p class="descripcion-hotel">{props.hotel.description}</p>
            </React.Fragment>
        );
  };

  export default HeaderHotel;
