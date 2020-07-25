import React, {Component} from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div className="container">
            <div className="jumbotron py-0">
                <div className="card-group row">
                    <div className="card bg-primary col-md-4 m-4">
                        <div className="card-header text-light">
                            Total Infected
                        </div>
                        <div className="card-body">
                            {this.props.totalConfirmed}
                        </div>
                    </div>
                    <div className="card bg-danger col-md-4 m-4">
                        <div className="card-header text-light">
                            Total Death
                        </div>
                        <div className="card-body">
                            {this.props.totalDeath}
                        </div>
                    </div>
                    <div className="card bg-success col-md-4 m-4">
                        <div className="card-header text-light">
                            Recovered Patients
                        </div>
                        <div className="card-body">
                            {this.props.totalRecovered}
                        </div>
                    </div>
                </div>
            </div>    
        </div> 
        );
    }
}
 
export default Header;
