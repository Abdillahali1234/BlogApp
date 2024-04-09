export default function Footer() {
  return (
    <div className="bg-[#0275d8] text-[15px] sm:text-[17px] md:text-[19px] flex justify-center items-center h-[50px]">
      Copyright to Eng/Abdullah Ali Sapry &copy; Year:
      {new Date().getFullYear().toString()}
    </div>
  );
}
