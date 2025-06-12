import React from "react";
import { motion } from "framer-motion";

const resources = [
	{
		title: "Crop Management Fundamentals",
		type: "Video Course",
		description:
			"Comprehensive video series covering basic to advanced crop management techniques, pest control, and yield optimization.",
		duration: "8 hours",
		topics: [
			"Soil Preparation",
			"Crop Rotation",
			"Pest Management",
			"Harvest Techniques",
		],
		level: "Beginner",
		color: "bg-[#606C38]",
		link: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/crop-management", // Link to a course on Coursera
	},
	{
		title: "Sustainable Farming Practices",
		type: "Interactive Guide",
		description:
			"Learn about eco-friendly farming methods, organic cultivation, and sustainable resource management.",
		duration: "6 hours",
		topics: [
			"Organic Farming",
			"Water Conservation",
			"Natural Fertilizers",
			"Biodiversity",
		],
		level: "Intermediate",
		color: "bg-[#283618]",
		link: "https://www.coursera.org/learn/sustainable-agriculture", // Link to a course on edX
	},
	{
		title: "Modern Agricultural Technology",
		type: "Workshop Series",
		description:
			"Explore modern farming technologies, smart irrigation systems, and precision agriculture techniques.",
		duration: "10 hours",
		topics: [
			"Smart Irrigation",
			"Drone Technology",
			"IoT in Agriculture",
			"Data Analytics",
		],
		level: "Advanced",
		color: "bg-[#606C38]",
		link: "https://www.futurelearn.com/courses/modern-agricultural-technology", // Link to a course on FutureLearn
	},
	{
		title: "Financial Management for Farmers",
		type: "Online Course",
		description:
			"Master financial planning, budgeting, and risk management specifically tailored for agricultural businesses.",
		duration: "5 hours",
		topics: [
			"Budgeting",
			"Risk Management",
			"Credit Planning",
			"Market Analysis",
		],
		level: "Beginner",
		color: "bg-[#283618]",
		link: "https://www.udemy.com/course/financial-management-for-farmers/", // Link to a course on Udemy
	},
	{
		title: "Agricultural Marketing Skills",
		type: "Practical Guide",
		description:
			"Learn effective marketing strategies for agricultural products and direct-to-consumer sales techniques.",
		duration: "4 hours",
		topics: [
			"Market Research",
			"Digital Marketing",
			"Value Chain",
			"Pricing Strategies",
		],
		level: "Intermediate",
		color: "bg-[#606C38]",
		link: "https://www.agriculture.gov.au/ag-farm-food/agricultural-marketing-skills", // Link to an Australian government resource
	},
	{
		title: "Climate-Smart Agriculture",
		type: "Certificate Course",
		description:
			"Understanding climate change impacts on agriculture and adaptation strategies for sustainable farming.",
		duration: "12 hours",
		topics: [
			"Climate Adaptation",
			"Resilient Crops",
			"Weather Monitoring",
			"Risk Mitigation",
		],
		level: "Advanced",
		color: "bg-[#283618]",
		link: "https://www.coursera.org/learn/climate-smart-agriculture", // Link to a course on Coursera
	},
];

const ResourceCard = ({ resource, index }) => {
	const isEven = index % 2 === 0;

	return (
		<motion.div
			initial={{ opacity: 0, x: isEven ? -20 : 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className={`w-full ${isEven ? "mt-0" : "mt-8 md:mt-16 "}`}
		>
			<motion.div
				className="relative h-full rounded-3xl shadow-xl overflow-hidden transform-gpu backdrop-blur-lg"
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.3 }}
			>
				{/* Decorative Elements */}
				<div className="absolute -top-10 -right-10 w-32 h-32 bg-[#DDA15E]/20 rounded-full blur-2xl" />
				<div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#606C38]/20 rounded-full blur-2xl" />

				<div
					className={`relative p-8 h-full bg-gradient-to-br from-${resource.color}/95 to-${resource.color} text-[#FEFAE0]`}
				>
					<div className="space-y-6">
						{/* Header Section */}
						<div className="flex flex-col gap-4">
							<div className="flex justify-between items-center">
								<span className="px-4 py-1.5 bg-[#FEFAE0]/10 rounded-full text-[#FEFAE0]/90 text-sm font-medium">
									{resource.level}
								</span>
								<span className="text-[#DDA15E] font-medium">
									{resource.duration}
								</span>
							</div>
							<h2 className="text-3xl font-bold leading-tight">
								{resource.title}
							</h2>
							<div className="flex items-center gap-3">
								<span className="px-3 py-1 bg-[#DDA15E] text-[#283618] rounded-lg text-sm font-medium">
									{resource.type}
								</span>
							</div>
						</div>

						{/* Description Card */}
						<motion.div
							className="bg-[#FEFAE0]/5 backdrop-blur-md rounded-2xl p-6"
							whileHover={{ scale: 1.01 }}
						>
							<p className="text-[#FEFAE0]/90 leading-relaxed">
								{resource.description}
							</p>
						</motion.div>

						{/* Topics Grid */}
						<div className="space-y-3">
							<h3 className="text-xl font-semibold text-[#DDA15E]">
								What you'll learn
							</h3>
							<div className="grid grid-cols-2 gap-2">
								{resource.topics.map((topic, i) => (
									<motion.div
										key={i}
										className="px-4 py-2 bg-[#FEFAE0]/10 rounded-xl text-[#FEFAE0] text-sm"
										whileHover={{
											scale: 1.05,
											backgroundColor: "rgba(254, 250, 224, 0.2)",
										}}
										whileTap={{ scale: 0.95 }}
									>
										{topic}
									</motion.div>
								))}
							</div>
						</div>

						{/* Action Button */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full px-8 py-4 bg-gradient-to-r from-[#DDA15E] to-[#BC6C25] text-[#283618] rounded-xl font-semibold shadow-lg transition-all duration-300"
							onClick={() => window.open(resource.link, "_blank")}
						>
							Start Your Journey
						</motion.button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

const LearningResourcesPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#8ad08d] to-[#39aa3c]/90 py-20 px-6">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="max-w-7xl mx-auto relative"
			>
				{/* Decorative Background Elements */}
				<div className="absolute top-0 left-0 w-72 h-72 bg-[#606C38]/10 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DDA15E]/10 rounded-full blur-3xl" />

				{/* Header Section */}
				<motion.div
					className="relative text-center mb-20"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<span className="inline-block px-6 py-2 bg-[#283618]/10 text-[#283618] rounded-full text-sm font-medium mb-4">
						Curated Learning Paths
					</span>
					<h1 className="text-5xl md:text-6xl font-bold text-[#283618] mb-6">
						Agricultural Excellence
					</h1>
					<p className="text-xl text-[#606C38] max-w-2xl mx-auto leading-relaxed">
						Discover comprehensive learning resources crafted for the modern farmer,
						empowering you with knowledge and skills for sustainable success.
					</p>
				</motion.div>

				{/* Resources Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 relative">
					{resources.map((resource, index) => (
						<ResourceCard key={index} resource={resource} index={index} />
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default LearningResourcesPage;