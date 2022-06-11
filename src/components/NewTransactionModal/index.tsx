import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import incomeImage from "../../assets/income.svg";
import outcomeImage from "../../assets/outcome.svg";
import closeImage from "../../assets/close.svg";
import { FormEvent, useState } from "react";
import { api } from "../../services/api";

type NewTransactionModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};

export function NewTransactionModal({
    isOpen,
    onRequestClose,
}: NewTransactionModalProps) {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState(0);
    const [type, setType] = useState("deposit");
    const [category, setCategory] = useState("");

    const handleDepositType = () => {
        setType("deposit");
    };

    const handleWithdrawType = () => {
        setType("withdraw");
    };

    const handleCreateNewTransaction = (event: FormEvent) => {
        event.preventDefault();

        const data = {
            title,
            value,
            category,
            type,
        };

        api.post("/transactions", data);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName={"react-modal-overlay"}
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImage} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input
                    placeholder="Título"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={value}
                    onChange={(event) => setValue(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={handleDepositType}
                        isActive={type === "deposit"}
                        activeColor="green"
                    >
                        <img src={incomeImage} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={handleWithdrawType}
                        isActive={type === "withdraw"}
                        activeColor="red"
                    >
                        <img src={outcomeImage} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}
