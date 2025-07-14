import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/responsive.css';
import '../assets/styles/Footer.css';
import logo from '../assets/images/logo.png';
import footerBlog1 from '../assets/images/footer_blog_1.jpg';
import footerBlog2 from '../assets/images/footer_blog_2.jpg';
import footerBlog3 from '../assets/images/footer_blog_3.jpg';
import placeholderSvg from '../assets/images/placeholder.svg';
import phoneCallSvg from '../assets/images/phone-call.svg';
import messageSvg from '../assets/images/message.svg';
import planetEarthSvg from '../assets/images/planet-earth.svg';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 footer_column">
              <div className="footer_col">
                <div className="footer_content footer_about">
                  <div className="logo_container footer_logo">
                    <div className="logo"><a href="#"><img src={logo} alt=""/>TraExCo</a></div>
                  </div>
                  <p className="footer_about_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis vulputate eros, iaculis consequat nisl. Nunc et suscipit urna. Integer elementum orci eu vehicula pretium.</p>
                  <ul className="footer_social_list">
                    <li className="footer_social_item"><a href="#"><i className="fa fa-pinterest"></i></a></li>
                    <li className="footer_social_item"><a href="#"><i className="fa fa-facebook-f"></i></a></li>
                    <li className="footer_social_item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li className="footer_social_item"><a href="#"><i className="fa fa-dribbble"></i></a></li>
                    <li className="footer_social_item"><a href="#"><i className="fa fa-behance"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 footer_column">
              <div className="footer_col">
                <div className="footer_title">blog posts</div>
                <div className="footer_content footer_blog">
                  <div className="footer_blog_item clearfix">
                    <div className="footer_blog_image"><img src={footerBlog1} alt="https://unsplash.com/@avidenov"/></div>
                    <div className="footer_blog_content">
                      <div className="footer_blog_title"><a href="blog.html">Travel with us this year</a></div>
                      <div className="footer_blog_date">Nov 29, 2017</div>
                    </div>
                  </div>
                  <div className="footer_blog_item clearfix">
                    <div className="footer_blog_image"><img src={footerBlog2} alt="https://unsplash.com/@deannaritchie"/></div>
                    <div className="footer_blog_content">
                      <div className="footer_blog_title"><a href="blog.html">New destinations for you</a></div>
                      <div className="footer_blog_date">Nov 29, 2017</div>
                    </div>
                  </div>
                  <div className="footer_blog_item clearfix">
                    <div className="footer_blog_image"><img src={footerBlog3} alt="https://unsplash.com/@bergeryap87"/></div>
                    <div className="footer_blog_content">
                      <div className="footer_blog_title"><a href="blog.html">Travel with us this year</a></div>
                      <div className="footer_blog_date">Nov 29, 2017</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 footer_column">
              <div className="footer_col">
                <div className="footer_title">tags</div>
                <div className="footer_content footer_tags">
                  <ul className="tags_list clearfix">
                    <li className="tag_item"><a href="#">design</a></li>
                    <li className="tag_item"><a href="#">fashion</a></li>
                    <li className="tag_item"><a href="#">music</a></li>
                    <li className="tag_item"><a href="#">video</a></li>
                    <li className="tag_item"><a href="#">party</a></li>
                    <li className="tag_item"><a href="#">photography</a></li>
                    <li className="tag_item"><a href="#">adventure</a></li>
                    <li className="tag_item"><a href="#">travel</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 footer_column">
              <div className="footer_col">
                <div className="footer_title">contact info</div>
                <div className="footer_content footer_contact">
                  <ul className="contact_info_list">
                    <li className="contact_info_item d-flex flex-row">
                      <div><div className="contact_info_icon"><img src={placeholderSvg} alt=""/></div></div>
                      <div className="contact_info_text">4127 Raoul Wallenber 45b-c Gibraltar</div>
                    </li>
                    <li className="contact_info_item d-flex flex-row">
                      <div><div className="contact_info_icon"><img src={phoneCallSvg} alt=""/></div></div>
                      <div className="contact_info_text">2556-808-8613</div>
                    </li>
                    <li className="contact_info_item d-flex flex-row">
                      <div><div className="contact_info_icon"><img src={messageSvg} alt=""/></div></div>
                      <div className="contact_info_text"><a href="mailto:contactme@gmail.com?Subject=Hello" target="_top">contactme@gmail.com</a></div>
                    </li>
                    <li className="contact_info_item d-flex flex-row">
                      <div><div className="contact_info_icon"><img src={planetEarthSvg} alt=""/></div></div>
                      <div className="contact_info_text"><a href="https://colorlib.com">www.colorlib.com</a></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default Footer;