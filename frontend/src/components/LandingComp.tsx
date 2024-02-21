/* eslint-disable react/no-array-index-key */
import Image1 from '../img/image1.png';
import Image2 from '../img/image2.png';
import Image3 from '../img/image3.png';
import Image4 from '../img/image4.png';
import Image5 from '../img/image5.png';
import Image6 from '../img/image6.png';
import Image7 from '../img/image7.png';
import Image8 from '../img/image8.png';

function LandingComp() {
  const items = [
    { image: Image1, title: 'Massage' },
    { image: Image2, title: 'Couple Massage' },
    { image: Image3, title: 'Ayurveda' },
    { image: Image4, title: 'Hot Stone Massage' },
    { image: Image5, title: 'Aromatherapy' },
    { image: Image6, title: 'Deep Tissue Massage' },
    { image: Image7, title: 'Facial' },
    { image: Image8, title: 'Acne Facial' },
  ];

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-3xl border-2 p-2 mx-4 mt-8 hover:shadow-lg s"
        >
          <div className="flex flex-col h-full justify-center items-center cursor-pointer p-5 ">
            <img
              src={item.image}
              className="object-cover w-full h-full rounded-3xl hover:scale-105 duration-500"
              alt={item.title}
            />
            <p className="md:text-xl text-lg mt-5">{item.title}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default LandingComp;
