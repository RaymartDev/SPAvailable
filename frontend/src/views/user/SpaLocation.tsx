import { useState } from 'react';
import NavbarLogged from '../../components/Navbar/NavbarLogged';
import { useAppSelector } from '../../store/store';
import Loader from '../../components/Loader Component/Loader';
import Image22 from '../../img/image22.png';
import Loc1 from '../../img/Loc1.png';
import Loc2 from '../../img/Loc2.png';
import Loc3 from '../../img/Loc3.png';
import Loc4 from '../../img/Loc4.png';
import Loc5 from '../../img/Loc5.png';
import Loc6 from '../../img/Loc6.png';
import Loc7 from '../../img/Loc7.png';
import Loc8 from '../../img/Loc8.png';
import Loc9 from '../../img/Loc9.png';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';

function SpaLocation() {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <NavbarLogged setLoading={setLoading} user={user} />
      <div className="flex relative h-[450px] md:h-[598px]">
        <img alt="cover" src={Image22} className="object-cover h-full w-full" />
        <div className="absolute flex flex-col top-0 left-0 justify-center items-center h-full w-full">
          <h1 className="font-bold text-slate-50 text-5xl text-center md:text-8xl text-stroke-black">
            Find your perfect spa
          </h1>
        </div>
      </div>
      <div className="flex bg-white w-full items-center justify-center py-20">
        <div className="flex flex-col w-8/12 gap-y-20">
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-3 items-center">
              <h1 className="bg-[#41924B] text-3xl text-white px-10 py-3">1</h1>
              <h1 className="font-bold text-3xl">
                Getting The Google Map Code
              </h1>
            </div>

            <div className="flex flex-col gap-y-10">
              <div className="flex flex-col rounded-3xl bg-[#41924B]">
                <div>
                  <img src={Loc1} alt="" className="rounded-t-3xl" />
                </div>
                <div className="flex gap-3 items-center text-white py-5">
                  <h1 className="text-2xl px-10 py-3">1</h1>
                  <p className="text-xl pr-10">
                    Go to the location you want to share at
                    https://www.google.com/maps. This will open a map
                    specifically within Google Maps
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-y-10">
                <div className="flex flex-col rounded-3xl bg-[#41924B]">
                  <div>
                    <img src={Loc2} alt="" className="rounded-t-3xl" />
                  </div>
                  <div className="flex gap-3 items-center text-white py-5">
                    <h1 className="text-2xl px-10 py-3">2</h1>
                    <p className="text-xl pr-10">
                      Click ☰. This is in the left of the browser window.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-10">
                <div className="flex flex-col rounded-3xl bg-[#41924B]">
                  <div>
                    <img src={Loc3} alt="" className="rounded-t-3xl" />
                  </div>
                  <div className="flex gap-3 items-center text-white py-5">
                    <h1 className="text-2xl px-10 py-3">3</h1>
                    <p className="text-xl pr-10">
                      Click Share or embed map. You might see “Link to this map”
                      instead. This option is toward the bottom of the menu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-10">
                <div className="flex flex-col rounded-3xl bg-[#41924B]">
                  <div>
                    <img src={Loc4} alt="" className="rounded-t-3xl" />
                  </div>
                  <div className="flex gap-3 items-center text-white py-5">
                    <h1 className="text-2xl px-10 py-3">4</h1>
                    <p className="text-xl pr-10">Click the Embed a map tab.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-10">
                <div className="flex flex-col rounded-3xl bg-[#41924B]">
                  <div>
                    <img src={Loc5} alt="" className="rounded-t-3xl" />
                  </div>
                  <div className="flex gap-3 items-center text-white py-5">
                    <h1 className="text-2xl px-10 py-3">5</h1>
                    <p className="text-xl pr-10">
                      Select the size of the map you want. Next to the field of
                      text, you’ll see SMALL, MEDIUM, LARGE, or CUSTOM SIZE.
                      Click the small arrow pointing down to change the map
                      size.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-10">
                <div className="flex flex-col rounded-3xl bg-[#41924B]">
                  <div>
                    <img src={Loc6} alt="" className="rounded-t-3xl" />
                  </div>
                  <div className="flex gap-3 items-center text-white py-5">
                    <h1 className="text-2xl px-10 py-3">6</h1>
                    <p className="text-xl pr-10">Click the Embed a map tab.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <div className="flex gap-3 items-center">
              <h1 className="bg-[#41924B] text-3xl text-white px-10 py-3">2</h1>
              <h1 className="font-bold text-3xl">
                Embedding the Google Map Code
              </h1>
            </div>

            <div className="flex flex-col gap-y-10">
              <div className="flex flex-col rounded-3xl bg-[#41924B]">
                <div>
                  <img src={Loc7} alt="" className="rounded-t-3xl" />
                </div>
                <div className="flex gap-3 items-center text-white py-5">
                  <h1 className="text-2xl px-10 py-3">1</h1>
                  <p className="text-xl pr-10">
                    Open your HTML. You could use a program like Dreamweaver or
                    use a simple word-processing app like Notepad and TextEdit
                    in which you edit your HTML file.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-y-10">
                <div className="flex flex-col rounded-3xl bg-[#41924B]">
                  <div>
                    <img src={Loc8} alt="" className="rounded-t-3xl" />
                  </div>
                  <div className="flex gap-3 items-center text-white py-5">
                    <h1 className="text-2xl px-10 py-3">2</h1>
                    <p className="text-xl pr-10">
                      Navigate to where you want to embed the Google Map code.
                      In applications like Dreamweaver, you can see what the
                      code translates into on a web page, so you can easily
                      navigate through the HTML code. Without those
                      applications, you will need to know where you are on the
                      web page by looking at the code.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-10">
                <div className="flex flex-col rounded-3xl bg-[#41924B]">
                  <div>
                    <img src={Loc9} alt="" className="rounded-t-3xl" />
                  </div>
                  <div className="flex gap-3 items-center text-white py-5">
                    <h1 className="text-2xl px-10 py-3">3</h1>
                    <p className="text-xl pr-10">
                      Paste the Google Maps code.You can use keyboard shortcuts
                      by pressing Ctrl+P (Windows) or ⌘ Cmd+P (Mac). On a mobile
                      device, you can long-tap the text field and tap “Paste”
                      when the option appears.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Menu />
      <Footer />
    </div>
  );
}

export default SpaLocation;
