import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRef } from "react";
export default function AdScroll({data})
{ var scrollRef=useRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 2,
        arrows:false,
        autoplay:true
      };
        // var data=['b1.webp','b2.jpg','b3.webp','b4.webp']
       const showImages=()=>{
        return data.map((item)=>{
            return<div>
                <img src={`${serverURL}/images/${item.filenames}`} style={{width:"100%",borderRadius:20}} />
            </div>
        })
    }
        const handleNext=()=>{
         scrollRef.current.slickNext()
            
        }

        const handlePrev=()=>{
            scrollRef.current.slickPrev()

        }       
    return(<div style={{position:'relative'}} >
        <div onClick={handlePrev}  style={{top:'41.2%',left:'1%',zIndex:2,position:'absolute',background:'#b2bec3',opacity:'0.7',width:30,height:30,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <KeyboardArrowLeftIcon  style={{color:'#fff'}}/>
        </div>
        <Slider ref={scrollRef} {...settings}>
        {showImages()}
        </Slider>
        <div onClick={handleNext}  style={{top:'41.2%',right:'1.9%',zIndex:2,position:'absolute',background:'#b2bec3',opacity:'0.7',width:30,height:30,borderRadius:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <KeyboardArrowRightIcon  style={{color:'#fff'}}/>
        </div>
    </div>)
}