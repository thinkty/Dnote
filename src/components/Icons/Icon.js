/**
 * SVG icons for the UI
 * 
 * The name is under the assumption that it is pointing 
 * to the correct folder inside devicon/icons/ 
 */

import React, { Component } from 'react';
import 'typeface-muli';
import 'devicon';

const nonexistant = ["json"]
const originals = [""];

export default class Icon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            icon: "devicon-git-plain colored"
        };
    }

    componentDidMount() {
        // take the plain svg first, and if not exist, take "-original.svg"
        let path = "devicon-" + this.state.name + "-plain colored";
        if (originals.includes(this.state.name)) {
            path = "devicon-" + this.state.name + "-original colored";
        }

        // if the icon does not exist, just give a default icon
        if (nonexistant.includes(this.state.name)) {
            path = "devicon-javascript-plain colored";
        }
        this.setState({
            icon: path
        });
    }

    render() {
        return (
            <h1 className={this.state.icon}>&#x20;</h1>
        )
    }
}
