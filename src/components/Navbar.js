function Navbar(props) {
  return (
    <div className="navbar w-auto sticky top-0 z-50 m-10">
      <div className="shadow-md bg-base-300 pt-30 w-full rounded-lg">
        <div className="flex-1">
          <a className="btn btn-ghost font-bold text-xl">urList</a>
        </div>
        <div className="flex gap-2 p-2">
          <div className="form-control py-1">
            <input
              type="text"
              placeholder="Search something here..."
              className="input h-full input-bordered w-auto focus:outline-3"
              onChange={(e) => props.setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-help"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 17l0 .01" />
              <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
            </svg>
          </button>
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => props.logoutHandler()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
              <path d="M15 12h-12l3 -3" />
              <path d="M6 15l-3 -3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
