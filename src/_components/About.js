import React from "react"

const About = props => (
    <div className="container">
        <div >
            <div className='card-panel' style={{ margin: 20 }}>
                <p style={{ textAlignVertical: "center", fontSize: 20 }}>
                    Baby-Handy is product of Distributed Systems course work, taught at University of Tartu, autumn semester 2018.</p>
                    It aims to help parents keep track of their child development. <br></br>
                    The first step on using it is creating a profile and registering your children.<br></br>
                    The chatbot will help you detect the progress of your child through different test and milestones. <br></br>
                    If neccessary after evaluation, the chatbot will give suggestions on next steps to perform with your child.<br></br>
                <p>
                    Please keep in mind that our solution does not aim in any way to replace professional expertise given at the medical centers.<br></br>
                    It comes as a facility 24/7 to give answers to your questions and worries.
            </p>
            </div>
        </div>
    </div>
);

export default About
