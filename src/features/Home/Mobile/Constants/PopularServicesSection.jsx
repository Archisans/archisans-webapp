
//contract
import Civil_Contractor_Img from "@/assets/Images/Civil_Contractor_Img.jpeg";
import InteriorDesignerImg from "@/assets/Images/InteriorDesignerImg.jpeg";
import Roofing_Contractor_Img from "@/assets/Images/Roofing_Contractor_Img.jpeg";
import Painters_Img from "@/assets/Images/Painters_Img.png";
import Excavation_Contractor_Img from "@/assets/Images/Excavation_Contractor_Img.jpeg";

//Architect
import PoolDesigning from "@/assets/Images/PoolDesignerImg.png";
import ArchitecturalDesigner from "@/assets/Images/ArchitecturalDesignerImg.png";
import CivilEngineer from "@/assets/Images/CivilEngineerImg.png";
import LandScapeArchitect from "@/assets/Images/LandScapeArchitectImg.png";

//Fabricators
import Stainless_Steel_Fabricator_Img from "@/assets/Images/Stainless_Steel_Fabricator_Img.png";
import Glass_Fabricators_Img from "@/assets/Images/Glass_Fabricators_Img.jpeg";
import Roofing_Specialist_Img from "@/assets/Images/Roofing_Specialist_Img.png";

//Engineers
import Electrical_Engineer_Img from "@/assets/Images/Electrical_Engineer_Img.png";
import Geologist_Engineer_Img from "@/assets/Images/Geologist_Engineer_Img.png";
import Structural_Engineering_Img from "@/assets/Images/Structural_Engineering_Img.jpeg";

//Artisans
import Masons_Img from "@/assets/Images/Masons_Img.jpeg";
import Carpenters_Img from "@/assets/Images/Carpenters_Img.jpeg";
import Plumbers_Img from "@/assets/Images/Plumbers_Img.png";
import Electrician_Img from "@/assets/Images/Electrician_Img.png";
import WaterProofing_Img from "@/assets/Images/WaterProofing_Img.png";


export const PopularServicesSection = {
  
  contract: [
    { name: "Civil Contractors", icon: Civil_Contractor_Img, link: "/workers/civil-contractors" },
    { name: "Interior Contractors", icon: InteriorDesignerImg, link: "/workers/electrical-contractors" },
    { name: "Rooofing Contractors", icon: Roofing_Contractor_Img, link: "/workers/roofing-contractors" },
    { name: "Painting Contractors", icon: Painters_Img, link: "/workers/plumbing-contractors" },
    { name: "Excavation Contractors", icon: Excavation_Contractor_Img, link: "/workers/excavation-contractors" },
  ],

  architect: [
    { name: "Architectural Designers", icon: ArchitecturalDesigner, link: "/workers/architectural-designers" },
    { name: "Landscape Architects", icon: LandScapeArchitect, link: "/workers/landscape-architects" },
    { name: "Pool Designers", icon: PoolDesigning, link: "/workers/pool-designers" },
    { name: "Civil Engineers", icon: CivilEngineer, link: "/workers/civil-engineers" },
  ],

  fabrication: [
    { name: "Stainless Steel Fabricators", icon: Stainless_Steel_Fabricator_Img, link: "/workers/stainless-steel-fabricators" },
    { name: "Glass Fabricators", icon: Glass_Fabricators_Img, link: "/workers/glass-fabricators" },
    { name: "Roofing Specialists", icon: Roofing_Specialist_Img, link: "/workers/roofing-specialists" },
  ],

  engineering: [
    { name: "Electrical Engineers", icon: Electrical_Engineer_Img, link: "/workers/electrical-engineers" },
    { name: "Civil Engineers", icon: CivilEngineer, link: "/workers/civil-engineers" },
    { name: "Geologists", icon: Geologist_Engineer_Img, link: "/workers/geologists" },
    { name: "Structural Engineers", icon: Structural_Engineering_Img, link: "/workers/structural-engineers" },
  ],

  artisans: [
    { name: "Masons", icon: Masons_Img, link: "/workers/masons" },
    { name: "Carpenters", icon: Carpenters_Img, link: "/workers/carpenters" },
    { name: "Plumbers", icon: Plumbers_Img, link: "/workers/plumbers" },
    { name: "Painters", icon: Painters_Img, link: "/workers/painters" },
    { name: "Electricians", icon: Electrician_Img, link: "/workers/electricians" },
    { name: "WaterProofing Specialists", icon: WaterProofing_Img, link: "/workers/waterproofing-specialists" },
  ],
};

