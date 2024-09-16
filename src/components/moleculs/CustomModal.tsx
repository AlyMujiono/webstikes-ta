import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

export default function CustomModal(props: { styleTBOM: any; children?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; TitleButtonOM: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<div className="flex flex-row">
				<Button onPress={onOpen} className={`${props.styleTBOM}`}>
					{props.children}{props.TitleButtonOM}</Button>
			</div>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									// endContent={
									//   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									// }
									label="Email"
									placeholder="Enter your email"
									variant="bordered"
								/>
								<Input
									// endContent={
									//   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
									// }
									label="Password"
									placeholder="Enter your password"
									type="password"
									variant="bordered"
								/>
								<div className="flex py-2 px-1 justify-between">
									<Checkbox
										classNames={{
											label: "text-small",
										}}
									>
										Remember me
									</Checkbox>
									<Link color="primary" href="#" size="sm">
										Forgot password?
									</Link>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="flat" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Sign in
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
