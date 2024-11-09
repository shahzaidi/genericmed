import React from 'react';


const ContentRow = ({ title, subtitle, description, imageSrc }) => (
  <div className="content-row">
    {imageSrc && <img src={imageSrc} alt={title} className="row-image" />}
    <div className="content-roww">
    <div className="title" >{title}</div>
    
    <div className="description">{description}</div>
  </div>
  </div>
);

const App = () => (
  <div className="appppp">
    <ContentRow
      title="Fast Shipping"
    
      description="Ut enim ad minim "
      imageSrc="/assets/ship.png" 
    />
    <ContentRow
      title="24/7 Support"
      subtitle=""
      description="Ut enim ad minim "
      imageSrc="/assets/247sup.png" 
    />
    <ContentRow
      title="Multiple Payment "

      subtitle=""
      description="Ut enim ad minim "
      imageSrc="/assets/multi_pay.png"

    />
     <ContentRow
      title="Fast Delivery"
      subtitle=""
      description="Ut enim ad minim "
      imageSrc="/assets/fast_del.png"
    />
  </div>
);

export default App;
