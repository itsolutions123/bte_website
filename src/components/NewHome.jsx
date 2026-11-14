import React from 'react';
import { Link } from 'react-router-dom';
import '../newhome.css';

export default function NewHome() {
  return (
    <div id="home" className="nh">
      <div className="prog"></div>
      <section className="hx">
      <div className="hst">
      <div className="rows" aria-hidden="true"><div className="row" style={{'--y':'-36vh'}}><div className="rl" style={{'--k':'0'}}><span>WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · </span></div></div><div className="row" style={{'--y':'-18vh'}}><div className="rl" style={{'--k':'1'}}><span>WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · </span></div></div><div className="row" style={{'--y':'0vh'}}><div className="rl" style={{'--k':'2'}}><span>WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · </span></div></div><div className="row" style={{'--y':'18vh'}}><div className="rl" style={{'--k':'3'}}><span>WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · </span></div></div><div className="row" style={{'--y':'36vh'}}><div className="rl" style={{'--k':'4'}}><span>WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · WE DO THINGS · </span></div></div></div>
      <div className="glow"></div>
      <div className="ring"></div>
      <div className="hc">
      <div className="hbw"><div className="eyebrow fade" style={{color:'var(--gold)','--d':'.1s'}}>BIGTIME EMPIRE CORPORATION</div></div>
      <div className="hhw"><h1 className="hh" aria-label="We do things differently."><span className="w1" aria-hidden="true">We do things</span><span className="w2" aria-hidden="true"><span className="lt" style={{'--i':'0'}}>D</span><span className="lt" style={{'--i':'1'}}>I</span><span className="lt" style={{'--i':'2'}}>F</span><span className="lt" style={{'--i':'3'}}>F</span><span className="lt" style={{'--i':'4'}}>E</span><span className="lt" style={{'--i':'5'}}>R</span><span className="lt" style={{'--i':'6'}}>E</span><span className="lt" style={{'--i':'7'}}>N</span><span className="lt" style={{'--i':'8'}}>T</span><span className="lt" style={{'--i':'9'}}>L</span><span className="lt" style={{'--i':'10'}}>Y</span><span className="lt" style={{'--i':'11'}}>.</span></span></h1></div>
      <div className="hbw"><div className="hb fade" style={{'--d':'2s'}}><p>The company behind some of the Philippines’ recognizable food and restaurant brands, and a place to grow your career.</p><div style={{display:'flex',gap:'16px',flexWrap:'wrap'}}><Link to="/careers" className="btn gold">View open roles <span className="ar">→</span></Link><a href="#our-brands" className="btn out">Our brands</a></div></div></div>
      </div>
      </div>
      </section>
      
      <section id="brands-section" className="mq-wrap"><div className="mq">
      <span>THE SANDWICH GUY</span><span>✦</span><span>PARES RETIRO</span><span>✦</span><span>SAPPORO MILKTEA</span><span>✦</span><span>CALIFORNIA BEACH PANSOL</span><span>✦</span>
      <span>THE SANDWICH GUY</span><span>✦</span><span>PARES RETIRO</span><span>✦</span><span>SAPPORO MILKTEA</span><span>✦</span><span>CALIFORNIA BEACH PANSOL</span><span>✦</span>
      </div></section>
      
      <section id="our-brands" className="wrap" style={{paddingTop:'120px',paddingBottom:'96px'}}>
      <div className="rv"><div className="eyebrow">OUR BRANDS</div>
      <h2 className="h2">Four brands. <span className="em">One team.</span></h2>
      <p style={{fontSize:'19px',lineHeight:'1.6',marginTop:'20px',maxWidth:'620px',color:'#444'}}>Every brand hires on its own, and every one is part of the same company. Scroll to meet each one and see where you could join.</p></div>
      </section>
      
      <div className="bsec"><div className="stage">
      <div className="sl sl1"><div className="sg"><div className="in"><h3 className="snm">The Sandwich Guy</h3><p className="sd">Fast and fresh sandwiches. [ONE-LINE DESCRIPTION]</p><Link to="/careers" className="btn gold">[N] open roles <span className="ar">→</span></Link></div><div className="sph">[PHOTO · The Sandwich Guy]</div></div></div>
      <div className="sl sl2"><div className="sg"><div className="in"><h3 className="snm">Pares Retiro</h3><p className="sd">The best pares in town. [ONE-LINE DESCRIPTION]</p><Link to="/careers" className="btn gold">[N] open roles <span className="ar">→</span></Link></div><div className="sph">[PHOTO · Pares Retiro]</div></div></div>
      <div className="sl sl3"><div className="sg"><div className="in"><h3 className="snm">Sapporo Milktea</h3><p className="sd">Milk tea for every day. [ONE-LINE DESCRIPTION]</p><Link to="/careers" className="btn gold">[N] open roles <span className="ar">→</span></Link></div><div className="sph">[PHOTO · Sapporo Milktea]</div></div></div>
      <div className="sl sl4"><div className="sg"><div className="in"><h3 className="snm">California Beach Pansol</h3><p className="sd">Resort and leisure. [ONE-LINE DESCRIPTION]</p><Link to="/careers" className="btn gold">[N] open roles <span className="ar">→</span></Link></div><div className="sph">[PHOTO · California Beach Pansol]</div></div></div>
      <div className="sdots" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      </div></div>
      
      <section className="kin-wrap" aria-hidden="true"><div className="kin">BIGTIME EMPIRE · BIGTIME EMPIRE</div></section>
      
      <section id="why-section" className="dark" style={{padding:'120px 0'}}>
      <div className="wrap">
      <div className="rv"><div className="eyebrow" style={{color:'var(--gold)'}}>WHY WORK WITH US</div>
      <h2 className="h2" style={{maxWidth:'760px'}}>Grow with the teams behind <span className="em">our operations.</span></h2></div>
      <div className="grid3 stats" style={{marginTop:'56px'}}>
      <div className="stat rv"><div className="em" style={{fontSize:'64px',fontWeight:'900',letterSpacing:'-.03em'}}>11</div><p style={{marginTop:'8px',color:'#D6D6D6'}}>Years in operation</p></div>
      <div className="stat rv2"><div className="em" style={{fontSize:'64px',fontWeight:'900',letterSpacing:'-.03em'}}>50+</div><p style={{marginTop:'8px',color:'#D6D6D6'}}>Branches and projects</p></div>
      <div className="stat rv3"><div className="em" style={{fontSize:'64px',fontWeight:'900',letterSpacing:'-.03em'}}>1000+</div><p style={{marginTop:'8px',color:'#D6D6D6'}}>Team members</p></div>
      </div>
      
      </div>
      </section>
      
      <section id="about-section" className="who wrap" style={{paddingTop:'120px',paddingBottom:'140px'}}>
      <div className="eyebrow">WHO WE ARE</div>
      <h2 className="h2 asm" style={{maxWidth:'900px'}} aria-label="We bring businesses together to create opportunities and build lasting partnerships."><span className="aw" style={{'--x':'22vw','--y':'9vh','--r':'-38deg'}}>We</span> <span className="aw" style={{'--x':'-29vw','--y':'-24vh','--r':'-13deg'}}>bring</span> <span className="aw" style={{'--x':'-31vw','--y':'10vh','--r':'-14deg'}}>businesses</span> <span className="aw" style={{'--x':'19vw','--y':'-15vh','--r':'-30deg'}}>together</span> <span className="aw" style={{'--x':'19vw','--y':'-9vh','--r':'-21deg'}}>to</span> <span className="aw" style={{'--x':'22vw','--y':'-26vh','--r':'29deg'}}>create</span> <span className="aw" style={{'--x':'-21vw','--y':'-19vh','--r':'-29deg'}}>opportunities</span> <span className="aw" style={{'--x':'-36vw','--y':'-14vh','--r':'33deg'}}>and</span> <span className="em"><span className="aw" style={{'--x':'42vw','--y':'22vh','--r':'23deg'}}>build</span> <span className="aw" style={{'--x':'25vw','--y':'-15vh','--r':'-30deg'}}>lasting</span> <span className="aw" style={{'--x':'34vw','--y':'18vh','--r':'21deg'}}>partnerships.</span></span></h2>
      <div className="wg">
      <div><div className="lbl">Core values</div><div className="cvs"><div className="cv" data-t="Command responsibility">Command responsibility</div><div className="cv" data-t="Accountability">Accountability</div><div className="cv" data-t="Respect the deadline">Respect the deadline</div><div className="cv" data-t="Be the best version of yourself">Be the best version of yourself</div><div className="cv" data-t="Mutual growth">Mutual growth</div></div></div>
      <div className="mv"><div className="lbl">Mission</div><p className="rp"><span className="rw">To</span> <span className="rw">spread</span> <span className="rw">the</span> <span className="rw">power</span> <span className="rw">of</span> <span className="rw">synergy</span> <span className="rw">amongst</span> <span className="rw">different</span> <span className="rw">companies,</span> <span className="rw">creating</span> <span className="rw">sustainable</span> <span className="rw">jobs</span> <span className="rw">and</span> <span className="rw">improving</span> <span className="rw">people’s</span> <span className="rw">lives.</span></p><div className="lbl" style={{marginTop:'56px'}}>Vision</div><p className="rp"><span className="rw">To</span> <span className="rw">be</span> <span className="rw">one</span> <span className="rw">of</span> <span className="rw">the</span> <span className="rw">top</span> <span className="rw">1,000</span> <span className="rw">customer-centric</span> <span className="rw">companies</span> <span className="rw">in</span> <span className="rw">the</span> <span className="rw">Philippines,</span> <span className="rw">building</span> <span className="rw">trust</span> <span className="rw">and</span> <span className="rw">loyalty</span> <span className="rw">through</span> <span className="rw">excellent</span> <span className="rw">products</span> <span className="rw">and</span> <span className="rw">services.</span></p></div>
      </div>
      </section>
      
      <section id="careers-section" className="cta">
      <div className="door">
      <div className="crow t" aria-hidden="true"><span>STORE SUPERVISOR · CREW MEMBER · COOK · CASHIER · RECRUITMENT OFFICER · STORE SUPERVISOR · CREW MEMBER · COOK · CASHIER · RECRUITMENT OFFICER · STORE SUPERVISOR · CREW MEMBER · COOK · CASHIER · RECRUITMENT OFFICER · STORE SUPERVISOR · CREW MEMBER · COOK · CASHIER · RECRUITMENT OFFICER · </span></div>
      <div className="crow b" aria-hidden="true"><span>STORE SUPERVISOR · CREW MEMBER · COOK · CASHIER · RECRUITMENT OFFICER · STORE SUPERVISOR · CREW MEMBER · COOK · CASHIER · RECRUITMENT OFFICER · STORE SUPERVISOR · CREW MEMBER · COOK · CASHIER · RECRUITMENT OFFICER · STORE SUPERVISOR · CREW MEMBER · COOK · CASHIER · RECRUITMENT OFFICER · </span></div>
      <div className="cc">
      <h2 className="ch" aria-label="Your next chapter starts here."><span className="c1" aria-hidden="true">Your next</span><span className="c2" aria-hidden="true"><span className="cl" style={{'--i':'0'}}>C</span><span className="cl" style={{'--i':'1'}}>H</span><span className="cl" style={{'--i':'2'}}>A</span><span className="cl" style={{'--i':'3'}}>P</span><span className="cl" style={{'--i':'4'}}>T</span><span className="cl" style={{'--i':'5'}}>E</span><span className="cl" style={{'--i':'6'}}>R</span></span><span className="c3" aria-hidden="true">starts here.</span></h2>
      <div className="cwrap" style={{display:'flex',flexDirection:'column',alignItems:'center'}}><Link to="/careers" className="cbtn">View open roles <span className="ar">→</span></Link><p className="cmeta">[N] open roles across our four brands</p></div>
      </div>
      </div>
      </section>
      
      <footer id="community-section" className="dark" style={{padding:'72px 0 40px'}}>
      <div className="wrap">
      <div className="foot">
      <div><div style={{fontWeight:'900',letterSpacing:'.08em',fontSize:'18px'}}>BIGTIME <span className="em">EMPIRE</span> CORPORATION</div><p style={{color:'#D6D6D6',marginTop:'8px'}}>2/F Bramante Piazza, Renaissance, Ugong, Pasig City, Philippines</p><p style={{color:'#D6D6D6'}}><a href="mailto:admin@bigtimeempire.com">admin@bigtimeempire.com</a></p></div>
      <div><div style={{fontWeight:'600',color:'var(--gold)'}}>Brands</div><div><a href="#brands-section">The Sandwich Guy</a></div><div><a href="#brands-section">Pares Retiro</a></div><div><a href="#brands-section">Sapporo Milktea</a></div><div><a href="#brands-section">California Beach Pansol</a></div></div>
      <div><div style={{fontWeight:'600',color:'var(--gold)'}}>Company</div><div><a href="#about-section">About</a></div><div><Link to="/careers">Careers</Link></div><div><Link to="/connect">Contact</Link></div><div><Link to="/connect">Franchise inquiry</Link></div></div>
      <div><div style={{fontWeight:'600',color:'var(--gold)'}}>Follow us</div><div><a href="#">Instagram</a></div><div><a href="#">Facebook</a></div></div>
      </div>
      <div style={{marginTop:'48px',paddingTop:'24px',borderTop:'1px solid rgba(201,162,39,.35)',fontSize:'13px',color:'#A8A8A8'}}>© Bigtime Empire Corporation</div>
      </div>
      </footer>
    </div>
  );
}
