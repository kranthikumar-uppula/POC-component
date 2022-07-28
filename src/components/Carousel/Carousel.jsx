import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect, useState } from 'react';
import './carousel.scss'


const Carousel = ({ images, deleteImage }) => {
    console.log(images);
    const [count, setCount] = useState(0);
    const [imageArray, setImageArray] = useState([]);
    const [toggleButtonState, setToggleButtonState] = useState(false);

    useEffect(()=>{
        setImageArray(images);
    },[images])

    const rightButton = () => {
       if(count === imageArray.length-1){
        setCount(0)
       } else {
        setCount(count+1);
       }
    }

    const leftButton = () => {
        if(count === 0){
            setCount(imageArray.length-1)
        } else {
            setCount(count-1);
        }
    }

    const deleteButton = (id) => {
        const tempImageArray = imageArray.filter(img => {
            return img.id !== id;
        })
        setCount(tempImageArray.length-1)
        setImageArray(tempImageArray);
        deleteImage(id)
    }

    const mouseEnterFunc = () => {
        setToggleButtonState(true);
    }

    const mouseLeaveFunc = () => {
        setToggleButtonState(false);
    }

    const renderImageOrVideo = () => {
        switch( imageArray[count].type.slice(0,5) ) {
            case 'video':
                return  <video key={imageArray[count].id} width="320" height="240" controls className='video-style'>
                                <source src={imageArray[count].url} type='video /mpeg'/>
                                    Your browser does not support the video tag.
                        </video>
            case 'image':
                return <img src={imageArray[count].url} alt='' className='image-style' />;
            default:
                <p>File format not supported</p>
        }
    }

    return (
        <div className='carousel-wrapper'>
            <div className='carousel-sub-wrapper' onMouseEnter={mouseEnterFunc} onMouseLeave={mouseLeaveFunc}>
                {
                    imageArray.length > 0 ? 
                    <>
                        {
                            renderImageOrVideo()
                        }
                        <div className='carousel-control-button'>
                        {
                            toggleButtonState && 
                            <>
                                <button className="left-button" onClick={leftButton}>
                                    <KeyboardArrowLeftIcon sx={{color: 'white'}}/>
                                </button>
                                <button className="delete-button" onClick={()=>deleteButton(imageArray[count].id)} >
                                    <DeleteOutlineIcon sx={{color: 'white'}}/>
                                </button>
                                <button className="right-button" onClick={rightButton}>
                                    <ChevronRightIcon sx={{color: 'white'}} />
                                </button>
                            </>
                        }
                        </div>
                    </>
                    : <p>Please upload images to see preview</p>
                }
            </div>
        </div>
    )
}

export default Carousel;