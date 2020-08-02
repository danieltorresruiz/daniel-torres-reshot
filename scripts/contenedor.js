class Contenedor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="container">
                {this.props.children}
            </div>  
        );
    }
  }
  
  export default Contenedor;