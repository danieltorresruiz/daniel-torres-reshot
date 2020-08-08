const InfoPrincipalHotel = (props) => {
    const costo = '$'.repeat(props.hotel.price);
    return (
        <React.Fragment>
            <div class="input-group mb-12">
                <div class="input-group-prepend">
                <label class="form-control fondo-cuadro-icon">
                    <i class="fas fa-map-marker fondo-icon" />
                </label>
                </div>
                <div class="input-group-prepend">
                <label class="form-control fondo-texto-card">{props.hotel.city}, {props.hotel.country}</label>
                </div>
            </div>
            <div class="input-group mb-12">
                <div class="input-group-prepend">
                <label class="form-control fondo-cuadro-icon">
                    <i class="fas fa-bed fondo-icon"></i>
                </label>
                </div>
                <div class="input-group-prepend">
                <label class="form-control fondo-texto-card">{props.hotel.rooms} Habitaciones</label>
                <label class="form-control fondo-cuadro-icon">
                    <span class="icon-text">{costo}</span>
                </label>
                </div>
            </div>
        </React.Fragment>
    );
};

export default InfoPrincipalHotel;
