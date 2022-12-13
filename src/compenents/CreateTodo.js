import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

// styled-components
const CreateTodoStyle = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;

    input {
        width: 630px;
        padding: 15px;
        font-size: 25px;

        border: none;
        border-radius: 10px;
    }

    button {
        border: none;
        padding: 15px 20px;

        background-color: white;
        border-radius: 50%;

        cursor: pointer;

        &:hover {
            background-color: #9f8473;
            color: white;
        }
    }
`;

// components
const CreateTodo = () => {
    // 투두를 생성하기 위한 상태
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();

    // 투두를 생성버튼을 누르면 실행할 함수
    const handleCreate = (e) => {
        e.preventDefault();

        // 요청을 보낼 데이터
        const todo = { description, isCompleted };

        fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
            },
            body: JSON.stringify(todo),
        })
            .then(() => {
                navigate("/");
                window.location.reload(); // 새로고침해야 새로 추가한 글이 보임
            })
            .catch((err) => console.log(err));
    };

    return (
        <CreateTodoStyle>
            <input type="text" placeholder="할 일을 적어주세요!" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <button onClick={handleCreate}>
                <i className="fa-solid fa-plus fa-2x"></i>
            </button>
        </CreateTodoStyle>
    );
};

export default CreateTodo;