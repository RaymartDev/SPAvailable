/* eslint-disable react/no-array-index-key */
import Image1 from '../img/image1.png';
import Image2 from '../img/image2.png';
import Image3 from '../img/image3.png';
import Image4 from '../img/image4.png';
import Image5 from '../img/image5.png';
import Image6 from '../img/image6.png';
import Image7 from '../img/image7.png';
import Image8 from '../img/image8.png';

function OurTeam() {
  const items = [
    {
      image: Image1,
      title: 'Project Manager/Backend Developer/Database Designer',
    },
    { image: Image2, title: 'Software Engineer' },
    { image: Image3, title: 'Frontend Developer' },
    { image: Image4, title: 'Documentator' },
    { image: Image5, title: 'Mobile Developer' },
    { image: Image6, title: 'UI' },
    { image: Image7, title: 'UI' },
    { image: Image8, title: 'UI' },
  ];

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-3xl border-2 p-2 mx-4 mt-8 hover:shadow-lg"
        >
          <div className="flex flex-col h-full justify-center items-center cursor-pointer p-5 ">
            <div className="w-full h-full mb-2 flex items-center justify-center">
              <div
                className="rounded-full overflow-hidden"
                style={{ width: '300px', height: '290px' }} // Adjust width and height as needed
              >
                <img
                  src={item.image}
                  className="object-cover w-full h-full hover:scale-105 duration-500"
                  alt={item.title}
                />
              </div>
            </div>
            <div className="h-1/5">
              <p className="md:text-xl text-l text-center mt-5">{item.title}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OurTeam;
