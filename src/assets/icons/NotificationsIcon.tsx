type NotificationsIconProps = {
	width: string;
	height: string;
	styles?: string;
};

const NotificationsIcon = ({
	width,
	height,
	styles,
}: NotificationsIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		className={styles}
		viewBox="0 0 20 20"
	>
		<path
			fill="currentColor"
			d="M15.833 7.292a3.126 3.126 0 0 1 0-6.25 3.126 3.126 0 0 1 0 6.25m0-5a1.88 1.88 0 0 0-1.875 1.875c0 1.033.842 1.875 1.875 1.875a1.88 1.88 0 0 0 1.875-1.875 1.88 1.88 0 0 0-1.875-1.875"
		></path>
		<path
			fill="currentColor"
			d="M12.5 18.958h-5c-4.525 0-6.458-1.933-6.458-6.458v-5c0-4.525 1.933-6.458 6.458-6.458h4.167a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625H7.5c-3.842 0-5.208 1.366-5.208 5.208v5c0 3.842 1.366 5.208 5.208 5.208h5c3.842 0 5.208-1.366 5.208-5.208V8.333a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625V12.5c0 4.525-1.933 6.458-6.458 6.458"
		></path>
	</svg>
);

export default NotificationsIcon;
