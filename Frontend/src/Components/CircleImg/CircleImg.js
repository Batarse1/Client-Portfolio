function CircleImg({ ImgSrc, imgHeight, imgWidth, imgRadius}) {

    const imgStyle = {
        height: imgHeight,
        width: imgWidth,
        borderRadius: imgRadius,
    };

    return (
        <img src={ImgSrc} alt='Logo' style={imgStyle} />
    );
}

export default CircleImg;
