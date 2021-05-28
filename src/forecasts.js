
import React from "react";
import Forecast from "./forecast"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";

class Forecasts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            days: [],
            city: "",
            icons: [],
            currentCity: null,
            country: "",
            city: "",
            time: ""
        }
        this.takeCity = this.takeCity.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.takeCountry = this.takeCountry.bind(this);
    }


    // take user input for city and country and store in state
    takeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    takeCountry(e) {
        this.setState({
            country: e.target.value
        });
    }
    // store current time and city when user searches so that these are displayed alongside the weather data
    changeCity() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let currentCity = this.state.city + ", " + this.state.country;
        this.setState({
            currentCity: currentCity,
            city: "",
            time: hours + " : " + minutes
        })
        // if a user has already searched, clear these arrays that contain the forecast data before searching again     
        if (this.state.days.length > 0) {
            this.setState({
                days: [],
                icons: [],
            })
        }
        // get forecast data,  which is for every three hours, so divide the current hour by 3 to get the approximate current
        // forecast, then add 8 to get the forecast for the same time tomorrow, and so on for a total 5 days.
         
        fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + this.state.city + "," + this.state.country + "&appid=25132f7360c9f74cfe06ebf5ced148ff")
            .then(res => res.json())
            .then(data => {
                let list = data.list;
                let date = new Date();
                let hour = date.getHours();
                for (let i = -1; i < 32; i = i + 8) {
                    let num = hour / 3 + i;
                    num = Math.round(num);
                    let forecast = list[num];
                    let icon = forecast.weather[0].icon;
                    icon = icon.slice(0, 2);
                    icon = "http://openweathermap.org/img/wn/" + icon + "d@2x.png";
                    let daysArray = this.state.days.concat(forecast);
                    let iconArray = this.state.icons.concat(icon);
                    this.setState({
                        days: daysArray,
                        icons: iconArray
                    });
                }
            })
            .catch(err => {
                alert("please choose a valid city");
            })

    }
    



    render() {

        // only render once all forecast data, and current time and current city are ready to be used.
        if (this.state.days.length === 5 && this.state.currentCity && this.state.time) {

            return (
                <div >
                    <div style={{ width: "60%", margin: "2em auto" }}>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group>

                                        <Form.Control value={this.state.city} onChange={this.takeCity} placeholder="choose city" ></Form.Control>

                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Control value={this.state.country} onChange={this.takeCountry} placeholder="2 digit country code eg. us, uk" />
                                </Col>
                                <Col>
                                    <Button variant="Primary" onClick={this.changeCity} >Search </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Container>
                        <Row>
                            <Col></Col>
                            <Col>
                                <h3>{this.state.currentCity + "  "}</h3>
                            </Col>
                            <Col>
                                <h3>{"  " + this.state.time}</h3>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                    <div className="forecasts">
                        <Forecast day={0} forecast={this.state.days[0]} icon={this.state.icons[0]} />
                        <Forecast day={1} forecast={this.state.days[1]} icon={this.state.icons[1]} />
                        <Forecast day={2} forecast={this.state.days[2]} icon={this.state.icons[2]} />
                        <Forecast day={3} forecast={this.state.days[3]} icon={this.state.icons[3]} />
                        <Forecast day={4} forecast={this.state.days[4]} icon={this.state.icons[4]} />
                    </div>
                </div>
            );
        } else {
            return (


                <div style={{ width: "60%", margin: "2em auto" }}>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>

                                    <Form.Control value={this.state.city} onChange={this.takeCity} placeholder="choose city" ></Form.Control>

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Control value={this.state.country} onChange={this.takeCountry} placeholder="2 digit country code eg. us, uk" />
                            </Col>
                            <Col>
                                <Button variant="Primary" onClick={this.changeCity} >Search </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>

            )
        }

    }
}







export default Forecasts

