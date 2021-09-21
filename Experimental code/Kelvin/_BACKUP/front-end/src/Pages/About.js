import React, { Component } from 'react'
import "./About.css"
import Kelvin from "../images/Kelvin.JPG";

export default class About extends Component {
    render() {
        return (
            <div className="About">
                <div className="projectDescription">
                    <h1>Project Description</h1>
                    <p >A React application that gives a detailed analysis of written code to help users reduce the level of complexity.
                    Using an IDE, we can identify part of code that can be simplified to help coders develop more universally understandable code.
                    </p>
                </div>

                    <h1>Developed By</h1>
                    <br/>
                <div className="images">

                    <div>
                        <img src={Kelvin} alt="Kelvin"/>
                        <h2>Kelvin Zheng</h2>
                        <p>
                            A Full Stack Fellow at Pursuit with a robust background in Software Development/Full Stack Web/ Engineering. 
                            Motivated by the principles of engineering, Creates efficient and maintainable applications using an iterative 
                            approach.
                        </p>
                        <a href="https://github.com/Kelvinz6820"><h1>Github Link</h1></a>

                    </div>
                </div>
            </div>
        )
    }
}
