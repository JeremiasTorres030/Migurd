import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/users/usersProvider";

const Config = () => {
  const { deleteUser, userNameLogged } = useUsers();
  const navigate = useNavigate();
  const [deleteAcc, setDeleteAcc] = useState(false);
  return (
    <div className="Config">
      <h1>Configuración de Cuenta.</h1>
      <div className="DeleteConfig">
        <button
          className="DeleteAcc"
          onClick={() => {
            setDeleteAcc(true);
          }}
        >
          Eliminar cuenta
        </button>
        {deleteAcc && (
          <div>
            <button
              className="Confirm"
              onClick={async () => {
                await deleteUser(userNameLogged);
                navigate("/login");
              }}
            >
              Confirmar
            </button>
            <button
              className="DeleteAcc"
              onClick={() => {
                setDeleteAcc(false);
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Config;
