type TransactionsIconProps = {
	width: string;
	height: string;
};

const TransactionsIcon = ({ width, height }: TransactionsIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		fill="none"
		viewBox="0 0 20 20"
	>
		<path
			fill="currentColor"
			d="M7.508 17.708a.62.62 0 0 1-.441-.183L2.892 13.35a.63.63 0 0 1 0-.883.63.63 0 0 1 .883 0l4.175 4.175a.63.63 0 0 1 0 .883.66.66 0 0 1-.442.183"
		></path>
		<path
			fill="currentColor"
			d="M7.508 17.708a.63.63 0 0 1-.625-.625V2.917a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v14.166a.63.63 0 0 1-.625.625M16.675 7.717a.62.62 0 0 1-.442-.184l-4.175-4.175a.63.63 0 0 1 0-.883.63.63 0 0 1 .884 0l4.175 4.175a.63.63 0 0 1 0 .883.62.62 0 0 1-.442.184"
		></path>
		<path
			fill="currentColor"
			d="M12.492 17.708a.63.63 0 0 1-.625-.625V2.917a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v14.166a.624.624 0 0 1-.625.625"
		></path>
	</svg>
);

export default TransactionsIcon;
