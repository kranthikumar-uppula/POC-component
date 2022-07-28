import './App.css';
import Carousel from './components/Carousel/Carousel';
import Forms from './components/Forms/Forms';
import DragDrop from './components/Dropzone/DragDrop';
import MultiLanguage from './components/MultiLanguage/MultiLanguage';

//components
const imageUrls = [
  { id: 1, url: 'https://da.lowes.ca/webassets/images/834522_10385055_001_l.jpg', type: 'img' },
  { id: 2, url: 'https://cdn.renodepot.com/images/12675236_L.jpg', type: 'img' },
  { id: 3, url: 'https://mobileimages.lowes.com/productimages/aad2dfda-856c-4018-b299-d4808b7108e1/00434040.jpg?size=xl', type: 'img' },
  { id: 4, url: 'https://images.homedepot-static.com/productImages/5988e738-2591-4a31-af4c-54fb2518c5e5/svn/purely-organic-products-fruit-vegetable-fertilizer-tvjrdk1-64_1000.jpg', type: 'img' },
  { id: 5, url: 'https://images.thdstatic.com/productImages/11dfe643-8fa8-4ed3-9231-5627b36c3570/svn/rite-green-lawn-fertilizers-150033-64_1000.jpg', type: 'img' },
  { id: 6, url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', type: 'video'},
]


function App() {

  return (
    <div className="App">
      <Forms />
      <br />
      <br />
      {/* <Carousel images = {imageUrls}/> */}
      <br />
      <br />
      <DragDrop />
      <br />
      <br />
      {/* <MultiLanguage /> */}
    </div>
  );
}

export default App;
