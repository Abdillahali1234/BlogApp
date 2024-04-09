import Category from "./Category";
import {categories} from "../../../dummyData";
export default function Header() {
  return (
    <>
      <section className="flex items-center justify-center py-8">
        <div className="flex items-center justify-center flex-col text-center gap-[20px]">
          <h3 className="text-[54px] text-[#183B56]">
            Read the most
            <br />
            interesting articles
          </h3>
          <div className="text-[#183B56] w-[500px] lg:max-w-[350px] ">
            blog app to share your posts with others and learn more about them
            on the blog blog app to share your posts with others and learn more
            about them on the blog
          </div>
          <div className="py-3 ">
            <form
              className="relative w-fit"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <div>
                <span className="icon-search">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search article"
                  className="border-none outline-none  italic w-[600px] lg:w-[360px] shadowMod py-[10px] px-[35px] rounded-[9px] text-[18px]"
                />
              </div>

              <button
                className="bg-[#1565D8] py-[4px] px-[9px] text-white rounded-[9px] w-[94]   absolute right-[6px]
              top-[50%] translate-y-[-50%]
              ">
                Search
              </button>
            </form>
          </div>
          <Category categories={categories} />
        </div>
        <div className="w-[500px] hidden  lg:flex">
          <img src="../../../public/imagesIcon/HeroImage.svg" alt="" />
        </div>
      </section>
    </>
  );
}
