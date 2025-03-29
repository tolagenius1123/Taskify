import { X } from "lucide-react";
import styles from "./Modal.module.css";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={onClose}>
					<X size={20} />
				</button>
				<h2>{title}</h2>
				<div className={styles.modalContent}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
