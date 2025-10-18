import { RouteProvider } from "@/config/RouteProvider";

import AllIcon from "@/assets/Images/All.png";
import Artisans from "@/assets/Images/Artisans.png";
import FabricationIcon from "@/assets/Images/Fabrication.png";
import ArchitecturalIcon from "@/assets/Images/Architectural.png";
import EducationalIcon from "@/assets/Images/Educational.png";
import ContractorsIcon from "@/assets/Images/Contractors.png";
import EngineersIcon from "@/assets/Images/Engineers.png";
import InstantIcon from "@/assets/Images/Instant.png";

export const subCategories = [
  { label: "All Services", icon: AllIcon, color: "#FF6B6B", count: "500+",path:RouteProvider.USER_ADDRESS_SAVED },
  { label: "Instant", icon: InstantIcon, color: "#4ECDC4", count: "50+",path:RouteProvider.USER_HOME },
  { label: "Engineers", icon: EngineersIcon, color: "#45B7D1", count: "120+",path:RouteProvider.USER_HOME },
  { label: "Artisans", icon: Artisans, color: "#96CEB4", count: "200+",path:RouteProvider.USER_HOME },
  { label: "Educational Services", icon: EducationalIcon, color: "#FECA57", count: "30+",path:RouteProvider.USER_HOME },
  { label: "Architects", icon: ArchitecturalIcon, color: "#FF9FF3", count: "80+",path:RouteProvider.USER_HOME },
  { label: "Contractors", icon: ContractorsIcon, color: "#54A0FF", count: "150+",path:RouteProvider.USER_HOME },
  { label: "Fabrication Services", icon: FabricationIcon, color: "#5F27CD", count: "90+",path:RouteProvider.USER_HOME },
];

