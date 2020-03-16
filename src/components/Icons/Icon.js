/**
 * SVG icons for the UI
 * 
 * The name is under the assumption that it is pointing 
 * to the correct folder inside devicon/icons/ 
 */

import React, { Component } from 'react';


export default class Icon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            svg: ""
        };
    }

    componentDidMount() {

        /*
        // take the plain svg first, and if not exist, take "-original.svg"
        let path = "devicon/icons/" + this.state.name + "/" + this.state.name + "-plain.svg";
        let request = new XMLHttpRequest();
        request.open("GET", path, false);


        import(path)
        .then((icon) => {
            this.setState({
                name: this.state.name,
                svg: icon
            });
        })
        // on error, import the original svg
        .catch((error) => {
            path = "devicon/icons/" + this.state.name + "/" + this.state.name + "-original.svg";
            this.setState({
                name: this.state.name,
                svg: import(path)
            });
        });
        */
    }


    render() {
        return (
            <h1>Icon</h1>
            // <svg viewBox="0 0 128 128">
            //     {this.state.svg}
            // </svg>
        )
    }
}
