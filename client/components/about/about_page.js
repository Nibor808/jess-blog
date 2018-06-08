import React, { Component, PropTypes } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className='row about'>
        <div className='col-md-4 col-sm-12'>
          <img src='../../images/jess_about_img.jpg' alt='Jessica Austen' />
        </div>
        <div className='col-md-8 col-sm-12'>
          <p>
            I love that tech presents troubleshooting challenges that are fun and exciting to solve.
          </p>
          <p>
            My interest in all things tech started in 2008 working in a small computer store on a university campus in Toronto.
            I quickly found that I had a knack for understanding technology and a passion to help people find what they need or want.
            I advanced from retail to the Small Medium Business playing field and completed many certificate training programs including
            Apple, APC, Lenovo, Eaton Power, Microsoft Surface and more.
          </p>
          <p>
            Having the knowledge and drive, I wanted to make technology less intimidating and more accessible to all, enter JessTech.
            Because we've all been there, spending hundreds of dollars on a new computer/tablet, gaming system, or accessory, only to
            find that it’s not at all what you expected, leaving you feeling ripped off. (que sad music)
          </p>
          <p>
            When I’m not researching or reading up on new products and innovations, I spend my time with my husband who is a developer
            (yes, we’re both huge tech nerds). We love kicking back and playing video games or busting out Scrabble on a sunny afternoon.
          </p>
        </div>
        <div className='row'>
          <div className='col-sm-12'>
            <hr />
            <p>
              If you have any questions, would like to see a write-up, review, unboxing, comparison or recommendation, let me know!
              You can reach me through the Q&A page or the comments section.
            </p>
          </div>
        </div>
      </div>
    )
  }
}