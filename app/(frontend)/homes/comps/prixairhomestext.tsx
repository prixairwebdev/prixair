const PrixairIntro: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/redonelogo.png" 
            alt="Prixair Homes Logo" 
            className="h-16 md:h-20 object-contain"
          />
        </div>
        
      
        
        {/* Description */}
        <p className="max-w-3xl mx-auto leading-relaxed text-lg md:text-xl text-orange-50 mb-8">
          Prixair Homes Nigeria Limited is a Nigerian corporation that specializes in the retailing of one-of-a-kind
          building construction finishing and interior furnishing materials. Our product line includes Sanitary Wares,
          Glass Products, Porcelain and Ceramic Tiles, Security and Panel Doors, Stone Coated Roofing Sheets, Wall Papers,
          Sofas, Dining Sets, Bed Sets, and Wardrobes. Our products are designed with the dual goals of quality and modern
          architectural finishing in mind. As a result, modern architects, interior designers, and homeowners looking for
          long-lasting finishing materials that meet the aesthetic objectives of their projects now have a place to shop.
        </p>
      
      </div>
    </section>
  );
};

export default PrixairIntro;