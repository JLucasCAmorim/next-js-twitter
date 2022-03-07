interface ICircularProgress {
	value: number
	limit: number
}
const CircularProgress = ({ value, limit }: ICircularProgress) => {
	const circumference = 22 * 2 * Math.PI
	const percent = Math.ceil((value / limit) * 100)
	const calc = circumference - (percent / 100) * circumference
	return (
		<div className="inline-flex items-center justify-center overflow-hidden rounded-full left-5">
			<svg className="w-14 h-14">
				<circle
					className="text-gray-300"
					strokeWidth="5"
					stroke="currentColor"
					fill="transparent"
					r="22"
					cx="27"
					cy="27"
				/>
				<circle
					className={percent > 100 ? "text-red-600" : "text-blue-600"}
					strokeWidth="5"
					strokeDasharray={circumference}
					strokeDashoffset={percent > 100 ? 0 : calc}
					strokeLinecap="round"
					stroke="currentColor"
					fill="transparent"
					r="22"
					cx="27"
					cy="27"
				/>
			</svg>
			<span
				className={`absolute text-[8px] font-bold ${
					percent > 100 ? "text-red-600" : "text-blue-600"
				}`}
				x-text={`${percent}%`}
			>
				{`${value}/${limit}`}
			</span>
		</div>
	)
}

export default CircularProgress
