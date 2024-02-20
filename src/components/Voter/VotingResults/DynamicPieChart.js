import { Bar } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);

function DynamicPieChart({ data }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  // Convert BigInt values to regular numbers
  const formattedData = data.map((entry, index) => ({
    ...entry,
    votes: Number(entry.votes),
    barKey: `bar-${index}`, // Unique key for each bar
  }));
  const   A = formattedData.map((item,index)=>{
   return item.name
  })
  const B = formattedData.map((item,index)=>{
    return item.votes
  })
	return (
		<div className="grid  place-items-center">
			
			<div style={{ maxWidth: "250px" }} className="items-center">
				<Bar
					data={{
						// Name of the variables on x-axies for each bar
						labels:A,
						datasets: [
							{
								// Label for bars
								label: "Votes",
								// Data or value of your each variable
								data: B,
								// Color of each bar
								backgroundColor: 
									COLORS,
								// Border color of each bar
								borderColor: COLORS,
								borderWidth: 0.5,
							},
						],
					}}
					// Height of graph
					height={400}
					options={{
						maintainAspectRatio: false,
						scales: {
							yAxes: [
								{
									ticks: {
								// The y-axis value will start from zero
										beginAtZero: true,
									},
								},
							],
						},
						legend: {
							labels: {
								fontSize: 15,
							},
						},
					}}
				/>
			</div>
		</div>
	);
}

export default DynamicPieChart;




/*

 <BarChart width={400} height={400} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {formattedData.map((entry, index) => (
        <Bar key={`bar-${index}`} dataKey="votes" fill={COLORS[index % COLORS.length]} />
      ))}
      
    </BarChart>

*/

