  const FotoHotel = (props) => {
        return (
            <img className="foto-hotel" src={props.hotel.photo} alt={props.hotel.slug} />
        );
  };

  export default FotoHotel;
