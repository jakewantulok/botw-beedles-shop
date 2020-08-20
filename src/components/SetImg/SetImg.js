import React from 'react';

const SetImg = props => {
  const { info, style, addClass } = props;

  const imgID = info.id ? '?v=' + info.id : '';
  const imgSrc = info.photo ? '/img/' + info.photo + imgID : '/img/fallback.png';
  const defaultStyle = {
      display: "block", 
      margin: "0 auto 10px", 
      maxHeight: "200px"
  };

  return (
  {/* <img style={style ? style : defaultStyle} className={addClass ? addClass : 'img-fluid'} src={imgSrc} alt={info.name ? info.name : ''} /> */}
  );
};

export default SetImg;
