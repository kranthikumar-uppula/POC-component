// export default DragDrop;
import { Box, Button, Card, LinearProgress, linearProgressClasses, styled } from '@mui/material';
import { DropzoneArea } from 'material-ui-dropzone';
import { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import './styles.scss'
import { v4 as uuid } from 'uuid';

const DragDrop = () => {

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  const MAX_FILE_ALLOWED = 5;
  const [file, setFile] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false)
  const handleChange = (e) => {
    if (e && e.length) {
      const singleFile = {
        file: e[0],
        size:e[0].size,
        name: e[0].name,
        url: URL.createObjectURL(e[0]),
        type: e[0].type,
        id: uuid(),
      };
      if(file.length === MAX_FILE_ALLOWED) {
        return;
      } else {
        setFile([...file, singleFile]);
      }
      console.log(file)
    }
  };

  const SelectFileBtn = () => (
    <Button
      className='upload-btn'
      color="primary"
      size="large"
      variant='contained'
      sx={{fontWeight: 700}}
    >
     {
      file.length < 1 ? ' Choose file to upload' : ' + Add another file'
     }
    </Button>
  );

  const toggleCarousel = () =>{
    if(showCarousel)
      setShowCarousel(false);
    else
      setShowCarousel(true);
  }

  const deleteButton = (id) => {
    const tempImageArray = file.filter(img => {
        return img.id !== id;
    })
    setFile(tempImageArray);
    if(tempImageArray.length === 0){
      setShowCarousel(false);
    }
  }

  const handleSizeConversion = (size) => {
    const itemSize = parseInt(size)/1048576;
    const roundedFigure = Math.trunc(itemSize);
    console.log(roundedFigure);
    if(roundedFigure > 0){
        return `${itemSize.toPrecision(3)} MB`;
    } else if(roundedFigure === 0){
        const itemSizeInKb = parseInt(size)/1024;
        return `${itemSizeInKb.toPrecision(5)} KB`
    }
  }

  return (
    <div style={{width: '428px', height: '242px', margin: '150px auto', position: 'relative'}}>
       {
        showCarousel ? 
        <Carousel deleteImage={deleteButton} images={file}/>
        :
        <DropzoneArea 
          dropzoneClass={ file.length < 1 ? '' : 'on-file-drop'}
          dropzoneProps={{ disabled: false }}
          onChange={handleChange}
          dropzoneText={'Drag and drop files here, or'}
          Icon={SelectFileBtn}
          maxFileSize={52428800}
          acceptedFiles={['.png', '.jpeg','.mov','.mp4','.mpeg']}
          filesLimit={1}
          showAlerts={['error', 'info']}
          showPreviews={false}
          showPreviewsInDropzone={false}
        />
       }
        {
          file.length < 1 ? 
          <div className="info-messages">
            <p className="support-msg">Please upload images with format JPEG, PNG,</p>
            <p className="support-msg">Please upload video with format MP4, MPEG, MOV</p>
          </div>
          :
          !showCarousel && 
          <div className="info-btn">
            <Button variant='contained' className='save-btn' size='large' onClick={toggleCarousel}>Save and continue</Button>
          </div>
        }
        {
          file.length < 1 ? '' : 
          <>
            <Card sx={{ borderRadius: '4px', width: 425, margin: '20px auto 20px auto'}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '7px 5px 0px 5px'}}>
                  <div style={{padding: 0, marginLeft: 5, display:'grid'}}>
                    <span style={{fontSize: 15, fontWeight: 600}}>{file[file.length-1].name}</span>
                    <span style={{textAlign: 'start', fontSize: 12, fontWeight: 500, color: 'grey'}}>{ handleSizeConversion(file[file.length-1].size) }</span>
                  </div>
                  <div style={{padding: '0px 7px', marginRight: 5,marginBottom: 12, backgroundColor: '#f5f4f2', fontSize: 14,color: 'grey',fontWeight: 600, borderRadius: 10}}>{file.length}/{MAX_FILE_ALLOWED}</div>
              </Box>
              <Box sx={{width: 410, margin: '0px auto 10px auto', paddingTop: 0}}>
                <br />
                <BorderLinearProgress variant="determinate" value={file.length*20} />
              </Box>
            </Card>   
            {
              showCarousel && file.length < 5 ? 
              <Button variant='contained' size='large' className='add-more-btn' onClick={toggleCarousel}>+ Add another file</Button>
              :
              ''
            }
          </>
        }
    </div>
  )
}

export default DragDrop;