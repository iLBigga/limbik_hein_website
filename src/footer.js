const Footer = () => {
  const year = new Date().getFullYear();

  return (
  <footer className="flex justify-between align-middle">
    <span className="text-[10px] ">{`Copyright © ${year}`}</span>
    <div className="text-[8px] flex align-middle">
      <span className="pr-5">website by:</span>
      <div className="flex flex-col align-middle">
        <span>Luca Dibenedetto</span>
        <span>Lorenzo Giannanti</span>
      </div>
    </div>
  </footer>
  );
};

export default Footer;