import React from "react"
import  About  from './About'
import Baby from './Baby'

const Home = props => (
    <div>
        <h5 id='title' style={{ textAlignVertical: "center",textAlign: "center",}}>Baby-Handy App 2018</h5>
        <div className='container'>
              <Baby/>
            </div>
        <About/>
    </div>
);

export default Home
