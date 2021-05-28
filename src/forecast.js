import React from "react";
import reactDom from "react-dom";



class Forecast extends React.Component {

    constructor(props) {
        super(props);
        // need to display date info for 5 consecutive days, numbers 0-4 are passed as props.day
        let date = new Date();
        date.setDate(date.getDate() + this.props.day);


        this.state = {
            date: date.toDateString()
        }
    }


    render() {
        
        return (
            <div className="forecast">
                <p className="day">{this.state.date}</p>
                <img src={this.props.icon} className="icon" />
                {/* convert temp from kelvin to celsius */}
                <p className="temp">{Math.trunc(this.props.forecast.main.temp - 273.15)}  °C</p>
                <p className="weather">{this.props.forecast.weather[0].description}</p>
            </div>
        );
    }
}

export default Forecast