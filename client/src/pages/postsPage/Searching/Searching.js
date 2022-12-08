import React from "react";
import { useSearchingFetchAndActions } from "./useSearchingFetchAndActions";

const Searching = () => {
  const {
    onClickSearching,
    onChangeSearching,
    searching,
    listOfUsers,
    usersFoundedBar,
    setSearching,
    setListOfUsers,
  } = useSearchingFetchAndActions();

  const usersMap = usersFoundedBar.map((usernames) => {
    return (
      <div
        key={usernames.username}
        className="userFounded"
        onClick={() => {
          onClickSearching(usernames.username);
        }}
        name={usernames.username}
      >
        <img
          src={usernames.picture}
          name={usernames.username}
          alt="ProfileImg"
        />
        <p name={usernames.username}>{usernames.username}</p>
      </div>
    );
  });

  return (
    <div className="SearchBar">
      <div className="listOfUsers">
        <input
          onFocus={(e) => {
            setListOfUsers(true);
          }}
          placeholder="Buscar Usuario..."
          value={searching}
          onKeyDown={(e) => {
            if (e.code === "Escape") setSearching("");
          }}
          onChange={onChangeSearching}
        />
        {listOfUsers ? <div className="userMap">{usersMap}</div> : <div></div>}
        {listOfUsers && (
          <button
            className="closeList"
            onClick={() => {
              setListOfUsers(false);
            }}
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
};

export default Searching;
