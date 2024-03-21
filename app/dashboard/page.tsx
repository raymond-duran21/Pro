import EchartsBarChart from "../ui/components/Graphics/BarChart";
import EchartsPieChart from "../ui/components/Graphics/PieChart";

export default function Dashboard() {

    return (
        <div className="">
          <EchartsPieChart/>
          <EchartsBarChart/>  
        </div>
    )
  }