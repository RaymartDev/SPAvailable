/* eslint-disable react/no-array-index-key */
import Raymart from '../img/MART.png';
import Juliet from '../img/BAUTISTA.png';
import Lloyd from '../img/LLOYD.jpg';
import Adoc from '../img/ADOC.png';
import Bucad from '../img/BUCAD.png';
import Monzon from '../img/MONZON.png';
import Borromeo from '../img/BORROMEO1.png';
import Raby from '../img/RABY.png';

function OurTeam() {
  const items = [
    { image: Raymart, name: 'Raymart Sarmiento', title: 'Project Manager' },
    { image: Juliet, name: 'Juliet Bautista', title: 'Software Engineer' },
    { image: Lloyd, name: 'John Lloyd Itliong', title: 'Frontend Developer' },
    { image: Adoc, name: 'Romeo Adoc', title: 'Mobile App Developer' },
    { image: Bucad, name: 'Hazel Ann Bucad', title: 'Documentator' },
    { image: Monzon, name: 'John Monzon', title: 'UI / UX' },
    { image: Borromeo, name: 'John Joven Borromeo', title: 'UI / UX' },
    { image: Raby, name: 'Mark Rhicky Raby', title: 'UI / UX' },
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
              <p className="md:text-xl font-semibold text-lg text-center mt-3">
                {item.name}
              </p>
              <p className="md:text-md text-lg text-center">{item.title}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OurTeam;
