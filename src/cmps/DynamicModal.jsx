import { useState } from "react"
import { useSelector } from "react-redux"
import { onToggleModal } from "../store/actions/app.actions"


export function DynamicModal() {
	// const [modalData, setModalData] = useState({})
	const modalData = useSelector((storeState) => storeState.appModule.modalData)

	function onCloseModal() {
		// setModalData(null)
		onToggleModal()
	}

	console.log('modalData', modalData)
	if (!modalData) return <></>
	const Cmp = modalData.cmp
	return (
		<div className="dynamic-modal">
			<button className="close" onClick={onCloseModal}>X</button>
			<section className="content">
				{Cmp && <Cmp {...modalData.props} />}
			</section>
		</div>
	)
}

