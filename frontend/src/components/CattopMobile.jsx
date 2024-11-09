import React  ,{ useState  }from 'react';
import Slider from 'react-slick';
import ReactPaginate from 'react-paginate';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage';
import Footer from './Footer';


const CattopMobile = () => {
const [rating, setRating] = useState(0);
  
    const bannersPerPage = 4;
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button type="button" className="slick-prev"><i className="glyphicon glyphicon-chevron-left"></i></button>,
    nextArrow: <button type="button" className="slick-next"><i className="glyphicon glyphicon-chevron-right"></i></button>,
  
};

const banners = [  {  image: '/assets/Offer1.png', title: 'Healthy Heart Capsules', price: 200 },
{ image: '/assets/Offer2.png' , title: 'Acme Pain Relief', price:100},
{  image: '/assets/Offer3.png' , title: 'SereniSleep Aid', price:200},
{ image: '/assets/Offer4.png', title: 'Revitalize Energy Tonic', price: 70},
{ image: '/assets/Offer1.png', title: 'Healthy Heart Capsules', price: 80 },
{  image: '/assets/Offer2.png' , title: 'Acme Pain Relief', price: 20},
{  image: '/assets/Offer3.png',title: 'SereniSleep Aid', price: 100},
{ image: '/assets/Offer4.png',title: 'Revitalize Energy Tonic', price: 500},
{ image: '/assets/Offer1.png',title: 'Healthy Heart Capsules', price: 40 },
{ image: '/assets/Offer2.png',title: 'Acme Pain Relief', price: 65 },
{  image: '/assets/Offer3.png',title: 'SereniSleep Aid', price: 55 },
{ image: '/assets/Offer4.png',title: 'Revitalize Energy Tonic', price: 25},
{ image: '/assets/Offer1.png',title: 'Healthy Heart Capsules', price: 30 },
{  image: '/assets/Offer2.png',title: 'Acme Pain Relief', price: 60},
{ image: '/assets/Offer3.png',title: 'SereniSleep Aid', price: 50},
{ image: '/assets/Offer4.png' ,title: 'Revitalize Energy Tonic', price: 30},

];
const handleStarsClick = (starIndex) => {
  setRating(starIndex + 1);
};


return (
    <div className='extop'>
      <h1 className='sx'>Explore Our Top SubCategories</h1>
      <div className="containerhvnvnr">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className='imagesmob' style={{ margin: '10px' }}>
              <a href={`#${index + 1}`}>
                <img src={banner.image} alt={`Slide ${index + 1}`} className="img-responsive" />
              </a>
              <div className='information'>
                <h2 className='h'>{banner.title}</h2>
             
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CattopMobile;