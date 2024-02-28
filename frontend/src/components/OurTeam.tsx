/* eslint-disable react/no-array-index-key */
import Raymart from '../img/MART.png';
import Juliet from '../img/BAUTISTA.png';
import Lloyd from '../img/LLOYD.jpg';
import Adoc from '../img/ADOC.png';
import Bucad from '../img/BUCAD.png';
import Image6 from '../img/image6.png';
import Image7 from '../img/image7.png';
import Image8 from '../img/image8.png';

function OurTeam() {
  const items = [
    { image: Raymart, title: 'Project Manager / Backend Developer' },
    { image: Juliet, title: 'Software Engineer' },
    { image: Lloyd, title: 'Frontend Developer' },
    { image: Adoc, title: 'Mobile App Developer' },
    { image: Bucad, title: 'Documentator' },
    { image: Image6, title: 'UI / UX' },
    { image: Image7, title: 'UI / UX' },
    { image: Image8, title: 'UI / UX' },
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
                className="rounded-full overflow-hidden border-[#41924B] border-4"
                style={{ width: '300px', height: '290px' }}
              >
                <img
                  src={item.image}
                  className="object-cover w-full h-full hover:scale-105 duration-500"
                  alt={item.title}
                />
              </div>
            </div>
            <div className="h-1/5">
              <p className="md:text-xl text-lg text-center mt-5">
                {item.title}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OurTeam;
