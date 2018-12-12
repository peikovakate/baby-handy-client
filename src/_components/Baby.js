import React from "react"

const Baby = props => (
    <div className="baby-container">
    <div id="background"></div>
<div class="baby-container">
  <div id="baby-shadow"></div>
  <div id="baby-body"></div>
  <div id="head">
    <div id="hair-container">
      <div id="hair-left" class="hair"></div>
      <div id="hair-right" class="hair"></div>
    </div>
    <div id="eye-container">
      <div class="eye"></div>
      <div id="eye-right" class="eye"></div>
    </div>
    <div id="mouth-container">
      <div id="mouth-left" class="mouth"></div>
      <div id="mouth-center" class="mouth"></div>
      <div id="mouth-right" class="mouth"></div>
    </div>
  </div>
  

</div>


<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
  <feColorMatrix in="blur" mode="matrix" 
                 values="1 0 0 0 0  
                         0 1 0 0 0  
                         0 0 1 0 0  
                         0 0 0 23 -11" result="goo" />
  <feBlend in="SourceGraphic" in2="goo" />
</filter>
  </defs>
</svg>



    </div>
);

export default Baby
