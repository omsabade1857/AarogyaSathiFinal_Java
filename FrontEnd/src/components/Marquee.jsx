import React from 'react';

export function Marquee() {
    return(
  <div className="marquee-header" style={{backgroundColor:"#1e80e2",color: 'white' }}>
            <marquee behavior="scroll" direction="left" scrollamount="5" scrolldelay="6">
                {"Empowering Health, Enriching Lives - Transforming Communities through Compassionate Care and Medical Excellence."}
            </marquee>
        </div>
    );
}